package tech.tiangong.sdp.common.req;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;
import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * SKC取消
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/21 14:33
 */
@EqualsAndHashCode(callSuper = false)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PrototypeBatchCancelReq implements Serializable {
    @Serial
    private static final long serialVersionUID = -1325801486454136557L;


    /**
     * 设计款取消信息列表
     */
    @Valid
    @NotEmpty(message = "设计款取消信息列表不能为空")
    private List<PrototypeCancel> cancelItems;

    /**
     * SPU图片材料信息
     */
    @Data
    @SuperBuilder
    @Accessors(chain = true)
    @NoArgsConstructor
    public static class PrototypeCancel implements Serializable {
        @Serial
        private static final long serialVersionUID = -3572155942378577417L;

        /**
         * 设计款编码
         */
        @NotBlank(message = "设计款编码不能为空")
        private String designCode;

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



}
