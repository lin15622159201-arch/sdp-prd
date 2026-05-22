package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;

/**
 * Temu颜色
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 15:09
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class TemuColorResp extends TemuProductSpecResp {
    @Serial
    private static final long serialVersionUID = -7122380163823764188L;
    /**
     * 规格 ID
     */
    private Long specId;

    /**
     * 分组 ID
     */
    private Long groupId;

    /**
     * 分组名
     */
    private String groupName;

    /**
     * 可以用的
     * 0:可用
     */
    private Integer available;
}
