package tech.tiangong.sdp.utils

import team.aikero.blade.user.entity.CurrentUser
import team.aikero.blade.user.holder.CurrentUserHolder

/**
 * @description:
 * @author: chazz
 * @since: 2025年01月03日14:26:45
 * @version: 1.0
 **/
object SsoContext {

    @JvmStatic
    fun user(): CurrentUser {
        return CurrentUserHolder.get()
    }

    @JvmStatic
    fun userId(): Long {
        return user().id
    }

    @JvmStatic
    fun username(): String {
        return user().name
    }

    @JvmStatic
    fun tenantId(): Long {
        return CurrentUserHolder.get().tenantId
    }


    val tenantId: Long
        get() = tenantId()

    @JvmStatic
    fun organizationId(): Long? {
        return CurrentUserHolder.get().organizationId
    }


    @JvmStatic
    fun owned(userId: Long?): Boolean {
        return this.userId() == userId
    }
}