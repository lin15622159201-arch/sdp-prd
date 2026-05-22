package tech.tiangong.sdp.convert;

import lombok.experimental.UtilityClass;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.PlatformCategoryMapping;
import tech.tiangong.sdp.vo.req.PlatformCategoryMappingAddReq;
import tech.tiangong.sdp.vo.resp.PlatformCategoryMappingResp;

import java.util.List;

/**
 * 品类关联工具类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/16 18:33
 */
@UtilityClass
public class PlatformCategoryMappingConvert {
    public PlatformCategoryMappingResp convert(final PlatformCategoryMapping mapping) {
        return BasicConvert.copy(mapping, PlatformCategoryMappingResp.class);
    }

    public List<PlatformCategoryMapping> convert(final List<PlatformCategoryMappingAddReq> list) {
        return list.stream().map(it -> {
            final var e = new PlatformCategoryMapping();
            BasicConvert.copy(it, e);
            BasicConvert.entityInit(e, e::setMappingId);
            e.setEnable(Bool.YES.getCode());
            return e;
        }).toList();
    }
}
