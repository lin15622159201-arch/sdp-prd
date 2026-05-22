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
import java.time.LocalDateTime;
import java.util.Objects;

/**
 * Temu核价单表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/1 11:39
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "temu_price_review_order")
public class TemuPriceReviewOrder extends BaseMessageEntity {
    /**
     * 主键id
     */
    @TableId(value = "review_id", type = IdType.INPUT)
    private Long reviewId;

    /**
     * 核价单id
     */
    @TableField("order_id")
    private Long orderId;

    /**
     * 店铺ID
     */
    @TableField("shop_id")
    private Long shopId;

    /**
     * 平台SKU ID
     */
    @TableField("platform_sku_id")
    private Long platformSkuId;

    /**
     * 币种 (CNY: 人民币, USD: 美元) (默认人民币)
     */
    @TableField("currency_type")
    private String currencyType;

    /**
     * 建议价格，单位 人民币：分，美元：美分
     */
    @TableField("suggest_price")
    private BigDecimal suggestPrice;

    /**
     * 申报价格，单位 人民币：分，美元：美分
     */
    @TableField("supply_price")
    private BigDecimal supplyPrice;

    /**
     * 站点ID
     */
    @TableField(value = "site_id")
    private String siteId;

    /**
     * 核价单状态
     * 核价单的状态. 可选值含义说明:[0:待核价;1:待供应商确认;2:核价通过;3:核价驳回;4:废弃;5:价格同步中;]
     */
    @TableField("order_status")
    private Integer orderStatus;

    /**
     * 是否可重新报价
     */
    @TableField("can_bargain")
    private Integer canBargain;

    /**
     * 同步给业务状态：0-未同步；1-已同步
     */
    @TableField("sync_status")
    private Integer syncStatus;

    /**
     * 同步时间
     */
    @TableField("sync_time")
    private LocalDateTime syncTime;

    /**
     * 同步次数
     */
    @TableField("sync_times")
    private Integer syncTimes;

    /**
     * CRUD
     */
    @TableField(exist = false)
    private String upset;


    public int requireSyncTimes() {
        return Objects.requireNonNullElse(syncTimes, 0);
    }

}
