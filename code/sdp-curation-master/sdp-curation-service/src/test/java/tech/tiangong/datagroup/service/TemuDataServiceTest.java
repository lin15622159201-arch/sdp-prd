package tech.tiangong.datagroup.service;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.aikero.blade.auth.UserContexts;
import tech.tiangong.sdp.BasicTest;

/**
 * 单元测试
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/1 10:40
 */
@Slf4j
public class TemuDataServiceTest extends BasicTest {
    @Autowired
    private TemuDataService temuDataService;

    @Test
    void sync() {
        UserContexts.withSystemUser(temuDataService);
    }
}
