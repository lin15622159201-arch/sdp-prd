package tech.tiangong.sdp.enums

/**
 * 款式类型：0-净色、1-花型
 * @author zjh
 * @date 2024/12/2 17:23
 */
enum class StyleTypeEnum(
    val code: Int,
    val desc: String,
) {
    /**
     * 0-净色
     */
    CLEAN_COLOR(0, "净色款"),

    /**
     * 1-花型
     */
    FLOWER_TYPE(1, "满幅花型款"),

    /**
     * 2-logo印款
     */
    LOGO(2, "logo印款"),
    ;

    /**
     * code获取枚举
     */
    companion object {
        fun of(code: Int): StyleTypeEnum? {
            return entries.firstOrNull { it.code == code }
        }
    }
}