package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.common.resp.BasicVO;
import tech.tiangong.sdp.enums.DevelopStyleRelaTypeEnum;
import tech.tiangong.sdp.enums.DevelopStyleTaskSourceEnum;
import tech.tiangong.sdp.enums.DevelopStyleTypeEnum;

import java.io.Serial;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 开款任务 - 分页
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 18:08
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class DevelopStyleTaskPageResp extends BasicVO {
    @Serial
    private static final long serialVersionUID = 2386940987489394798L;
    /**
     * 任务状态：0-待审核；10-待开款；20-已淘汰；30-已开款；50-失败；
     */
    private Integer taskStatus;
    /**
     * 开款类型
     */
    private DevelopStyleTypeEnum styleType;

    /**
     * 开款任务来源
     */
    private DevelopStyleTaskSourceEnum taskSource;

    /**
     * 供应商名称
     */
    private String supplierName;

    /**
     * 供应商款号
     */
    private String supplierStyleCode;

    /**
     * 商品链接
     */
    private String commodityLink;

    /**
     * 价格
     */
    private BigDecimal price;

    /**
     * 波段编码
     */
    private String wavebandCode;

    /**
     * 波段名称
     */
    private String wavebandName;

    /**
     * 款式品类编码
     */
    private String categoryCode;

    /**
     * 款式品类名
     */
    private String categoryName;

    /**
     * 款式标签编码
     */
    private String styleLabelCode;

    /**
     * 款式标签名称
     */
    private String styleLabelName;

    /**
     * 店铺id
     */
    private Long storeId;

    /**
     * 店铺名称
     */
    private String storeName;

    /**
     * 主图url
     */
    private String mainImgUrl;

    /**
     * 款号
     */
    private String spuCode;

    /**
     * 审款人
     */
    private String styleCheckerName;

    /**
     * 审款人ID
     */
    private Long styleCheckerId;

    /**
     * 审款时间
     */
    private LocalDateTime checkTime;

    /**
     * 审款结果：0-未审款；1-淘汰；2-通过
     */
    private Integer checkResult;

    /**
     * 平台编码
     */
    private String platformCode;

    /**
     * 平台名称
     */
    private String platformName;

    /**
     * 提交时间
     */
    private LocalDateTime submitTime;

    /**
     * 开款人id
     */
    private Long developerId;

    /**
     * 开款人名称
     */
    private String developerName;

    /**
     * 信息备注
     */
    private String message;

    /**
     * 关联类型
     */
    private DevelopStyleRelaTypeEnum relaType;

    /**
     * 关联ID
     */
    private Long relaId;

    /**
     * 关联编号
     */
    private String relaCode;

    /**
     * 印花编码
     */
    private String printingCode;

    /**
     * 印花名称
     */
    private String printingName;
    /**
     * 织造方式code
     */
    private String weaveModeCode;
    /**
     * 织造方式
     */
    private String weaveModeName;

    /**
     * 弹性编码
     */
    private String elasticCode;
    /**
     * 弹性名称
     */
    private String elasticName;
    /**
     * 识别状态(0-排队中；10-识别中；20-已中止；30-已完成；50-失败；60-超时失败；)
     */
    private Integer identifyStatus;

    /**
     * 季节编码
     */
    private String seasonCode;

    /**
     * 季节名称
     */
    private String seasonName;
    /**
     * 款式风格编码
     */
    private String clothingStyleName;

    /**
     * 款式风格名称
     */
    private String clothingStyleCode;
    /**
     * 颜色名称
     */
    private String color;
    /**
     * 颜色名称编码
     */
    private String colorCode;
    /**
     * 版型编码
     */
    private String patternCode;
    /**
     * 版型名称
     */
    private String patternName;
    /**
     * 项目类型编码
     */
    private String projectTypeCode;

    /**
     * 项目类型名称
     */
    private String projectTypeName;
    /**
     * 图片
     */
    private List<DevelopStylePictureResp> pictures;

}
