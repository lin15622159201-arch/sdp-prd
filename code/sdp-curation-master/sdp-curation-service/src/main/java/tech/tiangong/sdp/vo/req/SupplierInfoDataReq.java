package tech.tiangong.sdp.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SupplierInfoDataReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 4596431991444125073L;
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
    /**
     * 合作模式code,数据字典 pims_order_label
     */
    private List<String> cooperationCode;
    /**
     * 供应商状态 0-禁用 1-启用
     */
    private Integer supplierState;
    /**
     * 供应商名称,支持精确查询
     */
    private String exactSupplierName;

    /**
     * 供应商名称,支持精确查询
     */
    private List<String> exactSupplierNames;

}
