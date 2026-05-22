package tech.tiangong.sdp.enums

/**
 * 灵感源数据提交状态枚举
 * @author zjh
 * @date 2024-11-20 11:51:02
 */
enum class SubmitStatusEnum(val code: Int, val desc: String) {
    PENDING(0, "待提交"),
    SUBMITTED(1, "已提交");

    companion object {
        fun getByCode(code: Int): SubmitStatusEnum? {
            return entries.find { it.code == code }
        }
    }
}
