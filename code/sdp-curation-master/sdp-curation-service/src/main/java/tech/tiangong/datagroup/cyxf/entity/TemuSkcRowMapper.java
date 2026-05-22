package tech.tiangong.datagroup.cyxf.entity;


import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;

/**
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2023/12/5 下午6:46
 */
public class TemuSkcRowMapper implements RowMapper<TemuSkc> {
    @Override
    public TemuSkc mapRow(ResultSet rs, int rowNum) throws SQLException {
        final var ts = new TemuSkc();
        ts.setSkcId(rs.getLong("productskcId"));
        ts.setProductId(rs.getLong("productId"));
        ts.setExtCode(rs.getString("extCode"));
        ts.setShopName(rs.getString("shop_name"));
        ts.setSkcStatus(rs.getString("skcStatus"));
        ts.setSkcSiteStatus(rs.getInt("skcSiteStatus"));
//        to.setEtlTime(JdbcTemplateHelper.format(rs.getString("etl_time")));
        ts.setEtlTime(rs.getObject("etl_time", LocalDateTime.class));
        return ts;
    }
}
