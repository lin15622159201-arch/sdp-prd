package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.math.BigDecimal;

/**
 * 尺码部位表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "size_part")
public class SizePart extends BaseMessageEntity {
    /**
     * 主键 id
     */
    @TableId(value = "size_part_id", type = IdType.AUTO)
    private Long sizePartId;

    /**
     * 部位 id
     */
    @TableField("part_id")
    private Long partId;

    /**
     * 模板 id
     */
    @TableField("template_id")
    private Long templateId;

    /**
     * 部位名称
     */
    @TableField("part_name")
    private String partName;

    /**
     * 部位值
     */
    @TableField("part_value")
    private BigDecimal partValue;

    /**
     * 部位档差值
     */
    @TableField("part_diff")
    private BigDecimal partDiff;

    /**
     * 尺码
     */
    @TableField("size")
    private String size;
}
