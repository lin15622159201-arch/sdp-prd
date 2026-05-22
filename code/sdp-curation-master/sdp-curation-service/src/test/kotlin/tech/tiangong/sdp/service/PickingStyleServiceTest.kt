package tech.tiangong.sdp.service

import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import team.aikero.blade.auth.withSystemUser
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.user.entity.CurrentUser
import team.aikero.blade.user.holder.DefaultCurrentUserContentSetter
import team.aikero.blade.util.json.parseJson
import team.aikero.blade.util.json.toJson
import team.aikero.blade.util.json.toJsonPretty
import tech.tiangong.sdp.SdpApplication
import tech.tiangong.sdp.req.picking.BatchPickingConfirmReq
import tech.tiangong.sdp.req.picking.PickingConfirmReq
import tech.tiangong.sdp.req.picking.PickingStylePageReq
import tech.tiangong.sdp.req.picking.PickingStyleResultPageReq

@SpringBootTest(classes = [SdpApplication::class], properties = ["spring.profiles.active=qa-xiniu"])
@Slf4j
class PickingStyleServiceTest {

    private val currentUserContentSetter = DefaultCurrentUserContentSetter

    @Autowired
    private lateinit var pickingStyleService: PickingStyleService


    @BeforeEach
    fun setUp() =
        currentUserContentSetter.set(
            CurrentUser(
                148231653, "覃文轩", "",
                tenantId = 1L, false,
            )
        )

    @AfterEach
    fun tearDown() =
        currentUserContentSetter.clean()

    @Test
    fun page() {
        val pageReq = PickingStylePageReq()
//        pageReq.externalCategory =
//        pageReq.pickingCreatorName =
//        pageReq.pickingStartTime =
//        pageReq.pickingEndTime =
//        pageReq.inspirationSource =
//        pageReq.countrySiteCode =
//        pageReq.selectorId =
//        pageReq.selectorName =
//        pageReq.imagePickingStartTime =
//        pageReq.imagePickingEndTime =
//        pageReq.waveBatchCode =
//        pageReq.pickingState =
//        pageReq.creatorIds = setOf(142752002)
//        pageReq.taskCode = setOf("2508080002")
//        pageReq.pickingState = 0
//        pageReq.dataSourceType = "AIGC"
//        pageReq.creatorIds = setOf(191104913)
        pageReq.pageNum = 1
        pageReq.pageSize = 100
        val page = pickingStyleService.page(pageReq)
        log.info { "page: ${page.toJsonPretty()}" }
    }

    @Test
    fun countPickingStatus() {
    }

    @Test
    fun confirm() {
        val json =
            "{\"pickingId\":7302856240982736945,\"result\":[{\"pickingStyleId\":7302856241007902770,\"pickingState\":1,\"updateVersion\":null,\"resultDetail\":{\"suggestedPrice\":1,\"suggestedStyleCode\":\"Lazada>VNfashion\",\"suggestedCategoryCode\":\"01>0101>010101\",\"suggestedWaveBatchCode\":\"0804\",\"suggestedPrintingCode\":null,\"suggestedCountrySiteCode\":null,\"cargoTrayCode\":null,\"productThemeCode\":null,\"productThemeName\":null,\"suggestedShopId\":7270688359495475213,\"suggestedShopCode\":null,\"suggestedShopName\":\"乐凯大街\",\"sceneCode\":\"Party\",\"sceneName\":\"Party\",\"remark\":\"111\",\"attachments\":[{\"fileUrl\":\"https://chuangxin-oss-cdn.tiangong.tech/tiangong_55d4dc52820e4887ab3fc3ae441d2a9f.png\",\"fileName\":\"1_1717401806344-1717420880911.png\",\"fileType\":\"image/png\"},{\"fileUrl\":\"https://chuangxin-oss-cdn.tiangong.tech/tiangong_a0d8b86fe65d45da8fdaa3cb63dca5b7.png\",\"fileName\":\"1_1717427532603-1717428219482.png\",\"fileType\":\"image/png\"}],\"runningDiagramProblemCodes\":null},\"imageInfos\":[{\"pickingPictureId\":\"7302856241016291380\",\"serialNum\":1,\"mainImageType\":1,\"fixImageType\":1,\"eliminateType\":0,\"eliminateReasonCodes\":[]},{\"pickingPictureId\":\"7302856241016291381\",\"serialNum\":2,\"mainImageType\":0,\"fixImageType\":0,\"eliminateType\":0,\"eliminateReasonCodes\":[]},{\"pickingPictureId\":\"7302856241016291382\",\"serialNum\":3,\"mainImageType\":0,\"fixImageType\":1,\"eliminateType\":0,\"eliminateReasonCodes\":[]},{\"pickingPictureId\":\"7302856241016291383\",\"serialNum\":4,\"mainImageType\":0,\"fixImageType\":0,\"eliminateType\":0,\"eliminateReasonCodes\":[]}]},{\"pickingStyleId\":7302856241016291384,\"pickingState\":1,\"updateVersion\":null,\"resultDetail\":{\"suggestedPrice\":1,\"suggestedStyleCode\":\"Lazada>VNfashion\",\"suggestedCategoryCode\":\"01>0101>010101\",\"suggestedWaveBatchCode\":\"\",\"suggestedPrintingCode\":null,\"suggestedCountrySiteCode\":null,\"cargoTrayCode\":null,\"productThemeCode\":null,\"productThemeName\":null,\"suggestedShopId\":7270688359495475213,\"suggestedShopCode\":null,\"suggestedShopName\":\"乐凯大街\",\"sceneCode\":\"Party\",\"sceneName\":\"Party\",\"remark\":null,\"attachments\":[{\"fileUrl\":\"https://chuangxin-oss-cdn.tiangong.tech/tiangong_55d4dc52820e4887ab3fc3ae441d2a9f.png\",\"fileName\":\"1_1717401806344-1717420880911.png\",\"fileType\":\"image/png\"},{\"fileUrl\":\"https://chuangxin-oss-cdn.tiangong.tech/tiangong_a0d8b86fe65d45da8fdaa3cb63dca5b7.png\",\"fileName\":\"1_1717427532603-1717428219482.png\",\"fileType\":\"image/png\"}],\"runningDiagramProblemCodes\":null},\"imageInfos\":[{\"pickingPictureId\":\"7302856241016291386\",\"serialNum\":5,\"mainImageType\":1,\"fixImageType\":1,\"eliminateType\":0,\"eliminateReasonCodes\":[]},{\"pickingPictureId\":\"7302856241016291387\",\"serialNum\":6,\"mainImageType\":0,\"fixImageType\":0,\"eliminateType\":0,\"eliminateReasonCodes\":[]},{\"pickingPictureId\":\"7302856241016291388\",\"serialNum\":7,\"mainImageType\":0,\"fixImageType\":0,\"eliminateType\":0,\"eliminateReasonCodes\":[]},{\"pickingPictureId\":\"7302856241016291389\",\"serialNum\":8,\"mainImageType\":0,\"fixImageType\":1,\"eliminateType\":0,\"eliminateReasonCodes\":[]}]},{\"pickingStyleId\":7302856241016291390,\"pickingState\":2,\"updateVersion\":null,\"resultDetail\":null,\"imageInfos\":[{\"pickingPictureId\":\"7302856241016291392\",\"serialNum\":9,\"mainImageType\":1,\"fixImageType\":0,\"eliminateType\":0,\"eliminateReasonCodes\":[]},{\"pickingPictureId\":\"7302856241016291393\",\"serialNum\":10,\"mainImageType\":0,\"fixImageType\":0,\"eliminateType\":0,\"eliminateReasonCodes\":[]},{\"pickingPictureId\":\"7302856241016291394\",\"serialNum\":11,\"mainImageType\":0,\"fixImageType\":0,\"eliminateType\":0,\"eliminateReasonCodes\":[]},{\"pickingPictureId\":\"7302856241016291395\",\"serialNum\":12,\"mainImageType\":0,\"fixImageType\":0,\"eliminateType\":0,\"eliminateReasonCodes\":[]}]},{\"pickingStyleId\":7302856241016291396,\"pickingState\":2,\"updateVersion\":null,\"resultDetail\":null,\"imageInfos\":[{\"pickingPictureId\":\"7302856241016291398\",\"serialNum\":13,\"mainImageType\":1,\"fixImageType\":0,\"eliminateType\":0,\"eliminateReasonCodes\":[]},{\"pickingPictureId\":\"7302856241016291399\",\"serialNum\":14,\"mainImageType\":0,\"fixImageType\":0,\"eliminateType\":0,\"eliminateReasonCodes\":[]},{\"pickingPictureId\":\"7302856241016291400\",\"serialNum\":15,\"mainImageType\":0,\"fixImageType\":0,\"eliminateType\":0,\"eliminateReasonCodes\":[]},{\"pickingPictureId\":\"7302856241016291401\",\"serialNum\":16,\"mainImageType\":0,\"fixImageType\":0,\"eliminateType\":0,\"eliminateReasonCodes\":[]}]}]}"
//            "{\"pickingId\":\"7304084469378613301\",\"result\":[{\"pickingStyleId\":\"7304084469403779126\",\"pickingState\":1,\"imageInfos\":[{\"pickingPictureId\":\"7304084469403779128\",\"serialNum\":1,\"mainImageType\":1,\"fixImageType\":1,\"eliminateType\":0,\"eliminateReasonCodes\":[]},{\"pickingPictureId\":\"7304084469403779129\",\"serialNum\":2,\"mainImageType\":0,\"fixImageType\":1,\"eliminateType\":0,\"eliminateReasonCodes\":[]},{\"pickingPictureId\":\"7304084469403779130\",\"serialNum\":3,\"mainImageType\":0,\"fixImageType\":1,\"eliminateType\":0,\"eliminateReasonCodes\":[]},{\"pickingPictureId\":\"7304084469403779131\",\"serialNum\":4,\"mainImageType\":0,\"fixImageType\":1,\"eliminateType\":0,\"eliminateReasonCodes\":[]}],\"resultDetail\":{\"productTheme\":\"A1>花圃都市\",\"suggestedStyle\":null,\"suggestedShopName\":\"深藏不low\",\"suggestedShopCode\":null,\"suggestedPrinting\":null,\"suggestedCountrySiteCode\":\"PH\",\"cargoTrayCode\":\"regular_style\",\"remark\":\"选款推送测试刘岳华\",\"updateVersion\":\"7304084469403779127\",\"suggestedPrice\":21,\"sceneCode\":\"Party\",\"sceneName\":\"Party\",\"suggestedShopId\":\"7265952300403937281\",\"suggestedPrintingCode\":\"01\",\"attachments\":[{\"fileUrl\":\"https://chuangxin-oss-cdn.tiangong.tech/tiangong_b716c8bc7db8416cbdbb0462df3e69e0.png\",\"fileName\":\"1_1717948485762-1718092290779.png\",\"fileType\":\"image/png\"},{\"fileUrl\":\"https://chuangxin-oss-cdn.tiangong.tech/tiangong_9b9fa70a657548e7954d724fbf4e05b8.jpg\",\"fileName\":\"1_1718854429595-1719314189214.jpg\",\"fileType\":\"image/jpeg\"}],\"suggestedWaveBatchCode\":\"0804\",\"suggestedStyleCode\":\"Lazada>VNfashion\",\"suggestedStyleName\":\"Lazada>VN fashion\",\"suggestedCategoryCode\":\"03>0301>030101\",\"suggestedCategoryName\":\"男装>上装类>帽衫和针织衫\",\"productThemeCode\":\"A1\",\"productThemeName\":\"花圃都市\"}},{\"pickingStyleId\":\"7304084469403779132\",\"pickingState\":1,\"imageInfos\":[{\"pickingPictureId\":\"7304084469403779134\",\"serialNum\":5,\"mainImageType\":1,\"fixImageType\":1,\"eliminateType\":0,\"eliminateReasonCodes\":[]},{\"pickingPictureId\":\"7304084469403779135\",\"serialNum\":6,\"mainImageType\":0,\"fixImageType\":1,\"eliminateType\":0,\"eliminateReasonCodes\":[]},{\"pickingPictureId\":\"7304084469403779136\",\"serialNum\":7,\"mainImageType\":0,\"fixImageType\":1,\"eliminateType\":0,\"eliminateReasonCodes\":[]},{\"pickingPictureId\":\"7304084469403779137\",\"serialNum\":8,\"mainImageType\":0,\"fixImageType\":1,\"eliminateType\":0,\"eliminateReasonCodes\":[]}],\"resultDetail\":{\"productTheme\":\"A1>花圃都市\",\"suggestedStyle\":null,\"suggestedShopName\":\"VN本土店铺\",\"suggestedShopCode\":null,\"suggestedPrinting\":null,\"suggestedCountrySiteCode\":\"PH\",\"cargoTrayCode\":\"regular_style\",\"remark\":\"微微\",\"updateVersion\":\"7304084469403779133\",\"suggestedPrice\":1,\"sceneCode\":\"Party\",\"sceneName\":\"Party\",\"suggestedShopId\":\"7267311176990937268\",\"suggestedPrintingCode\":\"01\",\"attachments\":[],\"suggestedWaveBatchCode\":\"0804\",\"suggestedStyleCode\":\"Lazada>VNfashion\",\"suggestedStyleName\":\"Lazada>VN fashion\",\"suggestedCategoryCode\":\"03>0301>030102>03010202\",\"suggestedCategoryName\":\"男装>上装类>其他外套>牛仔夹克\",\"productThemeCode\":\"A1\",\"productThemeName\":\"花圃都市\"}},{\"pickingStyleId\":\"7304084469403779138\",\"pickingState\":2,\"imageInfos\":[{\"pickingPictureId\":\"7304084469403779140\",\"serialNum\":9,\"mainImageType\":1,\"fixImageType\":0,\"eliminateType\":0,\"eliminateReasonCodes\":[]},{\"pickingPictureId\":\"7304084469403779141\",\"serialNum\":10,\"mainImageType\":0,\"fixImageType\":0,\"eliminateType\":0,\"eliminateReasonCodes\":[]},{\"pickingPictureId\":\"7304084469403779142\",\"serialNum\":11,\"mainImageType\":0,\"fixImageType\":0,\"eliminateType\":0,\"eliminateReasonCodes\":[]},{\"pickingPictureId\":\"7304084469403779143\",\"serialNum\":12,\"mainImageType\":0,\"fixImageType\":0,\"eliminateType\":0,\"eliminateReasonCodes\":[]}]},{\"pickingStyleId\":\"7304084469403779144\",\"pickingState\":2,\"imageInfos\":[{\"pickingPictureId\":\"7304084469403779146\",\"serialNum\":13,\"mainImageType\":1,\"fixImageType\":0,\"eliminateType\":0,\"eliminateReasonCodes\":[]},{\"pickingPictureId\":\"7304084469403779147\",\"serialNum\":14,\"mainImageType\":0,\"fixImageType\":0,\"eliminateType\":0,\"eliminateReasonCodes\":[]},{\"pickingPictureId\":\"7304084469403779148\",\"serialNum\":15,\"mainImageType\":0,\"fixImageType\":0,\"eliminateType\":0,\"eliminateReasonCodes\":[]},{\"pickingPictureId\":\"7304084469403779149\",\"serialNum\":16,\"mainImageType\":0,\"fixImageType\":0,\"eliminateType\":0,\"eliminateReasonCodes\":[]}]}]}"
        val req = json.parseJson(PickingConfirmReq::class.java)
        pickingStyleService.confirm(req)
    }

    @Test
    fun pageResult() {
        val pageReq = PickingStyleResultPageReq()
//        pageReq.suggestedCategoryCode =
//        pageReq.suggestedCountrySiteCode =
//        pageReq.suggestedWaveBatchCode =
//        pageReq.pickingCreatorName =
//        pageReq.pickingStartTime =
//        pageReq.pickingEndTime =
//        pageReq.inspirationSource =
//        pageReq.selectorId =
//        pageReq.selectorName =
//        pageReq.imagePickingStartTime =
//        pageReq.imagePickingEndTime =
//        pageReq.pickingState =
//        pageReq.openStyleState =
//        pageReq.fixImageType =
        pageReq.styleCode = setOf("xxx", "yyy")
        pageReq.pageNum = 1
        pageReq.pageSize = 1000
        val json = """
            {
            	"suggestedCategoryCode": "",
            	"pickingCreatorName": "覃文轩",
            	"selectorName": "",
            	"pickingStartTime": "",
            	"pickingEndTime": "",
            	"inspirationSource": "",
            	"suggestedCountrySiteCode": "",
            	"imagePickingStartTime": "",
            	"imagePickingEndTime": "",
            	"pickingState": "",
            	"suggestedWaveBatchCode": "",
            	"openStyleState": "",
            	"pageNum": 1,
            	"pageSize": 20,
            	"styleCode": []
            }
        """.trimIndent()
        val result = pickingStyleService.pageResult(json.parseJson(PickingStyleResultPageReq::class.java))
        log.info { "page: ${result.toJson()}" }
    }

    @Test
    fun detailResult() {
    }

    @Test
    fun getPickingStyleHistory() {
        this.pickingStyleService.getPickingStyleHistory(7352251723701846168).run {
            log.info { "单元测试\n${this.toJsonPretty()}" }
        }
    }

    @Test
    fun importPickingStyleList() {
    }

    @Test
    fun savePicking() {
    }

    @Test
    fun getTotalSupplyQuantity() {
    }

    @Test
    fun exportPickingResults() {
    }

    @Test
    fun pushPickingResult() {
        pickingStyleService.pushPickingResult()
    }

    @Test
    fun batchConfirm() {
        val json =
            """
                {
                	"confirms": [{
                		"pickingId": 7340924341225431140,
                		"result": [{
                			"pickingStyleId": 7340924341246402661,
                			"pickingState": 2,
                			"updateVersion": null,
                			"imageInfos": [{
                				"pickingPictureId": "7340924341246402663",
                				"serialNum": 1,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402664",
                				"serialNum": 2,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402665",
                				"serialNum": 3,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402666",
                				"serialNum": 4,
                				"mainImageType": 1,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}]
                		}, {
                			"pickingStyleId": 7340924341246402667,
                			"pickingState": 2,
                			"updateVersion": null,
                			"imageInfos": [{
                				"pickingPictureId": "7340924341246402669",
                				"serialNum": 5,
                				"mainImageType": 1,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402670",
                				"serialNum": 6,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402671",
                				"serialNum": 7,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402672",
                				"serialNum": 8,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}]
                		}, {
                			"pickingStyleId": 7340924341246402673,
                			"pickingState": 2,
                			"updateVersion": null,
                			"imageInfos": [{
                				"pickingPictureId": "7340924341246402675",
                				"serialNum": 9,
                				"mainImageType": 1,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402676",
                				"serialNum": 10,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402677",
                				"serialNum": 11,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402678",
                				"serialNum": 12,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}]
                		}, {
                			"pickingStyleId": 7340924341246402679,
                			"pickingState": 1,
                			"updateVersion": null,
                			"imageInfos": [{
                				"pickingPictureId": "7340924341246402681",
                				"serialNum": 13,
                				"mainImageType": 1,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402682",
                				"serialNum": 14,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402683",
                				"serialNum": 15,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402684",
                				"serialNum": 16,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}]
                		}, {
                			"pickingStyleId": 7340924341246402685,
                			"pickingState": 2,
                			"updateVersion": null,
                			"imageInfos": [{
                				"pickingPictureId": "7340924341246402687",
                				"serialNum": 1,
                				"mainImageType": 1,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402688",
                				"serialNum": 2,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402689",
                				"serialNum": 3,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402690",
                				"serialNum": 4,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}]
                		}, {
                			"pickingStyleId": 7340924341246402691,
                			"pickingState": 0,
                			"updateVersion": null,
                			"imageInfos": [{
                				"pickingPictureId": "7340924341246402693",
                				"serialNum": 5,
                				"mainImageType": 1,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402694",
                				"serialNum": 6,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402695",
                				"serialNum": 7,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402696",
                				"serialNum": 8,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}]
                		}, {
                			"pickingStyleId": 7340924341246402697,
                			"pickingState": 0,
                			"updateVersion": null,
                			"imageInfos": [{
                				"pickingPictureId": "7340924341246402699",
                				"serialNum": 9,
                				"mainImageType": 1,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402700",
                				"serialNum": 10,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402701",
                				"serialNum": 11,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402702",
                				"serialNum": 12,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}]
                		}, {
                			"pickingStyleId": 7340924341246402703,
                			"pickingState": 0,
                			"updateVersion": null,
                			"imageInfos": [{
                				"pickingPictureId": "7340924341246402705",
                				"serialNum": 13,
                				"mainImageType": 1,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402706",
                				"serialNum": 14,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402707",
                				"serialNum": 15,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402708",
                				"serialNum": 16,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}]
                		}, {
                			"pickingStyleId": 7340924341246402709,
                			"pickingState": 0,
                			"updateVersion": null,
                			"imageInfos": [{
                				"pickingPictureId": "7340924341246402711",
                				"serialNum": 1,
                				"mainImageType": 1,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402712",
                				"serialNum": 2,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402713",
                				"serialNum": 3,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402714",
                				"serialNum": 4,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}]
                		}, {
                			"pickingStyleId": 7340924341246402715,
                			"pickingState": 0,
                			"updateVersion": null,
                			"imageInfos": [{
                				"pickingPictureId": "7340924341246402717",
                				"serialNum": 5,
                				"mainImageType": 1,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402718",
                				"serialNum": 6,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402719",
                				"serialNum": 7,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402720",
                				"serialNum": 8,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}]
                		}, {
                			"pickingStyleId": 7340924341246402721,
                			"pickingState": 0,
                			"updateVersion": null,
                			"imageInfos": [{
                				"pickingPictureId": "7340924341246402723",
                				"serialNum": 9,
                				"mainImageType": 1,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402724",
                				"serialNum": 10,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402725",
                				"serialNum": 11,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402726",
                				"serialNum": 12,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}]
                		}, {
                			"pickingStyleId": 7340924341246402727,
                			"pickingState": 0,
                			"updateVersion": null,
                			"imageInfos": [{
                				"pickingPictureId": "7340924341246402729",
                				"serialNum": 13,
                				"mainImageType": 1,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402730",
                				"serialNum": 14,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402731",
                				"serialNum": 15,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}, {
                				"pickingPictureId": "7340924341246402732",
                				"serialNum": 16,
                				"mainImageType": 0,
                				"fixImageType": 0,
                				"eliminateType": 0,
                				"eliminateReasonCodes": []
                			}]
                		}]
                	}]
                }
            """.trimIndent()
        this.pickingStyleService.batchConfirm(json.parseJson(BatchPickingConfirmReq::class.java))
    }

    @Test
    fun getDesignTask() {
        withSystemUser {
            this.pickingStyleService.getDesignTask(7350804495741248567).run {
                log.info { "单元测试\n${this?.toJsonPretty()}" }
            }
        }
    }
}