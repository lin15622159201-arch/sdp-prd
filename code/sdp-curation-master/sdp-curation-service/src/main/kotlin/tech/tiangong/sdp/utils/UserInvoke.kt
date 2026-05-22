package tech.tiangong.sdp.utils

import jakarta.servlet.http.HttpServletRequest
import team.aikero.blade.user.entity.CurrentUser
import team.aikero.blade.user.holder.DefaultCurrentUserContentSetter
import tech.tiangong.sdp.common.req.BaseTenantUserReq
import tech.tiangong.sdp.req.TenantUserReq
import tech.tiangong.sdp.entity.BaseTenantUserEntity

object UserInvoke {

    fun <T> doAction(entity: BaseTenantUserEntity, action: () -> T): T =
        doAction(user(entity.creatorId!!, entity.creatorName!!, entity.tenantId!!), action)

    fun <T> doAction(tenantUserReq: BaseTenantUserReq, action: () -> T): T =
        doAction(user(tenantUserReq.creatorId!!, tenantUserReq.creatorName!!, tenantUserReq.tenantId!!), action)

    fun <T> doAction(tenantUserReq: TenantUserReq, action: () -> T): T =
        doAction(user(tenantUserReq.creatorId!!, tenantUserReq.creatorName!!, tenantUserReq.tenantId!!), action)

    fun <T> doAction(userId: Long, userName: String, tenantId: Long, action: () -> T): T =
        doAction(user(userId, userName, tenantId), action)

    fun <T> doAction(httpServletRequest: HttpServletRequest, action: () -> T): T {
        val userId = httpServletRequest.getUserId()
        val userName = httpServletRequest.getUserName()
        val tenantId = httpServletRequest.getTenantId()
        return if (userId != null && userName != null && tenantId != null) {
            doAction(userId, userName, tenantId, action)
        } else {
            action()
        }
    }

    fun <T> doAction(user: CurrentUser, action: () -> T): T = try {
        DefaultCurrentUserContentSetter.set(user)
        action()
    } catch (e: Throwable) {
        throw RuntimeException(e.message ?: "UserInvoke操作失败")
    } finally {
        DefaultCurrentUserContentSetter.clean()
    }


    fun user(userId: Long, userName: String, tenantId: Long, organizationId: Long? = null): CurrentUser =
        CurrentUser(
            id = userId,
            name = userName,
            code = "",
            tenantId = tenantId,
            superAdmin = false,
            organizationId = organizationId,
        )

}