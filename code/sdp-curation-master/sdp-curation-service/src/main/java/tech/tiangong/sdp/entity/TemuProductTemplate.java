package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * temu 商品模板表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "temu_product_template")
public class TemuProductTemplate extends BaseMessageEntity {
    /**
     * 模板 ID
     */
    @TableId(value = "template_id", type = IdType.INPUT)
    private Long templateId;

    /**
     * 品类 ID
     */
    @TableField(value = "category_id")
    private Long categoryId;

    /**
     * 允许的自定义父级规范的最大数量
     */
    @TableField(value = "max_spec_num")
    private Integer maxSpecNum;

    /**
     * 单个父规范下自定义规范值的上限
     */
    @TableField(value = "single_spec_value_num")
    private Integer singleSpecValueNum;

    /**
     * 当没有模板或模板具有自定义规范时,要使用的自定义父级规范列表
     */
    @TableField(value = "user_input_parent_spec")
    private String userInputParentSpec;

    /**
     * 尺码规格
     */
    @TableField(value = "size_spec")
    private String sizeSpec;

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
    /**
     * 限定规格是否全选
     */
    @TableField(value = "choose_all")
    private Integer chooseAll;
}
