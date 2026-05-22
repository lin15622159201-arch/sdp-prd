package tech.tiangong.sdp.external

// TODO 等待SDK替换
//import team.aikero.fashion.user.profile.common.req.DataScopeReq
//import team.aikero.fashion.user.profile.sdk.client.DataScopeClient
import org.springframework.stereotype.Component
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.user.holder.CurrentUserHolder

/**
 * 数据权限
 * @author zjh
 * @date 2024/9/24 18:09
 */
@Slf4j
@Component
class DataScopeClientExternal(
    // TODO 等待SDK替换
//    private val dataScopeClient: DataScopeClient,
) {
    /**
     * 数据权限-获取当前用户的数据域
     */
    fun getDataScopeUserId(): List<Long> {
        // 获取当前登录用户
        val userContent = CurrentUserHolder.get()
        try {
            // TODO 等待SDK替换
//            val req = DataScopeReq()
//            req.tenantId = userContent.tenantId
//            req.userId = userContent.currentUserId
//            val dataResponse = dataScopeClient.getByUserAndTenant(req)
//            log.info { "数据权限-获取当前用户的数据域 返回: dataResponse: ${dataResponse.toJson()}" }
//            if (!dataResponse.successful) {
//                throw RuntimeException(dataResponse.message)
//            }
//            dataResponse.data?.let {
//                return dataResponse.data ?: emptyList()
//            }
        } catch (e: Exception) {
            log.error { "数据权限-获取当前用户的数据域 失败 errMessage: ${e.stackTraceToString()}" }
            throw e
        }
        return emptyList()
    }
}