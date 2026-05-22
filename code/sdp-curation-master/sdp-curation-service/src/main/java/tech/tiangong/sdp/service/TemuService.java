package tech.tiangong.sdp.service;

import tech.tiangong.sdp.temu.vo.dto.TemuFreightTemplateDTO;
import tech.tiangong.sdp.temu.vo.dto.TemuWarehouseDTO;
import tech.tiangong.sdp.temu.vo.resp.TemuGoodsPropertyResp;
import tech.tiangong.sdp.temu.vo.resp.TemuProductAccessoriesResp;
import tech.tiangong.sdp.vo.req.AccessoriesReq;
import tech.tiangong.sdp.vo.req.LogisticsTemplateReq;
import tech.tiangong.sdp.vo.req.WarehouseReq;
import tech.tiangong.sdp.vo.resp.*;

import java.util.List;

/**
 * Temu
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/9 14:46
 */
public interface TemuService extends BasicService{
    List<TemuCategoryResp> listCategory();
    List<TemuProductSpecResp> listProductSpec();
    List<TemuColorResp> listColor(final Long templateId);
    List<TemuSizeResp> listSize(final Long templateId);
    List<TemuPartResp> listPart(final Long templateId);
    List<TemuPartResp> listPart();
    List<TemuGoodsPropertyResp> listProperty(final Long templateId);
    List<TemuFreightTemplateDTO> listLogisticsTemplate(final LogisticsTemplateReq req);
    List<TemuWarehouseDTO> listWarehouse(final WarehouseReq req);
    List<TemuProductAccessoriesResp> listAccessories(final AccessoriesReq req);
}
