package tech.tiangong.sdp.enums

import team.aikero.blade.core.toolkit.isBlank

/**
 * AIGC选款数据推送来源
 * @author zjh
 * @date 2024-11-28 17:24:13
 */

enum class PickingSourceTypeEnum(val code: String, val desc: String) {
    SMART_DEVELOP_STYLE("smart_develop_style", "AI设计"),
    POSTURE_FISSION("posture_fission", "姿势裂变"),
    FLORAL_PATTERN("floral_pattern_apply", "花型上身"),
    FASHION_VIRTUAL_TRY_ON("fashion_virtual_try_on", "虚拟换衣"),
    STYLE_GEN("style_gen", "风格化衍生"),
    ;

    companion object {
        /**
         * 根据code获取枚举
         */
        fun of(code: String?): PickingSourceTypeEnum {
            return PickingSourceTypeEnum.entries.firstOrNull { it.code == code }
                ?: throw IllegalArgumentException("不存在该code的枚举值：$code")
        }

        /**
         * 根据code获取名称
         */
        fun getDescByCode(code: String?): String? {
            if (code.isBlank()) {
                return null
            }
            return entries.firstOrNull { it.code == code }?.desc
        }
    }
}
