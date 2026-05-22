package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.common.resp.BaseVO;

import java.io.Serial;

/**
 * 开款任务 - 备注
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 18:38
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class DevelopStyleRemarkResp extends BaseVO {
    @Serial
    private static final long serialVersionUID = -5049026759898363877L;

    /**
     * 任务ID
     */
    private Long taskId;

    /**
     * 备注ID
     */
    private Long remarkId;

    /**
     * 开款图
     */
    private String imageUrl;

    /**
     * 备注信息
     */
    private String remark;
}
