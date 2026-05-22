package tech.tiangong.sdp.service;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.aikero.admin.common.vo.DictVo;
import team.aikero.blade.auth.UserContexts;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.butted.common.vo.LabelValueVo;
import tech.tiangong.butted.common.vo.PredLabelVo;
import tech.tiangong.sdp.BasicTest;
import tech.tiangong.sdp.common.req.AiTaskCallbackReq;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.external.AiCategoryMappingApi;
import tech.tiangong.sdp.external.DictClientExternal;
import tech.tiangong.sdp.external.SdpMaterialDesignerApi;
import tech.tiangong.sdp.repository.DevelopStyleTaskRepository;
import tech.tiangong.sdp.service.impl.DevelopStyleTaskServiceImpl;
import tech.tiangong.sdp.vo.dto.DictDTO;
import tech.tiangong.sdp.vo.dto.FabricIdentifyDTO;
import tech.tiangong.sdp.vo.query.DevelopStyleTaskQuery;
import tech.tiangong.sdp.vo.req.DevelopStyleSpuAddReq;
import tech.tiangong.sdp.vo.req.DevelopStyleTaskAddReq;
import tech.tiangong.sdp.vo.req.DevelopStyleTaskPageReq;
import tech.tiangong.sdp.vo.resp.SkcImageResp;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * 单元测试
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/5 10:10
 */
@Slf4j
public class DevelopStyleTaskServiceTest extends BasicTest {
    @Autowired
    private DevelopStyleTaskServiceImpl developStyleTaskService;

    @Autowired
    private DevelopStyleTaskRepository developStyleTaskRepository;
    @Autowired
    private DictClientExternal dictClientExternal;

    @Test
    void test6() {
//        final var dict = dictClientExternal.listByDictCode("plm_reference_season");
        final var dict = dictClientExternal.listByDictCode("plm_standard_size");
//        final var dictMap = BasicConvert.toMap(dict.getChildren(), DictVo::getDictName);
//        print(dictMap);

        final var list = new ArrayList<DictDTO>();
//         Y01-Y0105-Y0105001
        BasicConvert.reverseDict(list, dict, null);
        print(list.stream().filter(it -> StrUtil.equalsIgnoreCase("C99",it.getDictCode())).toList());
//        final var colors = list.stream().filter(it -> StrUtil.equalsIgnoreCase("1", it.getDictCode()))
//                .filter(it -> CollectionUtil.isNotEmpty(it.getAttributes()))
//                .flatMap(it -> it.getAttributes().stream())
//                .filter(it -> StrUtil.equalsIgnoreCase("plm_value", it.getCode()))
//                .toList();
//        final var plms = colors.stream().flatMap(it -> it.getAttributes().stream()).filter(it -> StrUtil.equalsIgnoreCase("YSSH", it.getCode())).toList();
//        print(colors);
//        print(dict);
    }

    @Test
    void test4() {
//        this.print(AiCategoryMappingApi.listMapping());
        final var e = this.developStyleTaskRepository.getById(7392731021646618666L);
        log.info("单元测试\t{}", e.hasCategoryRec());
        log.info("单元测试\t{}", e.hasPredLabel());
        log.info("单元测试\t{}", e.hasPatternLabel());
        log.info("单元测试\t{}", e.hasFabricIdentify());
    }

    @Test
    void test3() {
        this.print(AiCategoryMappingApi.listMapping());
    }

    //    void reverseDict (final List<DictDTO> list , final DictVo dict, final DictVo parent) {
//        if (Objects.isNull(dict)) {
//            return;
//        }
//        final DictDTO node = BasicConvert.copy(dict , DictDTO.class);
//        node.setParentId(Objects.isNull(parent) ? 0L:parent.getId());
//        list.add(node);
//        final List<DictVo> children  = dict.getChildren() ;
//        if (CollectionUtil.isEmpty(children)) {
//            return;
//        }
//        // 递归处理子节点
//        for (DictVo child : children) {
//            reverseDict(list , child , dict);
//        }
//    }

    @Test
    void test5() {
        // PredLabelVo
        final var json = """
                [
                  {
                    "cn": {
                      "code": "FM240402584",
                      "name": "裙长",
                      "values": [
                        {
                          "code": "V240402290",
                          "name": "短裙",
                          "values": null
                        }
                      ]
                    },
                    "en": {
                      "code": null,
                      "name": "skirt length",
                      "values": [
                        {
                          "code": null,
                          "name": "Short skirt",
                          "values": null
                        }
                      ]
                    },
                    "coloroCodes": null
                  },
                  {
                    "cn": {
                      "code": "FM240402569",
                      "name": "廓形",
                      "values": [
                        {
                          "code": "V240402096",
                          "name": "A",
                          "values": null
                        }
                      ]
                    },
                    "en": {
                      "code": null,
                      "name": "silhouette",
                      "values": [
                        {
                          "code": null,
                          "name": "A",
                          "values": null
                        }
                      ]
                    },
                    "coloroCodes": null
                  },
                  {
                    "cn": {
                      "code": "FM240402568",
                      "name": "版型",
                      "values": [
                        {
                          "code": "V240402093",
                          "name": "合体",
                          "values": null
                        }
                      ]
                    },
                    "en": {
                      "code": null,
                      "name": "pattern",
                      "values": [
                        {
                          "code": null,
                          "name": "Fitted",
                          "values": null
                        }
                      ]
                    },
                    "coloroCodes": null
                  },
                  {
                    "cn": {
                      "code": "FM240402570",
                      "name": "裙型",
                      "values": [
                        {
                          "code": "V240402102",
                          "name": "A字裙",
                          "values": null
                        }
                      ]
                    },
                    "en": {
                      "code": null,
                      "name": "skirt",
                      "values": [
                        {
                          "code": null,
                          "name": "A-line skirt",
                          "values": null
                        }
                      ]
                    },
                    "coloroCodes": null
                  },
                  {
                    "cn": {
                      "code": "FM240402575",
                      "name": "袖长",
                      "values": [
                        {
                          "code": "V240402229",
                          "name": "无袖",
                          "values": null
                        }
                      ]
                    },
                    "en": {
                      "code": null,
                      "name": "sleeve length",
                      "values": [
                        {
                          "code": null,
                          "name": "Sleeveless",
                          "values": null
                        }
                      ]
                    },
                    "coloroCodes": null
                  },
                  {
                    "cn": {
                      "code": "FM240402580",
                      "name": "开襟方式",
                      "values": [
                        {
                          "code": "V240402261",
                          "name": "不开襟",
                          "values": null
                        }
                      ]
                    },
                    "en": {
                      "code": null,
                      "name": "front closure style",
                      "values": [
                        {
                          "code": null,
                          "name": "No Front Opening",
                          "values": null
                        }
                      ]
                    },
                    "coloroCodes": null
                  },
                  {
                    "cn": {
                      "code": "FM240402589",
                      "name": "季节",
                      "values": [
                        {
                          "code": "V240402323",
                          "name": "夏",
                          "values": null
                        }
                      ]
                    },
                    "en": {
                      "code": null,
                      "name": "season",
                      "values": [
                        {
                          "code": null,
                          "name": "Summer",
                          "values": null
                        }
                      ]
                    },
                    "coloroCodes": null
                  }
                ]
                """;
        final var labels = JsonsKt.parseJsonList(json, PredLabelVo.class);
        //
        final var tag = """
                织造方式:针织;裙长:超短裙,短裙
                """;

        final var tags = StrUtil.split(tag, ";");
//        final var labelMap = BasicConvert.groupingBy(labels, it -> it.getCn().getName());
//        this.print(labelMap);
        final Map<String, String> labelValue = new HashMap<>();
                /*labels.stream().collect(
                Collectors.groupingBy(it -> it.getCn().getName(),
//                        Collectors.mapping(it -> it.getCn().getValues().stream().map(LabelValueVo::getName).collect(Collectors.joining(StrUtil.COMMA)),
                        Collectors.mapping(it -> it.getCn().getValues().stream().map(LabelValueVo::getName).collect(Collectors.joining(StrUtil.COMMA)),
                                Collectors.joining(StrUtil.COMMA))));*/
        labels.forEach(it -> {
            final var cn = it.getCn();
            labelValue.putIfAbsent(cn.getName(), cn.getValues().getFirst().getName());
        });
        tags.forEach(it -> {
            final var vals = StrUtil.split(it, StrUtil.COLON);
            if (!StrUtil.contains(it, "织造方式")) {
                final var key = vals.getFirst();
                final var val = vals.getLast().replaceAll("\\n", "");
//            final var label = labelMap.get(key);
                final var value = labelValue.get(key);
//            if (CollectionUtil.isNotEmpty(value)) {
                if (StrUtil.isNotBlank(value)) {
                    log.info("单元测试\t{}", value);
//                this.print(value);
//                if (value.contains(val)) {
//                this.print(value);
//                }
                }
            }
        });
    }

    @Test
    void test1() {
//        final var color = "白色系 - 乳白色,黄色系 - 卡其色,黑色系 - 黑色,黑色系 - 黑灰色" ;
//        final var plmReferenceSeason = dictClientExternal.listByDictCode("plm_reference_season");
//        final var clothingCategory = dictClientExternal.listByDictCode("clothing_category");
//        this.print(clothingCategory);
        final var plmCategory = dictClientExternal.listByDictCode("clothing_color");
        this.print(plmCategory);
        final var list = new ArrayList<DictDTO>();
        // Y01-Y0105-Y0105001
        final var codes = "Y01-Y0105-Y0105001";
        final var codeList = StrUtil.split(codes, "-");
        final var lastCode = codeList.getLast();
        BasicConvert.reverseDict(list, plmCategory, null);
        final var dictMap = BasicConvert.toMap(list, DictDTO::getId);
        final var categoryCode = new ArrayList<String>();
        final var categoryName = new ArrayList<String>();
        list.stream()
                .filter(it -> CollectionUtil.isNotEmpty(it.getAttributes()))
                .filter(it -> /*StrUtil.equalsIgnoreCase(lastCode, it.getDictName())*/
                        it.getAttributes().stream().anyMatch(a -> StrUtil.equalsIgnoreCase(lastCode, a.getName())))
                .forEach(it -> {
//                    this.print(it);
                    DictDTO node = it;
                    do {
                        categoryCode.add(node.getDictCode());
                        categoryName.add(node.getDictName());
                        node = dictMap.get(node.getParentId());
//                        this.print(node);
                    } while (!Objects.equals(0L, node.getParentId()));
                });
//        Collections.reverse(categoryCode);
//        Collections.reverse(categoryName);
//        System.out.println(categoryCode.size());
//        log.info("字典编码\t{}", StrUtil.join("-", IntStream.range(0, categoryCode.size())
//                .mapToObj(i -> categoryCode.get(categoryCode.size() - 1 - i))
//                .toList()));
//        log.info("字典名称\t{}", StrUtil.join("-", IntStream.range(0, categoryName.size())
//                .mapToObj(i -> categoryName.get(categoryName.size() - 1 - i))
//                .toList()));
//        final DictDTO root = BasicConvert.copy(plmCategory , DictDTO.class);
//        root.setParentId(0L);
//        list.add(root);
        // Y01-Y0105-Y0105001
//        this.print(plmCategory);
//        final List<DictVo> children  = Objects.requireNonNullElse(plmCategory.getChildren(), Collections.emptyList() );
//        while (true) {
//            plmCategory.getChildren();
//            break;
//        }
//        this.print(list);
//        this.print(children);
//        final var season = "[94]夏";
//        final var name = StrUtil.contains(season, "]") ? StrUtil.split(season, "]").getLast() : season;
//        this.print(plmReferenceSeason);
//        final List<DictVo> children = Objects.requireNonNullElse(plmReferenceSeason.getChildren(), Collections.emptyList());
//        children
//                .stream()
//                .filter(it -> Objects.nonNull(it.getChildren()) && CollectionUtil.isNotEmpty(it.getChildren()))
//                .flatMap(it -> it.getChildren().stream())
//                .filter(it -> Objects.nonNull(it.getAttributes()) && CollectionUtil.isNotEmpty(it.getAttributes()))
//                .filter(it ->
//                        it.getAttributes().stream()
//                                .anyMatch(a ->
//                                        StrUtil.contains(a.getName(), name) && StrUtil.contains(a.getCode(), "model")))
//                .findFirst().ifPresentOrElse(this::print,() -> log.info("不存在"));

//        final var colors = StrUtil.split(color,StrUtil.COMMA);
//        final List<DictVo> children = Objects.requireNonNullElse(clothingColor.getChildren(), Collections.emptyList());
//        children
//                .stream()
//                .filter(it -> Objects.nonNull(it.getChildren()) && CollectionUtil.isNotEmpty(it.getChildren()))
//                .forEach(it -> {
//                    final var name = it.getDictName() ;
//                    colors.forEach(c ->{
//                       final var cols = StrUtil.split(c," - ");
//                       if (StrUtil.equalsIgnoreCase(name,cols.getFirst())) {
//                           it.getChildren().forEach(child -> {
//                               if (StrUtil.equalsIgnoreCase(child.getDictName(),cols.getLast())) {
//                                   this.print(child);
//                               }
//                           });
//                       }
//                    });
//                }) ;
//                .findFirst().ifPresentOrElse(this::print, () -> log.error("颜色\t{}\t没有对应的字典", color));
    }

    @Test
    void job() {
        UserContexts.withSystemUser(() -> this.developStyleTaskService.job());
    }

    @Test
    void callbackClip() {
//        this.print(dictClientExternal.listByDictCode("fd-printing"));
//      this.developStyleTaskService.setPrinting(developStyleTaskRepository.getById(7391354109615521793L) ,"Logo印款");
        final var json = """
                {
                  "busId": 7391375635240816643,
                  "busCode": "KK251124000003",
                  "taskAttribute": null,
                  "callback": "https://qa-xiniu-nest-api.textile-story.com/sdp-curation/open/v1/develop-style/callback/clip",
                  "tenantId": 1,
                  "creatorId": 151240195,
                  "creatorName": "覃文轩",
                  "source": "DEVELOP_STYLE",
                  "inputImage": "https://oss.yunbanfang.cn/tiangong_8fa8b3012d4547489cb635fc221fca52.jpg"
                }
                """;
        UserContexts.withSystemUser(() -> this.developStyleTaskService.callbackClip(JsonsKt.parseJson(json, AiTaskCallbackReq.class)));
    }

    @Test
    void callbackPatternCheck() {
//        this.print(dictClientExternal.listByDictCode("fd-printing"));
//      this.developStyleTaskService.setPrinting(developStyleTaskRepository.getById(7391354109615521793L) ,"Logo印款");
        final var json = """
                {
                   "modelType" : "PATTERN_CHECK",
                   "busId" : 7391642076598878218,
                   "taskId" : 7391642077186037231,
                   "taskStatus" : 30,
                   "taskProgress" : 100,
                   "message" : "success",
                   "resImgList" : null
                 }
                """;
        UserContexts.withSystemUser(() -> this.developStyleTaskService.callbackPatternCheck(JsonsKt.parseJson(json, AiTaskCallbackReq.class)));
    }

    @Test
    void test() {
        this.print(SdpMaterialDesignerApi.listDesignerGroup());
    }

    @Test
    void test0() {
        final var req = new DevelopStyleTaskQuery();
        req.setCategoryCodes(List.of("010102"));
        req.setIdentifyStatus(0);
        final var resp = developStyleTaskRepository.groupTotal(req);
        this.print(resp);
    }

    @Test
    void page() {
        final var req = new DevelopStyleTaskPageReq();
//        req.setTaskCode("KK251113000010 KK251113000009,KK251113000008");
//        req.setTaskStatus(30);
        req.setIdentifyStatus(50);
        ;
        this.print(this.developStyleTaskService.page(req));
    }

    @Test
    void importExcel() {
        try (final var in = Files.newInputStream(Path.of("C:\\Users\\qinzh\\Downloads\\导入开款任务模板(1).xlsx"))) {
            final var resp = developStyleTaskService.importExcel(in);
            this.print(resp);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void batchDevelop() {
        final var json = """
                [
                  {
                    "creatorId": "191104913",
                    "creatorName": "毛宇哲",
                    "createdTime": 1762763959000,
                    "reviserId": "191104913",
                    "reviserName": "毛宇哲",
                    "revisedTime": 1762763959000,
                    "taskId": "7386307323532181506",
                    "taskCode": "KK251110000054",
                    "taskStatus": 10,
                    "styleType": "SPOT_STYLE",
                    "supplierName": "1",
                    "supplierStyleCode": "1",
                    "commodityLink": "1",
                    "price": 1,
                    "wavebandCode": "6",
                    "wavebandName": "6月",
                    "categoryCode": "010101",
                    "categoryName": "衬衫",
                    "styleLabelCode": "tm",
                    "styleLabelName": "TM全托-定向款",
                    "storeId": "7383675186509258754",
                    "storeName": "lzh店铺11",
                    "mainImgUrl": "https://oss.yunbanfang.cn/tiangong_21c3a8350ee04edfbfa1a1326d63e9dd.jpg",
                    "spuCode": null,
                    "styleCheckerName": "毛宇哲",
                    "styleCheckerId": "191104913",
                    "checkTime": 1762763966000,
                    "checkResult": 2,
                    "platformCode": "A1",
                    "platformName": "反季现货",
                    "submitTime": null,
                    "developerId": null,
                    "developerName": null,
                    "message": null,
                    "relaType": null,
                    "relaId": "0",
                    "relaCode": "",
                    "pictures": [
                      {
                        "creatorId": null,
                        "creatorName": null,
                        "createdTime": null,
                        "reviserId": null,
                        "reviserName": null,
                        "revisedTime": null,
                        "imageId": "7386307323653816324",
                        "imageUrl": "https://oss.yunbanfang.cn/tiangong_21c3a8350ee04edfbfa1a1326d63e9dd.jpg",
                        "pictureType": "MAIN_IMAGE"
                      }
                    ],
                    "remark": [],
                    "categoryList": [
                      "01",
                      "0101",
                      "010101"
                    ],
                    "colorList": [
                      [
                        "花色系111",
                        "蓝粉花色"
                      ]
                    ],
                    "skcs": [
                      {
                        "color": "蓝粉花色",
                        "colorEnName": "huasese"
                      }
                    ],
                    "waveBandCode": "6",
                    "waveBandName": "6月",
                    "styleLevelCode": "s",
                    "styleLevelName": "S级",
                    "visualFormCode": "model",
                    "visualFormName": "模拍",
                    "clothingStyleCode": "vocation",
                    "clothingStyleName": "熟龄度假",
                    "seasonCode": "1",
                    "seasonName": "春装",
                    "galaCode": "christmas",
                    "galaName": "圣诞节",
                    "sceneCode": "daily",
                    "sceneName": "通勤",
                    "printingCode": "01",
                    "printingName": "净色",
                    "skuClassCode": "1",
                    "skuClassName": "单品",
                    "sizeStandardCode": "tiangong_code_standard",
                    "sizeStandardName": "字母码",
                    "weaveModeCode": "03",
                    "weaveModeName": "梭织",
                    "qualityLevelCode": "plm_quality_level_yx",
                    "qualityLevelName": "一线"
                  }
                ]
                """;
        this.developStyleTaskService.batchDevelop(JsonsKt.parseJsonList(json, DevelopStyleSpuAddReq.class));
    }

    @Test
    void batchCreate() {
        final var json = """
                [
                   {
                     "price": 1,
                     "supplierName": "2",
                     "supplierStyleCode": "2",
                     "commodityLink": "",
                     "images": [],
                     "styleType": "AI_STYLE",
                     "mainImgUrl": "https://oss.yunbanfang.cn/tiangong_0c772b62d2c14932a9701c6eee43cac4.jpg"
                   },
                   {
                     "price": 3,
                     "supplierName": "2",
                     "supplierStyleCode": "2",
                     "commodityLink": "",
                     "images": [],
                     "styleType": "AI_STYLE",
                     "mainImgUrl": "https://oss.yunbanfang.cn/tiangong_0316ee09ddab4bb9ade5e93fb44b1a29.jpg"
                   }
                 ]
                """;
        this.developStyleTaskService.batchCreate(JsonsKt.parseJsonList(json, DevelopStyleTaskAddReq.class));
    }

    @Test
    void pushTask() {
        UserContexts.withSystemUser(() -> this.developStyleTaskService.pushTask(7391282113963737116L));
    }

    @Test
    void test2() {
        final var json = """
                {
                  "category": "上装",
                  "面料材质": "聚酯纤维(涤纶）",
                  "透明度": "不透",
                  "面料弹性": "无弹",
                  "织造方式": "梭织",
                  "面料纹理": "光面"
                }
                """;
        print(JsonsKt.parseJson(json, FabricIdentifyDTO.class));
    }

    @Test
    void listSameSkc() {
//        print(developStyleTaskService.listSameSkc(List.of(7433021633184866673L,7433021633214226811L,7433021633205838198L)));
        print(developStyleTaskService.listSameSkc(List.of(7434436476781682750L)));
    }

    @Test
    void historyVector() {
        UserContexts.withSystemUser(() -> developStyleTaskService.historyVector());
    }

    @Test
    void test7() {
        final var json = """
                [ {
                  "imageId" : 7433063133335720509,
                  "skcId" : 7433063131280511531,
                  "skcCode" : "B52603190000009",
                  "type" : "full",
                  "score" : -1.1920929E-7,
                  "developTaskId" : 7433063323224445506
                }, {
                  "imageId" : 7433062940255130146,
                  "skcId" : 7433062800278622719,
                  "skcCode" : "526030011980101",
                  "type" : "full",
                  "score" : -1.1920929E-7,
                  "developTaskId" : 7433063323224445506
                }, {
                  "imageId" : 7433062940255130146,
                  "skcId" : 7433062800278622719,
                  "skcCode" : "526030011980101",
                  "type" : "down",
                  "score" : 0.3676914,
                  "developTaskId" : 7433063323224445506
                }, {
                  "imageId" : 7433063133335720509,
                  "skcId" : 7433063131280511531,
                  "skcCode" : "B52603190000009",
                  "type" : "down",
                  "score" : 0.3676914,
                  "developTaskId" : 7433063323224445506
                }, {
                  "imageId" : 7433063133335720509,
                  "skcId" : 7433063131280511531,
                  "skcCode" : "B52603190000009",
                  "type" : "up",
                  "score" : 0.37064898,
                  "developTaskId" : 7433063323224445506
                }, {
                  "imageId" : 7433062940255130146,
                  "skcId" : 7433062800278622719,
                  "skcCode" : "526030011980101",
                  "type" : "up",
                  "score" : 5.9604645E-8,
                  "developTaskId" : 7433063323224445506
                }, {
                  "imageId" : 7433063133335720509,
                  "skcId" : 7433063131280511531,
                  "skcCode" : "B52603190000009",
                  "type" : "up",
                  "score" : 5.9604645E-8,
                  "developTaskId" : 7433063323224445506
                }, {
                  "imageId" : 7433063133335720509,
                  "skcId" : 7433063131280511531,
                  "skcCode" : "B52603190000009",
                  "type" : "full",
                  "score" : 0.37064898,
                  "developTaskId" : 7433063323224445506
                }, {
                  "imageId" : 7433062940255130146,
                  "skcId" : 7433062800278622719,
                  "skcCode" : "526030011980101",
                  "type" : "full",
                  "score" : 0.37064898,
                  "developTaskId" : 7433063323224445506
                }, {
                  "imageId" : 7433063133335720509,
                  "skcId" : 7433063131280511531,
                  "skcCode" : "B52603190000009",
                  "type" : "down",
                  "score" : 0.5285139,
                  "developTaskId" : 7433063323224445506
                }, {
                  "imageId" : 7433063133335720509,
                  "skcId" : 7433063131280511531,
                  "skcCode" : "B52603190000009",
                  "type" : "down",
                  "score" : 5.9604645E-8,
                  "developTaskId" : 7433063323224445506
                }, {
                  "imageId" : 7433062940255130146,
                  "skcId" : 7433062800278622719,
                  "skcCode" : "526030011980101",
                  "type" : "down",
                  "score" : 5.9604645E-8,
                  "developTaskId" : 7433063323224445506
                }, {
                  "imageId" : 7433062940255130146,
                  "skcId" : 7433062800278622719,
                  "skcCode" : "526030011980101",
                  "type" : "full",
                  "score" : 0.3676914,
                  "developTaskId" : 7433063323224445506
                }, {
                  "imageId" : 7433063133335720509,
                  "skcId" : 7433063131280511531,
                  "skcCode" : "B52603190000009",
                  "type" : "full",
                  "score" : 0.3676914,
                  "developTaskId" : 7433063323224445506
                }, {
                  "imageId" : 7433063133335720509,
                  "skcId" : 7433063131280511531,
                  "skcCode" : "B52603190000009",
                  "type" : "up",
                  "score" : 0.5285139,
                  "developTaskId" : 7433063323224445506
                } ]
                """;
        final List<SkcImageResp> list = JsonsKt.parseJsonList(json, SkcImageResp.class);
        print(list.stream().sorted(Comparator.comparingDouble((SkcImageResp s)-> Math.abs(s.getScore() ))));
    }
}
