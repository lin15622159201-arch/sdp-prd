package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * SPU表Vo
 *
 * @author while
 */
@Data
@SuperBuilder
@Accessors(chain = true)
@NoArgsConstructor
@ToString
public class DesignStyleVo implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * spuId主键
     */
    private Long designStyleId;

    /**
     * SPU编码: 2年+2月+2日+4流水+2版号流水
     */
    private String styleCode;

    /**
     * SPU版本号
     */
    private Integer versionNum;

    /**
     * SPU来源，用户新建:upload，开款任务：develop_style_task'
     * @see
     */
    private String taskSource;

    /**
     * 款式状态: 1-待提交; 2-已提交
     */
    private Integer styleStatus;


    /**
     * 开款任务ID
     */
    private Long developStyleTaskId;

    /**
     * 开款任务编码
     */
    private String developStyleTaskCode;

    /**
     * AIGC选款结果ID
     */
    private Long pickingResultId;

    /**
     * AIGC款式id
     */
    private Long pickingStyleId;

    /**
     * 修图任务ID
     */
    private Long imageUpdateTaskId;

    /**
     * 修图任务编号
     */
    private String imageUpdateTaskCode;


    /**
     * 修图任务: 0-未创建; 1-待处理;2-已完成
     */
    private Integer imageUpdateStatus;


    // ============================== 基本信息 ===============================

    /**
     * 款式品类编码,(款式品类-商品类型-商品末级分类)(code1-code2-code3)
     */
    private String categoryCode;

    /**
     * 款式品类名,款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
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
     * 尺码标准
     */
    private String sizeStandardName;

    /**
     * 尺码标准编号
     */
    private String sizeStandardCode;

    /**
     * 波段编码
     */
    private String waveBandCode;

    /**
     * 波段名称
     */
    private String waveBandName;

    /**
     * 款式等级
     */
    private String styleLevelName;

    /**
     * 款式等级编号
     */
    private String styleLevelCode;

    /**
     * 品质等级
     */
    private String qualityLevelName;

    /**
     * 品质等级编号
     */
    private String qualityLevelCode;

    /**
     * 织造方式code
     */
    private String weaveModeCode;

    /**
     * 织造方式
     */
    private String weaveModeName;

    /**
     * 款式风格编码
     */
    private String clothingStyleName;

    /**
     * 款式风格名称
     */
    private String clothingStyleCode;

    /**
     * 印花编码
     */
    private String printingCode;

    /**
     * 印花名称
     */
    private String printingName;

    /**
     * 季节编码
     */
    private String seasonCode;

    /**
     * 季节名称
     */
    private String seasonName;

    /**
     * 节日编码
     */
    private String galaCode;

    /**
     * 节日名称
     */
    private String galaName;

    /**
     * 版型编码
     */
    private String patternCode;

    /**
     * 版型名称
     */
    private String patternName;

    /**
     * 款式类型编码
     */
    private String designTypeCode;

    /**
     * 款式类型名称
     */
    private String designTypeName;


    /**
     * 弹性编码
     */
    private String elasticCode;

    /**
     * 弹性名称
     */
    private String elasticName;

    /**
     * 项目类型编码
     */
    private String projectTypeCode;
    /**
     * 项目类型名称
     */
    private String projectTypeName;

    /**
     * 商品链接
     */
    private String commodityLink;

    /**
     * 场景名称
     */
    private String sceneName;

    /**
     * 场景编码
     */
    private String sceneCode;

    /**
     * 视觉形式编码
     */
    private String visualFormCode;

    /**
     * 视觉形式名称
     */
    private String visualFormName;

    /**
     * sku类别编码
     */
    private String skuClassCode;

    /**
     * sku类别名称
     */
    private String skuClassName;

    /**
     * 套装件数
     */
    private Integer suitPiece;



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
     * 设计组code
     */
    private String designerGroupCode;

    /**
     * 设计组
     */
    private String designerGroup;

    /**
     * 最新提交时间
     */
    private LocalDateTime latestSubmitTime;


    /**
     * 创建时间
     */
    private LocalDateTime createdTime;

    /**
     * 创建人名称
     */
    private String creatorName;

    /**
     * 修改人名称
     */
    private String reviserName;


}
