package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.common.resp.BaseVO;

import java.io.Serial;

/**
 * 现货管理 - 操作
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 18:38
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class SpotStyleOptResp extends BaseVO {

    @Serial
    private static final long serialVersionUID = -8857194193579681257L;
    /**
     * 操作ID
     */
    private Long optId;
    /**
     * 任务ID
     */
    private Long taskId;
    /**
     * 操作类型
     */
    private String optType;

    /**
     * 操作内容
     */
    private String content;
}
