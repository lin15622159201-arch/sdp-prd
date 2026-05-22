package tech.tiangong.sdp.external;

import cn.hutool.extra.spring.SpringUtil;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import team.aikero.blade.auth.UserContexts;
import team.aikero.blade.core.exception.BusinessException;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.butted.client.ClipLabelClient;
import tech.tiangong.butted.common.req.ClipLabelTaskReq;
import tech.tiangong.butted.common.vo.ClipLabelTaskVo;
import tech.tiangong.sdp.convert.BasicConvert;

import java.util.Objects;

/**
 * Clip标签远程接口
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/19 16:07
 */
@Slf4j
@UtilityClass
public class ClipLabelApi {
    private final ClipLabelClient clipLabelClient = SpringUtil.getBean(ClipLabelClient.class);

    public void create(final ClipLabelTaskReq req) {
        log.info("创建Clip标签任务参数\t{}", JsonsKt.toJsonPretty(req));
        BasicConvert.invoke("创建Clip标签任务失败", () -> UserContexts.withSystemUser(() -> clipLabelClient.manualCreate(req)));
    }

    public ClipLabelTaskVo getByBusId(final Long busId) {
        final var data = BasicConvert.invoke("查询Clip标签任务失败", () -> clipLabelClient.getByBusId(busId));
        if (Objects.isNull(data)) {
            log.error("查询Clip标签任务为空\t{}", busId);
            throw new BusinessException("查询Clip标签任务为空:" + busId);
        }
        return data;
    }

    public ClipLabelTaskVo getByBusIdOrNull(final Long busId) {
        try {
            return getByBusId(busId);
        } catch (Exception e) {
            log.error("任务不存在\t{}", busId);
            return null;
        }
    }
}
