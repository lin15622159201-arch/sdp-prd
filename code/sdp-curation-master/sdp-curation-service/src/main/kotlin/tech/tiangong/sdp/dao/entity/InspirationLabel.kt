package tech.tiangong.sdp.dao.entity

import com.baomidou.mybatisplus.annotation.IdType
import com.baomidou.mybatisplus.annotation.TableField
import com.baomidou.mybatisplus.annotation.TableId
import com.baomidou.mybatisplus.annotation.TableName
import team.aikero.blade.data.mybatis.entity.BaseEntityWithNamedAndReviser

/**
 * 灵感数据-标签(InspirationLabel)表名: inspiration_label
 *
 * @author zjh
 * @since 2024-12-02 16:34:57
 */
@TableName(value = "inspiration_label")
data class InspirationLabel(
    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.ASSIGN_ID)
    var id: Long? = null,

    /**
     * 识别id
     */
    @TableField(value = "identified_id")
    var identifiedId: Long? = null,
    /**
     * 灵感id
     */
    @TableField(value = "inspiration_id")
    var inspirationId: Long? = null,
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


