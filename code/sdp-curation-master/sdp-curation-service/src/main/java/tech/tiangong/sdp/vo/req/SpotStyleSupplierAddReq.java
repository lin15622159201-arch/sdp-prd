package tech.tiangong.sdp.vo.req;

import cn.hutool.core.util.StrUtil;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * 现货管理 - 新增
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/5 16:34
 */
@Data
public class SpotStyleSupplierAddReq implements Serializable {
    @Serial
    private static final long serialVersionUID = -4391674368482052617L;
    /**
     * 供应商ID
     */
    private Long supplierId;
    /**
     * 供应商编码
     */
    private String supplierCode;

    /**
     * 供应商名称
     */
    @Size(max = 20, message = "供应商名称不能大于20")
    private String supplierName;

    /**
     * 收款人id
     */
    private Long payeeId;

    /**
     * 收款人编码
     */
    private String payeeCode;

    /**
     * 收款人名称
     */
    private String payeeName;

    /**
     * 供应商款号
     */
    @Size(max = 20, message = "供应商款号不能大于20")
    private String supplierStyleCode;

    /**
     * 采购价
     */
    @NotNull(message = "采购价不能为空")
    @DecimalMax(value = "9999.99", message = "采购价最大不能超过9999.99")
    private BigDecimal purchasePrice;

    public boolean add() {
        return Objects.requireNonNullElse(this.supplierId, 0L) == 0L;
    }

    public boolean edit() {
        return Objects.requireNonNullElse(this.supplierId, 0L) > 0L;
    }

    public String key3() {
        return supplierName + ":" + payeeName + ":" + supplierStyleCode;
    }

    public String key2() {
        return supplierName + ":" + supplierStyleCode;
    }

    public boolean hasKey3() {
        return StrUtil.isNotBlank(supplierName) && StrUtil.isNotBlank(payeeName) && StrUtil.isNotBlank(supplierStyleCode);
    }

    public boolean hasKey2() {
        return StrUtil.isNotBlank(supplierName) && StrUtil.isNotBlank(supplierStyleCode);
    }
}
