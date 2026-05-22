package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;
import java.util.Objects;

/**
 * 映射内容
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@Data
public class TemuSizeResultResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = -1985734940301992286L;
    /**
     * 尺码映射核心内容
     */
    private TemuSizeMappingContentResp mappingContent;

    /**
     * 状态码
     */
    private Integer code;

    /**
     * 分组中文名，如 Size
     */
    private String groupChName;

    /**
     * 尺码列表
     */
    private List<String> sizeList;

    /**
     * 分组英文名，如 CN
     */
    private String groupEnName;

    public boolean succeed() {
        return Objects.nonNull(mappingContent) && Objects.equals(Bool.YES.getCode(), code);
    }
}
