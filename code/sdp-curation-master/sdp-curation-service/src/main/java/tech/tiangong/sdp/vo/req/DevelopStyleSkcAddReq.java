package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 开款任务 - 开款
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 11:14
 */
@Data
public class DevelopStyleSkcAddReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 4441462669874845280L;

    /**
     * 颜色名称
     */
    @NotEmpty(message = "颜色名称不能为空")
    private String color;
    /**
     * 颜色名称编码
     */
    @NotEmpty(message = "颜色名称编码不能为空")
    private String colorCode;
    /**
     * 颜色英文名
     */
    @NotEmpty(message = "颜色英文名不能为空")
    private String colorEnName;
}
