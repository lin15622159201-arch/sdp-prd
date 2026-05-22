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
public class TemuOrderSkcRowMapper implements RowMapper<TemuOrderSkc> {
    @Override
    public TemuOrderSkc mapRow(ResultSet rs, int rowNum) throws SQLException {
        final var ts = new TemuOrderSkc();
        ts.setSkuId(rs.getLong("SKU_ID"));
        ts.setOrderCode(rs.getString("order_code"));
        ts.setOrderStatus(rs.getString("order_status"));
        ts.setOrderNumber(rs.getBigDecimal("order_number"));
        ts.setCommodityAttr(rs.getString("commodity_attr"));
        ts.setSkcId(rs.getString("SKC_ID"));
        ts.setSpuId(rs.getString("SPU_ID"));
        ts.setEtlTime(rs.getObject("etl_time", LocalDateTime.class));
        ts.setOrderCreatedTime(rs.getObject("order_created_time", LocalDateTime.class));
        ts.setEtlTime(rs.getObject("etl_time", LocalDateTime.class));
        ts.setExtCode(rs.getString("spu_code"));
        ts.setSkcStatus(rs.getString("skc_status"));
        ts.setSkcSiteStatus(rs.getInt("skc_site_status"));
        return ts;
    }
}
