package tech.tiangong.sdp.yibuyun;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import feign.RequestInterceptor;
import feign.RequestTemplate;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.config.SsoSystem;
import tech.tiangong.sdp.config.SsoSystemConfig;
import tech.tiangong.sdp.util.Md5Utils;
import tech.tiangong.sdp.utils.SsoContext;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Objects;

@Slf4j
@AllArgsConstructor
@EnableConfigurationProperties(SsoSystemConfig.class)
public class ZjOpenFeignUserContentConfig implements RequestInterceptor {

    private static final String JV_SYS_CODE = "openSystemCode";

    private static final String JV_TIMESTAMP = "openTimestamp";

    public static final String JV_REQUEST_SIGN = "openSign";

    public static final String JV_SOURCE = "source";

    public static final String JV_SOURCE_VALUE = "jv";

    private final SsoSystemConfig ssoSystemConfig;

    @SneakyThrows
    @Override
    public void apply(RequestTemplate requestTemplate) {
        HttpServletRequest request = getHttpServletRequest();
        // 不要token 只是进行 sso的鉴权
        // 拿系统编码，请求头中拿，请求头中拿不到，userContent 拿
        String systemCode= "PLM";
        final var userContent = SsoContext.user();
        log.info("=== userContent: {} ====", JsonsKt.toJsonPretty(userContent));
//        if (ObjectUtil.isNotNull(userContent)) {
//            // systemCode = userContent.getSystemCode();
//            systemCode = "PLM";
//        } else {
//            systemCode = null;
//        }
        if (ObjectUtil.isNotNull(request) && StrUtil.isBlank(systemCode)) {
            systemCode = request.getHeader(HeaderParamsConstants.SYSTEM_CODE);
        }
        if (StrUtil.isBlank(systemCode)) {
            throw new Exception("System-Code is null");
        }
        if (ObjectUtil.isNull(ssoSystemConfig)) {
            throw new Exception("ssoSystemConfig not config");
        }
        List<SsoSystem> systems = ssoSystemConfig.getSystems();
        log.info("=== systems: {} ====", JsonsKt.toJsonPretty(systems));
        if (CollectionUtil.isEmpty(systems)) {
            throw new Exception("ssoSystemConfig systems not config");
        }
        String finalSystemCode = systemCode;
        SsoSystem system = systems.stream()
                .filter(Objects::nonNull)
                .filter(ssoSystem -> StringUtils.equals(finalSystemCode, ssoSystem.getCode()))
                .findFirst().orElseThrow(() -> new Exception("sso system not config"));

        // 鉴权
        String timeStamp = String.valueOf(LocalDateTime.now().toEpochSecond(ZoneOffset.of("+8")));
        String sign = Md5Utils.getMD5(systemCode + system.getSecretKey() + timeStamp, "UTF-8");
        log.info("ssoSign:{}", sign);
        requestTemplate.header(JV_SYS_CODE, systemCode);
        requestTemplate.header(JV_TIMESTAMP, timeStamp);
        requestTemplate.header(JV_REQUEST_SIGN, sign);
        requestTemplate.header(JV_SOURCE, JV_SOURCE_VALUE);

    }


    /**
     * 获取 HttpServletRequest
     *
     * @return HttpServletRequest
     */
    private HttpServletRequest getHttpServletRequest() {
        try {
            return ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        } catch (Exception e) {
            return null;
        }
    }
}
