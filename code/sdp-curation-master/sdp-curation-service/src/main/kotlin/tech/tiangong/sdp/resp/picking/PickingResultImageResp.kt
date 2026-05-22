package tech.tiangong.sdp.resp.picking

import tech.tiangong.sdp.dao.bo.PickingResultImageInfoBo
import java.io.Serializable

/**
 *  导出选款结果-图片
 *
 * @author     ：qinwenxuan@zj.tech
 * @date       ：2025/8/5 10:30
 * @version    :1.0
 */
class PickingResultImageResp(
    /**
     * 灵感图编号
     */
    var inspirationCode: String? = null,
    /**
     * 图片URL
     */
    var images: List<PickingResultImageInfoBo>
) : Serializable {
    companion object {
        private const val serialVersionUID: Long = -5939819824296511070L
    }
}