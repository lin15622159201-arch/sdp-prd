package tech.tiangong.sdp.enums

/**
 * 提交sdp-design状态 10-待推送 20-已推送 30-推送失败
 */
enum class DesignSubmitStatusEnum(val code: Int, val content: String) {
    INIT(10, "初始态(待生成4K图)"),
    GENERATING(20, "生成中"),
    AWAIT(30, "待推送(已生成4K图)"),
    PUSHED(40, "已推送"),
    FAILED(50, "失败"),
    ;


    // 根据state获取枚举
    fun getByState(state: Int?): DesignSubmitStatusEnum? {
        for (value in entries) {
            if (value.code == state)
                return value
        }
        return null
    }

    companion object {

    }
}
