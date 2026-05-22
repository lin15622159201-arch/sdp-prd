package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * Temu属性值表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "temu_attr_value")
public class TemuAttrValue extends BaseMessageEntity {
    /**
     * 值ID
     */
    @TableId(value = "value_id", type = IdType.INPUT)
    private Long valueId;

    /**
     * 规格 ID
     */
    @TableField(value = "spec_id")
    private Long specId;

    /**
     * 分组 ID
     */
    @TableField(value = "group_id")
    private Long groupId;

    /**
     * 子分组 ID
     */
    @TableField(value = "sub_group_id")
    private Long subGroupId;

    /**
     * 值编码
     */
    @TableField(value = "value_code")
    private String valueCode;

    /**
     * 值名称
     */
    @TableField(value = "value_name")
    private String valueName;

    /**
     * 值
     */
    @TableField(value = "val")
    private String val;

    /**
     * 附加信息
     */
    @TableField(value = "additional_info")
    private String additionalInfo;

    /**
     * 扩展信息
     */
    @TableField(value = "extend_info")
    private String extendInfo;

    /**
     * 父值ID列表(用于层级/联动)
     */
    @TableField(value = "parent_ids")
    private String parentIds;

    /**
     * 可以用的
     */
    @TableField(value = "available")
    private Integer available;
}
