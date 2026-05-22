package tech.tiangong.sdp.dao.entity

import com.baomidou.mybatisplus.annotation.IdType
import com.baomidou.mybatisplus.annotation.TableField
import com.baomidou.mybatisplus.annotation.TableId
import com.baomidou.mybatisplus.annotation.TableName
import team.aikero.blade.core.toolkit.isNotBlank
import team.aikero.blade.data.mybatis.entity.BaseEntityWithNamedAndReviser

/**
 * AI设计任务-结果图(AiDesignTaskPicture)表名: ai_design_task_picture
 *
 * @author zjh
 * @since 2024-11-29 10:59:54
 */
@TableName(value = "ai_design_task_picture")
data class AiDesignTaskPicture(
    /**
     * 图片id
     */
    @TableId(value = "picture_id", type = IdType.ASSIGN_ID)
    var pictureId: Long? = null,

    /**
     * 任务id
     */
    @TableField(value = "task_id")
    var taskId: Long? = null,
    /**
     * 生成图
     */
    @TableField(value = "picture_url")
    var pictureUrl: String? = null,
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
     * 租户ID
     */
    @TableField(value = "tenant_id")
    var tenantId: Long? = null,
) : BaseEntityWithNamedAndReviser(){

    fun showPicture(): String? {
        return if (repairImgUrl.isNotBlank()) repairImgUrl else pictureUrl
    }

}



