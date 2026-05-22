package tech.tiangong.sdp.dao.entity;

import com.baomidou.mybatisplus.annotation.IdType
import com.baomidou.mybatisplus.annotation.TableField
import com.baomidou.mybatisplus.annotation.TableId
import com.baomidou.mybatisplus.annotation.TableName
import team.aikero.blade.data.mybatis.entity.BaseEntityWithNamedAndReviser
import java.time.LocalDateTime

/**
 * 图片放大任务
 */
@TableName(value = "ultra_hd_task")
data class UltraHdTask(
    /**
     * 任务id
     */
    @TableId(value = "task_id", type = IdType.ASSIGN_ID)
    var taskId: Long,
    /**
     * 租户id
     */
    @TableField(value = "tenant_id")
    var tenantId: Long,
    /**
     * 原图
     */
    @TableField(value = "image_url")
    var imageUrl: String,
    /**
     *
     * 图片ID，picking_ai_design_picture.picking_picture_id
     */
    @TableField(value = "image_id")
    var imageId: Long,
    /**
     * 任务状态:0排队中 10生成中 20已中止 30已完成 40无效 50失败 60超时失败
     */
    @TableField(value = "task_status")
    var taskStatus: Int,
    /**
     * 选款结果id picking_ai_design_result.picking_result_id
     */
    @TableField(value = "picking_result_id")
    var pickingResultId: Long
) : BaseEntityWithNamedAndReviser() {


    /**
     * 原图的高清图
     */
    @TableField(value = "ultra_hd_image_url")
    var ultraHdImageUrl: String? = null

    /**
     * 生成时间
     */
    @TableField(value = "generated_time")
    var generatedTime: LocalDateTime? = null


}


