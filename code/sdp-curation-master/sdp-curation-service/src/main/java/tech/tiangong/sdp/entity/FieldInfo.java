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
 * 字段信息
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/22 18:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "field_info")
public class FieldInfo extends BaseMessageEntity {
    @TableId(value = "field_id", type = IdType.INPUT)
    private Long fieldId;

    @TableField("form_id")
    private Long formId;

    @TableField("page_id")
    private Long pageId;

    @TableField("type_id")
    private Long typeId;

    @TableField("parent_id")
    private Long parentId;

    @TableField("field_code")
    private String fieldCode;

    @TableField("field_name")
    private String fieldName;

    @TableField("field_title")
    private String fieldTitle;

    @TableField("placeholder")
    private String placeholder;

    @TableField("field_status")
    private Integer fieldStatus;

    @TableField("required")
    private Integer required;

    @TableField("visible")
    private Integer visible;

    @TableField("default_value")
    private String defaultValue;

    @TableField("field_config")
    private String fieldConfig;

    @TableField("order_num")
    private Integer orderNum;
}
