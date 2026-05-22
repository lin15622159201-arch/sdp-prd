package tech.tiangong.sdp.repository;

import org.springframework.stereotype.Repository;
import tech.tiangong.sdp.entity.ValidationRule;
import tech.tiangong.sdp.mapper.ValidationRuleMapper;

/**
 * 校验规则表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class ValidationRuleRepository extends ManualBaseRepository<ValidationRuleMapper, ValidationRule> {
}
