package tech.tiangong.sdp.vo.req;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 商品-视频
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/13 10:33
 */
@Data
public class ProductVideoReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 7438036396545135437L;
    /**
     * 视频封面图
     */
    private String coverUrl;
    /**
     * 视频
     */
    private String videoUrl;
    /**
     * 宽
     */
    private Integer width;
    /**
     * 高
     */
    private Integer height;
}
