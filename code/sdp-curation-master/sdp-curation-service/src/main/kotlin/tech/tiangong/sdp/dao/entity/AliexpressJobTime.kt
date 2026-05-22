package tech.tiangong.sdp.dao.entity

import com.baomidou.mybatisplus.annotation.*

import team.aikero.blade.data.mybatis.entity.BaseEntityWithNamedAndReviser

import java.time.LocalDate
import java.time.LocalDateTime

/**
 * Aliexpress定时任务时间(AliexpressJobTime)表名: aliexpress_job_time
 *
 * @author zjh
 * @since 2025-01-10 18:26:43
 */
@TableName(value = "aliexpress_job_time")
data class AliexpressJobTime(
    @TableId(value = "id", type = IdType.ASSIGN_ID)
    var id: Long? = null,

    /**
     * 最后日期
     */
    @TableField(value = "last_date")
    var lastDate: LocalDate? = null,
) : BaseEntityWithNamedAndReviser()


