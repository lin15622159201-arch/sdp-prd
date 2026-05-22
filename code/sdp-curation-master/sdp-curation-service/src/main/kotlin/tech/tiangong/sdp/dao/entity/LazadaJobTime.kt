package tech.tiangong.sdp.dao.entity

import com.baomidou.mybatisplus.annotation.*

import team.aikero.blade.data.mybatis.entity.BaseEntityWithNamedAndReviser

import java.time.LocalDateTime

/**
 * Lazada定时任务时间(LazadaJobTime)表名: lazada_job_time
 *
 * @author zjh
 * @since 2024-12-16 16:37:01
 */
@TableName(value = "lazada_job_time")
data class LazadaJobTime(
    @TableId(value = "id", type = IdType.ASSIGN_ID)
    var id: Long? = null,

    /**
     * 国家站点code
     */
    @TableField(value = "country_site_code")
    var countrySiteCode: String? = null,
    /**
     * 任务开始时间
     */
    @TableField(value = "task_start_time")
    var taskStartTime: LocalDateTime? = null,
    /**
     * 任务结束时间
     */
    @TableField(value = "task_end_time")
    var taskEndTime: LocalDateTime? = null,
) : BaseEntityWithNamedAndReviser()


