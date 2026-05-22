package tech.tiangong.sdp.service.impl

import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import team.aikero.blade.auth.withSystemUser
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.user.entity.CurrentUser
import team.aikero.blade.user.holder.DefaultCurrentUserContentSetter
import tech.tiangong.sdp.SdpApplication

@SpringBootTest(classes = [SdpApplication::class], properties = ["spring.profiles.active=dev-ola"])
@Slf4j
class InspirationServiceTest {

    private val currentUserContentSetter = DefaultCurrentUserContentSetter

    @Autowired
    private lateinit var inspiration: tech.tiangong.sdp.external.InspirationDesignClient


    @BeforeEach
    fun setUp() =
        currentUserContentSetter.set(
            CurrentUser(
                151240195L, "覃文轩", "",
                tenantId = 2L, false,
            )
        )

    @AfterEach
    fun tearDown() =
        currentUserContentSetter.clean()

    @Test
    fun page() {
    }

    @Test
    fun export() {
    }

    @Test
    fun importExcel() {
    }

    @Test
    fun importImage() {
    }

    @Test
    fun detail() {
    }

    @Test
    fun taskSubmit() {
    }

    @Test
    fun taskReSubmitDetail() {
    }

    @Test
    fun getByInspirationOrPickingId() {
    }

    @Test
    fun submitAiDesignTask() {
//        7290274136184717511
        withSystemUser {

            val listSmartDevelopPromiseTag = inspiration.listSmartDevelopPromiseTag(listOf(7288828297243467908,
                7288826851307495535,
                7288826661242609772,
                7288825754396336220,
                7288819374511824897,
                7288817884128800769,
                7268471634795827206,
                7268415498189164547,
                7268069385993076740,
                7267815252409065474,
                7267814086413520898,
                7267787479942561845,
                7267787300875141162
            ))
            println(listSmartDevelopPromiseTag)
        }
    }
}