package tech.tiangong.sdp.dto.mq

import tech.tiangong.sdp.dao.bo.AiDesignModelBo
import tech.tiangong.sdp.dao.bo.AiDesignSceneBo
import tech.tiangong.sdp.dao.bo.KeyValueBo
import tech.tiangong.sdp.dao.bo.PickingResultImageInfoBo
import tech.tiangong.sdp.resp.picking.PickingStyleResultDetailVo
import java.math.BigDecimal
import java.time.LocalDateTime

/**
 * @author: xieyuxiang
 * @Date 2025/4/29
 */
class PickingStyleConfirmMqDto {

    /**
     * 业务主键ID
     */
    var busId: String? = null


    /**
     * 供给方式
     */
    var supplyMethodCode: String? = null

    /**
     * 波次
     */
    var waveBatchCode: String? = null

    /**
     * 企划来源
     */
    var  planningSourceCode: String? = null

    /**
     * 国家站点
     */
    var  countrySiteCode: String? = null

    /**
     * 灵感图来源
     */
    var  inspirationImageSourceCode: String? = null

    /**
     * 灵感图品牌
     */
    var  inspirationBrandCode: String? = null

    /**
     * 跑图模型编码
     */
    var   modeCode: String? = null

    /**
     * 跑图模型名称
     */
    var   modeName: String? = null

    /**
     * 原图品类
     */
    var   externalCategory: String? = null

    /**
     * 参考权重
     */
    var   refWeight: BigDecimal? = null

    /**
     * 生成模式
     */
    var   generateMode: Int? = null

    /**
     * 跑图背景
     */
    var   sceneInfo: AiDesignSceneBo? = null

    /**
     * 背景描述
     */
    var   pictureCaption: String? = null

    /**
     * 跑图模特
     */
    var   modelInfo: AiDesignModelBo? = null

    /**
     * 模特描述
     */
    var   modelCaption: String? = null //todo 没有这个属性

    /**
     * 背面增强
     */
    var   filterBack: Int? = null

    /**
     * 脸部修复
     */
    var   faceRepair: Int? = null

    /**
     * 履约增强
     */
    var   promiseEnhanced: Int? = null

    /**
     * 生成数量
     */
    var   generateNum: Int? = null

    /**
     * 趋势图编号
     */
    var   inspirationCode: String? = null

    /**
     * 趋势原图
     */
    var   inspirationImage: String? = null

    /**
     * 创建人
     */
    var   creatorName: String? = null

    /**
     * 灵感图创建时间
     */
    var   inspirationCreatedTime: LocalDateTime? = null

    /**
     * 原图标签
     */
    var   identifiedLabel: List<KeyValueBo>? = null

    /**
     * 跑图编号
     */
    var   aiTaskCode: String? = null


    /**
     * 生成款式图
     */
    var   pickingStyleResultDetails: List<PickingResultImageInfoBo>? = null

    /**
     * 商品主图
     */
    var   mainImgUrl: String? = null

    /**
     * 推荐面料
     */
    var   recommendFabricDetails: List<PickingStyleResultDetailVo.RecommendFabricDetail>? = null

    /**
     * 新图识别
     */
    var   generateImageInfo: List<SmartIdentifyDto>? = null

    /**
     * 爆款标签
     */
    var   popularLabel: List<KeyValueBo>? = null


    /**
     * 原图风格
     */
    var    externalImageStyleCode: String? = null

    /**
     * 原图适用年龄
     */
    var    externalImageAgeCode: String? = null

    /**
     * 是否可用
     */
    var    eliminateType:Int? = null

    /**
     * 选款人
     */
    var    selectorName:String? = null

    /**
     * 选款时间
     */
    var    selectionTime:LocalDateTime? = null


}