package tech.tiangong.datagroup.cyxf.entity;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * TemuOrder
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/1 15:40
 */
@Data
public class TemuOrderSkc {
    /**
     * SKU ID
     */
    private Long skuId;

    /**
     * 订单号
     */
    private String orderCode;
    /**
     * 应履约件数
     */
    private BigDecimal orderNumber;
    /**
     * 商品属性
     */
    private String commodityAttr;
    /**
     * SKC ID
     */
    private String skcId;

    /**
     * SPU ID
     */
    private String spuId;

    /**
     * etl_time
     */
    private LocalDateTime etlTime;
    /**
     * 订单创建时间
     */
    private LocalDateTime orderCreatedTime;

    /**
     * skc货号
     */
    private String extCode;
    /**
     * skcStatus
     */
    private String skcStatus;
    /**
     * 订单状态
     */
    private String orderStatus;
    /**
     * 商品状态:1,在售;0:未发布到站点;0:下架
     */
    private Integer skcSiteStatus;
}
