package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuReq;

import java.io.Serial;

/**
 * Temu商品-货品关务信息
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuProductCustomReq implements TemuReq {

    @Serial
    private static final long serialVersionUID = -6777802582314555654L;

    /**
     * 商品标签
     */
    private String goodsLabelName;

    /**
     * 是否选择的推荐标签
     */
    private Boolean isRecommendedTag;

}
