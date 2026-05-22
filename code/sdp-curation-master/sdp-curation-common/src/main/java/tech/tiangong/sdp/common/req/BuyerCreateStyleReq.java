package tech.tiangong.sdp.common.req;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 买手创建SPU
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/2 15:30
 */
@Data
public class BuyerCreateStyleReq implements Serializable {
    @Serial
    private static final long serialVersionUID = -6178139230910753405L;
    /**
     * 款式SPU code
     */
    private String styleCode;

    /**
     * 款式品类(三级格式：0001-002-003)
     */
    private String category;

    /**
     * 款式品类(三级格式：女装-上装-连衣裙)
     */
    private String categoryName;

    /**
     * 款式风格(两级格式：回溯自然-小清新)
     */
    private String clothingStyle;

    /**
     * 品质等级
     */
    private String qualityLevel;

    /**
     * 品质等级Code
     */
    private String qualityLevelCode;

    /**
     * 织造方式code
     */
    private String weaveModeCode;

    /**
     * 织造方式
     */
    private String weaveMode;

    /**
     * 尺码标准
     */
    private String sizeStandard;

    /**
     * 尺码标准Code
     */
    private String sizeStandardCode;

    /**
     * 尺码标准值
     */
    private String sampleSize;

    /**
     * 适用季节 多选用英文逗号隔开
     */
    private String referSeason;

    /**
     * 廓形
     */
    private String outline;

    /**
     * 所属区域ID
     */
    private Integer regionId;

    /**
     * 所属区域名称
     */
    private String regionName;

    /**
     * 款式件数（套装数量）--v5.10
     */
    private Integer suitAmount;

    /**
     * 执行标准编码 --v5.10
     */
    private String performStandardCode;

    /**
     * 执行标准名称 --v5.10
     */
    private String performStandardName;

    /**
     * 安全类别编码 --v5.10
     */
    private String securityCategoryCode;

    /**
     * 安全类别名称 --v5.10
     */
    private String securityCategoryName;

    /**
     * 波段编码
     */
    private String waveBandCode;

    /**
     * 波段名称
     */
    private String waveBandName;

    /**
     * 供应商名称
     */
    private String supplierName;

    /**
     * 供应商ID
     */
    private Long supplierId;

    /**
     * 供应商联系人
     */
    private String supplierContacts;

    /**
     * 供应商联系电话 数据源头未校验
     */
    private String supplierPhone;

    /**
     * 供应商地址
     */
    private String supplierAddress;

    /**
     * 是否胚衣 (0-否, 1-是)
     */
    private Integer seedCoat;
}
