package tech.tiangong.sdp.enums

/**
 * 选款任务明细选用状态
 * 0-待选择 1-已选中 2-已淘汰
 * @date 2024/8/8
 */
enum class PickingStyleDetailStateEnum(
    val code: Int?,
    val desc: String?,
) {
    /**
     * 待选择
     */
    WAIT_SELECT(0, "待选择"),

    /**
     * 已选中
     */
    SELECTED(1, "已选中"),

    /**
     * 已淘汰
     */
    ELIMINATED(2, "已淘汰");

    /**
     * 根据code获取枚举实例
     *
     * @param code 状态码
     * @return 对应的枚举实例，如果不存在则返回null
     */
    fun getByCode(code: Int?): PickingStyleDetailStateEnum? {
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
