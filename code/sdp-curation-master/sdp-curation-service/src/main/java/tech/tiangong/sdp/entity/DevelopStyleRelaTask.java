package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * 开款关联任务表(develop_style_rela_task)实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "develop_style_rela_task")
public class DevelopStyleRelaTask extends BaseTenantUserEntity {
    /**
     * 关联ID
     */
    @TableId(value = "rela_id", type = IdType.INPUT)
    private Long relaId;
    /**
     * 任务ID
     */
    @TableField(value = "task_id")
    private Long taskId;
    /**
     * 数据来源
     */
    @TableField(value = "source_type")
    private String sourceType;

    /**
     * 数据来源ID
     */
    @TableField(value = "source_id")
    private Long sourceId;

    /**
     * 数据来源编号
     */
    @TableField(value = "source_code")
    private String sourceCode;
}
