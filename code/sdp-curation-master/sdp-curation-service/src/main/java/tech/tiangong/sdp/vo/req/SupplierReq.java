package tech.tiangong.sdp.vo.req;


import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 供应商查询
 *
 * @author while
 * @since 2025-02-25 11:37:13
 */
@Data
public class SupplierReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 6872339691539289672L;
    /**
     * 供应商id
     */
    private Long supplierId;

    /**
     * 供应商编码,支持模糊查询
     */
    private String supplierCode;

    /**
     * 供应商名称,支持模糊查询
     */
    private String supplierName;

}
