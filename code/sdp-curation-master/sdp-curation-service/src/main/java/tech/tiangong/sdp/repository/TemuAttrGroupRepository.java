package tech.tiangong.sdp.repository;

import org.springframework.stereotype.Repository;
import tech.tiangong.sdp.entity.TemuAttrGroup;
import tech.tiangong.sdp.mapper.TemuAttrGroupMapper;

/**
 * Temu属性分组表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class TemuAttrGroupRepository extends ManualBaseRepository<TemuAttrGroupMapper, TemuAttrGroup> {
}
