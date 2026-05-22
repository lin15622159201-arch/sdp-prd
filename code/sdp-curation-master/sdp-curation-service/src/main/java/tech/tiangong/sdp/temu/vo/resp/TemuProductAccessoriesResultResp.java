package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * Temu商品货品包装清单类型查询
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/17 18:32
 */
@Data
public class TemuProductAccessoriesResultResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = 8159770312228821388L;
    private List<TemuProductAccessoriesResp> data;
}
