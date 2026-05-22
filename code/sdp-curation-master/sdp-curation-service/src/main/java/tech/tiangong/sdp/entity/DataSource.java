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
 * 数据来源
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/22 18:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "data_source")
public class DataSource extends BaseMessageEntity {

    @TableId(value = "source_id", type = IdType.INPUT)
    private Long sourceId;

    @TableField("source_code")
    private String sourceCode;

    @TableField("source_name")
    private String sourceName;

    @TableField("source_status")
    private Integer sourceStatus;
}
