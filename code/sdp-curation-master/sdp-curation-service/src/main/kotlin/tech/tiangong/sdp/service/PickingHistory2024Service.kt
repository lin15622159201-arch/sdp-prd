package tech.tiangong.sdp.service

import org.springframework.web.multipart.MultipartFile

/**
 * AI设计-选款-历史数据
 * @author zjh
 * @date 2025/1/8 14:34
 */
interface PickingHistory2024Service {

    /**
     * 导入旧选款数据
     */
    fun importOldPickingData(file: MultipartFile)

    /**
     * 旧选款数据 新增到 选款结果表
     */
    fun oldPickingToResult(pickingResultIdList: List<Long>?)

    /**
     * 旧选款数据 推送到 灵感设计下游
     */
    fun oldPickingPush(pickingResultIdList: List<Long>?)
}