package tech.tiangong.sdp.external

import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.user.entity.CurrentUser
import team.aikero.blade.user.holder.DefaultCurrentUserContentSetter
import team.aikero.blade.util.json.toJsonPretty
import tech.tiangong.sdp.SdpApplication

/**
 * 单元测试
 *
 * @author     ：qinwenxuan@zj.tech
 * @date       ：2025/6/17 10:21
 * @version    :1.0
 */
@SpringBootTest(classes = [SdpApplication::class], properties = ["spring.profiles.active=qa-xiniu"])
@Slf4j
class IdentifyClientExternalTest {
    @Autowired
    private lateinit var identifyClientExternal: IdentifyClientExternal

    @BeforeEach
    fun setUp() =
        DefaultCurrentUserContentSetter.set(
            CurrentUser(
                148231653, "覃文轩", "",
                tenantId = 2L, false,
            )
        )

    @AfterEach
    fun tearDown() =
        DefaultCurrentUserContentSetter.clean()

    @Test
    fun test() {
        identifyClientExternal.getByBusId(7324310879707595616).run {
            log.info { "单元测试\t${this?.toJsonPretty()}" }
        }
    }
}