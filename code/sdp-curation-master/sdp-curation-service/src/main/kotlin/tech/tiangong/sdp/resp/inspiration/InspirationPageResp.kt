package tech.tiangong.sdp.resp.inspiration

import tech.tiangong.sdp.dao.bo.KeyValueBo
import java.time.LocalDateTime

/**
 * @author zjh
 * @date 2024/11/14 10:57
 */

data class InspirationPageResp(

    /**
     * 灵感id
     */
    var inspirationId: Long? = null,
    /**
     * 灵感code
     */
    var inspirationCode: String? = null,
    /**
     * 企划来源
     */
    var planningSourceCode: String? = null,
    /**
     * 企划来源name
     */
    var planningSourceName: String? = null,
    /**
     * 波次code
     */
    var waveBatchCode: String? = null,
    /**
     * 波次name
     */
    var waveBatchName: String? = null,
    /**
     * 灵感图
     */
    var inspirationImage: String? = null,
    /**
     * 外部品类
     */
    var externalCategory: String? = null,
    /**
     * 灵感图来源
     */
    var inspirationImageSource: String? = null,
    /**
     * 来源国家站点
     */
    var sourceCountrySiteName: String? = null,
    /**
     * 划线价(US)
     */
    var retailPrice: String? = null,
    /**
     * 售价(US)
     */
    var salePrice: String? = null,
    /**
     * 建议供给方式
     */
    var suggestedSupplyModeCode: String? = null,
    /**
     * 灵感创建时间
     */
    var inspirationCreatedTime: LocalDateTime? = null,
    /**
     * 数据来源
     */
    var dataSource: String? = null,
    /**
     * 识别品类
     */
    var identifiedCategory: String? = null,
    /**
     * 识别品类编码
     */
    var identifiedCategoryCode: String? = null,
    /**
     * 识别结果
     */
    var identifiedStatus: Int? = null,
    /**
     * 识别标签
     */
    var identifiedLabel: List<KeyValueBo>? = null,
    /**
     * 款式类型：0-净色、1-花型
     */
    var styleType: String? = null,
    /**
     * 灵感提交次数
     */
    var submitCount: Int? = null,
    /**
     * 提交状态 0待提交, 1已提交
     */
    var submitStatus: Int? = null,
    /**
     * 创建人名称 v3.10.1
     */
    var creatorName: String? = null,

    /**
     * 创建人id v3.10.1
     */
    var creatorId: Long? = null,

    /**
     * 灵感图品牌 v3.10.1
     */
    var inspirationBrand: String? = null,

    /**
     * 款式来源code
     */
    var styleSourceCode: String? = null,

    /**
     * 款式来源name
     */
    var styleSourceName: String? = null
)