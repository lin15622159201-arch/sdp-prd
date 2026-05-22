package tech.tiangong.sdp.temu.serivce;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.aikero.blade.auth.UserContexts;
import tech.tiangong.sdp.BasicTest;

/**
 * 单元测试
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/31 17:08
 */
public class TemuTemplateServiceTest extends BasicTest {
    @Autowired
    private TemuTemplateService service;

    @Test
    void sync() {
        UserContexts.withSystemUser(() -> this.service.sync());
//        UserContexts.withSystemUser(() -> this.service.sync(39107L));
    }
}
