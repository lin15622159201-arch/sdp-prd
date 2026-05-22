package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * 尺码档差表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "size_diff")
public class SizeDiff extends BaseMessageEntity {
    /**
     * 主键id
     */
    @TableId(value = "size_diff_id", type = IdType.ASSIGN_ID)
    private Long sizeDiffId;

    /**
     * 尺码
     */
    @TableField("size_code")
    private String sizeCode;

    /**
     * 尺码名称
     */
    @TableField("size_name")
    private String sizeName;

    /**
     * 部位
     */
    @TableField("part")
    private String part;

    /**
     * 尺码
     */
    @TableField("size")
    private String size;

    /**
     * 档差值 (JSON格式)
     */
    @TableField(value = "diff_val")
    private String diffVal;
    /**
     * 是否启用【1启用；0禁用】
     */
    @TableField("enable")
    private Integer enable;
}
