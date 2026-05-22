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
 * 开款备注表(develop_style_remark)实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "develop_style_remark")
public class DevelopStyleRemark extends BaseTenantUserEntity {
    /**
     * 备注ID
     */
    @TableId(value = "remark_id", type = IdType.INPUT)
    private Long remarkId;
    /**
     * 任务ID
     */
    @TableField(value = "task_id")
    private Long taskId;
    /**
     * 开款图
     */
    @TableField(value = "image_url")
    private String imageUrl;

    /**
     * 备注信息
     */
    @TableField(value = "remark")
    private String remark;
}
