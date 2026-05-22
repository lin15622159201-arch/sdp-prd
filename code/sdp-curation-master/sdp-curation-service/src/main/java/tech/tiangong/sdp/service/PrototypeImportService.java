package tech.tiangong.sdp.service;

import org.springframework.web.multipart.MultipartFile;
import tech.tiangong.sdp.vo.dto.DesignExcelDTO;
import tech.tiangong.sdp.vo.dto.GenerateCountDTO;
import tech.tiangong.sdp.vo.resp.BaseSkuResp;

import java.util.List;

/**
 * 设计款管理-服务接口
 *
 * @author cenlijin
 * @since 2021-08-09 14:43:17
 */
public interface PrototypeImportService {

    List<String>  importExcel(MultipartFile file);

    void importData(List<DesignExcelDTO> importList);

    void refreshImportSkcPicture(List<String> styleCodes);

    void refreshSkcSku(List<String> skcCodes);

    List<String> importUpdateExcel(MultipartFile file);

    void importDataUpdate(List<DesignExcelDTO> importList);

    void generateSpuSkc(GenerateCountDTO req);

    List<BaseSkuResp> getMokenSkuList(List<String> skcCodes);
}