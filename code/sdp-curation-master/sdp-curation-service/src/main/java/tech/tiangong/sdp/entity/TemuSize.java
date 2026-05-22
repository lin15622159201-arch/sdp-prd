package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * Temu尺码表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "temu_size")
public class TemuSize extends BaseMessageEntity {
    /**
     * 主键 ID
     */
    @TableId(value = "val_id", type = IdType.INPUT)
    private Long valId;
    /**
     * 尺码 ID
     */
    @TableField(value = "size_id")
    private Long sizeId;
    /**
     * 模板 ID
     */
    @TableField(value = "template_id")
    private Long templateId;

    /**
     * 尺码名
     */
    @TableField("size_name")
    private String sizeName;
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
