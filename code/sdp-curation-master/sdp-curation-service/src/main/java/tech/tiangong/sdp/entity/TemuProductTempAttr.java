package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * temu 商品模板属性表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "temu_product_temp_attr")
public class TemuProductTempAttr extends BaseMessageEntity {
    /**
     * 属性 ID
     */
    @TableId(value = "attr_id", type = IdType.INPUT)
    private Long attrId;

    /**
     * 父属性 ID
     */
    @TableField(value = "parent_id")
    private Long parentId;

    /**
     * 属性名称
     */
    @TableField(value = "attr_name")
    private String attrName;

    /**
     * 属性中文
     */
    @TableField(value = "attr_title")
    private String attrTitle;
    /**
     * 属性默认值
     */
    @TableField(value = "default_value")
    private String defaultValue;

    /**
     * 属性类型
     */
    @TableField(value = "attr_type")
    private Integer attrType;

    /**
     * 描述
     */
    @TableField(value = "description")
    private String description;

    /**
     * 可以用的
     */
    @TableField(value = "available")
    private Integer available;
}
