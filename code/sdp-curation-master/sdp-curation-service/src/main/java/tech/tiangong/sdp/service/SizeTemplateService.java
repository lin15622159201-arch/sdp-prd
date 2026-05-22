package tech.tiangong.sdp.service;

import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.vo.req.SizeTemplateAddReq;
import tech.tiangong.sdp.vo.req.SizeTemplateEditReq;
import tech.tiangong.sdp.vo.req.SizeTemplateEnableReq;
import tech.tiangong.sdp.vo.req.SizeTemplatePageReq;
import tech.tiangong.sdp.vo.resp.SizeTemplateResp;

import java.util.List;

/**
 * 尺码模板
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/17 14:34
 */
public interface SizeTemplateService {
    Boolean batchCreate(final List<SizeTemplateAddReq> req);

    Boolean batchRemove(final List<Long> sizeTemplateIds);

    Boolean batchEnable(final List<SizeTemplateEnableReq> req);

    Boolean edit(final SizeTemplateEditReq req);

    PageVo<SizeTemplateResp> page(final SizeTemplatePageReq req);
}
