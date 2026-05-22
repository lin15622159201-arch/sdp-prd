package tech.tiangong.sdp.resp

import java.io.Serializable
import java.math.BigDecimal
import java.time.LocalDateTime

/**
 * 风格小模型
 *
 * @author     : qinwenxuan@zj.tech
 * @date       : 2025/8/26 11:28
 * @version    : 1.0
 */
class StyleGenTaskResp : Serializable{
    /**
     * 任务id
     */
    var taskId: Long? = null

    /**
     * 任务编号
     */
    var taskCode: String? = null

    /**
     * 任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；
     */
    var taskStatus: Int? = null
    /**
     * 参考图
     */
    var refImgUrl: String? = null

    /**
     * 提示词
     */
    var prompt: String? = null

    /**
     * 脸部修复(1:开启, 0:关闭)
     */
    var faceFix: Int? = null

    /**
     * 生成数量
     */
    var genCount: Int? = null

    /**
     * 背景图描述
     */
    var bgImgDesc: String? = null

    /**
     * 背景图url
     */
    var bgImgUrl: String? = null

    /**
     * 模特图描述
     */
    var modelImgDesc: String? = null

    /**
     * 模特图url
     */
    var modelImgUrl: String? = null

    /**
     * 生图的尺寸
     */
    var imgSize: String? = null

    /**
     * 风格模型ID
     */
    var styleModelId: Long? = null

    /**
     * 模型名称
     */
    var styleModelName: String? = null

    /**
     * lora的名字
     */
    var loraName: String? = null

    /**
     * 底模
     */
    var baseModel: String? = null

    /**
     * 生成时间
     */
    var generateTime: LocalDateTime? = null
    /**
     * 是否使用蒸馏加速
     */
    var enableDistill: Int? = null
    /**
     * 是否增强跟随性
     */
    var enableFollowability: BigDecimal? = null
    companion object {
        private const val serialVersionUID: Long = 2823963651255650656L
    }
}