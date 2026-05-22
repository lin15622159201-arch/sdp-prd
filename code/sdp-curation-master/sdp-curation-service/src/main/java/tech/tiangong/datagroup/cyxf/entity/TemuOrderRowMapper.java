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
public class TemuOrderRowMapper implements RowMapper<TemuOrder> {
    @Override
    public TemuOrder mapRow(ResultSet rs, int rowNum) throws SQLException {
        final var to = new TemuOrder();
        to.setSkuId(rs.getLong("SKU ID"));
        to.setSkcId(rs.getString("SKC ID"));
        to.setSpuId(rs.getString("SPU ID"));
//        to.setEtlTime(JdbcTemplateHelper.format(rs.getString("etl_time")));
        to.setEtlTime(rs.getObject("etl_time", LocalDateTime.class));
        to.setOrderCreatedTime(rs.getObject("订单创建时间", LocalDateTime.class));
        return to;
    }
}
