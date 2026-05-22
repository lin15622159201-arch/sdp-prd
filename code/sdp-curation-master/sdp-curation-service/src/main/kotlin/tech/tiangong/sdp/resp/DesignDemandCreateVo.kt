package tech.tiangong.sdp.resp

import java.io.Serializable

class DesignDemandCreateVo(
    val designDemandId: Long? = null,
    val sourceBizId: Long? = null,
    val inspirationStyleId: Long? = null
) : Serializable {
    companion object {
        private const val serialVersionUID = 1L
    }
}