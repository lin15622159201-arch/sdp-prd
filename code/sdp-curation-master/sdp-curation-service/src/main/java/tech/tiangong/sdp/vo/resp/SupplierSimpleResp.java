package tech.tiangong.sdp.vo.resp;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Data
public class SupplierSimpleResp implements Serializable {

    @Serial
    private static final long serialVersionUID = 7004855187305100586L;
    /**
     * 供应商id
     */
    private Long supplierId;
    /**
     * 供应商名称
     */
    private String supplierName;
    /**
     * 供应商编码
     */
    private String supplierCode;
    /**
     * 供应商状态 0-禁用 1-启用
     */
    private Integer supplierState;

}
