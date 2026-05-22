package tech.tiangong.sdp.service.yoc;

import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.entity.YocOperationLog;
import tech.tiangong.sdp.vo.req.yoc.YocOperationLogPageReq;
import tech.tiangong.sdp.vo.resp.yoc.YocOperationLogResp;

/**
 * YOC操作日志服务接口
 *
 * <p>提供操作日志的保存、查询等业务操作</p>
 *
 * @author while
 * @since 1.0.0
 */
public interface YocOperationLogService {

    /**
     * 保存操作日志
     * <p>
     * 保存操作日志到数据库
     * </p>
     *
     * @param operationLog 操作日志实体
     * @return 是否保存成功
     */
    boolean save(YocOperationLog operationLog);

    /**
     * 分页查询操作日志
     * <p>
     * 根据查询条件分页查询操作日志列表，支持多条件组合查询。
     * </p>
     *
     * @param req 查询请求参数，包含筛选条件和分页信息
     * @return 操作日志列表分页数据
     */
    PageVo<YocOperationLogResp> page(YocOperationLogPageReq req);
}
