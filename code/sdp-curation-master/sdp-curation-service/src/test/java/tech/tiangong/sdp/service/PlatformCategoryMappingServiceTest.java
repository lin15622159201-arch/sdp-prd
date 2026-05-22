package tech.tiangong.sdp.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import tech.tiangong.sdp.BasicTest;
import tech.tiangong.sdp.vo.req.PlatformCategoryMappingPageReq;

/**
 * 单元测试
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/27 18:35
 */
public class PlatformCategoryMappingServiceTest extends BasicTest {
    @Autowired
    private PlatformCategoryMappingService service;

    @Test
    void page() {
        final var req = new PlatformCategoryMappingPageReq();
        req.setPlatformCode("TEMU");
        this.print(this.service.page(req));
    }
}
