package tech.tiangong.sdp.enums

import team.aikero.blade.core.toolkit.isBlank

/**
 * 供给方式枚举
 * @author zjh
 * @date 2024-11-19 14:57:26
 */
enum class SupplyModeEnum(val code: String, val desc: String) {
    AIGC("Artificial", "AIGC"),
    OEM("Equipment", "OEM"),
    OBM_REPLICA("imitation", "仿款"),
    OBM_SPOT_GOODS("Manufacturer", "ODM"),
    LOGO_NUM("digital_printing", "数码印花"),
    TRY_ON("try_on", "现货 try on"),
    STYLE_GEN("supplyMethodCode", "风格化衍生"),
    POSTURE_FISSION("posture_fission", "姿势裂变"),
    FASHION_VIRTUAL_TRY_ON("fashion_virtual_try_on", "虚拟换衣"),
    FLORAL_PATTERN("floral_pattern_apply", "花型上身"),
    ;

    companion object {

        fun getByCode(code: String?): SupplyModeEnum? = entries.firstOrNull { it.code == code }

        fun getByDesc(desc: String?): SupplyModeEnum? = entries.firstOrNull { it.desc == desc }

        /**
         * 根据code获取名称
         */
        fun getDescByCode(code: String?): String? {
            if (code.isBlank()) {
                return null
            }
            return SupplyModeEnum.entries.firstOrNull { it.code == code }?.desc
        }
    }
}
