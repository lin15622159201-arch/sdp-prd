package tech.tiangong.sdp.dao.entity;

import com.baomidou.mybatisplus.annotation.IdType
import com.baomidou.mybatisplus.annotation.TableField
import com.baomidou.mybatisplus.annotation.TableId
import com.baomidou.mybatisplus.annotation.TableName
import team.aikero.blade.data.mybatis.entity.BaseEntityWithNamedAndReviser
import java.math.BigDecimal

/**
 * AI设计任务(AiDesignTask)表名: ai_design_task
 *
 * @author zjh
 * @since 2025-01-17 15:03:37
 */
@TableName(value = "ai_design_task")
data class AiDesignTask(
    /**
     * 任务id
     */
    @TableId(value = "task_id", type = IdType.ASSIGN_ID)
    var taskId: Long? = null,

    /**
     * 业务id
     */
    @TableField(value = "bus_id")
    var busId: Long? = null,

    /**
     * 父业务id
     */
    @TableField(value = "parent_bus_id")
    var parentBusId: Long? = null,
    /**
     * 业务编号
     */
    @TableField(value = "bus_code")
    var busCode: String? = null,
    /**
     * AI任务id(创建任务时返回)
     */
    @TableField(value = "ai_task_id")
    var aiTaskId: Long? = null,
    /**
     * AI任务code(创建任务时返回)
     */
    @TableField(value = "ai_task_code")
    var aiTaskCode: String? = null,
    /**
     * 任务状态:0排队中 10生成中 20已中止 30已完成 40无效 50失败 60超时失败
     */
    @TableField(value = "task_status")
    var taskStatus: Int? = null,
    /**
     * 灵感数据id
     */
    @TableField(value = "inspiration_id")
    var inspirationId: Long? = null,
    /**
     * 灵感图
     */
    @TableField(value = "inspiration_image")
    var inspirationImage: String? = null,
    /**
     * 灵感图名称
     */
    @TableField(value = "inspiration_image_name")
    var inspirationImageName: String? = null,
    /**
     * 图片识别id
     */
    @TableField(value = "smart_identify_id")
    var smartIdentifyId: Long? = null,
    /**
     * 款式品类code
     */
    @TableField(value = "category_code")
    var categoryCode: String? = null,
    /**
     * 款式品类名称
     */
    @TableField(value = "category_name")
    var categoryName: String? = null,
    /**
     * 是否同步修改灵感识别品类1-是 0-否 v3.11
     */
    @TableField(value = "sync_category")
    var syncCategory: Int? = null,
    /**
     * 生成模式：0-单姿势；1-多姿势
     */
    @TableField(value = "generate_mode")
    var generateMode: Int? = null,
    /**
     * 模特信息
     */
    @TableField(value = "model_info")
    var modelInfo: String? = null,
    /**
     * 场景信息
     */
    @TableField(value = "scene_info")
    var sceneInfo: String? = null,
    /**
     * 模特素材ID（手动上传模特素材图为空）
     */
    @TableField(value = "model_material_id")
    var modelMaterialId: Long? = null,
    /**
     * 模特素材名称（手动上传模特素材图为空）
     */
    @TableField(value = "model_material_name")
    var modelMaterialName: String? = null,
    /**
     * 模特素材URL（可以手动上传模特素材图）
     */
    @TableField(value = "model_material_url")
    var modelMaterialUrl: String? = null,
    /**
     * 生成数量
     */
    @TableField(value = "gen_count")
    var genCount: Int? = null,
    /**
     * 背景增强(1:开启, 0:关闭)
     */
    @TableField(value = "filter_back")
    var filterBack: Int? = null,
    /**
     * 脸部修复(1:开启, 0:关闭)
     */
    @TableField(value = "face_repair")
    var faceRepair: Int? = null,

    /**
     * 履约增强：0-否；1-是 v3.10.1
     */
    @TableField(value = "promise_enhanced")
    var promiseEnhanced: Int? = null,
    /**
     * 款式类型：0-净色、1-花型
     */
    @TableField(value = "style_type")
    var styleType: Int? = null,
    /**
     * 租户id
     */
    @TableField(value = "tenant_id")
    var tenantId: Long? = null,
) : BaseEntityWithNamedAndReviser() {
    /**
     * 模型编码（字典配置编码）
     */
    @TableField(value = "mode_code")
    var modeCode: String? = null

    /**
     * 参考图权重，值越大，参考度越低，建议1~8的浮点数（默认0）v3.11
     */
    @TableField(value = "ref_weight")
    var refWeight: BigDecimal? = null

    /**
     * 模型名称（字典配置名称）
     */
    @TableField(value = "mode_name")
    var modeName: String? = null

    /**
     * 是否使用加速推理
     */
    @TableField(value = "fast_forward")
    var fastForward: Int? = null

    @TableField(exist = false)
    var enableSyncCategory: Boolean? = null

    /**
     * 一拖三(1:开启, 0:关闭)
     */
    @TableField(value = "try_on_fix")
    var tryOnFix: Int? = null

    /**
     * 款生成数量
     */
    @TableField(value = "style_generate_num")
    var styleGenerateNum: Int? = null


    /**
     * 模特人种
     */
    @TableField(value = "model_ethnicity")
    var modelEthnicity: String? = null

    @TableField(exist = false)
    var materials: List<AiDesignMaterial> = listOf()
}


