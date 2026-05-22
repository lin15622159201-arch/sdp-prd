package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.temu.vo.TemuResp;
import tech.tiangong.sdp.temu.vo.dto.TemuWarehouseDTO;

import java.io.Serial;
import java.util.List;

/**
 * 仓库
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@EqualsAndHashCode(callSuper = false)
@Data
public class TemuWarehouseResultResp implements TemuResp {

    @Serial
    private static final long serialVersionUID = 214915406930420287L;
    /**
     * 站点可选发货仓列表
     */
    private List<TemuWarehouseResp> warehouseDTOList;
}
