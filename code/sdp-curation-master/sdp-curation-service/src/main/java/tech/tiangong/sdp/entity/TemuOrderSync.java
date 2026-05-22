package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tech.tiangong.datagroup.cyxf.entity.TemuOrderSkc;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Objects;

/**
 * Temu订单同步记录实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/1 11:39
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "temu_order_sync")
public class TemuOrderSync extends BaseMessageEntity {
    @TableId(value = "sync_id", type = IdType.INPUT)
    private Long syncId;
    /**
     * 订单号
     */
    @TableField(value = "order_code")
    private String orderCode;
    /**
     * 应履约件数
     */
    @TableField(value = "order_number")
    private BigDecimal orderNumber;
    /**
     * 商品属性
     */
    @TableField(value = "commodity_attr")
    private String commodityAttr;
    /**
     * 订单状态
     */
    @TableField(value = "order_status")
    private String orderStatus;
    /**
     * SKC ID
     */
    @TableField(value = "skc_id")
    private Long skcId;
    /**
     * SKU ID
     */
    @TableField(value = "sku_id")
    private Long skuId;
    /**
     * product ID
     */
    @TableField(value = "product_id")
    private Long productId;
    /**
     * 款号
     */
    @TableField(value = "spu_code")
    private String spuCode;
    /**
     * 父任务ID
     */
    @TableField(value = "order_created_time")
    private LocalDateTime orderCreatedTime;
    /**
     * SKC状态
     */
    @TableField(value = "skc_status")
    private String skcStatus;
    /**
     * 商品状态:1,在售;0:未发布到站点;0:下架
     */
    @TableField(value = "skc_site_status")
    private Integer skcSiteStatus;
    /**
     * 同步给业务状态：0-未同步；1-已同步
     */
    @TableField(value = "sync_status")
    private Integer syncStatus;
    /**
     * 同步时间
     */
    @TableField(value = "sync_time")
    private LocalDateTime syncTime;
    /**
     * 同步次数
     */
    @TableField(value = "sync_times")
    private Integer syncTimes;
    @TableField(exist = false)
    private TemuOrderSkc order;
    @TableField(exist = false)
    private Product product;

    public int requireSyncTimes() {
        return Objects.requireNonNullElse(syncTimes, 0);
    }

    public long orderNumber2Long() {
        if (this.orderNumber == null) {
            return 0L;
        }
        return this.orderNumber.longValue();
    }
}
