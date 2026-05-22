package tech.tiangong.sdp.service;

import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.vo.req.SizeDiffAddReq;
import tech.tiangong.sdp.vo.req.SizeDiffEditReq;
import tech.tiangong.sdp.vo.req.SizeDiffPageReq;
import tech.tiangong.sdp.vo.resp.SizeDiffResp;

/**
 * 尺码档差Service
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/2/27 10:21
 */
public interface SizeDiffService {
    Boolean create(final SizeDiffAddReq req);

    PageVo<SizeDiffResp> page(final SizeDiffPageReq req);

    Boolean edit(final SizeDiffEditReq req);
}
