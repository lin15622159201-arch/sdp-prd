package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;

/**
 * 值单位实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@Data
public class TemuGoodsValueUnitResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = 6930619997485030186L;
    /**
     * Value unit name
     */
    private String valueUnit;
    /**
     * Value unit ID
     */
    private Long valueUnitId;

}
