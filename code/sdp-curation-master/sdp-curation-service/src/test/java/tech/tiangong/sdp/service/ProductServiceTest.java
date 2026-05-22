package tech.tiangong.sdp.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.aikero.blade.auth.UserContexts;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.BasicTest;
import tech.tiangong.sdp.vo.req.ProductAddReq;
import tech.tiangong.sdp.vo.req.ProductFileEditReq;
import tech.tiangong.sdp.vo.req.ProductPageReq;

import java.util.List;
import java.util.Set;

/**
 * 单元测试
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/20 11:20
 */
public class ProductServiceTest extends BasicTest {
    @Autowired
    private ProductService service;

    @Test
    void page() {
        /*
        {
  "pageNum": 1,
  "pageSize": 20,
  "skcCode": "",
  "skuCode": "",
  "platformProductId": "",
  "platformSkcId": "",
  "platformSkuId": "",
  "designerId": "",
  "businessOperatorId": "155076664",
  "onShelvesId": ""
}
         */
        final var req = new ProductPageReq();
//        req.setStyleLabelCode("ai-pattern");
        req.setSkcCode("526030012460101");
//        req.setBusinessOperatorId(155076664L);
//        req.setPlatformProductId("9352127008");
//        req.setPreDisassemblyState(1);
        this.print(this.service.page(req));
    }

    @Test
    void stateTotal() {
        final var req = new ProductPageReq();
        req.setPreDisassemblyState(1);
        print(this.service.stateTotal(req));
    }

    @Test
    void detail() {
        this.print(this.service.detail(7434848081143050243L));
    }

    @Test
    void fileEdit() {
        final var json = """
                {
                  "productId": "7414179244827533671",
                  "materialImgUrl": null,
                  "videoUrl": "",
                  "skcs": [
                    {
                      "productSkcId": "7414179244844310912",
                      "images": [
                        "https://oss.yunbanfang.cn/tiangong_325f242277d64afb9ece4ea30cbe6241.png",
                        "https://oss.yunbanfang.cn/tiangong_71236f6875df43698be2c4417a5de509.png",
                        "https://oss.yunbanfang.cn/tiangong_b45d782d3fd84a6596890b5fda2cce0d.png"
                      ]
                    }
                  ]
                }
                """;
        this.service.fileEdit(JsonsKt.parseJson(json, ProductFileEditReq.class));
    }

    @Test
    void create() {
        final var json = """
                {
                    "skcReqs": [
                        {
                            "skcId": "7414212520078282773",
                            "skcCode": "526010002800101",
                            "color": "圆点波点",
                            "platformColor": "花色",
                            "mainSpecReqs": [
                                {
                                    "parentSpecId": "1001",
                                    "parentSpecName": "颜色",
                                    "specId": "16066",
                                    "specName": "花色"
                                }
                            ],
                            "skuReqs": [
                                {
                                    "skuId": "7414212523039461404",
                                    "skuCode": "526010002800101N-S",
                                    "supplierPrice": "300",
                                    "skuWeightValue": "500",
                                    "len": "30",
                                    "width": "25",
                                    "height": "5",
                                    "numberOfPieces": "",
                                    "skuClassification": "1",
                                    "warehouseStockQuantityReqs": [
                                        {
                                            "targetStockAvailable": "0",
                                            "warehouseId": "WH-07170316861570140"
                                        }
                                    ],
                                    "skuSpecReqs": [
                                        {
                                            "specId": "10004",
                                            "specName": "S",
                                            "parentSpecId": "3001",
                                            "parentSpecName": "尺码"
                                        },
                                        {
                                            "parentSpecId": "1001",
                                            "parentSpecName": "颜色",
                                            "specId": "16066",
                                            "specName": "花色"
                                        }
                                    ]
                                },
                                {
                                    "skuId": "7414212523039461405",
                                    "skuCode": "526010002800101N-M",
                                    "supplierPrice": "300",
                                    "skuWeightValue": "500",
                                    "len": "30",
                                    "width": "25",
                                    "height": "5",
                                    "numberOfPieces": "",
                                    "skuClassification": "1",
                                    "warehouseStockQuantityReqs": [
                                        {
                                            "targetStockAvailable": "0",
                                            "warehouseId": "WH-07170316861570140"
                                        }
                                    ],
                                    "skuSpecReqs": [
                                        {
                                            "specId": "9005",
                                            "specName": "M",
                                            "parentSpecId": "3001",
                                            "parentSpecName": "尺码"
                                        },
                                        {
                                            "parentSpecId": "1001",
                                            "parentSpecName": "颜色",
                                            "specId": "16066",
                                            "specName": "花色"
                                        }
                                    ]
                                },
                                {
                                    "skuId": "7414212523039461406",
                                    "skuCode": "526010002800101N-L",
                                    "supplierPrice": "300",
                                    "skuWeightValue": "500",
                                    "len": "30",
                                    "width": "25",
                                    "height": "5",
                                    "numberOfPieces": "",
                                    "skuClassification": "1",
                                    "warehouseStockQuantityReqs": [
                                        {
                                            "targetStockAvailable": "0",
                                            "warehouseId": "WH-07170316861570140"
                                        }
                                    ],
                                    "skuSpecReqs": [
                                        {
                                            "specId": "11002",
                                            "specName": "L",
                                            "parentSpecId": "3001",
                                            "parentSpecName": "尺码"
                                        },
                                        {
                                            "parentSpecId": "1001",
                                            "parentSpecName": "颜色",
                                            "specId": "16066",
                                            "specName": "花色"
                                        }
                                    ]
                                },
                                {
                                    "skuId": "7414212523039461407",
                                    "skuCode": "526010002800101N-XL",
                                    "supplierPrice": "300",
                                    "skuWeightValue": "500",
                                    "len": "30",
                                    "width": "25",
                                    "height": "5",
                                    "numberOfPieces": "",
                                    "skuClassification": "1",
                                    "warehouseStockQuantityReqs": [
                                        {
                                            "targetStockAvailable": "0",
                                            "warehouseId": "WH-07170316861570140"
                                        }
                                    ],
                                    "skuSpecReqs": [
                                        {
                                            "specId": "12003",
                                            "specName": "XL",
                                            "parentSpecId": "3001",
                                            "parentSpecName": "尺码"
                                        },
                                        {
                                            "parentSpecId": "1001",
                                            "parentSpecName": "颜色",
                                            "specId": "16066",
                                            "specName": "花色"
                                        }
                                    ]
                                }
                            ],
                            "images": [
                                "https://oss.yunbanfang.cn/tiangong_0088f1523146487fa79c6dd2f055741f.png",
                                "https://oss.yunbanfang.cn/tiangong_6ec25ec568904a168094e38da902809d.png",
                                "https://oss.yunbanfang.cn/tiangong_af6e654d13b840d79064f49e85a5e612.png",
                                "https://oss.yunbanfang.cn/tiangong_619bb8ef4da74bd3bbd460b89599efbe.png",
                                "https://oss.yunbanfang.cn/tiangong_8542f6b328bf4b3f9ea4fc5d1f954cc5.png",
                                "https://oss.yunbanfang.cn/tiangong_4f4beccefa1c4d939145b96816c4c6c6.png"
                            ]
                        }
                    ],
                    "sizeReqs": [
                        {
                            "show": "YES",
                            "sizeReqs": [
                                {
                                    "size": "S",
                                    "platformSize": "S",
                                    "values": [
                                        {
                                            "part": "10002",
                                            "partName": "胸围全围",
                                            "value": "109",
                                            "diff": ""
                                        },
                                        {
                                            "part": "10003",
                                            "partName": "衣长",
                                            "value": "97",
                                            "diff": ""
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "id": "10002",
                                            "name": "胸围全围"
                                        },
                                        {
                                            "id": "10003",
                                            "name": "衣长"
                                        }
                                    ]
                                },
                                {
                                    "size": "M",
                                    "platformSize": "M",
                                    "values": [
                                        {
                                            "part": "10002",
                                            "partName": "胸围全围",
                                            "value": "114",
                                            "diff": "5"
                                        },
                                        {
                                            "part": "10003",
                                            "partName": "衣长",
                                            "value": "102",
                                            "diff": "5"
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "id": "10002",
                                            "name": "胸围全围"
                                        },
                                        {
                                            "id": "10003",
                                            "name": "衣长"
                                        }
                                    ]
                                },
                                {
                                    "size": "L",
                                    "platformSize": "L",
                                    "values": [
                                        {
                                            "part": "10002",
                                            "partName": "胸围全围",
                                            "value": "119",
                                            "diff": "5"
                                        },
                                        {
                                            "part": "10003",
                                            "partName": "衣长",
                                            "value": "107",
                                            "diff": "5"
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "id": "10002",
                                            "name": "胸围全围"
                                        },
                                        {
                                            "id": "10003",
                                            "name": "衣长"
                                        }
                                    ]
                                },
                                {
                                    "size": "XL",
                                    "platformSize": "XL",
                                    "values": [
                                        {
                                            "part": "10002",
                                            "partName": "胸围全围",
                                            "value": "124",
                                            "diff": "5"
                                        },
                                        {
                                            "part": "10003",
                                            "partName": "衣长",
                                            "value": "112",
                                            "diff": "5"
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "id": "10002",
                                            "name": "胸围全围"
                                        },
                                        {
                                            "id": "10003",
                                            "name": "衣长"
                                        }
                                    ]
                                }
                            ],
                            "elementList": [
                                {
                                    "id": "10002",
                                    "name": "胸围全围"
                                },
                                {
                                    "id": "10003",
                                    "name": "衣长"
                                }
                            ]
                        }
                    ],
                    "specAttrs": [
                        {
                            "vid": "453",
                            "specId": "16066",
                            "brandId": null,
                            "value": "花色",
                            "extendInfo": "(255,255,255,0)",
                            "additionalInfo": null,
                            "group": {
                                "name": "花色系",
                                "id": "12"
                            },
                            "subGroup": null,
                            "parentVidList": null,
                            "name": "花色",
                            "id": "453",
                            "available": 0,
                            "groupId": "12",
                            "groupName": "花色系",
                            "templatePid": "1144073",
                            "pid": "13",
                            "refPid": "63",
                            "propName": "颜色",
                            "propValue": "花色",
                            "parentSpecId": "1001",
                            "parentSpecName": "颜色",
                            "valueGroupId": "12",
                            "valueGroupName": "花色系",
                            "numberInputValue": "",
                            "valueUnit": "",
                            "valueExtendInfo": "(255,255,255,0)",
                            "specName": "花色"
                        },
                        {
                            "label": "S",
                            "value": "S",
                            "checked": true,
                            "name": "S",
                            "id": "315",
                            "available": 0,
                            "specId": "10004",
                            "groupId": "2",
                            "groupName": "中国码",
                            "vid": "315",
                            "brandId": null,
                            "extendInfo": "",
                            "additionalInfo": null,
                            "group": {
                                "name": "中国码",
                                "id": "2"
                            },
                            "subGroup": null,
                            "parentVidList": null,
                            "templatePid": "1144074",
                            "pid": "14",
                            "refPid": "65",
                            "propName": "尺码",
                            "propValue": "S",
                            "parentSpecId": "3001",
                            "parentSpecName": "尺码",
                            "valueGroupId": "2",
                            "valueGroupName": "中国码",
                            "numberInputValue": "",
                            "valueUnit": "",
                            "valueExtendInfo": "",
                            "specName": "S"
                        },
                        {
                            "label": "M",
                            "value": "M",
                            "checked": true,
                            "name": "M",
                            "id": "317",
                            "available": 0,
                            "specId": "9005",
                            "groupId": "2",
                            "groupName": "中国码",
                            "vid": "317",
                            "brandId": null,
                            "extendInfo": "",
                            "additionalInfo": null,
                            "group": {
                                "name": "中国码",
                                "id": "2"
                            },
                            "subGroup": null,
                            "parentVidList": null,
                            "templatePid": "1144074",
                            "pid": "14",
                            "refPid": "65",
                            "propName": "尺码",
                            "propValue": "M",
                            "parentSpecId": "3001",
                            "parentSpecName": "尺码",
                            "valueGroupId": "2",
                            "valueGroupName": "中国码",
                            "numberInputValue": "",
                            "valueUnit": "",
                            "valueExtendInfo": "",
                            "specName": "M"
                        },
                        {
                            "label": "L",
                            "value": "L",
                            "checked": true,
                            "name": "L",
                            "id": "319",
                            "available": 0,
                            "specId": "11002",
                            "groupId": "2",
                            "groupName": "中国码",
                            "vid": "319",
                            "brandId": null,
                            "extendInfo": "",
                            "additionalInfo": null,
                            "group": {
                                "name": "中国码",
                                "id": "2"
                            },
                            "subGroup": null,
                            "parentVidList": null,
                            "templatePid": "1144074",
                            "pid": "14",
                            "refPid": "65",
                            "propName": "尺码",
                            "propValue": "L",
                            "parentSpecId": "3001",
                            "parentSpecName": "尺码",
                            "valueGroupId": "2",
                            "valueGroupName": "中国码",
                            "numberInputValue": "",
                            "valueUnit": "",
                            "valueExtendInfo": "",
                            "specName": "L"
                        },
                        {
                            "label": "XL",
                            "value": "XL",
                            "checked": true,
                            "name": "XL",
                            "id": "320",
                            "available": 0,
                            "specId": "12003",
                            "groupId": "2",
                            "groupName": "中国码",
                            "vid": "320",
                            "brandId": null,
                            "extendInfo": "",
                            "additionalInfo": null,
                            "group": {
                                "name": "中国码",
                                "id": "2"
                            },
                            "subGroup": null,
                            "parentVidList": null,
                            "templatePid": "1144074",
                            "pid": "14",
                            "refPid": "65",
                            "propName": "尺码",
                            "propValue": "XL",
                            "parentSpecId": "3001",
                            "parentSpecName": "尺码",
                            "valueGroupId": "2",
                            "valueGroupName": "中国码",
                            "numberInputValue": "",
                            "valueUnit": "",
                            "valueExtendInfo": "",
                            "specName": "XL"
                        }
                    ],
                    "attrs": [
                        {
                            "attrId": "",
                            "templatePid": "1453557",
                            "pid": "2054",
                            "refPid": "6926",
                            "propName": "面料纹理1",
                            "valueUnit": "",
                            "controlType": 1,
                            "saled": "0",
                            "parentSpecName": "面料纹理1",
                            "vid": "161198",
                            "propValue": "光面",
                            "valueExtendInfo": null
                        },
                        {
                            "attrId": "",
                            "templatePid": "1453560",
                            "pid": "2052",
                            "refPid": "6930",
                            "propName": "面料克重1（g/m²)",
                            "valueUnit": "g/㎡",
                            "controlType": 0,
                            "saled": "0",
                            "parentSpecName": "面料克重1（g/m²)",
                            "propValue": "10",
                            "vid": "0"
                        },
                        {
                            "attrId": "",
                            "templatePid": "1453562",
                            "pid": "2052",
                            "refPid": "6934",
                            "propName": "里料克重（g/m²)",
                            "valueUnit": "g/㎡",
                            "controlType": 0,
                            "saled": "0",
                            "parentSpecName": "里料克重（g/m²)",
                            "propValue": "10",
                            "vid": "0"
                        },
                        {
                            "attrId": "",
                            "templatePid": "1453559",
                            "pid": "2050",
                            "refPid": "6928",
                            "propName": "里料纹理",
                            "valueUnit": "",
                            "controlType": 1,
                            "saled": "0",
                            "parentSpecName": "里料纹理",
                            "vid": "161110",
                            "propValue": "光面",
                            "valueExtendInfo": null
                        },
                        {
                            "attrId": "",
                            "templatePid": "1453533",
                            "pid": "2",
                            "refPid": "15",
                            "propName": "成分",
                            "vid": "35386",
                            "propValue": "聚酯纤维(涤纶)Polyester",
                            "valueUnit": "%",
                            "numberInputValue": "100",
                            "valueExtendInfo": null,
                            "controlType": 16,
                            "saled": "0"
                        },
                        {
                            "attrId": "",
                            "templatePid": "1453563",
                            "pid": "2",
                            "refPid": "6547",
                            "propName": "里衬成分",
                            "vid": "35392",
                            "propValue": "蚕丝Silk",
                            "valueUnit": "%",
                            "numberInputValue": "100",
                            "valueExtendInfo": null,
                            "controlType": 16,
                            "saled": "0"
                        },
                        {
                            "attrId": "",
                            "templatePid": "1453534",
                            "pid": "1",
                            "refPid": "12",
                            "propName": "材质",
                            "valueUnit": "",
                            "controlType": 1,
                            "saled": "0",
                            "parentSpecName": "材质",
                            "vid": "2",
                            "propValue": "亚麻",
                            "valueExtendInfo": null
                        },
                        {
                            "attrId": "",
                            "templatePid": "1453548",
                            "pid": "3",
                            "refPid": "19",
                            "propName": "风格",
                            "valueUnit": "",
                            "controlType": 1,
                            "saled": "0",
                            "parentSpecName": "风格",
                            "vid": "32855",
                            "propValue": "Y2K",
                            "valueExtendInfo": null
                        },
                        {
                            "attrId": "",
                            "templatePid": "1453547",
                            "pid": "4",
                            "refPid": "20",
                            "propName": "护理说明",
                            "valueUnit": "",
                            "controlType": 1,
                            "saled": "0",
                            "parentSpecName": "护理说明",
                            "vid": "26004",
                            "propValue": "可机洗且可干洗",
                            "valueExtendInfo": null
                        },
                        {
                            "attrId": "",
                            "templatePid": "1453542",
                            "pid": "7",
                            "refPid": "24",
                            "propName": "是否透明",
                            "valueUnit": "",
                            "controlType": 1,
                            "saled": "0",
                            "parentSpecName": "是否透明",
                            "vid": "209",
                            "propValue": "半透",
                            "valueExtendInfo": null
                        },
                        {
                            "attrId": "",
                            "templatePid": "1453541",
                            "pid": "10",
                            "refPid": "26",
                            "propName": "图案",
                            "valueUnit": "",
                            "controlType": 1,
                            "saled": "0",
                            "parentSpecName": "图案",
                            "vid": "216",
                            "propValue": "几何图案",
                            "valueExtendInfo": null
                        },
                        {
                            "attrId": "",
                            "templatePid": "1453540",
                            "pid": "21",
                            "refPid": "83",
                            "propName": "细节",
                            "valueUnit": "",
                            "controlType": 1,
                            "saled": "0",
                            "parentSpecName": "细节",
                            "vid": "556",
                            "propValue": "串珠",
                            "valueExtendInfo": null
                        },
                        {
                            "attrId": "",
                            "templatePid": "1453546",
                            "pid": "24",
                            "refPid": "76",
                            "propName": "季节",
                            "valueUnit": "",
                            "controlType": 1,
                            "saled": "0",
                            "parentSpecName": "季节",
                            "vid": "642",
                            "propValue": "夏",
                            "valueExtendInfo": null
                        },
                        {
                            "attrId": "",
                            "templatePid": "1453554",
                            "pid": "1224",
                            "refPid": "1192",
                            "propName": "织造方式",
                            "valueUnit": "",
                            "controlType": 1,
                            "saled": "0",
                            "parentSpecName": "织造方式",
                            "vid": "54654",
                            "propValue": "针织(含钩织、毛织面料)",
                            "valueExtendInfo": null
                        },
                        {
                            "attrId": "",
                            "templatePid": "1453550",
                            "pid": "1364",
                            "refPid": "1352",
                            "propName": "面料弹性",
                            "valueUnit": "",
                            "controlType": 1,
                            "saled": "0",
                            "parentSpecName": "面料弹性",
                            "vid": "35197",
                            "propValue": "微弹",
                            "valueExtendInfo": null
                        },
                        {
                            "attrId": "",
                            "templatePid": "1453551",
                            "pid": "1437",
                            "refPid": "1919",
                            "propName": "印花类型",
                            "valueUnit": "",
                            "controlType": 1,
                            "saled": "0",
                            "parentSpecName": "印花类型",
                            "vid": "406660",
                            "propValue": "满印",
                            "valueExtendInfo": null
                        },
                        {
                            "attrId": "",
                            "templatePid": "1453553",
                            "pid": "1514",
                            "refPid": "2103",
                            "propName": "款式来源",
                            "valueUnit": "",
                            "controlType": 1,
                            "saled": "0",
                            "parentSpecName": "款式来源",
                            "vid": "70452",
                            "propValue": "打版款",
                            "valueExtendInfo": null
                        }
                    ],
                    "siteIds": [
                        "100"
                    ],
                    "warehouseIds": [
                        "WH-07170316861570140"
                    ],
                    "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                    ],
                    "video": {
                        "videoUrl": ""
                    },
                    "sizeImages": [],
                    "freightTemplateId": "HFT-15741254348554260140",
                    "promisedDeliveryDay": "9",
                    "materialImgUrl": "https://oss.yunbanfang.cn/tiangong_be620caacb6f4a888e39593925176370.png",
                    "productEnName":"One piece cute style cross V-neck floral print romper, essential for fashionable girls' summer outings, suitable for daily casual and vacation wear",
                    "productName": "测试-1件可爱风交叉V领印花连体短裤，时尚少女夏日出行必备，日常休闲度假",
                    "catName": "女装T恤",
                    "catId": "29069",
                    "styleId": "7414212519893733396",
                    "styleCode": "5260100028001",
                    "storeId": "7414211164500201491",
                    "reviewFailReason": "",
                    "pass": true
                }
                """;
        final var text = """
                {
                  "styleId": "7407321985015112879",
                  "pass": false,
                  "reviewFailReason": "店铺错误"
                }
                """;
        this.service.create(JsonsKt.parseJson(text, ProductAddReq.class));
    }

    @Test
    void getReview() {
        this.print(this.service.getReview(7415647238120366417L));
    }

    @Test
    void batchPublish() {
        UserContexts.withSystemUser(() -> {
            this.service.batchPublish(List.of(7413505842508776479L));
        });
    }

    @Test
    void job() {
        UserContexts.withSystemUser(() -> this.service.job());
    }
    @Test
    void test () {
        final var json = """
                {
                    "productId": 7415576165962048054,
                    "pass": null,
                    "reviewFailReason": null,
                    "storeId": 7414211164500201491,
                    "styleId": 7415566309150515346,
                    "styleCode": "5260100032001",
                    "catId": 39107,
                    "catName": "女装连衣裙",
                    "productName": "测试二十-1件性感风交叉V领印花连体短裤，时尚少女夏日出行必备，日常休闲度假",
                    "productEnName": "One piece of sexy cross V-neck printed jumpsuit shorts, a must-have for fashionable girls in summer, suitable for daily wear, leisure and vacation",
                    "materialImgUrl": "https://oss.yunbanfang.cn/tiangong_448a23c839994fc5a1f23008742f8b1d.png",
                    "promisedDeliveryDay": 9,
                    "freightTemplateId": "HFT-15741254348554260140",
                    "groupId": 0,
                    "sizes": [
                        "XS",
                        "S",
                        "M",
                        "L",
                        "XL",
                        "XXL",
                        "one-size"
                    ],
                    "warehouseIds": [
                        "WH-09919088230530140",
                        "WH-07170316861570140"
                    ],
                    "sizeImages": null,
                    "video": {
                        "coverUrl": null,
                        "videoUrl": "",
                        "width": null,
                        "height": null
                    },
                    "siteIds": [
                        100
                    ],
                    "attrs": [
                        {
                            "templatePid": 1125676,
                            "pid": 19,
                            "refPid": 74,
                            "propName": "腰带",
                            "vid": 550,
                            "propValue": "是",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        },
                        {
                            "templatePid": 1158118,
                            "pid": 1891,
                            "refPid": 6227,
                            "propName": "系列线",
                            "vid": 74549,
                            "propValue": "中东专项",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        },
                        {
                            "templatePid": 1125674,
                            "pid": 1514,
                            "refPid": 2103,
                            "propName": "款式来源",
                            "vid": 70452,
                            "propValue": "打版款",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        },
                        {
                            "templatePid": 1125695,
                            "pid": 1437,
                            "refPid": 1919,
                            "propName": "印花类型",
                            "vid": 36892,
                            "propValue": "无印花",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        },
                        {
                            "templatePid": 1125694,
                            "pid": 1364,
                            "refPid": 1352,
                            "propName": "面料弹性",
                            "vid": 35197,
                            "propValue": "微弹",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        },
                        {
                            "templatePid": 1125697,
                            "pid": 1224,
                            "refPid": 1192,
                            "propName": "织造方式",
                            "vid": 54654,
                            "propValue": "针织(含钩织、毛织面料)",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        },
                        {
                            "templatePid": 1125683,
                            "pid": 67,
                            "refPid": 115,
                            "propName": "适用人群",
                            "vid": 25920,
                            "propValue": "成人",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        },
                        {
                            "templatePid": 1125679,
                            "pid": 50,
                            "refPid": 94,
                            "propName": "胸垫",
                            "vid": 1127,
                            "propValue": "无胸垫",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        },
                        {
                            "templatePid": 1125680,
                            "pid": 38,
                            "refPid": 79,
                            "propName": "下摆形状",
                            "vid": 864,
                            "propValue": "不对称",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        },
                        {
                            "templatePid": 1125693,
                            "pid": 36,
                            "refPid": 114,
                            "propName": "版型",
                            "vid": 35188,
                            "propValue": "宽松",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        },
                        {
                            "templatePid": 1125686,
                            "pid": 35,
                            "refPid": 80,
                            "propName": "裙型",
                            "vid": 955,
                            "propValue": "不对称",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        },
                        {
                            "templatePid": 1125685,
                            "pid": 33,
                            "refPid": 103,
                            "propName": "裙长",
                            "vid": 838,
                            "propValue": "及膝",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        },
                        {
                            "templatePid": 1125690,
                            "pid": 24,
                            "refPid": 76,
                            "propName": "季节",
                            "vid": 646,
                            "propValue": "春/夏",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        },
                        {
                            "templatePid": 1125688,
                            "pid": 23,
                            "refPid": 84,
                            "propName": "类型",
                            "vid": 704,
                            "propValue": "溜冰",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        },
                        {
                            "templatePid": 1125681,
                            "pid": 21,
                            "refPid": 83,
                            "propName": "细节",
                            "vid": 552,
                            "propValue": "假口袋",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        },
                        {
                            "templatePid": 1125689,
                            "pid": 20,
                            "refPid": 113,
                            "propName": "廓形",
                            "vid": 1827,
                            "propValue": "宽松",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        },
                        {
                            "templatePid": 1293592,
                            "pid": 2054,
                            "refPid": 6927,
                            "propName": "面料纹理2",
                            "vid": 161199,
                            "propValue": "绒面/PU",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        },
                        {
                            "templatePid": 1125677,
                            "pid": 16,
                            "refPid": 29,
                            "propName": "袖长",
                            "vid": 294,
                            "propValue": "长袖",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        },
                        {
                            "templatePid": 1125675,
                            "pid": 12,
                            "refPid": 28,
                            "propName": "长度",
                            "vid": 291,
                            "propValue": "长款",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        },
                        {
                            "templatePid": 1125678,
                            "pid": 11,
                            "refPid": 27,
                            "propName": "袖型",
                            "vid": 274,
                            "propValue": "喇叭袖",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        },
                        {
                            "templatePid": 1125682,
                            "pid": 10,
                            "refPid": 26,
                            "propName": "图案",
                            "vid": 216,
                            "propValue": "几何图案",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        },
                        {
                            "templatePid": 1125684,
                            "pid": 7,
                            "refPid": 24,
                            "propName": "是否透明",
                            "vid": 210,
                            "propValue": "否",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        },
                        {
                            "templatePid": 1125698,
                            "pid": 5,
                            "refPid": 21,
                            "propName": "领型",
                            "vid": 171,
                            "propValue": "单肩",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        },
                        {
                            "templatePid": 1125691,
                            "pid": 4,
                            "refPid": 20,
                            "propName": "护理说明",
                            "vid": 26004,
                            "propValue": "可机洗且可干洗",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        },
                        {
                            "templatePid": 1125692,
                            "pid": 3,
                            "refPid": 19,
                            "propName": "风格",
                            "vid": 136,
                            "propValue": "复古",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        },
                        {
                            "templatePid": 1125673,
                            "pid": 1,
                            "refPid": 12,
                            "propName": "材质",
                            "vid": 2,
                            "propValue": "亚麻",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        },
                        {
                            "templatePid": 1300212,
                            "pid": 2,
                            "refPid": 6547,
                            "propName": "里衬成分",
                            "vid": 35392,
                            "propValue": "蚕丝Silk",
                            "valueUnit": "%",
                            "numberInputValue": "100",
                            "valueExtendInfo": "",
                            "controlType": 16
                        },
                        {
                            "templatePid": 1125672,
                            "pid": 2,
                            "refPid": 15,
                            "propName": "成分",
                            "vid": 35385,
                            "propValue": "尼龙Nylon",
                            "valueUnit": "%",
                            "numberInputValue": "100",
                            "valueExtendInfo": "",
                            "controlType": 16
                        },
                        {
                            "templatePid": 1298785,
                            "pid": 2052,
                            "refPid": 6934,
                            "propName": "里料克重（g/m²)",
                            "vid": 0,
                            "propValue": "111",
                            "valueUnit": "g/㎡",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 0
                        },
                        {
                            "templatePid": 1294780,
                            "pid": 2050,
                            "refPid": 6928,
                            "propName": "里料纹理",
                            "vid": 161110,
                            "propValue": "光面",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        },
                        {
                            "templatePid": 1292401,
                            "pid": 2054,
                            "refPid": 6926,
                            "propName": "面料纹理1",
                            "vid": 161199,
                            "propValue": "绒面/PU",
                            "valueUnit": "",
                            "numberInputValue": "",
                            "valueExtendInfo": "",
                            "controlType": 1
                        }
                    ],
                    "specAttrs": [
                        {
                            "attrId": 7415576165966242393,
                            "templatePid": 1144073,
                            "pid": 13,
                            "refPid": 63,
                            "vid": 472,
                            "propName": "颜色",
                            "propValue": "灰色",
                            "parentSpecId": 1001,
                            "parentSpecName": "颜色",
                            "specId": 16080,
                            "specName": "灰色",
                            "valueGroupId": 2,
                            "valueGroupName": "灰色系",
                            "numberInputValue": "",
                            "valueUnit": "",
                            "valueExtendInfo": "(128,128,128,1)"
                        },
                        {
                            "attrId": 7415576165966242394,
                            "templatePid": 1144074,
                            "pid": 14,
                            "refPid": 65,
                            "vid": 313,
                            "propName": "尺码",
                            "propValue": "XS",
                            "parentSpecId": 3001,
                            "parentSpecName": "尺码",
                            "specId": 12001,
                            "specName": "XS",
                            "valueGroupId": 2,
                            "valueGroupName": "中国码",
                            "numberInputValue": "",
                            "valueUnit": "",
                            "valueExtendInfo": ""
                        },
                        {
                            "attrId": 7415576165966242395,
                            "templatePid": 1144074,
                            "pid": 14,
                            "refPid": 65,
                            "vid": 315,
                            "propName": "尺码",
                            "propValue": "S",
                            "parentSpecId": 3001,
                            "parentSpecName": "尺码",
                            "specId": 10004,
                            "specName": "S",
                            "valueGroupId": 2,
                            "valueGroupName": "中国码",
                            "numberInputValue": "",
                            "valueUnit": "",
                            "valueExtendInfo": ""
                        },
                        {
                            "attrId": 7415576165966242396,
                            "templatePid": 1144074,
                            "pid": 14,
                            "refPid": 65,
                            "vid": 317,
                            "propName": "尺码",
                            "propValue": "M",
                            "parentSpecId": 3001,
                            "parentSpecName": "尺码",
                            "specId": 9005,
                            "specName": "M",
                            "valueGroupId": 2,
                            "valueGroupName": "中国码",
                            "numberInputValue": "",
                            "valueUnit": "",
                            "valueExtendInfo": ""
                        },
                        {
                            "attrId": 7415576165966242397,
                            "templatePid": 1144074,
                            "pid": 14,
                            "refPid": 65,
                            "vid": 319,
                            "propName": "尺码",
                            "propValue": "L",
                            "parentSpecId": 3001,
                            "parentSpecName": "尺码",
                            "specId": 11002,
                            "specName": "L",
                            "valueGroupId": 2,
                            "valueGroupName": "中国码",
                            "numberInputValue": "",
                            "valueUnit": "",
                            "valueExtendInfo": ""
                        },
                        {
                            "attrId": 7415576165966242398,
                            "templatePid": 1144074,
                            "pid": 14,
                            "refPid": 65,
                            "vid": 320,
                            "propName": "尺码",
                            "propValue": "XL",
                            "parentSpecId": 3001,
                            "parentSpecName": "尺码",
                            "specId": 12003,
                            "specName": "XL",
                            "valueGroupId": 2,
                            "valueGroupName": "中国码",
                            "numberInputValue": "",
                            "valueUnit": "",
                            "valueExtendInfo": ""
                        },
                        {
                            "attrId": 7415576165966242399,
                            "templatePid": 1144074,
                            "pid": 14,
                            "refPid": 65,
                            "vid": 321,
                            "propName": "尺码",
                            "propValue": "XXL",
                            "parentSpecId": 3001,
                            "parentSpecName": "尺码",
                            "specId": 8002,
                            "specName": "XXL",
                            "valueGroupId": 2,
                            "valueGroupName": "中国码",
                            "numberInputValue": "",
                            "valueUnit": "",
                            "valueExtendInfo": ""
                        },
                        {
                            "attrId": 7415607709221052553,
                            "templatePid": 1144074,
                            "pid": 14,
                            "refPid": 65,
                            "vid": 29161,
                            "propName": "尺码",
                            "propValue": "one-size",
                            "parentSpecId": 3001,
                            "parentSpecName": "尺码",
                            "specId": 33228,
                            "specName": "one-size",
                            "valueGroupId": 2,
                            "valueGroupName": "中国码",
                            "numberInputValue": "",
                            "valueUnit": "",
                            "valueExtendInfo": ""
                        }
                    ],
                    "skcReqs": [
                        {
                            "productSkcId": 7415576165966242400,
                            "skcId": 7415566309297315987,
                            "skcCode": "526010003200101",
                            "color": "灰色",
                            "platformColor": "灰色",
                            "skcState": 1,
                            "mainSpecReqs": [
                                {
                                    "skuSpecId": null,
                                    "parentSpecId": 1001,
                                    "parentSpecName": "颜色",
                                    "specId": 16080,
                                    "specName": "灰色"
                                }
                            ],
                            "skuReqs": [
                                {
                                    "productSkuId": null,
                                    "skuId": 7415566311868424345,
                                    "skuCode": "526010003200101N-XS",
                                    "supplierPrice": 100,
                                    "skuWeightValue": 100000,
                                    "len": 350,
                                    "width": 280,
                                    "height": 10,
                                    "numberOfPieces": null,
                                    "skuClassification": 1,
                                    "skuState": null,
                                    "warehouseStockQuantityReqs": [
                                        {
                                            "warehouseRouteId": null,
                                            "targetStockAvailable": "0",
                                            "warehouseId": "WH-09919088230530140"
                                        },
                                        {
                                            "warehouseRouteId": null,
                                            "targetStockAvailable": "0",
                                            "warehouseId": "WH-07170316861570140"
                                        }
                                    ],
                                    "skuSpecReqs": [
                                        {
                                            "skuSpecId": null,
                                            "parentSpecId": 3001,
                                            "parentSpecName": "尺码",
                                            "specId": 12001,
                                            "specName": "XS"
                                        },
                                        {
                                            "skuSpecId": null,
                                            "parentSpecId": 1001,
                                            "parentSpecName": "颜色",
                                            "specId": 16080,
                                            "specName": "灰色"
                                        }
                                    ]
                                },
                                {
                                    "productSkuId": null,
                                    "skuId": 7415566311868424346,
                                    "skuCode": "526010003200101N-S",
                                    "supplierPrice": 100,
                                    "skuWeightValue": 100000,
                                    "len": 350,
                                    "width": 280,
                                    "height": 10,
                                    "numberOfPieces": null,
                                    "skuClassification": 1,
                                    "skuState": null,
                                    "warehouseStockQuantityReqs": [
                                        {
                                            "warehouseRouteId": null,
                                            "targetStockAvailable": "0",
                                            "warehouseId": "WH-09919088230530140"
                                        },
                                        {
                                            "warehouseRouteId": null,
                                            "targetStockAvailable": "0",
                                            "warehouseId": "WH-07170316861570140"
                                        }
                                    ],
                                    "skuSpecReqs": [
                                        {
                                            "skuSpecId": null,
                                            "parentSpecId": 3001,
                                            "parentSpecName": "尺码",
                                            "specId": 10004,
                                            "specName": "S"
                                        },
                                        {
                                            "skuSpecId": null,
                                            "parentSpecId": 1001,
                                            "parentSpecName": "颜色",
                                            "specId": 16080,
                                            "specName": "灰色"
                                        }
                                    ]
                                },
                                {
                                    "productSkuId": null,
                                    "skuId": 7415566311868424347,
                                    "skuCode": "526010003200101N-M",
                                    "supplierPrice": 100,
                                    "skuWeightValue": 100000,
                                    "len": 350,
                                    "width": 280,
                                    "height": 10,
                                    "numberOfPieces": null,
                                    "skuClassification": 1,
                                    "skuState": null,
                                    "warehouseStockQuantityReqs": [
                                        {
                                            "warehouseRouteId": null,
                                            "targetStockAvailable": "0",
                                            "warehouseId": "WH-09919088230530140"
                                        },
                                        {
                                            "warehouseRouteId": null,
                                            "targetStockAvailable": "0",
                                            "warehouseId": "WH-07170316861570140"
                                        }
                                    ],
                                    "skuSpecReqs": [
                                        {
                                            "skuSpecId": null,
                                            "parentSpecId": 3001,
                                            "parentSpecName": "尺码",
                                            "specId": 9005,
                                            "specName": "M"
                                        },
                                        {
                                            "skuSpecId": null,
                                            "parentSpecId": 1001,
                                            "parentSpecName": "颜色",
                                            "specId": 16080,
                                            "specName": "灰色"
                                        }
                                    ]
                                },
                                {
                                    "productSkuId": null,
                                    "skuId": 7415566311868424348,
                                    "skuCode": "526010003200101N-L",
                                    "supplierPrice": 100,
                                    "skuWeightValue": 100000,
                                    "len": 350,
                                    "width": 280,
                                    "height": 10,
                                    "numberOfPieces": null,
                                    "skuClassification": 1,
                                    "skuState": null,
                                    "warehouseStockQuantityReqs": [
                                        {
                                            "warehouseRouteId": null,
                                            "targetStockAvailable": "0",
                                            "warehouseId": "WH-09919088230530140"
                                        },
                                        {
                                            "warehouseRouteId": null,
                                            "targetStockAvailable": "0",
                                            "warehouseId": "WH-07170316861570140"
                                        }
                                    ],
                                    "skuSpecReqs": [
                                        {
                                            "skuSpecId": null,
                                            "parentSpecId": 3001,
                                            "parentSpecName": "尺码",
                                            "specId": 11002,
                                            "specName": "L"
                                        },
                                        {
                                            "skuSpecId": null,
                                            "parentSpecId": 1001,
                                            "parentSpecName": "颜色",
                                            "specId": 16080,
                                            "specName": "灰色"
                                        }
                                    ]
                                },
                                {
                                    "productSkuId": null,
                                    "skuId": 7415566311868424349,
                                    "skuCode": "526010003200101N-XL",
                                    "supplierPrice": 100,
                                    "skuWeightValue": 100000,
                                    "len": 350,
                                    "width": 280,
                                    "height": 10,
                                    "numberOfPieces": null,
                                    "skuClassification": 1,
                                    "skuState": null,
                                    "warehouseStockQuantityReqs": [
                                        {
                                            "warehouseRouteId": null,
                                            "targetStockAvailable": "0",
                                            "warehouseId": "WH-09919088230530140"
                                        },
                                        {
                                            "warehouseRouteId": null,
                                            "targetStockAvailable": "0",
                                            "warehouseId": "WH-07170316861570140"
                                        }
                                    ],
                                    "skuSpecReqs": [
                                        {
                                            "skuSpecId": null,
                                            "parentSpecId": 3001,
                                            "parentSpecName": "尺码",
                                            "specId": 12003,
                                            "specName": "XL"
                                        },
                                        {
                                            "skuSpecId": null,
                                            "parentSpecId": 1001,
                                            "parentSpecName": "颜色",
                                            "specId": 16080,
                                            "specName": "灰色"
                                        }
                                    ]
                                },
                                {
                                    "productSkuId": null,
                                    "skuId": null,
                                    "skuCode": null,
                                    "supplierPrice": 100,
                                    "skuWeightValue": 100000,
                                    "len": 350,
                                    "width": 280,
                                    "height": 10,
                                    "numberOfPieces": null,
                                    "skuClassification": 1,
                                    "skuState": null,
                                    "warehouseStockQuantityReqs": [
                                        {
                                            "warehouseRouteId": null,
                                            "targetStockAvailable": "0",
                                            "warehouseId": "WH-09919088230530140"
                                        },
                                        {
                                            "warehouseRouteId": null,
                                            "targetStockAvailable": "0",
                                            "warehouseId": "WH-07170316861570140"
                                        }
                                    ],
                                    "skuSpecReqs": [
                                        {
                                            "skuSpecId": null,
                                            "parentSpecId": 3001,
                                            "parentSpecName": "尺码",
                                            "specId": 8002,
                                            "specName": "XXL"
                                        },
                                        {
                                            "skuSpecId": null,
                                            "parentSpecId": 1001,
                                            "parentSpecName": "颜色",
                                            "specId": 16080,
                                            "specName": "灰色"
                                        }
                                    ]
                                },
                                {
                                    "productSkuId": null,
                                    "skuId": null,
                                    "skuCode": null,
                                    "supplierPrice": 100,
                                    "skuWeightValue": 100000,
                                    "len": 350,
                                    "width": 280,
                                    "height": 10,
                                    "numberOfPieces": null,
                                    "skuClassification": null,
                                    "skuState": null,
                                    "warehouseStockQuantityReqs": [
                                        {
                                            "warehouseRouteId": null,
                                            "targetStockAvailable": "0",
                                            "warehouseId": "WH-09919088230530140"
                                        },
                                        {
                                            "warehouseRouteId": null,
                                            "targetStockAvailable": "0",
                                            "warehouseId": "WH-07170316861570140"
                                        }
                                    ],
                                    "skuSpecReqs": [
                                        {
                                            "skuSpecId": null,
                                            "parentSpecId": 3001,
                                            "parentSpecName": "尺码",
                                            "specId": 33228,
                                            "specName": "one-size"
                                        },
                                        {
                                            "skuSpecId": null,
                                            "parentSpecId": 1001,
                                            "parentSpecName": "颜色",
                                            "specId": 16080,
                                            "specName": "灰色"
                                        }
                                    ]
                                }
                            ],
                            "images": [
                                "https://oss-datawork-cdn.tiangong.tech/ai_images/server/autocrop/4495334053327366593_9f0ba156ea1ce6a1a178e6782b507b19.png",
                                "https://oss-datawork-cdn.tiangong.tech/ai_images/server/autocrop/4495334053327366592_07d93cd5a84b0e9eaa90eae86cb4ea37.png",
                                "https://oss-datawork-cdn.tiangong.tech/ai_images/server/autocrop/4495334053327366594_f763989b8a90f04d9639bc3131e2c584.png"
                            ]
                        }
                    ],
                    "sizeReqs": [
                        {
                            "productSizeId": null,
                            "name": "lzh另存模板1",
                            "show": "YES",
                            "elementList": [
                                {
                                    "name": "胸围全围",
                                    "id": 10002
                                },
                                {
                                    "name": "裙长",
                                    "id": 10010
                                }
                            ],
                            "sizeReqs": [
                                {
                                    "size": "XS",
                                    "platformSize": "XS",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": 104,
                                            "diff": null
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": 132,
                                            "diff": null
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                },
                                {
                                    "size": "S",
                                    "platformSize": "S",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": 106,
                                            "diff": 2
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": 135,
                                            "diff": 1
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                },
                                {
                                    "size": "M",
                                    "platformSize": "M",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": 110,
                                            "diff": 3
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": 140,
                                            "diff": 4
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                },
                                {
                                    "size": "L",
                                    "platformSize": "L",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": 112,
                                            "diff": 5
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": 143,
                                            "diff": 6
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                },
                                {
                                    "size": "XL",
                                    "platformSize": "XL",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": 118,
                                            "diff": 12
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": 150,
                                            "diff": 13
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                },
                                {
                                    "size": "XXL",
                                    "platformSize": "XXL",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": 4,
                                            "diff": 11
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": 6,
                                            "diff": 22
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                },
                                {
                                    "size": "one-size",
                                    "platformSize": "one-size",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": 6,
                                            "diff": 2
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": 5,
                                            "diff": 3
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "productSizeId": null,
                            "name": "lzh另存模板1",
                            "show": "YES",
                            "elementList": [
                                {
                                    "name": "胸围全围",
                                    "id": 10002
                                },
                                {
                                    "name": "裙长",
                                    "id": 10010
                                }
                            ],
                            "sizeReqs": [
                                {
                                    "size": "XS",
                                    "platformSize": "XS",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": 104,
                                            "diff": null
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": 132,
                                            "diff": null
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                },
                                {
                                    "size": "S",
                                    "platformSize": "S",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": 106,
                                            "diff": 2
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": 135,
                                            "diff": 1
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                },
                                {
                                    "size": "M",
                                    "platformSize": "M",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": 110,
                                            "diff": 3
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": 140,
                                            "diff": 4
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                },
                                {
                                    "size": "L",
                                    "platformSize": "L",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": 112,
                                            "diff": 5
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": 143,
                                            "diff": 6
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                },
                                {
                                    "size": "XL",
                                    "platformSize": "XL",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": 118,
                                            "diff": 12
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": 150,
                                            "diff": 13
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                },
                                {
                                    "size": "XXL",
                                    "platformSize": "XXL",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": 4,
                                            "diff": 11
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": 6,
                                            "diff": 22
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                },
                                {
                                    "size": "one-size",
                                    "platformSize": "one-size",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": null,
                                            "diff": null
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": null,
                                            "diff": null
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "productSizeId": null,
                            "name": "lzh另存模板1",
                            "show": "YES",
                            "elementList": [
                                {
                                    "name": "胸围全围",
                                    "id": 10002
                                },
                                {
                                    "name": "裙长",
                                    "id": 10010
                                }
                            ],
                            "sizeReqs": [
                                {
                                    "size": "XS",
                                    "platformSize": "XS",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": 104,
                                            "diff": null
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": 132,
                                            "diff": null
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                },
                                {
                                    "size": "S",
                                    "platformSize": "S",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": 106,
                                            "diff": 2
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": 135,
                                            "diff": 1
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                },
                                {
                                    "size": "M",
                                    "platformSize": "M",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": 110,
                                            "diff": 3
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": 140,
                                            "diff": 4
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                },
                                {
                                    "size": "L",
                                    "platformSize": "L",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": 112,
                                            "diff": 5
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": 143,
                                            "diff": 6
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                },
                                {
                                    "size": "XL",
                                    "platformSize": "XL",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": 118,
                                            "diff": 12
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": 150,
                                            "diff": 13
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                },
                                {
                                    "size": "XXL",
                                    "platformSize": "XXL",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": 4,
                                            "diff": 11
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": 6,
                                            "diff": 22
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                },
                                {
                                    "size": "one-size",
                                    "platformSize": "one-size",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": null,
                                            "diff": null
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": null,
                                            "diff": null
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "productSizeId": null,
                            "name": "lzh另存模板1",
                            "show": "YES",
                            "elementList": [
                                {
                                    "name": "胸围全围",
                                    "id": 10002
                                },
                                {
                                    "name": "裙长",
                                    "id": 10010
                                }
                            ],
                            "sizeReqs": [
                                {
                                    "size": "XS",
                                    "platformSize": "XS",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": 104,
                                            "diff": null
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": 132,
                                            "diff": null
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                },
                                {
                                    "size": "S",
                                    "platformSize": "S",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": 106,
                                            "diff": 2
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": 135,
                                            "diff": 1
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                },
                                {
                                    "size": "M",
                                    "platformSize": "M",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": 110,
                                            "diff": 3
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": 140,
                                            "diff": 4
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                },
                                {
                                    "size": "L",
                                    "platformSize": "L",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": 112,
                                            "diff": 5
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": 143,
                                            "diff": 6
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                },
                                {
                                    "size": "XL",
                                    "platformSize": "XL",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": 118,
                                            "diff": 12
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": 150,
                                            "diff": 13
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                },
                                {
                                    "size": "XXL",
                                    "platformSize": "XXL",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": 4,
                                            "diff": 11
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": 6,
                                            "diff": 22
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                },
                                {
                                    "size": "one-size",
                                    "platformSize": "one-size",
                                    "values": [
                                        {
                                            "sizePartId": null,
                                            "part": 10002,
                                            "partName": "胸围全围",
                                            "value": null,
                                            "diff": null
                                        },
                                        {
                                            "sizePartId": null,
                                            "part": 10010,
                                            "partName": "裙长",
                                            "value": null,
                                            "diff": null
                                        }
                                    ],
                                    "elementList": [
                                        {
                                            "name": "胸围全围",
                                            "id": 10002
                                        },
                                        {
                                            "name": "裙长",
                                            "id": 10010
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
                """ ;
        this.service.skcUpsert(JsonsKt.parseJson(json , ProductAddReq.class)) ;
    }
    @Test
    void syncTemuDataGroup () {
        UserContexts.withSystemUser(() -> this.service.syncTemuDataGroup());
    }
    @Test
    void salesDrivings () {
        UserContexts.withSystemUser(() -> this.service.salesDrivings());
    }
    @Test
    void related () {
        UserContexts.withSystemUser(() -> this.service.related());
    }
    @Test
    void binding () {
        UserContexts.withSystemUser(() -> this.service.binding(Set.of("5260400300701")));
    }
}
