package tech.tiangong.sdp.convert;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import lombok.experimental.UtilityClass;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.entity.SizeDiff;
import tech.tiangong.sdp.vo.dto.SizePartValueDTO;
import tech.tiangong.sdp.vo.req.SizeDiffAddReq;
import tech.tiangong.sdp.vo.req.SizeDiffEditReq;
import tech.tiangong.sdp.vo.resp.SizeDiffResp;

/**
 * 尺码档差工具类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/2/27 10:25
 */
@UtilityClass
public class SizeDiffConvert {
    public SizeDiff convert(final SizeDiffAddReq req) {
        final var e = new SizeDiff();
        BasicConvert.copy(req, e);
        BasicConvert.entityInit(e, e::setSizeDiffId);
        e.setEnable(Bool.YES.getCode());
        if (CollectionUtil.isNotEmpty(req.getDiffs())) {
            e.setDiffVal(JsonsKt.toJson(req.getDiffs()));
        }
        return e;
    }

    public void convert(final SizeDiffEditReq req, final SizeDiff e) {
        BasicConvert.copy(req, e);
        if (CollectionUtil.isNotEmpty(req.getDiffs())) {
            e.setDiffVal(JsonsKt.toJson(req.getDiffs()));
        }
        BasicConvert.setRevised(e);
    }

    public SizeDiffResp convert(final SizeDiff e) {
        final var resp = BasicConvert.copy(e, SizeDiffResp.class);
        if (StrUtil.isNotBlank(e.getDiffVal())) {
            resp.setDiffs(JsonsKt.parseJsonList(e.getDiffVal(), SizePartValueDTO.class));
        }
        return resp;
    }
}
