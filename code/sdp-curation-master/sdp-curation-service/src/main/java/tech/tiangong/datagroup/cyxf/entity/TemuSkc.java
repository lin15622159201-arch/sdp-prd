package tech.tiangong.datagroup.cyxf.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

/**
 * TemuSkc
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/27 11:01
 */
@Data
@SuperBuilder
@Accessors(chain = true)
@NoArgsConstructor
@TableName(value = "dwd_temu_product_skc_pagequery")
public class TemuSkc {
    /**
     * productskcId
     */
    @TableId(value = "productskcId", type = IdType.INPUT)
    private Long skcId;
    /**
     * productId
     */
    @TableId(value = "productId", type = IdType.INPUT)
    private Long productId;

    /**
     * skc货号
     */
    @TableField(value = "extCode")
    private String extCode;
    /**
     * 店铺名称
     */
    @TableField(value = "shop_name")
    private String shopName;
    /**
     * skcStatus
     */
    @TableField(value = "skcStatus")
    private String skcStatus;
    /**
     * 商品状态:1,在售;0:未发布到站点;0:下架
     */
    @TableField(value = "skcSiteStatus")
    private Integer skcSiteStatus;

    /**
     * etl_time
     */
    @TableField(value = "etl_time")
    private LocalDateTime etlTime;
}
