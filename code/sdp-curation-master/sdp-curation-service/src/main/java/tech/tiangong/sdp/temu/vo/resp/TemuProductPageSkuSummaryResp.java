package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * 商品列表查询-SKU汇总信息
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/17 18:32
 */
@Data
public class TemuProductPageSkuSummaryResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = 3522664695261090802L;
    private Long productSkuId;
    private String extCode;
    private TemuProductPageSkuWhExtAttrResp productSkuWhExtAttr;
    private Integer virtualStock;
    private List<TemuProductPageSkuSpecResp> productSkuSpecList;
    private TemuProductPageSkuSaleExtAttrResp productSkuSaleExtAttr;
}
