package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;

/**
 * 商品列表查询-SKU规格
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/17 18:32
 */
@Data
public class TemuProductPageSkuSpecResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = 1000596397653679121L;
    private Integer specId;
    private String parentSpecName;
    private String specName;
    private Integer parentSpecId;
}
