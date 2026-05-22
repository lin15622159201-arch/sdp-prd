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
 * 现货操作表(spot_style_opt)实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "spot_style_opt")
public class SpotStyleOpt extends BaseTenantUserEntity {
    /**
     * 操作ID
     */
    @TableId(value = "opt_id", type = IdType.INPUT)
    private Long optId;
    /**
     * 任务ID
     */
    @TableField(value = "task_id")
    private Long taskId;
    /**
     * 操作类型
     */
    @TableField(value = "opt_type")
    private String optType;

    /**
     * 操作内容
     */
    @TableField(value = "content")
    private String content;
}
