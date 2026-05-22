package tech.tiangong.sdp.enums

/**
 * 选款列表选用状态
 *
 * @date 2024/8/8
 */
enum class PickingStyleStateEnum(
    val code: Int?,
    val desc: String?,
) {
    /**
     * 已完成状态
     */
    COMPLETE(1, "已完成"),

    /**
     * 待处理状态
     */
    WAIT(0, "待处理");

    /**
     * 根据 code 获取枚举实例
     *
     * @param code 状态码
     * @return 对应的枚举实例，如果不存在则返回 null
     */
    fun getByCode(code: Int): PickingStyleStateEnum? {
        for (state in entries) {
            if (state.code == code) {
                return state
            }
        }
        return null
    }
}
