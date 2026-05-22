import java.time.LocalDate
import java.time.format.DateTimeFormatter

plugins {
    alias(commonLibs.plugins.springboot)
    alias(commonLibs.plugins.kotlin.jvm)
    alias(commonLibs.plugins.kotlin.spring)
    alias(commonLibs.plugins.publish.conf)
    alias(commonLibs.plugins.common.conf)
    kotlin("plugin.noarg") version "2.0.20"
}

dependencies {
    implementation(projects.sdpCurationCommon)

    implementation(commonLibs.blade.web.cloud.spring.boot.starter) {
        exclude("team.aikero.blade","blade-logging-spring-boot-starter")
    }
    implementation(commonLibs.mysql.connector)
    implementation(commonLibs.blade.data.mybatis.plus.spring.boot.starter)
    implementation(commonLibs.blade.sequence.spring.boot.starter)

    implementation(commonLibs.fastjson2kotlin)
    implementation(commonLibs.transmittable.thread.local)
    implementation(commonLibs.jackson.module.kotlin)
    implementation(commonLibs.mapstruct)
    implementation("org.projectlombok:lombok:1.18.26")
//    kapt(commonLibs.mapstruct.processor)
    implementation(springBootLibs.spring.springBootStarterAmqp)
    testImplementation(commonLibs.blade.test.spring.boot.starter)
    //其他工具包
    implementation(libs.easyexcel){
        exclude("org.apache.poi","poi-ooxml-schemas")
    }
    implementation(libs.easypoi.base){
        exclude("org.apache.poi","poi-ooxml-schemas")
    }

    //sdk
    implementation("tech.tiangong.inspiration:inspiration-sdk:3.25-RELEASE")
    implementation("tech.tiangong.inspiration:inspiration-common:3.25-RELEASE")
    implementation("team.aikero.blade.uacs:uacs-sdk:0.0.11")
    implementation("tech.tiangong.fashion:aigc-digital-print-sdk:0.0.2-RELEASE") {
        exclude("org.slf4j")
    }
    implementation("com.google.code.gson:gson:2.8.6")
    implementation("team.aikero.arsenal:dict-sdk:0.0.9-RELEASE")
    implementation(libs.tech.butted.sdk)
    implementation("tech.tiangong.pop:pop-product-sdk:0.0.1")
    implementation("com.zjkj.scf:notification-sdk:2.0.1-RELEASE") /*{
        exclude(group = "com.zjkj.booster", module = "booster-feign-starter")
    }*/
    implementation("com.lazada:lazop-api-sdk:1.2.0")
    implementation("cn.hutool:hutool-all:5.8.11")
    implementation(commonLibs.blade.auth.spring.boot.starter)
    implementation(commonLibs.blade.feign.spring.boot.starter)
    implementation(commonLibs.blade.lock.spring.boot.starter)
    implementation(commonLibs.blade.data.redis.spring.boot.starter)

//    implementation(commonLibs.blade.file)
    implementation(commonLibs.blade.file.spring.boot.starter)
    implementation(libs.bfg.sdk)
    implementation(libs.tracker.micrometer)

    implementation(libs.aliyun.dashvector.java.sdk) {
        exclude(group = "org.apache.logging.log4j", module = "log4j-slf4j-impl")
    }
}

tasks.bootJar {
    archiveVersion.set("")
}

// 标定使用JUnit平台
tasks.test {
    useJUnitPlatform()
}

//kapt {
//    keepJavacAnnotationProcessors = true
//}


tasks.register("updateVersionProperties") {
    doLast {
        val versionPropertiesFile = file("$projectDir/src/main/resources/versions.properties")
        val currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"))
        versionPropertiesFile.writeText("spring.cloud.nacos.discovery.metadata.version=$currentDate")
    }
}

tasks.named("compileKotlin") {
    dependsOn("updateVersionProperties")
}


configurations.all {
    resolutionStrategy {
//        force("javax.validation:validation-api:2.0.1.Final")
//        force("org.slf4j:slf4j-api:1.7.36")
  //      force("com.google.guava:guava:33.3.1-jre")
    }
}