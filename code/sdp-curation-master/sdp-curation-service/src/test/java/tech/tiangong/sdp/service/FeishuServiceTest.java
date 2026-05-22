package tech.tiangong.sdp.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import tech.tiangong.sdp.BasicTest;

/**
 * 单元测试
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/4/17 11:00
 */
public class FeishuServiceTest extends BasicTest {
    @Autowired
    private FeishuService service;

    @Test
    void job() {
        withSystemUser(service::job);
    }
}
