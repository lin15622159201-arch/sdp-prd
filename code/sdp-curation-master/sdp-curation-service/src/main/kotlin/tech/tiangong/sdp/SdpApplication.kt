package tech.tiangong.sdp

import org.mybatis.spring.annotation.MapperScan
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.openfeign.EnableFeignClients
import org.springframework.context.annotation.ComponentScan

@SpringBootApplication
@EnableFeignClients(
    basePackages = [
        "com.zjkj.aigc",
        "tech.tiangong.butted",
        "tech.tiangong.pop",
        "tech.tiangong.inspiration.client",
        "team.aikero.admin.sdk.client",
        "tech.tiangong.sdp.external",
        "tech.tiangong.bfg.sdk.client",
        "team.aikero.blade.uacs.sdk.client",
        "com.zjkj.scf.notification",
    ]
)
@ComponentScan(
    basePackages = [
        "tech.tiangong",
        "team.aikero.blade",
    ]
)
@MapperScan(basePackages = ["tech.tiangong.sdp.**.mapper"])
class SdpApplication

fun main(args: Array<String>) {
    runApplication<SdpApplication>(*args)
}
