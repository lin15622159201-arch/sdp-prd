package tech.tiangong.sdp.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * YOC Web MVC 配置
 * <p>
 * 拦截 /inner/v1/yoc/** 路径下的所有请求，
 * 设置用户上下文。
 * </p>
 *
 * @author while
 * @since 1.0.0
 */
@Configuration
@RequiredArgsConstructor
public class YocMvcConfig implements WebMvcConfigurer {

    private final YocTenantInterceptor yocTenantInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(yocTenantInterceptor)
                .addPathPatterns("/inner/v1/yoc/**")
                .excludePathPatterns("/inner/v1/yoc/uacs/user-query/**"
                );
    }
}
