package tech.tiangong.sdp.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.aikero.blade.auth.UserContexts;
import tech.tiangong.sdp.BasicTest;

/**
 * 单元测试
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/17 18:29
 */
public class StyleOnShelvesServiceTest extends BasicTest {
    private @Autowired StyleOnShelvesService service;

    @Test
    void test() {
        UserContexts.withSystemUser(() -> this.service.test());
    }
}