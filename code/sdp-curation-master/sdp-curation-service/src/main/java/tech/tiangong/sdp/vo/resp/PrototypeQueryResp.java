package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;
import team.aikero.blade.core.annotation.convert.ConvertOssPath;
import tech.tiangong.sdp.enums.BomOrderStateEnum;
import tech.tiangong.sdp.enums.DesignStyleTypeEnum;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * 设计款管理-resp对象
 *
 * @author cenlijin
 * @since 2021-08-09 14:43:21
 */
@Data
public class PrototypeQueryResp  implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;


    /**
     * 开款类型
     */
    private DesignStyleTypeEnum styleType;

    /**
     * spuId(design_style_version表中的id)
     */
    private Long designStyleVersionId;

    /**
     * SPU-ID
     */
    private Long designStyleId;

    /**
     * 成衣spu编码
     */
    private String styleCode;

    /**
     * 款式标签编码
     */
    private String styleLabelCode;

    /**
     * 款式标签名称
     */
    private String styleLabelName;

    /**
     * 设计款skc_id
     */
    private Long prototypeId;
    /**
     * 设计款skc_code
     */
    private String designCode;

    /**
     * 平台编码
     */
    private String platformCode;

    /**
     * 平台名称
     */
    private String platformName;


    /**
     * 来源业务id
     */
    private Long sourceBusinessId;


    /**
     * 来源业务编码
     */
    private String sourceBusinessCode;

    /**
     * 打版信息状态: 1.待拆版 2.已拆版
     */
    private Integer prototypeStatus;

    /**
     * 尺码标准
     */
    private String sizeStandard;

    /**
     * 尺码标准编号
     */
    private String sizeStandardCode;

    /**
     * 样衣尺码
     */
    private String sampleSize;
    /**
     * 版本号
     */
    private Integer versionNum;

    /**
     * 设计图片{多张以英文逗号分隔}
     */
    @ConvertOssPath
    private String designPicture;
    /**
     * 是否补做 false 否 true是
     */
    private Boolean isMakeMore;
    /**
     * 是否紧急(1:紧急,0:不紧急)
     */
    private Boolean isUrgent;
    /**
     * 是否取消 0 否 1是
     */
    private Boolean isCanceled;

    /**
     * 是否动销: 0-否; 1-是;  (款式开发)
     */
    private Boolean isOnSale;

    /**
     * 版单取消原因
     */
    private String cancelReason;
    /**
     * 版单取消时间
     */
    private LocalDateTime cancelTime;
    /**
     * 取消版单操作人id
     */
    private Long cancelUserId;
    /**
     * 版单取消操作人姓名
     */
    private String cancelUserName;
    /**
     * 版单取消备注
     */
    private String cancelRemark;
    /**
     * 订单类型: 1-打版订单 2-设计订单 3-加工订单；1、2属于样衣，3属于生产(大货)
     */
    private Integer demandTaskType;
    /**
     * 款类型: 1-正常款; 2-复色款;
     */
    private Integer skcType;
    /**
     * 设计师id【设计师】
     */
    private Long designerId;
    /**
     * 设计师编号【设计师】
     */
    private String designerCode;
    /**
     * 设计师名称【设计师】
     */
    private String designerName;
    /**
     * 设计组
     */
    private String designerGroup;
    /**
     * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
     */
    private String categoryCode;
    /**
     * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
     */
    private String categoryName;
    /**
     * 设计款生成时间
     */
    private LocalDateTime skcCreatedTime;
    /**
     * SPU生成时间
     */
    private LocalDateTime spuCreatedTime;

    /**
     * 创建人Id
     */
    private Long creatorId;

    /**
     * 创建人名称
     */
    private String creatorName;
    /**
     * 创建时间
     */
    private LocalDateTime createdTime;

    /**
     * 生产核价状态: 0-未核价 1-核价中 2-已核价
     */
    private Integer checkPriceState;

    /**
     * 预估核价状态: 0-未核价 1-核价中 2-已核价
     */
    private Integer predictCheckPriceStatus;

    /**
     * 颜色
     */
    private String color;

    /**
     * 是否可复色 0：否  1：是
     */
    private Integer canMakeColor;

    /**
     * 供给方式-OPS
     */
    private String supplyModeName;

    /**
     * 供给方式编码
     */
    private String supplyModeCode;

    /**
     * 波段编码
     */
    private String waveBandCode;

    /**
     * 波段名称
     */
    private String waveBandName;

    /**
     * 国家站点code
     */
    private String countrySiteCode;

    /**
     * 国家站点name
     */
    private String countrySiteName;

    /**
     * 店铺id
     */
    private Long storeId;

    /**
     * 店铺名称
     */
    private String storeName;


    /**
     * 买手id
     */
    private Long buyerId;

    /**
     * 买手名称
     */
    private String buyerName;

    /**
     * 场景名称(ops: JV_scene)
     */
    private String sceneName;

    /**
     * 场景编码
     */
    private String sceneCode;

    /**
     * 修图任务ID
     */
    private Long imageUpdateTaskId;

    /**
     * 修图任务编号
     */
    private String imageUpdateTaskCode;


    /**
     * 任务状态：0-待处理；10-待审核；20-待返修；30-已完成；50-已取消
     */
    private Integer imageUpdateStatus;


    /**
     * 上架状态: 0-待推送; 1-待上架;2-已上架；3-下架；4-上架失败
     */
    private Integer listingStatus;

    /**
     * 制作方式： 1-实物样 2-3D样
     */
    private Integer makeClothesType;

    /**
     * 前置拆版状态 0=否 1=是
     */
    private Integer preDisassemblyState;


    /**
     * 测价通过状态 0=否 1=是
     */
    private Integer pricePassedState;

    /**
     * 测价通过时间
     */
    private LocalDateTime pricePassedTime;


    /**
     * 拆版是否完成 0=否 1=是
     */
    private Integer disassemblyFinished;

    /**
     * 拆版完成时间
     */
    private LocalDateTime disassemblyFinishedTime;


    /**
     * 上架失败原因
     */
    private String listingFailReason;


    /**
     * 任务状态：0-待推送，1-已推送；2-推送失败,3-已取消
     */
    private Integer pushPlmStatus;


    /**
     * 推送PLM失败信息
     */
    private String pushPlmResultMessage;

    /**
     * 货盘类型名称
     */
    private String palletTypeName;

    /**
     * 最新BOM是否已经核价（1-已经核价，0-未核价）
     */
    private Integer isLastBomCheckPrice;

    /**
     * SKC-图片材料信息
     */
    private List<PrototypeMaterialInfo> materialInfo;



    /**
     * SKC-图片材料信息
     */
    @Data
    @SuperBuilder
    @Accessors(chain = true)
    @NoArgsConstructor
    public static class PrototypeMaterialInfo implements Serializable {
        @Serial
        private static final long serialVersionUID = -3572155942378577417L;

        /**
         * spu主键Id
         */
        private Long designStyleId;

        /**
         * SPU编码
         */
        private String styleCode;

        /**
         * SKC-ID
         */
        private Long prototypeId;


        /**
         * SKC编码
         */
        private String designCode;


        /**
         * 素材url
         */
        private String materialUrl;


        /**
         * 材料类型: 0-图片; 1-视频
         */
        private Integer materialType;

    }


    @Data
    @Accessors(chain = true)
    public static class DevelopBomInfo implements Serializable {
        @Serial
        private static final long serialVersionUID = 1L;

        /**
         * bomId  最新版本的bom单id(可以根据设计款查询最新版本的bom单,避免数据维护)
         */
        private Long bomId;

        /**
         * bom表单编号
         */
        private String bomCode;

        /**
         * bom版本号
         */
        private Integer bomVersionNum;

        /**
         * bom订单状态 WAIT_SUBMIT:待提交 SUBMITTED:已提交 CALCULATED:已核算 CLOSED:已关闭
         */
        private BomOrderStateEnum bomOrderState;

        /**
         * 裁前裁后工艺Map:
         * key: 数值; (工艺要求:  100:裁版前工艺 110:裁版后工艺)
         * value: 数组; (String[], ["染色","熨烫"]
         */
        private Map<Integer, List<String>> categoryMap;

        /**
         * 工艺图片集合  v1.0.4-p3
         */
        private List<String> craftPictureList;

    }

}