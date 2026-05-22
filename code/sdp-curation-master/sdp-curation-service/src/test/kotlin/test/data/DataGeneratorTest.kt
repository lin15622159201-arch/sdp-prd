package test.data

import com.zjkj.aigc.common.req.LogoIdentifyTaskCreateReq
import org.junit.jupiter.api.Disabled
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import team.aikero.blade.auth.withSystemUser
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.sequence.id.IdHelper
import team.aikero.blade.user.entity.CurrentUser
import team.aikero.blade.user.holder.DefaultCurrentUserContentSetter
import team.aikero.blade.util.json.toJson
import team.aikero.blade.util.json.toJsonPretty
import tech.tiangong.butted.common.req.InspirationIdentifyReq
import tech.tiangong.sdp.SdpApplication
import tech.tiangong.sdp.dao.entity.LazadaJobTime
import tech.tiangong.sdp.dao.repository.LazadaJobTimeRepository
import tech.tiangong.sdp.dto.lazada.req.TrendCenterQueryTaskImageListReqDto
import tech.tiangong.sdp.dto.lazada.req.TrendCenterQueryTaskListReqDto
import tech.tiangong.sdp.enums.DictEnum
import tech.tiangong.sdp.external.*
import tech.tiangong.sdp.req.DesignDemandCreateReq
import tech.tiangong.sdp.req.inspiration.InspirationImportImageReq
import tech.tiangong.sdp.service.InspirationService
import tech.tiangong.sdp.service.PickingStyleService
import tech.tiangong.sdp.service.impl.InspirationCallbackServiceImpl
import test.BaseTest
import java.time.LocalDateTime

/**
 * 测试数据生成
 * @author zjh
 * @date 2024/12/6 11:20
 */
@SpringBootTest(
    classes = [SdpApplication::class],
    args = [
        "--spring.cloud.nacos.discovery.register-enabled=false",
        "--spring.profiles.active=qa-ola",
        "--spring.config.import=https://jv-devops.oss-cn-hangzhou.aliyuncs.com/\${spring.profiles.active}-yunwei-config.yml,C:\\Users\\EDZ\\Desktop\\启动环境配置\\local-bootstrap.yml",
    ]
)
@Disabled
@Slf4j
class DataGeneratorTest : BaseTest() {

    @Autowired
    lateinit var inspirationService: InspirationService

    @Autowired
    lateinit var pickingStyleService: PickingStyleService

    @Autowired
    lateinit var designDemandClientExternal: DesignDemandClientExternal

    @Autowired
    lateinit var logoIdentityTaskClientExternal: LogoIdentityTaskClientExternal

    @Autowired
    lateinit var identifyClientExternal: IdentifyClientExternal

    @Autowired
    lateinit var lazadaClientExternal: LazadaClientExternal

    @Autowired
    lateinit var inspirationCallbackServiceImpl: InspirationCallbackServiceImpl

    @Autowired
    lateinit var lazadaJobTimeRepository: LazadaJobTimeRepository

    @Autowired
    lateinit var dictClientExternal: DictClientExternal

    @Autowired
    lateinit var aliexpressClientExternal: AliexpressClientExternal

    @Test
    fun generate() {
        mockedUser {
            val req = InspirationImportImageReq()
            req.supplyMethodCode = "A123"
            req.waveBatchCode = "B123"
            req.planningSourceCode = "C123"
            req.countrySiteCode = "TH_CODE"
//            req.inspirationImages = listOf(
//                "https://img1.baidu.com/it/u=2998893523,492518437&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1320",
//                "https://img0.baidu.com/it/u=137586159,3674748101&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1200"
//            )
            inspirationService.importImage(req)

//            pickingStyleService.importPickingStyleList()
        }
    }

    @Test
    fun test() {
        mockedUser {
            val req = DesignDemandCreateReq()
            req.sourceBizId = IdHelper.getId()
            req.inspirationStyleId = IdHelper.getId()
            req.planningId = IdHelper.getId()
            req.supplyModeName = "supplyModeName"
            req.supplyModeCode = "supplyModeCode"
            req.productLink = "productLink"
            req.category = "category"
            req.categoryName = "categoryName"
            req.suggestedStyle = "suggestedStyle"
            req.suggestedStyleCode = "suggestedStyleCode"
            req.countrySiteCode = ""
            req.countrySiteName = "countrySiteName"
            req.storeId = IdHelper.getId()
            req.storeName = "storeName"
            req.sellingPrice = "sellingPrice"
            req.waveBandCode = "waveBandCode"
            req.waveBandName = "waveBandName"
            req.chosenId = IdHelper.getId()
            req.chosenName = "chosenName"
            req.chosenTime = LocalDateTime.now()
            req.originalImage = "originalImage"
//            req.inspirationImageList = listOf("https://baidu.com")
            req.suggestedMaterialList = listOf()
            val response = designDemandClientExternal.create(req)
            log.info { "请求参数: ${req.toJson()}" }
            log.info { "返回结果: ${response.toJson()}" }
        }
    }

    @Test
    fun test2() {
        mockedUser {
            val req = LogoIdentifyTaskCreateReq()
            req.fileUrl = "https://img1.baidu.com/it/u=806401422,1948638797&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1320"
            req.fileName = "test name"
            req.userId = 0
            req.userName = "0"
            req.tenantId = 0
            val taskId = logoIdentityTaskClientExternal.create(req)
            log.info { "创建数码印花 请求参数: ${req.toJson()}" }
            log.info { "创建数码印花 返回结果: $taskId" }

            val data = taskId?.let { logoIdentityTaskClientExternal.queryByTaskId(it) }
            log.info { "查询数码印花 请求参数: $taskId" }
            log.info { "查询数码印花 返回结果: ${data?.toJson()}" }
        }
    }

    @Test
    fun identifyTest() {
        try {
            val identifyReq = InspirationIdentifyReq()
            identifyReq.busId = 7264865634167578625
            identifyReq.refImgUrl = "https://oss.yunbanfang.cn/tiangong_6ba34b9dc3794995b1662445b1d88cae.jpg"
            identifyReq.taskAttribute = 0 // 0-单任务，1-批量任务
            log.info { "图片识别任务创建请求 ${identifyReq.toJsonPretty()}" }
            val id = identifyClientExternal.create(identifyReq)
            log.info { "图片识别任务创建成功 $id" }
        } catch (e: Exception) {
            log.error { "图片识别任务创建失败 $e" }
            e.printStackTrace()
        }
    }

    @Test
    fun lazadaTest3() {
        log.info { "开始测试 lazadaClientExternal.trendCenterPutImageInfoList()" }
        val req1 = "[{\"taskId\":\"478\",\"itemId\":\"23269663938\",\"venture\":\"PH\",\"markStatus\":\"1\",\"isOnline\":\"1\",\"onlineSaleItemId\":\"6543\"}]"
//        lazadaClientExternal.trendCenterPutImageInfoList(req1.parseJsonList(TrendCenterPutImageInfoListReqDto::class.java))

        log.info { "开始测试 lazadaClientExternal.trendCenterQueryTaskList()" }
        val req2 = TrendCenterQueryTaskListReqDto()
        req2.pageNum = 1
        req2.pageSize = 20
        req2.venture = "TH"
        req2.createDateStartStr = LocalDateTime.of(2024, 12, 1, 0, 0, 0)
        req2.createDateEndStr = LocalDateTime.of(2025, 2, 16, 0, 0, 0)
//        lazadaClientExternal.trendCenterQueryTaskList(req2)

        log.info { "开始测试 lazadaClientExternal.trendCenterQueryTaskImageList()" }
        val req3 = TrendCenterQueryTaskImageListReqDto()
        req3.pageSize = 10
        req3.pageNum = 1
        req3.venture = "TH"
        req3.taskId = "819"
        lazadaClientExternal.trendCenterQueryTaskImageList(req3)
    }

    @Test
    fun aidcTest() {
        withSystemUser {
//            inspirationCallbackServiceImpl.trendCenterPullInspiration()
        }
    }

    @Test
    fun creatorTest() {
        withSystemUser {

            val user = CurrentUser(
                id = 123,
                name = "测试人",
                code = "",
                tenantId = 0,
                false
            )
            DefaultCurrentUserContentSetter.set(user)

            val req = LazadaJobTime()
            req.countrySiteCode = "2333"
            req.taskStartTime = LocalDateTime.now()
            req.taskEndTime = LocalDateTime.now()
            req.creatorId = 0
            req.creatorName = "系统sss"
            lazadaJobTimeRepository.save(req)
        }
    }

    @Test
    fun aeTest() {
        val date = 20241220

        var totalCount = 0

        var segmentNum = 1
        val segmentNumMax = 256
        while (segmentNum <= segmentNumMax) {

            var sCount = 0
            var page = 0
            do {
                page++
                val result = aliexpressClientExternal.pullData(date, page, segmentNum)
                log.info { "xxx --- +++ 当前分区: $date 段: $segmentNum 内总数据量: ${result?.totalCount} 段内总页数: ${result?.totalPage} 当前页: $page 当前页数据量: ${result?.data?.size}" }
                if (result == null || result.data.isNullOrEmpty()) {
                    break
                }

                println(result.data?.first()?.itemId)

                totalCount += result.data?.size ?: 0
                sCount += result.data?.size ?: 0
            } while (page < (result?.totalPage ?: 0))

            println("xxx --- 当前分区: $date 段: $segmentNum 段内总数据量: $sCount")
            // 段数+1
            segmentNum++
        }

        println("xxx 所有分区: $date 段: $segmentNum 总数据量: $totalCount")
    }

    @Test
    fun jobTest() {
        withSystemUser {
            inspirationCallbackServiceImpl.digitalPrint(listOf())
        }
    }

    @Test
    fun dictTest() {
        withSystemUser {
            log.info { dictClientExternal.getByDictCode(DictEnum.CLOTHING_CATEGORY, "02")?.toJson() }
            log.info { dictClientExternal.getByDictCode(DictEnum.FD_PRINTING, "02")?.toJson() }
            log.info { dictClientExternal.getTopByDictCode(DictEnum.FD_PRINTING)?.toJson() }
        }
    }
}