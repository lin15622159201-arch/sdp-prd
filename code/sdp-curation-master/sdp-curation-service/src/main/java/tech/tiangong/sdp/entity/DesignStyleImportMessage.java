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
 * 款式管理-款式导入SPU-SKC信息
 * 表名: design_style_import_message
 *
 * @author liuhongfu
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("design_style_import_message")
public class DesignStyleImportMessage extends BasicMessageTask {

    /**
     * 主键
     */
    @TableId(value = "message_id", type = IdType.ASSIGN_ID)
    private Long messageId;

    /**
     * SPU编码
     */
    @TableField(value = "spu_code")
    private String spuCode;

    /**
     * SKC编码
     */
    @TableField(value = "skc_code")
    private String skcCode;


}