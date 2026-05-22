package tech.tiangong.sdp.vo.resp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

/**
 * 合作模式
 *
 * @author ：liuhongfu@zj.tech
 * @version :1.0
 * @date ：2025/12/25 15:09
 */
@EqualsAndHashCode(callSuper = false)
@Data
public class BrandInfoInnerVo implements Serializable {
    @Serial
    private static final long serialVersionUID = 7507033471735932273L;

    /**
     * 主键，品牌id
     */
    private Long brandId;

    /**
     * 客户id
     */
    private Long customerId;

    /**
     * 品牌名称
     */
    private String brandName;

    /**
     * 变为数组 customer-optimization 品牌类型
     */
    private List<String> brandType;

    /**
     * 对标品牌
     */
    private String benchmarkingBrand;

    /**
     * 品质要求
     */
    private String qualityRequirement;

    /**
     * 产品风格
     */
    private List<String> productStyle;

    /**
     * 消费年龄
     */
    private List<String> consumerAgeList;

    /**
     * 面料级别-来源字典配置
     */
    private String fabricLevel;

    /**
     * 工艺级别-来源字典配置
     */
    private String craftLevel;

    /**
     * 供应链服务级别-来源字典配置
     */
    private String supplyChainLevel;

    /**
     * 合作业务Id
     */
    private Long businessId;

    /**
     * 创建人名称
     */
    private String creatorName;

    /**
     * 最近修改人名称
     */
    private String reviserName;

    /**
     * 逻辑删除 0 否 1是
     */
    private Integer isDeleted;

    /**
     * 品牌对应的销售渠道信息
     */
    private List<ChannelVo> channelVoList;

    /**
     * 品牌对应的合作模式信息
     */
    private List<CooperationModeVo> cooperationModeList;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ChannelVo implements Serializable {

        /**
         * 销售渠道，主键
         */
        private Long saleChannelId;

        /**
         * 销售通道编码
         */
        private String channelCode;

        /**
         * 销售渠道名称
         */
        private String channelName;

        /**
         * 客户id
         */
        private Long customerId;

        /**
         * 品牌id
         */
        private Long brandId;

        /**
         * 销售占比
         */
        private BigDecimal salesRatio;

    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CooperationModeVo implements Serializable {

        /**
         * 合作模式id
         */
        private Long cooperationModeId;

        /**
         * 客户id
         */
        private Long customerId;

        /**
         * 品牌id
         */
        private Long brandId;

        /**
         * 合作模式code
         */
        private String cooperationType;

        /**
         * 模式占比
         */
        private BigDecimal cooperationRatio;

    }
}
