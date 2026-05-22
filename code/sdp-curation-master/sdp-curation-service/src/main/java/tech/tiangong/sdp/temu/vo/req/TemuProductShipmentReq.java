package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuReq;

import java.io.Serial;

/**
 * Temu商品-货品配送信息请求
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuProductShipmentReq implements TemuReq {

    @Serial
    private static final long serialVersionUID = -6777802582314555654L;
    /**
     * 运费模板 id
     */
    private String freightTemplateId;

    /**
     * 承诺发货时间(单位:s)
     */
    private Integer shipmentLimitSecond;
}
