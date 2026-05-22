package tech.tiangong.sdp.enums

/**
 * 选款状态枚举
 * @author zjh
 * @date 2024-11-28 17:24:13
 */
enum class PickingStateEnum(val state: Int, val content: String) {
    NOT_AVAILABLE(0, "待选中"),
    AVAILABLE(1, "已选中"),
    NOT_SELECTED(2, "未选中"),
    WHOLE(3, "全部");

    // 根据state获取枚举
    fun getByState(state: Int?): PickingStateEnum? {
        for (value in entries) {
            if (value.state == state)
                return value
        }
        return null
    }

    companion object {
        // state是否选过
        fun isSelected(state: Int?): Boolean {
            return NOT_SELECTED.state == state || AVAILABLE.state == state
        }
    }
}
