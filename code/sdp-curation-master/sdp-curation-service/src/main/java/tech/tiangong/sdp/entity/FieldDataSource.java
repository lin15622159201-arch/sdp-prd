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
 * 字段数据来源
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/22 18:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "field_data_source")
public class FieldDataSource extends BaseMessageEntity {
    @TableId(value = "data_source_id", type = IdType.INPUT)
    private Long dataSourceId;

    @TableField("field_id")
    private Long fieldId;

    @TableField("source_id")
    private Long sourceId;

    @TableField("source_config")
    private String sourceConfig;


}
