package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * Temu商品模板值表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "temu_product_temp_val")
public class TemuProductTempVal extends BaseMessageEntity {
    /**
     * 模板值 ID
     */
    @TableId(value = "val_id", type = IdType.INPUT)
    private Long valId;

    /**
     * 模板类型,0-销售属性,1-通用属性
     */
    @TableField(value = "template_type")
    private Integer templateType;

    /**
     * 模板 ID
     */
    @TableField(value = "template_id")
    private Long templateId;

    /**
     * 属性 ID
     */
    @TableField(value = "attr_id")
    private Long attrId;
    /**
     * 基础属性 ID
     */
    @TableField(value = "base_attr_id")
    private Long baseAttrId;

    /**
     * 父规格 ID
     */
    @TableField(value = "parent_spec_id")
    private Long parentSpecId;

    /**
     * 父模板值 ID
     */
    @TableField(value = "parent_val_id")
    private Long parentValId;

    /**
     * 引用属性 ID
     */
    @TableField(value = "referenced_attr_id")
    private Long referencedAttrId;

    /**
     * 属性值列表
     */
    @TableField(value = "attr_value")
    private String attrValue;

    /**
     * 属性关系列表
     */
    @TableField(value = "value_rela")
    private String valueRela;

    /**
     * 最大值
     */
    @TableField(value = "max_value")
    private String maxValue;

    /**
     * 最小值
     */
    @TableField(value = "min_value")
    private String minValue;

    /**
     * 下拉标题
     */
    @TableField(value = "choose_title")
    private String chooseTitle;

    /**
     * 下拉标题中文
     */
    @TableField(value = "choose_title_cn")
    private String chooseTitleCn;

    /**
     * 数字输入标题
     */
    @TableField(value = "number_input_title")
    private String numberInputTitle;

    /**
     * 数字输入标题中文
     */
    @TableField(value = "number_input_title_cn")
    private String numberInputTitleCn;

    /**
     * 单位列表
     */
    @TableField(value = "unit_arr")
    private String unitArr;

    /**
     * 允许的最大小数精度,0:表示不允许使用小数
     */
    @TableField(value = "value_precision")
    private Integer valuePrecision;

    /**
     * 可选择项目时的最大选择项数
     */
    @TableField(value = "choose_max_num")
    private Integer chooseMaxNum;

    /**
     * 数值规则,仅用于通用属性,前端验证:输入时(1:表示值之和等于100,2:表示仅允许输入字母/数字/特殊字符)
     */
    @TableField(value = "value_rule")
    private Integer valueRule;

    /**
     * 显式条件
     * 使用JacksonTypeHandler处理JSON类型字段
     */
    @TableField(value = "show_condition")
    private String showCondition;

    /**
     * 控件类型:0-仅输入,1-可选,3-既可输入又可选择,16-属性选择和数值输入
     */
    @TableField(value = "control_type")
    private Integer controlType;

    /**
     * 属性值引用类型:0-普通,1-外部品牌库
     */
    @TableField(value = "reference_type")
    private Integer referenceType;

    /**
     * 属性显示类型,0-正常显示,1-选择指定父属性值时显示
     */
    @TableField(value = "show_type")
    private Integer showType;

    /**
     * 属性特征(目前决定是否分组,0-通用,1-颜色,2-尺寸,3-手机型号)
     */
    @TableField(value = "feature")
    private Integer feature;

    /**
     * 销售属性
     */
    @TableField(value = "sales")
    private Integer sales;

    /**
     * 主要销售属性
     */
    @TableField(value = "main_sale")
    private Integer mainSale;

    /**
     * 当传入costTemplateId时,它将返回是否需要填写其他产品属性,这些属性在从非国内仓库发货时使用
     */
    @TableField(value = "transnational")
    private Integer transnational;

    /**
     * 可以用的
     */
    @TableField(value = "available")
    private Integer available;

    /**
     * 是否必填
     */
    @TableField(value = "required")
    private Integer required;
}
