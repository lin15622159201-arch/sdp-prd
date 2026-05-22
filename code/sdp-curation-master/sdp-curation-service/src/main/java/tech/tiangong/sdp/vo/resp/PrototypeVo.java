package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 版单-主表Vo
 *
 * @author husky
 * @since 2021-08-09 14:43:21
 */
@Data
@SuperBuilder
@Accessors(chain = true)
@NoArgsConstructor
public class PrototypeVo implements Serializable {
    private static final long serialVersionUID = 1L;
    /**
     * 版单id
     */
    private Long prototypeId;

    /**
     * 版本号
     */
    private Integer versionNum;

    /**
     * 最新版本号
     */
    private Integer latestVersionNum;

    /**
     * spuId(design_style_version表中的id)
     */
    private Long designStyleVersionId;

    /**
     * 成衣SPU(款式SPU)
     */
    private String styleCode;

    /**
     * 设计款号
     */
    private String designCode;

    /**
     * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
     */
    private String categoryCode;

    /**
     * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
     */
    private String categoryName;

    /**
     * 复色款号
     */
    private String makeSameDesignCode;

    /**
     * 颜色
     */
    private String color;

    /**
     * 款类型: 1--正常款 2-复色款
     */
    private Integer skcType;

    /**
     * 是否补做 false 否 true是
     */
    private Boolean isMakeMore;

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
     * 设计组code
     */
    private String designerGroupCode;

    /**
     * 版本完成 0 否 1是
     */
    private Boolean isDoneVersion;

    /**
     * 是否紧急(1:紧急,0:不紧急)
     */
    private Boolean isUrgent;

    /**
     * 打版信息状态: 1.待拆版 2.已拆版
     */
    private Integer prototypeStatus;

    /**
     * 是否取消 0 否 1是
     */
    private Boolean isCanceled;

    /**
     * SPU生成时间
     */
    private LocalDateTime spuCreatedTime;
    /**
     * 款生成时间
     */
    private LocalDateTime skcCreatedTime;

    /**
     * 设计图片
     */
    private List<String> designPicture;

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
     * 拆版备注
     */
    private String splitRemark;

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
     * 裁剪备注
     */
    private String cuttingRemark;

    /**
     * 车缝工艺备注
     */
    private String sewingRemark;

    /**
     * 版型备注
     */
    private String typeRemark;

    /**
     * 版单提交时间
     */
    private LocalDateTime submitTime;

    /**
     * 是否动销: 0-否; 1-是;  (款式开发)
     */
    private Boolean isOnSale;

    /**
     * 是否拼接 0 否 1是
     */
    private Boolean isSplicing;

    /**
     * 制作方式： 1-实物样 2-3D样
     */
    private Integer makeClothesType;

    /**
     * 前置拆版状态 0=否 1=是
     */
    private Integer preDisassemblyState;

    /**
     * 是否打版: 0:不打版，1:打版
     */
    private Boolean isMakeClothing;

    /**
     * 核价状态: 0-未核价 1-核价中 2-已核价
     */
    private Integer checkPriceState;

    /**
     * 是否打版: false-未打版; true-已打版;
     */
    private Boolean isMakeClothes;

    /**
     * 参考款号
     */
    private String referenceDesignCode;

    /**
     * SKC来源: 10-PLM; 20-淘工厂; 30-logo印; 40-灵感设计需求; 5-数码印花款;
     */
    private Integer skcSourceType;

    /**
     * 业务渠道 zj:1 jv:2 jv-new:3
     */
    private Integer bizChannel;

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
         * 主键
         */
        private Long prototypeMaterialId;

        /**
         * spu主键Id
         */
        private Long designStyleId;

        /**
         * 成衣SPU(款式SPU)
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

}