package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 现货管理 - 编辑SKC
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 11:14
 */
@Data
public class SpotStyleSkcEditReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 7414839932189858576L;
    /**
     * SKC ID
     */
    @NotNull(message = "SKC ID不能为空")
    private Long skcId;
    /**
     * 任务id
     */
    @NotNull(message = "任务id不能为空")
    private Long taskId;

    /**
     * 主图url
     */
    private String mainImgUrl;
    /**
     * 颜色名称
     */
    @NotEmpty(message = "颜色名称不能为空")
    private String color;

    /**
     * 颜色英文名
     */
    @NotEmpty(message = "颜色英文名不能为空")
    private String colorEnName;

    /**
     * 尺码标准
     */
    @NotEmpty(message = "尺码标准不能为空")
    private String sizeStandardName;

    /**
     * 尺码标准编号
     */
    @NotEmpty(message = "尺码标准编号不能为空")
    private String sizeStandardCode;
    /**
     * 商品图片
     */
    @NotEmpty(message = "商品图片不能为空")
    private List<String> productImages;
}
