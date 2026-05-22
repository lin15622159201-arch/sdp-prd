package tech.tiangong.sdp.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serial;
import java.io.Serializable;

/**
 * 商品-商品发布生成/失败请求
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 16:58
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StyleOnShelvesReleaseReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 8739452072134486893L;

    /**
     * 款号ID
     */
    @NotNull(message = "SPU-ID不能为空!")
    private Long styleId;

    /**
     * 发布结果
     * 上架：true
     * 下架：false
     */
    @NotNull(message = "发布结果不能为空!")
    private Boolean releaseSuccess;


    /**
     * 发布不通过原因
     */
    private String releaseFailReason;

}
