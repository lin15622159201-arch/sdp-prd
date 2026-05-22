package tech.tiangong.sdp.temu.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tech.tiangong.sdp.temu.vo.TemuCommonReq;

import java.io.Serial;

/**
 * Temu商品品类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 15:19
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TemuGoodsCatReq extends TemuCommonReq {
    @Serial
    private static final long serialVersionUID = 5839173810472728312L;
    /**
     * Parent Category ID: if not provided, all primary categories will be queried.
     */
    private Long parentCatId ;
    private String language ;
}
