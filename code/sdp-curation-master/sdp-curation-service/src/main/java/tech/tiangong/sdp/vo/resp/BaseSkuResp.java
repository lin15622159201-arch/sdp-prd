package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * @author liuhongfu
 */
@Data
public class BaseSkuResp implements Serializable {

    @Serial
    private static final long serialVersionUID = 7004855187305100586L;


    private Long skuInfoId;

    /**
     * 条码编码
     */
    private String barcode;

    /**
     * spu
     */
    private String spu;


    /**
     * skc
     */
    private String skc;

    /**
     * 颜色
     */
    private String color;

    /**
     * 颜色编码
     */
    private String colorCode;

    /**
     * 尺码组名称
     */
    private String groupName;

    /**
     * 尺码名
     */
    private String sizeName;


    /**
     * 尺码组id
     */
    private Long sizeGroupId;

    /**
     * 特殊识别代码
     */
    private String idc;
    /**
     * 来源尺码组编号
     */
    private String sourceGroupCode;


    /**
     * 创建人id
     */
    protected Long creatorId;

    /**
     * 创建人名称
     */
    protected String creatorName;

    /**
     * 创建时间
     */
    protected LocalDateTime createdTime;

}
