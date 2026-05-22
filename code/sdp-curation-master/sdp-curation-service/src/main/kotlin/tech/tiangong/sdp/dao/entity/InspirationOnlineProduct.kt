package tech.tiangong.sdp.dao.entity

import com.baomidou.mybatisplus.annotation.IdType
import com.baomidou.mybatisplus.annotation.TableField
import com.baomidou.mybatisplus.annotation.TableId
import com.baomidou.mybatisplus.annotation.TableName
import team.aikero.blade.data.mybatis.entity.BaseEntityWithNamedAndReviser

/**
 * 灵感上架商品(InspirationOnlineProduct)表名: inspiration_online_product
 *
 * @author zjh
 * @since 2024-12-19 10:46:21
 */
@TableName(value = "inspiration_online_product")
data class InspirationOnlineProduct(
    /**
     * id
     */
    @TableId(value = "id", type = IdType.ASSIGN_ID)
    var id: Long? = null,

    /**
     * 灵感id
     */
    @TableField(value = "inspiration_id")
    var inspirationId: Long? = null,
    /**
     * 上架商品id
     */
    @TableField(value = "online_sale_item_id")
    var onlineSaleItemId: Long? = null,
    /**
     * 上架-推送到AIDC 1是0否
     */
    @TableField(value = "online_push_aidc")
    var onlinePushAidc: Int? = null,
) : BaseEntityWithNamedAndReviser()


