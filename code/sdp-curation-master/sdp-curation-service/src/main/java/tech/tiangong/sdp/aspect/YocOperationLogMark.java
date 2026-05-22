package tech.tiangong.sdp.aspect;

import tech.tiangong.sdp.enums.YocOperationTypeEnum;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * YOC操作日志注解
 *
 * <p>用于标注需要进行操作日志记录的方法。当方法被调用时，AOP切面会拦截该方法的执行，
 * 提取相关参数并记录操作日志到数据库中。</p>
 *
 * @author while
 * @since 1.0.0
 * @see YocOperationTypeEnum
 * @see YocOperationLogAspect
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface YocOperationLogMark {

    /**
     * 操作类型枚举
     *
     *
     * @return 操作类型枚举值，必填项
     */
    YocOperationTypeEnum operationType();

    /**
     * 业务ID参数名
     *
     *
     * @return 业务ID参数名，默认为空字符串
     */
    String businessIdParam() default "";
}
