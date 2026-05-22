package tech.tiangong.sdp.repository;

import org.springframework.stereotype.Repository;
import tech.tiangong.sdp.entity.TemuProductTemplate;
import tech.tiangong.sdp.mapper.TemuProductTemplateMapper;

/**
 * Temu尺码规格元素表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class TemuProductTemplateRepository extends ManualBaseRepository<TemuProductTemplateMapper, TemuProductTemplate> {
}
