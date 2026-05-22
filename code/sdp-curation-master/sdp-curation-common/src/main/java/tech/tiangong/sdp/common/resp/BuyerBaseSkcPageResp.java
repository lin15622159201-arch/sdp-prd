package tech.tiangong.sdp.common.resp;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 买手SKC查询
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/13 14:39
 */
@Data
public class BuyerBaseSkcPageResp implements Serializable {
    @Serial
    private static final long serialVersionUID = -7729271592290135278L;
    /**
     * 买手款号表ID
     */
    private Long buyerPrototypeId;

    /**
     * spu
     */
    private String styleCode;

    /**
     * 买手款号skc
     */
    private String designCode;

    /**
     * 款式名称
     */
    private String styleName;

    /**
     * 款式颜色
     */
    private String color;

    /**
     * 图案元素
     */
    private String patternElement;

    /**
     * 供应商货号
     */
    private String supplierArticleNumber;

    /**
     * 成本价 单位:元
     */
    private BigDecimal costPrice;

    /**
     * 利润点(单位：原始值，例：11%的原始值为0.11)
     */
    private BigDecimal profitPoint;

    /**
     * 销售价 单位:元
     */
    private BigDecimal sellPrice;

    /**
     * 卖点
     */
    private String sellPoint;

    /**
     * 款式图片集合
     */
    private List<String> customerPictureList;

    /**
     * 款式品类(三级格式：0001-002-003)
     */
    private String category;

    /**
     * 款式品类(三级格式：女装-上装-连衣裙)
     */
    private String categoryName;

    /**
     * 是否胚衣
     * 0-否，1-是
     */
    private Integer seedCoat;

    /**
     * 是否样衣尺码完成 0否 1是
     */
    private Integer isSampleClothingSizesCloseFinish;

    /**
     * 尺码标准
     */
    private String sizeStandard;

    /**
     * 尺码标准code
     */
    private String sizeStandardCode;

    /**
     * 尺码标准值
     */
    private String sampleSize;

    /**
     * 织造方式code
     */
    private String weaveModeCode;

    /**
     * 织造方式
     */
    private String weaveMode;

    /**
     * 款式件数（套装数量）
     */
    private Integer suitAmount;

    /**
     * 版本号
     */
    private Integer versionNum;

    /**
     * 颜色编码
     */
    private String colorCode;

    /**
     * 区域id
     */
    private Integer regionId;

    /**
     * 区域名
     */
    private String regionName;

    /**
     * 品质等级
     */
    private String qualityLevel;

    /**
     * 品质等级编号
     */
    private String qualityLevelCode;

    /**
     * 款式风格(值来源于款式字典)
     */
    private String clothingStyle;

    /**
     * 是否拼接 0 否 1是
     */
    private Boolean isSplicing;

    /**
     * 是否取消 0 否 1是
     */
    private Boolean isCanceled;

    /**
     * 创建时间
     */
    private LocalDateTime createdTime;

    /**
     * 更新时间
     */
    private LocalDateTime upLocalDateTimedTime;
}
