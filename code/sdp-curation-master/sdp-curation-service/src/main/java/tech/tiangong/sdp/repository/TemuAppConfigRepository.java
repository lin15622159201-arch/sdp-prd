package tech.tiangong.sdp.repository;

import org.springframework.stereotype.Repository;
import tech.tiangong.sdp.entity.TemuAppConfig;
import tech.tiangong.sdp.mapper.TemuAppConfigMapper;

/**
 * Temu APP配置表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class TemuAppConfigRepository extends ManualBaseRepository<TemuAppConfigMapper, TemuAppConfig> {
}
