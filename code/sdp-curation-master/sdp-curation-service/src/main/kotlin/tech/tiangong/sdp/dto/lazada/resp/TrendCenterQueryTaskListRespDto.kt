package tech.tiangong.sdp.dto.lazada.resp

import com.fasterxml.jackson.annotation.JsonFormat
import java.time.LocalDateTime

/**
 * 趋势中心-任务分页接口
 * @author zjh
 * @date 2024/12/16 10:58
 */
class TrendCenterQueryTaskListRespDto {

    /**
     * 任务ID
     */
    var taskId: String? = null

    /**
     * 任务类型:自动圈选auto_task,手动圈选manual_task
     */
    var taskType: String? = null

    /**
     * 商品数量
     */
    var itemSize: Int? = null

    /**
     * 国家(TH)
     */
    var venture: String? = null

    /**
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    var createDate: LocalDateTime? = null
}