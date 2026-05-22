package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * Temu尺码规格元素表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "temu_size_spec_ele")
public class TemuSizeSpecEle extends BaseMessageEntity {
    /**
     * 元素 ID
     */
    @TableId(value = "element_id", type = IdType.INPUT)
    private Long elementId;

    /**
     * 元素名称
     */
    @TableField(value = "element_name")
    private String elementName;

    /**
     * 元素值
     */
    @TableField(value = "element_value")
    private String elementValue;

    /**
     * 描述
     */
    @TableField(value = "description")
    private String description;

    /**
     * 元素类型
     */
    @TableField(value = "element_type")
    private Integer elementType;

    /**
     * 可以用的
     */
    @TableField(value = "available")
    private Integer available;
}
