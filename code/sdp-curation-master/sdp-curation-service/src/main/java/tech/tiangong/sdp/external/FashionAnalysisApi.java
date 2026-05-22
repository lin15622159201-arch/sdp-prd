package tech.tiangong.sdp.external;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.extra.spring.SpringUtil;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import team.aikero.blade.core.exception.BusinessException;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.butted.client.FashionAnalysisTaskOpenClient;
import tech.tiangong.butted.common.req.FashionAnalysisTaskReq;
import tech.tiangong.butted.common.req.base.CompanyUserBatchReq;
import tech.tiangong.butted.common.vo.FashionAnalysisTaskVo;
import tech.tiangong.sdp.convert.BasicConvert;

import java.util.List;

/**
 * fashion分析远程接口
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/28 16:56
 */
@Slf4j
@UtilityClass
public class FashionAnalysisApi {
    private final FashionAnalysisTaskOpenClient fashionAnalysisTaskOpenClient = SpringUtil.getBean(FashionAnalysisTaskOpenClient.class);

    public void create(final CompanyUserBatchReq<FashionAnalysisTaskReq> req) {
        log.info("创建fashion分析任务参数\t{}", JsonsKt.toJsonPretty(req));
        BasicConvert.invoke("创建fashion分析任务失败", () -> fashionAnalysisTaskOpenClient.batchCreate(req));
    }

    public FashionAnalysisTaskVo getByBusId(final Long id) {
        final var data = BasicConvert.invoke("fashion分析任务失败", () -> fashionAnalysisTaskOpenClient.listByBusId(List.of(id)));
        if (CollectionUtil.isEmpty(data)) {
            log.error("fashion分析任务为空\t{}", id);
            throw new BusinessException("fashion分析任务为空:" + id);
        }
        return data.getFirst();
    }

    public FashionAnalysisTaskVo getByBusIdOrNull(final Long id) {
        try {
            return getByBusId(id);
        } catch (BusinessException e) {
            log.error("fashion分析任务不存在\t{}", id);
            return null;
        }
    }

    public void suspend(final Long id) {
        log.info("中止fashion分析请求开始，任务ID：\t{}", id);
        BasicConvert.invoke("取消fashion分析任务失败", () -> fashionAnalysisTaskOpenClient.suspendByBusId(id));
    }
}
