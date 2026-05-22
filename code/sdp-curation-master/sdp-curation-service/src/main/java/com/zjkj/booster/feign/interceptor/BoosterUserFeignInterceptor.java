package com.zjkj.booster.feign.interceptor;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import lombok.extern.slf4j.Slf4j;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.utils.SsoContext;
import tech.tiangong.sdp.yibuyun.HeaderParamsConstants;
import tech.tiangong.sdp.yibuyun.UserInfo;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Objects;

/**
 * Booster拦截器
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/4/16 14:13
 */
@Slf4j
public class BoosterUserFeignInterceptor implements RequestInterceptor {
    @Override
    public void apply(RequestTemplate template) {

//        HttpServletRequest request = getHttpServletRequest();
        // 有ssoToken标识并且request存在的时候说明是南京sso的传递方式  需要往下传递ssoToken
        String currentUserId = "";
        String tenantId = "";
        String systemCode = "AIGC";
        String userCode = "";
        String username = "";
        String userinfo = "";
        final var userContent = SsoContext.user();
        log.info("用户信息：{}", JsonsKt.toJsonPretty(userContent));
        currentUserId = toString(userContent.getId());
        username = URLEncoder.encode(userContent.getName(), StandardCharsets.UTF_8);
        tenantId = toString(userContent.getTenantId());
        //在这里，进行组装userinfo
        UserInfo userInfo = new UserInfo();
        userInfo.setId(userContent.getId());
        userInfo.setCode("");
        userInfo.setName(userContent.getName());
        userInfo.setTenantId(userContent.getTenantId());
        //进行base64编码
        userinfo = Base64.getEncoder()
                .encodeToString(
                        JsonsKt.toJson(userInfo).getBytes(StandardCharsets.UTF_8)
                );
        setHeaderIfNotNull(template, HeaderParamsConstants.USER_ID_HEAD, currentUserId);
        setHeaderIfNotNull(template, HeaderParamsConstants.USER_NAME_HEAD, username);
        setHeaderIfNotNull(template, HeaderParamsConstants.TENANT_ID, tenantId);
        setHeaderIfNotNull(template, HeaderParamsConstants.SYSTEM_CODE, systemCode);
        setHeaderIfNotNull(template, HeaderParamsConstants.USER_CODE_HEAD, userCode);
        setHeaderIfNotNull(template, HeaderParamsConstants.USER_INFO, userinfo);
    }

    private void setHeaderIfNotNull(final RequestTemplate requestTemplate, final String key, final String value) {
        if (value != null) {
            requestTemplate.header(key, value);
        }
    }

    private String toString(final Object o) {
        if (Objects.nonNull(o)) {
            return Objects.toString(o);
        }
        return null;
    }

}
