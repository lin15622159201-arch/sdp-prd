package tech.tiangong.sdp.dao.entity

import com.baomidou.mybatisplus.annotation.IdType
import com.baomidou.mybatisplus.annotation.TableField
import com.baomidou.mybatisplus.annotation.TableId
import com.baomidou.mybatisplus.annotation.TableName
import team.aikero.blade.data.mybatis.entity.BaseEntityWithNamedAndReviser

/**
 * AI设计素材表
 *
 * @author     ：qinwenxuan@zj.tech
 * @date       ：2025/7/14 10:35
 * @version    :1.0
 */
@TableName(value = "ai_design_material")
class AiDesignMaterial(
    /**
     * 主键
     */
    @TableId(value = "material_id", type = IdType.ASSIGN_ID)
    var materialId: Long? = null,

    ) : BaseEntityWithNamedAndReviser() {
    /**
     * 灵感数据id
     */
    @TableField(value = "inspiration_id")
    var inspirationId: Long? = null

    /**
     * 任务ID
     */
    @TableField(value = "task_id")
    var taskId: Long? = null

    /**
     * 素材库ID
     */
    @TableField(value = "material_library_id")
    var materialLibraryId: Long? = null

    /**
     * 素材类型
     */
    @TableField(value = "material_type")
    var materialType: String? = null

    /**
     * 模特图片URL
     */
    @TableField(value = "picture_url")
    var pictureUrl: String? = null

    /**
     * mask图URL
     */
    @TableField(value = "mask_picture_url")
    var maskPictureUrl: String? = null

    /**
     * 租户id
     */
    @TableField(value = "tenant_id")
    var tenantId: Long? = null
}