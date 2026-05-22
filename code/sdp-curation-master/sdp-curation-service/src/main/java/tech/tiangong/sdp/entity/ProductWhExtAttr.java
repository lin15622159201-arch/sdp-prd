package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * 商品货品仓配供应链侧扩展属性表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/22 18:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "product_wh_ext_attr")
public class ProductWhExtAttr extends BaseMessageEntity {
    /**
     * 主键 ID
     */
    @TableId(value = "attr_id", type = IdType.INPUT)
    private Long attrId;

    /**
     * 商品 ID
     */
    @TableField("product_id")
    private Long productId;


    /**
     * 站外商品链接
     */
    @TableField("outer_goods_url")
    private String outerGoodsUrl;

    /**
     * 区域 ID
     */
    @TableField("region_id")
    private String regionId;

    /**
     * 国家短名
     */
    @TableField("country_short_name")
    private String countryShortName;

}
