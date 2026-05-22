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
 * 页面表
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/22 18:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "page_view")
public class PageView extends BaseMessageEntity {
    @TableId(value = "page_id", type = IdType.INPUT)
    private Long pageId;

    @TableField("page_code")
    private String pageCode;

    @TableField("page_name")
    private String pageName;

    @TableField("page_status")
    private Integer pageStatus;
}
