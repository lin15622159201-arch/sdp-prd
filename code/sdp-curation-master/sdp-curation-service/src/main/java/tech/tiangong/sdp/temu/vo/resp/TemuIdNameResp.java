package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;

/**
 * Temu
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/31 18:23
 */
@Data
public class TemuIdNameResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = -6974917085039146797L;
    /**
     * name
     */
    private String name;
    /**
     *  ID
     */
    private Long id;
}
