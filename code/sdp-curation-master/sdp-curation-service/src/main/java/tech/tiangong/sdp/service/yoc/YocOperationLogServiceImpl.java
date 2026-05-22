package tech.tiangong.sdp.service.yoc;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import team.aikero.blade.core.protocol.PageVo;
import team.aikero.blade.sequence.id.IdHelper;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.entity.YocOperationLog;
import tech.tiangong.sdp.mapper.YocOperationLogMapper;
import tech.tiangong.sdp.vo.req.yoc.YocOperationLogPageReq;
import tech.tiangong.sdp.vo.resp.yoc.YocOperationLogResp;

/**
 * YOC操作日志服务实现类
 * <p>
 * 实现YOC系统操作日志的查询功能，支持分页查询和多条件组合查询。
 * </p>
 *
 * @author while
 * @since 1.0.0
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class YocOperationLogServiceImpl implements YocOperationLogService {

    private final YocOperationLogMapper yocOperationLogMapper;

    /**
     * 保存操作日志
     *
     * @param operationLog 操作日志实体
     * @return 是否保存成功
     */
    @Override
    public boolean save(YocOperationLog operationLog) {
        operationLog.setId(IdHelper.getId());
        return yocOperationLogMapper.insert(operationLog) > 0;
    }

    /**
     * 分页查询操作日志
     *
     * @param req 查询请求参数
     * @return 操作日志列表分页数据
     */
    @Override
    public PageVo<YocOperationLogResp> page(YocOperationLogPageReq req) {
        log.info("YOC操作日志服务 - 分页查询操作日志, tenantId: {}",
                req.getTenantId());

        LambdaQueryWrapper<YocOperationLog> queryWrapper = new LambdaQueryWrapper<>();

        // 租户ID过滤
        if (req.getTenantId() != null) {
            queryWrapper.eq(YocOperationLog::getTenantId, req.getTenantId().toString());
        }
        // 操作类型过滤
        if (req.getOperationType() != null) {
            queryWrapper.eq(YocOperationLog::getOperationType, req.getOperationType());
        }
        // 业务ID过滤
        if (req.getBusinessId() != null) {
            queryWrapper.eq(YocOperationLog::getBusinessId, req.getBusinessId());
        }
        // 创建人ID过滤
        if (req.getCreatorId() != null) {
            queryWrapper.eq(YocOperationLog::getCreatorId, req.getCreatorId());
        }
        // 时间范围过滤
        if (req.getOperationStartTime() != null) {
            queryWrapper.ge(YocOperationLog::getCreateTime, req.getOperationStartTime());
        }
        if (req.getOperationEndTime() != null) {
            queryWrapper.le(YocOperationLog::getCreateTime, req.getOperationEndTime());
        }

        queryWrapper.orderByDesc(YocOperationLog::getCreateTime);

        Page<YocOperationLog> page = yocOperationLogMapper.selectPage(new Page<>(req.getPageNum(), req.getPageSize())
                , queryWrapper);

        return BasicConvert.pageVo(page, this::convertToResp);

    }
    private YocOperationLogResp convertToResp(YocOperationLog entity) {
        if (entity == null) {
            return null;
        }
        return BasicConvert.copy(entity, YocOperationLogResp.class);
    }
}
