package tech.tiangong.sdp.repository;

import org.springframework.stereotype.Repository;
import tech.tiangong.sdp.entity.FieldValidation;
import tech.tiangong.sdp.mapper.FieldValidationMapper;

/**
 * 字段校验表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class FieldValidationRepository extends ManualBaseRepository<FieldValidationMapper, FieldValidation> {
}
