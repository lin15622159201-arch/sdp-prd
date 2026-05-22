package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * temu 属性单位表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "temu_attr_unit")
public class TemuAttrUnit extends BaseMessageEntity {
    /**
     * 单位 ID
     */
    @TableId(value = "unit_id", type = IdType.INPUT)
    private Long unitId;

    /**
     * 单位名
     */
    @TableField(value = "unit_name")
    private String unitName;

    /**
     * 可以用的
     */
    @TableField(value = "available")
    private Integer available;
}
