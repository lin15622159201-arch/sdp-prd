package tech.tiangong.sdp.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.aikero.blade.auth.UserContexts;
import tech.tiangong.sdp.BasicTest;
import tech.tiangong.sdp.common.req.ShopInnerPageReq;
import tech.tiangong.sdp.vo.req.ShopAddReq;
import tech.tiangong.sdp.vo.req.ShopEditReq;
import tech.tiangong.sdp.vo.req.ShopPageReq;

import java.util.List;

/**
 * 单元测试
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/28 16:21
 */
public class ShopServiceTest extends BasicTest {
    @Autowired
    private ShopService service;

    @Test
    void batchCreate() {
        final var req = new ShopAddReq();
        req.setShopName("广州创衣Temu海外店_TEST");
        req.setShopType("1");
        req.setPlatformCode("TEMU");
        req.setPlatformName("TEMU");
        req.setSubjectCode("KH244083636");
        req.setSubjectName("广州创衣科技有限公司");
        req.setProductToken("5ufy9wbozdrpnznqlza2gsaghwplpgwym2nvyzzjgjrarjx50x1ugilb");
        this.service.batchCreate(List.of(req));
    }

    @Test
    void edit() {
        final var req = new ShopEditReq();
        req.setShopId(7414936644622802945L);
        req.setShopName("广州创衣Temu海外店");
        req.setShopType("1");
        req.setPlatformCode("TEMU");
        req.setPlatformName("TEMU");
        req.setSubjectCode("KH244083636");
        req.setSubjectName("广州创衣科技有限公司");
        req.setProductToken("5ufy9wbozdrpnznqlza2gsaghwplpgwym2nvyzzjgjrarjx50x1ugilb");
        this.service.edit(req);
    }

    @Test
    void pageInner() {
        final var req = new ShopInnerPageReq();
        this.print(this.service.pageInner(req));
    }
    @Test
    void page() {
        final var req = new ShopPageReq();
        req.setBusinessOperatorId(191137482L);
        this.print(this.service.page(req));
    }
    @Test
    void job() {
        UserContexts.withSystemUser(() -> this.service.job());
    }
}
