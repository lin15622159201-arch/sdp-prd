package tech.tiangong.sdp.amqp;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;

/**
 * 任务消息
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/20 18:04
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class SpotTaskMessageDTO extends TaskMessageDTO {
    @Serial
    private static final long serialVersionUID = -7293388869772103687L;
    private String type;
}
