package tech.tiangong.sdp.common.enums

import java.util.*

/**
 * @author zjh
 * @create 2024-11-26 14:47:10
 */
enum class YesOrNoEnum(val code: Int, val desc: String) {
    NO(0, "否"),
    YES(1, "是"),
    ;


    companion object {
        /**
         * 根据code获取枚举
         *
         * @param code
         * @return
         */
        fun getByCode(code: Int): YesOrNoEnum? {
            return entries.firstOrNull { e: YesOrNoEnum -> Objects.equals(e.code, code) }
        }

        /**
         * 根据desc获取枚举
         *
         * @param desc
         * @return
         */
        fun getByDesc(desc: String): YesOrNoEnum? {
            return entries.firstOrNull { e: YesOrNoEnum -> Objects.equals(e.desc, desc) }
        }
    }
}
