package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * Temu-商品搜索
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/31 18:23
 */
@Data
public class TemuSearchProductResultResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = -1056090475691257389L;
    /**
     * 总数
     */
    private Integer total;
    /**
     * 商品
     */
    private List<TemuSearchProductResp> dataList;
}
