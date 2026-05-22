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
public class TemuSizeMappingRecordResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = 3207091630416384719L;
    /**
     * key 是 groupId / elementId（字符串形式的数字）
     * value 是对应的尺码/数值
     * 例如：
     * "64" -> "XXS"
     * "1"  -> "petite XS"
     */
    private Map<String, String> values;

}
