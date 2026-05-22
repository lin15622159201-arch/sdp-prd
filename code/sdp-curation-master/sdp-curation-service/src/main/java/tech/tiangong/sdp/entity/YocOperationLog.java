package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 店铺运营中心 操作日志实体类
 *
 * @author system
 * @version 1.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "yoc_operation_log")
public class YocOperationLog implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 主键ID
     */
    @TableId(value = "id", type = IdType.INPUT)
    private Long id;

    /**
     * 租户ID
     */
    @TableField(value = "tenant_id")
    private String tenantId;

    /**
     * 操作类型
     * <p>
     * 用于标识操作的具体类型，如：创建、更新、删除等
     * </p>
     */
    @TableField(value = "operation_type")
    private Integer operationType;

    /**
     * 业务ID
     * <p>
     * 关联的具体业务数据的ID
     * </p>
     */
    @TableField(value = "business_id")
    private Long businessId;

    /**
     * 请求参数（JSON格式）
     * <p>
     * 记录操作时的请求参数
     * </p>
     */
    @TableField(value = "request_params")
    private String requestParams;

    /**
     * 创建人ID（操作人ID）
     */
    @TableField(value = "creator_id")
    private Long creatorId;

    /**
     * 创建人名称（操作人名称）
     */
    @TableField(value = "creator_name")
    private String creatorName;

    /**
     * 创建时间
     */
    @TableField(value = "create_time")
    private LocalDateTime createTime;
}
