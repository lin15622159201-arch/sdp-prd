package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;

/**
 * 用户输入父级规格实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@Data
public class TemuGoodsUserInputParentSpecResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = -5236474467215158962L;
    /**
     * The unique identifier of the parent specification.
     */
    private Long parentSpecId;
    /**
     * The name of the parent specification.
     */
    private Integer feature;
    /**
     * Attribute characteristic. Currently determines whether to group, 0-general, 1-color, 2-size, 3-phone model
     */
    private String parentSpecName;
}
