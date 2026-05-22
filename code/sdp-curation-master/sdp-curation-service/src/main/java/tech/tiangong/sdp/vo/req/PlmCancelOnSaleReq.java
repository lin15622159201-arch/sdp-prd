package tech.tiangong.sdp.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * Plm动销
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/15 16:00
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PlmCancelOnSaleReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 7988048062448087712L;
    /**
     * SPU款号
     */
    private String styleCode;
    /**
     * 订单编码
     */
    private String saleOrderCode;

    /**
     * 取消时间

    private LocalDateTime cancelTime;
     */
}
