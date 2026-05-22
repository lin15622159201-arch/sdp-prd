package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * temu 属性分组表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "temu_attr_group")
public class TemuAttrGroup extends BaseMessageEntity {
    /**
     * 分组 ID
     */
    @TableId(value = "group_id", type = IdType.INPUT)
    private Long groupId;

    /**
     * 分组名
     */
    @TableField(value = "group_name")
    private String groupName;

    /**
     * 可以用的
     */
    @TableField(value = "available")
    private Integer available;
}
