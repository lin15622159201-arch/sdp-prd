package tech.tiangong.sdp.external

import org.apache.commons.collections4.CollectionUtils
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import team.aikero.blade.auth.withSystemUser
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.user.entity.CurrentUser
import team.aikero.blade.user.holder.DefaultCurrentUserContentSetter
import team.aikero.blade.util.json.toJsonPretty
import tech.tiangong.sdp.SdpApplication
import tech.tiangong.sdp.enums.DictEnum

/**
 * 单元测试
 *
 * @author     ：qinwenxuan@zj.tech
 * @date       ：2025/6/18 10:56
 * @version    :1.0
 */
@SpringBootTest(classes = [SdpApplication::class], properties = ["spring.profiles.active=qa-xiniu"])
@Slf4j
class DictClientExternalTest {
    @Autowired
    private lateinit var dictClientExternal: DictClientExternal

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
        withSystemUser {
            val reqCodes = mutableSetOf<String>()
            val disCodes = mutableSetOf<String>()
            this.dictClientExternal.listByDictCode(DictEnum.FG_MODEL_VERSION.dictCode).run {
                log.info { "单元测试\t${this?.toJsonPretty()}" }
//                this?.attributes?.filter { it.name=="REQ" }?.map { it.name }
                val children = this?.children?.filter { CollectionUtils.isNotEmpty(it.attributes) }

                children?.filter { it.attributes?.any { a -> a.name=="REQ"  } == true }?.forEach {
                    reqCodes.add(it.dictCode)
                    log.info { "单元测试\t${it.toJsonPretty()}" }
                }
                children?.filter { it.attributes?.any { a -> a.name=="DIS"  } == true }?.forEach {
                    disCodes.add(it.dictCode)
                    log.info { "单元测试\t${it.toJsonPretty()}" }
                }
                log.info { "单元测试\t${reqCodes.toJsonPretty()}" }
                log.info { "单元测试\t${disCodes.toJsonPretty()}" }
            }
        }
    }
}