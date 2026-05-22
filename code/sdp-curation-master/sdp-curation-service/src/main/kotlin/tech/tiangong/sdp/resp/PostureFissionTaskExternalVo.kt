package tech.tiangong.sdp.resp

import com.fasterxml.jackson.annotation.JsonFormat
import java.io.Serial
import java.io.Serializable
import java.time.LocalDateTime


/**
 * 姿势裂变任务-详情
 * @author liuhongfu
 * @date 2025/8/19 14:22
 */
open class PostureFissionTaskExternalVo(

    /**
     * 任务ID
     */
    var taskId: Long? = null,

    /**
     * 灵感ID
     */
    var inspirationId: Long? = null,


    /**
     * 灵感编号
     */
    var inspirationCode: String? = null,

    /**
     * 任务编号
     */
    var taskCode: String? = null,

    /**
     * 任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；
     */
    var taskState: Int? = null,


    /**
     * 任务类型来源，来自字典
     */
    var  taskSource : String? = null,

    /**
     * 来源类型
     * 0-用户上传，1-灵感源
     */
    var sourceType: Int? = null,

    /**
     * 来源业务id
     */
    var sourceBusinessId: Long? = null,

    /**
     * 来源业务编号
     */
    var sourceBusinessCode: String? = null,

    /**
     * 品类编码
     */
    var categoryCode: String? = null,

    /**
     * 品类名称
     */
    var category: String? = null,

    /**
     * 服装类型编码
     */
    var clothTypeCode: String? = null,

    /**
     * 服装类型名称
     */
    var clothTypeName: String? = null,


    /**
     * 模型编码（字典配置编码）
     */
    var modeCode: String? = null,

    /**
     * 模型名称（字典配置名称）
     */
    var modeName: String? = null,

    /**
     * 原图url
     */
    var refImgUrl: String? = null,

    /**
     * 构图跟随原图(1:开启, 0:关闭)
     */
    var layoutByRef: Int? = null,

    /**
     * 是否裁头(1:开启, 0:关闭)
     */
    var cuttingHead: Int? = null,

    /**
     * 是否需要背面(1:开启, 0:关闭)
     */
    var needBackSide: Int? = null,

    /**
     * 是否补全身体
     *  1:是
     *  0: 不补全
     */
    var completeBody: Int? = null,

    /**
     * 分辨率
     */
    var imgSize: String? = null,

    /**
     * 背面图数量
     */
    var backSideCount: Int? = null,

    /**
     * 生成数量
     */
    var genCount: Int? = null,

    /**
     * 排队时长(秒)
     */
    var queueDuration: Int? = null,

    /**
     * 生成时长(秒)
     */
    var generateDuration: Int? = null,

    /**
     * 信息备注
     */
    var message: String? = null,

    /**
     * 创建人 id
     */
    var creatorId: Long? = null,

    /**
     * 创建人 名称
     */
    var creatorName: String? = null,

    /**
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    var createdTime: LocalDateTime? = null,

    /**
     * 生成时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    var generateTime: LocalDateTime? = null,

    /**
     * 任务状态
     */
    var taskStatus: Int? = null,


    ) : Serializable {
    companion object {
        @Serial
        private const val serialVersionUID: Long = 1L
    }
}
