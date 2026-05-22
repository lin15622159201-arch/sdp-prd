package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;
import tech.tiangong.sdp.enums.DevelopStyleTypeEnum;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 开款任务 - 新增 （对外）
 *
 * @author ：liuhongfu@zj.tech
 * @version :1.0
 * @date ：2025/11/3 18:52
 */
@Data
public class DevelopStyleTaskOpenAddReq implements Serializable {
    @Serial
    private static final long serialVersionUID = -2284475141952545118L;

    /**
     * 款式图片（最多支持十张）
     */
    @NotEmpty(message = "款式图片不能为空")
    private List<String> images;


    /**
     * 开款类型:
     * 现货款:SPOT_STYLE
     * AI款:AI_STYLE
     * 跟卖款:SHARED_LISTING
     */
    @NotNull(message = "开款类型不能为空")
    private DevelopStyleTypeEnum styleType;


    /**
     * 店铺ID
     */
    @NotNull(message = "店铺ID不能为空")
    private Long storeId;

    /**
     * 店铺名称
     */
    @NotBlank(message = "店铺名称不能为空")
    private String storeName;


    /**
     * 花型图ID
     */
    private Long patternPictureId;

    /**
     * 花型图URL
     */
    private String patternPictureUrl;

    /**
     * 物料数组
     */
    private List<BomOrderMaterial> bomOrderMaterialList;

    /**
     * SPU-SKC 请求信息
     */
    @Data
    @SuperBuilder
    @Accessors(chain = true)
    @NoArgsConstructor
    public static class BomOrderMaterial implements Serializable {
        @Serial
        private static final long serialVersionUID = -3572155942378577417L;

        /**
         * 物料类型: 1, 面料; 2, 辅料; 3:特殊辅料
         */
        private Integer demandType;

        /**
         * 物料SPU-ID（商品id）
         */
        private Long commodityId;

        /**
         * 物料SPU（商品编码）
         */
        private String commodityCode;

        /**
         * skuId
         */
        private Long skuId;

        /**
         * sku编号
         */
        private String skuCode;

    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public DevelopStyleTypeEnum getStyleType() {
        return styleType;
    }

    public void setStyleType(DevelopStyleTypeEnum styleType) {
        this.styleType = styleType;
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

    public Long getPatternPictureId() {
        return patternPictureId;
    }

    public void setPatternPictureId(Long patternPictureId) {
        this.patternPictureId = patternPictureId;
    }

    public String getPatternPictureUrl() {
        return patternPictureUrl;
    }

    public void setPatternPictureUrl(String patternPictureUrl) {
        this.patternPictureUrl = patternPictureUrl;
    }

    public List<BomOrderMaterial> getBomOrderMaterialList() {
        return bomOrderMaterialList;
    }

    public void setBomOrderMaterialList(List<BomOrderMaterial> bomOrderMaterialList) {
        this.bomOrderMaterialList = bomOrderMaterialList;
    }
}
