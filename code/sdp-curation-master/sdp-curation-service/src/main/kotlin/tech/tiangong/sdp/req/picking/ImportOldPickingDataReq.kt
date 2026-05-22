package tech.tiangong.sdp.req.picking

import tech.tiangong.sdp.dao.bo.PickingResultImageInfoBo
import java.math.BigDecimal
import java.time.LocalDateTime
import jakarta.validation.constraints.NotNull

/**
 * @author zjh
 * @date 2025/1/8 15:52
 */
data class ImportOldPickingDataReq(
    /**
     * 选款id
     */
    @field:NotNull
    var pickingId: Long? = null,
    /**
     * 款式id
     */
    @field:NotNull
    var pickingStyleId: Long? = null,
    /**
     * 选款人ID(买手)
     */
    @field:NotNull
    var selectorId: Long? = null,
    /**
     * 选款人名称(买手)
     */
    @field:NotNull
    var selectorName: String? = null,
    /**
     * 选款时间
     */
    @field:NotNull
    var selectionTime: LocalDateTime? = null,

    /**
     * 选择图片信息[{图片url, 图片顺序, 主图标识, 修图标识}]
     */
    @field:NotNull
    var resultImageInfo: List<PickingResultImageInfoBo> = listOf(),

    /**
     * 创建人ID
     */
    @field:NotNull
    var pickingCreatorId: Long? = null,
    /**
     * 创建人姓名
     */
    @field:NotNull
    var pickingCreatorName: String? = null,
    /**
     * 创建时间
     */
    @field:NotNull
    var pickingCreatedTime: LocalDateTime? = null,
    /**
     * 建议价格
     */
    var suggestedPrice: BigDecimal? = null,
    /**
     * 建议风格
     */
    var suggestedStyleCode: String? = null,
    /**
     * 建议风格
     */
    var suggestedStyleName: String? = null,
    /**
     * 建议品类
     */
    var suggestedCategoryCode: String? = null,
    /**
     * 建议品类
     */
    var suggestedCategoryName: String? = null,
    /**
     * 建议波段
     */
    var suggestedWaveBatchCode: String? = null,
    /**
     * 建议店铺id
     */
    var suggestedShopId: Long? = null,
    /**
     * 建议店铺code
     */
    var suggestedShopCode: String? = null,
    /**
     * 建议店铺name
     */
    var suggestedShopName: String? = null,
    /**
     * 建议国家站点
     */
    var suggestedCountrySiteCode: String? = null,
    /**
     * 建议国家站点
     */
    var suggestedCountrySiteName: String? = null,
    /**
     * 建议印花(字典code)
     */
    var suggestedPrintingCode: String? = null,
    /**
     * 货盘编号
     */
    var cargoTrayCode: String? = null,
    /**
     * 附件
     */
    var attachments: String? = null,
    /**
     * 备注
     */
    var remark: String? = null,


    /**
     * 开款spu编码(设计需求-开款)
     */
    var styleSpuCode: String? = null,
    /**
     * 开款skc编码(设计需求-开款)
     */
    var styleSkcCode: String? = null,
    /**
     * 开款时间(设计需求-开款)
     */
    var styleSpuCreateTime: LocalDateTime? = null,
    /**
     * 开款淘汰原因(设计需求-淘汰)
     */
    var styleEliminateReason: String? = null,
    /**
     * 淘汰人id(设计需求-淘汰)
     */
    var styleEliminateUserId: Long? = null,
    /**
     * 淘汰人名称(设计需求-淘汰)
     */
    var styleEliminateUserName: String? = null,
    /**
     * 淘汰时间(设计需求-淘汰)
     */
    var styleEliminateTime: LocalDateTime? = null,
    /**
     * 开款状态(下游返回) 0待处理、1已开款、2已淘汰
     */
    var openStyleState: Int? = null,
)
