package tech.tiangong.sdp.resp.picking

import com.fasterxml.jackson.annotation.JsonFormat
import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer
import tech.tiangong.sdp.dto.PickingStyleResultDto
import java.io.Serializable
import java.time.LocalDateTime

/**
 * @author yanjiaming@zj.tech
 * @date 2024/8/8
 */

class PickingStyleHistoryVo : Serializable {

    /**
     * 买手ID
     */
    @JsonSerialize(using = ToStringSerializer::class)
    var selectorId: Long? = null

    /**
     * 买手名称
     */
    var selectorName: String? = null

    /**
     * 选款时间
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    var selectionTime: LocalDateTime? = null

    /**
     * 选款结果列表
     */
    var pickingStyleResults: List<PickingStyleResultDto>? = null
}
