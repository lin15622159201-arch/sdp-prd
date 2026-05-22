package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * 品类映射表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "platform_category_mapping")
public class PlatformCategoryMapping extends BaseMessageEntity {
    /**
     * 映射 ID
     */
    @TableId(value = "mapping_id", type = IdType.ASSIGN_ID)
    private Long mappingId;

    /**
     * 平台编码
     */
    @TableField("platform_code")
    private String platformCode;

    /**
     * 平台名称
     */
    @TableField("platform_name")
    private String platformName;

    /**
     * 品类编码
     */
    @TableField("category_code")
    private String categoryCode;

    /**
     * 品类名
     */
    @TableField("category_name")
    private String categoryName;

    /**
     * 关联平台品类编码
     */
    @TableField("platform_category_code")
    private String platformCategoryCode;

    /**
     * 关联平台品类名称
     */
    @TableField("platform_category_name")
    private String platformCategoryName;
    /**
     * 是否启用【1启用；0禁用】
     */
    @TableField("enable")
    private Integer enable;
}
