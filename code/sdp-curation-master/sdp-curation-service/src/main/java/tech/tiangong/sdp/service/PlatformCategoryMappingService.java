package tech.tiangong.sdp.service;

import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.vo.req.PlatformCategoryMappingAddReq;
import tech.tiangong.sdp.vo.req.PlatformCategoryMappingPageReq;
import tech.tiangong.sdp.vo.resp.PlatformCategoryMappingResp;

import java.util.List;

/**
 * 品类关联
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/16 18:29
 */
public interface PlatformCategoryMappingService {
    Boolean batchCreate(final List<PlatformCategoryMappingAddReq> req);
    Boolean batchRemove(final List<Long> mappingIds);
    PageVo<PlatformCategoryMappingResp> page(final PlatformCategoryMappingPageReq req);
}
