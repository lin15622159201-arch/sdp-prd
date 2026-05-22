package tech.tiangong.sdp.dao.entity

import com.baomidou.mybatisplus.annotation.IdType
import com.baomidou.mybatisplus.annotation.TableField
import com.baomidou.mybatisplus.annotation.TableId
import com.baomidou.mybatisplus.annotation.TableName
import team.aikero.blade.data.mybatis.entity.BaseEntityWithNamedAndReviser
import java.math.BigDecimal

/**
 * 风格小模型任务
 *
 * @author     : qinwenxuan@zj.tech
 * @date       : 2025/8/25 15:41
 * @version    : 1.0
 */
@TableName(value = "style_gen_task")
class StyleGenTask(
    /**
     * 任务id
     */
    @TableId(value = "task_id", type = IdType.ASSIGN_ID)
    var taskId: Long? = null,
) : BaseEntityWithNamedAndReviser() {
    /**
     * 生图任务ID
     */
    @TableField(value = "gen_task_id")
    var genTaskId: Long? = null
    /**
     * 灵感数据id
     */
    @TableField(value = "inspiration_id")
    var inspirationId: Long? = null

    /**
     * 灵感任务code(创建任务时返回)
     */
    @TableField(value = "inspiration_code")
    var inspirationCode: String? = null

    /**
     * 灵感图
     */
    @TableField(value = "inspiration_image")
    var inspirationImage: String? = null

    /**
     * 生成数量
     */
    @TableField(value = "gen_count")
    var genCount: Int? = null

    /**
     * 推送状态
     */
    @TableField(value = "push_status")
    var pushStatus: Int? = null

    /**
     * 脸部修复(1:开启, 0:关闭)
     */
    @TableField(value = "face_fix")
    var faceFix: Int? = null

    /**
     * 提示词
     */
    @TableField(value = "prompt")
    var prompt: String? = null

    /**
     * 原图url
     */
    @TableField(value = "ref_img_url")
    var refImgUrl: String? = null

    /**
     * 背景图描述
     */
    @TableField(value = "bg_img_desc")
    var bgImgDesc: String? = null

    /**
     * 背景图url
     */
    @TableField(value = "bg_img_url")
    var bgImgUrl: String? = null

    /**
     * 背景图信息
     */
    @TableField(value = "bg_img_info")
    var bgImgInfo: String? = null
    /**
     * 模特图描述
     */
    @TableField(value = "model_img_desc")
    var modelImgDesc: String? = null

    /**
     * 模特图url
     */
    @TableField(value = "model_img_url")
    var modelImgUrl: String? = null

    /**
     * 模特图信息
     */
    @TableField(value = "model_img_info")
    var modelImgInfo: String? = null
    /**
     * 生图的尺寸
     */
    @TableField(value = "img_size")
    var imgSize: String? = null

    /**
     * 风格模型ID
     */
    @TableField(value = "style_model_id")
    var styleModelId: Long? = null

    /**
     * lora的名字
     */
    @TableField(value = "lora_name")
    var loraName: String? = null

    /**
     * 模型名称
     */
    @TableField(value = "mode_name")
    var modeName: String? = null

    /**
     * 服装类型
     */
    @TableField(value = "cloth_type")
    var clothType: String? = null
    /**
     * 是否使用蒸馏加速
     */
    @TableField(value = "enable_distill")
    var enableDistill: Int? = null
    /**
     * 是否增强跟随性
     */
    @TableField(value = "enable_followability")
    var enableFollowability: BigDecimal? = null
    /**
     * 租户id
     */
    @TableField(value = "tenant_id")
    var tenantId: Long? = null
}