package tech.tiangong.sdp.repository;

import org.springframework.stereotype.Repository;
import tech.tiangong.sdp.entity.OperationType;
import tech.tiangong.sdp.mapper.OperationTypeMapper;

/**
 * 操作类型表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class OperationTypeRepository extends ManualBaseRepository<OperationTypeMapper, OperationType> {
}
