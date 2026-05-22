package tech.tiangong.sdp.enums

/**
 * 识别结果: 0无效, 1通过, 2识别失败,3识别中
 * @author zjh
 * @date 2024/12/2 16:13
 */
enum class IdentifiedStatusEnum(
    val code: Int,
    val desc: String,
) {
    /**
     * 无效
     */
    INVALID(0, "无效"),

    /**
     * 通过
     */
    VALID(1, "通过"),

    /**
     * 识别失败
     */
    FAIL(2, "识别失败"),

    /**
     * 识别中
     */
    IDENTIFYING(3, "识别中"),
    ;

    companion object {
        fun getByCode(code: Int): IdentifiedStatusEnum? {
            for (value in entries) {
                if (value.code == code) {
                    return value
                }
            }
            return null
        }
    }
}