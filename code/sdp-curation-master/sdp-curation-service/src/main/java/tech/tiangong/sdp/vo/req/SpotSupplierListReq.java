package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

/**
 * SpotSupplierListReq
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/11 18:52
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpotSupplierListReq implements Serializable {
    @Serial
    private static final long serialVersionUID = -8648721500955365239L;
    /**
     * 供应商名称
     */
    @NotEmpty(message = "供应商名称不能为空")
    private String supplierName;
    /**
     * 供应商款号
     */
    @NotEmpty(message = "供应商款号不能为空")
    private String supplierStyleCode;
}
