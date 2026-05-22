package tech.tiangong.sdp.external;

import cn.hutool.core.collection.CollectionUtil;
import com.zjkj.aigc.common.exception.BaseBizException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import team.aikero.blade.core.exception.BusinessException;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.vo.resp.DictValueBatchListVo;
import java.util.List;

/**
 * <p>
 * 字典值Feign接口调用helper
 * </p>
 *
 * @author liuhongfu
 */
@Service
@Slf4j
@AllArgsConstructor
public class DictValueRemoteHelper {
    private final DictValueClient dictValueClient;


    public List<DictValueBatchListVo> getDictValueByCode(String code, String type) {
        final var resp = this.listByDictCodes(List.of(code));
        if (CollectionUtil.isEmpty(resp)) {
            log.info(type + "查询字典信息不存在，字典编码:{}", type);
            throw new BaseBizException("查询" + type + "信息返回空，请检查，编码：" + code);
        }
        return resp;
    }

    /**
     * 字典值 - 批量查询
     */
    public List<DictValueBatchListVo> listByDictCodes(List<String> dictCodes) {
        try {
            final var response = dictValueClient.listByDictCodes(dictCodes);
            log.info("=== 字典值查询-response:{}", JsonsKt.toJsonPretty(response));
            if (!response.getSuccessful()) {
                throw new BusinessException("字典值查询失败:" + response.getMessage());
            }
            return response.getData();
        } catch (Exception e) {
            throw new BusinessException("字典值查询失败:" + e.getMessage(), e);
        }
    }
}
