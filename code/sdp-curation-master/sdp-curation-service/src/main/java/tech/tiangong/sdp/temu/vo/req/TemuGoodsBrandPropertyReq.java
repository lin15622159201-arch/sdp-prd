package tech.tiangong.sdp.temu.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tech.tiangong.sdp.temu.vo.TemuCommonReq;

import java.io.Serial;

/**
 * Temu商品品牌
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 15:19
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TemuGoodsBrandPropertyReq extends TemuCommonReq {
    @Serial
    private static final long serialVersionUID = -6449155349135173381L;
    /**
     * Brand attribute value
     */
    private String value;
    /**
     * Brand refer attribute ID
     */
    private Long refPid;
}
