package tech.tiangong.sdp.service;

import cn.hutool.core.util.StrUtil;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.aikero.blade.auth.UserContexts;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.butted.common.enums.BizSourceEnum;
import tech.tiangong.butted.common.req.ClipLabelTaskReq;
import tech.tiangong.sdp.BasicTest;
import tech.tiangong.sdp.common.req.BuyerBaseSkcPageReq;
import tech.tiangong.sdp.common.req.SpotSkcCancelReq;
import tech.tiangong.sdp.entity.SpotStyleTask;
import tech.tiangong.sdp.external.ClipLabelApi;
import tech.tiangong.sdp.external.DictValueRemoteHelper;
import tech.tiangong.sdp.external.PlmBuyerApi;
import tech.tiangong.sdp.external.PlmConvertHelper;
import tech.tiangong.sdp.repository.SpotStyleSkcRepository;
import tech.tiangong.sdp.utils.UserInvoke;
import tech.tiangong.sdp.vo.dto.FashionTitleAnalysisDTO;
import tech.tiangong.sdp.vo.dto.PatternDataDTO;
import tech.tiangong.sdp.vo.req.*;

import java.util.ArrayList;
import java.util.List;

/**
 * 单元测试
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/6 16:09
 */
@Slf4j
public class SpotStyleTaskServiceTest extends BasicTest {
    @Autowired
    private SpotStyleTaskService spotStyleTaskService;
    @Autowired
    private DictValueRemoteHelper dictValueRemoteHelper;
    @Autowired
    private SpotStyleSkcRepository spotStyleSkcRepository;

    @Test
    void page() {
        // {"pageNum":1,"pageSize":20,"upcoming":"NO","dataCompleted":"YES"}
        final var req = new SpotStyleTaskPageReq();
//        req.setTaskCode("25120800002");
//        req.setSkcCode("XHC251117 00000");
//        req.setCreatorId(151240195L);
        req.setUpcoming(Bool.NO);
//        req.setSupplierName("lzh123");
        this.print(this.spotStyleTaskService.page(req));
    }

    @Test
    void detailId() {
        this.print(this.spotStyleTaskService.detailId(7388752527325503510L));
    }

    @Test
    void batchCancel() {
        final var json = """
                [
                  {
                    "taskId": "7386301666192244759",
                    "message": "这是取消圆心"
                  }
                ]
                """;
        this.print(this.spotStyleTaskService.batchCancel(JsonsKt.parseJsonList(json, SpotStyleCancelReq.class)));
    }

    @Test
    void batchCancelSkc() {
        final var json = """
                [
                  {
                    "skcId": "7395374023020060679",
                    "message": "这是测试取消"
                  }
                ]
                """;
        this.print(this.spotStyleTaskService.batchCancelSkc(JsonsKt.parseJsonList(json, SpotStyleSkcCancelReq.class)));
    }

    @Test
    void batchReColor() {
        final var json = """
                [
                  {
                    "taskId": 7395374022600630273,
                    "parentId": 7394971013194318042,
                    "mainImgUrl": "https://oss.yunbanfang.cn/tiangong_611d645e287f4ec6a6ae9d2dc5e4214c.jpg",
                    "color": "高牢黑",
                    "colorEnName": "Fast Black",
                    "sizeStandardName": "XS-2XS",
                    "sizeStandardCode": "XS-2XS",
                    "productImages": [
                      "https://oss.yunbanfang.cn/tiangong_611d645e287f4ec6a6ae9d2dc5e4214c.jpg"
                    ]
                  }
                ]
                """;
        this.print(this.spotStyleTaskService.batchReColor(JsonsKt.parseJsonList(json, SpotStyleSkcReColorReq.class)));
    }

    @Test
    void batchOnShelves() {
        this.spotStyleTaskService.batchOnShelves(List.of(7398983438738616338L));
    }

    @Test
    void batchBuyerCancel() {
        final var req = new SpotSkcCancelReq("B2512070000002", "测试买手取消");
        req.setCreatorId(151240195L);
        req.setCreatorName("覃文轩");
        req.setTenantId(1L);
        this.spotStyleTaskService.batchBuyerCancel(List.of(req));
    }

    @Test
    void listOpt() {
        this.print(this.spotStyleTaskService.listOpt(List.of(7395374022600630273L)));
    }

    @Test
    void edit() {
        final var json = """
                {
                  "taskId": "7396720303478539506",
                  "creatorId": "142751354",
                  "creatorName": "焦霞艳",
                  "createdTime": 1765246607000,
                  "reviserId": "142751354",
                  "reviserName": "焦霞艳",
                  "revisedTime": 1765246627000,
                  "taskCode": "25120900001",
                  "hasMainImg": "YES",
                  "dataCompleted": "YES",
                  "cancelled": "NO",
                  "styleType": "SPOT_STYLE",
                  "mainImgUrl": "https://oss.yunbanfang.cn/tiangong_918b3e5868bd4226bc299541d5895664.jpg",
                  "supplyModeName": "无",
                  "supplyModeCode": "无",
                  "storeId": "7388860772798967809",
                  "storeName": "店铺3",
                  "sceneName": null,
                  "sceneCode": null,
                  "qualityLevelName": "准二线",
                  "qualityLevelCode": "plm_quality_level_zex",
                  "styleLevelName": "S级",
                  "styleLevelCode": "s",
                  "weaveModeCode": "01",
                  "weaveModeName": "针/梭织",
                  "waveBandCode": "7",
                  "waveBandName": "7月",
                  "categoryName": "女装-上装-T恤",
                  "sizeStandardName": "字母码",
                  "sizeStandardCode": "tiangong_code_standard",
                  "clothingStyleName": "熟龄度假",
                  "spotStyleTypeCode": "SPOT_STYLE",
                  "spotStyleTypeName": "现货管理",
                  "platformCode": "A1",
                  "platformName": "反季现货",
                  "printingCode": "01",
                  "printingName": "净色",
                  "patternCode": "02",
                  "patternName": "适中",
                  "elasticCode": "01",
                  "elasticName": "无弹",
                  "seasonCode": "2",
                  "seasonName": "春夏",
                  "galaCode": "christmas",
                  "galaName": "圣诞节",
                  "visualFormCode": "model",
                  "visualFormName": "模拍",
                  "skuClassCode": "",
                  "skuClassName": "",
                  "commodityLink": "",
                  "developerId": null,
                  "developerName": null,
                  "submitTime": null,
                  "styleLabelCode": "tm",
                  "styleLabelName": "TM全托-定向款",
                  "checkPriceId": null,
                  "checkPricer": null,
                  "checkPriceTime": null,
                  "clothGrossWeight": 1,
                  "imageUpdateId": null,
                  "imageUpdateCode": null,
                  "imageUpdateStatus": 90,
                  "imageUpdateTime": null,
                  "palletTypeName": "无",
                  "palletTypeCode": "无",
                  "suitPiece": 0,
                  "ingredients": [
                    {
                      "ingredientId": "7396720303512093944",
                      "ingredientCode": "3",
                      "ingredientName": "亚麻",
                      "ingredientRatio": 100
                    }
                  ],
                  "suppliers": [
                    {
                      "taskId": "7396720303478539506",
                      "taskCode": null,
                      "supplierId": "7396720303512093945",
                      "supplierCode": null,
                      "supplierName": "小焦",
                      "payeeId": null,
                      "payeeCode": null,
                      "payeeName": "22",
                      "supplierStyleCode": "33",
                      "purchasePrice": 9999.99
                    }
                  ],
                  "skcs": [
                    {
                      "skcId": "7396737257316757519",
                      "skcCode": "B2512090000009",
                      "hasMainImg": "YES",
                      "dataCompleted": "YES",
                      "upcoming": "NO",
                      "onShelves": "NO",
                      "cancelled": "NO",
                      "sold": "NO",
                      "pushedBuyer": "YES",
                      "pushFailed": "NO",
                      "buyerCancelled": "NO",
                      "mainImgUrl": "https://oss.yunbanfang.cn/tiangong_0149af106b5e43c6a29a90b239208485.jpg",
                      "colorEnName": "Fast Black",
                      "submitTime": null,
                      "sizeStandardName": "M",
                      "sizeStandardCode": "M",
                      "createdTime": 1765250649000,
                      "revisedTime": 1765250649000,
                      "message": null,
                      "failMessage": null,
                      "buyerCancelMessage": null,
                      "saleTime": null,
                      "productImages": [
                        "https://oss.yunbanfang.cn/tiangong_0149af106b5e43c6a29a90b239208485.jpg",
                        "https://oss.yunbanfang.cn/tiangong_ba455fca164d40a2974c3b238b1f28e2.png",
                        "https://oss.yunbanfang.cn/tiangong_dc1e7a4bb4724a98af8d8cac1c055d51.jpg",
                        "https://oss.yunbanfang.cn/tiangong_6e869cf2d9b64fcfa692d82183e4f9aa.png",
                        "https://oss.yunbanfang.cn/tiangong_41a731a151094c60a829018a6c518eeb.png",
                        "https://oss.yunbanfang.cn/tiangong_9af80c08aaba4d9cb95d9f470554576a.png",
                        "https://oss.yunbanfang.cn/tiangong_059d5d2d20204b3e8b65af14321285d8.png"
                      ],
                      "color": "高牢黑"
                    },
                    {
                      "skcId": "7396731270388200330",
                      "skcCode": "B2512090000005",
                      "hasMainImg": "YES",
                      "dataCompleted": "YES",
                      "upcoming": "NO",
                      "onShelves": "NO",
                      "cancelled": "NO",
                      "sold": "NO",
                      "pushedBuyer": "YES",
                      "pushFailed": "NO",
                      "buyerCancelled": "YES",
                      "mainImgUrl": "https://oss.yunbanfang.cn/tiangong_b6b1fa18ada74e17b47c6a09c783597a.png",
                      "colorEnName": "White",
                      "submitTime": null,
                      "sizeStandardName": "L",
                      "sizeStandardCode": "L",
                      "createdTime": 1765249222000,
                      "revisedTime": 1765249991000,
                      "message": null,
                      "failMessage": null,
                      "buyerCancelMessage": "客户不需要客户不需要了客户不需要了客户不需要了",
                      "saleTime": null,
                      "productImages": [
                        "https://oss.yunbanfang.cn/tiangong_b6b1fa18ada74e17b47c6a09c783597a.png",
                        "https://oss.yunbanfang.cn/tiangong_c4777552241e44e9be2f189bdf27836d.png",
                        "https://oss.yunbanfang.cn/tiangong_38b5fb7773134eea9fd43d89e4bb21a6.png"
                      ],
                      "color": "白色"
                    },
                    {
                      "skcId": "7396727289431667571",
                      "skcCode": "B2512090000004",
                      "hasMainImg": "YES",
                      "dataCompleted": "YES",
                      "upcoming": "NO",
                      "onShelves": "NO",
                      "cancelled": "NO",
                      "sold": "NO",
                      "pushedBuyer": "NO",
                      "pushFailed": "YES",
                      "buyerCancelled": "NO",
                      "mainImgUrl": "https://oss.yunbanfang.cn/tiangong_22271ebd418e41388d8219677ec61167.png",
                      "colorEnName": "Lotus Pink",
                      "submitTime": null,
                      "sizeStandardName": "S",
                      "sizeStandardCode": "S",
                      "createdTime": 1765248272000,
                      "revisedTime": 1765248317000,
                      "message": null,
                      "failMessage": "PLM买手新增失败[{\\"message\\":\\"颜色编码不能为空\\",\\"propertyName\\":\\"colorCode\\"},{\\"message\\":\\"款式颜色不能为空\\",\\"propertyName\\":\\"color\\"}](877c8689fc4cf8c4)",
                      "buyerCancelMessage": null,
                      "saleTime": null,
                      "productImages": [
                        "https://oss.yunbanfang.cn/tiangong_22271ebd418e41388d8219677ec61167.png",
                        "https://oss.yunbanfang.cn/tiangong_229f6be09144425c9ee9eccc49bad35a.png",
                        "https://oss.yunbanfang.cn/tiangong_b1c00c67975c45edb9fb05312589b16e.jpg",
                        "https://oss.yunbanfang.cn/tiangong_c29767f32b624f6dbcd456a6f1bd29c9.jpg",
                        "https://oss.yunbanfang.cn/tiangong_bd653c797dd044f9b965c5aa1d669f86.png"
                      ],
                      "color": "藕粉色"
                    },
                    {
                      "skcId": "7396725779465449473",
                      "skcCode": "B2512090000002",
                      "hasMainImg": "YES",
                      "dataCompleted": "YES",
                      "upcoming": "NO",
                      "onShelves": "NO",
                      "cancelled": "YES",
                      "sold": "NO",
                      "pushedBuyer": "YES",
                      "pushFailed": "NO",
                      "buyerCancelled": "YES",
                      "mainImgUrl": "https://oss.yunbanfang.cn/tiangong_a6d92941aa574d5391218d6b3b5ccda8.jpg",
                      "colorEnName": "Reactive Black",
                      "submitTime": null,
                      "sizeStandardName": "M",
                      "sizeStandardCode": "M",
                      "createdTime": 1765247913000,
                      "revisedTime": 1765250010000,
                      "message": "测试222222222222222测试222222222222222测试222222222222222测试222222222222222测试222222222222222测试2222222222222",
                      "failMessage": null,
                      "buyerCancelMessage": null,
                      "saleTime": null,
                      "productImages": [
                        "https://oss.yunbanfang.cn/tiangong_a6d92941aa574d5391218d6b3b5ccda8.jpg"
                      ],
                      "color": "活性黑"
                    },
                    {
                      "skcId": "7396720303507899638",
                      "skcCode": "B2512090000001",
                      "hasMainImg": "YES",
                      "dataCompleted": "YES",
                      "upcoming": "NO",
                      "onShelves": "NO",
                      "cancelled": "NO",
                      "sold": "NO",
                      "pushedBuyer": "YES",
                      "pushFailed": "NO",
                      "buyerCancelled": "NO",
                      "mainImgUrl": "https://oss.yunbanfang.cn/tiangong_674cbfd5a40f4dd783dbde8965f51932.jpg",
                      "colorEnName": "Apricot",
                      "submitTime": null,
                      "sizeStandardName": "XS-S",
                      "sizeStandardCode": "XS-S",
                      "createdTime": 1765246607000,
                      "revisedTime": 1765250091000,
                      "message": null,
                      "failMessage": null,
                      "buyerCancelMessage": null,
                      "saleTime": null,
                      "productImages": [
                        "https://oss.yunbanfang.cn/tiangong_674cbfd5a40f4dd783dbde8965f51932.jpg",
                        "https://oss.yunbanfang.cn/tiangong_b96ed24e78fa4d008344374d8608af8c.png"
                      ],
                      "color": "杏色"
                    }
                  ],
                  "productImages": [
                    "https://oss.yunbanfang.cn/tiangong_918b3e5868bd4226bc299541d5895664.jpg"
                  ],
                  "sizeImages": [
                    "https://oss.yunbanfang.cn/tiangong_2404579de753406ca2b0953d7dc5316e.jpg"
                  ],
                  "opts": [
                    {
                      "creatorId": "142751354",
                      "creatorName": "焦霞艳",
                      "createdTime": 1765250649000,
                      "reviserId": "142751354",
                      "reviserName": "焦霞艳",
                      "revisedTime": 1765250649000,
                      "optId": "7396737257316757530",
                      "taskId": "7396720303478539506",
                      "optType": "21",
                      "content": "复色"
                    },
                    {
                      "creatorId": "142751354",
                      "creatorName": "焦霞艳",
                      "createdTime": 1765250091000,
                      "reviserId": "142751354",
                      "reviserName": "焦霞艳",
                      "revisedTime": 1765250091000,
                      "optId": "7396734918312800265",
                      "taskId": "7396720303478539506",
                      "optType": "24",
                      "content": "编辑SKC"
                    },
                    {
                      "creatorId": "142751354",
                      "creatorName": "焦霞艳",
                      "createdTime": 1765250070000,
                      "reviserId": "142751354",
                      "reviserName": "焦霞艳",
                      "revisedTime": 1765250070000,
                      "optId": "7396734830324690949",
                      "taskId": "7396720303478539506",
                      "optType": "24",
                      "content": "编辑SKC"
                    },
                    {
                      "creatorId": "142751354",
                      "creatorName": "焦霞艳",
                      "createdTime": 1765250053000,
                      "reviserId": "142751354",
                      "reviserName": "焦霞艳",
                      "revisedTime": 1765250053000,
                      "optId": "7396734759705194497",
                      "taskId": "7396720303478539506",
                      "optType": "24",
                      "content": "编辑SKC"
                    },
                    {
                      "creatorId": "142751354",
                      "creatorName": "焦霞艳",
                      "createdTime": 1765250010000,
                      "reviserId": "142751354",
                      "reviserName": "焦霞艳",
                      "revisedTime": 1765250010000,
                      "optId": "7396734577089394685",
                      "taskId": "7396720303478539506",
                      "optType": "51",
                      "content": "测试222222222222222测试222222222222222测试222222222222222测试222222222222222测试222222222222222测试2222222222222"
                    },
                    {
                      "creatorId": "142751354",
                      "creatorName": "焦霞艳",
                      "createdTime": 1765249991000,
                      "reviserId": "142751354",
                      "reviserName": "焦霞艳",
                      "revisedTime": 1765249991000,
                      "optId": "7396734499368941558",
                      "taskId": "7396720303478539506",
                      "optType": "24",
                      "content": "编辑SKC"
                    },
                    {
                      "creatorId": "142751354",
                      "creatorName": "焦霞艳",
                      "createdTime": 1765249954000,
                      "reviserId": "142751354",
                      "reviserName": "焦霞艳",
                      "revisedTime": 1765249954000,
                      "optId": "7396734341897992181",
                      "taskId": "7396720303478539506",
                      "optType": "52",
                      "content": "焦霞艳 取消SKC<br/>原因: 客户不需要客户不需要了客户不需要了客户不需要了"
                    },
                    {
                      "creatorId": "142751354",
                      "creatorName": "焦霞艳",
                      "createdTime": 1765249222000,
                      "reviserId": "142751354",
                      "reviserName": "焦霞艳",
                      "revisedTime": 1765249222000,
                      "optId": "7396731270388200335",
                      "taskId": "7396720303478539506",
                      "optType": "21",
                      "content": "复色"
                    },
                    {
                      "creatorId": "142751354",
                      "creatorName": "焦霞艳",
                      "createdTime": 1765248317000,
                      "reviserId": "142751354",
                      "reviserName": "焦霞艳",
                      "revisedTime": 1765248317000,
                      "optId": "7396727475499381632",
                      "taskId": "7396720303478539506",
                      "optType": "24",
                      "content": "编辑SKC"
                    },
                    {
                      "creatorId": "142751354",
                      "creatorName": "焦霞艳",
                      "createdTime": 1765248272000,
                      "reviserId": "142751354",
                      "reviserName": "焦霞艳",
                      "revisedTime": 1765248272000,
                      "optId": "7396727289435861883",
                      "taskId": "7396720303478539506",
                      "optType": "21",
                      "content": "复色"
                    },
                    {
                      "creatorId": "142751354",
                      "creatorName": "焦霞艳",
                      "createdTime": 1765247912000,
                      "reviserId": "142751354",
                      "reviserName": "焦霞艳",
                      "revisedTime": 1765247912000,
                      "optId": "7396725779473838083",
                      "taskId": "7396720303478539506",
                      "optType": "21",
                      "content": "复色"
                    },
                    {
                      "creatorId": "142751354",
                      "creatorName": "焦霞艳",
                      "createdTime": 1765246627000,
                      "reviserId": "142751354",
                      "reviserName": "焦霞艳",
                      "revisedTime": 1765246627000,
                      "optId": "7396720386076968188",
                      "taskId": "7396720303478539506",
                      "optType": "23",
                      "content": "推送买手"
                    },
                    {
                      "creatorId": "142751354",
                      "creatorName": "焦霞艳",
                      "createdTime": 1765246607000,
                      "reviserId": "142751354",
                      "reviserName": "焦霞艳",
                      "revisedTime": 1765246607000,
                      "optId": "7396720303507899635",
                      "taskId": "7396720303478539506",
                      "optType": "1",
                      "content": "新增"
                    }
                  ],
                  "categoryCode": "Y01-Y0101-Y0101001",
                  "clothingStyleCode": "vocation"
                }
                """;
        this.spotStyleTaskService.edit(JsonsKt.parseJson(json, SpotStyleTaskEditReq.class));
    }

    @Test
    void batchEditProductImage() {
        final var json = """
                [
                  {
                    "taskCode": "XH251110000013",
                    "productImages": [
                      "https://oss.yunbanfang.cn/tiangong_379a407eb5b04fa0812eb0d6d540c670.png"
                    ]
                  }
                ]
                """;
        this.print(this.spotStyleTaskService.batchEditProductImage(JsonsKt.parseJsonList(json, SpotStyleEditProductImageReq.class)));
    }

    @Test
    void batchCreate() {
        final var json = """
                [
                  {
                    "weaveModeCode": "01",
                    "sizeStandardCode": "tiangong_code_standard",
                    "qualityLevelCode": "plm_quality_level_zex",
                    "clothGrossWeight": 1,
                    "ingredients": [
                      {
                        "ingredientCode": "3",
                        "ingredientRatio": 100,
                        "ingredientName": "亚麻"
                      }
                    ],
                    "suppliers": [
                      {
                        "purchasePrice": 2,
                        "supplierName": "test_111",
                        "payeeName": "33",
                        "supplierStyleCode": "test_51"
                      }
                    ],
                    "skcs": [
                      {
                        "colorEnName": "Bright White",
                        "mainImgUrl": "https://oss.yunbanfang.cn/tiangong_0146f09bfed64361814ec56b16ea7e9b.jpg",
                        "sizeStandardName": "2XS",
                        "sizeStandardCode": "2XS",
                        "productImages": [
                          "https://oss.yunbanfang.cn/tiangong_0146f09bfed64361814ec56b16ea7e9b.jpg"
                        ],
                        "color": "大白色"
                      },
                      {
                        "colorEnName": "Off White",
                        "mainImgUrl": "https://oss.yunbanfang.cn/tiangong_6379b305688447318de01e8893eedf8f.jpg",
                        "sizeStandardName": "XS",
                        "sizeStandardCode": "XS",
                        "productImages": [
                          "https://oss.yunbanfang.cn/tiangong_6379b305688447318de01e8893eedf8f.jpg"
                        ],
                        "color": "米白色"
                      }
                    ],
                    "productImages": [
                      "https://oss.yunbanfang.cn/tiangong_298fe0f161304d7e91ef70c03d1a5aa2.jpg"
                    ],
                    "sizeImages": [
                      "https://oss.yunbanfang.cn/tiangong_0c58684e6d434b45bfd0b6294b9d5477.jpg"
                    ],
                    "styleLabelCode": "ai",
                    "storeId": "7388860772798967809",
                    "waveBandCode": "8",
                    "styleLevelCode": "s",
                    "platformCode": "A5",
                    "printingCode": "01",
                    "patternCode": "01",
                    "elasticCode": "01",
                    "visualFormCode": "pose",
                    "sceneCode": "daily",
                    "galaCode": "christmas",
                    "seasonCode": "1",
                    "skuClassCode": "1",
                    "suitPiece": null,
                    "mainImgUrl": "https://oss.yunbanfang.cn/tiangong_298fe0f161304d7e91ef70c03d1a5aa2.jpg",
                    "storeName": "店铺3",
                    "sceneName": "通勤",
                    "qualityLevelName": "准二线",
                    "styleLevelName": "S级",
                    "weaveModeName": "针/梭织",
                    "waveBandName": "8月",
                    "categoryCode": "Y01-Y0101-Y0101001",
                    "categoryName": "女装-上装-T恤",
                    "sizeStandardName": "字母码",
                    "clothingStyleCode": "vocation",
                    "clothingStyleName": "熟龄度假",
                    "platformName": "JIT",
                    "printingName": "净色",
                    "patternName": "紧身",
                    "elasticName": "无弹",
                    "seasonName": "四季",
                    "galaName": "圣诞节",
                    "visualFormName": "摆拍",
                    "skuClassName": "单品",
                    "styleLabelName": "AI款",
                    "supplyModeCode": "无",
                    "supplyModeName": "无",
                    "spotStyleTypeCode": "SPOT_STYLE",
                    "spotStyleTypeName": "现货管理",
                    "palletTypeCode": "无",
                    "palletTypeName": "无"
                  }
                ]
                """;
        final var list = JsonsKt.parseJsonList(json, SpotStyleTaskAddReq.class);
        UserInvoke.INSTANCE.doAction(191104913L, "毛宇哲", 1L,
                () -> this.spotStyleTaskService.batchCreate(list));

    }

    @Test
    void listSupplier() {
        final var req = new SpotSupplierListReq();
        req.setSupplierName("asdfasdf");
        req.setSupplierStyleCode("aasfasdfasdfasdf");
        final var list = List.of(req);
        this.print(this.spotStyleTaskService.listSupplier(list));
    }

    @Test
    void test() {
        final var req = new ClipLabelTaskReq();
        req.setBusCode("S13654541938");
        req.setBusId(13654541938L);
        req.setCreatorId(191104913L);
        req.setCreatorName("毛宇哲");
        req.setTenantId(1L);
        req.setInputImage("https://oss-datawork-cdn.tiangong.tech/ai_images/server/tryon/7872999134027346528_b4d9e892b53b05a8a027a2bc4b0d59f1.png");
        req.setSource(BizSourceEnum.DEVELOP_STYLE);
        ClipLabelApi.create(req);
    }

    @Test
    void test1() {
        print(ClipLabelApi.getByBusId(13654541938L));
    }

    @Test
    void test2() {
        UserContexts.withSystemUser(() -> this.spotStyleTaskService.test(7393939251668312429L));
    }

    @Test
    void test3() {
        UserContexts.withSystemUser(() -> {
            final var dict = dictValueRemoteHelper.listByDictCodes(List.of("aps_category_type")).getFirst();
            this.print(dict);
//            final var value = dict.getDictValues().stream()
//                    .filter(it -> StrUtil.equalsIgnoreCase("春夏", it.getValue()))
//                    .toList().getFirst();
//            this.print(value);
        });
    }

    @Test
    void test4() {
        final var json = """
                {
                  "result": {
                    "style": "[81]优雅",
                    "season": "[94]夏",
                    "details": "[7]腰带, [20]垂褶, [70]露肩",
                    "chinese_title": "1件优雅露肩垂褶腰带连衣裙，时尚女性晚宴聚会必备，夏季日常通勤",
                    "english_title": "One elegant off-shoulder draped belted dress, essential for fashionable women's evening parties, suitable for summer daily commuting"
                  },
                  "status": "success"
                }
                """;
        final var dto = JsonsKt.parseJson(json, FashionTitleAnalysisDTO.class);
        log.info("单元测试\t{}", dto.getResult().getChineseTitle());
    }

    @Test
    void pushPlmBuyer() {
        final var taskIds = List.of(7397083607413772308L);
        this.spotStyleTaskService.pushPlmBuyer(taskIds);
    }

    @Test
    void job() {
        UserContexts.withSystemUser(() -> spotStyleTaskService.job());
    }

    @Test
    void test6() {
//        spotStyleSkcRepository.listByTaskIds(List.of(7396855540393140454L))
//                .forEach(it -> log.info("单元测试\t{}\t{}", it.pushedBuyer(),it.pushFailed()));
        final var e = new SpotStyleTask();
//        e.setTaskStatus(259);
        log.info("单元测试\t{}", e.pushedBuyer());
        final var json = """
                [
                  {
                    "cn": {
                      "code": "FM240402569",
                      "name": "廓形",
                      "values": [
                        {
                          "code": "V240402098",
                          "name": "X",
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
                          "name": "X",
                          "values": null
                        }
                      ]
                    },
                    "coloroCodes": null
                  },
                  {
                    "cn": {
                      "code": "FM240402585",
                      "name": "腰高",
                      "values": [
                        {
                          "code": "V240402296",
                          "name": "高腰",
                          "values": null
                        }
                      ]
                    },
                    "en": {
                      "code": null,
                      "name": "waist height",
                      "values": [
                        {
                          "code": null,
                          "name": "High-waisted",
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
                      "code": "FM240402575",
                      "name": "袖长",
                      "values": [
                        {
                          "code": "V240402223",
                          "name": "长袖",
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
                          "name": "Wrist-length Sleeve",
                          "values": null
                        }
                      ]
                    },
                    "coloroCodes": null
                  },
                  {
                    "cn": {
                      "code": "FM240402573",
                      "name": "袖型",
                      "values": [
                        {
                          "code": "V240402181",
                          "name": "普通袖",
                          "values": null
                        }
                      ]
                    },
                    "en": {
                      "code": null,
                      "name": "sleeve",
                      "values": [
                        {
                          "code": null,
                          "name": "Regular cuffs",
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
                          "code": "V240402322",
                          "name": "春",
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
                          "name": "Spring",
                          "values": null
                        }
                      ]
                    },
                    "coloroCodes": null
                  }
                ]
                """;
        final var map = PlmConvertHelper.mapLabel(json);
        final var list = new ArrayList<String>();
        map.forEach((k, v) -> list.add(k + ":" + v));
        this.print(String.join(";", list));
        log.info("单元测试\t{}", StrUtil.split("白色 / XL", " / ").getLast());
        String input = "[21]抽绳, [25]流苏, [52]面料褶皱装饰";
        // 方法1: 使用 replaceAll() 方法
        String result1 = input.replaceAll("\\[\\d+]", "");
        log.info("方法1结果: {}", result1);
        final var resp = """
                {
                  "result": "1. V型印花\\n2. 花朵印花\\n3. 植物",
                  "status": "success"
                }
                """;
        log.info("单元测试\t{}", JsonsKt.parseJson(resp, PatternDataDTO.class).result());
    }

    @Test
    void historyVector() {
        UserContexts.withSystemUser(() -> this.spotStyleTaskService.historyVector());
    }

    @Test
    void test5() {
        final var req = new BuyerBaseSkcPageReq();
        req.setPageNum(1);
        req.setPageSize(200);
//        req.setDesignCodeList(List.of("B52602110000002"));
        req.setStyleCodeList(List.of("526021100001"));
        withSystemUser(() -> print(PlmBuyerApi.baseSkcPage(req)));
    }
}
