package tech.tiangong.sdp.dto.aliexpress.resp

import com.fasterxml.jackson.annotation.JsonProperty

/**
 * @author zjh
 * @date 2025/1/10 15:40
 */
data class AeDataTaskResp(
    /**
     * 对象id
     */
    @JsonProperty("item_id")
    var itemId: String? = null,
    /**
     *  国家
     */
    @JsonProperty("country")
    var country: String? = null,
    /**
     *  渠道
     */
    @JsonProperty("webcode")
    var webcode: String? = null,
    /**
     *  机会来源
     */
    @JsonProperty("opportunity_source")
    var opportunitySource: String? = null,
    /**
     *  商品标题
     */
    @JsonProperty("item_title")
    var itemTitle: String? = null,
    /**
     *  图片链接
     */
    @JsonProperty("main_image_url")
    var mainImageUrl: String? = null,
    /**
     * 详情图片链接
     */
    @JsonProperty("skc_image_url")
    var skcImageUrl: List<String>? = null,
    /**
     *  类目名称
     */
    @JsonProperty("cate_name_path")
    var cateNamePath: String? = null,
    /**
     *  售价(价格区间)
     */
    @JsonProperty("price_usd_range")
    var priceUsdRange: String? = null,
    /**
     *  画线价(价格区间)
     */
    @JsonProperty("list_price_usd_range")
    var listPriceUsdRange: String? = null,
    /**
     * 任务id
     */
    @JsonProperty("task_id")
    var taskId: Long? = null,
    /**
     * 品池策略id
     */
    @JsonProperty("pool_id")
    var poolId: Long? = null,
    /**
     * 更新时间
     */
    @JsonProperty("update_time")
    var updateTime: Long? = null,
)