package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * Temu颜色表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "temu_color")
public class TemuColor extends BaseMessageEntity {
    /**
     * 主键 ID
     */
    @TableId(value = "val_id", type = IdType.INPUT)
    private Long valId;
    /**
     * 颜色 ID
     */
    @TableField(value = "color_id")
    private Long colorId;
    /**
     * 模板 ID
     */
    @TableField(value = "template_id")
    private Long templateId;

    /**
     * 颜色名
     */
    @TableField("color_name")
    private String colorName;
    /**
     * 扩展信息
     */
    @TableField("extend_info")
    private String extendInfo;

    /**
     * 规格 ID
     */
    @TableField("spec_id")
    private Long specId;

    /**
     * 分组 ID
     */
    @TableField("group_id")
    private Long groupId;

    /**
     * 分组名
     */
    @TableField("group_name")
    private String groupName;

    /**
     * 可以用的 (0-不可用, 1-可用)
     */
    @TableField("available")
    private Integer available;

}
