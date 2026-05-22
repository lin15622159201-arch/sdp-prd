plugins {
    alias(commonLibs.plugins.kotlin.jvm)
    alias(commonLibs.plugins.publish.conf)
    alias(commonLibs.plugins.common.conf)
}

dependencies {
    api(projects.sdpCurationCommon)
    implementation(commonLibs.blade.common)
    api(commonLibs.blade.oplog)
    implementation(springCloudLibs.spring.springCloudOpenfeignCore)
}
