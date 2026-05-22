package tech.tiangong.sdp.external;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.extra.spring.SpringUtil;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import team.aikero.blade.core.exception.BusinessException;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.bfg.common.req.BaseLabelQueryReq;
import tech.tiangong.bfg.common.resp.BaseLabelVo;
import tech.tiangong.bfg.sdk.client.FmClient;
import tech.tiangong.sdp.convert.BasicConvert;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Fm远程接口
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/21 18:18
 */
@Slf4j
@UtilityClass
public class FmApi {
    private final FmClient fmClient = SpringUtil.getBean(FmClient.class);

    public Set<String> aiConfCodes() {
        final var req = new BaseLabelQueryReq();
        req.setClassCode("FM240402539");
        return aiConfList(req).stream().map(BaseLabelVo::getCode).collect(Collectors.toUnmodifiableSet());
    }

    /**
     * AI品类查询
     */
    public List<BaseLabelVo> aiConfList(final BaseLabelQueryReq req) {
        log.info("AI品类查询参数\t{}", JsonsKt.toJsonPretty(req));
        final var data = BasicConvert.invoke("AI品类查询失败", () -> fmClient.listAllByQuery(req));
        if (CollectionUtil.isEmpty(data)) {
            throw new BusinessException("AI品类查询为空");
        }
        return data;
    }
}
