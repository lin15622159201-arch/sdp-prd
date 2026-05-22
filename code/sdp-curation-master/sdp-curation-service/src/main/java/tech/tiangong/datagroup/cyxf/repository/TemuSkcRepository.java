package tech.tiangong.datagroup.cyxf.repository;

import cn.hutool.core.collection.CollectionUtil;
import org.springframework.jdbc.core.namedparam.EmptySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;
import tech.tiangong.datagroup.cyxf.entity.TemuSkc;
import tech.tiangong.datagroup.cyxf.entity.TemuSkcRowMapper;

import java.time.LocalDateTime;
import java.util.List;

/**
 * TemuSkcRepository
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/27 11:23
 */
@Repository
public class TemuSkcRepository extends CyxfBaseRepository {
    private final static String TABLE = "dwd_temu_product_skc_pagequery";
    private final static String CLOS = " productskcid,extCode,skcStatus,skcSiteStatus,etl_time";

    public List<TemuSkc> list() {
        return this.query("SELECT " + CLOS + " FROM " + TABLE + " LIMIT 10;", EmptySqlParameterSource.INSTANCE, new TemuSkcRowMapper());
    }

    public TemuSkc getFirst() {
        final var data = this.query("SELECT " + CLOS + " FROM " + TABLE + " ORDER BY etl_time ASC LIMIT 1;", EmptySqlParameterSource.INSTANCE, new TemuSkcRowMapper());
        if (CollectionUtil.isEmpty(data)) {
            return null;
        }
        return data.getFirst();
    }

    public List<TemuSkc> listByEtlTime(final int idx, final LocalDateTime start, final LocalDateTime end) {
        final var sql = sql() +
                " WHERE etl_time >= :start AND etl_time < :end" +
                " ORDER BY etl_time ASC  , productId ASC ,productSkcId ASC " +
                " LIMIT :idx , 1024";
        final var params = new MapSqlParameterSource();
        params.addValue("start", start);
        params.addValue("end", end);
        params.addValue("idx", idx);
        return this.query(sql, params, new TemuSkcRowMapper());
    }

    public List<TemuSkc> listBySkcCode(final List<String> skcCodes) {
        final var sql = "SELECT * FROM " + TABLE +
                " WHERE extCode IN  (:skcCodes) ;";
        final var params = new MapSqlParameterSource();
        params.addValue("skcCodes", skcCodes);
        return this.query(sql, params, new TemuSkcRowMapper());
    }

    public List<TemuSkc> listByEtlTimeAndProductIds(final int batchSize, final LocalDateTime start, final LocalDateTime end, final List<String> productIds) {
        final var sql = sql() +
                " WHERE etl_time >= :start AND etl_time < :end AND productskcid IN (:productIds)" +
                " ORDER BY etl_time ASC  , productId ASC ,productSkcId ASC  " +
                " LIMIT :size";
        final var params = new MapSqlParameterSource();
        params.addValue("start", start);
        params.addValue("end", end);
        params.addValue("productIds", productIds);
        params.addValue("size", batchSize);
        return this.query(sql, params, new TemuSkcRowMapper());
    }

    public Long countByEtlTime(final LocalDateTime start, final LocalDateTime end) {
        final var sql = "SELECT COUNT(*) AS total FROM " + TABLE +
                " WHERE etl_time >= :start AND etl_time < :end";
        final var params = new MapSqlParameterSource();
        params.addValue("start", start);
        params.addValue("end", end);
        return template.queryForObject(sql, params, Long.class);
    }

    public Long countByEtlTimeAndProductIds(final LocalDateTime start, final LocalDateTime end, final List<Long> productIds) {
        final var sql = "SELECT COUNT(*) AS total FROM " + TABLE +
                " WHERE etl_time >= :start AND etl_time < :end AND productskcid IN (:productIds)";
        final var params = new MapSqlParameterSource();
        params.addValue("start", start);
        params.addValue("end", end);
        params.addValue("productIds", productIds);
        return template.queryForObject(sql, params, Long.class);
    }

    private String sql() {
        return "SELECT " + CLOS + " FROM " + TABLE;
    }
}
