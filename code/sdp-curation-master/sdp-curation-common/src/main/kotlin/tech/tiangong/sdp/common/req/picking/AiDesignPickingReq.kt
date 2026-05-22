package tech.tiangong.sdp.common.req.picking

import tech.tiangong.sdp.common.dto.picking.FabricRecommendSkuDto
import tech.tiangong.sdp.common.dto.picking.LabelDto
import tech.tiangong.sdp.common.dto.picking.ResGroupRepairImgDto
import java.time.LocalDateTime

/**
 * @author zjh
 * @date 2025/1/8 14:42
 */
class AiDesignPickingReq {

    /**
     * 创建人id
     */
    var creatorId: Long? = null

    /**
     * 创建人名称
     */
    var creatorName: String? = null

    /**
     * 创建时间
     */
    var createdTime: LocalDateTime? = null

    /**
     * 租户id
     */
    var tenantId: Long? = null

    /**
     * 业务主键ID
     */
    var busId: Long? = null

    /**
     * 业务编号
     */
    var busCode: String? = null

    /**
     * 参考图url
     */
    var refImgUrl: String? = null

    /**
     * 款式类型：0-净色、1-花型
     */
    var styleType: Int? = null

    /**
     * 品类名称
     */
    var category: String? = null

    /**
     * 识别品类名称
     */
    var identifyCategory: String? = null

    /**
     * 是否生成多姿势，1-是，0-否
     */
    var multiPose: Int? = null

    /**
     * 生成图列表
     */
    var resImgList: List<ResGroupRepairImgDto>? = null

    /**
     * 分割标签列表
     */
    var clipLabelList: List<LabelDto>? = null

    /**
     * 花型标签列表
     */
    var flowerPatternLabelList: List<LabelDto>? = null

    /**
     * 风格标签列表
     */
    var styleLabelList: List<LabelDto>? = null

    /**
     * 推荐面料列表
     */
    var recommendFabricList: List<FabricRecommendSkuDto>? = null
}