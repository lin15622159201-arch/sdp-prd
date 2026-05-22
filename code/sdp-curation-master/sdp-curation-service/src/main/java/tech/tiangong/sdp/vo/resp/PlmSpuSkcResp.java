package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * @author liuhongfu
 * PLM返回skc
 */
@Data
public class PlmSpuSkcResp implements Serializable {

    private List<PlmPrototype> prototypes;

    /**
     * SPU-SKC 请求信息
     */
    @Data
    @SuperBuilder
    @Accessors(chain = true)
    @NoArgsConstructor
    public static class PlmPrototype implements Serializable {

        @Serial
        private static final long serialVersionUID = 7004855187305100586L;


        /**
         * spuId(design_style_version表中的id)
         */
        private Long designStyleVersionId;

        /**
         * 设计款号id
         */
        private Long prototypeId;

        /**
         * 设计款号。 skc+年月日+4位流水号
         */
        private String designCode;

        /**
         * 设计款（skc）版本号
         */
        private Integer prototypeVersionNum;

        /**
         * 成衣SPU(款式SPU)。SPU+年份+6位流水号
         */
        private String styleCode;

        /**
         * 设计款-颜色
         */
        private String color;

        /**
         * 颜色编码 -v5.10
         */
        private String colorCode;

        /**
         * 打版类型: 1-大货打版 2-正常打版 3-复色打版
         */
        private Integer sampleType;

        /**
         * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
         */
        private String category;

        /**
         * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
         */
        private String categoryName;

        /**
         * 区域id
         */
        private Long regionId;

        /**
         * 区域名
         */
        private String regionName;

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
         * 客户id
         */
        private Long purchaserId;

        /**
         * 客户编号
         */
        private String purchaserCode;

        /**
         * 客户名称
         */
        private String purchaserName;

        /**
         * 品质等级
         */
        private String qualityLevel;

        /**
         * 品质等级编号
         */
        private String qualityLevelCode;

        /**
         * 客户图片
         */
        private List<String> customerPicture;

        /**
         * 设计图片
         */
        private List<String> designPicture;

        /**
         * 客户款号
         */
        private String customerStyleCode;

        /**
         * 尺码标准code (如:chinese_size_code)
         */
        private String sizeStandardCode;

        /**
         * 尺码标准.（如：中国码）
         */
        private String sizeStandard;

        /**
         * 样衣尺码 (如：165/88A)
         */
        private String sampleSize;

        /**
         * 款式风格 值来源于款式字典
         */
        private String clothingStyle;

        /**
         * 是否拼接 0 否 1是
         */
        private Boolean isSplicing;

        /**
         * 是否补做 false 否 true是
         */
        private Boolean isMakeMore;

        /**
         * 版本完成 0 否 1是
         */
        private Boolean isDoneVersion;

        /**
         * 核价状态: 0-未核价 1-核价中 2-已核价
         */
        private Integer checkPriceState;

        /**
         * 是否打版。0:不打版，1:打版
         */
        private Boolean isMakeClothing;

        /**
         * 是否取消 0 否 1是
         */
        private Boolean isCanceled;

        /**
         * 渠道设计款号
         */
        private String extDesignCode;

    }
}
