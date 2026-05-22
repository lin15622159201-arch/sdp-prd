package tech.tiangong.sdp.aspect;

import cn.hutool.json.JSONUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.aop.support.AopUtils;
import org.springframework.core.ParameterNameDiscoverer;
import org.springframework.core.StandardReflectionParameterNameDiscoverer;
import org.springframework.expression.EvaluationContext;
import org.springframework.expression.Expression;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.SimpleEvaluationContext;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import tech.tiangong.sdp.config.YocTenantInterceptor;
import tech.tiangong.sdp.entity.YocOperationLog;
import tech.tiangong.sdp.enums.YocOperationTypeEnum;
import tech.tiangong.sdp.service.yoc.YocOperationLogService;
import tech.tiangong.sdp.util.ExecutorUtils;

import java.lang.reflect.Method;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;

/**
 * YOC操作日志AOP切面
 *
 * @author while
 * @since 1.0.0
 * @see YocOperationLogMark
 * @see YocOperationLogService
 */
@Slf4j
@Aspect
@Component
public class YocOperationLogAspect {

    private final YocOperationLogService yocOperationLogService;
    private final ParameterNameDiscoverer parameterNameDiscoverer;
    private final SpelExpressionParser spelExpressionParser = new SpelExpressionParser();
    private final ExecutorService executor = ExecutorUtils.get("yocOperationLogExecutor", 2 << 6);

    /**
     * 构造函数注入依赖
     *
     * @param yocOperationLogService 操作日志服务
     */
    public YocOperationLogAspect(YocOperationLogService yocOperationLogService) {
        this.yocOperationLogService = yocOperationLogService;
        this.parameterNameDiscoverer = new StandardReflectionParameterNameDiscoverer();
    }

    /**
     * 后置通知：方法执行成功后记录操作日志
     *
     * <p>拦截标注了@YocOperationLogMark注解的方法，在方法执行成功后记录日志。</p>
     *
     */
    @AfterReturning("@annotation(tech.tiangong.sdp.aspect.YocOperationLogMark)")
    public void afterReturning(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = getTargetMethod(joinPoint, signature);
        YocOperationLogMark annotation = method.getAnnotation(YocOperationLogMark.class);

        HttpServletRequest request = getHttpServletRequest();

        CompletableFuture.runAsync(() -> saveOperationLog(joinPoint, annotation, request), executor)
                .exceptionally(e -> {
                    log.error("记录YOC操作日志失败", e);
                    return null;
                });
    }

    /**
     * 保存操作日志
     *
     * <p>从切入点方法和注解中提取信息，构建操作日志对象并保存</p>
     *
     * @param joinPoint 切入点
     * @param annotation 操作日志注解
     * @param request HTTP请求对象（从主线程传入，避免异步线程无法获取）
     */
    private void saveOperationLog(JoinPoint joinPoint, YocOperationLogMark annotation, HttpServletRequest request) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        Object[] args = joinPoint.getArgs();
        String[] parameterNames = parameterNameDiscoverer.getParameterNames(method);

        // 构建操作日志对象
        YocOperationLog operationLog = new YocOperationLog();

        // 设置操作类型
        YocOperationTypeEnum operationType = annotation.operationType();
        operationLog.setOperationType(operationType.getCode());

        // 使用SpEL解析业务ID（支持 req.styleId 这种嵌套表达式）
        Long businessId = parseBusinessId(annotation.businessIdParam(), parameterNames, args);
        if (businessId != null) {
            operationLog.setBusinessId(businessId);
        }

        // 从请求头获取用户信息
        if (request != null) {
            String userIdHeader = request.getHeader("User-Id");
            String userNameHeader = request.getHeader("User-Name");
            if (userIdHeader != null && userNameHeader != null) {
                try {
                    Long userId = Long.parseLong(userIdHeader);
                    String userName = URLDecoder.decode(userNameHeader, StandardCharsets.UTF_8);
                    // 设置创建人信息
                    operationLog.setCreatorId(userId);
                    operationLog.setCreatorName(userName);
                } catch (Exception e) {
                    log.warn("从请求头解析用户信息失败", e);
                }
            }
        }

        // 设置租户ID，优先从 request attribute 获取（由 YocTenantInterceptor 设置）
        if (request != null) {
            Object tenantIdAttr = request.getAttribute(YocTenantInterceptor.TENANT_ID_REQUEST_ATTR);
            operationLog.setTenantId(tenantIdAttr != null ? String.valueOf(tenantIdAttr) : "1");
        } else {
            operationLog.setTenantId("1");
        }

        // 设置请求参数（过滤Servlet对象，序列化业务参数）
        operationLog.setRequestParams(getRequestParamStr(args));

        // 设置创建时间
        operationLog.setCreateTime(LocalDateTime.now());

        // 保存日志
        yocOperationLogService.save(operationLog);
    }

    /**
     * 使用SpEL表达式解析业务ID
     * <p>
     * 支持简单的参数名（如 "shopId"）和嵌套属性表达式（如 "req.styleId"）
     * </p>
     *
     * @param businessIdParam 业务ID参数表达式
     * @param parameterNames 方法参数名数组
     * @param args 方法参数值数组
     * @return 解析后的业务ID，解析失败返回null
     */
    private Long parseBusinessId(String businessIdParam, String[] parameterNames, Object[] args) {
        if (businessIdParam == null || businessIdParam.trim().isEmpty()) {
            return null;
        }

        try {
            String expression = businessIdParam.trim();

            // 如果不包含 #，添加 # 前缀
            if (!expression.contains("#")) {
                expression = "#" + expression;
            }

            Expression expr = spelExpressionParser.parseExpression(expression);
            EvaluationContext context = SimpleEvaluationContext
                    .forReadWriteDataBinding()
                    .withInstanceMethods()
                    .build();

            // 将方法参数绑定到上下文
            for (int i = 0; i < parameterNames.length && i < args.length; i++) {
                context.setVariable(parameterNames[i], args[i]);
            }

            Object value = expr.getValue(context);
            if (value == null) {
                return null;
            }

            if (value instanceof Number) {
                return ((Number) value).longValue();
            } else if (value instanceof String) {
                try {
                    return Long.parseLong((String) value);
                } catch (NumberFormatException e) {
                    log.warn("业务ID字符串转换失败: {}", value);
                    return null;
                }
            } else {
                // 其他类型尝试转换
                try {
                    return Long.parseLong(value.toString());
                } catch (NumberFormatException e) {
                    log.warn("业务ID转换失败: {}", value);
                    return null;
                }
            }
        } catch (Exception e) {
            log.warn("解析业务ID失败: {}", businessIdParam, e);
            return null;
        }
    }


    /**
     * 获取目标方法（处理代理场景）
     * <p>
     * 当通过JDK动态代理调用时，signature.getMethod() 可能返回接口的方法而不是实现类的方法。
     * 此方法会尝试获取目标类的实际方法。
     * </p>
     *
     */
    private Method getTargetMethod(JoinPoint joinPoint, MethodSignature signature) {
        Method method = signature.getMethod();
        if (method.getAnnotation(YocOperationLogMark.class) == null) {
            try {
                Class<?> targetClass = AopUtils.getTargetClass(joinPoint.getTarget());
                method = targetClass.getDeclaredMethod(method.getName(), method.getParameterTypes());
            } catch (NoSuchMethodException e) {
                log.warn("获取目标类方法失败，使用原方法: {}", method.getName(), e);
            }
        }
        return method;
    }

    /**
     * 获取 HttpServletRequest
     *
     * @return HttpServletRequest
     */
    private HttpServletRequest getHttpServletRequest() {
        try {
            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            return attributes != null ? attributes.getRequest() : null;
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 获取请求参数JSON字符串
     * <p>
     * 过滤掉HttpServletRequest和HttpServletResponse对象，序列化其他所有业务参数
     * </p>
     *
     * @param args 方法参数数组
     * @return 请求参数的JSON字符串
     */
    private String getRequestParamStr(Object[] args) {
        if (args == null || args.length == 0) {
            return "{}";
        }

        try {
            Object[] filteredArgs = new Object[args.length];
            int filteredCount = 0;

            for (Object arg : args) {
                // 过滤掉Servlet对象
                if (!(arg instanceof HttpServletRequest) && !(arg instanceof HttpServletResponse)) {
                    filteredArgs[filteredCount++] = arg;
                }
            }

            // 创建实际长度的数组
            Object[] result = new Object[filteredCount];
            System.arraycopy(filteredArgs, 0, result, 0, filteredCount);

            // 根据数量决定返回格式
            if (result.length == 0) {
                return "{}";
            } else if (result.length == 1) {
                // 单个参数直接序列化
                return JSONUtil.toJsonStr(result[0]);
            } else {
                // 多个参数序列化为数组
                return JSONUtil.toJsonStr(result);
            }
        } catch (Throwable e) {
            log.error("序列化请求参数失败", e);
            return "{}";
        }
    }
}
