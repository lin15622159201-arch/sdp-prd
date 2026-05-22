package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * Temu商品品类表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "temu_product_category")
public class TemuProductCategory extends BaseMessageEntity {
    /**
     * 品类 ID
     */
    @TableId(value = "category_id", type = IdType.INPUT)
    private Long categoryId;

    /**
     * 父品类 ID
     */
    @TableField(value = "parent_id")
    private Long parentId;

    /**
     * 品类编码
     */
    @TableField(value = "category_code")
    private String categoryCode;

    /**
     * 品类名
     */
    @TableField(value = "category_name")
    private String categoryName;

    /**
     * 品类英文名
     */
    @TableField(value = "category_en_name")
    private String categoryEnName;

    /**
     * 品类层级
     */
    @TableField(value = "level")
    private Integer level;

    /**
     * 叶子
     */
    @TableField(value = "leaf")
    private Integer leaf;

    /**
     * 套装
     */
    @TableField(value = "suiting")
    private Integer suiting;

    /**
     * 可以用的
     */
    @TableField(value = "available")
    private Integer available;

    @TableField(exist = false)
    private TemuSizeClass sizeClass;
}
