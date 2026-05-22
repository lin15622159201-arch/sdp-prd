package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

/**
 * skc请求plm req
 *
 * @author liuhongfu
 * @since 2021/8/16 10:07
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrototypePullReq implements Serializable {

    /**
     * 设计款号。 skc+年月日+4位流水号
     */
    @NotBlank(message = "设计款号不能为空")
    private String designCode;

    /**
     * 打版类型: 1-大货打版 2-正常打版 3-复色打版 ---项目V0.4
     */
    @NotNull(message = "打版类型不能为空")
    private Integer sampleType;

    /**
     * skc特别标签。可用于特定标识。建议传小写英文。如：来自sdp款的标识
     */
    private List<String> specialTag;

    /**
     * 款式风格  二级分类以"-"隔开，如：小清新-唐古装
     * 值来源于款式字典
     */
    @NotBlank(message = "款式风格不能为空")
    private String clothingStyle;

    /**
     * 复色款号
     */
    private String makeSameDesignCode;

    /**
     * 套版款：1, 衍生款：2
     */
    private Integer styleReferType;

    /**
     * 套版款/衍生款的设计款号
     */
    private String styleReferDesignCode;

    /**
     * 颜色
     */
    private String color;

    /**
     * 颜色编码 -v5.10
     */
    @NotBlank(message = "颜色编码不能为空")
    private String colorCode;

    /**
     * 客户图片
     */
    private List<String> customerPicture;

    /**
     * 设计图片
     */
    private List<String> designPicture;

    /**
     * 尺码标准
     */
    @NotBlank(message = "尺码标准不能为空")
    private String sizeStandard;

    /**
     * 尺码标准编号
     */
    @NotBlank(message = "尺码标准编号不能为空")
    private String sizeStandardCode;

    /**
     * 样衣尺码
     */
    @NotBlank(message = "样衣尺码不能为空")
    private String sampleSize;

    /**
     * 客户尺码标准
     */
    private String customerSizeStandard;

    /**
     * 客户尺码标准编号
     */
    private String customerSizeStandardCode;

    /**
     * 客户样衣尺码
     */
    private String customerSampleSize;

    /**
     * 样衣件数
     */
    private String sampleAmount;

    /**
     * 拆版备注
     */
    private String splitRemark;

    /**
     * 客户款号
     */
    private String customerStyleCode;

    /**
     * 以价开款(单位：元)
     */
    private Double paymentAtPrice;

    /**
     * 前置拆版状态 0=否 1=是
     */
    private Integer sdpPreDisassemblyState;


    /**
     * 备注记录
     */
    private String remark;

    /**
     * 客户尺寸信息json
     */
    private List<CustomerSize> customerSize;

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
     * 修改原因 （第一个拆版不需要传）
     */
    private String modifyReason;

    /**
     * 是否拼接 false-不拼接; true-拼接
     */
    private Boolean isSplicing;

    /**
     * 是否打版: false:不打版，true:打版
     */
    private Boolean isMakeClothing;

    /**
     * 制作方式：0-仅纸样 1-实物样 2-3D样
     * 若选择"仅纸样"或"3D样"，则 isMakeClothing传false，否则true
     */
    private Integer makeClothesType;

    /**
     * 参考款号
     */
    private String referenceDesignCode;

    /**
     * 卖点-SPU为平台款时,必填
     */
    private String sellPoint;


    /**
     * SKC-营销图片
     */
    private List<String> marketingPicture;


    /**
     * 客户尺寸信息DTO
     */
    @Data
    @SuperBuilder
    @Accessors(chain = true)
    @NoArgsConstructor
    public static class CustomerSize implements Serializable {

        /**
         * 部位编码
         */
        private String positionCode;

        /**
         * 部位名
         */
        private String positionName;

        /**
         * 尺寸
         */
        private String size;

        /**
         * 量法
         */
        private String measuringMethod;

    }


}
