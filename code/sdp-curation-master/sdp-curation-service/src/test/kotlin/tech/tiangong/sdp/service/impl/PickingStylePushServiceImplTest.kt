package tech.tiangong.sdp.service.impl

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import team.aikero.blade.logging.core.annotation.Slf4j
import tech.tiangong.sdp.SdpApplication
import tech.tiangong.sdp.service.PickingStylePushService

@Slf4j
@SpringBootTest(classes = [SdpApplication::class], properties = ["spring.profiles.active=dev-xproj"])
class PickingStylePushServiceImplTest {
    @Autowired
    private lateinit var pickingStylePushService: PickingStylePushService

    @Test
    fun push2Xiniu() {
        pickingStylePushService.push2Xiniu(7326073475288793557)
    }

}