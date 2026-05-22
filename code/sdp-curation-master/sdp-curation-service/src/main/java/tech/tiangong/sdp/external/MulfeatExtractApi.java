package tech.tiangong.sdp.external;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.extra.spring.SpringUtil;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import team.aikero.blade.auth.UserContexts;
import team.aikero.blade.core.exception.BusinessException;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.butted.client.MulfeatExtractTaskOpenClient;
import tech.tiangong.butted.common.req.MulfeatExtractTaskReq;
import tech.tiangong.butted.common.req.base.CompanyUserBatchReq;
import tech.tiangong.butted.common.vo.MulfeatExtractTaskVo;
import tech.tiangong.sdp.convert.BasicConvert;

import java.util.List;

/**
 * 服装特征提取远程接口
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/19 18:01
 */
@Slf4j
@UtilityClass
public class MulfeatExtractApi {
    private final MulfeatExtractTaskOpenClient mulfeatExtractTaskOpenClient = SpringUtil.getBean(MulfeatExtractTaskOpenClient.class);

    public void create(final CompanyUserBatchReq<MulfeatExtractTaskReq> req) {
        log.info("创建服装特征提取任务参数\t{}", JsonsKt.toJsonPretty(req));
        BasicConvert.invoke("创建服装特征提取任务失败", () -> UserContexts.withSystemUser(() -> mulfeatExtractTaskOpenClient.batchCreate(req)));
    }

    public MulfeatExtractTaskVo getByBusId(final Long busId) {
        final var data = BasicConvert.invoke("服装特征提取任务失败", () -> mulfeatExtractTaskOpenClient.listByBusId(List.of(busId)));
        if (CollectionUtil.isEmpty(data)) {
            log.error("服装特征提取任务为空\t{}", busId);
            throw new BusinessException("服装特征提取任务为空:" + busId);
        }
        return data.getFirst();
    }

    public MulfeatExtractTaskVo getByBusIdOrNull(final Long busId) {
        try {
            return getByBusId(busId);
        } catch (Exception e) {
            log.error("任务不存在\t{}", busId);
            return null;
        }
    }
}
