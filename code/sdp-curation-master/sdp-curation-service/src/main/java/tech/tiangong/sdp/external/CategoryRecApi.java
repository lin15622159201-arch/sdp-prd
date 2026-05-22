package tech.tiangong.sdp.external;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.extra.spring.SpringUtil;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import team.aikero.blade.auth.UserContexts;
import team.aikero.blade.core.exception.BusinessException;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.butted.client.CategoryRecTaskOpenClient;
import tech.tiangong.butted.common.req.CategoryRecTaskReq;
import tech.tiangong.butted.common.req.base.CompanyUserBatchReq;
import tech.tiangong.butted.common.vo.CategoryRecTaskVo;
import tech.tiangong.sdp.convert.BasicConvert;

import java.util.List;

/**
 * 品类识别远程接口
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/19 18:01
 */
@Slf4j
@UtilityClass
public class CategoryRecApi {
    private final CategoryRecTaskOpenClient categoryRecTaskOpenClient = SpringUtil.getBean(CategoryRecTaskOpenClient.class);

    public void create(final CompanyUserBatchReq<CategoryRecTaskReq> req) {
        log.info("创建品类识别任务参数\t{}", JsonsKt.toJsonPretty(req));
        BasicConvert.invoke("创建品类识别任务失败", () -> UserContexts.withSystemUser(() -> categoryRecTaskOpenClient.batchCreate(req)));
    }

    public CategoryRecTaskVo getByBusId(final Long busId) {
        final var data = BasicConvert.invoke("品类识别任务失败", () -> categoryRecTaskOpenClient.listByBusId(List.of(busId)));
        if (CollectionUtil.isEmpty(data)) {
            log.error("品类识别任务为空\t{}", busId);
            throw new BusinessException("品类识别任务为空:" + busId);
        }
        return data.getFirst();
    }

    public CategoryRecTaskVo getByBusIdOrNull(final Long busId) {
        try {
            return getByBusId(busId);
        } catch (Exception e) {
            log.error("任务不存在\t{}", busId);
            return null;
        }
    }
}
