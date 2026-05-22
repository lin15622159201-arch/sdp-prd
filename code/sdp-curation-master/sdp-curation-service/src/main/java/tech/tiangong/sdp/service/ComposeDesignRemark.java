package tech.tiangong.sdp.service;


import tech.tiangong.sdp.entity.DesignRemarks;
import tech.tiangong.sdp.vo.req.DesignRemarksReq;

/**
 * @Author Husky
 * @create 2021/8/19
 */
public interface ComposeDesignRemark {
    DesignRemarks compose(DesignRemarksReq req, DesignRemarks designRemarks);
}
