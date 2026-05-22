package tech.tiangong.sdp.service;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import tech.tiangong.sdp.BasicTest;

import java.nio.file.Files;
import java.nio.file.Path;

/**
 * 单元测试
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/11 15:19
 */
@Slf4j
public class SkcImageSyncServiceTest extends BasicTest {
    private @Autowired SkcImageSyncService skcImageSyncService;

    @Test
    void importExcel() {
        withSystemUser(() -> {
            try (var in = Files.newInputStream(Path.of("C:\\Users\\qinzh\\Downloads\\吴晓璇货盘表图片url.xlsx"))) {
                skcImageSyncService.importExcel(in);
            } catch (Exception e) {
                log.error(e.getMessage(), e);
            }
        });
    }

    @Test
    void upload() {
        withSystemUser(() -> skcImageSyncService.upload());
    }
}
