package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Objects;

/**
 * 商品SKU 表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/22 18:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "product_sku")
public class ProductSku extends BaseMessageEntity {
    /**
     * 商品SKC id
     */
    @TableId(value = "product_sku_id", type = IdType.INPUT)
    private Long productSkuId;

    /**
     * 商品 id
     */
    @TableField("product_id")
    private Long productId;

    /**
     * 商品SKC id
     */
    @TableField("product_skc_id")
    private Long productSkcId;

    /**
     * SKC id
     */
    @TableField("sku_id")
    private Long skuId;

    /**
     * SKC 号
     */
    @TableField("sku_code")
    private String skuCode;

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
     * 平台SKU ID
     */
    @TableField("platform_sku_id")
    private Long platformSkuId;

    /**
     * sku体积:长，单位mm
     */
    @TableField("volume_len")
    private Long volumeLen;

    /**
     * sku体积:宽，单位mm
     */
    @TableField("volume_width")
    private Long volumeWidth;

    /**
     * sku体积:高，单位mm
     */
    @TableField("volume_height")
    private Long volumeHeight;

    /**
     * sku 重量
     */
    @TableField("weight")
    private Long weight;

    /**
     * 币种 (CNY: 人民币, USD: 美元) (默认人民币)
     */
    @TableField("currency_type")
    private String currencyType;

    /**
     * 预览图
     */
    @TableField("thumb_url")
    private String thumbUrl;
    /**
     * sku分类单品数量，sku分类为单品的默认是1，sku分类为混合套装时，单品数量需要等于包装清单物品数量之和
     */
    @TableField("number_of_pieces")
    private Integer numberOfPieces;
    /**
     * 包装数量(对应Temu内计共含),2：同款多件装，3：混合套装时候
     */
    @TableField("number_of_pack")
    private Integer numberOfPack;
    /**
     * 包装清单
     */
    @TableField("packing_list")
    private String packingList;
    /**
     * sku分类，1：单品，2：同款多件装，3：混合套装
     */
    @TableField("sku_classification")
    private Integer skuClassification;
    /**
     * SKU状态
     */
    @TableField("sku_state")
    private Integer skuState;
    /**
     * 动销
     */
    @TableField("sales_driving")
    private Integer salesDriving;
    /**
     * 是否独立包装，当sku分类为同款多件装或混合套装时，必填
     */
    @TableField("individually_packed")
    private Integer individuallyPacked;

    /**
     * 下单时间
     */
    @TableField("order_time")
    private LocalDateTime orderTime;

    public boolean singleSku() {
        return Objects.equals(1, skuClassification);
    }
}
