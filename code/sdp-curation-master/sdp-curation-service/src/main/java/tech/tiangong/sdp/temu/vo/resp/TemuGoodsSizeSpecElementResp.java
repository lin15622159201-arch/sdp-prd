package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;

/**
 * 尺寸规格元素实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@Data
public class TemuGoodsSizeSpecElementResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = 2008730888864508111L;
    /**
     * Element ID
     */
    private Long elementId;
    /**
     * Element measurement description
     */
    private String description;
    /**
     * Whether the element is required
     */
    private Boolean necessary;
    /**
     * Element type. 1 = Product element, 2 = Body element
     */
    private String type;
    /**
     * Translated value of element name
     */
    private String value;
    /**
     * Element name
     */
    private String elementName;
}
