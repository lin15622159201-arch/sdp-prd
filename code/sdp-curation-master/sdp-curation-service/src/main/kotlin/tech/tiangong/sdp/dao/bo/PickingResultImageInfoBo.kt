package tech.tiangong.sdp.dao.bo

import com.alibaba.fastjson2.toJSONString
import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer
import team.aikero.blade.util.json.parseJsonList

/**
 * 选款结果-图片信息(单个款下多图)
 * @author zjh
 * @date 2024/11/29 14:39
 */
class PickingResultImageInfoBo {
    /**
     * 图片id
     */
    @JsonSerialize(using = ToStringSerializer::class)
    var pickingPictureId: Long? = null

    /**
     * 生成图
     */
    var pictureUrl: String? = null

    /**
     * 修复图
     */
    var repairImgUrl: String? = null

    /**
     * 组号
     */
    var groupNum: Int? = null

    /**
     * 序号
     */
    var serialNum: Int? = null

    /**
     * 是否主图 1是 0否
     */
    var mainImageType: Int? = null

    /**
     * 是否修图 1是 0否
     */
    var fixImageType: Int? = null

    /**
     * 是否淘汰 1是 0否
     */
    var eliminateType: Int? = null

    /**
     * 淘汰原因 v3.10.1
     */
    var eliminateReasonCodes: List<String>? = null

    companion object {
        fun jsonToBoList(json: String?): List<PickingResultImageInfoBo> {
            if (json.isNullOrBlank()) {
                return listOf()
            }
            return json.parseJsonList(PickingResultImageInfoBo::class.java)
        }

        fun boListToJson(list: List<PickingResultImageInfoBo>?): String {
            if (list == null) {
                return "[]"
            }
            return list.toJSONString()
        }
    }
}