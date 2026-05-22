package tech.tiangong.sdp.dao.bo

import com.alibaba.fastjson2.toJSONString
import team.aikero.blade.util.json.parseJsonList

/**
 * 附件
 * @author zjh
 * @date 2024-11-29 11:25:54
 */
class AttachmentBo {
    /**
     * 文件地址
     */
    var fileUrl: String? = null

    /**
     * 文件名称
     */
    var fileName: String? = null

    /**
     * 文件类型
     */
    var fileType: String? = null

    companion object {
        fun jsonToBoList(json: String?): List<AttachmentBo> {
            if (json.isNullOrBlank()) {
                return listOf()
            }
            return json.parseJsonList(AttachmentBo::class.java)
        }

        fun boListToJson(list: List<AttachmentBo>?): String {
            if (list == null) {
                return "[]"
            }
            return list.toJSONString()
        }
    }
}
