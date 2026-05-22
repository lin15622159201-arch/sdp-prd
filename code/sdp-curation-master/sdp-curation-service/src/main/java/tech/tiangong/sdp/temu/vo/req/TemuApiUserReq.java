package tech.tiangong.sdp.temu.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import tech.tiangong.sdp.temu.vo.TemuReq;
import tech.tiangong.sdp.temu.vo.dto.TemuProductPropValueDependencyDTO;

import java.io.Serial;
import java.util.List;

/**
 * Temu
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TemuApiUserReq implements TemuReq {

    @Serial
    private static final long serialVersionUID = 4794971146864644722L;
    /**
     * 供应商 id
     */
    private Long supplierId ;
   
}
