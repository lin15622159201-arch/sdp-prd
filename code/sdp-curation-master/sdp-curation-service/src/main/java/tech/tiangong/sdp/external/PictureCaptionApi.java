package tech.tiangong.sdp.external;

import cn.hutool.extra.spring.SpringUtil;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import team.aikero.blade.auth.UserContexts;
import team.aikero.blade.core.exception.BusinessException;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.butted.client.PictureCaptionClient;
import tech.tiangong.butted.common.req.PictureCaptionSourceReq;
import tech.tiangong.butted.common.vo.PictureCaptionTaskVo;
import tech.tiangong.sdp.convert.BasicConvert;

import java.util.Objects;

/**
 * 图片描述远程接口
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/19 18:01
 */
@Slf4j
@UtilityClass
public class PictureCaptionApi {
    private final PictureCaptionClient pictureCaptionClient = SpringUtil.getBean(PictureCaptionClient.class);

    public void create(final PictureCaptionSourceReq req) {
        log.info("创建图片描述任务参数\t{}", JsonsKt.toJsonPretty(req));
        BasicConvert.invoke("创建图片描述任务失败", () -> UserContexts.withSystemUser(() -> pictureCaptionClient.create(req)));
    }

    public PictureCaptionTaskVo getByBusId(final Long busId) {
        final var data = BasicConvert.invoke("查询图片描述任务失败", () -> pictureCaptionClient.getByBusId(busId));
        if (Objects.isNull(data)) {
            log.error("查询图片描述任务为空\t{}", busId);
            throw new BusinessException("查询图片描述任务为空:" + busId);
        }
        return data;
    }

    public PictureCaptionTaskVo getByBusIdOrNull(final Long busId) {
        try {
            return getByBusId(busId);
        } catch (Exception e) {
            log.error("任务不存在\t{}", busId);
            return null;
        }
    }
}
