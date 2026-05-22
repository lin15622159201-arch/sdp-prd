package tech.tiangong.sdp.service;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import tech.tiangong.sdp.BasicTest;
import tech.tiangong.sdp.vo.req.LogisticsTemplateReq;
import tech.tiangong.sdp.vo.req.WarehouseReq;

/**
 * 单元测试
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/9 14:57
 */
@Slf4j
public class TemuServiceTest extends BasicTest {
    @Autowired
    private TemuService service;

    @Test
    void listCategory() {
        this.print(this.service.listCategory());
    }

    @Test
    void listProductSpec() {
        this.print(this.service.listProductSpec());
    }

    @Test
    void listColor() {
        this.print(this.service.listColor(53988L));
    }

    @Test
    void listSize() {
        this.print(this.service.listSize(53988L));
    }

    @Test
    void listPart() {
        this.print(this.service.listPart(/*28958L*/));
    }

    @Test
    void listProperty() {
//        this.print(this.service.listProperty(53989L));
        this.print(this.service.listProperty(29069L));
    }

    @Test
    void listLogisticsTemplate() {
        final var req = new LogisticsTemplateReq();
        req.setSiteId(100);
        req.setShopId(7414936644622802945L);
        this.print(this.service.listLogisticsTemplate(req));
    }

    @Test
    void listWarehouse() {
        final var req = new WarehouseReq();
        req.setSiteId(100);
        req.setShopId(7412399196017574559L);
        this.print(this.service.listWarehouse(req));
    }
}
