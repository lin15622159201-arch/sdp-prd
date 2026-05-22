package test.oss

//import com.arsenal.file.manage.upload.UploaderOssClient
//import com.arsenal.file.manage.upload.dto.UploaderRequestDto
import okhttp3.OkHttpClient
import okhttp3.Request
import org.junit.jupiter.api.Disabled
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import tech.tiangong.sdp.SdpApplication
import tech.tiangong.sdp.service.component.ImageOssComponent

/**
 * @author zjh
 * @date 2024/12/23 14:15
 */
//@SpringBootTest(
//    classes = [SdpApplication::class],
//    properties = {"spring.profiles.active=dev1-saas"}
//)
@SpringBootTest(classes = [SdpApplication::class], properties = ["spring.profiles.active=dev-ola"])
//@Disabled
@Slf4j
class OssTest {

    //    @Autowired
//    lateinit var uploaderOssClient: UploaderOssClient
    @Autowired
    lateinit var imageOssComponent: ImageOssComponent

    @Test
    fun imageUrlToOssTest() {
        // 外链-图片url
        val outUrl = "https://img1.baidu.com/it/u=2456045944,1230132244&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1320"

        // 下载图片到本地
        val client = OkHttpClient()
        val request = Request.Builder()
            .url(outUrl)
            .build()
        val response = client.newCall(request).execute()
        val imageBytes = response.body?.bytes()

//        val req = UploaderRequestDto("image/jpeg", imageBytes, uploaderOssClient.buildFullyFileName("out_${IdHelper.getId()}.png", false), null)
//        val resp = uploaderOssClient.upload(req)
//        if (StringUtils.isNotBlank(resp.errMsg)) {
//            log.error {"外网图片下载到oss失败，返回信息：${resp.toJson()}"}
//            return
//        }
//        log.info {"外网图片下载到oss成功，返回信息：${resp.toJson()}"}
    }

    @Test
    fun blacklistTest() {
        val outUrl = "https://img1.baidu.com/it/u=2456045944,1230132244&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1320"
        log.info { imageOssComponent.imageUrlToOss(outUrl) }

        val images = mutableListOf<String>().apply {
            this.add("https://search-images.oss-ap-southeast-1-cross.aliyuncs.com/shopee/th/6b1fbbbc7cbab0d47bd4c2447e6a2780.jpg")
            this.add("https://search-images.oss-ap-southeast-1-cross.aliyuncs.com/shopee/th/th-11134207-23020-znockvvbafnvaa.jpg")
            this.add("https://aib-data-sg.oss-ap-southeast-1.aliyuncs.com/ext-img/coffee/img/coffee||104114356240||702db9a4b36506137ced944bd9ef3bf9.jpg")
        }

        images.forEach {
            log.info { imageOssComponent.imageUrlToOss(it) }
        }
    }
}