package tech.tiangong.sdp.temu.http;

import com.alibaba.ttl.TransmittableThreadLocal;
import lombok.experimental.UtilityClass;
import tech.tiangong.sdp.temu.vo.dto.RestLogDTO;

/**
 * ThreadLocal
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 16:13
 */
@UtilityClass
public class RestRequestContext {
    private final static TransmittableThreadLocal<RestLogDTO> LOCAL = new TransmittableThreadLocal<>();

    public void set(final RestLogDTO restLogDTO) {
        LOCAL.set(restLogDTO);
    }

    public RestLogDTO get() {
        return LOCAL.get();
    }

    public void clear() {
        LOCAL.remove();
    }
}
