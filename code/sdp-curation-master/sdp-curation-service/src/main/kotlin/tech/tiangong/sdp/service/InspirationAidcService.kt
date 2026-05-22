package tech.tiangong.sdp.service

import team.aikero.admin.common.vo.DictVo
import java.time.LocalDate
import java.time.LocalDateTime

/**
 * 灵感-AIDC
 * @author zjh
 * @date 2024/12/25 11:10
 */
interface InspirationAidcService {

    /**
     * 定时-趋势中心-拉取灵感数据
     * @param country
     * @param taskStartTime
     * @param taskEndTime
     */
    fun trendCenterPullInspiration(country: DictVo, taskStartTime: LocalDateTime, taskEndTime: LocalDateTime)

    /**
     * 定时-智脑-拉取灵感数据
     * @param countryNameMap
     * @param taskDate
     */
    fun aliexpressPullInspiration(countryNameMap: Map<String, DictVo>, taskDate: LocalDate)

    /**
     * 处理灵感AIDC源表(未处理的)
     */
    fun handleAidcSourceData()
}