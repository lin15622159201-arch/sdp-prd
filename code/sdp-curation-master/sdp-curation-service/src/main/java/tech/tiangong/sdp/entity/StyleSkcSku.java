package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * SKU表
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/12/11 10:33
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "style_skc_sku", autoResultMap = true)
public class StyleSkcSku extends BaseTenantUserEntity {

    /**
     * SKU-ID
     */
    @TableId(value = "sku_id", type = IdType.INPUT)
    private Long skuId;


    /**
     * SKU编码
     */
    @TableField("sku_code")
    private String skuCode;

    /**
     * 款ID
     */
    @TableField("style_id")
    private Long styleId;

    /**
     * SKC-ID
     */
    @TableField("skc_id")
    private Long skcId;

    /**
     * SPU-尺码组
     */
    @TableField("group_name")
    private String groupName;

    /**
     * SKC-尺码
     */
    @TableField("size_name")
    private String sizeName;

    /**
     * 来源尺码组编号(PLM)
     */
    @TableField("plm_group_code")
    private String plmGroupCode;


}
