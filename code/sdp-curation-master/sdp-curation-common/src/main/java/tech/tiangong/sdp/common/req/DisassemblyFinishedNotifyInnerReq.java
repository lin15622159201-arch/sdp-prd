package tech.tiangong.sdp.common.req;


import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * PLM拆版完成时同步SDP
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/21 14:33
 */
@EqualsAndHashCode(callSuper = false)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DisassemblyFinishedNotifyInnerReq implements Serializable {
    @Serial
    private static final long serialVersionUID = -1325801486454136557L;


    /**
     * 设计款拆版完成信息列表
     */
    @Valid
    @NotEmpty(message = "取消参数不能为空")
    private List<DisassemblyFinished> finishedItemList;


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class DisassemblyFinished implements Serializable {
        private static final long serialVersionUID = 1L;

        /**
         * 设计款编码
         */
        @NotBlank(message = "设计款编码不能为空")
        private String designCode;

        /**
         * 拆版完成时间
         */
        private LocalDateTime disassemblyFinishedTime;

    }



}
