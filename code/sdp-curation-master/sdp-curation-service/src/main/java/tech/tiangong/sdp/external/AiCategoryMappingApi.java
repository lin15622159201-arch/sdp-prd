package tech.tiangong.sdp.external;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.extra.spring.SpringUtil;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import team.aikero.blade.core.exception.BusinessException;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.vo.req.AiCategoryMappingBatchQuery;
import tech.tiangong.sdp.vo.resp.AiCategoryMappingVO;

import java.util.ArrayList;
import java.util.List;

/**
 * AI品类远程接口
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/21 18:32
 */
@Slf4j
@UtilityClass
public class AiCategoryMappingApi {
    private final AiCategoryMappingClient aiCategoryMappingClient = SpringUtil.getBean(AiCategoryMappingClient.class);

    public List<AiCategoryMappingVO> listMapping() {
        final var codes = FmApi.aiConfCodes();
        final var req = new AiCategoryMappingBatchQuery();
        req.setAiCategoryCodes(new ArrayList<>(codes));
        final var data = BasicConvert.invoke("AI品类查询失败", () -> aiCategoryMappingClient.findByAiCategoryCode(req));
        if (CollectionUtil.isEmpty(data)) {
            throw new BusinessException("AI品类查询为空");
        }
        return data;
    }
}
