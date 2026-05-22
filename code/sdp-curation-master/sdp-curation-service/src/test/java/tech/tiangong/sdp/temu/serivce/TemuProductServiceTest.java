package tech.tiangong.sdp.temu.serivce;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.toolkit.CollectionUtils;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import team.aikero.blade.auth.UserContexts;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.user.entity.CurrentUser;
import team.aikero.blade.user.holder.DefaultCurrentUserContentSetter;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.BasicTest;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.entity.*;
import tech.tiangong.sdp.enums.TemuPartnerCNTypeEnum;
import tech.tiangong.sdp.repository.*;
import tech.tiangong.sdp.service.ShopService;
import tech.tiangong.sdp.temu.http.TemuShopContext;
import tech.tiangong.sdp.temu.vo.dto.TemuSizeChartsContentMetaDTO;
import tech.tiangong.sdp.temu.vo.dto.TemuSizeChartsContentRecordDTO;
import tech.tiangong.sdp.temu.vo.req.*;
import tech.tiangong.sdp.temu.vo.resp.TemuIdNameResp;
import tech.tiangong.sdp.temu.vo.resp.TemuSizeMetaUnnecessaryResp;
import tech.tiangong.sdp.util.ImageUtils;
import tech.tiangong.sdp.util.TemuUtils;
import tech.tiangong.sdp.vo.dto.TemuAppDTO;

import java.io.File;
import java.io.IOException;
import java.io.Serial;
import java.io.Serializable;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

/**
 * 单元测试
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/26 9:40
 */
@Slf4j
public class TemuProductServiceTest extends BasicTest {
    @Autowired
    private TemuProductService service;
    @Autowired
    private TemuProductCategoryRepository temuProductCategoryRepository;
    @Autowired
    private TemuProductSpecRepository temuProductSpecRepository;
    @Autowired
    private TemuProductTempValRepository temuProductTempValRepository;
    @Autowired
    private TemuProductTempAttrRepository temuProductTempAttrRepository;
    private @Autowired TemuAttrValueRepository temuAttrValueRepository;
    private @Autowired TemuAttrGroupRepository temuAttrGroupRepository;
    private @Autowired TemuSizeRepository temuSizeRepository;
    private @Autowired TemuSizeClassRepository temuSizeClassRepository;
    @Autowired
    @Qualifier(value = "restTemplate")
    private RestTemplate restTemplate;
    private @Autowired ShopService shopService;

    //    @Autowired
//    @Qualifier(value = "usTemuProperties")
//    private TemuPlatformProperties usTemuProperties;
    @Test
    void test0() {
        final var json = """
                [
                  {
                    "parentSpecName": "颜色",
                    "parentSpecId": 1001
                  },
                  {
                    "parentSpecName": "尺码",
                    "parentSpecId": 3001
                  },
                  {
                    "parentSpecName": "风格",
                    "parentSpecId": 18012
                  },
                  {
                    "parentSpecName": "材质",
                    "parentSpecId": 17017
                  },
                  {
                    "parentSpecName": "口味",
                    "parentSpecId": 18013
                  },
                  {
                    "parentSpecName": "适用人群",
                    "parentSpecId": 17018
                  },
                  {
                    "parentSpecName": "容量",
                    "parentSpecId": 18014
                  },
                  {
                    "parentSpecName": "成分",
                    "parentSpecId": 17019
                  },
                  {
                    "parentSpecName": "重量",
                    "parentSpecId": 18016
                  },
                  {
                    "parentSpecName": "品类",
                    "parentSpecId": 17020
                  },
                  {
                    "parentSpecName": "数量",
                    "parentSpecId": 15998553
                  },
                  {
                    "parentSpecName": "型号",
                    "parentSpecId": 45114199
                  },
                  {
                    "parentSpecName": "头发长度",
                    "parentSpecId": 44214483
                  },
                  {
                    "parentSpecName": "被套尺码",
                    "parentSpecId": 50546518
                  },
                  {
                    "parentSpecName": "RAM+ROM",
                    "parentSpecId": 75557797
                  },
                  {
                    "parentSpecName": "存储容量",
                    "parentSpecId": 101493276
                  },
                  {
                    "parentSpecName": "厚被尺码",
                    "parentSpecId": 50547421
                  },
                  {
                    "parentSpecName": "手机型号",
                    "parentSpecId": 43404162
                  }
                ]
                """;
        final var list = JsonsKt.parseJsonList(json, SpecDTO.class).stream().map(it -> {
            final var e = new TemuProductSpec();
            e.setAvailable(Bool.NO.getCode());
            e.setSpecId(it.getParentSpecId());
            e.setSpecName(it.getParentSpecName());
            e.setDeleted(Bool.NO.getCode());
            e.setTenantId(1L);
            return e;
        }).toList();
        this.temuProductSpecRepository.saveBatch(list, list.size());
    }

    @Data
    static class SpecDTO implements Serializable {

        @Serial
        private static final long serialVersionUID = -2829774480609548412L;
        private String parentSpecName;
        private Long parentSpecId;
    }

    @Test
    void getTemuGoodsCatList() {
//        final var ids = List.of(0);
        final var ids = List.of(29090, 29112, 53987);
        ids.forEach(id -> {
            final var req = new TemuGoodsCatReq();
            req.setType(TemuPartnerCNTypeEnum.GOODS_CATS.getCode());
            req.setParentCatId(id.longValue());
            final var data = service.getGoodsCatList(req);
            if (CollectionUtils.isNotEmpty(data)) {
                final var list = data.stream().filter(it -> Objects.equals(Bool.NO.getCode(), it.getAvailableStatus())).toList();
                if (CollectionUtils.isNotEmpty(list)) {
                    DefaultCurrentUserContentSetter.INSTANCE.set(new CurrentUser(151240195L, "覃文轩", "", 1L, false, -1L));
                    temuProductCategoryRepository.saveBatch(list.stream().map(it -> {
                        final var e = new TemuProductCategory();
                        e.setAvailable(it.getAvailableStatus());
                        e.setLeaf(it.getLeaf() ? Bool.YES.getCode() : Bool.NO.getCode());
                        e.setLevel(it.getLevel());
                        e.setParentId(it.getParentId());
                        e.setCategoryId(it.getCatId());
                        e.setCategoryName(it.getCatName());
                        e.setDeleted(Bool.NO.getCode());
                        e.setTenantId(1L);
                        return e;
                    }).toList());
                    DefaultCurrentUserContentSetter.INSTANCE.clean();
                }
            }
            this.print(data);
        });
    }

    @Test
    void suit() {
        DefaultCurrentUserContentSetter.INSTANCE.set(new CurrentUser(151240195L, "覃文轩", "", 1L, false, -1L));
        final var leafs = temuProductCategoryRepository.leafs();
        final var classies = new ArrayList<TemuSizeClass>();
        leafs.forEach(it -> {
            TemuShopContext.set(shopService.getApp(7414543168462708776L));
            final var resp = this.service.getSizeSpecClass(it.getCategoryId());
            if (Objects.nonNull(resp)) {
//                it.setSuiting(resp.getClassType());
//                BasicConvert.setRevised(it);
//                temuProductCategoryRepository.updateById(it);
                final var klass = new TemuSizeClass();
                klass.setCategoryId(it.getCategoryId());
                klass.setAvailable(it.getAvailable());
                klass.setParentId(resp.getParentClassId());
                klass.setClassId(resp.getClassId());
                klass.setClassType(resp.getClassType());
                final var relas = resp.getRelatedClassIds();
                if (CollectionUtils.isNotEmpty(relas)) {
                    klass.setRelatedId(JsonsKt.toJson(relas));
                }
                BasicConvert.entityInit(klass);
                classies.add(klass);

            }
            TemuShopContext.clear();
        });
        if (CollectionUtils.isNotEmpty(classies)) {
            this.temuSizeClassRepository.saveBatch(classies, classies.size());
        }
        DefaultCurrentUserContentSetter.INSTANCE.clean();
    }

    @Test
    void getTemuGoodsTemplate() {
        final var data = this.service.getGoodsTemplate(39029L);
        this.print(data);
    }

    @Test
    void getSizeSpecClass() {
        TemuShopContext.set(shopService.getApp(7414543168462708776L));
//        final var data = this.service.getSizeSpecClass(29149L);
        final var data = this.service.getSizeSpecClass(39153L);
        this.print(data);
        TemuShopContext.clear();
    }

    @Test
    void getTemuGoodsSize() {
        TemuShopContext.set(getApp());
        final var data = this.service.getGoodsSize(28996L);
        final var mc = data.getMappingContent();
        final var mate = mc.getMeta();
        final var groups = BasicConvert.toMap(mate.getGroupList(), TemuSizeMetaUnnecessaryResp::getId, TemuSizeMetaUnnecessaryResp::getName);
        final var records = mc.getRecords();
        this.print(groups);
        this.print(records);
        this.print(data);
        TemuShopContext.clear();
    }

    @Test
    void getTemuGoodsTemplateFormUS() {
        final var data = this.service.getGoodsTemplateFormUS(29073L);
        this.print(data);
    }

    @Test
    void getTemuGoodsSizeSpecElementFormUS() {
        final var data = this.service.getGoodsSizeSpecElementFormUS(29073L);
        this.print(data);
    }

    @Test
    void getWarehouse() {
        final var req = new TemuWarehouseGetReq();
        req.setOpenApiUser(new TemuApiUserReq(634418226057356L));
        req.setSiteIdList(List.of(100));
        final var data = this.service.getWarehouse(req);
        this.print(data);
    }

    @Test
    void getLogisticsTemplate() {
        final var req = new TemuLogisticsTemplateGetReq();
        req.setSiteIds(List.of(100));
        final var data = this.service.getLogisticsTemplate(req);
        this.print(data);
    }

    @Test
    void videoSign() {
        System.err.println("单元测试\t" + this.service.videoSign());
    }

    @Test
    void galerieStoreVideo() {
        final var req = new TemuGalerieStoreVideoReq();
        final var path = ImageUtils.downloadVideo("""
                https://oss.yunbanfang.cn/tiangong_0f1bb2b41a40439c8b20b687505d9169.mp4""");
//        final var file = new File("C:\\Users\\qinzh\\Downloads\\jimeng-2026-01-04-3016-模特展示服装，动作轻微变化，镜头从左到右移动.mp4");
        final var file = new File(path);
        req.setMd5(TemuUtils.md5(file));
        req.setFile(file);
        req.setSign(this.service.videoSign());
        final var vid = this.service.galerieStoreVideo(req);
        log.info("单元测试\n{}", vid);
        ImageUtils.removeFile(path);
    }

    @Test
    void getVideoResult() {
        TemuShopContext.set(shopService.getApp(7414211164500201491L));
        final var req = new TemuVideoResultGetReq();
        req.setVid("goods-video-tag#ghdsisxwsf5anmbbkcld7a3n75yfao74");
        print(this.service.getVideoResult(req));
        TemuShopContext.clear();
    }

    @Test
    void sizeChartsTemplateCreate() {
//        final var tempId = this.service.sizeChartsTemplateCreate(17594576585973L);
        final var tempId = this.service.sizeChartsTemplateCreate(17595010701848L);
        log.info("单元测试\n{}", tempId);
    }

    @Test
    void sizeChartsCreate() {
        final var req = new TemuSizeChartsCreateReq();
        req.setName("测试-女装上衣-T恤-尺码表");
//        req.setCatId(29069L);
        req.setClassId(5);
        req.setReusable(true);
        final var content = new TemuSizeChartsContentReq();
        content.setLocalSizeSource(1);
        content.setGeneralSizeType(1);
        req.setContent(content);
        final var mate = new TemuSizeChartsContentMetaDTO();
        content.setMeta(mate);
        final var records = new ArrayList<TemuSizeChartsContentRecordDTO>();
        content.setRecords(records);
        final var groupMate = new TemuIdNameResp();
        groupMate.setId(1L);
        groupMate.setName("尺码");
        mate.setGroupList(List.of(groupMate));
        final var rm = new TemuSizeChartsContentRecordDTO();
        rm.setValues(Map.of("1", "M", "10002", "108", "10003", "72"));
//        final var rl = new TemuSizeChartsContentRecordDTO();
//        rl.setValues(Map.of("1","L", "10002", "112","10003","74"));
//        final var rxl = new TemuSizeChartsContentRecordDTO();
//        rxl.setValues(Map.of("1","XL", "10002", "117","10003","76"));
        records.add(rm);
//        records.add(rl);
//        records.add(rxl);
        final var e1 = new TemuIdNameResp();
        e1.setName("胸围全围");
        e1.setId(10002L);
        final var e2 = new TemuIdNameResp();
        e2.setName("衣长");
        e2.setId(10003L);
        mate.setElementList(List.of(e1, e2));
        final var json = """
                {
                  "sign": "7899A589EF2A276ACD5E774F8AE718BA",
                  "type": "bg.goods.sizecharts.create",
                  "catId": 28949,
                  "app_key": "73d08e5255d640a40f9d8ac48dd867db",
                  "content": {
                    "meta": {
                      "groupList": [
                        {
                          "id": 2,
                          "name": "中国码"
                        }
                      ],
                      "elementList": [
                        {
                          "id": 10001,
                          "name": "肩宽"
                        },
                        {
                          "id": 10002,
                          "name": "胸围全围"
                        },
                        {
                          "id": 10003,
                          "name": "衣长"
                        },
                        {
                          "id": 10004,
                          "name": "袖长"
                        },
                        {
                          "id": 10005,
                          "name": "腰围全围"
                        },
                        {
                          "id": 10024,
                          "name": "领围"
                        }
                      ]
                    },
                    "records": [
                      {
                        "values": {
                          "2": "S",
                          "10001": "3.00",
                          "10002": "5.00",
                          "10003": "7.00",
                          "10004": "9.00",
                          "10005": "11.00",
                          "10024": "13.00"
                        }
                      },
                      {
                        "values": {
                          "2": "XS",
                          "10001": "1.00",
                          "10002": "2.00",
                          "10003": "3.00",
                          "10004": "4.00",
                          "10005": "5.00",
                          "10024": "6.00"
                        }
                      },
                      {
                        "values": {
                          "2": "M",
                          "10001": "7.00",
                          "10002": "10.00",
                          "10003": "13.00",
                          "10004": "16.00",
                          "10005": "19.00",
                          "10024": "18.00"
                        }
                      }
                    ],
                    "generalSizeType": 2,
                    "localSizeSource": 2
                  },
                  "reusable": false,
                  "data_type": "JSON",
                  "timestamp": "1769223670",
                  "access_token": "zrrfh7jgg1rqg2nzapxoodbmulkvnlcon8ypon7keh1do9kguxvce414"
                }
                """;
        final var sizeReq = JsonsKt.parseJson(json, TemuSizeChartsCreateReq.class);
//        sizeReq.setCatId(5L);
//        sizeReq.setCatId(28949L);
        sizeReq.setName("测试中国尺码表");
        TemuShopContext.set(shopService.getApp(7412399196017574559L));
        final var tempId = this.service.sizeChartsCreate(sizeReq).getBusinessId();
        log.info("单元测试\n{}", tempId);
        TemuShopContext.clear();
    }

    @Test
    void addProduct() {
        final var url = "https://img.kwcdn.com/product/open/39e45200efe2439ca21b001f2b815c68-goods.jpeg";
        final var req = new TemuGoodsAddReq();
        req.setProductName("测试 26 女装上衣、T恤、衬衫 复古暗黑个性时尚风，适配秋冬日常出街 & 轻社交聚会场合造型");
//        req.setI
        req.setCat1Id(27011);
        req.setCat2Id(28946);
        req.setCat3Id(28947);
        req.setCat4Id(29068);
        req.setCat5Id(29069);
        req.setCat6Id(0);
//        req.setCat6Id(29150);
        req.setCat7Id(0);
        req.setCat8Id(0);
        req.setCat9Id(0);
        req.setCat10Id(0);
        req.setMaterialImgUrl("https://img.kwcdn.com/product/open/5a0d0fa99bc04857ac082f68d18cdf0e-goods.jpeg");
        req.setProductSemiManagedReq(new TemuGoodsAddReq.ProductSemiManagedReq());
        req.getProductSemiManagedReq().setBindSiteIds(List.of(100L));
        req.setSizeTemplateIds(List.of(17595010708612L));
        req.setShowSizeTemplateIds(List.of(17595010708612L));
        final var wRoute = new TemuGoodsAddReq.ProductWarehouseRouteReq();
        final var rt = new TemuGoodsAddReq.ProductWarehouseRouteReq.TargetRoute();
        rt.setSiteIdList(List.of(100L));
        rt.setWarehouseId("WH-03605491271812164");
        wRoute.setTargetRouteList(List.of(rt));
        req.setProductWarehouseRouteReq(wRoute);
        final var i18n = new TemuGoodsAddReq.ProductI18nReq();
        i18n.setProductName("Test 26  Women's tops, T-shirts, and shirts featuring a retro, dark, and edgy style, suitable for everyday outings and casual social gatherings in autumn and winter");
        i18n.setLanguage("en");
        req.setProductI18nReqs(List.of(i18n));
        final var ship = new TemuGoodsAddReq.ProductShipmentReq();
//        ship.setFreightTemplateId("HFT-12050453655920883605");
        ship.setFreightTemplateId("HFT-16751255816560652164");
        ship.setShipmentLimitSecond("777600");
        req.setProductShipmentReq(ship);
        final var productPropertyReqs = new ArrayList<TemuGoodsAddReq.ProductPropertyReq>();
        final var productSpecPropertyReqs = new ArrayList<TemuGoodsAddReq.ProductSpecPropertyReq>();
        final var productSkcReqs = new ArrayList<TemuGoodsAddReq.ProductSkcReq>();

        final var attrMap = BasicConvert.toMap(this.temuProductTempAttrRepository.list(), TemuProductTempAttr::getAttrId);
        final var valueMap = BasicConvert.toMap(this.temuAttrValueRepository.list(), TemuAttrValue::getValueId);
        final var groupMap = BasicConvert.toMap(this.temuAttrGroupRepository.list(), TemuAttrGroup::getGroupId);
        final var specMap = BasicConvert.toMap(this.temuProductSpecRepository.list(), TemuProductSpec::getSpecId);
        final var tempVals = this.temuProductTempValRepository.listByTemplateId(29069L);
        final var pids = new HashSet<Long>();
        final var skc = new TemuGoodsAddReq.ProductSkcReq();
        final var sku = new TemuGoodsAddReq.ProductSkcReq.ProductSkuReq();
        final var productSkuReqs = new ArrayList<TemuGoodsAddReq.ProductSkcReq.ProductSkuReq>();
        final var productSkuSpecReqs = new ArrayList<TemuGoodsAddReq.ProductSkcReq.ProductSkuReq.ProductSkuSpecReq>();
        sku.setProductSkuSpecReqs(productSkuSpecReqs);
        skc.setProductSkuReqs(productSkuReqs);
        final var mainProductSkuSpecReqs = new ArrayList<TemuGoodsAddReq.ProductSkcReq.MainProductSkuSpecReq>();
        tempVals.stream().filter(it -> Objects.equals(it.getRequired(), Bool.YES.getCode())).filter(it -> Objects.equals(Bool.YES.getCode(), it.getSales())).forEach(it -> {
            final var num = Objects.equals(2, it.getBaseAttrId().intValue()) ? "100" : "60";
            if (Objects.equals(Bool.NO.getCode(), it.getSales())) {
                if (!pids.contains(it.getBaseAttrId())) {
                    pids.add(it.getBaseAttrId());
                    final var productPropertyReq = new TemuGoodsAddReq.ProductPropertyReq();
                    productPropertyReq.setValueExtendInfo("");
                    productPropertyReq.setNumberInputValue("");
                    productPropertyReq.setPid(it.getBaseAttrId().intValue());
                    productPropertyReq.setTemplatePid(it.getAttrId().intValue());
                    productPropertyReq.setRefPid(it.getReferencedAttrId().intValue());
                    productPropertyReq.setVid(0);
                    final var av = it.getAttrValue();
                    if (StrUtil.isNotBlank(av)) {
                        final var vl = JsonsKt.parseJsonList(av, Long.class).getFirst();
                        productPropertyReq.setVid(vl.intValue());
                        final var v = valueMap.get(vl);
                        productPropertyReq.setPropValue(v.getVal());
                        productPropertyReq.setValueExtendInfo(v.getExtendInfo());
                    } else {
                        if (Objects.equals(Bool.YES.getCode(), attrMap.get(it.getAttrId()).getAttrType())) {
                            productPropertyReq.setNumberInputValue(num);
                        }
                    }
                    productPropertyReq.setValueUnit("");
                    final var uts = it.getUnitArr();
                    if (StrUtil.isNotBlank(uts)) {
                        final var ul = JsonsKt.parseJsonList(uts, String.class).getFirst();
                        if (StrUtil.isNotBlank(ul)) {
                            productPropertyReq.setValueUnit(ul);
                            productPropertyReq.setNumberInputValue(num);
                        }
                    }
                    productPropertyReq.setPropName(attrMap.get(it.getAttrId()).getAttrTitle());
                    if (StrUtil.isBlank(productPropertyReq.getPropValue()) && Objects.equals(2052, productPropertyReq.getPid())) {
                        productPropertyReq.setPropValue(num);
                        productPropertyReq.setNumberInputValue("");
                    }
                    productPropertyReqs.add(productPropertyReq);
                }
            } else {
                final var productPropertyReq = new TemuGoodsAddReq.ProductSpecPropertyReq();
                productPropertyReq.setNumberInputValue("");
                productPropertyReq.setPid(it.getBaseAttrId().intValue());
                productPropertyReq.setTemplatePid(it.getAttrId().intValue());
                productPropertyReq.setRefPid(it.getReferencedAttrId().intValue());
                boolean ps = false;
                final var mss = new TemuGoodsAddReq.ProductSkcReq.MainProductSkuSpecReq();
                final var pks = new TemuGoodsAddReq.ProductSkcReq.ProductSkuReq.ProductSkuSpecReq();
                if (Objects.nonNull(it.getParentSpecId()) && it.getParentSpecId() > 0) {
                    productPropertyReq.setParentSpecId(it.getParentSpecId().intValue());
                    productPropertyReq.setParentSpecName(specMap.get(it.getParentSpecId()).getSpecName());
                    ps = true;
                    mss.setParentSpecId(productPropertyReq.getParentSpecId());
                    mss.setParentSpecName(productPropertyReq.getParentSpecName());
                    pks.setParentSpecId(productPropertyReq.getParentSpecId());
                    pks.setParentSpecName(productPropertyReq.getParentSpecName());
                }
                final var av = it.getAttrValue();
                productPropertyReq.setVid(0);
                if (StrUtil.isNotBlank(av)) {
                    ps = true;
                    final var vl = Objects.equals(Bool.YES.getCode(), it.getMainSale()) ? JsonsKt.parseJsonList(av, Long.class).getFirst() : JsonsKt.parseJsonList(av, Long.class).get(3);
                    productPropertyReq.setVid(vl.intValue());
                    final var v = valueMap.get(vl);
                    final var specId = v.getSpecId();
                    productPropertyReq.setPropValue(v.getVal());
                    productPropertyReq.setValueExtendInfo(v.getExtendInfo());
                    if (Objects.nonNull(specId) && specId > 0) {
                        productPropertyReq.setSpecId(specId.intValue());
                        Optional.ofNullable(specMap.get(specId)).ifPresentOrElse(s -> productPropertyReq.setSpecName(s.getSpecName()), () -> productPropertyReq.setSpecName(productPropertyReq.getPropValue()));
                        mss.setSpecId(productPropertyReq.getSpecId());
                        mss.setSpecName(productPropertyReq.getSpecName());
                        pks.setSpecId(productPropertyReq.getSpecId());
                        pks.setSpecName(productPropertyReq.getSpecName());
                    }
                    if (Objects.nonNull(v.getGroupId())) {
                        final var g = groupMap.get(v.getGroupId());
                        productPropertyReq.setValueGroupId(g.getGroupId().intValue());
                        productPropertyReq.setValueGroupName(g.getGroupName());
                    }
                }
                if (ps) {
                    if (CollectionUtil.isEmpty(mainProductSkuSpecReqs) && Objects.equals(Bool.YES.getCode(), it.getMainSale())) {
                        mainProductSkuSpecReqs.add(mss);
                    }
                    if (CollectionUtil.isEmpty(productSkuSpecReqs) || productSkuSpecReqs.stream().noneMatch(s -> Objects.equals(1001, s.getParentSpecId()))) {
                        productSkuSpecReqs.add(pks);
                    }
                }
                productPropertyReq.setValueUnit("");
                final var uts = it.getUnitArr();
                if (StrUtil.isNotBlank(uts)) {
                    final var ul = JsonsKt.parseJsonList(uts, String.class).getFirst();
                    if (StrUtil.isNotBlank(ul)) {
                        productPropertyReq.setValueUnit(ul);
                    }
                }
                productPropertyReq.setPropName(attrMap.get(it.getAttrId()).getAttrTitle());
                if (productSpecPropertyReqs.stream().noneMatch(s -> Objects.equals(productPropertyReq.getTemplatePid(), s.getTemplatePid()))) {
                    productSpecPropertyReqs.add(productPropertyReq);
                }
                if (CollectionUtil.isNotEmpty(mainProductSkuSpecReqs) && CollectionUtil.isEmpty(skc.getMainProductSkuSpecReqs())) {
                    skc.setMainProductSkuSpecReqs(mainProductSkuSpecReqs);
                }
                // SKC
                if (Objects.equals(1001, productPropertyReq.getParentSpecId()) && CollectionUtil.isEmpty(productSkcReqs)) {
                    skc.setPreviewImgUrls(List.of(url, "https://img.cdnfe.com/product/open/5e49ac93b08d4945954b4da8d113ab67-goods.jpeg", "https://img.cdnfe.com/product/open/5e49ac93b08d4945954b4da8d113ab67-goods.jpeg"));
                    productSkcReqs.add(skc);
                    skc.setExtCode("SKC0001");
                } else if (Objects.equals(3001, productPropertyReq.getParentSpecId()) && CollectionUtil.isEmpty(productSkuReqs)) {
                    sku.setExtCode("SKU0001");
                    sku.setThumbUrl(url);
                    productSkuReqs.add(sku);
                    sku.setCurrencyType("CNY");
                    final var sp = new TemuGoodsAddReq.ProductSkcReq.ProductSkuReq.SiteSupplierPrice();
                    sp.setSiteId(100L);
                    sp.setSupplierPrice(100);
                    sku.setSiteSupplierPrices(List.of(sp));
                    final var extAttr = getExtAttrReq();
                    sku.setProductSkuWhExtAttrReq(extAttr);
                    final var productSkuStockQuantityReq = new TemuGoodsAddReq.ProductSkcReq.ProductSkuReq.ProductSkuStockQuantityReq();
                    final var wStock = new TemuGoodsAddReq.ProductSkcReq.ProductSkuReq.ProductSkuStockQuantityReq.WarehouseStockQuantityReq();
                    wStock.setTargetStockAvailable("0");
                    wStock.setWarehouseId("WH-03605491271812164");
                    productSkuStockQuantityReq.setWarehouseStockQuantityReqs(List.of(wStock));
//                            final var sq = new TemuGoodsAddReq.ProductSkcReq.ProductSkuReq.ProductSkuStockQuantityReq.WarehouseStockQuantityReq() ;
//                            sq.setWarehouseId("WH-03605491271812164");
//                            sq.setTargetStockAvailable("0");
//                            productSkuStockQuantityReq.setWarehouseStockQuantityReqs(List.of(sq));
                    sku.setProductSkuStockQuantityReq(productSkuStockQuantityReq);

//                            sku.setProductSkuSpecReqs(List.of(pks));
                }
            }
        });
//        if (CollectionUtils.isNotEmpty(productSpecPropertyReqs)) {
        req.setProductSpecPropertyReqs(productSpecPropertyReqs);
//        }
//        if (CollectionUtils.isNotEmpty(productPropertyReqs)) {
//            req.setProductPropertyReqs(productPropertyReqs);
        req.setProductSkcReqs(productSkcReqs);
//        }
        final var pea = new TemuGoodsAddReq.ProductWhExtAttrReq();
        final var ori = new TemuGoodsAddReq.ProductWhExtAttrReq.ProductOrigin();
        ori.setRegion2Id(43000000000006L);
        ori.setCountryShortName("CN");
        pea.setOuterGoodsUrl("https://oss.yunbanfang.cn/tiangong_f649a1a127c34521b1f3b56f9acbecd3.png");
        pea.setProductOrigin(ori);
        req.setProductWhExtAttrReq(pea);
        final var json = """
                [
                     {
                       "vid": 35391,
                       "valueUnit": "%",
                       "pid": 2,
                       "language": null,
                       "numberInputValue": "100",
                       "templatePid": 1453533,
                       "propValue": "棉Cotton",
                       "propName": "成分",
                       "valueExtendInfo": "",
                       "refPid": 15
                     },
                     {
                       "vid": 49,
                       "valueUnit": "",
                       "pid": 1,
                       "language": null,
                       "numberInputValue": "",
                       "templatePid": 1453534,
                       "propValue": "棉",
                       "propName": "材质",
                       "valueExtendInfo": "",
                       "refPid": 12
                     },
                     {
                       "vid": 29210,
                       "valueUnit": "",
                       "pid": 21,
                       "language": null,
                       "numberInputValue": "",
                       "templatePid": 1453540,
                       "propValue": "无",
                       "propName": "细节",
                       "valueExtendInfo": "",
                       "refPid": 83
                     },
                     {
                       "vid": 217,
                       "valueUnit": "",
                       "pid": 10,
                       "language": null,
                       "numberInputValue": "",
                       "templatePid": 1453541,
                       "propValue": "字母",
                       "propName": "图案",
                       "valueExtendInfo": "",
                       "refPid": 26
                     },
                     {
                       "vid": 210,
                       "valueUnit": "",
                       "pid": 7,
                       "language": null,
                       "numberInputValue": "",
                       "templatePid": 1453542,
                       "propValue": "否",
                       "propName": "是否透明",
                       "valueExtendInfo": "",
                       "refPid": 24
                     },
                     {
                       "vid": 645,
                       "valueUnit": "",
                       "pid": 24,
                       "language": null,
                       "numberInputValue": "",
                       "templatePid": 1453546,
                       "propValue": "ALL/全球/所有",
                       "propName": "季节",
                       "valueExtendInfo": "",
                       "refPid": 76
                     },
                     {
                       "vid": 26001,
                       "valueUnit": "",
                       "pid": 4,
                       "language": null,
                       "numberInputValue": "",
                       "templatePid": 1453547,
                       "propValue": "可机洗且不可干洗",
                       "propName": "护理说明",
                       "valueExtendInfo": "",
                       "refPid": 20
                     },
                     {
                       "vid": 145,
                       "valueUnit": "",
                       "pid": 3,
                       "language": null,
                       "numberInputValue": "",
                       "templatePid": 1453548,
                       "propValue": "休闲",
                       "propName": "风格",
                       "valueExtendInfo": "",
                       "refPid": 19
                     },
                     {
                       "vid": 35197,
                       "valueUnit": "",
                       "pid": 1364,
                       "language": null,
                       "numberInputValue": "",
                       "templatePid": 1453550,
                       "propValue": "微弹",
                       "propName": "面料弹性",
                       "valueExtendInfo": "",
                       "refPid": 1352
                     },
                     {
                       "vid": 36893,
                       "valueUnit": "",
                       "pid": 1437,
                       "language": null,
                       "numberInputValue": "",
                       "templatePid": 1453551,
                       "propValue": "定位印花",
                       "propName": "印花类型",
                       "valueExtendInfo": "",
                       "refPid": 1919
                     },
                     {
                       "vid": 70453,
                       "valueUnit": "",
                       "pid": 1514,
                       "language": null,
                       "numberInputValue": "",
                       "templatePid": 1453553,
                       "propValue": "现货款",
                       "propName": "款式来源",
                       "valueExtendInfo": "",
                       "refPid": 2103
                     },
                     {
                       "vid": 54654,
                       "valueUnit": "",
                       "pid": 1224,
                       "language": null,
                       "numberInputValue": "",
                       "templatePid": 1453554,
                       "propValue": "针织(含钩织、毛织面料)",
                       "propName": "织造方式",
                       "valueExtendInfo": "",
                       "refPid": 1192
                     },
                     {
                       "vid": 161198,
                       "valueUnit": "",
                       "pid": 2054,
                       "language": null,
                       "numberInputValue": "",
                       "templatePid": 1453557,
                       "propValue": "光面",
                       "propName": "面料纹理1",
                       "valueExtendInfo": "",
                       "refPid": 6926
                     },
                     {
                       "vid": 161112,
                       "valueUnit": "",
                       "pid": 2050,
                       "language": null,
                       "numberInputValue": "",
                       "templatePid": 1453559,
                       "propValue": "无里料/无内衬",
                       "propName": "里料纹理",
                       "valueExtendInfo": "",
                       "refPid": 6928
                     },
                     {
                       "vid": 0,
                       "valueUnit": "g/㎡",
                       "pid": 2052,
                       "language": null,
                       "numberInputValue": "",
                       "templatePid": 1453560,
                       "propValue": "180",
                       "propName": "面料克重1（g/m²)",
                       "valueExtendInfo": "",
                       "refPid": 6930
                     }
                   ]
                """;
        req.setProductPropertyReqs(JsonsKt.parseJsonList(json, TemuGoodsAddReq.ProductPropertyReq.class));
        final var text = """
                {
                    "sign": "8A9280D7C4F2A2B89C21E99273D4EC25",
                    "type": "bg.glo.goods.add",
                    "cat1Id": 27011,
                    "cat2Id": 28946,
                    "cat3Id": 28947,
                    "cat4Id": 28948,
                    "cat5Id": 28949,
                    "cat6Id": 0,
                    "cat7Id": 0,
                    "cat8Id": 0,
                    "cat9Id": 0,
                    "app_key": "73d08e5255d640a40f9d8ac48dd867db",
                    "cat10Id": 0,
                    "data_type": "JSON",
                    "timestamp": "1769250929",
                    "productName": "复古暗黑个性时尚风，适配秋冬日常出街 & 轻社交聚会场合造型",
                    "access_token": "zrrfh7jgg1rqg2nzapxoodbmulkvnlcon8ypon7keh1do9kguxvce414",
                    "materialImgUrl": "https://img.kwcdn.com/product/open/e46175b5264d499a9299a317db519713-goods.jpeg",
                    "productSkcReqs": [
                        {
                            "extCode": "526010002750101",
                            "previewImgUrls": [
                                "https://img.kwcdn.com/product/open/bd5a47e0c9734f919fc4b9e35358aba5-goods.jpeg",
                                "https://img.kwcdn.com/product/open/fccdeee825914a208b24b4ed45ab821e-goods.jpeg",
                                "https://img.kwcdn.com/product/open/79c3864784a04327869b4bbb876e82ff-goods.jpeg"
                            ],
                            "productSkuReqs": [
                                {
                                    "extCode": "526010002750101N-XS",
                                    "thumbUrl": "https://img.kwcdn.com/product/open/bd5a47e0c9734f919fc4b9e35358aba5-goods.jpeg",
                                    "currencyType": "CNY",
                                    "productSkuSpecReqs": [
                                        {
                                            "specId": 12001,
                                            "specName": "XS",
                                            "parentSpecId": 3001,
                                            "parentSpecName": "尺码"
                                        },
                                        {
                                            "specId": 16099,
                                            "specName": "抹茶色",
                                            "parentSpecId": 1001,
                                            "parentSpecName": "颜色"
                                        }
                                    ],
                                    "siteSupplierPrices": [
                                        {
                                            "siteId": 100,
                                            "supplierPrice": 100
                                        }
                                    ],
                                    "productSkuMultiPackReq": {
                                        "pieceUnitCode": 1,
                                        "numberOfPieces": 12,
                                        "skuClassification": 2,
                                        "individuallyPacked": "0"
                                    },
                                    "productSkuWhExtAttrReq": {
                                        "productSkuVolumeReq": {
                                            "len": 350,
                                            "width": 280,
                                            "height": 10
                                        },
                                        "productSkuWeightReq": {
                                            "value": 200000
                                        },
                                        "productSkuSensitiveAttrReq": {
                                            "isSensitive": 0
                                        }
                                    },
                                    "productSkuStockQuantityReq": {
                                        "warehouseStockQuantityReqs": [
                                            {
                                                "warehouseId": "WH-07170288087171379",
                                                "targetStockAvailable": "0"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "extCode": "526010002750101N-S",
                                    "thumbUrl": "https://img.kwcdn.com/product/open/bd5a47e0c9734f919fc4b9e35358aba5-goods.jpeg",
                                    "currencyType": "CNY",
                                    "productSkuSpecReqs": [
                                        {
                                            "specId": 10004,
                                            "specName": "S",
                                            "parentSpecId": 3001,
                                            "parentSpecName": "尺码"
                                        },
                                        {
                                            "specId": 16099,
                                            "specName": "抹茶色",
                                            "parentSpecId": 1001,
                                            "parentSpecName": "颜色"
                                        }
                                    ],
                                    "siteSupplierPrices": [
                                        {
                                            "siteId": 100,
                                            "supplierPrice": 100
                                        }
                                    ],
                                    "productSkuMultiPackReq": {
                                        "pieceUnitCode": 1,
                                        "numberOfPieces": 12,
                                        "skuClassification": 2,
                                        "individuallyPacked": "0"
                                    },
                                    "productSkuWhExtAttrReq": {
                                        "productSkuVolumeReq": {
                                            "len": 350,
                                            "width": 280,
                                            "height": 10
                                        },
                                        "productSkuWeightReq": {
                                            "value": 200000
                                        },
                                        "productSkuSensitiveAttrReq": {
                                            "isSensitive": 0
                                        }
                                    },
                                    "productSkuStockQuantityReq": {
                                        "warehouseStockQuantityReqs": [
                                            {
                                                "warehouseId": "WH-07170288087171379",
                                                "targetStockAvailable": "0"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "extCode": "526010002750101N-M",
                                    "thumbUrl": "https://img.kwcdn.com/product/open/bd5a47e0c9734f919fc4b9e35358aba5-goods.jpeg",
                                    "currencyType": "CNY",
                                    "productSkuSpecReqs": [
                                        {
                                            "specId": 9005,
                                            "specName": "M",
                                            "parentSpecId": 3001,
                                            "parentSpecName": "尺码"
                                        },
                                        {
                                            "specId": 16099,
                                            "specName": "抹茶色",
                                            "parentSpecId": 1001,
                                            "parentSpecName": "颜色"
                                        }
                                    ],
                                    "siteSupplierPrices": [
                                        {
                                            "siteId": 100,
                                            "supplierPrice": 100
                                        }
                                    ],
                                    "productSkuMultiPackReq": {
                                        "pieceUnitCode": 1,
                                        "numberOfPieces": 12,
                                        "skuClassification": 2,
                                        "individuallyPacked": "0"
                                    },
                                    "productSkuWhExtAttrReq": {
                                        "productSkuVolumeReq": {
                                            "len": 350,
                                            "width": 280,
                                            "height": 10
                                        },
                                        "productSkuWeightReq": {
                                            "value": 200000
                                        },
                                        "productSkuSensitiveAttrReq": {
                                            "isSensitive": 0
                                        }
                                    },
                                    "productSkuStockQuantityReq": {
                                        "warehouseStockQuantityReqs": [
                                            {
                                                "warehouseId": "WH-07170288087171379",
                                                "targetStockAvailable": "0"
                                            }
                                        ]
                                    }
                                }
                            ],
                            "mainProductSkuSpecReqs": [
                                {
                                    "specId": 16099,
                                    "specName": "抹茶色",
                                    "parentSpecId": 1001,
                                    "parentSpecName": "颜色"
                                }
                            ]
                        }
                    ],
                    "productI18nReqs": [
                        {
                            "language": "en",
                            "productName": "dark, and edgy style, suitable for everyday outings and casual social gatherings in autumn and winter"
                        }
                    ],
                    "sizeTemplateIds": [
                        17595069397275
                    ],
                    "showSizeTemplateIds": [
                        17595069397275
                    ],
                    "productShipmentReq": {
                        "freightTemplateId": "HFT-15751234341724371379",
                        "shipmentLimitSecond": "777600"
                    },
                    "productPropertyReqs": [
                        {
                            "pid": 5,
                            "vid": 170,
                            "refPid": 21,
                            "propName": "领型",
                            "propValue": "露肩/一字领",
                            "valueUnit": "",
                            "templatePid": 1000422,
                            "valueExtendInfo": "",
                            "numberInputValue": ""
                        },
                        {
                            "pid": 1437,
                            "vid": 36892,
                            "refPid": 1919,
                            "propName": "印花类型",
                            "propValue": "无印花",
                            "valueUnit": "",
                            "templatePid": 587676,
                            "valueExtendInfo": "",
                            "numberInputValue": ""
                        },
                        {
                            "pid": 1364,
                            "vid": 35196,
                            "refPid": 1352,
                            "propName": "面料弹性",
                            "propValue": "无弹",
                            "valueUnit": "",
                            "templatePid": 587675,
                            "valueExtendInfo": "",
                            "numberInputValue": ""
                        },
                        {
                            "pid": 1224,
                            "vid": 29810,
                            "refPid": 1192,
                            "propName": "织造方式",
                            "propValue": "梭织",
                            "valueUnit": "",
                            "templatePid": 900132,
                            "valueExtendInfo": "",
                            "numberInputValue": ""
                        },
                        {
                            "pid": 24,
                            "vid": 642,
                            "refPid": 76,
                            "propName": "季节",
                            "propValue": "夏",
                            "valueUnit": "",
                            "templatePid": 587667,
                            "valueExtendInfo": "",
                            "numberInputValue": ""
                        },
                        {
                            "pid": 23,
                            "vid": 1138,
                            "refPid": 84,
                            "propName": "类型",
                            "propValue": "抹胸",
                            "valueUnit": "",
                            "templatePid": 587665,
                            "valueExtendInfo": "",
                            "numberInputValue": ""
                        },
                        {
                            "pid": 21,
                            "vid": 549,
                            "refPid": 83,
                            "propName": "细节",
                            "propValue": "假纽扣",
                            "valueUnit": "",
                            "templatePid": 587658,
                            "valueExtendInfo": "",
                            "numberInputValue": ""
                        },
                        {
                            "pid": 10,
                            "vid": 219,
                            "refPid": 26,
                            "propName": "图案",
                            "propValue": "花朵印花",
                            "valueUnit": "",
                            "templatePid": 587659,
                            "valueExtendInfo": "",
                            "numberInputValue": ""
                        },
                        {
                            "pid": 7,
                            "vid": 209,
                            "refPid": 24,
                            "propName": "是否透明",
                            "propValue": "半透",
                            "valueUnit": "",
                            "templatePid": 587660,
                            "valueExtendInfo": "",
                            "numberInputValue": ""
                        },
                        {
                            "pid": 2054,
                            "vid": 161198,
                            "refPid": 6926,
                            "propName": "面料纹理1",
                            "propValue": "光面",
                            "valueUnit": "",
                            "templatePid": 1292803,
                            "valueExtendInfo": "",
                            "numberInputValue": ""
                        },
                        {
                            "pid": 4,
                            "vid": 165,
                            "refPid": 20,
                            "propName": "护理说明",
                            "propValue": "手洗或干洗",
                            "valueUnit": "",
                            "templatePid": 587668,
                            "valueExtendInfo": "",
                            "numberInputValue": ""
                        },
                        {
                            "pid": 3,
                            "vid": 136,
                            "refPid": 19,
                            "propName": "风格",
                            "propValue": "复古",
                            "valueUnit": "",
                            "templatePid": 587670,
                            "valueExtendInfo": "",
                            "numberInputValue": ""
                        },
                        {
                            "pid": 1,
                            "vid": 2,
                            "refPid": 12,
                            "propName": "材质",
                            "propValue": "亚麻",
                            "valueUnit": "",
                            "templatePid": 587672,
                            "valueExtendInfo": "",
                            "numberInputValue": ""
                        },
                        {
                            "pid": 2,
                            "vid": 35395,
                            "refPid": 6547,
                            "propName": "里衬成分",
                            "propValue": "粘胶(人棉)Viscose",
                            "valueUnit": "%",
                            "templatePid": 1300610,
                            "valueExtendInfo": "",
                            "numberInputValue": "100"
                        },
                        {
                            "pid": 2,
                            "vid": 35387,
                            "refPid": 15,
                            "propName": "成分",
                            "propValue": "锦纶(尼龙)Polyamide",
                            "valueUnit": "%",
                            "templatePid": 587677,
                            "valueExtendInfo": "",
                            "numberInputValue": "100"
                        },
                        {
                            "pid": 2050,
                            "vid": 161110,
                            "refPid": 6928,
                            "propName": "里料纹理",
                            "propValue": "光面",
                            "valueUnit": "",
                            "templatePid": 1295178,
                            "valueExtendInfo": "",
                            "numberInputValue": ""
                        },
                        {
                            "pid": 2052,
                            "vid": 0,
                            "refPid": 6934,
                            "propName": "里料克重（g/m²)",
                            "propValue": "123",
                            "valueUnit": "g/㎡",
                            "templatePid": 1299183,
                            "valueExtendInfo": "",
                            "numberInputValue": ""
                        },
                        {
                            "pid": 2052,
                            "vid": 0,
                            "refPid": 6930,
                            "propName": "面料克重1（g/m²)",
                            "propValue": "1",
                            "valueUnit": "g/㎡",
                            "templatePid": 1296426,
                            "valueExtendInfo": "",
                            "numberInputValue": ""
                        }
                    ],
                    "productWhExtAttrReq": {
                        "outerGoodsUrl": "",
                        "productOrigin": {
                            "region2Id": 43000000000006,
                            "countryShortName": "CN"
                        }
                    },
                    "productSemiManagedReq": {
                        "bindSiteIds": [
                            100
                        ]
                    },
                    "productSpecPropertyReqs": [
                        {
                            "pid": 13,
                            "vid": 512,
                            "refPid": 63,
                            "specId": 16099,
                            "propName": "颜色",
                            "specName": "抹茶色",
                            "propValue": "抹茶色",
                            "valueUnit": "",
                            "templatePid": 1144073,
                            "parentSpecId": 1001,
                            "valueGroupId": 6,
                            "parentSpecName": "颜色",
                            "valueGroupName": "绿色系",
                            "valueExtendInfo": "(183,186,107,1)",
                            "numberInputValue": ""
                        },
                        {
                            "pid": 14,
                            "vid": 313,
                            "refPid": 65,
                            "specId": 12001,
                            "propName": "尺码",
                            "specName": "XS",
                            "propValue": "XS",
                            "valueUnit": "",
                            "templatePid": 1144074,
                            "parentSpecId": 3001,
                            "valueGroupId": 2,
                            "parentSpecName": "尺码",
                            "valueGroupName": "中国码",
                            "valueExtendInfo": "",
                            "numberInputValue": ""
                        },
                        {
                            "pid": 14,
                            "vid": 315,
                            "refPid": 65,
                            "specId": 10004,
                            "propName": "尺码",
                            "specName": "S",
                            "propValue": "S",
                            "valueUnit": "",
                            "templatePid": 1144074,
                            "parentSpecId": 3001,
                            "valueGroupId": 2,
                            "parentSpecName": "尺码",
                            "valueGroupName": "中国码",
                            "valueExtendInfo": "",
                            "numberInputValue": ""
                        },
                        {
                            "pid": 14,
                            "vid": 317,
                            "refPid": 65,
                            "specId": 9005,
                            "propName": "尺码",
                            "specName": "M",
                            "propValue": "M",
                            "valueUnit": "",
                            "templatePid": 1144074,
                            "parentSpecId": 3001,
                            "valueGroupId": 2,
                            "parentSpecName": "尺码",
                            "valueGroupName": "中国码",
                            "valueExtendInfo": "",
                            "numberInputValue": ""
                        }
                    ],
                    "productWarehouseRouteReq": {
                        "targetRouteList": [
                            {
                                "siteIdList": [
                                    100
                                ],
                                "warehouseId": "WH-07170288087171379"
                            }
                        ]
                    },
                    "productCarouseVideoReqList": [
                        {
                            "vid": "goods-video-tag#lupc0olh8i6nmd8ckl1r79t8d50pws8w",
                            "width": 480,
                            "height": 480,
                            "coverUrl": "https://img.kwcdn.com/product/54c75665e101b318a04241781229aca4b2274975.goods.000001.jpeg",
                            "videoUrl": "https://goods-vod.kwcdn.com/goods-video/51e17c1fc7a7d3256b06e2585e41a27010f00154.f30.mp4"
                        }
                    ]
                }
                """;
        TemuShopContext.set(shopService.getApp(7412399196017574559L));
        final var data = this.service.addProduct(JsonsKt.parseJson(text, TemuGoodsAddReq.class));
        TemuShopContext.clear();
        this.print(data);
    }

    private TemuGoodsAddReq.ProductSkcReq.ProductSkuReq.ProductSkuWhExtAttrReq getExtAttrReq() {
        final var extAttr = new TemuGoodsAddReq.ProductSkcReq.ProductSkuReq.ProductSkuWhExtAttrReq();
        final var volume = new TemuGoodsAddReq.ProductSkcReq.ProductSkuReq.ProductSkuWhExtAttrReq.ProductSkuVolumeReq();
//        volume.setHeight(200);
//        volume.setWidth(100);
//        volume.setLen(50);
        volume.setHeight(10);
        volume.setWidth(280);
        volume.setLen(350);
        extAttr.setProductSkuVolumeReq(volume);
        final var w = new TemuGoodsAddReq.ProductSkcReq.ProductSkuReq.ProductSkuWhExtAttrReq.ProductSkuWeightReq();
        w.setValue(200000);
        extAttr.setProductSkuWeightReq(w);
        final var ssa = new TemuGoodsAddReq.ProductSkcReq.ProductSkuReq.ProductSkuWhExtAttrReq.ProductSkuSensitiveAttrReq();
        ssa.setIsSensitive(Bool.NO.getCode());
        extAttr.setProductSkuSensitiveAttrReq(ssa);
        return extAttr;
    }

    @Test
    void fileUpload() {
        final var data = this.service.fileUpload("https://oss.yunbanfang.cn/tiangong_cf9de5563e394d33981b13ba35d2d42d.png");
        this.print(data);
    }

    @Test
    void test() throws IOException {
        final var url = "https://oss.yunbanfang.cn/tiangong_f649a1a127c34521b1f3b56f9acbecd3.png";
        final var defaultHeaders = new HttpHeaders();
        defaultHeaders.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
        defaultHeaders.set("Accept", "image/*, */*");
        defaultHeaders.set("Accept-Language", "zh-CN,zh;q=0.9,en;q=0.8");
        defaultHeaders.set("Connection", "keep-alive");
        final var entity = new HttpEntity<>(defaultHeaders);
        ResponseEntity<byte[]> response = restTemplate.exchange(url, HttpMethod.GET, entity, byte[].class);
        if (response.getStatusCode() != HttpStatus.OK) {
            throw new IOException("HTTP请求失败，状态码: " + response.getStatusCode());
        }
        byte[] data = response.getBody();
//        final var data = FileUtil.readBytes(file);
        System.err.println("单元测试\t" + FileUtil.getMimeType(url));
        System.err.println("单元测试\t" + FileUtil.getSuffix(FileUtil.getName(url)));
        final var encode = Base64.getEncoder().encodeToString(data);

        System.err.println("单元测试\t" + encode);
//        final var type = new ParameterizedTypeReference<TemuCommonResp<TemuGoodsCatListResp>>() {
//        };
//        final var timestamp = LocalDateTimeUtil.toEpochMilli(LocalDateTime.now()) / 1000;
//        RestRequestContext.set(new RestLogDTO<>(TemuPartnerEnum.US, "bg.local.goods.cats.get", true, true));
//        final var req = new TemuGoodsCatReq();
//        req.setTimestamp(String.valueOf(timestamp));
//        req.setAccessToken(usTemuProperties.getAccessToken());
//        req.setAppKey(usTemuProperties.getAppKey());
//        req.setType("bg.local.goods.cats.get");
//        req.setParentCatId(27011L);
//        req.setLanguage("zh");
//        req.setLanguage("cn");
//        req.setSign(TemuUtils.sign(TemuConvert.convert(req), usTemuProperties.getAppSecret()));
//        final var data = TemuRestApi.post(JsonsKt.toJson(req), type);
//        this.print(data);
    }

    @Test
    void test2() {
        final var ids = new HashSet<Long>();
        final var list = this.temuProductTempValRepository.listByBaseAttrId(14L);
        list.forEach(it -> {
            final var attrValue = it.getAttrValue();
            if (StrUtil.isNotBlank(attrValue)) {
                final var valIds = JsonsKt.parseJsonList(attrValue, Long.class);
                ids.addAll(valIds);
            }
        });
        this.print(ids);
        final var groups = this.temuAttrGroupRepository.listByIds(List.of(2L, 4L, 1L, 3L, 5L, 16L));
        final var groupMap = BasicConvert.toMap(groups, TemuAttrGroup::getGroupId);
        final var values = this.temuAttrValueRepository.listByIds(ids);
        UserContexts.withSystemUser(() -> {
            this.temuSizeRepository.saveBatch(values.stream().map(it -> {
                final var Size = new TemuSize();
                Size.setSizeId(it.getValueId());
                Size.setSizeName(it.getVal());
                Size.setSpecId(it.getSpecId());
                Size.setGroupId(it.getGroupId());
                Size.setGroupName(groupMap.get(it.getGroupId()).getGroupName());
                Size.setAvailable(it.getAvailable());
                BasicConvert.entityInit(Size);
                return Size;
            }).toList());
        });
    }

    @Test
    void searchProduct() {
        final var req = new TemuSearchProductReq();
//        TemuShopContext.set(shopService.getApp(7414211164500201491L));
        TemuShopContext.set(getApp());
        req.setPageNum(1);
        req.setPageSize(10);
        req.setProductSkuIdList(List.of(68622687325L/*,
                91779633490L,
                15606263885L,
                41653185475L*/));
        this.print(this.service.searchProduct(req));
        TemuShopContext.clear();
    }

    @Test
    void getTokenInfo() {
        TemuShopContext.set(getApp());
        this.print(this.service.getTokenInfo());
        TemuShopContext.clear();
    }

    @Test
    void pagePriceReview() {
        TemuShopContext.set(getApp());
        final var req = new TemuProductPriceReviewPageReq();
        req.setPageNo(1);
        req.setPageSize(50);
        req.setOrderStatusList(List.of(0, 1, 5));
        this.print(this.service.pagePriceReview(req));
        TemuShopContext.clear();
    }

    @Test
    void pageListGetProduct() {
        TemuShopContext.set(getApp());
        final var req = new TemuProductListGetPageReq();
        req.setPage(1);
        req.setPageSize(50);
//        req.setSkcExtCode("87492516254");
//        req.setProductSkcIds(List.of(14235650972L, 94507378626L));
        req.setProductSkcIds(List.of(
                24654073651L,
                95150253417L,
                82167461093L,
                58987417011L,
                93937871460L,
                77386090977L,
                53230092607L,
                93997678365L,
                55847065342L,
                28624226514L,
                56244400001L,
                25006111422L,
                21620029995L,
                11901804204L,
                55088652927L,
                77244376068L,
                22566815268L,
                13189431575L,
                90883441529L,
                77888177537L,
                34616489098L,
                48781771924L,
                62720494466L,
                76128311305L,
                87232462825L,
                86276446391L,
                15520755732L,
                27252615751L,
                72092366325L,
                64119363236L
        ));
        final var resp = this.service.pageListGetProduct(req);
        this.print(resp);
        TemuShopContext.clear();
    }

    @Test
    void getStockQuantity() {
        TemuShopContext.set(getApp());
        final var req = new TemuProductQuantityGetReq();
        final var user = new TemuApiUserReq();
        user.setSupplierId(0L);
        req.setOpenApiUser(user);
        req.setProductSkcId(11453828351L);
        final var resp = this.service.getStockQuantity(req);
        this.print(resp);
        TemuShopContext.clear();
    }

    @Test
    void getPriceList() {
        TemuShopContext.set(getApp());
        final var req = new TemuProductPriceListGetReq();
        req.setProductSkuIds(List.of(90889100838L, 14317311569L, 95951464321L, 13347366001L, 97849593912L));
        final var resp = this.service.getPriceList(req);
        this.print(resp);
        TemuShopContext.clear();
    }
    @Test
    void confirmPriceReview() {
        TemuShopContext.set(getApp());
        final var req = new TemuProductPriceReviewConfirmReq();
        req.setOrderId(2603310600192588L);
        final var resp = this.service.confirmPriceReview(req);
        this.print(resp);
        TemuShopContext.clear();
    }

    @Test
    void getAccessoriesList() {
        TemuShopContext.set(getApp());
        final var req = new TemuProductAccessoriesListGetPageReq();
        req.setFuzzyValue("女");
        req.setPageSize(100);
        req.setPage(1);
        final var resp = this.service.getAccessoriesList(req);
        this.print(resp);
        TemuShopContext.clear();
    }

    @Test
    void test3() {
        final var appMap = BasicConvert.toMap(this.listApp(), TemuAppDTO::getShopName);
        final var codes = List.of("87492516254");
        codes.forEach(it -> appMap.forEach((k, v) -> {
            if (StrUtil.equalsIgnoreCase(k, "Zyloria Aura")) {
                TemuShopContext.set(v);
                final var req = new TemuProductListGetPageReq();
                req.setPage(1);
                req.setPageSize(50);
//                req.setSkcExtCode(it);
                final var resp = this.service.pageListGetProduct(req);
                this.print(resp);
                TemuShopContext.clear();
            }
        }));
    }

    private List<TemuAppDTO> listApp() {
        final var path = "C:\\repos\\xiniu\\sdp-curation\\sdp-curation-service\\src\\test\\kotlin\\shop_data.json";
        try {
            final var json = Files.readString(Path.of(path));
            return JsonsKt.parseJsonList(json, TemuAppDTO.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    private TemuAppDTO getApp() {
        final var dto = new TemuAppDTO();
        dto.setOrderToken("");
//        dto.setAccessToken("zpntdydrtunpuozi2wffikr8pwr6xnvwmyu6qmqlkb7u2gl2lzik68gq");
//        dto.setAppKey("52a64807bd435502f16027a01de9b0c2");
//        dto.setAppSecret("2722f711e916c9c9ce3168fa84666ca77c0cbd35");
//        dto.setAccessToken("ebpai94snfnq2lc4wcaqoev8qwqsknb07geevx6darv4swdys8rtdbty");
//        dto.setAppKey("73d08e5255d640a40f9d8ac48dd867db");
//        dto.setAppSecret("9c8248c161805068dab62267a59ab1ebd3d599bc");
        dto.setOrderToken("");
//        dto.setAccessToken("zpntdydrtunpuozi2wffikr8pwr6xnvwmyu6qmqlkb7u2gl2lzik68gq");
//        dto.setAppKey("52a64807bd435502f16027a01de9b0c2");
//        dto.setAppSecret("2722f711e916c9c9ce3168fa84666ca77c0cbd35");
        dto.setAccessToken("y9n2lfvydgdinz3aljapxptacoukiwuzlfiamjqpfau0s2pisf5quj5z");
        dto.setAppKey("52a64807bd435502f16027a01de9b0c2");
        dto.setAppSecret("2722f711e916c9c9ce3168fa84666ca77c0cbd35");
        dto.setShopId(7426870314035843481L);
        dto.setShopName("CiaoBella Local");
        return dto;
    }
}
