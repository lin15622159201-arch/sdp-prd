package tech.tiangong.sdp.dao.entity

import com.baomidou.mybatisplus.annotation.IdType
import com.baomidou.mybatisplus.annotation.TableField
import com.baomidou.mybatisplus.annotation.TableId
import com.baomidou.mybatisplus.annotation.TableName
import java.time.LocalDateTime

/**
 * @author: xieyuxiang
 * @Date 2025/5/16
 */
@TableName(value = "mq_log")
data class MqLog (

    /**
     * 主键
     */
    @TableId(value = "log_id", type = IdType.ASSIGN_ID)
    var logId: Long? = null,

    /**
     * 业务id  推送业务上下文id，如选款id
     */
    @TableField(value = "bus_id")
    var busId: Long? = null,

    /**
     * 业务子id  如选款中的款式id，
     */
    @TableField(value = "sub_bus_id")
    var subBusId: Long? = null,

    /**
     * 任务编号  如选款结果推送中的任务编码  按值能在页面查询回业务上下文
     */
    @TableField(value = "task_code")
    var taskCode: String? = null,

    /**
     *  推送到Mq,或者从mq取出数据的时间
     */
    @TableField(value = "mq_time")
    var mqTime: LocalDateTime? = null,


    /**
     *  1-成功 0-失败
     */
    @TableField(value = "state")
    var state: Int? = null,

    /**
     *  消息体
     */
    @TableField(value = "msg")
    var msg: String? = null,

)