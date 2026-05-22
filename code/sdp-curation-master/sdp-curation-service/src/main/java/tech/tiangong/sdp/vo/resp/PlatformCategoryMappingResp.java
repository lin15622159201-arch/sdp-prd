package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.common.resp.BaseVO;

import java.io.Serial;

/**
 * 品类映射
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 15:09
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class PlatformCategoryMappingResp extends BaseVO {
    @Serial
    private static final long serialVersionUID = 7521406760601706176L;
    /**
     * 映射 ID
     */
    private Long mappingId;

    /**
     * 平台编码
     */
    private String platformCode;

    /**
     * 平台名称
     */
    private String platformName;

    /**
     * 品类编码
     */
    private String categoryCode;

    /**
     * 品类名
     */
    private String categoryName;

    /**
     * 关联平台品类 ID
     */
    private String platformCategoryCode;

    /**
     * 关联平台品类名称
     */
    private String platformCategoryName;

    /**
     * 信息备注
     */
    private String message;
}
