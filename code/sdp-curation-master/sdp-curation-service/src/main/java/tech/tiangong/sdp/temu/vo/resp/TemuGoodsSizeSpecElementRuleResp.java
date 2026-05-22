package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * 尺寸规格元素规则实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@Data
public class TemuGoodsSizeSpecElementRuleResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = -8158920023273333969L;
    /**
     * Category ID
     */
    private Long catId;
    /**
     * Size classification ID
     */
    private Long classId;
    /**
     * Whether range intervals are supported
     */
    private Boolean allowRange;
    /**
     * Whether US size is required
     */
    private Boolean needUSSpec;
    /**
     * Size classification name
     */
    private String className;

    /**
     * Size acquisition method: 0 = Get size from attribute template specifications, 1 = Predefined size
     */
    private Integer sizeSpecType;
    /**
     * Current size specification element information
     */
    private Long localCodeId;
    /**
     * localCode Name
     */
    private String localCodeName;
    /**
     * Set size information
     */
    private List<TemuGoodsSetElementResp> setElementList;
    /**
     * Current size specification element information
     */
    private List<TemuGoodsSizeSpecElementResp> sizeSpecElementList;
}
