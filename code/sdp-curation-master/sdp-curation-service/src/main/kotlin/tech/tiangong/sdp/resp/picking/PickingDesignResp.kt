package tech.tiangong.sdp.resp.picking

import team.aikero.blade.core.annotation.convert.ConvertOssPath
import java.io.Serializable
import java.math.BigDecimal


/**
 *  选款ai任务
 *
 * @author     ：qinwenxuan@zj.tech
 * @date       ：2025/8/4 18:30
 * @version    :1.0
 */
class PickingDesignResp(
    /**
     * 背景增强(1:开启, 0:关闭)
     */
    var filterBack: Int? = null,
    /**
     * 生成模式：0-单姿势；1-多姿势
     */
    var generateMode: Int? = null,
    /**
     * 履约增强：0-否；1-是 v3.10.1
     */
    var promiseEnhanced: Int? = null,
    /**
     * 脸部修复(1:开启, 0:关闭)
     */
    var faceRepair: Int? = null,

    /**
     * 是否使用加速推理
     */
    var fastForward: Int? = null,

    /**
     * 一拖三(1:开启, 0:关闭)
     */
    var tryOnFix: Int? = null,
    /**
     * 素材
     */
    var materials: List<String> = listOf()
) : Serializable {
    companion object {
        private const val serialVersionUID: Long = -6209771897639536045L
    }

    /**
     * 参考图权重，值越大，参考度越低，建议1~8的浮点数（默认0）v3.11
     */
    var refWeight: BigDecimal? = null

    /**
     * 模型名称（字典配置名称）
     */
    var modeName: String? = null


    /**
     * 场景图
     */
    @ConvertOssPath
    var picturePath: String? = null

    /**
     * 模特图片Url
     */
    @ConvertOssPath
    var aiModelUrl: String? = null
}