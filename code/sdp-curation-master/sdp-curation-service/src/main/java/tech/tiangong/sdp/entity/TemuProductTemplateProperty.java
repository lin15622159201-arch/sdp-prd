package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * Temu商品模板-属性表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "temu_product_template_property")
public class TemuProductTemplateProperty extends BaseMessageEntity {
    /**
     * 主键 ID
     */
    @TableId(value = "property_id", type = IdType.INPUT)
    private Long propertyId;
    /**
     * 模板 ID
     */
    @TableField(value = "template_id")
    private Long templateId;

    /**
     * 尺码名
     */
    @TableField("property")
    private String property;

}
