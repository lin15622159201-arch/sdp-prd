package tech.tiangong.sdp.repository;

import org.springframework.stereotype.Repository;
import tech.tiangong.sdp.entity.FieldInteraction;
import tech.tiangong.sdp.mapper.FieldInteractionMapper;

/**
 * 字段交互表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class FieldInteractionRepository extends ManualBaseRepository<FieldInteractionMapper, FieldInteraction> {
}
