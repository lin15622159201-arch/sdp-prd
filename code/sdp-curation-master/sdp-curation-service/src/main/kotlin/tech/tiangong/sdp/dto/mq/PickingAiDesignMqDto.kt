package tech.tiangong.sdp.dto.mq

import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer
import team.aikero.blade.core.annotation.convert.ConvertOssPath
import tech.tiangong.sdp.dao.bo.AiDesignModelBo
import tech.tiangong.sdp.dao.bo.AiDesignSceneBo
import tech.tiangong.sdp.dao.bo.KeyValueBo
import java.math.BigDecimal
import java.time.LocalDateTime

/**
 * @author: zhongym
 */
class PickingAiDesignMqDto {
    /**
     * 选款id
     */
    var pickingId: Long? = null

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
    var planningSourceCode: String? = null

    /**
     * 国家站点
     */
    var countrySiteCode: String? = null

    /**
     * 灵感图来源
     */
    var inspirationImageSourceCode: String? = null

    /**
     * 灵感图品牌
     */
    var inspirationBrandCode: String? = null

    /**
     * 跑图模型编码
     */
    var modeCode: String? = null

    /**
     * 跑图模型名称
     */
    var modeName: String? = null

    /**
     * 任务品类
     */
    var externalCategory: String? = null

    /**
     * 参考权重
     */
    var refWeight: BigDecimal? = null

    /**
     * 生成模式
     */
    var generateMode: Int? = null

    /**
     * 跑图背景
     */
    var sceneInfo: AiDesignSceneBo? = null

    /**
     * 背景描述
     */
    var pictureCaption: String? = null

    /**
     * 跑图模特
     */
    var modelInfo: AiDesignModelBo? = null

    /**
     * 模特描述
     */
    var modelCaption: String? = null //todo 没有这个属性

    /**
     * 背面增强
     */
    var filterBack: Int? = null

    /**
     * 脸部修复
     */
    var faceRepair: Int? = null

    /**
     * 履约增强
     */
    var promiseEnhanced: Int? = null

    /**
     * 生成数量
     */
    var generateNum: Int? = null

    /**
     * 灵感编号
     */
    var inspirationCode: String? = null

    /**
     * 灵感原图
     */
    var inspirationImage: String? = null

    /**
     * 任务类型字典code
     */
    var taskTypeCode: String? = null


    /**
     * 款式来源字典code
     */
    var styleSourceCode: String? = null



    /**
     *灵感图创建人
     */
    var creatorName: String? = null

    /**
     * 灵感图创建时间
     */
    var inspirationCreatedTime: LocalDateTime? = null

    /**
     * 原图标签
     */
    var identifiedLabel: List<KeyValueBo>? = null

    /**
     * 跑图编号
     */
    var aiTaskCode: String? = null


    /**
     * 生成款式
     */
    var pickingStyles: List<PickingAiDesignStyleDto>? = null


    /**
     * 推荐面料
     */
    var recommendFabricDetails: List<RecommendFabricDetailDto>? = null


    /**
     * 爆款标签
     */
    var popularLabel: List<KeyValueBo>? = null


    /**
     * 原图风格
     */
    var externalImageStyleCode: String? = null

    /**
     * 原图适用年龄
     */
    var externalImageAgeCode: String? = null

    /**
     *任务图创建人
     */
    var taskCreatorName: String? = null

    /**
     * 任务创建时间
     */
    var taskCreatedTime: LocalDateTime? = null



    class PickingAiDesignStyleDto {
        /**
         * 款式id
         */
        var pickingStyleId: Long? = null

        /**
         * 款式名称(款式1,款式2..)
         */
        var styleName: String? = null

        /**
         * 款式图片
         */
        var stylePictures: List<PickingAiDesignPictureDto>? = null

    }

    class PickingAiDesignPictureDto {
        /**
         * 图片id
         */
        @JsonSerialize(using = ToStringSerializer::class)
        var pickingPictureId: Long? = null

        /**
         * 生成图
         */
        var pictureUrl: String? = null

        /**
         * 修复图
         */
        var repairImgUrl: String? = null

        /**
         * 组号
         */
        var groupNum: Int? = null

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
         * 淘汰原因 v3.10.1
         */
        var eliminateReasonCodes: List<String>? = null
    }

    class RecommendFabricDetailDto {
        /**
         * 中台主商品ID
         */
        var sourceCommodityId: Long? = null

        /**
         * 商品ID
         */
        var commodityId: Long? = null

        /**
         * 商品编码
         */
        var commodityCode: String? = null

        /**
         * 商品名称
         */
        var commodityName: String? = null

        /**
         * 商品图片
         */
        @ConvertOssPath
        var commodityPicture: String? = null

        /**
         * 纹理色块图
         */
        @ConvertOssPath
        var colorPicture: String? = null

        /**
         * SKU-ID
         */
        var skuId: Long? = null

        /**
         * SKU-编码
         */
        var skuCode: String? = null

        /**
         * 色号
         */
        var colorCode: String? = null

        /**
         * RGB
         */
        var rgb: String? = null
    }

}





