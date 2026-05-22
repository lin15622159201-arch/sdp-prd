package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuReq;
import tech.tiangong.sdp.temu.vo.dto.TemuSemiManagedSiteModeDTO;

import java.io.Serial;
import java.util.List;

/**
 * Temu商品-货品说明书文件多语言
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:04
 */
@Data
public class TemuProductGuideFileReq implements TemuReq {
    @Serial
    private static final long serialVersionUID = 6325145497524093382L;
    /**
     * pdf文件 id
     */
    private Long pdfMaterialId;
    /**
     * 文件名称
     */
    private String fileName;
    /**
     * 语言
     */
    private List<String> languages;
}
