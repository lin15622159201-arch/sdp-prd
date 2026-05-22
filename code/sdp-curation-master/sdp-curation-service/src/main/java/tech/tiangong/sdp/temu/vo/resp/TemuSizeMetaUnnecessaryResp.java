package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;

/**
 * 规格分组实体类
 * MetaElementItem MetaGroupItem
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class TemuSizeMetaUnnecessaryResp extends TemuIdNameResp {

    @Serial
    private static final long serialVersionUID = -8552824353366502983L;
    /**
     * 是否必填
     */
    private Boolean unnecessary;

}
