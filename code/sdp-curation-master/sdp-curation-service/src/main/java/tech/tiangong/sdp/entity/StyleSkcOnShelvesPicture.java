package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.enums.PictureTypeEnum;

import java.util.Objects;

/**
 * 款-SKC上架图片表(style_skc_on_shelves_picture)实体类
 *
 * @author liuhongfu
 * @since 2025-11-03 14:39:38
 */
@EqualsAndHashCode(callSuper = true)
@Data
@TableName(value = "style_skc_on_shelves_picture")
public class StyleSkcOnShelvesPicture extends BaseTenantUserEntity {
    /**
     * 图片ID
     */
    @TableId(value = "picture_id", type = IdType.INPUT)
    private Long pictureId;


    /**
     * 款ID
     */
    @TableField(value = "style_id")
    private Long styleId;

    /**
     * SKC-ID
     */
    @TableField(value = "skc_id")
    private Long skcId;


    /**
     * 图片类型，0-商品图，1-尺码图，2-营销图
     */
    @TableField(value = "picture_type")
    private Integer pictureType;


    /**
     * 材料类型: 0-图片; 1-视频
     */
    @TableField(value = "material_type")
    private Integer materialType;


    /**
     * 图片URL
     */
    @TableField(value = "picture_url")
    private String pictureUrl;

    /**
     * 裁剪图
     */
    @TableField(value = "crop_img_url")
    private String cropImgUrl;


    /**
     * 序号
     */
    @TableField(value = "serial_num")
    private Integer serialNum;


    public boolean skcImage() {
        return Objects.requireNonNullElse(skcId, 0L) > 0L;
    }

    public boolean spuImage() {
        return Objects.equals(Objects.requireNonNullElse(skcId, 0L), 0L);
    }

    /**
     * 款式管理的营销图
     * @return
     */
    public boolean designSkcMarketingImage() {
        return Objects.equals(Objects.requireNonNullElse(pictureType, 0), PictureTypeEnum.MARKETING_IMAGE.getCode());
    }

}


