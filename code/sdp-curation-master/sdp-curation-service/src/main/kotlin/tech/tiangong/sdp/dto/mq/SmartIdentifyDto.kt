package tech.tiangong.sdp.dto.mq

import tech.tiangong.sdp.dao.bo.KeyValueBo

/**
 * @author: xieyuxiang
 * @Date 2025/4/30
 */
class SmartIdentifyDto {

    /**
     * 识别品类
     */
    var category: String? = null
    /**
     * 识别品类编号
     */
    var categoryCode: String? = null

    /**
     * 款式类型：0-净色、1-花型
     */
    var styleType: Int? = null


    /**
     * 标签
     */
    var   identifiedLabel: List<KeyValueBo>? = null


}