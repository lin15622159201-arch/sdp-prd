package tech.tiangong.sdp.repository;

import org.springframework.stereotype.Repository;
import tech.tiangong.sdp.entity.FieldType;
import tech.tiangong.sdp.mapper.FieldTypeMapper;

/**
 * 字段类型表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class FieldTypeRepository extends ManualBaseRepository<FieldTypeMapper, FieldType> {
}
