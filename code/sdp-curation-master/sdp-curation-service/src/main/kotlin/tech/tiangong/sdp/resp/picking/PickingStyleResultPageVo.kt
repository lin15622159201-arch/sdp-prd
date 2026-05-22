package tech.tiangong.sdp.resp.picking

import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer
import tech.tiangong.sdp.dao.bo.AttachmentBo
import tech.tiangong.sdp.dao.bo.PickingResultImageInfoBo
import java.io.Serializable
import java.time.LocalDateTime

/**
 * @author yanjiaming@zj.tech
 * @date 2024/8/7
 */

class PickingStyleResultPageVo : Serializable {
    /**
     * 选款结果id
     */
    @JsonSerialize(using = ToStringSerializer::class)
    var pickingResultId: Long? = null

    /**
     * 灵感图
     */
    var inspirationImage: String? = null

    /**
     * 参考图
     */
    var refImgUrl: String? = null

    /**
     * 数据来源
     * smart_develop_style：AI设计
     * posture_fission ：姿势裂变
     * floral_pattern： 花型上身
     */
    var origin: String? = null

    /**
     * 原图
     * origin为floral_pattern时，该字段为模型图
     */
    var sourceImage: String? = null


    /**
     * 备注
     */
    var remark: String? = null

    /**
     * 选款人 买手ID
     */
    @JsonSerialize(using = ToStringSerializer::class)
    var selectorId: Long? = null

    /**
     * 选款人 买手名称
     */
    var selectorName: String? = null

    /**
     * 选款时间
     */
    var selectionTime: LocalDateTime? = null

    /**
     * 建议价格
     */
    var suggestedPrice: String? = null

    /**
     * 建议风格
     */
    var suggestedStyleName: String? = null

    /**
     * 建议品类
     */
    var suggestedCategoryName: String? = null

    /**
     * 建议波段
     */
    var suggestedWaveBatchName: String? = null

    /**
     * 建议店铺
     */
    var suggestedShopName: String? = null

    /**
     * 建议国家站点
     */
    var suggestedCountrySiteName: String? = null

    /**
     * 货盘编号
     */
    var cargoTrayName: String? = null

    /**
     * 建议印花
     */
    var suggestedPrintingName: String? = null

    /**
     * 选用状态：null-全部,1已选中,2未选中
     * @see tech.tiangong.sdp.enums.PickingStateEnum
     */
    var pickingState: Int? = null

    /**
     * 开款状态(下游)：0-待处理 1-已开款 2-已淘汰
     * @see tech.tiangong.sdp.enums.PickingOpenStyleStateEnum
     */
    var openStyleState: Int? = null

    /**
     * 款号(下游)
     */
    var styleCode: String? = null

    /**
     * 淘汰原因(下游)
     */
    var styleEliminateReason: String? = null

    /**
     * AIGC图片详情列表
     */
    var pickingStyleResultDetails: List<PickingResultImageInfoBo> = mutableListOf()

    /**
     * 灵感图编号
     */
    var inspirationCode: String? = null

    /**
     * AI任务ID
     */
    var designTaskId: Long? = null

    /**
     * ai任务编号(可空)
     */
    var designTaskCode: String? = null

    /**
     * 附件
     */
    var attachments: List<AttachmentBo> = mutableListOf()

    companion object {
        private const val serialVersionUID: Long = 5948657627356018429L
    }
}
