package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuReq;

import java.io.Serial;

/**
 * Temu商品-货品多语言信息请求
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuProductI18nReq implements TemuReq {

    @Serial
    private static final long serialVersionUID = 9158193501899164943L;
    /**
     * 语言编码
     */
    private String language;

    /**
     * 货品名称
     */
    private String productName;
}
