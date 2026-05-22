package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;
import org.hibernate.validator.constraints.Length;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 编辑版单Req
 *
 * @author while
 */
@Data
public class PrototypeOperateReq implements Serializable {

    private static final long serialVersionUID = 8166149673055080731L;

    /**
     * 主键id
     */
    @NotNull(message = "SKC主键ID不能为空")
    private Long prototypeId;

    /**
     * 设计款号。 skc+年月日+4位流水号
     */
    private String designCode;

    /**
     * 最新版本号
     */
    @NotNull(message = "最新版本号不能为空")
    private Integer latestVersionNum;

    /**
     * 复色款号
     */
    private String makeSameDesignCode;

    /**
     * 颜色名称
     */
    @Length(max = 80,message = "颜色字数不能超过80个字")
    private String color;

    /**
     * 颜色集合
     */
    @NotEmpty(message = "颜色不能为空")
    @Size(max = 6, message = "最多6种颜色")
    private List<ColorInfoReq> colorInfoList;

    /**
     * 设计图片
     */
    private List<String> designPicture;

    /**
     * 尺码标准
     */
    @NotBlank(message = "尺码标准不能为空")
    @Length(max = 30,message = "尺码标准最多填30个字")
    private String sizeStandard;

    /**
     * 尺码标准编号
     */
    @NotBlank(message = "尺码标准编号不能为空")
    @Length(max = 64,message = "尺码标准编号最多填30个字")
    private String sizeStandardCode;

    /**
     * 样衣尺码
     */
    @Length(max = 30,message = "样衣尺码最多填30个字")
    private String sampleSize;

    /**
     * 拆版备注
     */
    @Length(max = 1000,message = "拆版备注1000个字以内")
    private String splitRemark;


    /**
     * 裁剪备注
     */
    @Length(max = 200, message = "裁剪备注最多填200个字")
    private String cuttingRemark;

    /**
     * 车缝工艺备注
     */
    @Length(max = 200, message = "车缝工艺备注最多填200个字")
    private String sewingRemark;

    /**
     * 版型备注
     */
    @Length(max = 200, message = "版型备注最多填200个字")
    private String typeRemark;

    /**
     * 是否拼接 false-不拼接; true-拼接
     */
    private Boolean isSplicing;


    /**
     * 制作方式： 1-实物样 2-3D样
     */
    private Integer makeClothesType;

    /**
     * 参考款号
     */
    private String referenceDesignCode;

    /**
     * 前置拆版状态 0=否 1=是
     */
    private Integer preDisassemblyState;


    /**
     * SKC-营销图信息
     */
    private List<PrototypeMaterialInfo> materialInfo;

    /**
     * SPU图片材料信息
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
         * SPU主键ID
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

    /**
     * 颜色信息
     */
    @Data
    public static class ColorInfoReq implements Serializable {
        @Serial
        private static final long serialVersionUID = 602903074676803845L;

        /**
         * 颜色名称
         */
        @NotBlank(message = "颜色名称不能为空")
        private String color;

        /**
         * 颜色英文名
         */
        @NotBlank(message = "颜色英文名不能为空")
        private String colorEnglishName;

        /**
         * 颜色编码
         */
        @NotBlank(message = "颜色编码不能为空")
        private String colorCode;

        /**
         * 颜色编码缩写
         */
        @NotBlank(message = "颜色编码缩写不能为空")
        private String colorAbbrCode;

        /**
         * 色号
         */
        @NotBlank(message = "色号不能为空")
        private String colorNumber;
    }

}