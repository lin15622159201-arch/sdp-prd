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
 * spu请求plm req
 *
 * @author liuhongfu
 * @since 2021/8/16 10:07
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DesignStylePullReq implements Serializable {

    /**
     * SPU款号
     */
    @NotBlank(message = "SPU款号不能为空")
    private String styleCode;

    /**
     * 款来源: 110-CRM改款需求; 120-设计改款需求; 130-自建款; 140-买手款;
     */
    @NotNull(message = "款来源不能为空")
    private Integer sourceType;

    /**
     * 款类型: 1-OEM(打版订单); 2-ODM(设计订单)，6-FOB
     */
    @NotNull(message = "款类型不能为空")
    private Integer styleType;

    /**
     * 区域id
     */
    @NotNull(message = "区域ID不能为空")
    private Long regionId;

    /**
     * 区域名
     */
    @NotBlank(message = "区域名不能为空")
    private String regionName;

    /**
     * 客户id (款来源为130且款类型为ODM时, 非必填)
     */
    private Long purchaserId;

    /**
     * 客户编号 (款来源为130且款类型为ODM时, 非必填)
     */
    private String purchaserCode;

    /**
     * 客户名称 (款来源为130且款类型为ODM时, 非必填)
     */
    private String purchaserName;

    /**
     * 客户联系人id (款来源为130且款类型为ODM时, 非必填)
     */
    private Long purchaserContactId;

    /**
     * 客户联系人姓名 (款来源为130且款类型为ODM时, 非必填)
     */
    private String purchaserContactName;

    /**
     * 客户联系人方式 (款来源为130且款类型为ODM时, 非必填)
     */
    private String purchaserContactMobile;

    /**
     * bdId【销售BD】
     */
    private Long bdId;

    /**
     * bd编号【销售BD】
     */
    private String bdCode;

    /**
     * bd名称【销售BD】
     */
    private String bdName;

    /**
     * 品牌id (款来源为130且款类型为ODM时, 非必填)
     */
    private Long brandId;

    /**
     * 品牌名称 (款来源为130且款类型为ODM时, 非必填)
     */
    private String brandName;

    /**
     * 销售渠道集合 (款来源为130且款类型为ODM时, 非必填)
     */
    private List<CodeNamePair> saleChannelList;

    /**
     * 合作模式集合 (款来源为130且款类型为ODM时, 非必填)
     */
    private List<CodeNamePair> cooperationModeList;

    /**
     * 合同类型（1--自营，2--平台） (款来源为130且款类型为ODM时, 非必填)
     */
    private Integer contractType;

    /**
     * 客户图片集合,最少1张最多9张
     */
    private List<String> customerPictureList;

    /**
     * 款式品类编码(款式品类-商品类型-商品末级分类)(code1-code2-code3)
     */
    @NotBlank(message = "款式品类编码不能为空")
    private String category;

    /**
     * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
     */
    @NotBlank(message = "款式品类名不能为空")
    private String categoryName;

    /**
     * 品质等级名称
     */
    @NotBlank(message = "品质等级名称不能为空")
    private String qualityLevel;

    /**
     * 品质等级编号
     */
    @NotBlank(message = "品质等级编号不能为空")
    private String qualityLevelCode;

    /**
     * 季节集合
     */
    @NotNull(message = "季节集合不能为空")
    private List<CodeNamePair> styleSeasonList;

    /**
     * 廓形编码
     */
    @NotBlank(message = "廓形编码不能为空")
    private String silhouetteCode;

    /**
     * 廓形名称
     */
    @NotBlank(message = "廓形名称不能为空")
    private String silhouetteName;

    /**
     * 织造方式code
     */
    @NotBlank(message = "织造方式编码不能为空")
    private String weaveModeCode;

    /**
     * 织造方式名称
     */
    @NotBlank(message = "织造方式名称不能为空")
    private String weaveMode;

    /**
     * 参考链接
     */
    private String referLink;

    /**
     * 尺码标准code (如:chinese_size_code)
     */
    @NotBlank(message = "尺码标准编码不能为空")
    private String sizeStandardCode;

    /**
     * 尺码标准.（如：中国码）
     */
    @NotBlank(message = "尺码标准不能为空")
    private String sizeStandard;

    /**
     * 款式类别：0-平台 1-大客户
     */
    @NotNull(message = "款式类别不能为空")
    private Integer styleCategory;

    /**
     * 款式来源code --v5.5
     */
    private String styleSourceCode;

    /**
     * 款式来源name --v5.5
     */
    private String styleSourceName;

    /**
     * 款式件数（套装数量）
     */
    @NotNull(message = "款式件数不能为空")
    private Integer suitAmount;

    /**
     * 执行标准编码 --v5.8
     */
    @NotBlank(message = "执行标准编码不能为空")
    private String performStandardCode;

    /**
     * 执行标准名称 --v5.8
     */
    @NotBlank(message = "执行标准名称不能为空")
    private String performStandardName;

    /**
     * 安全类别编码 --v5.8
     */
    @NotBlank(message = "安全类别编码不能为空")
    private String securityCategoryCode;

    /**
     * 安全类别名称 --v5.8
     */
    @NotBlank(message = "安全类别名称不能为空")
    private String securityCategoryName;

    /**
     * 波段编码(平台款必填) --v5.11
     */
    private String waveBandCode;

    /**
     * 波段名称(平台款必填) --v5.11
     */
    private String waveBandName;

    /**
     * 图案元素编码 -- 230918
     */
    @NotBlank(message = "图案元素编码不能为空")
    private String patternElementCode;

    /**
     * 图案元素名称 -- 230918
     */
    @NotBlank(message = "图案元素名称不能为空")
    private String patternElementName;

    /**
     * 是否是胚衣 0-否 1-是 20241114
     */
    @NotNull(message = "是否是胚衣不能为空")
    private Integer seedCoat;

    /**
     * 设计师id【设计师】,PLM的
     */
    private Long designerId;

    /**
     * SDP设计师ID
     */
    private Long sdpDesignerId;

    /**
     * 项目类型编码
     */
    private String projectTypeCode;


    /**
     * 项目类型
     */
    private String projectType;


    /**
     * SDP设计师
     */
    private String sdpDesigner;


    /**
     * 编码名称对DTO
     */
    @Data
    @SuperBuilder
    @Accessors(chain = true)
    @NoArgsConstructor
    public static class CodeNamePair implements Serializable {
        /**
         * 编码
         */
        @NotBlank(message = "编码不能为空")
        private String code;

        /**
         * 值
         */
        @NotBlank(message = "名称不能为空")
        private String name;

    }


}
