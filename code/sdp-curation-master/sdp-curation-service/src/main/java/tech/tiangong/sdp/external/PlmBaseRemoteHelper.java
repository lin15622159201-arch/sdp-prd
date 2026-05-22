package tech.tiangong.sdp.external;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import team.aikero.blade.core.exception.BusinessException;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.vo.resp.ColorCategoryResp;
import java.util.List;

/**
 * <p>
 * PLM基础信息_接口调用helper
 * </p>
 *
 * @author liuhongfu
 */
@Service
@Slf4j
@AllArgsConstructor
public class PlmBaseRemoteHelper {
    private final PlmBaseClient plmBaseClient;


    /**
     * 全部类别以及下属的颜色列表
     *
     */
    public List<ColorCategoryResp> colorCategory() {
        try {
            final var response = plmBaseClient.colorCategory();
            log.info("=== 全部类别以及下属的颜色-response:{}", JsonsKt.toJsonPretty(response));
            if (!response.getSuccessful()) {
                throw new BusinessException("全部类别以及下属的颜色失败:" + response.getMessage());
            }
            return response.getData();
        } catch (Exception e) {
            throw new BusinessException("全部类别以及下属的颜色失败:" + e.getMessage(), e);
        }
    }
}
