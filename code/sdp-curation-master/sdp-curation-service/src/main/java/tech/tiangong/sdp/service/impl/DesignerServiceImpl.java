package tech.tiangong.sdp.service.impl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tech.tiangong.sdp.external.DesignerRemoteHelper;
import tech.tiangong.sdp.service.DesignerService;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.DesignerResp;
import java.util.List;

/**
 * 设计师Service
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/4 15:31
 */
@Slf4j
@Service
@AllArgsConstructor
public class DesignerServiceImpl  implements DesignerService {

    private final DesignerRemoteHelper designerRemoteHelper;


    @Override
    public List<DesignerResp> designerInfoList(DesignerReq req) {
        return this.designerRemoteHelper.queryDesigner(req);
    }
}
