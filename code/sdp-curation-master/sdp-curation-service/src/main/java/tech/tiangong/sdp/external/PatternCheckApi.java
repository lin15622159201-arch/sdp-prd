package tech.tiangong.sdp.external;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.extra.spring.SpringUtil;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import team.aikero.blade.core.exception.BusinessException;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.butted.client.PatternCheckTaskOpenClient;
import tech.tiangong.butted.common.req.PatternCheckTaskReq;
import tech.tiangong.butted.common.req.base.CompanyUserBatchReq;
import tech.tiangong.butted.common.vo.PatternCheckTaskVo;
import tech.tiangong.sdp.convert.BasicConvert;

import java.util.List;

/**
 * 款式分类任务
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/10/17 14:39
 */
@Slf4j
@UtilityClass
public class PatternCheckApi {
    private final PatternCheckTaskOpenClient patternCheckTaskOpenClient = SpringUtil.getBean(PatternCheckTaskOpenClient.class);

    public void create(final CompanyUserBatchReq<PatternCheckTaskReq> req) {
        log.info("创建款式分类任务参数\t{}", JsonsKt.toJsonPretty(req));
        BasicConvert.invoke("创建款式分类任务失败", () -> patternCheckTaskOpenClient.batchCreate(req));
    }

    public PatternCheckTaskVo getByBusId(final Long id) {
        final var data = BasicConvert.invoke("款式分类任务失败", () -> patternCheckTaskOpenClient.listByBusId(List.of(id)));
        if (CollectionUtil.isEmpty(data)) {
            log.error("款式分类任务为空\t{}", id);
            throw new BusinessException("款式分类任务为空:" + id);
        }
        return data.getFirst();
    }

    public PatternCheckTaskVo getByBusIdOrNull(final Long id) {
        try {
            return getByBusId(id);
        } catch (BusinessException e) {
            log.error("款式分类任务不存在\t{}", id);
            return null;
        }
    }
    public void suspend(final Long id) {
        log.info("中止款式分类请求开始，任务ID：\t{}", id);
        BasicConvert.invoke("取消款式分类任务失败", () -> patternCheckTaskOpenClient.suspendByBusId(id));
    }
}
