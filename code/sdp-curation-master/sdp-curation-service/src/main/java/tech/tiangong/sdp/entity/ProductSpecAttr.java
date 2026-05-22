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
 * 商品销售属性表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/22 18:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "product_spec_attr")
public class ProductSpecAttr extends BaseMessageEntity {
    /**
     * 主键 id
     */
    @TableId(value = "attr_id", type = IdType.INPUT)
    private Long attrId;

    /**
     * 商品 ID
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
     * 基础属性值id，没有的情况传0
     */
    @TableField("vid")
    private Long vid;

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
     * 规格 id
     */
    @TableField("spec_id")
    private Long specId;

    /**
     * 规格名称
     */
    @TableField("spec_name")
    private String specName;

    /**
     * 父规格 id
     */
    @TableField("parent_spec_id")
    private Long parentSpecId;

    /**
     * 父规格名称
     */
    @TableField("parent_spec_name")
    private String parentSpecName;

    /**
     * 属性值组id，没有的情况传0
     */
    @TableField("value_group_id")
    private Long valueGroupId;

    /**
     * 属性值组名称，没有的情况传空字符串
     */
    @TableField("value_group_name")
    private String valueGroupName;

}
