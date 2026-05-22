package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.temu.vo.TemuCommonReq;

import java.io.Serial;

/**
 * Temu视频-查询视频转码结果
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class TemuVideoResultGetReq extends TemuCommonReq {

    @Serial
    private static final long serialVersionUID = 1334800849187222900L;
    /**
     * 视频上传 VID
     */
    private String vid;
}
