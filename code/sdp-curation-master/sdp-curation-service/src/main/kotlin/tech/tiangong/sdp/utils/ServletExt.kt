package tech.tiangong.sdp.utils

import java.net.URLDecoder
import jakarta.servlet.http.HttpServletRequest

fun HttpServletRequest.getTenantId(name: String = "Tenant-Id"): Long? {
    return this.getHeader(name)?.toLong()
}

fun HttpServletRequest.getUserId(name: String = "User-Id"): Long? {
    return this.getHeader(name)?.toLong()
}

fun HttpServletRequest.getUserName(name: String = "User-Name"): String? {
    return this.getHeader(name)?.let {
        URLDecoder.decode(it, Charsets.UTF_8)
    }
}