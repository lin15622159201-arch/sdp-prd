package tech.tiangong.datagroup.jdbc;

import cn.hutool.extra.spring.SpringUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import tech.tiangong.datagroup.cyxf.repository.CyxfBaseRepository;

/**
 * CyxfDataSourceRunner
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/26 18:22
 */
@Slf4j
public record CyxfDataSourceRunner(DataSourceProperties properties) implements ApplicationRunner {
    @Override
    public void run(ApplicationArguments args) throws Exception {
        log.info("初始化Cyxf数据库");
        final var template = JdbcTemplateHelper.buildTemplate(properties, "cyxf-pool");
        SpringUtil.getBeansOfType(CyxfBaseRepository.class)
                .values()
                .forEach(r -> r.setTemplate(template));
    }
}
