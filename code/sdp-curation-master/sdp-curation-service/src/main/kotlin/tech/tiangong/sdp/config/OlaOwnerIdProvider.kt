package tech.tiangong.sdp.config

import team.aikero.blade.permission.provider.OwnerIdProvider
import org.springframework.stereotype.Component
import tech.tiangong.sdp.external.DataScopeClientExternal
import java.io.Serializable

/**
 * 数据权限
 * @author zjh
 * @date 2024/9/24 17:52
 */
@Component
class OlaOwnerIdProvider(
    private val dataScopeClientExternal: DataScopeClientExternal,
) : OwnerIdProvider {

    override fun get(): List<Serializable> {
        return dataScopeClientExternal.getDataScopeUserId()
    }
}