package tech.tiangong.datagroup.jdbc;

import lombok.Getter;
import lombok.Setter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.EmptySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;

import java.util.List;
import java.util.Map;

/**
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2023/12/5 下午6:40
 */
@Setter
@Getter
public class DatagroupRepository {
    protected NamedParameterJdbcTemplate template;

    protected <T> List<T> query(final String sql, final Map<String, ?> paramMap, final RowMapper<T> rowMapper) {
        return template.query(sql, paramMap, rowMapper);
    }

    protected <T> List<T> query(final String sql, final SqlParameterSource paramSource, final RowMapper<T> rowMapper) {
        return template.query(sql, paramSource, rowMapper);
    }

    protected <T> List<T> queryForList(final String sql, final Class<T> klass) {
        return template.queryForList(sql, EmptySqlParameterSource.INSTANCE, klass);
    }

    protected <T> List<T> queryForList(final String sql, final SqlParameterSource paramSource, final Class<T> klass) {
        return template.queryForList(sql, paramSource, klass);
    }

    protected List<String> queryForList(final String sql) {
        return queryForList(sql, String.class);
    }


    protected String where(final String sql) {
        return (sql.contains(" WHERE ") | sql.contains(" where ")) ? " AND " : " WHERE ";
    }
}
