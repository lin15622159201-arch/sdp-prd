package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

/**
 * 现货管理 - 审核上架结果
 *
 * @author ：liuhongfu@zj.tech
 * @version :1.0
 * @date ：2025/11/4 10:03
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpotStyleTaskOnShelvesReviewReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 5738720753391660379L;

    /**
     * SPU ID
     */
    @NotNull(message = "SPU Id不能为空")
    private Long spuId;

    /**
     * 审核结果
     * 通过：true
     * 不通过：false
     */
    @NotNull(message = "审核结果不能为空")
    private Boolean pass;

    /**
     * 审核不通过原因
     */
    private String failMessage;
}
