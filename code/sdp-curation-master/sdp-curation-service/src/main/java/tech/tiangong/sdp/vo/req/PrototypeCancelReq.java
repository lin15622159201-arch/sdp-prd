package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * 取消设计款 req
 * @author cenlijin
 * @since 2021/8/16 10:07
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrototypeCancelReq implements Serializable {

    /**
     * 设计款id
     */
    @NotNull(message = "设计款id不能为空")
    private Long prototypeId;

    /**
     * 取消原因
     */
    @NotBlank(message = "取消原因不能为空")
    private String cancelReason;

    /**
     * 取消备注
     */
    private String cancelRemark;

}
