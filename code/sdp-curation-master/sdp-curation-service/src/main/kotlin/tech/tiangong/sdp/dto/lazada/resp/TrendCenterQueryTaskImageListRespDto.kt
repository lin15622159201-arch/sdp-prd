package tech.tiangong.sdp.dto.lazada.resp

/**
 * 趋势中心-任务详情分页接口
 * @author zjh
 * @date 2024/12/16 10:58
 */
class TrendCenterQueryTaskImageListRespDto {

    /**
     *  任务id
     */
    var taskId:String? = null

    /**
     *  "101"
     */
    var qcType:String? = null

    /**
     *  商品id
     */
    var itemId:String? = null

    /**
     *  商品标题
     */
    var itemTitle:String? = null

    /**
     *  商品链接
     */
    var itemUrl:String? = null

    /**
     *  主图
     *  "https://search-images.oss-ap-southeast-1-cross.aliyuncs.com/shopee/th/6815b6acad356cd396ad138b2fbc5acb.jpg"
     */
    var mainImgUrl:String? = null

    /**
     *  数据来源 "shopee"
     */
    var dataSource:String? = null

    /**
     *  品类路径
     */
    var categoryPath:String? = null

    /**
     *  销售方id
     */
    var sellerId:String? = null

    /**
     *  销售方名称
     */
    var sellerName:String? = null

    /**
     *  价格
     */
    var price:String? = null

    /**
     *  当前价格
     */
    var currentPrice:String? = null

    /**
     *  国家
     */
    var venture:String? = null

    /**
     *  标签
     *  "Pattern|Pattern Content|plainShape|Neckline|square neckShape|Tops Length|mid-length topsStyle|Age|teenage girl [14-18 yrs]Style|Atmosphere|intellectualStyle|Culture|cottagecoreStyle|Occasion|datingStyle|Region|k-style"
     */
    var labels:String? = null

    fun getLabelsList(): List<String> {
        return labels?.split("|") ?: emptyList()
    }

}