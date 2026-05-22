package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;
import java.io.Serializable;
import java.util.List;


/**
 * SKC 上架表
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/11 10:27
 */
@Data
@SuperBuilder
@Accessors(chain = true)
@NoArgsConstructor
public class SkcOnShelvesVo implements Serializable {
    /**
     * 主键id
     */
    private Long skcId;

    /**
     * 款ID
     */
    private Long styleId;

    /**
     * SKC编码
     */
    private String skcCode;

    /**
     * 上架状态：1-上架；0-下架；
     */
    private Integer onShelvesStatus;

    /**
     * 是否拼接：1-拼接；
     */
    private Integer spliced;

    /**
     * 主图url
     */
    private String mainImgUrl;

    /**
     * 颜色名称
     */
    private String color;

    /**
     * 前置拆版状态 0=否 1=是
     */
    private Integer preDisassemblyState;


    /**
     * 尺码标准编号
     */
    private String sizeStandardCode;

    /**
     * 尺码标准
     */
    private String sizeStandardName;

    /**
     * 尺码
     */
    private String sizeName;

    /**
     * 尺码编码
     */
    private String sizeCode;

    /**
     * 附件
     */
    private String attachment;

    /**
     * 图片信息
     */
    private List<StyleSkcOnShelvesPictureVo> pictures;

    /**
     * SKU信息
     */
    private List<StyleSkcSkuVo> skuList;

}
