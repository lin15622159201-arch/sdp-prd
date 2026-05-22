package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.vo.dto.DesignImageDTO;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * SKC图片
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/9 14:43
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class SkcImageResp extends DesignImageDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -453407821388102520L;
    /**
     * 图片URL
     */
    private String imageUrl;
    /**
     * 待上架
     * 1：待上架
     * 0：待推送
     */
    private Bool upcoming;
    /**
     * 上架
     * 1：上架
     * 0：下架
     */
    private Bool onShelves;

    /**
     * 上架是否失败状态
     * 1：上架失败
     */
    private Bool onShelvesFail;

    /**
     * 已取消
     * 1：已取消
     */
    private Bool cancelled;
    /**
     * 店铺id
     */
    private Long storeId;

    /**
     * 店铺名称
     */
    private String storeName;

    /**
     * 采购价
     */
    private BigDecimal purchasePrice;

    /**
     * 设计师id【设计师】
     */
    private Long designerId;

    /**
     * 设计师名称【设计师】
     */
    private String designerName;

    /**
     * 设计师组别编码
     */
    private String designerGroupCode;

    /**
     * 设计师组别名称
     */
    private String designerGroupName;

    /**
     * 创建时间
     */
    private LocalDateTime createdTime;
}
