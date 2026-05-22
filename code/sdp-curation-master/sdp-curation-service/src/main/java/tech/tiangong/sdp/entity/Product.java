package tech.tiangong.sdp.entity;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.enums.ProductTagEnum;
import tech.tiangong.sdp.enums.TemuTaskOptTypeEnum;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * 商品表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/22 18:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "product")
public class Product extends BaseMessageEntity {

    /**
     * 商品 id
     */
    @TableId(value = "product_id", type = IdType.INPUT)
    private Long productId;
    /**
     * 平台商品 ID
     */
    @TableField("platform_product_id")
    private Long platformProductId;
    /**
     * 版本号
     */
    @TableField("version")
    private Long version;

    /**
     * 店铺 ID
     */
    @TableField("shop_id")
    private Long shopId;

    /**
     * 款式 id
     */
    @TableField("style_id")
    private Long styleId;

    /**
     * 款号
     */
    @TableField("style_code")
    private String styleCode;

    /**
     * 尺码组 id
     */
    @TableField("group_id")
    private Long groupId;

    /**
     * 商品状态：0-发布中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；
     */
    @TableField("product_status")
    private Integer productStatus;

    /**
     * 商品名称
     */
    @TableField("product_name")
    private String productName;

    /**
     * 商品英文名称
     */
    @TableField("product_en_name")
    private String productEnName;

    /**
     * 关联平台品类编码
     */
    @TableField("platform_category_code")
    private String platformCategoryCode;

    /**
     * 关联平台品类名称
     */
    @TableField("platform_category_name")
    private String platformCategoryName;

    /**
     * 尺码
     */
    @TableField("size")
    private String size;

    /**
     * 部位
     */
    @TableField("part")
    private String part;

    /**
     * 商品标签
     */
    @TableField("product_tag")
    private String productTag;

    /**
     * 承诺发货天
     */
    @TableField("promised_delivery_day")
    private Integer promisedDeliveryDay;

    /**
     * 运费模板 ID
     */
    @TableField("freight_template_id")
    private String freightTemplateId;

    /**
     * 站点 ID
     */
    @TableField("site_id")
    private String siteId;

    /**
     * 尺码模板 ID
     */
    @TableField("size_template_id")
    private String sizeTemplateId;

    /**
     * 重点展示尺码模板 ID
     */
    @TableField("show_size_template_id")
    private String showSizeTemplateId;

    /**
     * 素材图
     */
    @TableField("material_img_url")
    private String materialImgUrl;

    /**
     * 款式图
     */
    @TableField("style_img_url")
    private String styleImgUrl;

    /**
     * 视频地址
     */
    @TableField("video_url")
    private String videoUrl;

    /**
     * 尺码图
     */
    @TableField("size_url")
    private String sizeUrl;

    /**
     * 款式标签编码
     */
    @TableField("style_label_code")
    private String styleLabelCode;

    /**
     * 款式标签名称
     */
    @TableField("style_label_name")
    private String styleLabelName;

    /**
     * 波段编码
     */
    @TableField("waveband_code")
    private String wavebandCode;

    /**
     * 波段名称
     */
    @TableField("waveband_name")
    private String wavebandName;

    /**
     * 设计师 id
     */
    @TableField("designer_id")
    private Long designerId;

    /**
     * 设计师名称
     */
    @TableField("designer_name")
    private String designerName;

    /**
     * 上架人 id
     */
    @TableField("on_shelver_id")
    private Long onShelverId;

    /**
     * 上架人名称
     */
    @TableField("on_shelver_name")
    private String onShelverName;

    /**
     * 上架时间
     */
    @TableField("on_shelves_time")
    private LocalDateTime onShelvesTime;

    /**
     * 开款类型
     */
    @TableField("style_type")
    private String styleType;
    /**
     * 隐藏的
     * 0-否；1-是
     */
    @TableField("hidden")
    private Integer hidden;

    /**
     * 失败提示
     */
    @TableField("fail_message")
    private String failMessage;
    @TableField(exist = false)
    private List<ProductAttr> attrs;

    @TableField(exist = false)
    private List<ProductSkc> skcs;

    @TableField(exist = false)
    private List<ProductSku> skus;

    @TableField(exist = false)
    private List<ProductSkuMainSpec> mainSpecs;

    @TableField(exist = false)
    private List<ProductSkuSiteSupplierPrice> prices;

    @TableField(exist = false)
    private List<ProductSize> productSizes;

    @TableField(exist = false)
    private List<ProductSizePart> sizeParts;

    @TableField(exist = false)
    private List<ProductSkuSpec> skuSpecs;

    @TableField(exist = false)
    private List<ProductSkuWarehouse> warehouses;

    @TableField(exist = false)
    private List<ProductSpecAttr> specAttrs;

    @TableField(exist = false)
    private List<ProductWarehouseRoute> warehouseRoutes;

    @TableField(exist = false)
    private List<ProductWhExtAttr> extAttrs;

    @TableField(exist = false)
    private List<StyleReviewLog> logs;

    @TableField(exist = false)
    private List<TemuProductFile> files;

    @TableField(exist = false)
    private List<TemuTask> tasks;
    @TableField(exist = false)
    private TemuTaskOptTypeEnum taskOptType;
    @TableField(exist = false)
    private Long taskParentId;

    public List<Long> sizeTemplateIdArr() {
        if (StrUtil.isNotBlank(this.sizeTemplateId)) {
            return JsonsKt.parseJsonList(this.sizeTemplateId, Long.class);
        }
        return new ArrayList<>();
    }

    public List<String> sizeArr() {
        if (StrUtil.isNotBlank(this.size)) {
            return JsonsKt.parseJsonList(this.size, String.class);
        }
        return new ArrayList<>();
    }

    public List<Long> showSizeTemplateIdArr() {
        if (StrUtil.isNotBlank(this.showSizeTemplateId)) {
            return JsonsKt.parseJsonList(this.showSizeTemplateId, Long.class);
        }
        return new ArrayList<>();
    }

    public List<String> productTagArr() {
        if (StrUtil.isNotBlank(this.productTag)) {
            return JsonsKt.parseJsonList(this.productTag, String.class);
        }
        return new ArrayList<>();
    }

    public void addSizeTemplateId(final Long id) {
        final var arr = this.sizeTemplateIdArr();
        arr.add(id);
        this.sizeTemplateId = JsonsKt.toJson(arr);
    }

    public void addShowSizeTemplateId(final Long id) {
        final var arr = this.showSizeTemplateIdArr();
        arr.add(id);
        this.showSizeTemplateId = JsonsKt.toJson(arr);
    }

    public boolean addProductTag(final String tag) {
        final var arr = this.productTagArr();
        if (arr.contains(tag)) {
            return false;
        }
        arr.add(tag);
        this.productTag = JsonsKt.toJson(arr);
        return true;
    }

    public boolean removeProductTag(final String tag) {
        if (StrUtil.isBlank(tag)) {
            return false;
        }
        final var arr = this.productTagArr();
        if (!arr.contains(tag)) {
            return true;
        }
        final var tags = new ArrayList<String>();
        if (arr.size() == 1) {
            this.productTag = JsonsKt.toJson(tags);
            return true;
        }
        arr.stream().filter(it -> !StrUtil.equalsIgnoreCase(tag, it)).forEach(tags::add);
        this.productTag = JsonsKt.toJson(tags);
        return true;
    }

    public boolean hadTestPrice() {
        if (StrUtil.isBlank(this.productTag)) {
            return false;
        }
        return JsonsKt.parseJsonList(this.productTag, String.class)
                .stream().anyMatch(it -> ProductTagEnum.testPrice().contains(it));
    }

    public boolean hadToBeUpdate() {
        if (StrUtil.isBlank(this.productTag)) {
            return false;
        }
        return JsonsKt.parseJsonList(this.productTag, String.class).contains(ProductTagEnum.TO_BE_UPDATED.getCode());
    }

    public boolean published() {
        return Objects.requireNonNullElse(this.getPlatformProductId(), 0L) > 1;
    }

    public boolean hidden() {
        return Objects.equals(Bool.YES.getCode(), this.hidden);
    }
}
