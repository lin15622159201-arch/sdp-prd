package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;

/**
 * 附加信息实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@Data
public class TemuGoodsAdditionalInfoResp implements TemuResp {

    @Serial
    private static final long serialVersionUID = 1487730248986049811L;
    /**
     * This option requires an ISBN
     */
    private Boolean needIsbn;
}
