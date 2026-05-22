package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

/**
 * 现货管理 - 取消
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 10:03
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpotStyleSkcCancelReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 5738720753391660379L;
    /**
     * SKC ID
     */
    @NotNull(message = "SKC Id不能为空")
    private Long skcId;

    /**
     * 取消信息
     */
    private String message;
}
