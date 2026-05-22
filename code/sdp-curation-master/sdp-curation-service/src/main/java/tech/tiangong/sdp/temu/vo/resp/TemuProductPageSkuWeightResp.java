package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * 商品列表查询-SKU重量
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/17 18:32
 */
@Data
public class TemuProductPageSkuWeightResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = -5298055888125582200L;
    private Integer value;
}
