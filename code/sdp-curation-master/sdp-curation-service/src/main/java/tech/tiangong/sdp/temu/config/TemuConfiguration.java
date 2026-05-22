package tech.tiangong.sdp.temu.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.retry.backoff.FixedBackOffPolicy;
import org.springframework.retry.policy.SimpleRetryPolicy;
import org.springframework.retry.support.RetryTemplate;
import org.springframework.web.client.RestTemplate;
import tech.tiangong.sdp.service.TemuAccessLogService;
import tech.tiangong.sdp.temu.http.RestRequestInterceptor;
import tech.tiangong.sdp.util.ExecutorUtils;

import java.net.http.HttpClient;
import java.nio.charset.StandardCharsets;
import java.time.Duration;

/**
 * Temu配置
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/24 15:54
 */
@Configuration(proxyBeanMethods = false)
public class TemuConfiguration {
    @Bean(value = "usTemuProperties")
    @ConfigurationProperties(prefix = "temu.platform.us")
    public TemuPlatformProperties usTemuProperties() {
        return new TemuPlatformProperties();
    }

    @Bean(value = "gloTemuProperties")
    @ConfigurationProperties(prefix = "temu.platform.glo")
    public TemuPlatformProperties gloTemuProperties() {
        return new TemuPlatformProperties();
    }

    @Bean(value = "cnTemuProperties")
    @ConfigurationProperties(prefix = "temu.platform.cn")
    public TemuPlatformProperties cnTemuProperties() {
        return new TemuPlatformProperties();
    }

    @Bean(value = "paTemuProperties")
    @ConfigurationProperties(prefix = "temu.platform.pa")
    public TemuPlatformProperties paTemuProperties() {
        return new TemuPlatformProperties();
    }

    @Bean
    public RestTemplate temuRestTemplate(final TemuAccessLogService temuAccessLogService) {
        final var restTemplate = new RestTemplate();
        restTemplate.getInterceptors().add(new RestRequestInterceptor(temuAccessLogService));
        restTemplate.setRequestFactory(clientHttpRequestFactory());
        restTemplate.getMessageConverters()
                .forEach(it -> {
                    if (it instanceof StringHttpMessageConverter) {
                        ((StringHttpMessageConverter) it).setDefaultCharset(StandardCharsets.UTF_8);
                    }
                });
//        if (restTemplate.getMessageConverters().stream()
//                .noneMatch(FormHttpMessageConverter.class::isInstance)) {
        restTemplate.getMessageConverters().add(new FormHttpMessageConverter());
//        }
        return restTemplate;
    }

    @Bean
    public RetryTemplate temuRetryTemplate() {
        final var retryTemplate = new RetryTemplate();
        final var retryPolicy = new SimpleRetryPolicy();
        retryPolicy.setMaxAttempts(3);
        retryTemplate.setRetryPolicy(retryPolicy);
        final var backOffPolicy = new FixedBackOffPolicy();
        backOffPolicy.setBackOffPeriod(2 << 12);
        retryTemplate.setBackOffPolicy(backOffPolicy);
        return retryTemplate;
    }

    private ClientHttpRequestFactory clientHttpRequestFactory() {
        final var factory = new JdkClientHttpRequestFactory(
                HttpClient.newBuilder()
                        .connectTimeout(Duration.ofSeconds(2 << 5))
                        .version(HttpClient.Version.HTTP_2)
                        .executor(ExecutorUtils.get("temuRestHttpClientPool", 2 << 12))
                        .build());
        factory.setReadTimeout(Duration.ofSeconds(2 << 5));
        return factory;
    }
}
