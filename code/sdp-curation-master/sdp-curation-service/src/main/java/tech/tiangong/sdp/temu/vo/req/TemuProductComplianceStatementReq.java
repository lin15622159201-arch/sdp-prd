package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuReq;

import java.io.Serial;
import java.util.List;

/**
 * Temu商品-货品轮播图多语言信息请求
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuProductComplianceStatementReq implements TemuReq {


    @Serial
    private static final long serialVersionUID = -1050052361033187689L;
    /**
     * 协议版本号
     */
    private String protocolVersion;

    /**
     * 协议链接
     */
    private String protocolUrl;
}
