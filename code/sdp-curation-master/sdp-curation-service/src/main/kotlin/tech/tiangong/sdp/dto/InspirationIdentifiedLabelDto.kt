package tech.tiangong.sdp.dto

import tech.tiangong.butted.common.vo.PredLabelVo

/**
 * @author zjh
 * @date 2024/12/13 10:19
 */
class InspirationIdentifiedLabelDto {
    /**
     * 分割标签列表
     */
    var clipLabelList: List<PredLabelVo>? = null

    /**
     * 花型标签列表
     */
    var flowerPatternLabelList: List<PredLabelVo>? = null

    /**
     * 风格标签列表
     */
    var styleLabelList: List<PredLabelVo>? = null
}