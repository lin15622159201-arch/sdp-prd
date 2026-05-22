package tech.tiangong.sdp.req.picking

import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer
import jakarta.validation.Valid
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.NotNull
import tech.tiangong.sdp.dao.bo.AttachmentBo
import java.math.BigDecimal

/**
 * 选款样式确认请求
 *
 * @author yanjiaming@zj.tech
 * @date 2024/8/7
 */

class PickingConfirmReq(
    /**
     * 选款任务ID
     */
    @NotNull(message = "选款ID不能为空")
    var pickingId: Long,
    @NotEmpty(message = "选用结果不能为空")
    var result: MutableList<@Valid PickingStyleConfirmReq>,

    /**
     * 波段编码
     */
    var waveBandCode: String? = null,

    /**
     * 波段名称
     */
    var waveBandName: String? = null,

    /**
     * 店铺ID
     */
    var storeId: Long? = null,

    /**
     * 店铺名称
     */
    var storeName: String? = null
) {

}


/**
 * 款式
 */
class PickingStyleConfirmReq(
    /**
     * 款式id
     */
    @NotNull(message = "选款任务明细ID不能为空")
    var pickingStyleId: Long,
    /**
     * 选用状态：1已选中,2未选中
     * @see tech.tiangong.sdp.enums.PickingStateEnum
     */
    @NotNull(message = "选用状态不能为空")
    var pickingState: Int
) {


    /**
     * 更新版本(不为空则无修改, 空则修改)
     */
    var updateVersion: Long? = null


    /**
     * 款式信息
     */
    var resultDetail: ResultDetailReq? = null

    /**
     * 图片信息
     */
    var imageInfos: List<PickingStyleImageConfirmReq>? = null



    class ResultDetailReq {
        /**
         * 建议价格
         */
        var suggestedPrice: BigDecimal? = null

        /**
         * 建议风格
         */
        var suggestedStyleCode: String? = null

        /**
         * 建议类目
         */
        var suggestedCategoryCode: String? = null

        /**
         * 建议波段
         */
        var suggestedWaveBatchCode: String? = null

        /**
         * 建议印花
         */
        var suggestedPrintingCode: String? = null

        /**
         * 建议国家站点
         */
        var suggestedCountrySiteCode: String? = null

        /**
         * 货盘编号
         */
        var cargoTrayCode: String? = null

        /**
         * 【商品主题】编号 v3.10.1
         */
        var productThemeCode: String? = null

        /**
         * 【商品主题】名称 v3.10.1
         */
        var productThemeName: String? = null

        /**
         * 建议店铺
         */
        var suggestedShopId: Long? = null

        /**
         * 建议店铺 lazada shop short code
         */
        var suggestedShopCode: String? = null

        /**
         * 建议店铺名
         */
        var suggestedShopName: String? = null

        /**
         * 场景code  v3.9
         */
        @NotBlank(message = "sceneCode is blank")
        var sceneCode: String? = null

        /**
         * 场景名称 v3.9
         */
        @NotBlank(message = "sceneName is blank")
        var sceneName: String? = null

        /**
         * 备注（不超过512个字符）
         */
        var remark: String? = null

        /**
         * 附件url列表
         */
        var attachments: List<AttachmentBo>? = null

        /**
         * 跑图问题反馈code
         */
        var runningDiagramProblemCodes: List<String>? = null

    }

    /**
     * 图片信息
     */
    class PickingStyleImageConfirmReq {
        /**
         * 图片id
         */
        @JsonSerialize(using = ToStringSerializer::class)
        var pickingPictureId: Long? = null

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
         * 选用状态：1已选中,2未选中
         * @see tech.tiangong.sdp.enums.PickingStateEnum
         */
        var pickingState: Int? = null

        /**
         * 淘汰原因
         */
        var eliminateReasonCodes: List<String>? = null
    }
}