package tech.tiangong.sdp.external;

import cn.hutool.extra.spring.SpringUtil;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import team.aikero.blade.auth.UserContexts;
import team.aikero.blade.core.exception.BusinessException;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.butted.common.req.base.CompanyUserBatchReq;
import tech.tiangong.sdp.convert.BasicConvert;

import java.util.List;
import java.util.Objects;
import tech.tiangong.butted.client.AutoCropTaskOpenClient;
import tech.tiangong.butted.common.req.AutoCropTaskReq;
import tech.tiangong.butted.common.vo.AutoCropTaskVo;

/**
 * 自动裁剪任务远程接口
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/19 18:01
 */
@Slf4j
@UtilityClass
public class AutoCropTaskApi {

    private final AutoCropTaskOpenClient autoCropTaskOpenClient = SpringUtil.getBean(AutoCropTaskOpenClient.class);


    public void create(final CompanyUserBatchReq<AutoCropTaskReq> req) {
        log.info("创建自动裁剪任务参数\t{}", JsonsKt.toJsonPretty(req));
        BasicConvert.invoke("创建自动裁剪任务失败", () -> autoCropTaskOpenClient.batchCreate(req));
    }

    public List<AutoCropTaskVo> getByBusIds(final List<Long> busIds) {
        final var data = BasicConvert.invoke("查询自动裁剪任务失败", () -> autoCropTaskOpenClient.listByBusId(busIds));
        if (Objects.isNull(data)) {
            log.error("查询自动裁剪任务为空\t{}", busIds);
            throw new BusinessException("查询自动裁剪任务为空:" + busIds);
        }
        return data;
    }

    public List<AutoCropTaskVo> getByBusIdOrNull(final List<Long> busIds) {
        try {
            return getByBusIds(busIds);
        } catch (Exception e) {
            log.error("任务不存在\t{}", busIds);
            return null;
        }
    }
}
