package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * SPU 信息
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@EqualsAndHashCode(callSuper = false)
@Data
public class TemuProductAddResp implements TemuResp {

    @Serial
    private static final long serialVersionUID = -4744501700638679781L;

    /**
     * Product ID
     */
    private Long productId;
    /**
     * SKU List
     */
    private List<TemuProductAddSkuResp> productSkuList;

    /**
     * SKC List
     */
    private List<TemuProductAddSkcResp> productSkcList;

}
