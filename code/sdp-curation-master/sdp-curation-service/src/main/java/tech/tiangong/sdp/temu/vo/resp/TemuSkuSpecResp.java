package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;

/**
 * SKU 规格信息
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@EqualsAndHashCode(callSuper = false)
@Data
public class TemuSkuSpecResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = 7231666689895341767L;
    /**
     * 规格 ID
     */
    private Long specId;

    /**
     * 父规格名称
     */
    private String parentSpecName;

    /**
     * 父规格 ID
     */
    private Long parentSpecId;

    /**
     * 规格名称
     */
    private String specName;

}
