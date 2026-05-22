package tech.tiangong.sdp.controller.job

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import team.aikero.blade.auth.annotation.PreCheckIgnore
import team.aikero.blade.auth.withSystemUser
import team.aikero.blade.core.protocol.DataResponse
import team.aikero.blade.core.protocol.ok
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import tech.tiangong.sdp.dao.entity.AliexpressJobTime
import tech.tiangong.sdp.dao.entity.LazadaJobTime
import tech.tiangong.sdp.dao.repository.AliexpressJobTimeRepository
import tech.tiangong.sdp.dao.repository.LazadaJobTimeRepository
import tech.tiangong.sdp.enums.DictEnum
import tech.tiangong.sdp.external.DictClientExternal
import tech.tiangong.sdp.service.InspirationAidcService
import java.time.LocalDate
import java.time.LocalDateTime

/**
 * 定时任务-AIDC
 * @author zjh
 * @date 2024/12/9 19:32
 */
@RestController
@RequestMapping("/job/v1/aigc")
@PreCheckIgnore
class JobAidcController(
    private val inspirationAidcService: InspirationAidcService,
    private val lazadaJobTimeRepository: LazadaJobTimeRepository,
    private val aliexpressJobTimeRepository: AliexpressJobTimeRepository,
    private val dictClientExternal: DictClientExternal,
) {

    /**
     * 趋势中心-拉取灵感数据
     * {"method":"POST","url":"/sdp-curation/job/v1/aigc/trendcenter/pull/inspiration","system":"ola", "env":"dev"}
     */
    @PostMapping("/trendcenter/pull/inspiration")
    fun trendCenterPullInspiration(): DataResponse<Unit> {
        withSystemUser {
            // key=字典值Name,value=字典值vo
            val countryDictNameMap = dictClientExternal.getTopByDictCode(DictEnum.NATIONAL)?.children?.associateBy({ it.dictName }, { it })
            countryDictNameMap?.forEach { (countryName, countryVo) ->
                log.info { "定时-趋势中心-拉取灵感数据-国家字典: $countryName" }

                // 设置最后时间点
                val lastTime = LocalDateTime.now()
                while (true) {

                    // 获取上次范围
                    var job = lazadaJobTimeRepository.selectLastByCountryCode(countryVo.dictCode)
                    if (job == null) {
                        job = LazadaJobTime()
                        job.countrySiteCode = countryVo.dictCode
                        job.taskStartTime = LocalDateTime.of(2024, 12, 9, 0, 0, 0)
                    } else {
                        job.taskStartTime = job.taskEndTime
                    }
                    // +1天
                    job.taskEndTime = job.taskStartTime!!.plusDays(1)
                    if (job.taskEndTime!! > lastTime) {
                        job.taskEndTime = lastTime
                    }

                    // 处理逻辑
                    inspirationAidcService.trendCenterPullInspiration(countryVo, job.taskStartTime!!, job.taskEndTime!!)

                    // 更新
                    lazadaJobTimeRepository.saveOrUpdate(job)

                    if (job.taskEndTime!! >= lastTime) {
                        break
                    }
                }
            }
        }
        return ok()
    }

    /**
     * 智脑-拉取灵感数据
     * {"method":"POST","url":"/sdp-curation/job/v1/aigc/aliexpress/pull/inspiration","system":"ola", "env":"dev"}
     */
    @PostMapping("/aliexpress/pull/inspiration")
    fun aliexpressPullInspiration(): DataResponse<Unit> {
        withSystemUser {
            // key=字典值Name,value=字典值vo
            var countryDictNameMap = dictClientExternal.getTopByDictCode(DictEnum.NATIONAL)?.children?.associateBy({ it.dictName }, { it })
            if (countryDictNameMap == null) {
                countryDictNameMap = mapOf()
            }

            // 去除上次拉取的日期
            val lastJob = aliexpressJobTimeRepository.selectLastDate()
            val lastDate = if (lastJob?.lastDate != null) {
                // 不为空则+1天
                lastJob.lastDate!!.plusDays(1)
            } else {
                // 空则默认2024-12-18
                LocalDate.of(2024, 12, 18)
            }

            // 获取lastDate到今天的所有日期(任务是1点执行, 所以要-1天)
            val dateList = mutableListOf<LocalDate>()
            var tempDate = lastDate
            while (tempDate <= LocalDate.now().minusDays(1)) {
                dateList.add(tempDate)
                tempDate = tempDate.plusDays(1)
            }

            dateList.forEach { date ->
                log.info { "定时-智脑-拉取灵感数据-日期: $date" }
                // 处理逻辑
                inspirationAidcService.aliexpressPullInspiration(countryDictNameMap, date)
                // 记录日期
                aliexpressJobTimeRepository.save(
                    AliexpressJobTime().apply {
                        this.lastDate = date
                    }
                )
            }
        }
        return ok()
    }

    /**
     * AIDC-处理图片
     * {"method":"POST","url":"/sdp-curation/job/v1/aigc/image/handle","system":"ola", "env":"dev"}
     */
    @PostMapping("/image/handle")
    fun imageHandle(): DataResponse<Unit> {
        withSystemUser {
            inspirationAidcService.handleAidcSourceData()
        }
        return ok()
    }

    /**
     * 趋势中心-拉取灵感数据-全量(临时)
     * {"method":"POST","url":"/sdp-curation/job/v1/aigc/trendcenter/pull/inspiration/fix","system":"ola", "env":"dev"}
     */
    @PostMapping("/trendcenter/pull/inspiration/fix")
    fun trendCenterPullInspirationFix(): DataResponse<Unit> {
        withSystemUser {
            // key=字典值Name,value=字典值vo
            val countryDictNameMap = dictClientExternal.getTopByDictCode(DictEnum.NATIONAL)?.children?.associateBy({ it.dictName }, { it })
            countryDictNameMap?.forEach { (countryName, countryVo) ->
                log.info { "定时-趋势中心-拉取灵感数据(临时修复)-国家字典: $countryName" }
                // 处理逻辑
                inspirationAidcService.trendCenterPullInspiration(countryVo, LocalDateTime.of(2024, 12, 9, 0, 0, 0), LocalDateTime.now())
            }
        }
        return ok()
    }

}