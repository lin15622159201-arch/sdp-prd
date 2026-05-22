package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 店铺表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "shop")
public class Shop extends BaseMessageEntity {
    /**
     * 主键 ID
     */
    @TableId(value = "shop_id", type = IdType.INPUT)
    private Long shopId;

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
     * 主体编码
     */
    @TableField("subject_code")
    private String subjectCode;

    /**
     * 主体名称
     */
    @TableField("subject_name")
    private String subjectName;

    /**
     * 店铺名
     */
    @TableField("shop_name")
    private String shopName;

    /**
     * 店铺类型
     */
    @TableField("shop_type")
    private String shopType;

    /**
     * 商品 token
     */
    @TableField("product_token")
    private String productToken;

    /**
     * 订单 token
     */
    @TableField("order_token")
    private String orderToken;

    /**
     * 标签
     */
    @TableField("label")
    private String label;

    /**
     * 运营人员 ID
     */
    @TableField("business_operator_id")
    private Long businessOperatorId;

    /**
     * 运营人员名称
     */
    @TableField("business_operator_name")
    private String businessOperatorName;
    /**
     * 是否启用【1启用；0禁用】
     */
    @TableField("enable")
    private Integer enable;
    /**
     * 是否有效【1有效；0无效】
     */
    @TableField("expired")
    private Integer expired;
    /**
     * 授权开始时间
     */
    @TableField("auth_start_time")
    private LocalDateTime authStartTime;
    /**
     * 授权结束时间
     */
    @TableField("auth_end_time")
    private LocalDateTime authEndTime;
    @TableField(exist = false)
    private List<ShopApp> apps;
}
