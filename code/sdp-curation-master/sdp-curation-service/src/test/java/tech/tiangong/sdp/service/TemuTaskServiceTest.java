package tech.tiangong.sdp.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.aikero.blade.auth.UserContexts;
import tech.tiangong.sdp.BasicTest;
import tech.tiangong.sdp.convert.TemuTaskConvert;
import tech.tiangong.sdp.repository.*;
import tech.tiangong.sdp.temu.http.TemuShopContext;
import tech.tiangong.sdp.temu.serivce.TemuProductService;

import java.util.List;

/**
 * 单元测试
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/24 9:46
 */
public class TemuTaskServiceTest extends BasicTest {
    @Autowired
    private TemuTaskService service;
    private @Autowired TemuProductCategoryRepository temuProductCategoryRepository;
    private @Autowired ProductSizePartRepository productSizePartRepository;
    private @Autowired ProductSizeRepository productSizeRepository;
    private @Autowired ProductRepository productRepository;
    private @Autowired TemuProductService temuProductService;
    private @Autowired ShopService shopService;
    private @Autowired TemuSizeClassRepository temuSizeClassRepository;

    @Test
    void test1() {
        final var e = productRepository.getById(7417102763961979147L);
        e.setSizeTemplateId(null);
        e.setShowSizeTemplateId(null);
        productRepository.removeTemp(e);
    }

    @Test
    void test2() {
        this.print(productRepository.selectWithoutSalesDriving(0));
    }

    @Test
    void pushTask() {
        /*

INSERT INTO sdp_curation.temu_task (task_id) VALUES (7413514921926889475);
INSERT INTO sdp_curation.temu_task (task_id) VALUES (7413514921926889477);
INSERT INTO sdp_curation.temu_task (task_id) VALUES (7413514921956249607);
INSERT INTO sdp_curation.temu_task (task_id) VALUES (7413514921956249609);
INSERT INTO sdp_curation.temu_task (task_id) VALUES (7413514921956249611);
INSERT INTO sdp_curation.temu_task (task_id) VALUES (7413514921956249612);
INSERT INTO sdp_curation.temu_task (task_id) VALUES (7413514921956249613);
         */
        final var ids = List.of(7417103935783408041L);
        ids.forEach(it -> UserContexts.withSystemUser(() -> service.pushTask(it)));
    }

    @Test
    void test3() {
        /*

INSERT INTO sdp_curation.temu_task (task_id) VALUES (7413514921926889475);
INSERT INTO sdp_curation.temu_task (task_id) VALUES (7413514921926889477);
INSERT INTO sdp_curation.temu_task (task_id) VALUES (7413514921956249607);
INSERT INTO sdp_curation.temu_task (task_id) VALUES (7413514921956249609);
INSERT INTO sdp_curation.temu_task (task_id) VALUES (7413514921956249611);
INSERT INTO sdp_curation.temu_task (task_id) VALUES (7413514921956249612);
INSERT INTO sdp_curation.temu_task (task_id) VALUES (7413514921956249613);
         */
        UserContexts.withSystemUser(() -> service.test());
    }

    @Test
    void test() {
        /*
        {
  "catId" : 29149,
  "classId" : 16,
  "parentClassId" : 1,
  "relatedClassIds" : [ 9, 5, 6, 7, 28, 29, 30, 31, 32, 33, 34, 12, 25, 91 ],
  "classType" : 1
}
         */

        final var category = temuProductCategoryRepository.getById(29149);
        final var size = this.productSizeRepository.getById(7417028728708239616L);
        category.setSizeClass(temuSizeClassRepository.getById(28959L));
        final var product = this.productRepository.getById(7417028728695656618L);
        final var parts = this.productSizePartRepository.listBySizeId(size.getProductSizeId());
        size.setSizeParts(parts);
        final var req = TemuTaskConvert.buildSizeCreateReq(size, category, product);
        TemuShopContext.set(shopService.getApp(7414543168462708776L));
        final var resp = this.temuProductService.sizeChartsCreate(req);
        TemuShopContext.clear();
        this.print(req);
        this.print(resp);
    }
}
