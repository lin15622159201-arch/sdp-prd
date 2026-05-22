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
 * 字段类型
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/22 18:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "field_type")
public class FieldType extends BaseMessageEntity {
    @TableId(value = "type_id", type = IdType.INPUT)
    private Long typeId;

    @TableField("type_code")
    private String typeCode;

    @TableField("type_name")
    private String typeName;

    @TableField("type_status")
    private Integer typeStatus;

    @TableField("type_component")
    private String typeComponent;

    @TableField("type_config")
    private String typeConfig;
}
