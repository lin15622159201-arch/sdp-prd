package tech.tiangong.sdp.common.req;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 买手取消参数
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/2 14:38
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BuyerEditSkuImageItemReq implements Serializable {

    @Serial
    private static final long serialVersionUID = -3941761092079004497L;
    /**
     * 设计款编码
     */
    @NotBlank(message = "设计款编码不能为空")
    private String designCode;

    /**
     * 客户图片	
     */
    private List<String> customerPicture;
}
