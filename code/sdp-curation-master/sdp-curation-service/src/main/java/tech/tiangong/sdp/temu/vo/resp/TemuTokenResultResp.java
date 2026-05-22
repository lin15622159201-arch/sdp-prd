package tech.tiangong.sdp.temu.vo.resp;

import cn.hutool.core.date.LocalDateTimeUtil;
import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Token
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@Data
public class TemuTokenResultResp implements TemuResp {

    @Serial
    private static final long serialVersionUID = -8773196879651762166L;
    /**
     * 有效期
     */
    private Long expiredTime;

    /**
     * 唯一ID
     */
    private String uniqueId;

    /**
     * 尺码列表
     */
    private List<String> apiScopeList;

    public LocalDateTime expiredTime() {
        return LocalDateTimeUtil.of(Instant.ofEpochSecond(this.expiredTime));
    }
}
