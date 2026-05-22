package tech.tiangong.sdp.common.resp

import java.math.BigDecimal
import java.time.LocalDateTime

/**
 * 灵感id/选款id获取相关信息
 * @author zjh
 * @date 2024-12-23 15:57:44
 */
class GetInspirationOrPickingIdResp {

    /**
     * 灵感
     */
    var inspirationInfo: InspirationInfoResp? = null

    /**
     * 选款
     */
    var pickingInfo: PickingInfoResp? = null

    class InspirationInfoResp {
        /**
         * 灵感图
         */
        var inspirationImage: String? = null
        /**
         * 灵感图来源
         */
        var inspirationImageSource: String? = null
        /**
         * 灵感图来源站点
         */
        var countrySiteCode: String? = null
        /**
         * 灵感图来源站点
         */
        var countrySiteName: String? = null
        /**
         * 企划来源code
         */
        var planningSourceCode: String? = null
        /**
         * 企划来源name
         */
        var planningSourceName: String? = null
        /**
         * 划线价(US)
         */
        var retailPrice: BigDecimal? = null
        /**
         * 销售价(US)
         */
        var salePrice: BigDecimal? = null
        /**
         * 划线价(US)-区间
         */
        var retailPriceRange: String? = null
        /**
         * 销售价(US)-区间
         */
        var salePriceRange: String? = null
    }

    class PickingInfoResp {
        /**
         * 选款来源站点
         */
        var countrySiteCode: String? = null
        /**
         * 选款来源站点
         */
        var countrySiteName: String? = null
        /**
         * 建议店铺
         */
        var shopId: Long? = null

        /**
         * 建议店铺 lazada shop short code
         */
        var shopCode: String? = null

        /**
         * 建议店铺名
         */
        var shopName: String? = null

        /**
         * 买手备注
         */
        var remark: String? = null

        /**
         * 货盘类型编号
         */
        var cargoTrayCode: String? = null

        /**
         * 货盘类型编号
         */
        var cargoTrayName: String? = null

        /**
         * 建议价格
         */
        var suggestedPrice: BigDecimal? = null

        /**
         * 选款时间
         */
        var pickingTime: LocalDateTime? = null
    }
}