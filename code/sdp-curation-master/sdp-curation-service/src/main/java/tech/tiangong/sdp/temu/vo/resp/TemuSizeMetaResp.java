package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * 尺码组与尺码参数组元数据
 * MetaElementItem MetaGroupItem
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@Data
public class TemuSizeMetaResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = 7231666689895341767L;
    /**
     * 尺码组元数据
     */
    private List<TemuSizeMetaUnnecessaryResp> groupList;
    /**
     * 尺码参数组元数据
     */
    private List<TemuSizeMetaNecessaryResp> elementList;
}
