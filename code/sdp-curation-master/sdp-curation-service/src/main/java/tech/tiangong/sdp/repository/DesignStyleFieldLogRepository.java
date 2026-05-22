package tech.tiangong.sdp.repository;

import org.springframework.stereotype.Repository;
import tech.tiangong.sdp.entity.DesignStyleFieldLog;
import tech.tiangong.sdp.mapper.DesignStyleFieldLogMapper;

import java.util.List;

/**
 * SPU字段变更日志Repository
 *
 * @author auto-generated
 */
@Repository
public class DesignStyleFieldLogRepository extends ManualBaseRepository<DesignStyleFieldLogMapper, DesignStyleFieldLog> {

    /**
     * 按SPU ID查询字段变更日志，按版本号倒序、字段名排序
     */
    public List<DesignStyleFieldLog> listByDesignStyleId(Long designStyleId) {
        return lambdaQuery()
                .eq(DesignStyleFieldLog::getDesignStyleId, designStyleId)
                .orderByDesc(DesignStyleFieldLog::getVersionNum)
                .orderByAsc(DesignStyleFieldLog::getFieldName)
                .list();
    }
}
