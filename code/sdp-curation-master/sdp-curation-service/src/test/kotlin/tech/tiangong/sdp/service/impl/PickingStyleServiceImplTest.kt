package tech.tiangong.sdp.service.impl

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.util.json.toJson
import tech.tiangong.sdp.SdpApplication
import tech.tiangong.sdp.service.PickingStyleService


@SpringBootTest(
    classes = [SdpApplication::class], properties = ["spring.profiles.active=qa-xiniu",
        "spring.cloud.nacos.discovery.register-enabled=false",
        "spring.config.additional-location=/Users/simon/Documents/workspace/internal-xiniu/qa-xiniu-yunwei-config.yml"]
)
@Slf4j
class PickingStyleServiceImplTest {

    @Autowired
    private lateinit var pickingStyleService: PickingStyleService
    @Test
    fun detailResult() {
        log.info { pickingStyleService.detailResult(7361955983343517707L).toJson() }
    }

}