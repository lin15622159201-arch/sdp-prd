package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 开款任务Bom信息关联表(develop_style_task_bom_order)实体类
 *
 * @author liuhongfu
 * @since 2025-11-03 14:39:38
 */
@EqualsAndHashCode(callSuper = true)
@Data
@TableName(value = "develop_style_task_bom_order")
public class DevelopStyleTaskBomOrder extends BasicMessageTask {

    /**
     * 主键ID
     */
    @TableId(value = "id", type = IdType.INPUT)
    private Long id;


    /**
     * 开款任务ID
     */
    @TableField(value = "develop_style_task_id")
    private Long developStyleTaskId;

    /**
     * 物料类型: 1, 面料; 2, 辅料; 3:特殊辅料
     */
    @TableField(value = "demand_type")
    private Integer demandType;


    /**
     * 物料SPU-ID（商品id）
     */
    @TableField(value = "commodity_id")
    private Long commodityId;

    /**
     * 物料SPU（商品编码）
     */
    @TableField("commodity_code")
    private String commodityCode;


    /**
     * skuId
     */
    @TableField(value = "sku_id")
    private Long skuId;

    /**
     * SKU编码
     */
    @TableField("sku_code")
    private String skuCode;


}


