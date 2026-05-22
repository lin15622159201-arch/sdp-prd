package tech.tiangong.sdp.service;

import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.common.req.ShopInnerPageReq;
import tech.tiangong.sdp.common.resp.ShopInnerResp;
import tech.tiangong.sdp.vo.dto.TemuAppDTO;
import tech.tiangong.sdp.vo.req.ShopAddReq;
import tech.tiangong.sdp.vo.req.ShopEditReq;
import tech.tiangong.sdp.vo.req.ShopEnableReq;
import tech.tiangong.sdp.vo.req.ShopPageReq;
import tech.tiangong.sdp.vo.resp.ShopResp;

import java.util.List;

/**
 * 店铺
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/17 9:49
 */
public interface ShopService {
    Boolean batchCreate(final List<ShopAddReq> req);

    Boolean batchRemove(final List<Long> shopIds);

    Boolean batchEnable(final List<ShopEnableReq> req);

    Boolean edit(final ShopEditReq req);

    PageVo<ShopResp> page(final ShopPageReq req);

    TemuAppDTO getApp(final Long shopId);

    PageVo<ShopInnerResp> pageInner(final ShopInnerPageReq req);

    void job();
    void invalid(final Long shopId);
}
