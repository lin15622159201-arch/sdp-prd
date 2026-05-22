package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * 用户输入父级规格实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@Data
public class TemuGoodsTemplatePropertyValueParentResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = 715187780231178008L;
    /**
     * Attribute value IDs
     */
    private List<Long> vidList;
    /**
     * Related attribute value IDs. Currently, only one will be returned
     */
    private List<Long> parentVidList;
}
