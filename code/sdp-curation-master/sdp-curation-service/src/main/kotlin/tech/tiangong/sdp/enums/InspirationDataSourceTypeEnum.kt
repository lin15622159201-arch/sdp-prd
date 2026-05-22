package tech.tiangong.sdp.enums

/**
 * 灵感数据来源枚举
 * @author zjh
 * @date 2025-1-14 14:49:22
 */
enum class InspirationDataSourceTypeEnum(val code: String, val content: String) {
    IMPORT("IMPORT", "导入"),
    AIDC_TREND_CENTER("AIDC_TREND_CENTER", "AIDC-趋势中心"),
    AIDC_ALIEXPRESS("AIDC_ALIEXPRESS", "AIDC-商品智脑"),
    ;

    companion object {
        fun getByCode(code: String): InspirationDataSourceTypeEnum? {
            for (value in entries) {
                if (value.code == code) {
                    return value
                }
            }
            return null
        }
    }

}
