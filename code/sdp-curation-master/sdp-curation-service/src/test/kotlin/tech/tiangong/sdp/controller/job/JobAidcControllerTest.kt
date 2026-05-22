package tech.tiangong.sdp.controller.job

import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.user.entity.CurrentUser
import team.aikero.blade.user.holder.DefaultCurrentUserContentSetter
import tech.tiangong.sdp.SdpApplication

@SpringBootTest(
    classes = [SdpApplication::class], properties = ["spring.profiles.active=qa-ola"
    ]
)
@Slf4j
class JobAidcControllerTest {
    private val currentUserContentSetter = DefaultCurrentUserContentSetter

    @Autowired
    private lateinit var jobAidcController: JobAidcController
    @BeforeEach
    fun setUp() {
        currentUserContentSetter.set(
            CurrentUser(
                151240195L, "覃文轩", "",
                tenantId = 2L, false,
            )
        )
    }

    @AfterEach
    fun tearDown() {
        currentUserContentSetter.clean()
    }

    @Test
    fun trendCenterPullInspiration() {
        jobAidcController.trendCenterPullInspiration()
    }

    @Test
    fun aliexpressPullInspiration() {
    }

    @Test
    fun imageHandle() {
    }

    @Test
    fun trendCenterPullInspirationFix() {
    }
}