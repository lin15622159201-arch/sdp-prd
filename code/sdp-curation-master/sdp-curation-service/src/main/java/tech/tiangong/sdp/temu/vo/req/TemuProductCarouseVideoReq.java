package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuReq;
import tech.tiangong.sdp.temu.vo.dto.TemuSemiManagedSiteModeDTO;

import java.io.Serial;
import java.util.List;

/**
 * Temu商品-轮播视频信息
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:04
 */
@Data
public class TemuProductCarouseVideoReq implements TemuReq {

    @Serial
    private static final long serialVersionUID = 1674167646257682181L;
    /**
     * 视频 VID
     */
    private String vid;
    /**
     * 视频封面图(B端存储的是首侦图)
     */
    private String coverUrl;
    /**
     * 视频 url
     */
    private String videoUrl;
    /**
     * 视频宽度
     */
    private Integer width;
    /**
     * 视频高度
     */
    private Integer height;
}
