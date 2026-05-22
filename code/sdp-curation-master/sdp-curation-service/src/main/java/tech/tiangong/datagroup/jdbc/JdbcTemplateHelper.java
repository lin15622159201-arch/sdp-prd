package tech.tiangong.datagroup.jdbc;

import cn.hutool.core.date.DatePattern;
import cn.hutool.core.date.LocalDateTimeUtil;
import cn.hutool.core.util.StrUtil;
import com.zaxxer.hikari.HikariDataSource;
import lombok.experimental.UtilityClass;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import java.time.LocalDateTime;

/**
 * JdbcTemplate
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/27 10:48
 */
@UtilityClass
public class JdbcTemplateHelper {
    public NamedParameterJdbcTemplate buildTemplate(final DataSourceProperties properties, final String name) {
        final var ds = properties.initializeDataSourceBuilder().type(HikariDataSource.class).build();
        ds.setPoolName(name);
        return new NamedParameterJdbcTemplate(ds);
    }
    public LocalDateTime format(final String data) {
        if (StrUtil.isBlank(data)) {
            return null ;
        }
        return LocalDateTimeUtil.parse(data, DatePattern.NORM_DATETIME_FORMATTER);
    }
}
