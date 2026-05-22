import team.aikero.gradle.plugin.version.catalog.versionCatalogConf

pluginManagement {
    repositories {
        mavenLocal()
        maven {
            url = uri(providers.gradleProperty("companyNexusRepositoryUrl").get())
            isAllowInsecureProtocol = true
            credentials {
                username = providers.gradleProperty("companyNexusUsername").get()
                password = providers.gradleProperty("companyNexusPassword").get()
            }
        }
        gradlePluginPortal()
    }
}
plugins {
    val catalogVersion = providers.gradleProperty("catalogVersion").get()
    val frameworkVersion = providers.gradleProperty("frameworkVersion").get()
    println("===============================================================================================================================================================")
    println("-> Configuring frameworkVersion=$frameworkVersion,catalogVersion=$catalogVersion")
    println("===============================================================================================================================================================")
    id("team.aikero.gradle.plugin.version-catalog") version (catalogVersion)
}
rootProject.name = "sdp-curation"
val frameworkVersion: String by settings

include(
    "sdp-curation-common",
    "sdp-curation-sdk",
    "sdp-curation-service",
)

versionCatalogConf {
    artifactVersion = frameworkVersion
}



