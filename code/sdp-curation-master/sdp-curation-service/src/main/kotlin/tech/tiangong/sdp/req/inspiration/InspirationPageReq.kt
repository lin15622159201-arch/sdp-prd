package tech.tiangong.sdp.req.inspiration

import team.aikero.blade.core.protocol.PageReq
import java.time.LocalDateTime


data class InspirationPageReq(

    /**
     * 品类
     */
    var externalCategory: String? = null,

    /**
     * 识别品类code
     */
    var identifiedCategoryCode: String? = null,

    /**
     * 灵感创建时间-开始
     */
    var inspirationStartCreatedTime: LocalDateTime? = null,
    /**
     * 灵感创建时间-结束
     */
    var inspirationEndCreatedTime: LocalDateTime? = null,
    /**
     * 供给方式
     */
    var suggestedSupplyModeCode: String? = null,
    /**
     * 灵感图来源
     */
    var inspirationSource: String? = null,
    /**
     * 国家站点code
     */
    var sourceCountrySiteCode: String? = null,
    /**
     * 识别结果
     */
    var identifiedResult: String? = null,
    /**
     * 提交次数
     */
    var inspirationSubmitCount: Int? = null,
    /**
     * 提交状态 0待提交, 1已提交
     */
    var submitStatus: Int? = null,
    /**
     * 创建人名称
     */
    var creatorName: String? = null,
    /**
     * 提交人名称
     */
    var submitterName: String? = null,
    /**
     * 数据来源
     * @see tech.tiangong.sdp.enums.InspirationDataSourceTypeEnum
     */
    var dataSourceCode: String? = null,
    /**
     * 企划来源
     */
    var planningSourceCode: String? = null,
    /**
     * 创建人id v3.10.1
     */
    var creatorIds: List<Long>? = null,
    /**
     * 灵感编号 v3.10.1
     */
    var inspirationCode: String? = null,
    /**
     * 波次编号 v3.10.1
     */
    var waveBatchCode: String? = null,
    /**
     * 租户ID
     */
    var tenantId: Long? = null
) : PageReq() {
    companion object {
        private const val serialVersionUID: Long = -7997813729057327594L
    }
}

