package tech.tiangong.sdp.service.component

import org.apache.commons.lang3.StringUtils
import org.springframework.stereotype.Component
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.util.json.parseJson
import tech.tiangong.pop.common.enums.YesOrNoEnum
import tech.tiangong.sdp.dao.entity.Inspiration
import tech.tiangong.sdp.dto.lazada.req.TrendCenterPutImageInfoListReqDto
import tech.tiangong.sdp.dto.lazada.resp.TrendCenterQueryTaskImageListRespDto
import tech.tiangong.sdp.enums.PlanningSourceEnum
import tech.tiangong.sdp.external.LazadaClientExternal

/**
 * Lazada
 * @author zjh
 * @date 2024/12/18 15:01
 */
@Slf4j
@Component
class LazadaComponent(
    private val lazadaClientExternal: LazadaClientExternal,
) {

    /**
     * 回流推送导AIDC-已使用,未上架
     *
     * @param planningSourceEnum
     * @param inspiration
     */
    fun pushAidcMark(planningSourceEnum: PlanningSourceEnum, inspiration: Inspiration) {
        // 调用AIDC推送
        when (planningSourceEnum) {
            PlanningSourceEnum.TOP -> {
                // TODO 调用TOP推送

            }

            PlanningSourceEnum.TREND -> {
                // 调用trend推送
                if (StringUtils.isNotBlank(inspiration.thirdInspirationInfo)) {
                    val thirdInfo = inspiration.thirdInspirationInfo?.parseJson<TrendCenterQueryTaskImageListRespDto>()
                    if (thirdInfo != null) {
                        val aidcReq = mutableListOf<TrendCenterPutImageInfoListReqDto>()
                        aidcReq.add(TrendCenterPutImageInfoListReqDto().apply {
                            this.taskId = thirdInfo.taskId
                            this.itemId = thirdInfo.itemId
                            this.venture = thirdInfo.venture
                            this.markStatus = YesOrNoEnum.YES.code
                            this.isOnline = 0  // 这时候还没有上架, 暂时填0
                            this.onlineSaleItemId = 0 // 这时候还没有上架商品id, 暂时填0
                        })
                        lazadaClientExternal.trendCenterPutImageInfoList(aidcReq)
                    }
                }
            }
        }
    }

    /**
     * 回流推送导AIDC-已使用,已上架
     *
     * @param planningSourceEnum
     * @param inspiration
     */
    fun pushAidcOnline(planningSourceEnum: PlanningSourceEnum, inspiration: Inspiration, onlineSaleItemId: Long): Boolean {
        // 调用AIDC推送
        when (planningSourceEnum) {
            PlanningSourceEnum.TOP -> {
                // TODO 调用TOP推送
                return false
            }

            PlanningSourceEnum.TREND -> {
                // 调用trend推送
                if (StringUtils.isNotBlank(inspiration.thirdInspirationInfo)) {
                    val thirdInfo = inspiration.thirdInspirationInfo?.parseJson<TrendCenterQueryTaskImageListRespDto>()
                    if (thirdInfo != null) {
                        val aidcReq = mutableListOf<TrendCenterPutImageInfoListReqDto>()
                        aidcReq.add(TrendCenterPutImageInfoListReqDto().apply {
                            this.taskId = thirdInfo.taskId
                            this.itemId = thirdInfo.itemId
                            this.venture = thirdInfo.venture
                            this.markStatus = YesOrNoEnum.YES.code
                            this.isOnline = YesOrNoEnum.YES.code
                            this.onlineSaleItemId = onlineSaleItemId
                        })
                        val response = lazadaClientExternal.trendCenterPutImageInfoList(aidcReq)
                        if (response != null) {
                            return response.putSuccessCnt == 1
                        }
                    }
                }
            }
        }
        return false
    }
}