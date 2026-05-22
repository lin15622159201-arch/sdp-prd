package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.temu.vo.TemuCommonReq;

import java.io.Serial;
import java.util.List;

/**
 * Temu商品-分页查询半托管核价单
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class TemuProductPriceReviewPageReq extends TemuCommonReq {
    @Serial
    private static final long serialVersionUID = -3548494248514595454L;
    /**
     * 页码
     */
    private Integer pageNo;
    /**
     * 分页大小
     */
    private Integer pageSize;
    /**
     * id范围查询最大值
     */
    private Integer idLt;
    /**
     * id范围查询最小值
     */
    private Integer idGt;
    /**
     * 核价单状态列表. 可选值含义说明:[0:待核价;1:待供应商确认;2:核价通过;3:核价驳回;4:废弃;5:价格同步中;]
     */
    private List<Integer> orderStatusList;
}
