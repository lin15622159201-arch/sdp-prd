package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.common.resp.BaseVO;

import java.io.Serial;

/**
 * 开款任务 - 操作
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 18:38
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class DevelopStyleOptResp extends BaseVO {
    @Serial
    private static final long serialVersionUID = -5049026759898363877L;

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
