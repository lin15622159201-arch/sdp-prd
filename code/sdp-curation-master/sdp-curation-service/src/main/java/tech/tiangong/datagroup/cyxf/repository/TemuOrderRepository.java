package tech.tiangong.datagroup.cyxf.repository;

import cn.hutool.core.collection.CollectionUtil;
import org.springframework.jdbc.core.namedparam.EmptySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;
import tech.tiangong.datagroup.cyxf.entity.TemuOrder;
import tech.tiangong.datagroup.cyxf.entity.TemuOrderRowMapper;
import tech.tiangong.datagroup.cyxf.entity.TemuOrderSkc;
import tech.tiangong.datagroup.cyxf.entity.TemuOrderSkcRowMapper;

import java.time.LocalDateTime;
import java.util.List;

/**
 * TemuOrderRepository
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/27 11:23
 */
@Repository
public class TemuOrderRepository extends CyxfBaseRepository {
    private final static String TABLE = "dwd_temu_semi_recent_order_list";
    private final static String CLOS = " `SKU ID`,`SKC ID`,`SPU ID`,etl_time,订单创建时间 ";


    public List<TemuOrder> list() {
        return this.query(sql() + " LIMIT 10;", EmptySqlParameterSource.INSTANCE, new TemuOrderRowMapper());
    }

    public TemuOrder getFirst() {
        final var data = this.query(sql() + " ORDER BY etl_time ASC LIMIT 1;", EmptySqlParameterSource.INSTANCE, new TemuOrderRowMapper());
        if (CollectionUtil.isEmpty(data)) {
            return null;
        }
        return data.getFirst();
    }

    public List<TemuOrder> listByEtlTime(final int idx, final LocalDateTime start, final LocalDateTime end) {
        final var sql = sql() +
                " WHERE etl_time >= :start AND etl_time < :end" +
                " ORDER BY etl_time ASC, `SKC ID` ASC ,`SKU ID` ASC , `SPU ID` ASC " +
                " LIMIT :idx , 1024";
//                " LIMIT :idx , 1";
        final var params = new MapSqlParameterSource();
        params.addValue("start", start);
        params.addValue("end", end);
        params.addValue("idx", idx);
        return this.query(sql, params, new TemuOrderRowMapper());
    }

    public List<TemuOrderSkc> listEtlTime(final int idx, final LocalDateTime start, final LocalDateTime end) {
        final var sql = """
                SELECT o.`SKU ID`       AS SKU_ID,
                       o.`SKC ID`       AS SKC_ID,
                       o.`SPU ID`       AS SPU_ID,
                       o.etl_time       AS etl_time,
                       o.`订单创建时间` AS order_created_time,
                       c.extCode        AS spu_code,
                       c.skcStatus      AS skc_status,
                       c.skcSiteStatus  AS skc_site_status
                FROM dwd_temu_semi_recent_order_list AS o
                         LEFT JOIN dwd_temu_product_skc_pagequery c on o.`SKC ID` = c.productSkcId
                WHERE o.etl_time >= :start
                  AND o.etl_time < :end
                ORDER BY o.etl_time ASC, c.etl_time ASC, o.`SKC ID` ASC, o.`SKU ID` ASC, o.`SPU ID` ASC
                LIMIT :idx,1024;
                """;
        final var params = new MapSqlParameterSource();
        params.addValue("start", start);
        params.addValue("end", end);
        params.addValue("idx", idx);
        return this.query(sql, params, new TemuOrderSkcRowMapper());
    }

    public List<TemuOrderSkc> listEtlTime(final LocalDateTime start, final LocalDateTime end) {
        final var sql = """
                SELECT o.`SKU ID`       AS SKU_ID,
                       o.`SKC ID`       AS SKC_ID,
                       o.`SPU ID`       AS SPU_ID,
                       o.etl_time       AS etl_time,
                       o.`订单创建时间` AS order_created_time,
                       c.extCode        AS spu_code,
                       c.skcStatus      AS skc_status,
                       c.skcSiteStatus  AS skc_site_status
                FROM dwd_temu_semi_recent_order_list AS o
                         LEFT JOIN dwd_temu_product_skc_pagequery c on o.`SKC ID` = c.productSkcId
                WHERE o.etl_time >= :start
                  AND o.etl_time < :end
                ORDER BY o.etl_time ASC, c.etl_time ASC, o.`SKC ID` ASC, o.`SKU ID` ASC, o.`SPU ID` ASC;
                """;
        final var params = new MapSqlParameterSource();
        params.addValue("start", start);
        params.addValue("end", end);
        return this.query(sql, params, new TemuOrderSkcRowMapper());
    }

    public List<TemuOrderSkc> listBySkcId(final String skcId) {
        final var sql = """
                 SELECT o.`SKU ID`       AS SKU_ID,
                        o.`订单号`       AS order_code,
                        o.`应履约件数`   AS order_number,
                        o.`商品属性`     AS commodity_attr,
                        o.`订单状态`     AS order_status,
                        c.productSkcId       AS SKC_ID,
                        c.productId       AS SPU_ID,
                        o.etl_time       AS etl_time,
                        o.`订单创建时间` AS order_created_time,
                        c.extCode        AS spu_code,
                        c.skcStatus      AS skc_status,
                        c.skcSiteStatus  AS skc_site_status
                 FROM dwd_temu_semi_recent_order_list AS o
                          LEFT JOIN dwd_temu_product_skc_pagequery c on o.`SKC ID` = c.productSkcId
                 WHERE o.`SKC ID` = :skcId
                ORDER BY o.`订单创建时间`  ASC , o.etl_time DESC, c.etl_time DESC;
                """;
        final var params = new MapSqlParameterSource();
        params.addValue("skcId", skcId);
        return this.query(sql, params, new TemuOrderSkcRowMapper());
    }
public List<TemuOrderSkc> listBySkcCode(final String skcCode) {
        final var sql = """
                 SELECT o.`SKU ID`       AS SKU_ID,
                        o.`订单号`       AS order_code,
                        o.`应履约件数`   AS order_number,
                        o.`商品属性`     AS commodity_attr,
                        o.`订单状态`     AS order_status,
                        c.productSkcId       AS SKC_ID,
                        c.productId       AS SPU_ID,
                        o.etl_time       AS etl_time,
                        o.`订单创建时间` AS order_created_time,
                        c.extCode        AS spu_code,
                        c.skcStatus      AS skc_status,
                        c.skcSiteStatus  AS skc_site_status
                 FROM dwd_temu_semi_recent_order_list AS o
                          LEFT JOIN dwd_temu_product_skc_pagequery c on o.`SKC ID` = c.productSkcId
                 WHERE c.extCode = :skcCode
                ORDER BY o.`订单创建时间`  ASC , o.etl_time DESC, c.etl_time DESC;
                """;
        final var params = new MapSqlParameterSource();
        params.addValue("skcCode", skcCode);
        return this.query(sql, params, new TemuOrderSkcRowMapper());
    }

    public List<TemuOrderSkc> listBySpuId(final Long spuId) {
        final var sql = """
                 SELECT o.`SKU ID`       AS SKU_ID,
                        o.`订单号`       AS order_code,
                        o.`应履约件数`   AS order_number,
                        o.`商品属性`     AS commodity_attr,
                        o.`订单状态`     AS order_status,
                        c.productSkcId       AS SKC_ID,
                        c.productId       AS SPU_ID,
                        o.etl_time       AS etl_time,
                        o.`订单创建时间` AS order_created_time,
                        c.extCode        AS spu_code,
                        c.skcStatus      AS skc_status,
                        c.skcSiteStatus  AS skc_site_status
                 FROM dwd_temu_semi_recent_order_list AS o
                          LEFT JOIN dwd_temu_product_skc_pagequery c on o.`SKC ID` = c.productSkcId
                 WHERE o.`SPU ID` = :spuId
                ORDER BY o.`订单创建时间`  ASC , o.etl_time DESC, c.etl_time DESC;
                """;
        final var params = new MapSqlParameterSource();
        params.addValue("spuId", spuId);
        return this.query(sql, params, new TemuOrderSkcRowMapper());
    }

    public List<String> listSkcIdEtlTime(final LocalDateTime start, final LocalDateTime end) {
        final var sql = """
                SELECT `SKC ID` 
                FROM dwd_temu_semi_recent_order_list
                WHERE etl_time >= :start
                  AND etl_time < :end
                GROUP BY `SKC ID`;
                """;
        final var params = new MapSqlParameterSource();
        params.addValue("start", start);
        params.addValue("end", end);
        return this.queryForList(sql, params, String.class);
    }

    public Long countByEtlTime(final LocalDateTime start, final LocalDateTime end) {
        final var sql = "SELECT COUNT(*) AS total FROM " + TABLE +
                " WHERE etl_time >= :start AND etl_time < :end";
        final var params = new MapSqlParameterSource();
        params.addValue("start", start);
        params.addValue("end", end);
        return template.queryForObject(sql, params, Long.class);
    }

    public Long countEtlTime(final LocalDateTime start, final LocalDateTime end) {
        final var sql = """
                SELECT COUNT(*)
                FROM dwd_temu_semi_recent_order_list AS o
                         LEFT JOIN dwd_temu_product_skc_pagequery c on o.`SKC ID` = c.productSkcId
                WHERE o.etl_time >= :start
                  AND o.etl_time < :end;
                """;
        final var params = new MapSqlParameterSource();
        params.addValue("start", start);
        params.addValue("end", end);
        return template.queryForObject(sql, params, Long.class);
    }

    private String sql() {
        return "SELECT " + CLOS + " FROM " + TABLE;
    }
}
