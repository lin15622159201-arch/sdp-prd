package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import team.aikero.blade.core.annotation.convert.ConvertOssPath;

import java.time.LocalDateTime;
import java.util.List;

/**
 * <p>
 *  打印版本信息
 * </p>
 *
 * @author: TG
 * @create:2021/12/14
 **/
@Data
public class PrototypePrintInfoVo {

    /**
     * 版单id
     */
    private Long prototypeId;

    /**
     * 版本号
     */
    private Integer versionNum;

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
    private String category;
    /**
     * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
     */
    private String categoryName;

    /**
     * 打版类型: 1-大货打版 2-正常打版 3-复色打版
     */
    private Integer sampleType;

    /**
     * 是否紧急(1:紧急,0:不紧急)
     */
    private Boolean isUrgent;

    /**
     * 是否补做 false 否 true是
     */
    private Boolean isMakeMore;

    /**
     * 是否取消 0 否 1是
     */
    private Boolean isCanceled;

    /**
     * 版单取消时间
     */
    private LocalDateTime cancelTime;

    /**
     * 版单取消原因
     */
    private String cancelReason;

    /**
     * 版单取消操作人姓名
     */
    private String cancelUserName;


    /**
     * 打版信息状态: 1.待拆版 2.已拆版
     */
    private Integer prototypeStatus;

    /**
     * 设计图片
     */
    @ConvertOssPath
    private List<String> designPicture;

    /**
     * 款生成时间
     */
    private LocalDateTime skcCreatedTime;

    /**
     * 颜色
     */
    private String color;

    /**
     * 样衣尺码
     */
    private String sampleSize;

    /**
     * 样衣件数
     */
    private String sampleAmount;

    // /**
    //  * 物料的名称。（用于打印页面罗列物料名。 数据如：["面料A","面料B","辅料A","辅料D"]）
    //  */
    // private List<String>  materialDemandNameList ;

    /**
     * 库位号
     */
    private String  storageLocation;

    /**
     * 设计师电话
     */
    private String designPhone;

    // /**
    //  * 标签信息json
    //  */
    // private List<PrototypeTag> tags;

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
     * 品质等级
     */
    private String qualityLevel;

    /**
     * 版单提交时间
     */
    private LocalDateTime submitTime;

    /**
     * 是否拼接 0 否 1是
     */
    private Boolean isSplicing;

    /**
     * 纸样师id
     */
    private Long patternMakerId;

    /**
     * 纸样师名称
     */
    private String patternMakerName;

    /**
     * 复色款号
     */
    private String makeSameDesignCode;

}
