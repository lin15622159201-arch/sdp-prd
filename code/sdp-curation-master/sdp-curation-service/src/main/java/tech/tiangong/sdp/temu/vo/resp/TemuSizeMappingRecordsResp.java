package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;
import java.util.Map;

/**
 * 元数据 ID与值的映射关系
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@Data
public class TemuSizeMappingRecordsResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = -5693589476284388655L;
    private TemuSizeMappingRecordResp values;

}
