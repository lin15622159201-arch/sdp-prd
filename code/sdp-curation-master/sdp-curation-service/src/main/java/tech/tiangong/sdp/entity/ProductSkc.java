package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tech.tiangong.sdp.enums.TemuSkcStatusEnum;

import java.time.LocalDateTime;
import java.util.Objects;

/**
 * 商品SKC 表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/22 18:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "product_skc")
public class ProductSkc extends BaseMessageEntity {
    /**
     * 商品SKC id
     */
    @TableId(value = "product_skc_id", type = IdType.INPUT)
    private Long productSkcId;
    /**
     * 版本号
     */
    @TableField("version")
    private Long version;
    /**
     * 商品 id
     */
    @TableField("product_id")
    private Long productId;

    /**
     * SKC id
     */
    @TableField("skc_id")
    private Long skcId;

    /**
     * SKC编码
     */
    @TableField("skc_code")
    private String skcCode;
    /**
     * 颜色名称
     */
    @TableField("color")
    private String color;

    /**
     * 平台颜色名称
     */
    @TableField("platform_color")
    private String platformColor;
    /**
     * SKC状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；
     */
    @TableField("skc_status")
    private Integer skcStatus;
    /**
     * SKC标识 1创建商品同时创建的SKC 0在已有商品上新增的SKC
     */
    @TableField("skc_state")
    private Integer skcState;

    /**
     * 平台SKC ID
     */
    @TableField("platform_skc_id")
    private Long platformSkcId;

    /**
     * 轮播图
     */
    @TableField("carousel_url")
    private String carouselUrl;

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
     * 店铺 ID
     */
    @TableField("shop_id")
    private Long shopId;

    /**
     * 动销
     */
    @TableField("sales_driving")
    private Integer salesDriving;

    /**
     * 下单时间
     */
    @TableField("order_time")
    private LocalDateTime orderTime;

    public int syncTimes() {
        return Objects.requireNonNullElse(this.syncTimes, 0);
    }

    public boolean offShelf() {
        if (Objects.isNull(skcStatus)) {
            return false;
        }
        return TemuSkcStatusEnum.offShelf(Objects.toString(skcStatus));
    }

    public boolean onShelf() {
        if (Objects.isNull(skcStatus)) {
            return false;
        }
        return TemuSkcStatusEnum.onShelf(Objects.toString(skcStatus));
    }
}
