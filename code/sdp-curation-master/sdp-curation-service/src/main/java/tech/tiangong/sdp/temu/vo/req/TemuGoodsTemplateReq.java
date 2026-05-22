package tech.tiangong.sdp.temu.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tech.tiangong.sdp.temu.vo.TemuCommonReq;

import java.io.Serial;
import java.util.List;

/**
 * Temu商品模板
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 15:19
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TemuGoodsTemplateReq extends TemuCommonReq {
    @Serial
    private static final long serialVersionUID = 7358281427673624745L;
    /**
     * Leaf category id
     */
    private Long catId;
    /**
     * When the attributes of a product are modified, the "goodsId" should be provided to query the corresponding attribute template; otherwise, there might be inconsistencies between the attribute template and the current "goodsId".
     */
    private Long goodsId;
    private String language;
    /**
     * Brand attribute List
     */
    private List<TemuGoodsBrandPropertyReq> goodsBrandProperties;
}
