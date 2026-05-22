package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;

/**
 * Temu视频-查询视频转码结果
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuVideoResultResp implements TemuResp {

    @Serial
    private static final long serialVersionUID = -5669541033138199577L;
    /**
     * Corresponding to the video vid
     */
    private String vid;
    /**
     * Cover image corresponding to the video url
     */
    private String coverUrl;
    /**
     * Access corresponding to the video url
     */
    private String videoUrl;
    /**
     * Video width
     */
    private Long width;
    /**
     * Video height
     */
    private Long height;
}
