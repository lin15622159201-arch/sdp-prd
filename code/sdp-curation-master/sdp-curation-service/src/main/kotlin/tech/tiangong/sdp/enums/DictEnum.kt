package tech.tiangong.sdp.enums

/**
 * 字典枚举-对应字典服务列表
 * @author zjh
 * @date 2024-12-9 23:50:59
 */
enum class DictEnum(val dictCode: String, val desc: String) {
    PLM_CLOTHING_BAND("plm_clothing_band", "款式波段"),
    SKC_CANCEL_REASON("skc_cancel_reason", "SKC取消原因"),
    TRAY_TYPE("tray_type", "货盘类型"),
    RUNNING_DIAGRAM_PROBLEM("running_diagram_problem", "跑图问题反馈"),
    INSPIRATION_CANCEL_REASON("inspiration_cancel_reason", "灵感淘汰原因"),
    PLANNING_SOURCE("planning_source", "企划来源"),
    SUPPLY_MODE("supply_mode", "供给方式（商品类型）"),
    NATIONAL("national", "国家站点"),
    CLOTHING_CATEGORY("clothing_category", "内部品类"),
    FD_PRINTING("fd-printing", "建议印花"),
    JV_STYLE("jv-style", "风格"),
    INSPIRATION_IMAGE_SOURCE("Inspiration_Image_Source", "灵感图来源"),
    INSPIRATION_BRAND("inspiration_brand", "灵感图品牌"),
    INSPIRATION_STYLE("STYLE", "风格"),
    INSPIRATION_AGE("AGE", "年龄"),
    INSPIRATION_POPULAR("POPULAR", "爆款"),
    FG_MODEL_VERSION("FG_modelVersion", "FG模型版本"),
    CLOTHING_COLOR("clothing_color", "颜色库"),
    PLM_CATEGORY("plm_category", "plm品类"),
    SDP_CATEGORY("sdp_category", "SDP品类"),
    PLM_VALUE("plm_value", "plm值映射"),
    PLM_CLOTHING_EXECUTIVE_STANDARDS("plm_clothing_executive_standards", "ops成衣执行标准"),
    CMBZ("cmbz", "尺码标准"),
    PLM_STANDARD_SIZE("plm_standard_size", "预设资料尺码标准"),
    PRODUCT_TAG("product_tag", "款式标签"),
    PLM_CLOTHING_SECURITY_TYPE("plm_clothing_security_type", "成衣安全类别"),
    PLM_PATTERN_ELEMENTS("pattern_elements", "图案元素"),
    PLM_REFERENCE_SEASON("plm_reference_season", "季节"),
    PLM_TAG_MATERIAL("plm_tag_material", "预设资料标签信息"),
    PLM_STYLE_SOURCE("plm_style_source", "款式来源"),
    Y2_SHOP_SUBJECT("company_id", "Y2店铺主体"),






    STYLE_SOURCE("style_source", "款式来源"),
}