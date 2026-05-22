package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * Temu-商品搜索
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/31 18:23
 */
@Data
public class TemuSearchProductResp implements TemuResp {

    @Serial
    private static final long serialVersionUID = -1113129650327608893L;
    /**
     * 货品 Id
     */
    private Long productId;
    /**
     * SKC
     */
    private List<TemuSearchSkcResp> skcList;
}
