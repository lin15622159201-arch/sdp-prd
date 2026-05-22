package tech.tiangong.sdp.service

import com.alibaba.fastjson2.JSONObject
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import team.aikero.blade.auth.withSystemUser
import team.aikero.blade.auth.withUser
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.user.entity.CurrentUser
import team.aikero.blade.user.holder.DefaultCurrentUserContentSetter
import team.aikero.blade.util.json.Json
import team.aikero.blade.util.json.parseJson
import team.aikero.blade.util.json.toJsonPretty
import team.aikero.blade.util.spring.SpringContextHolder
import tech.tiangong.sdp.SdpApplication
import tech.tiangong.sdp.common.req.AiDesignTaskCreateReq
import tech.tiangong.sdp.convert.InspirationConvert
import tech.tiangong.sdp.req.inspiration.InspirationImportImageReq
import tech.tiangong.sdp.req.inspiration.InspirationPageReq
import tech.tiangong.sdp.req.inspiration.InspirationSubmitReq
import tech.tiangong.sdp.req.inspiration.InspirationTaskSubmitReq

@SpringBootTest(classes = [SdpApplication::class], properties = ["spring.profiles.active=dev-xiniu"])
@Slf4j
class InspirationServiceTest {

    private val currentUserContentSetter = DefaultCurrentUserContentSetter

    @Autowired
    private lateinit var inspirationService: InspirationService


    @BeforeEach
    fun setUp() =
        currentUserContentSetter.set(
            CurrentUser(
                148231653, "覃文轩", "",
                tenantId = 2L, false,
            )
        )

    @AfterEach
    fun tearDown() =
        currentUserContentSetter.clean()

    @Test
    fun page() {
        val pageReq = InspirationPageReq()
//        pageReq.externalCategory =
//        pageReq.inspirationStartCreatedTime =
//        pageReq.inspirationEndCreatedTime =
//        pageReq.suggestedSupplyModeCode =
//        pageReq.inspirationSource =
//        pageReq.sourceCountrySiteCode =
//        pageReq.identifiedResult =
//        pageReq.inspirationSubmitCount =
//        pageReq.submitStatus =
//        pageReq.creatorName =
//        pageReq.submitterName =
//        pageReq.dataSourceCode =
//        pageReq.planningSourceCode =
//        pageReq.creatorIds = listOf(156994597)
//        pageReq.inspirationCode ="2025031808"
        pageReq.inspirationCode = "2025061614"
        pageReq.submitStatus = 1
        pageReq.pageNum = 1
        pageReq.pageSize = 20
        val page = inspirationService.page(pageReq)
        log.info { "page: ${page.toJsonPretty()}" }
    }

    @Test
    fun export() {
    }

    @Test
    fun importExcel() {
    }

    @Test
    fun importImage() {
        val json =
            "{\"supplyMethodCode\":\"Artificial\",\"countrySiteCode\":\"TH\",\"waveBatchCode\":\"0804\",\"planningSourceCode\":\"top\",\"inspirationImages\":[\"https://chuangxin-oss-cdn.tiangong.tech/tiangong_55d4dc52820e4887ab3fc3ae441d2a9f.png\"],\"inspirationImageSourceCode\":\"2222\",\"inspirationBrandCode\":\"2222\"}"
        val parseJson = json.parseJson(InspirationImportImageReq::class.java)
        val req = InspirationImportImageReq()
        withSystemUser {

            inspirationService.importImage(parseJson)
        }
    }

    @Test
    fun detail() {
        this.inspirationService.detail(7345738158711181328).run {
            log.info { "单元测试\n${this.toJsonPretty()}" }
        }
    }

    @Test
    fun taskSubmit() {
    }

    @Test
    fun taskReSubmitDetail() {
        // taskReSubmitDetail
        this.inspirationService.taskReSubmitDetail(7358735447373324289).run {
            log.info { "单元测试\n${this.toJsonPretty()}" }
        }
    }

    @Test
    fun getByInspirationOrPickingId() {
    }

    @Test
    fun submitAiDesignTask() {
        val json = """
            {
	"bizId": 7351858233440495195,
	"creatorId": 191104913,
	"creatorName": "毛宇哲",
	"tenantId": 1,
	"tryOnFix": 1,
	"createExtParam": null
}
        """.trimIndent()
        val req = json.parseJson(AiDesignTaskCreateReq::class.java)
        val currentUser = CurrentUser(
            id = req.creatorId,
            name = req.creatorName,
            code = "",
            tenantId = req.tenantId
        )
        withUser(currentUser) {
            inspirationService.submitAiDesignTask(req)
        }
    }

    @Test
    fun submitInspiration() {
//        val json = "{\"waveBatchCode\":\"0804\",\"supplyMethod\":\"Artificial\",\"generateMode\":1,\"generateNum\":4,\"expectedCostPrice\":0,\"modelInfo\":{\"aiModelCode\":\"\",\"aiModelName\":\"\",\"aiModelUrl\":\"\"},\"modelMaterialInfo\":{\"modelMaterialId\":\"\",\"modelMaterialName\":\"\",\"modelMaterialUrl\":\"\"},\"sceneInfo\":{\"sceneId\":\"\",\"sceneName\":\"\",\"pictureId\":\"\",\"picturePath\":\"\",\"pictureCaption\":\"\"},\"modeCode\":\"FG2_0\",\"modeName\":\"FG2.0\",\"filterBack\":1,\"faceRepair\":1,\"promiseEnhanced\":1,\"refWeight\":4,\"inspirationIds\":[\"7308304305205948704\"]}"
//        val json = "{\"inspirationId\":7303718075822669825,\"waveBatchCode\":\"0804\",\"supplyMethod\":\"Artificial\",\"generateMode\":1,\"filterBack\":0,\"faceRepair\":0,\"promiseEnhanced\":0,\"sceneInfo\":{\"sceneId\":null,\"sceneName\":\"\",\"pictureId\":null,\"picturePath\":\"\",\"pictureCaption\":\"\"},\"modelInfo\":{\"aiModelCode\":\"\",\"aiModelName\":\"\",\"aiModelUrl\":\"\"},\"modelMaterialInfo\":{\"modelMaterialId\":null,\"modelMaterialName\":\"\",\"modelMaterialUrl\":\"\"},\"generateNum\":4,\"expectedCostPrice\":0,\"categoryCode\":\"\",\"categoryName\":\"\",\"syncCategory\":1,\"modeCode\":\"FG2_0\",\"modeName\":\"FG2.0\",\"refWeight\":0,\"createExtParam\":null,\"single\":false}"
//        val req = json.parseJson(InspirationTaskSubmitReq::class.java)
//        val requests = InspirationConvert.convert(req)
//        requests.forEach{
//
//            inspirationService.submitInspiration(it)
//        }
//        val json = "{\"inspirationId\":7303718075822669825,\"waveBatchCode\":\"0804\",\"supplyMethod\":\"Artificial\",\"generateMode\":1,\"filterBack\":0,\"faceRepair\":0,\"promiseEnhanced\":0,\"sceneInfo\":{\"sceneId\":null,\"sceneName\":\"\",\"pictureId\":null,\"picturePath\":\"\",\"pictureCaption\":\"\"},\"modelInfo\":{\"aiModelCode\":\"\",\"aiModelName\":\"\",\"aiModelUrl\":\"\"},\"modelMaterialInfo\":{\"modelMaterialId\":null,\"modelMaterialName\":\"\",\"modelMaterialUrl\":\"\"},\"generateNum\":4,\"expectedCostPrice\":0,\"categoryCode\":\"\",\"categoryName\":\"\",\"syncCategory\":1,\"modeCode\":\"FG2_0\",\"modeName\":\"FG2.0\",\"refWeight\":0,\"createExtParam\":null,\"single\":false}"
        val json =
//            "{\"inspirationId\":7310200300961489081,\"waveBatchCode\":\"0804\",\"supplyMethod\":\"Artificial\",\"generateMode\":1,\"filterBack\":0,\"faceRepair\":0,\"promiseEnhanced\":0,\"sceneInfo\":{\"sceneId\":null,\"sceneName\":\"\",\"pictureId\":null,\"picturePath\":\"\",\"pictureCaption\":\"\"},\"modelInfo\":{\"aiModelCode\":\"\",\"aiModelName\":\"\",\"aiModelUrl\":\"\"},\"modelMaterialInfo\":{\"modelMaterialId\":null,\"modelMaterialName\":\"\",\"modelMaterialUrl\":\"\"},\"generateNum\":4,\"expectedCostPrice\":0,\"categoryCode\":\"\",\"categoryName\":\"\",\"syncCategory\":0,\"modeCode\":\"FG2_0\",\"modeName\":\"FG2.0\",\"refWeight\":0,\"createExtParam\":null,\"single\":false}"
            """
                {
                	"waveBatchCode": "",
                	"supplyMethod": "supplyMethodCode",
                	"generateMode": 1,
                	"generateNum": 4,
                	"expectedCostPrice": 0,
                	"modelInfo": {
                		"aiModelCode": "",
                		"aiModelName": "",
                		"aiModelUrl": ""
                	},
                	"modelMaterialInfo": {
                		"modelMaterialId": "",
                		"modelMaterialName": "",
                		"modelMaterialUrl": ""
                	},
                	"sceneInfo": {
                		"sceneId": "",
                		"sceneName": "",
                		"pictureId": "",
                		"picturePath": "",
                		"pictureCaption": ""
                	},
                	"modeCode": "FG2_0_SEA",
                	"modeName": "东南亚模型",
                	"filterBack": 1,
                	"faceRepair": 1,
                	"promiseEnhanced": 0,
                	"refWeight": null,
                	"categoryCode": null,
                	"categoryName": null,
                	"syncCategory": 1,
                	"styleGenCount": 3,
                	"fastForward": 0,
                	"styleModelId": "7357245601932746775",
                	"imgSize": "1000x1000",
                	"inspirationIds": ["7345738158711181328"],
                	"materials": [],
                	"refImgUrl": "https://oss.yunbanfang.cn/tiangong_80567c8b5ace49669708490d51c70faa.jpg"
                }
            """.trimIndent()
        val requests = InspirationConvert.convert(json.parseJson(InspirationTaskSubmitReq::class.java))
        requests.forEach {
            withSystemUser {
                this.inspirationService.submitInspiration(it)
            }

        }
//        val parseJson = json.parseJson(InspirationSubmitReq::class.java)
//        inspirationService.submitInspiration(parseJson)
    }

    @Test
    fun remove() {
        inspirationService.remove(setOf(7270671068958978053))
    }


    @Test
    fun main() {
        println("============:" + SpringContextHolder.activeProfile)
        println("============:" + SpringContextHolder.getProperty("spring.profiles.active"))
        println(("============:" + "dev-xiniu".contains("xiniu")) ?: false)
        println("============:${SpringContextHolder.getProperty("spring.profiles.active")?.contains("xiniu") ?: false}")
    }

}