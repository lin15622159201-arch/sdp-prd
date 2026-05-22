package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

/**
 * 商品同步日志表
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/22 18:29
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "product_sync_log", autoResultMap = true)
public class ProductSyncLog extends BaseMessageEntity {

    /**
     * 主键id
     */
    @TableId(value = "log_id", type = IdType.INPUT)
    private Long logId;
    /**
     * 店铺 ID
     */
    @TableField("shop_id")
    private Long shopId;
    /**
     * 商品id
     */
    @TableField("product_id")
    private Long productId;

    /**
     * 平台编码
     */
    @TableField("platform_code")
    private String platformCode;

    /**
     * SKC编码
     */
    @TableField("skc_code")
    private String skcCode;

    /**
     * 日志内容
     */
    @TableField(value = "content")
    private String content;
    /**
     * 批次号
     */
    @TableField(value = "batch_no")
    private String batchNo;

    /**
     * 同步给业务状态：0-未同步；1-已同步
     */
    @TableField("sync_status")
    private Integer syncStatus;

    /**
     * 同步时间
     */
    @TableField("sync_time")
    private LocalDateTime syncTime;

    /**
     * 同步次数
     */
    @TableField("sync_times")
    private Integer syncTimes;
}
