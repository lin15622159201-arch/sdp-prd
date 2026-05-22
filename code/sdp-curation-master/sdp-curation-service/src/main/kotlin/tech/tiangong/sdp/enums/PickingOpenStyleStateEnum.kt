package tech.tiangong.sdp.enums

/**
 * 选款-开款状态
 * 0-待处理 1-已开款 2-已淘汰
 * @date 2024/8/8
 */
enum class PickingOpenStyleStateEnum(
    val code: Int?,
    val desc: String?,
) {
    /**
     * 待处理
     */
    WAIT_PROCESS(0, "待处理"),

    /**
     * 已开款
     */
    OPEN(1, "已开款"),

    /**
     * 已淘汰
     */
    ELIMINATED(2, "已淘汰");

    companion object {
        /**
         * 根据code获取枚举实例
         *
         * @param code 状态码
         * @return 对应的枚举实例，如果不存在则返回null
         */
        fun getByCode(code: Int?): PickingOpenStyleStateEnum? {
            if (code == null) {
                return null
            }
            for (state in entries) {
                if (state.code == code) {
                    return state
                }
            }
            return null
        }
    }
}
