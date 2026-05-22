package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * 款式管理-SPU素材信息表
 * 表名: design_style_material
 *
 * @author liuhongfu
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("design_style_material")
public class DesignStyleMaterial extends BasicMessageTask {

    /**
     * 主键
     */
    @TableId(value = "design_style_material_id", type = IdType.ASSIGN_ID)
    private Long designStyleMaterialId;

    /**
     * spu主键Id
     */
    @TableField(value = "design_style_id")
    private Long designStyleId;


    /**
     * SPU编码
     */
    @TableField(value = "style_code")
    private String styleCode;


    /**
     * 素材url
     */
    @TableField("material_url")
    private String materialUrl;


    /**
     * 材料类型: 0-图片; 1-视频
     */
    @TableField("material_type")
    private Integer materialType;

    public Long getDesignStyleMaterialId() {
        return designStyleMaterialId;
    }

    public void setDesignStyleMaterialId(Long designStyleMaterialId) {
        this.designStyleMaterialId = designStyleMaterialId;
    }

    public String getStyleCode() {
        return styleCode;
    }

    public void setStyleCode(String styleCode) {
        this.styleCode = styleCode;
    }

    public String getMaterialUrl() {
        return materialUrl;
    }

    public void setMaterialUrl(String materialUrl) {
        this.materialUrl = materialUrl;
    }

    public Integer getMaterialType() {
        return materialType;
    }

    public void setMaterialType(Integer materialType) {
        this.materialType = materialType;
    }
}