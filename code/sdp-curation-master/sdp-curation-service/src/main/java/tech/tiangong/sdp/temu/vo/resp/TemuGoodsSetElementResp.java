package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * 集合元素实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@Data
public class TemuGoodsSetElementResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = 1587968131063353526L;
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
     * Current size specification element information
     */
    private Long localCodeId;
    /**
     * localCode Name
     */
    private String localCodeName;
    /**
     * Current size specification element information (for sets)
     */
    private List<TemuGoodsSizeSpecElementResp> sizeSpecElementList;
}
