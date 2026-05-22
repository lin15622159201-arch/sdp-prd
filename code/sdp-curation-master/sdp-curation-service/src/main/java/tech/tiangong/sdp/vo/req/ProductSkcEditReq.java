package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 商品-SKC文件编辑
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/13 10:33
 */
@Data
public class ProductSkcEditReq implements Serializable {
    @Serial
    private static final long serialVersionUID = -8605948248000946654L;
    /**
     * 商品SKC ID
     */
    @NotNull(message = "商品SKC ID不能为空")
    private Long productSkcId;


    /**
     * 图片
     */
    private List<String> images;
}
