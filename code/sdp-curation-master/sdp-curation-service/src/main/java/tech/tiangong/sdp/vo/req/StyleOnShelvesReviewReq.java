package tech.tiangong.sdp.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotNull;
import java.io.Serial;
import java.io.Serializable;

/**
 * 待上架列表 - 审核
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 16:58
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StyleOnShelvesReviewReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 8739452072134486893L;

    /**
     * 款号ID
     */
    @NotNull(message = "SPU-ID不能为空!")
    private Long styleId;

    /**
     * 审核结果
     * 通过：true
     * 不通过：false
     */
    private Boolean pass;


    /**
     * 审核不通过原因，不通过时候必填
     */
    private String reviewFailReason;

}
