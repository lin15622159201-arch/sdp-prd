package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 商品尺码模板表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/22 18:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "product_size")
public class ProductSize extends BaseMessageEntity {
    /**
     * 主键 id
     */
    @TableId(value = "product_size_id", type = IdType.INPUT)
    private Long productSizeId;

    /**
     * 尺码名称
     */
    @TableField("template_name")
    private String templateName;

    /**
     * 商品 ID
     */
    @TableField("product_id")
    private Long productId;
    /**
     * 平台尺码 ID
     */
    @TableField("platform_size_id")
    private Long platformSizeId;

    /**
     * 部位元素
     */
    @TableField("element")
    private String element;
    /**
     * 尺码
     */
    @TableField("size")
    private String size;
    /**
     * 平台尺码
     */
    @TableField("platform_size")
    private String platformSize;

    /**
     * 部位

     @TableField("part") private String part;
     */
    /**
     * 是否重点展示(1:重点展示)
     */
    @TableField("show_size")
    private Integer showSize;
    @TableField(exist = false)
    private List<ProductSizePart> sizeParts;
}
