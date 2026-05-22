package tech.tiangong.sdp.vo.resp;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 现货管理 - 供应商
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/6 15:00
 */
@Data
public class SpotStyleSupplierResp implements Serializable {
    @Serial
    private static final long serialVersionUID = -3760976268369283137L;
    /**
     * 任务id
     */
    private Long taskId;
    /**
     * 任务编号
     */
    private String taskCode;
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
    private String supplierStyleCode;

    /**
     * 采购价
     */
    private BigDecimal purchasePrice;
}
