package tech.tiangong.sdp.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.aikero.blade.auth.UserContexts;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.BasicTest;
import tech.tiangong.sdp.repository.ProductSyncLogRepository;
import tech.tiangong.sdp.vo.dto.TemuAppDTO;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

/**
 * 单元测试
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/19 11:11
 */
public class TemuSyncServiceTest extends BasicTest {
    @Autowired
    private TemuSyncService service;
    private @Autowired ProductSyncLogRepository productSyncLogRepository;

    private List<TemuAppDTO> listApp() {
        final var path = "C:\\temp\\sdp-curation\\sdp-curation-service\\src\\test\\kotlin\\shop_data.json";
        try {
            final var json = Files.readString(Path.of(path));
            return JsonsKt.parseJsonList(json, TemuAppDTO.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void sync() {
        final var list = listApp();
//        list.forEach(service::sync);
//        UserContexts.withSystemUser(() -> service.sync(7415763733718241281L));
//        UserContexts.withSystemUser(() -> service.sync(7414543168462708776L, "526030012460101"));
        UserContexts.withSystemUser(() -> service.sync(getApp()));
    }

    @Test
    void test() {
        UserContexts.withSystemUser(service::test);
    }

    @Test
    void syncReviewPrice() {
//        listApp().forEach(service::syncReviewPrice);
//        listApp().forEach(service::syncReviewPrice);
//        service.syncReviewPrice(getApp());
    }

    @Test
    void updateProductTenant() {
//        listApp().forEach(service::syncReviewPrice);
//        listApp().forEach(service::syncReviewPrice);
//        service.syncReviewPrice(getApp());
        service.updateProductTenant();
    }

    @Test
    void syncProduct() {
        UserContexts.withSystemUser(service::syncProduct);
    }

    private TemuAppDTO getApp() {
        final var dto = new TemuAppDTO();
        dto.setOrderToken("");
//        dto.setAccessToken("zpntdydrtunpuozi2wffikr8pwr6xnvwmyu6qmqlkb7u2gl2lzik68gq");
//        dto.setAppKey("52a64807bd435502f16027a01de9b0c2");
//        dto.setAppSecret("2722f711e916c9c9ce3168fa84666ca77c0cbd35");
        dto.setAccessToken("deikeuaxabck3n9o9btfvj3hpocpfl52e38qzfg9aeovkskzvpd7iygc");
        dto.setAppKey("73d08e5255d640a40f9d8ac48dd867db");
        dto.setAppSecret("9c8248c161805068dab62267a59ab1ebd3d599bc");
        dto.setShopId(7426873393628054357L);
        dto.setShopName("Chic Verse D");
        return dto;
    }
}
//