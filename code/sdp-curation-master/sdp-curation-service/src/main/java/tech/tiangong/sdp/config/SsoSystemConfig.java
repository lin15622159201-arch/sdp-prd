package tech.tiangong.sdp.config;

import lombok.Data;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * SsoSystemConfig
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/11 18:14
 */
@Data
@Configuration
@ConfigurationProperties(
        prefix = "saas.sso.sdk"
)
@ConditionalOnProperty(
        name = {"saas.sso.sdk"}
)
public class SsoSystemConfig {
    private List<SsoSystem> systems;
}
