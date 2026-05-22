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
 * 页面表单
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/22 18:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "page_form")
public class PageForm extends BaseMessageEntity {
    @TableId(value = "form_id", type = IdType.INPUT)
    private Long formId;

    @TableField("page_id")
    private Long pageId;

    @TableField("form_code")
    private String formCode;

    @TableField("form_name")
    private String formName;

    @TableField("form_status")
    private Integer formStatus;

    @TableField("order_num")
    private Integer orderNum;
}
