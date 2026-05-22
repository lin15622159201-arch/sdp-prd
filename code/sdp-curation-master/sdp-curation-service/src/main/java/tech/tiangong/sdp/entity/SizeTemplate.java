package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.util.List;

/**
 * 尺码模板表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "size_template")
public class SizeTemplate extends BaseMessageEntity {
    /**
     * 主键 id
     */
    @TableId(value = "template_id", type = IdType.INPUT)
    private Long templateId;

    /**
     * 尺码名称
     */
    @TableField("template_name")
    private String templateName;

    /**
     * 尺码组编码
     */
    @TableField("group_code")
    private String groupCode;

    /**
     * 尺码组名称
     */
    @TableField("group_name")
    private String groupName;

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
     * 尺码
     */
    @TableField("size")
    private String size;

    /**
     * 部位
     */
    @TableField("part")
    private String part;

    /**
     * 是否启用【1启用；0禁用】
     */
    @TableField("enable")
    private Integer enable;
    @TableField(exist = false)
    private List<SizePart> parts;
}
