package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuReq;
import tech.tiangong.sdp.temu.vo.dto.TemuProductPropValueDependencyDTO;

import java.io.Serial;
import java.util.List;

/**
 * Temu商品-货品轮播图多语言信息请求
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuVehicleLibraryRelationReq implements TemuReq {


    @Serial
    private static final long serialVersionUID = 693252017763807944L;
    /**
     * 车型库 ID
     */
    private Long vehicleLibraryId ;
    /**
     * 车型列表
     */
    private List<TemuProductPropValueDependencyDTO> productPropValueDependencyReqList;
}
