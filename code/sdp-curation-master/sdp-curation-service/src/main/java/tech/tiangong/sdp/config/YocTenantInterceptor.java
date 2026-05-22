package tech.tiangong.sdp.config;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.StrUtil;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import team.aikero.admin.common.vo.AttributeVo;
import team.aikero.admin.common.vo.DictVo;
import team.aikero.blade.auth.UserContexts;
import team.aikero.blade.user.entity.CurrentUser;
import team.aikero.blade.user.holder.DefaultCurrentUserContentSetter;
import tech.tiangong.sdp.enums.DictEnum;
import tech.tiangong.sdp.external.DictClientExternal;
import tech.tiangong.sdp.utils.UserInvoke;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Objects;

/**
 * YOC店铺运营中心 租户解析拦截器
 * <p>
 * 从请求头中提取用户信息和主体编码，查字典获取租户ID，设置到用户上下文中。
 * </p>
 *
 * @author while
 * @since 1.0.0
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class YocTenantInterceptor implements HandlerInterceptor {

    @Resource
    @Lazy
    private DictClientExternal dictClientExternal;

    private static final Long DEFAULT_TENANT_ID = 1L;
    private static final String DICT_TENANT_ID_ATTRIBUTE_CODE = "tenant_id";
    public static final String TENANT_ID_REQUEST_ATTR = "sdpTenantId";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String userId = request.getHeader("Yoc-User-Id");
        String userName = request.getHeader("Yoc-User-Name");
        String subjectCode = request.getHeader("Yoc-Subject-Code");

        String decodeUserName = URLDecoder.decode(userName, StandardCharsets.UTF_8);
        if (StrUtil.isNotBlank(userName)) {
            decodeUserName = URLDecoder.decode(userName, StandardCharsets.UTF_8);
        }

        log.info("=== YOC店铺运营中心 请求头信息: userId:{}; userName:{}; subjectCode:{}",
                userId, decodeUserName, subjectCode);

        if (StrUtil.isBlank(userId) || StrUtil.isBlank(userName)) {
            return true;
        }

        Long tenantId = getTenantIdBySubjectCode(subjectCode);

        CurrentUser user = UserInvoke.INSTANCE.user(
                Long.parseLong(userId),
                decodeUserName,
                tenantId, null);
        DefaultCurrentUserContentSetter.INSTANCE.set(user);

        // 存入 request attribute，供异步线程（如操作日志切面）读取
        request.setAttribute(TENANT_ID_REQUEST_ATTR, tenantId);

        log.info("=== YOC店铺运营中心 请求用户: userId:{}; userName:{}; subjectCode:{}; tenantId:{}",
                userId, decodeUserName, subjectCode, tenantId);

        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        DefaultCurrentUserContentSetter.INSTANCE.clean();
    }

    private Long getTenantIdBySubjectCode(String subjectCode) {
        if (StrUtil.isBlank(subjectCode)) {
            return DEFAULT_TENANT_ID;
        }

        DictVo dictVo = UserContexts.withSystemUser(() -> dictClientExternal.listByDictCode(DictEnum.Y2_SHOP_SUBJECT.getDictCode()));
        if (Objects.isNull(dictVo) || CollUtil.isEmpty(dictVo.getChildren())) {
            return DEFAULT_TENANT_ID;
        }

        for (DictVo child : dictVo.getChildren()) {
            if (subjectCode.equals(child.getDictCode())) {
                List<AttributeVo> attributes = child.getAttributes();
                if (CollUtil.isEmpty(attributes)){
                    return DEFAULT_TENANT_ID;
                }
                String dictValue = attributes.stream()
                        .filter(Objects::nonNull)
                        .filter(a -> DICT_TENANT_ID_ATTRIBUTE_CODE.equals(a.getCode()))
                        .map(AttributeVo::getName)
                        .filter(StrUtil::isNotBlank)
                        .findFirst()
                        .orElse(DEFAULT_TENANT_ID + "");
                try {
                    return Long.parseLong(dictValue);
                } catch (NumberFormatException e) {
                    log.warn("字典租户ID解析失败，使用默认值: {}", dictValue);
                    return DEFAULT_TENANT_ID;
                }
            }
        }
        return DEFAULT_TENANT_ID;
    }
}
