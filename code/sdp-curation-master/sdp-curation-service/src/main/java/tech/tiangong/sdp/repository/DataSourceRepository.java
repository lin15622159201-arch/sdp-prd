package tech.tiangong.sdp.repository;

import org.springframework.stereotype.Repository;
import tech.tiangong.sdp.entity.DataSource;
import tech.tiangong.sdp.mapper.DataSourceMapper;

/**
 * 数据来源表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class DataSourceRepository extends ManualBaseRepository<DataSourceMapper, DataSource> {
}
