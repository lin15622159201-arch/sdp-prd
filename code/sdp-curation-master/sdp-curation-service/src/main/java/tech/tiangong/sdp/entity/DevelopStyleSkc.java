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
 * 开款-SKU表(develop_style_skc)实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "develop_style_skc")
public class DevelopStyleSkc extends BasicMessageTask {
    /**
     * SKC ID
     */
    @TableId(value = "skc_id", type = IdType.INPUT)
    private Long skcId;
    /**
     * 任务ID
     */
    @TableField(value = "task_id")
    private Long taskId;
    /**
     * spu ID
     */
    @TableField(value = "spu_id")
    private Long spuId;

    /**
     * 颜色名称
     */
    @TableField(value = "color")
    private String color;
    /**
     * 颜色名称编码
     */
    @TableField(value = "color_code")
    private String colorCode;

    /**
     * 颜色英文名
     */
    @TableField(value = "color_en_name")
    private String colorEnName;

    /**
     * 前置拆版状态 0=否 1=是
     */
    @TableField(value = "pre_disassembly_state")
    private Integer preDisassemblyState;
}
