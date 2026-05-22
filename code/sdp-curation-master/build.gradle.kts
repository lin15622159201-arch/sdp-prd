plugins {
    alias(commonLibs.plugins.kotlin.jvm)
}

subprojects {
    apply(plugin = "java")
    val lombok = findProperty("lombok")?:""
    println("Configuring lombok: $lombok")
    dependencies {
        compileOnly("org.projectlombok:lombok:$lombok")
        annotationProcessor("org.projectlombok:lombok:$lombok")
        testCompileOnly("org.projectlombok:lombok:$lombok")
        testAnnotationProcessor("org.projectlombok:lombok:$lombok")
    }
}