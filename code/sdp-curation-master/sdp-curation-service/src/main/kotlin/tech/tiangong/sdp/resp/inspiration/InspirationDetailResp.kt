package tech.tiangong.sdp.resp.inspiration

import java.time.LocalDateTime


data class InspirationDetailResp(
    /**
     * 灵感id
     */
    var inspirationId: Long? = null,

    /**
     * 灵感编号
     */
    var inspirationCode: String? = null,

    /**
     * 企划来源
     */
    var planningSourceCode: String? = null,
    /**
     * 波次
     */
    var waveBatchCode: String? = null,
    /**
     * 波次
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
     * 款式来源code
     */
    var styleSourceCode: String? = null,

    /**
     * 款式来源name
     */
    var styleSourceName: String? = null,

    /**
     * 灵感图品牌 v3.10.1
     */
    var inspirationBrand: String? = null,
    /**
     * 来源国家站点
     */
    var sourceCountrySiteName: String? = null,
    /**
     * 划线价(US)
     */
    var retailPrice: String? = null,
    /**
     * 销售价(US)
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
     * 识别结果: 1通过, 0无效
     */
    var identifiedStatus: Int? = null,
    /**
     * 识别标签
     */
    var identifiedLabel: String? = null,
    /**
     * 款式类型：0-净色、1-花型
     */
    var styleType: String? = null,
    /**
     * 灵感提交次数
     */
    var submitCount: Int? = null,
    /**
     * 状态
     */
    var submitStatus: Int? = null,
    /**
     * 创建人名称
     */
    var creatorName: String? = null,
    /**
     * 创建时间
     */
    var createdTime: LocalDateTime? = null,
    /**
     * 商品链接URL
     */
    var productLinkUrl: String? = null,
    /**
     * 任务信息
     */
    var taskInfo: MutableList<TaskInfoItem>? = null,
    /**
     * 是否使用加速推理
     * 0-否；1-是
     */
    var fastForward: Int? = null,

    /**
     * 款生成数量
     */
    var styleGenCount: Int? = null,


    /**
     * 模型编码（字典配置编码）
     */
    var modeCode: String? = null,


    /**
     * 模型名称（字典配置名称）
     */
    var modeName: String? = null,
)


data class TaskInfoItem(
    /**
     * 日志id
     */
    var logId: Long? = null,
    /**
     * 业务id
     */
    var businessId: Long? = null,
    /**
     * 业务code
     */
    var businessCode: String? = null,
    /**
     * 波次
     */
    var waveBatchName: String? = null,
    /**
     * 跑图类型
     */
    var generationType: String? = null,
    /**
     * 提交人
     */
    var submitterName: String? = null,
    /**
     * 提交时间
     */
    var submitTime: LocalDateTime? = null,
    /**
     * 任务状态
     */
    var taskStatus: Int? = null,
    /**
     * 跑图任务编号
     */
    var aiTaskCode: String? = null,

    /**
     * 下游任务id
     */
    var downstreamTaskId: Long? = null,
)

