package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 商品-文件编辑
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/13 10:33
 */
@Data
public class ProductFileEditReq implements Serializable {
    @Serial
    private static final long serialVersionUID = -8605948248000946654L;
    /**
     * 商品 ID
     */
    @NotNull(message = "商品 ID不能为空")
    private Long productId;


    /**
     * 素材图
     */
    private String materialImgUrl;

    /**
     * 视频
     */
    private String videoUrl;
    /**
     * SKC 图片列表
     */
    private List<ProductSkcEditReq> skcs;
}
