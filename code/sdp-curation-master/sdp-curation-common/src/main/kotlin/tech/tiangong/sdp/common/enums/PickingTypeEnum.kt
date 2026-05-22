package tech.tiangong.sdp.common.enums

import java.util.*

/**
 * 创建选款来源枚举类
 * @author liuhongfu
 * @create 2025-11-03 14:47:10
 */
enum class PickingTypeEnum(val code: String, val desc: String) {
    INSPIRATION("inspiration", "灵感源"),
    PROTOTYPE_MANAGE("prototype_manage", "款式管理"),
    SPOT_STYLE("spot_style", "现货管理"),
    UPLOAD("upload", "用户上传"),
    UNKNOWN("unknown", "未知任务类型"),
    ;


    companion object {

        @JvmStatic
        fun isInspiration(code: String?): Boolean {
            return INSPIRATION.code == code
        }

        @JvmStatic
        fun isStyle(code: String?): Boolean {
            return PROTOTYPE_MANAGE.code == code || SPOT_STYLE.code == code
        }

        @JvmStatic
        fun prototypeManage(code: String?): Boolean {
            return PROTOTYPE_MANAGE.code == code
        }

        @JvmStatic
        fun isSpot(code: String?): Boolean {
            return SPOT_STYLE.code == code
        }

        /**
         * 根据code获取枚举
         *
         * @param code
         * @return
         */
        fun getByCode(code: String): PickingTypeEnum? {
            return entries.firstOrNull { e: PickingTypeEnum -> Objects.equals(e.code, code) }
        }

        /**
         * 根据desc获取枚举
         *
         * @param desc
         * @return
         */
        fun getByDesc(desc: String): PickingTypeEnum? {
            return entries.firstOrNull { e: PickingTypeEnum -> Objects.equals(e.desc, desc) }
        }
    }
}
