package tech.tiangong.sdp.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import team.aikero.blade.core.constant.UrlVersionConstant;
import team.aikero.blade.core.protocol.DataResponse;
import tech.tiangong.sdp.service.TemuService;
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
 * Temu - WEB
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/9 14:44
 */
@RestController
@RequestMapping(UrlVersionConstant.WEB + UrlVersionConstant.VERSION_V1 + "/temu/")
@RequiredArgsConstructor
public class TemuController implements BasicController {
    private final TemuService temuService;

    /**
     * 品类列表查询
     *
     * @return 品类列表
     */
    @GetMapping("category/list")
    public DataResponse<List<TemuCategoryResp>> listCategory() {
        return list(temuService::listCategory);
    }

    /**
     * 商品规格列表查询
     *
     * @return 商品规格列表
     */
    @GetMapping("product-spec/list")
    public DataResponse<List<TemuProductSpecResp>> listProductSpec() {
        return list(temuService::listProductSpec);
    }

    /**
     * 颜色列表查询
     *
     * @param templateId 模板 ID
     * @return 颜色列表
     */
    @GetMapping("color/{templateId}")
    public DataResponse<List<TemuColorResp>> listColor(@PathVariable final Long templateId) {
        return list(() -> temuService.listColor(templateId));
    }


    /**
     * 尺码列表查询
     *
     * @param templateId 模板 ID
     * @return 尺码列表
     */
    @GetMapping("size/{templateId}")
    public DataResponse<List<TemuSizeResp>> listSize(@PathVariable final Long templateId) {
        return list(() -> temuService.listSize(templateId));
    }

    /**
     * 部位列表查询
     *
     * @param templateId 模板 ID
     * @return 部位列表
     */
    @GetMapping("part/{templateId}")
    public DataResponse<List<TemuPartResp>> listPart(@PathVariable final Long templateId) {
        return list(() -> temuService.listPart(templateId));
    }

    /**
     * 查询所有部位
     *
     * @return 部位列表
     */
    @GetMapping("part-list")
    public DataResponse<List<TemuPartResp>> listPart() {
        return list(temuService::listPart);
    }

    /**
     * 模板列表查询
     *
     * @param templateId 模板 ID
     * @return 部位列表
     */
    @GetMapping("property/{templateId}")
    public DataResponse<List<TemuGoodsPropertyResp>> listProperty(@PathVariable final Long templateId) {
        return list(() -> temuService.listProperty(templateId));
    }

    /**
     * 运费模板列表查询
     *
     * @param req 参数
     * @return 运费模板列表
     */
    @PostMapping("logistics-template")
    public DataResponse<List<TemuFreightTemplateDTO>> listLogisticsTemplate(@RequestBody @Valid final LogisticsTemplateReq req) {
        return list(() -> temuService.listLogisticsTemplate(req));
    }

    /**
     * 仓库列表查询
     *
     * @param req 参数
     * @return 仓库列表
     */
    @PostMapping("warehouse")
    public DataResponse<List<TemuWarehouseDTO>> listWarehouse(@RequestBody @Valid final WarehouseReq req) {
        return list(() -> temuService.listWarehouse(req));
    }

    /**
     * 货品包装清单类型查询
     *
     * @param req 参数
     * @return 包装清单类型
     */
    @PostMapping("accessories")
    public DataResponse<List<TemuProductAccessoriesResp>> listAccessories(@RequestBody @Valid final AccessoriesReq req) {
        return list(() -> temuService.listAccessories(req));
    }
}
