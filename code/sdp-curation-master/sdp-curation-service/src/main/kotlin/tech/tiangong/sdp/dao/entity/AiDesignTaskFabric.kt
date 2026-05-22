package tech.tiangong.sdp.dao.entity

import com.baomidou.mybatisplus.annotation.IdType
import com.baomidou.mybatisplus.annotation.TableField
import com.baomidou.mybatisplus.annotation.TableId
import com.baomidou.mybatisplus.annotation.TableName
import team.aikero.blade.data.mybatis.entity.BaseEntityWithNamedAndReviser

/**
 * AI设计任务-推荐面料(AiDesignTaskFabric)表名: ai_design_task_fabric
 *
 * @author zjh
 * @since 2024-12-03 18:37:42
 */
@TableName(value = "ai_design_task_fabric")
data class AiDesignTaskFabric(
    /**
     * 主键
     */
    @TableId(value = "fabric_id", type = IdType.ASSIGN_ID)
    var fabricId: Long? = null,

    /**
     * 任务id
     */
    @TableField(value = "task_id")
    var taskId: Long? = null,
    /**
     * 家族代表面料类目
     */
    @TableField(value = "family_fabric_category")
    var familyFabricCategory: String? = null,
    /**
     * 中台主商品ID
     */
    @TableField(value = "source_commodity_id")
    var sourceCommodityId: Long? = null,
    /**
     * 商品ID
     */
    @TableField(value = "commodity_id")
    var commodityId: Long? = null,
    /**
     * 商品编码
     */
    @TableField(value = "commodity_code")
    var commodityCode: String? = null,
    /**
     * 商品名称
     */
    @TableField(value = "commodity_name")
    var commodityName: String? = null,
    /**
     * 商品图片
     */
    @TableField(value = "commodity_picture")
    var commodityPicture: String? = null,
    /**
     * 纹理色块图
     */
    @TableField(value = "color_picture")
    var colorPicture: String? = null,
    /**
     * SKU-ID
     */
    @TableField(value = "sku_id")
    var skuId: Long? = null,
    /**
     * SKU-编码
     */
    @TableField(value = "sku_code")
    var skuCode: String? = null,
    /**
     * 色号
     */
    @TableField(value = "color_code")
    var colorCode: String? = null,
    /**
     * RGB
     */
    @TableField(value = "rgb")
    var rgb: String? = null,
) : BaseEntityWithNamedAndReviser()


