package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.temu.vo.TemuCommonReq;
import tech.tiangong.sdp.temu.vo.TemuReq;
import tech.tiangong.sdp.temu.vo.dto.TemuProductPropValueDependencyDTO;

import java.io.Serial;
import java.util.List;

/**
 * Temu商品-根据站点查询可绑定的发货仓库信息接口
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class TemuWarehouseGetReq extends TemuCommonReq {


    @Serial
    private static final long serialVersionUID = 693252017763807944L;
    /**
     * 用户信息
     */
    private TemuApiUserReq openApiUser ;
    /**
     * 站点列表
     */
    private List<Integer> siteIdList;
}
