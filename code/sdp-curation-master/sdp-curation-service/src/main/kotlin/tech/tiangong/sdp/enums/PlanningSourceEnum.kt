package tech.tiangong.sdp.enums

/**
 * 企划来源-字典枚举
 * @author zjh
 * @date 2024/12/16 17:05
 */
enum class PlanningSourceEnum(val dictCode: String, val diceName: String) {
    TOP("top", "Top灵感源"),
    TREND("Trend", "Trend灵感源");

    companion object {
        fun getByCode(code: String?): PlanningSourceEnum? {
            if (code.isNullOrBlank()) {
                return null
            }
            return entries.firstOrNull { it.dictCode == code }
        }
    }
}