package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * Temu商品站点供应商价格信息
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/17 18:32
 */
@Data
public class TemuProductAccessoriesResp implements TemuResp {

    @Serial
    private static final long serialVersionUID = -1129978656214395187L;
    private String unitName;
    private String value;
    private Integer vid;
    private Integer unitCode;
}
