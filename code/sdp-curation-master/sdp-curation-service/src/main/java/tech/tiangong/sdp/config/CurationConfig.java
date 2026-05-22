package tech.tiangong.sdp.config;

import com.zjkj.booster.feign.interceptor.BoosterUserFeignInterceptor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.retry.backoff.FixedBackOffPolicy;
import org.springframework.retry.policy.SimpleRetryPolicy;
import org.springframework.retry.support.RetryTemplate;
import org.springframework.web.client.RestTemplate;
import tech.tiangong.sdp.service.component.RedissonHelper;
import tech.tiangong.sdp.util.ExecutorUtils;
import tech.tiangong.sdp.vector.repository.DashVectorRepository;

import java.net.http.HttpClient;
import java.nio.charset.StandardCharsets;
import java.time.Duration;

/**
 * curation
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/20 18:35
 */
@Configuration
public class CurationConfig {
    @Bean
    public DomainProperties domainProperties() {
        return new DomainProperties();
    }

    @Bean
    @ConfigurationProperties(prefix = "temu.data")
    public TemuDataProperties temuDataProperties() {
        return new TemuDataProperties();
    }

    @Bean
    @ConfigurationProperties(prefix = "file")
    public FileProperties fileProperties() {
        return new FileProperties();
    }

    @Bean
    @ConfigurationProperties(prefix = "dash.vector")
    public DashVectorProperties dashVectorProperties() {
        return new DashVectorProperties();
    }

    @Bean
    @ConfigurationProperties(prefix = "sync.plm")
    public TemuSyncPlmDesignerProperties temuSyncPlmDesignerProperties() {
        return new TemuSyncPlmDesignerProperties();
    }
    @Bean
    @ConfigurationProperties(prefix = "common")
    public CommonProperties commonProperties() {
        return new CommonProperties();
    }

    @Bean
    public RestTemplate restTemplate() {
        final var restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(clientHttpRequestFactory());
        restTemplate.getMessageConverters()
                .forEach(it -> {
                    if (it instanceof StringHttpMessageConverter) {
                        ((StringHttpMessageConverter) it).setDefaultCharset(StandardCharsets.UTF_8);
                    }
                });
        return restTemplate;
    }

    @Bean("temuTaskRetryTemplate")
    public RetryTemplate temuTaskRetryTemplate() {
        final var retryTemplate = new RetryTemplate();
        // 重试策略：最多 6 次（≈1分钟）
        final var retryPolicy = new SimpleRetryPolicy(6);
        retryTemplate.setRetryPolicy(retryPolicy);
        // 退避策略：固定 10 秒
        final var backOffPolicy = new FixedBackOffPolicy();
        backOffPolicy.setBackOffPeriod(10_000L);
        retryTemplate.setBackOffPolicy(backOffPolicy);
        return retryTemplate;
    }

    @Bean(value = "dashVectorRepository", initMethod = "init", destroyMethod = "close")
    public DashVectorRepository dashVectorRepository(final DashVectorProperties dashVectorProperties,
                                                     final RedissonHelper redissonHelper) {
        return new DashVectorRepository(dashVectorProperties, redissonHelper);
    }
    @Bean
    public BoosterUserFeignInterceptor boosterUserInterceptor() {
        return new BoosterUserFeignInterceptor();
    }
    private ClientHttpRequestFactory clientHttpRequestFactory() {
        final var factory = new JdkClientHttpRequestFactory(
                HttpClient.newBuilder()
                        .connectTimeout(Duration.ofSeconds(2 << 5))
                        .version(HttpClient.Version.HTTP_2)
                        .executor(ExecutorUtils.get("restHttpClientPool", 2 << 12))
                        .build());
        factory.setReadTimeout(Duration.ofSeconds(2 << 5));
        return factory;
    }

}
