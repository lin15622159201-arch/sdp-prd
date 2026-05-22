package tech.tiangong.sdp.dao.entity

import com.baomidou.mybatisplus.annotation.IdType
import com.baomidou.mybatisplus.annotation.TableField
import com.baomidou.mybatisplus.annotation.TableId
import com.baomidou.mybatisplus.annotation.TableName
import team.aikero.blade.data.mybatis.entity.BaseEntityWithNamedAndReviser

/**
 * AI设计任务-标签(AiDesignTaskLabel)表名: ai_design_task_label
 *
 * @author zjh
 * @since 2024-11-29 10:59:53
 */
@TableName(value = "ai_design_task_label")
data class AiDesignTaskLabel(
    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.ASSIGN_ID)
    var id: Long? = null,

    /**
     * 任务id
     */
    @TableField(value = "task_id")
    var taskId: Long? = null,
    /**
     * 标签key名称
     */
    @TableField(value = "label_name")
    var labelName: String? = null,
    /**
     * 标签key编号
     */
    @TableField(value = "label_code")
    var labelCode: String? = null,
    /**
     * 标签value名称
     */
    @TableField(value = "label_value_name")
    var labelValueName: String? = null,
    /**
     * 标签value编号
     */
    @TableField(value = "label_value_code")
    var labelValueCode: String? = null,
    /**
     * 租户id
     */
    @TableField(value = "tenant_id")
    var tenantId: Long? = null,
) : BaseEntityWithNamedAndReviser()


