package tech.tiangong.sdp.dao.entity

import com.baomidou.mybatisplus.annotation.*
import team.aikero.blade.core.toolkit.isNotBlank

import team.aikero.blade.data.mybatis.entity.BaseEntityWithNamedAndReviser

import java.time.LocalDateTime

/**
 * 选款-AI设计款式图(PickingAiDesignPicture)表名: picking_ai_design_picture
 *
 * @author zjh
 * @since 2024-12-25 17:32:10
 */
@TableName(value = "picking_ai_design_picture")
data class PickingAiDesignPicture(
    /**
     * 图片id
     */
    @TableId(value = "picking_picture_id", type = IdType.ASSIGN_ID)
    var pickingPictureId: Long? = null,

    /**
     * 选款id
     */
    @TableField(value = "picking_id")
    var pickingId: Long? = null,
    /**
     * 款式id
     */
    @TableField(value = "picking_style_id")
    var pickingStyleId: Long? = null,
    /**
     * 生成图
     */
    @TableField(value = "picture_url")
    var pictureUrl: String? = null,
    /**
     * 4K图 v3.11
     */
    @TableField(value = "ultra_hd_picture_url")
    var ultraHdPictureUrl: String? = null,
    /**
     * 生成4K次数 v3.11
     */
    @TableField(value = "ultra_hd_try_times")
    var ultraHdTryTimes: Int? = null,

    /**
     * 原图
     */
    @TableField(value = "source_url")
    var sourceUrl: String? = null,
    /**
     * 修复图
     */
    @TableField(value = "repair_img_url")
    var repairImgUrl: String? = null,
    /**
     * 组号
     */
    @TableField(value = "group_num")
    var groupNum: Int? = null,
    /**
     * 序号
     */
    @TableField(value = "serial_num")
    var serialNum: Int? = null,
    /**
     * 是否主图 1是 0否
     */
    @TableField(value = "main_image_type")
    var mainImageType: Int? = null,
    /**
     * 是否修图 1是 0否
     */
    @TableField(value = "fix_image_type")
    var fixImageType: Int? = null,
    /**
     * 是否淘汰 1是 0否
     */
    @TableField(value = "eliminate_type")
    var eliminateType: Int? = null,
    /**
     * 淘汰原因
     */
    @TableField(value = "eliminate_reason")
    var eliminateReason: String? = null,

    /**
     * 选款状态：0待选中,1已选中,2未选中
     */
    @TableField(value = "picking_state")
    var pickingState: Int? = null,

    /**
     * 租户ID
     */
    @TableField(value = "tenant_id")
    var tenantId: Long? = null,
) : BaseEntityWithNamedAndReviser(){

    fun showPicture(): String? {
        return if (repairImgUrl.isNotBlank()) repairImgUrl else pictureUrl
    }

}


