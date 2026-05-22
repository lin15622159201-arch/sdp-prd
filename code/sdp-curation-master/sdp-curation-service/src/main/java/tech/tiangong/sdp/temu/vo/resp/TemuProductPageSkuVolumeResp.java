package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;

/**
 * 商品列表查询-SKU体积
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/17 18:32
 */
@Data
public class TemuProductPageSkuVolumeResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = 5066284571041675808L;
    private Integer len;
    private Integer width;
    private Integer height;
}
