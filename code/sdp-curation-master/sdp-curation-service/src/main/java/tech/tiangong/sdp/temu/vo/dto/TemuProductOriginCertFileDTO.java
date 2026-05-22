package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

/**
 * TemuProductOuterPackageImageDTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuProductOriginCertFileDTO {

    /**
     * 文件名称，需要带文件扩展，eg: test.pdf
     */
    private String fileName;

    /**
     * 文件url，从bg.goods.file.upload上传，支持文件格式：['pdf', 'png', 'jpeg', 'jpg']，文件最大3MB
     */
    private String fileUrl;

}
