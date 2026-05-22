package tech.tiangong.sdp.vo.req;

import cn.hutool.core.util.StrUtil;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import tech.tiangong.sdp.enums.DevelopStyleRelaTypeEnum;
import tech.tiangong.sdp.enums.DevelopStyleTypeEnum;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

/**
 * 开款任务 - 新增
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 18:52
 */
@Data
public class DevelopStyleTaskAddReq implements Serializable {
    @Serial
    private static final long serialVersionUID = -2284475141952545118L;
    /**
     * 选款结果ID
     */
    private Long pickingResultId;

    /**
     * 款式id
     */
    private Long pickingStyleId;

    /**
     * 开款类型
     */
    @NotNull(message = "开款类型不能为空")
    private DevelopStyleTypeEnum styleType;


    /**
     * 开款数据来源类型
     */
    private String taskSource = "user_upload";


    /**
     * 供应商名称
     */
    @Size(max = 20 , message = "供应商名称不能大于20")
    private String supplierName;

    /**
     * 供应商款号
     */
    @Size(max = 20 , message = "供应商款号不能大于20")
    private String supplierStyleCode;

    /**
     * 商品链接
     */
    @Size(max = 512 , message = "商品链接不能大于512")
    private String commodityLink;

    /**
     * 价格
     */
    @DecimalMax(value = "9999.99" , message = "价格最大不能超过9999.99")
    private BigDecimal price;

    /**
     * 波段编码
     */
    private String wavebandCode;

    /**
     * 波段名称
     */
    private String wavebandName;

    /**
     * 款式品类编码
     */
    private String categoryCode;

    /**
     * 款式品类名
     */
    private String categoryName;

    /**
     * 款式标签编码
     */
    private String styleLabelCode;

    /**
     * 款式标签名称
     */
    private String styleLabelName;

    /**
     * 店铺id
     */
    private Long storeId;

    /**
     * 店铺名称
     */
    private String storeName;

    /**
     * 主图url
     */
    @NotEmpty(message = "主图不能为空")
    private String mainImgUrl;

    /**
     * 款号
     */
    private String spuCode;


    /**
     * 平台编码
     */
    private String platformCode;

    /**
     * 平台名称
     */
    private String platformName;


    /**
     * 信息备注
     */
    private String message;

    /**
     * 关联类型
     */
    private DevelopStyleRelaTypeEnum relaType;

    /**
     * 关联ID
     */
    private Long relaId;

    /**
     * 关联编号
     */
    private String relaCode;
    /**
     * 图片
     */
    private List<String> images;


    public Long getPickingResultId() {
        return pickingResultId;
    }

    public void setPickingResultId(Long pickingResultId) {
        this.pickingResultId = pickingResultId;
    }

    public Long getPickingStyleId() {
        return pickingStyleId;
    }

    public void setPickingStyleId(Long pickingStyleId) {
        this.pickingStyleId = pickingStyleId;
    }

    public DevelopStyleTypeEnum getStyleType() {
        return styleType;
    }

    public void setStyleType(DevelopStyleTypeEnum styleType) {
        this.styleType = styleType;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public String getSupplierStyleCode() {
        return supplierStyleCode;
    }

    public void setSupplierStyleCode(String supplierStyleCode) {
        this.supplierStyleCode = supplierStyleCode;
    }

    public String getCommodityLink() {
        return commodityLink;
    }

    public void setCommodityLink(String commodityLink) {
        this.commodityLink = commodityLink;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getWavebandCode() {
        return wavebandCode;
    }

    public void setWavebandCode(String wavebandCode) {
        this.wavebandCode = wavebandCode;
    }

    public String getWavebandName() {
        return wavebandName;
    }

    public void setWavebandName(String wavebandName) {
        this.wavebandName = wavebandName;
    }

    public String getCategoryCode() {
        return categoryCode;
    }

    public void setCategoryCode(String categoryCode) {
        this.categoryCode = categoryCode;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getStyleLabelCode() {
        return styleLabelCode;
    }

    public void setStyleLabelCode(String styleLabelCode) {
        this.styleLabelCode = styleLabelCode;
    }

    public String getStyleLabelName() {
        return styleLabelName;
    }

    public void setStyleLabelName(String styleLabelName) {
        this.styleLabelName = styleLabelName;
    }

    public Long getStoreId() {
        return storeId;
    }

    public void setStoreId(Long storeId) {
        this.storeId = storeId;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getMainImgUrl() {
        return mainImgUrl;
    }

    public void setMainImgUrl(String mainImgUrl) {
        this.mainImgUrl = mainImgUrl;
    }

    public String getSpuCode() {
        return spuCode;
    }

    public void setSpuCode(String spuCode) {
        this.spuCode = spuCode;
    }

    public String getPlatformCode() {
        return platformCode;
    }

    public void setPlatformCode(String platformCode) {
        this.platformCode = platformCode;
    }

    public String getPlatformName() {
        return platformName;
    }

    public void setPlatformName(String platformName) {
        this.platformName = platformName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public DevelopStyleRelaTypeEnum getRelaType() {
        return relaType;
    }

    public void setRelaType(DevelopStyleRelaTypeEnum relaType) {
        this.relaType = relaType;
    }

    public Long getRelaId() {
        return relaId;
    }

    public void setRelaId(Long relaId) {
        this.relaId = relaId;
    }

    public String getRelaCode() {
        return relaCode;
    }

    public void setRelaCode(String relaCode) {
        this.relaCode = relaCode;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public boolean hasKey2() {
        return StrUtil.isNotBlank(supplierName) && StrUtil.isNotBlank(supplierStyleCode);
    }
    public String key2() {
        return supplierName + ":" + supplierStyleCode;
    }
}
