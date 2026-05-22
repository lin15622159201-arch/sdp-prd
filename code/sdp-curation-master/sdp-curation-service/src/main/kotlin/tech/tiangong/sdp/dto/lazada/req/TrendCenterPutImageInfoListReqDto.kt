package tech.tiangong.sdp.dto.lazada.req

/**
 * 趋势中心-回流信息
 * @author zjh
 * @date 2024/12/16 10:58
 */
class TrendCenterPutImageInfoListReqDto {

    /**
     * 任务id
     */
    var taskId: String? = null

    /**
     * 商品id
     */
    var itemId: String? = null

    /**
     * 国家
     */
    var venture: String? = null

    /**
     * 是否使用(1是 0否)
     */
    var markStatus: Int? = null

    /**
     * 是否上架(1是 0否)
     */
    var isOnline: Int? = null

    /**
     * 上架的销售商品id
     */
    var onlineSaleItemId: Long? = null

}