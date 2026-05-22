package tech.tiangong.sdp.service;

import cn.hutool.core.date.LocalDateTimeUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.json.JsonMapper;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import team.aikero.blade.auth.UserContexts;
import team.aikero.blade.uacs.sdk.client.UserClient;
import team.aikero.blade.user.constant.UserConstant;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.BasicTest;
import tech.tiangong.sdp.external.CustomerApi;
import tech.tiangong.sdp.temu.config.TemuPlatformProperties;
import tech.tiangong.sdp.temu.convert.TemuConvert;
import tech.tiangong.sdp.temu.vo.req.TemuApiUserReq;
import tech.tiangong.sdp.temu.vo.req.TemuProductListGetPageReq;
import tech.tiangong.sdp.temu.vo.req.TemuProductPriceListGetReq;
import tech.tiangong.sdp.temu.vo.req.TemuProductQuantityGetReq;
import tech.tiangong.sdp.util.TemuUtils;
import tech.tiangong.sdp.vo.req.CustomerPageReq;
import tech.tiangong.sdp.vo.req.SupplierReq;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

/**
 * 单元测试
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/11 18:36
 */
@Slf4j
public class ApsServiceTest extends BasicTest {
    @Autowired
    private ApsService apsService;
    @Autowired
    private UserClient userClient;
    @Autowired
    @Qualifier(value = "cnTemuProperties")
    private TemuPlatformProperties cnTemuProperties;

    @Test
    void test() {
        final var req = new SupplierReq();
        this.print(this.apsService.supplierQuery(req));
    }

    //
    @Test
    void print() {
        final var timestamp = LocalDateTimeUtil.toEpochMilli(LocalDateTime.now()) / 1000;
        final Map<String, Object> params = new TreeMap<>();
//        params.put("access_token", "corooiua2wzgcrk1cog5bdig3evcptvnlvyp5roxtupovzlthpeqslck");
//        params.put("access_token", "upsxqi1thmtd1a3yksltfxuiuv59wh4atkzbzekmowtcatqu7fs6ma9tbf9");
//        params.put("access_token", "uplv3hfyt5kcwoymrgnajnbl1ow5qxlz4sqhev6hl3xosz5dejrtyl2jre7");
//        params.put("access_token", "tlukrxitzhmsonlxh8w9otukpvcyfqumetzbb2nch8aojr6kxieo4nqw");
//        params.put("access_token", "zpntdydrtunpuozi2wffikr8pwr6xnvwmyu6qmqlkb7u2gl2lzik68gq");
//        params.put("access_token", "lxaavpwexelmdr611oid7omjftpx8nuc4lozcrx2v12javczigwetpzg");
        params.put("access_token", "ebpai94snfnq2lc4wcaqoev8qwqsknb07geevx6darv4swdys8rtdbty");
//        params.put("app_key", "559723e4d426213c4c83f0ff2472142u");
//        params.put("app_key", "73d08e5255d640a40f9d8ac48dd867db");
//        params.put("app_key", "52a64807bd435502f16027a01de9b0c2");
        params.put("app_key", "73d08e5255d640a40f9d8ac48dd867db");
//        params.put("app_key", "4ebbc9190ae410443d65b4c2faca981f");
        params.put("data_type", "JSON"); // 若是其它方式按文档填
//        params.put("type", "bg.open.accesstoken.create");
//        params.put("type", "bg.open.accesstoken.info.get");
//        params.put("type", "bg.goods.sizecharts.meta.get");
//        params.put("type", "bg.btg.goods.stock.quantity.get");
        params.put("type", "bg.semi.price.review.page.query.order");
        params.put("pageNo", "1");
        params.put("pageSize", "50");
        params.put("orderStatusList", JsonsKt.toJson(List.of("3", "4", "5")));
//        params.put("type", "bg.glo.goods.detail.get");
//        params.put("type", "bg.order.list.v2.get");
//        params.put("type", "temu.local.goods.recommendedprice.query");
//        params.put("type", "bg.order.combinedshipment.list.get");
//        params.put("catId", String.valueOf(39029));
//        params.put("productId", "2847077355") ;
//        final var req = new TemuApiUserReq();
//        req.setSupplierId(634418226057356L);
//        params.put("openApiUser", JsonsKt.toJson(req));
//        params.put("siteIdList", JsonsKt.toJson(List.of(100)));
//        params.put("offset", String.valueOf(1));
//        params.put("productId", "7231306330");
//        params.put("productSkcId", "84796990429");
//        params.put("pageNo", String.valueOf(1));
//        params.put("parentOrderSn", "211-13089801324151707");
//        params.put("goodsIdList", JsonsKt.toJson(List.of(606106839550187L)));
        params.put("timestamp", String.valueOf(timestamp));
//        final var sign = TemuUtils.sign(params, "9c8248c161805068dab62267a59ab1ebd3d599bc");
        final var sign = TemuUtils.sign(params, "9c8248c161805068dab62267a59ab1ebd3d599bc");
        params.put("sign", sign);
        final var json = JsonsKt.toJsonPretty(params);
        System.err.println("单元测试\t" + json);
        final var req = new TemuProductPriceListGetReq();
        req.setTimestamp(String.valueOf(timestamp));
        req.setAccessToken("zpntdydrtunpuozi2wffikr8pwr6xnvwmyu6qmqlkb7u2gl2lzik68gq");
        req.setAppKey("52a64807bd435502f16027a01de9b0c2");
        req.setType("bg.glo.goods.price.list.get");
        req.setProductSkuIds(List.of(90889100838L, 14317311569L, 95951464321L, 13347366001L, 97849593912L));
//        req.setType("bg.goods.warehouse.list.get");
//        req.setPage(1);
//        req.setPageSize(50);
        req.setSign(TemuUtils.sign(TemuConvert.convert(req), "2722f711e916c9c9ce3168fa84666ca77c0cbd35"));
        System.err.println("单元测试\t" + TemuConvert.writeValueAsString(req));
    }

    @Test
    void test2() {
        final var req = new CustomerPageReq();
        req.setPageNum(1);
        req.setPageSize(32);
//        UserContexts.withSystemUser(() ->{
        final var data = CustomerApi.page(req);
        this.print(data);
//    });
    }

    @Test
    void test3() throws JsonProcessingException {
        final var dto = new TestDTO();
        dto.setName("test");
        dto.setPassword("123456");
        this.print(dto);
        final var mapper = JsonMapper.builder().configure(MapperFeature.PROPAGATE_TRANSIENT_MARKER, true).build();
        log.info("自定义序列化\t{}", mapper.writeValueAsString(dto));
    }

    @Test
    void test4() {
        System.out.println(LocalDateTimeUtil.of(Instant.ofEpochSecond(1803974619L)));
    }

    @Test
    void test5() {
        UserContexts.withSystemUser(() -> print(userClient.findByNames(List.of("毛宇哲"))));
    }

    @Data
    static
    class TestDTO implements Serializable {
        @Serial
        private static final long serialVersionUID = -927231328663850659L;
        private String name;
        private transient String password;
    }
}
