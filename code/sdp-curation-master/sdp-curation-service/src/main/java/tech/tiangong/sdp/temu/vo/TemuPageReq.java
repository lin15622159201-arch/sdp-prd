package tech.tiangong.sdp.temu.vo;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;

/**
 * Temu请求参数
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 10:09
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class TemuPageReq extends TemuCommonReq {
    @Serial
    private static final long serialVersionUID = -2143108086257819963L;
    private Integer pageSize ;
    private Integer pageNum;
}
