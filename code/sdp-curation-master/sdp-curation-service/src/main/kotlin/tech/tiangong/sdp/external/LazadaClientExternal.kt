package tech.tiangong.sdp.external

import com.fasterxml.jackson.core.type.TypeReference
import com.lazada.lazop.api.LazopClient
import com.lazada.lazop.api.LazopRequest
import org.springframework.stereotype.Component
import team.aikero.blade.core.exception.BusinessException
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.util.json.parseJson
import team.aikero.blade.util.json.toJson
import tech.tiangong.sdp.config.LazadaProperties
import tech.tiangong.sdp.dto.lazada.req.TrendCenterPutImageInfoListReqDto
import tech.tiangong.sdp.dto.lazada.req.TrendCenterQueryTaskImageListReqDto
import tech.tiangong.sdp.dto.lazada.req.TrendCenterQueryTaskListReqDto
import tech.tiangong.sdp.dto.lazada.resp.*
import java.time.format.DateTimeFormatter

/**
 * 趋势中心 api 对接
 * @author zjh
 * @date 2024/12/14 11:34
 */
@Component
@Slf4j
class LazadaClientExternal(
    private val lazadaProperties: LazadaProperties,
) {

    /**
     * 趋势中心-回流信息
     * https://api.lazada.sg/rest/trendcenter/putImageInfoList
     * ?app_key=123
     * &sign_method=SHA256
     * &sign=372ACFC6928D1F8F5DD6AC07E484346A
     * &list=[{"taskId":"478","itemId":"23269663938","venture":"PH","markStatus":"1","isOnline":"1","onlineSaleItemId":"6543"}]
     * &timestamp=1734074294015
     *
     */
    fun trendCenterPutImageInfoList(req: List<TrendCenterPutImageInfoListReqDto>): TrendCenterPutImageInfoListRespDto? {
        val request = LazopRequest()
        request.apiName = "/trendcenter/putImageInfoList"
        request.addApiParameter("list", req.toJson())
        val client = LazopClient(lazadaProperties.domain, lazadaProperties.appKey, lazadaProperties.appSecret)
        log.info { "trendCenterPutImageInfoList request= ${request.toJson()}" }
        val response = client.execute(request)
        log.info { "trendCenterPutImageInfoList response= ${response.toJson()}" }
        if (!response.isSuccess) {
            throw BusinessException("请求Lazada 趋势中心-回流信息 响应失败 ${response.message}")
        }
        val bodyResp = response.body.parseJson(object : TypeReference<TrendCenterBaseResp<TrendCenterPutImageInfoListRespDto>>() {})
        if (bodyResp.success == null || bodyResp.success == false) {
            throw BusinessException("请求Lazada 趋势中心-任务分页接口 body响应失败 ${response.message}")
        }
        return bodyResp.data
    }

    /**
     * 趋势中心-任务分页接口
     * https://api.lazada.sg/rest/trendcenter/queryTaskList
     * ?app_key=123
     * &createDateEndStr=2024-12-13+23:59:59
     * &sign_method=hmac
     * &sign=CE32939C28BA61F41D66455CF544F535
     * &pageSize=20
     * &createDateStartStr=2024-12-09+00:00:00
     * &pageNum=1
     * &venture=TH
     * &timestamp=1734071026862
     *
     */
    fun trendCenterQueryTaskList(req: TrendCenterQueryTaskListReqDto): TrendCenterPageResp<TrendCenterQueryTaskListRespDto>? {
        val request = LazopRequest()
        request.apiName = "/trendcenter/queryTaskList"
        request.addApiParameter("pageNum", req.pageNum.toString())
        request.addApiParameter("pageSize", req.pageSize.toString())
        request.addApiParameter("createDateStartStr", req.createDateStartStr?.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
        request.addApiParameter("createDateEndStr", req.createDateEndStr?.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
        request.addApiParameter("venture", req.venture)
        val client = LazopClient(lazadaProperties.domain, lazadaProperties.appKey, lazadaProperties.appSecret)
        log.info { "trendCenterQueryTaskList request= ${request.toJson()}" }
        val response = client.execute(request)
        log.info { "trendCenterQueryTaskList response= ${response.toJson()}" }
        if (!response.isSuccess) {
            throw BusinessException("请求Lazada 趋势中心-任务分页接口 响应失败 ${response.message}")
        }
        val bodyResp = response.body.parseJson(object : TypeReference<TrendCenterBaseResp<TrendCenterPageResp<TrendCenterQueryTaskListRespDto>>>() {})
        if (bodyResp.success == null || bodyResp.success == false) {
            throw BusinessException("请求Lazada 趋势中心-任务分页接口 body响应失败 ${response.message}")
        }
        return bodyResp.data
    }

    /**
     * 趋势中心-任务详情分页接口
     * https://api.lazada.sg/rest/trendcenter/queryTaskImageList
     * ?app_key=123
     * &sign_method=SHA256
     * &sign=A0224360457C0F9B0D3777E6F070D1AA
     * &pageSize=10
     * &pageNum=1
     * &venture=TH
     * &taskId=819
     * &timestamp=1734072618998
     *
     */
    fun trendCenterQueryTaskImageList(req: TrendCenterQueryTaskImageListReqDto): TrendCenterPageResp<TrendCenterQueryTaskImageListRespDto>? {
        val request = LazopRequest()
        request.apiName = "/trendcenter/queryTaskImageList"
        request.addApiParameter("pageSize", req.pageSize.toString())
        request.addApiParameter("pageNum", req.pageNum.toString())
        request.addApiParameter("venture", req.venture)
        request.addApiParameter("taskId", req.taskId.toString())
        val client = LazopClient(lazadaProperties.domain, lazadaProperties.appKey, lazadaProperties.appSecret)
        log.info { "trendCenterQueryTaskImageList request= ${request.toJson()}" }
        val response = client.execute(request)
//        log.info { "trendCenterQueryTaskImageList response= ${response.toJson()}" }
        if (!response.isSuccess) {
            throw BusinessException("请求Lazada 趋势中心-任务详情分页接口 响应失败 ${response.message}")
        }
        val bodyResp = response.body.parseJson(object : TypeReference<TrendCenterBaseResp<TrendCenterPageResp<TrendCenterQueryTaskImageListRespDto>>>() {})
        if (bodyResp.success == null || bodyResp.success == false) {
            throw BusinessException("请求Lazada 趋势中心-任务详情分页接口 body响应失败 ${response.message}")
        }
        return bodyResp.data
    }
}