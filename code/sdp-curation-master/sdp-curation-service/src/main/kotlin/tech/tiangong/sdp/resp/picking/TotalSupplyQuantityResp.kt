package tech.tiangong.sdp.resp.picking

class TotalSupplyQuantityResp {
    /**
     * 品类code
     */
    var categoryCode: String? = null

    /**
     * 供给方式code
     */
    var supplyModeCode: String? = null

    /**
     * 店铺id
     */
    var shopId: Long? = null

    /**
     * 企划总供给数量
     */
    var planningTotalQuantity: Int = 0

    /**
     * 落坑总供给数量
     */
    var finishTotalQuantity: Int = 0
}