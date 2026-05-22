package tech.tiangong.sdp.temu.http;

import com.alibaba.ttl.TransmittableThreadLocal;
import lombok.experimental.UtilityClass;
import tech.tiangong.sdp.vo.dto.TemuAppDTO;

/**
 * ThreadLocal
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 16:13
 */
@UtilityClass
public class TemuShopContext {
    private final static TransmittableThreadLocal<TemuAppDTO> LOCAL = new TransmittableThreadLocal<>();

    public void set(final TemuAppDTO app) {
        LOCAL.set(app);
    }

    public TemuAppDTO get() {
        return LOCAL.get();
    }

    public void clear() {
        LOCAL.remove();
    }
}
