package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 现货管理 - 编辑商品图
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 10:50
 */
@Data
public class SpotStyleEditProductImageReq implements Serializable {

    @Serial
    private static final long serialVersionUID = -767408251128847247L;
    /**
     * 编码
     */
    @NotEmpty(message = "编码不能为空")
    private String taskCode;

    /**
     * 商品图片
     */
    @NotEmpty(message = "商品图片不能为空")
    @Size(max = 20, message = "商品图片不能超过20")
    private List<String> productImages;

}
