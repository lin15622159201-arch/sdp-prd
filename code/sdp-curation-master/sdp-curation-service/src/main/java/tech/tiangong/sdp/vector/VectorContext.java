package tech.tiangong.sdp.vector;

import com.alibaba.ttl.TransmittableThreadLocal;
import lombok.experimental.UtilityClass;

/**
 * ThreadLocal
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 16:13
 */
@UtilityClass
public class VectorContext {
    private final static TransmittableThreadLocal<Long> LOCAL = new TransmittableThreadLocal<>();

    public void set(final Long tenantId) {
        LOCAL.set(tenantId);
    }

    public Long get() {
        return LOCAL.get();
    }

    public void clear() {
        LOCAL.remove();
    }
}
