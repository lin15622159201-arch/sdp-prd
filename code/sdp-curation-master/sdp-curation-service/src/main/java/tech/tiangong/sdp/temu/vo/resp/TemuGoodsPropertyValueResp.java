package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * 属性值实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@Data
public class TemuGoodsPropertyValueResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = 7091964511139357217L;
    /**
     * Basic attribute value ID
     */
    private Long vid;
    /**
     * Specification ID
     */
    private Long specId;

    /**
     * Brand ID (returned for brand attributes)
     */
    private Long brandId;
    /**
     * Attribute value
     */
    private String value;
    /**
     * Extended information
     */
    private String extendInfo;

    /**
     * Additional Info
     */
    private TemuGoodsAdditionalInfoResp additionalInfo;
    /**
     * Group information
     */
    private TemuGoodsGroupResp group;
    /**
     * Subgroup information
     */
    private TemuGoodsGroupResp subGroup;
    /**
     * Corresponding parent attribute value IDs
     */
    private List<Long> parentVidList;
}
