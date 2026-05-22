package tech.tiangong.sdp.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import tech.tiangong.datagroup.jdbc.CyxfDataSourceRunner;

/**
 * DataSourceConfiguration
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/26 18:22
 */
@Order(Ordered.HIGHEST_PRECEDENCE)
@Configuration(proxyBeanMethods = false)
public class DataSourceConfiguration {
    /**
     * sdp_curation数据库配置
     */
    @Primary
    @Bean
    public DataSourceProperties dataSourceProperties() {
        return new DataSourceProperties();
    }

    /**
     * 数据组配置
     */
    @Bean
    @ConfigurationProperties(prefix = "cyxf.datasource")
    public DataSourceProperties cyxfDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean
    public CyxfDataSourceRunner cyxfDataSourceRunner(
            @Qualifier(value = "cyxfDataSourceProperties") final DataSourceProperties cyxfDataSourceProperties) {
        return new CyxfDataSourceRunner(cyxfDataSourceProperties);
    }
}
