package tech.tiangong.sdp.temu.external;

import cn.hutool.extra.spring.SpringUtil;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.retry.support.RetryTemplate;
import org.springframework.web.client.RestTemplate;

/**
 * Temu商品接口
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 10:23
 */
@Slf4j
@UtilityClass
public class TemuRestApi {
    private final RestTemplate restTemplate = SpringUtil.getBean("temuRestTemplate", RestTemplate.class);
    private final RetryTemplate retryTemplate = SpringUtil.getBean("temuRetryTemplate", RetryTemplate.class);


    public <T> T post(final String url,
                      final String params,
                      final ParameterizedTypeReference<T> type) {
        final var requestHeaders = new HttpHeaders();
        requestHeaders.setContentType(MediaType.APPLICATION_JSON);
        return post(requestHeaders, url, params, type);
    }

    public <T> T post(final HttpEntity<Object> httpEntity,
                      final String url,
                      final ParameterizedTypeReference<T> type) {
        return restTemplate.exchange(url, HttpMethod.POST, httpEntity, type).getBody();
    }

    public <T> T post(final HttpHeaders httpHeaders,
                      final String url,
                      final String params,
                      final ParameterizedTypeReference<T> type) {
        return post(new HttpEntity<>(params, httpHeaders), url, type);
    }

    public <T> T postRetry(final String url, final String params, final ParameterizedTypeReference<T> type) {
        return retryTemplate.execute(it -> post(url, params, type));
    }
}
