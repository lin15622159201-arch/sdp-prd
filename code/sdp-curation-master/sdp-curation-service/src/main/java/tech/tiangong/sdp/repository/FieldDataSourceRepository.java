package tech.tiangong.sdp.repository;

import org.springframework.stereotype.Repository;
import tech.tiangong.sdp.entity.FieldDataSource;
import tech.tiangong.sdp.mapper.FieldDataSourceMapper;

/**
 * 字段数据来源表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class FieldDataSourceRepository extends ManualBaseRepository<FieldDataSourceMapper, FieldDataSource> {
}
