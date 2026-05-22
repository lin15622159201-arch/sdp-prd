plugins {
    alias(commonLibs.plugins.kotlin.jvm)
    alias(commonLibs.plugins.publish.conf)
    alias(commonLibs.plugins.common.conf)
}
dependencies {
    implementation(commonLibs.jakarta.validation.api)
    implementation(commonLibs.blade.common)
    implementation("org.projectlombok:lombok:1.18.26")
}