package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 品类关联 - 新增
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 10:50
 */
@Data
public class PlatformCategoryMappingAddReq implements Serializable {
    @Serial
    private static final long serialVersionUID = -4229050885533990579L;
    /**
     * 平台编码
     */
    @NotEmpty(message = "平台编码不能为空")
    private String platformCode;

    /**
     * 平台名称
     */
    @NotEmpty(message = "平台名称不能为空")
    private String platformName;

    /**
     * 品类编码
     */
    @NotEmpty(message = "品类编码不能为空")
    private String categoryCode;

    /**
     * 品类名
     */
    @NotEmpty(message = "品类名不能为空")
    private String categoryName;

    /**
     * 关联平台品类编码
     */
    @NotEmpty(message = "平台品类编码不能为空")
    private String platformCategoryCode;

    /**
     * 关联平台品类名称
     */
    @NotEmpty(message = "平台品类名称不能为空")
    private String platformCategoryName;
    /**
     * 信息备注
     */
    private String message;
}
