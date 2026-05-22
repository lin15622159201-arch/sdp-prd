package tech.tiangong.sdp.temu.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tech.tiangong.sdp.temu.vo.TemuCommonReq;

import java.io.Serial;

/**
 * Temu商品尺码元素
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 15:19
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TemuGoodsSizeElementReq extends TemuCommonReq {

    @Serial
    private static final long serialVersionUID = 2104764860700795898L;
    /**
     * Leaf category id
     */
    private Long catId;

    private String language;

}
