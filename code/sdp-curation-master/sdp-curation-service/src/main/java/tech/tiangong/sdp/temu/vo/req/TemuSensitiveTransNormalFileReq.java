package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuReq;

import java.io.Serial;

/**
 * Temu商品-敏感品转普证明文件列表
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuSensitiveTransNormalFileReq implements TemuReq {

    @Serial
    private static final long serialVersionUID = -6777802582314555654L;
    /**
     * 文件名称
     */
    private String fileName;

    /**
     * 文件路径
     */
    private String fileUrl;

}
