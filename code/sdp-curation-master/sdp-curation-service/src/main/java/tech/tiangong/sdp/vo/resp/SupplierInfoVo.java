package tech.tiangong.sdp.vo.resp;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * @author while
 * @date 2025/2/25 20:37
 */
@Data
public class SupplierInfoVo implements Serializable {

    @Serial
    private static final long serialVersionUID = -6652179227955847708L;

    /**
     * 供应商id
     */
    private Long supplierId;

    /**
     * 供应商编码
     */
    private String supplierCode;

    /**
     * 供应商名称
     */
    private String supplierName;
}
