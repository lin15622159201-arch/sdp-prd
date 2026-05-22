package tech.tiangong.sdp.dto

import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer
import tech.tiangong.sdp.dao.bo.AttachmentBo
import tech.tiangong.sdp.dao.bo.PickingResultImageInfoBo
import java.math.BigDecimal

/**
 * 选图结果
 *
 * @author yanjiaming@zj.tech
 * @date 2024/8/8
 */
class PickingStyleResultDto {
    /**
     * 选款结果ID
     */
    @JsonSerialize(using = ToStringSerializer::class)
    var pickingStyleResultId: Long? = null

    /**
     * 图片
     */
    var pickingStyleResultDetails: List<PickingResultImageInfoBo> = mutableListOf()

    /**
     * 选用状态：0-未选择，1-可用，2-不可用
     */
    var pickingState: Int? = null

    /**
     * 序号
     */
    var serialNum: Int? = null

    /**
     * 建议价格
     */
    var suggestedPrice: BigDecimal? = null

    /**
     * 建议风格
     */
    var suggestedStyle: String? = null

    /**
     * 建议类目
     */
    var suggestedCategory: String? = null

    /**
     * 建议波段
     */
    var suggestedWave: String? = null

    /**
     * 建议店铺
     */
    var suggestedShopName: String? = null

    /**
     * 建议店铺简码
     */
    var suggestedShopShortCode: String? = null

    /**
     * 印花标识：0-无，1-定位印，2-满印，3-净色
     */
    var suggestedPrinting: String? = null

    /**
     * 建议国家站点
     */
    var suggestedCountrySite: String? = null

    /**
     * 备注
     */
    var remark: String? = null

    /**
     * 附件地址列表
     */
    var attachments: List<AttachmentBo>? = null

}
