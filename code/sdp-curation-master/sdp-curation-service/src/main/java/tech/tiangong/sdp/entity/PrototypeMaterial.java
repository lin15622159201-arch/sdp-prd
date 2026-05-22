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
 * 款式管理-SKC素材信息表
 * 表名: design_style_material
 *
 * @author liuhongfu
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("prototype_material")
public class PrototypeMaterial extends BasicMessageTask {

    /**
     * 主键
     */
    @TableId(value = "prototype_material_id", type = IdType.ASSIGN_ID)
    private Long prototypeMaterialId;

    /**
     * spu主键Id
     */
    @TableField(value = "design_style_id")
    private Long designStyleId;

    /**
     * 成衣SPU(款式SPU)
     */
    @TableField(value = "style_code")
    private String styleCode;


    /**
     * SKC-ID
     */
    @TableField(value = "prototype_id")
    private Long prototypeId;


    /**
     * SKC编码
     */
    @TableField(value = "design_code")
    private String designCode;


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


    public Long getPrototypeMaterialId() {
        return prototypeMaterialId;
    }

    public void setPrototypeMaterialId(Long prototypeMaterialId) {
        this.prototypeMaterialId = prototypeMaterialId;
    }

    public Long getDesignStyleId() {
        return designStyleId;
    }

    public void setDesignStyleId(Long designStyleId) {
        this.designStyleId = designStyleId;
    }

    public Long getPrototypeId() {
        return prototypeId;
    }

    public void setPrototypeId(Long prototypeId) {
        this.prototypeId = prototypeId;
    }

    public String getDesignCode() {
        return designCode;
    }

    public void setDesignCode(String designCode) {
        this.designCode = designCode;
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