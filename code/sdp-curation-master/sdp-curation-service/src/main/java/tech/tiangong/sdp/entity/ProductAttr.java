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
 * 商品属性表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/22 18:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "product_attr")
public class ProductAttr extends BaseMessageEntity {
    /**
     * 主键 ID
     */
    @TableId(value = "attr_id", type = IdType.INPUT)
    private Long attrId;

    /**
     * 商品 id
     */
    @TableField("product_id")
    private Long productId;

    /**
     * 模板属性 id
     */
    @TableField("template_pid")
    private Long templatePid;

    /**
     * 属性 id
     */
    @TableField("pid")
    private Long pid;

    /**
     * 引用属性 id
     */
    @TableField("ref_pid")
    private Long refPid;

    /**
     * 引用属性名
     */
    @TableField("prop_name")
    private String propName;

    /**
     * 基础属性值
     */
    @TableField("prop_value")
    private String propValue;

    /**
     * 基础属性值id，没有的情况传0
     */
    @TableField("vid")
    private Long vid;

    /**
     * 属性值单位，没有的情况传空字符串
     */
    @TableField("value_unit")
    private String valueUnit;

    /**
     * 数值录入
     */
    @TableField("number_input_value")
    private String numberInputValue;

    /**
     * 值扩展属性
     */
    @TableField("value_extend_info")
    private String valueExtendInfo;

    /**
     * 控制类型
     */
    @TableField("control_type")
    private Integer controlType;
}
