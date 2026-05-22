package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * Temu-分页查询半托管核价单
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/31 18:23
 */
@Data
public class TemuProductPriceReviewPageResultResp implements TemuResp {

    @Serial
    private static final long serialVersionUID = -5865931375648787431L;
    /**
     * 总数
     */
    private Integer total;
    /**
     * 核价单
     */
    private List<TemuProductPriceReviewPageResp> reviewSamplePriceList;
}
