package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * Temu尺码分类表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "temu_size_class")
public class TemuSizeClass extends BaseMessageEntity {
    /**
     * 品类 ID
     */
    @TableId(value = "category_id", type = IdType.INPUT)
    private Long categoryId;

    /**
     * 父分类ID
     */
    @TableField("parent_id")
    private Long parentId;

    /**
     * 分类ID
     */
    @TableField("class_id")
    private Long classId;

    /**
     * 关联的分类ID列表 (仅对套装类型生效)
     */
    @TableField(value = "related_id")
    private String relatedId;

    /**
     * 类型:0: 普通类型, 1: 套装类型
     */
    @TableField("class_type")
    private Integer classType ;

    /**
     * 可以用的
     */
    @TableField(value = "available")
    private Integer available;
}
