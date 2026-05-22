package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * 映射内容
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@Data
public class TemuSizeMappingContentResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = 3883576842949979817L;
    private TemuSizeMetaResp meta;
    private List<TemuSizeMappingRecordResp> records;

}
