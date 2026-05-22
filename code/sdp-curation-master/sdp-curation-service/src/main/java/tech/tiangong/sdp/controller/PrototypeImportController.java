package tech.tiangong.sdp.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import team.aikero.blade.auth.UserContexts;
import team.aikero.blade.auth.annotation.PreCheckIgnore;
import team.aikero.blade.auth.annotation.PreCheckIgnore;
import team.aikero.blade.core.constant.UrlVersionConstant;
import team.aikero.blade.core.protocol.DataResponse;
import team.aikero.blade.user.entity.CurrentUser;
import tech.tiangong.sdp.service.PrototypeImportService;
import tech.tiangong.sdp.vo.dto.DesignExcelDTO;
import tech.tiangong.sdp.vo.dto.GenerateCountDTO;
import tech.tiangong.sdp.vo.resp.BaseSkuResp;

import java.util.List;

import static team.aikero.blade.core.protocol.DataResponseExtKt.ok;

/**
 * 款式管理-SKC-web
 *
 * @author cenlijin
 * @since 2021-08-09 14:43:19
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(UrlVersionConstant.WEB + UrlVersionConstant.VERSION_V1 + "/prototype-manage")
public class PrototypeImportController implements BasicController {

    private final PrototypeImportService prototypeImportService;


    /**
     * 批量导入款式信息
     *
     * @param file excel文件
     */
    @PreCheckIgnore
    @PostMapping("/batch/import")
    public DataResponse<List<String>> importExcel(@RequestParam("file") MultipartFile file) {
        return list(() -> UserContexts.withUser(getSystemUser(), () -> prototypeImportService.importExcel(file)));
    }

    /**
     * 批量导入款式信息 --修改操作
     *
     * @param file excel文件
     */
    @PreCheckIgnore
    @PostMapping("/batch/import/update")
    public DataResponse<List<String>> importUpdateExcel(@RequestParam("file") MultipartFile file) {
        return list(() -> UserContexts.withUser(getSystemUser(), () -> prototypeImportService.importUpdateExcel(file)));
    }


    /**
     * 批量导入款式信息
     */
    @PreCheckIgnore
    @PostMapping("/import/test")
    public DataResponse<Void> importExcelTest(@RequestBody List<DesignExcelDTO> importList) {
        // prototypeImportService.importData(importList);
        return ok();
    }

    /**
     * 款式管理-营销图刷数
     */
    @PreCheckIgnore
    @PostMapping("/refresh-import-skc-picture")
    public DataResponse<Void> refreshSkcPicture(@RequestBody List<String> styleCodes) {
        UserContexts.withUser(getSystemUser(), () -> prototypeImportService.refreshImportSkcPicture(styleCodes));
        return ok();
    }

    /**
     * 款式管理-SKU刷数
     */
    @PreCheckIgnore
    @PostMapping("/refresh-import-skc-sku")
    public DataResponse<Void> refreshSkcSku(@RequestBody List<String> skcCodes) {
        UserContexts.withUser(getSystemUser(), () -> prototypeImportService.refreshSkcSku(skcCodes));
        return ok();
    }

    /**
     * 款式管理-调用PLM生成SPU-SKC
     */
    @PreCheckIgnore
    @PostMapping("/generate-spu-skc")
    public DataResponse<Void> generateSpuSkc(@RequestBody GenerateCountDTO req) {
        UserContexts.withUser(getSystemUser(), () -> prototypeImportService.generateSpuSkc(req));
        return ok();
    }

    /**
     *  获取moken得sku---单个
     */
    @PostMapping("/get-moken-sku")
    public DataResponse<List<BaseSkuResp>> getMokenSkuList(@RequestBody List<String> skcCodes) {
        return ok(prototypeImportService.getMokenSkuList(skcCodes));
    }



    public CurrentUser getSystemUser() {
        return new CurrentUser(
                1L,
                "系统",
                "",
                1,
                false,
                0L
        );
    }

}