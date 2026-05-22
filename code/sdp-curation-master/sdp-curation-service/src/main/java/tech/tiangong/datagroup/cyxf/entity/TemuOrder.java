package tech.tiangong.datagroup.cyxf.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

/**
 * TemuSkc
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/27 11:01
 */
@Data
@SuperBuilder
@Accessors(chain = true)
@NoArgsConstructor
@TableName(value = "dwd_temu_semi_recent_order_list")
public class TemuOrder {
    /**
     * SKU ID
     */
    @TableId(value = "`SKU ID`", type = IdType.INPUT)
    private Long skuId;

    /**
     * SKC ID
     */
    @TableField(value = "`SKC ID`")
    private String skcId;

    /**
     * SPU ID
     */
    @TableField(value = "`SPU ID`")
    private String spuId;

    /**
     * etl_time
     */
    @TableField(value = "etl_time")
    private LocalDateTime etlTime;
    /**
     * 订单创建时间
     */
    @TableField(value = "订单创建时间")
    private LocalDateTime orderCreatedTime;
}
