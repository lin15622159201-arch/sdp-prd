package tech.tiangong.sdp.enums

import team.aikero.blade.sequence.code.entity.SimpleCodeRule

/**
 * 编号生成规则
 * 1. 注入 businessCodeGenerator
 * 2. 用法: businessCodeGenerator.generate(CodeRuleEnum.INSPIRATION_EXPORT)
 * @author zjh
 * @date 2024/9/4 15:34
 */
enum class CodeRuleEnum(
    /**
     * 编码值的前缀 作为生成编码的一部分 例如 F FH FASHION
     */
    override val valuePrefix: String,

    /**
     * 编码名称用途 会拼接到生成编码的redis key当中作为一部分 注意这部分不作为编码的一部分 而只是作为redis key的一部分
     */
    override val codeName: String,

    /**
     * 日期的前缀 作为编码的一部分 例如 yyMMdd yy
     */
    override val datePrefix: String,

    /**
     * 规则 例如 %1$05d  自增为1 最后会与redis生成的实际值做替换 得到 00001
     */
    override val formatTemplate: String,

    /**
     * 针对这个缓存key的描述 说明清楚用途 与codeName对应
     */
    override val desc: String,
) : SimpleCodeRule {

    /**
     * 灵感源数据导出文件名流水号: 年（两位）月（两位）日+2位流水号 => 2024090310
     */
    INSPIRATION_CODE("", "INSPIRATION_CODE", "yyyyMMdd", "%1$02d", "灵感源数据编号"),

    /**
     * 灵感源数据导出文件名流水号: 年（两位）月（两位）日+2位流水号 => 2024090310
     */
    INSPIRATION_EXPORT("", "INSPIRATION_EXPORT_CODE", "yyyyMMdd", "%1$02d", "灵感源数据导出文件名流水号"),

    /**
     * 异常订单导出文件名流水号: 年（两位）月（两位）日+2位流水号 => 2024090310
     */
    ERROR_ORDER_EXPORT("", "ERROR_ORDER_EXPORT_CODE", "yyyyMMdd", "%1$02d", "异常订单导出文件名流水号"),

    /**
     * 灵感提交导下游的流水号: （两位）年（两位）月（两位）日+4位流水号 => 2409030010
     */
    INSPIRATION_SUBMIT_CODE("", "INSPIRATION_SUBMIT_CODE", "yyMMdd", "%1$04d", "灵感提交导下游的流水号"),

    /**
     * 选款结果导出文件名的流水号: （两位）年（两位）月（两位）日+2位流水号 => 24090301
     */
    PICKING_RESULTS_EXPORT("", "PICKING_RESULTS_EXPORT", "yyyyMMdd", "%1$02d", "选款结果导出文件名的流水号"),


    /**
     * 开款
     */
    DEVELOP_STYLE("KK", "DEVELOP_STYLE_TASK", "yyMMdd", "%1$06d", "开款任务编号"),

    /**
     * 现货
     */
    SPOT_STYLE("XH", "SPOT_STYLE_TASK", "yyMMdd", "%1$06d", "现货任务编号"),

    /**
     * 现货-SKC
     */
    SPOT_STYLE_SKC("XHC", "SPOT_STYLE_TASK", "yyMMdd", "%1$06d", "现货SKC编号"),
    /**
     * 图片更新
     */
    IMAGE_UPDATE("IM", "IMAGE_UPDATE_TASK", "yyMMdd", "%1$06d", "图片更新任务编号"),


    /**
     * 款式管理-spu编号
     */
    CLOTHING_SPU_CODE("", "CLOTHING_SPU_CODE_NEW", "yyMMdd", "%1$04d", "spu编号")

    ;

}
