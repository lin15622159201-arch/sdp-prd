package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuReq;
import tech.tiangong.sdp.temu.vo.dto.TemuProductOriginDTO;
import tech.tiangong.sdp.temu.vo.dto.TemuProductOriginCertFileDTO;

import java.io.Serial;
import java.util.List;

/**
 * Temu商品-货品仓库路由请求
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:04
 */
@Data
public class TemuProductWhExtAttrReq implements TemuReq {
    @Serial
    private static final long serialVersionUID = -1664383327054637088L;

    /**
     * 站外商品链接
     */
    private String outerGoodsUrl;

    /**
     * 货品产地
     */
    private TemuProductOriginDTO productOrigin;
    /**
     * 货品产地证明文件，全托管、非中国大陆产地时必填，目前仅支持1个文件
     */
    private List<TemuProductOriginCertFileDTO> productOriginCertFiles;

}
