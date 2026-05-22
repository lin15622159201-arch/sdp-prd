package tech.tiangong.sdp.service;


import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.DesignerResp;
import java.util.List;

/**
 * 设计师Service
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/4 15:17
 */
public interface DesignerService {


    List<DesignerResp> designerInfoList(final DesignerReq req);
}
