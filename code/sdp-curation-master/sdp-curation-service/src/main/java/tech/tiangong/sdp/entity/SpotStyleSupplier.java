package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

/**
 * 现货款供应商表(spot_style_supplier)实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "spot_style_supplier")
public class SpotStyleSupplier extends BasicMessageTask {

    /**
     * 供应商ID
     */
    @TableId(value = "supplier_id", type = IdType.INPUT)
    private Long supplierId;
    /**
     * 任务ID
     */
    @TableField(value = "task_id")
    private Long taskId;
    /**
     * 供应商编码
     */
    @TableField(value = "supplier_code")
    private String supplierCode;

    /**
     * 供应商名称
     */
    @TableField(value = "supplier_name")
    private String supplierName;

    /**
     * 收款人id
     */
    @TableField(value = "payee_id")
    private Long payeeId;

    /**
     * 收款人编码
     */
    @TableField(value = "payee_code")
    private String payeeCode;

    /**
     * 收款人名称
     */
    @TableField(value = "payee_name")
    private String payeeName;

    /**
     * 供应商款号
     */
    @TableField(value = "supplier_style_code")
    private String supplierStyleCode;

    /**
     * 采购价
     */
    @TableField(value = "purchase_price")
    private BigDecimal purchasePrice;
}
