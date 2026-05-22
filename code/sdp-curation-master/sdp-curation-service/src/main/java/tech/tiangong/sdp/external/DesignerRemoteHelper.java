package tech.tiangong.sdp.external;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import team.aikero.blade.core.exception.BusinessException;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.vo.req.DesignerDataReq;
import tech.tiangong.sdp.vo.req.DesignerReq;
import tech.tiangong.sdp.vo.resp.DesignerResp;
import java.util.List;

/**
 * <p>
 * 设计师_接口调用helper
 * </p>
 *
 * @author liuhongfu
 */
@Service
@Slf4j
@AllArgsConstructor
public class DesignerRemoteHelper {
    private final DesignerClient designerClient;

    /**
     * 获取设计师列表
     *
     * @param req 入参
     */
    public List<DesignerResp> queryDesigner(DesignerReq req) {
        DesignerDataReq dataReq = new DesignerDataReq();
        dataReq.setDesignerId(req.getDesignerId());
        dataReq.setDesignerCode(req.getDesignerCode());
        dataReq.setDesignerName(req.getDesignerName());
        dataReq.setDesignerGroupCode(req.getDesignerGroupCode());
        dataReq.setDesignerGroupName(req.getDesignerGroupName());
        log.info("=== 设计师查询-req：{} ===", JsonsKt.toJsonPretty(dataReq));
        try {
            final var response = designerClient.designerInfoList(dataReq);
            log.info("=== 设计师查询-response:{}", JsonsKt.toJsonPretty(response));
            if (!response.getSuccessful()) {
                throw new BusinessException("设计师查询失败:" + response.getMessage());
            }
            return response.getData();
        } catch (Exception e) {
            throw new BusinessException("设计师查询失败:" + e.getMessage(), e);
        }
    }
}
