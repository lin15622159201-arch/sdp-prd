package tech.tiangong.sdp.temu.vo.dto;

import tech.tiangong.sdp.temu.vo.resp.TemuProductPageDataResp;
import tech.tiangong.sdp.temu.vo.resp.TemuProductStockResultResp;
import tech.tiangong.sdp.temu.vo.resp.TemuProductSupplierPriceResultResp;

/**
 * 同步Temu商品DTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/24 14:20
 */
public record TemuSyncProductDTO(TemuProductPageDataResp product,
                                 TemuProductStockResultResp stock,
                                 TemuProductSupplierPriceResultResp price
) {
}
