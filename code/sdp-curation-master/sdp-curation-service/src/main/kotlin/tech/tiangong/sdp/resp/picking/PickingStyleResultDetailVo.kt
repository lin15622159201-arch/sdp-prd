package tech.tiangong.sdp.resp.picking

import com.fasterxml.jackson.annotation.JsonFormat
import team.aikero.blade.core.annotation.convert.ConvertOssPath
import tech.tiangong.sdp.dao.bo.KeyValueBo
import tech.tiangong.sdp.dao.bo.PickingResultImageInfoBo
import java.time.LocalDateTime

/**
 * @author zjh
 * @date 2024/11/29 15:15
 */
class PickingStyleResultDetailVo {

    /**
     * 开款状态(下游)：0-待处理 1-已开款 2-已淘汰
     * @see tech.tiangong.sdp.enums.PickingOpenStyleStateEnum
     */
    var openStyleState: Int? = null

    /**
     * 开款spu编码(设计需求-开款)
     */
    var styleSpuCode: String? = null

    /**
     * 开款skc编码(设计需求-开款)
     */
    var styleSkcCode: String? = null

    /**
     * 开款时间(设计需求-开款)
     */
    var styleSpuCreateTime: LocalDateTime? = null

    /**
     * 开款淘汰原因(设计需求-淘汰)
     */
    var styleEliminateReason: String? = null

    /**
     * 灵感详情
     */
    var inspirationDetail: InspirationDetail? = null

    /**
     * 跑图详情
     */
    var designTaskDetail: DesignTaskDetail? = null

    /**
     * 推荐面料详情
     */
    var recommendFabricDetails: List<RecommendFabricDetail>? = null

    /**
     * 选款详情
     */
    var pickingDetail: PickingDetail? = null

    class InspirationDetail {
        /**
         * 灵感图
         */
        var inspirationImage: String? = null

        /**
         * 外部品类
         */
        var externalCategory: String? = null

        /**
         * 数据来源(AIDC)
         */
        var dataSourceType: String? = null

        /**
         * 灵感图创建时间
         */
        var createdTime: LocalDateTime? = null

        /**
         * 灵感图创建人
         */
        var creatorName: String? = null

        /**
         * 灵感图来源(shein)
         */
        var inspirationSourceType: String? = null

        /**
         * 灵感图来源站点(TH)
         */
        var countrySiteCode: String? = null

        /**
         * 划线价
         */
        var retailPrice: String? = null

        /**
         * 售价
         */
        var salePrice: String? = null


        /**
         * 灵感图品牌 v3.10.1
         */
        var inspirationBrand: String? = null

        /**
         * 数据来源
         * smart_develop_style：AI设计
         * posture_fission ：姿势裂变
         */
        var origin: String? = null

        /**
         * 参考图
         */
        var refImgUrl: String? = null

        /**
         * 原图
         * origin为floral_pattern时，该字段为模型图
         */
        var sourceImage: String? = null

    }

    class DesignTaskDetail {

        /**
         * 跑图编号(AI设计编号)
         */
        var aiTaskCode: String? = null

        /**
         * 品类
         */
        var category: String? = null

        /**
         * 款式类型：0-净色、1-花型
         */
        var styleType: Int? = null

        /**
         * 生成模式,1:多姿势,0:单姿势
         */
        var generateMode: Int? = null

        /**
         * 背景增强 (1:开启, 0:关闭)
         * - 多姿势:默认开启, 入参传"不开启"才改变值
         * - 单姿势:默认关闭
         */
        var bgEnhanced: Int? = null

        /**
         * 标签
         */
        var labels: List<KeyValueBo>? = null
    }

    class RecommendFabricDetail {
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

    class PickingDetail {
        /**
         * 选款状态：0待选中,1已选中,2未选中
         */
        var pickingState: Int? = null

        /**
         * 选款人 买手
         */
        var selectorId: Long? = null

        /**
         * 选款人 买手
         */
        var selectorName: String? = null

        /**
         * 选图时间开始
         */
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
        var imagePickingStartTime: LocalDateTime? = null

        /**
         * 建议价格
         */
        var suggestedPrice: String? = null

        /**
         * 建议波次
         */
        var suggestedWaveBatchName: String? = null

        /**
         * 建议风格
         */
        var suggestedStyleName: String? = null

        /**
         * 店铺名称
         */
        var storeName: String? = null

        /**
         * 建议店铺
         */
        var suggestedShopName: String? = null


        /**
         * 建议国家站点
         */
        var suggestedCountrySiteName: String? = null

        /**
         * 建议品类
         */
        var suggestedCategoryName: String? = null

        /**
         * 场景code  v3.9
         */
        var sceneCode: String? = null

        /**
         * 场景名称 v3.9
         */
        var sceneName: String? = null

        /**
         * 货盘
         */
        var cargoTrayName: String? = null

        /**
         * 印花标识
         */
        var suggestedPrintingName: String? = null

        /**
         * 备注
         */
        var remark: String? = null

        /**
         * 【商品主题】名称 v3.10.1
         */
        var productThemeName: String? = null

        /**
         * 图片
         */
        var pickingStyleResultDetails: List<PickingResultImageInfoBo> = mutableListOf()
    }

}