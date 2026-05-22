package tech.tiangong.sdp.dao.entity

import com.baomidou.mybatisplus.annotation.IdType
import com.baomidou.mybatisplus.annotation.TableField
import com.baomidou.mybatisplus.annotation.TableId
import com.baomidou.mybatisplus.annotation.TableName
import team.aikero.blade.data.mybatis.entity.BaseEntityWithNamedAndReviser

/**
 * 提交下游任务信息(SubmitDownstreamLog)表名: submit_downstream_log
 *
 * @author zjh
 * @since 2024-12-19 18:24:33
 */
@TableName(value = "submit_downstream_log")
data class SubmitDownstreamLog(
    /**
     * id
     */
    @TableId(value = "log_id", type = IdType.ASSIGN_ID)
    var logId: Long? = null,

    /**
     * 灵感id/选款结果id
     */
    @TableField(value = "inspiration_id")
    var inspirationId: Long? = null,
    /**
     * 日志类型 0灵感, 1选款
     */
    @TableField(value = "log_type")
    var logType: Int? = null,
    /**
     * 业务id
     */
    @TableField(value = "business_id")
    var businessId: Long? = null,
    /**
     * 业务code
     */
    @TableField(value = "business_code")
    var businessCode: String? = null,
    /**
     * 波次code
     */
    @TableField(value = "wave_batch_code")
    var waveBatchCode: String? = null,
    /**
     * 下游任务id
     */
    @TableField(value = "downstream_task_id")
    var downstreamTaskId: Long? = null,
    /**
     * 跑图类型(SupplyModeEnum供给方式字典)
     */
    @TableField(value = "generation_type")
    var generationType: String? = null,
    /**
     * 任务状态
     */
    @TableField(value = "task_status")
    var taskStatus: Int? = null,
    /**
     * 请求参数
     */
    @TableField(value = "request")
    var request: String? = null,
    /**
     * 结果参数
     */
    @TableField(value = "response")
    var response: String? = null,
) : BaseEntityWithNamedAndReviser()


