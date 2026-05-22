package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * ErrorCodeEnum
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/5 14:44
 */
@Getter
@AllArgsConstructor
public enum TemuErrorCodeEnum {
    // 系统级错误
    PARAM_ERROR(1000003, "参数错误", "结合参数错误的具体原因排查"),
    SERVER_ERROR(1000001, "服务器开小差", "一般是系统抖动，可参考具体报错文案尝试解决或重试，如果还不行请联系管理员"),
    SYSTEM_EXCEPTION(1000005, "系统异常", "尝试重试，如果还不行请联系管理员"),

    // 商品规格相关错误
    SPEC_VALIDATION_FAILED(2000011, "自定义规格属性校验失败", "请结合校验失败具体原因检查规格入参"),
    VOLUME_INPUT_ERROR_1(2000044, "商品体积录入有误，请遵循最长边 ≥ 次长边 ≥ 最短边", "商品体积录入有误，请遵循最长边 ≥ 次长边 ≥ 最短边"),
    INVALID_BRAND(2000081, "不合法或不可用的品牌", "输入的品牌信息不可用或id不正确"),
    VOLUME_INPUT_ERROR_2(2000096, "体积内容必须遵循最长边 ≥ 次长边 ≥ 最短边原则", "体积内容必须遵循最长边 ≥ 次长边 ≥ 最短边原则"),
    NET_CONTENT_REQUIRED(2000135, "当前类目净含量必填", "请填写净含量"),
    ENGLISH_TITLE_LENGTH(2000177, "半托管商品英文标题最少需要x个字", "英文标题不满足字数要求，请重新输入"),
    PROPERTY_VALUE_MISMATCH(2000200, "属性值id[x]的属性值名称有误", "属性值id与属性值不匹配，请检查入参"),
    LARGE_PACKAGE_ERROR(2000202, "商品不符合大件标准，不可使用大件商品运费模版", "请选择非大件运费模板，或者重新维护商品体积"),
    PRODUCT_ATTR_VALIDATION_FAILED(6000002, "货品属性校验失败", "请结合校验失败具体原因检查属性入参"),
    SIZE_TABLE_VALIDATION_FAILED(6000012, "尺码表校验失败", "请结合校验失败具体原因检查尺码表入参"),
    CHILDREN_SHOES_AGE_MISMATCH(6000059, "童鞋适用年龄和鞋子不匹配，请确认后填写", "请确认填写内容"),
    INVALID_SPEC_ATTR(2000004, "不合法的规格属性", "specId与specName不匹配，请检查入参"),

    // 类目相关错误
    INVALID_CATEGORY(2000009, "不合法的类目", "入参类目id不合法，或者查询类目信息接口抖动，请重试，如果不行请更换类目"),
    ATTR_TEMPLATE_QUERY_FAILED(2000010, "属性模板查询失败", "接口抖动，或者当前类目未配置属性模板，请尝试重试，如果不行联系管理员处理"),

    // 图片相关错误
    FASHION_CAROUSEL_IMAGE_ERROR(2000014, "服饰类目skc轮播图[x]校验失败，应符合宽高比例为3:4，宽>=1340px，高>=1785px，<=2M", "上传图片不符合格式要求，请重新上传"),
    MATERIAL_IMAGE_ERROR(2000017, "素材图[x]校验失败，应符合图片宽高比例为1:1，宽>=800px，高>=800px，<=2M", "上传图片不符合格式要求，请重新上传"),
    NON_FASHION_CAROUSEL_IMAGE_ERROR(2000018, "非服饰类目货品轮播图x校验失败，应符合宽高比例为1:1，宽>=800px，高>=800px，<=2M", "上传图片不符合格式要求，请重新上传"),
    NON_FASHION_SKU_PREVIEW_IMAGE_ERROR(2000020, "非服饰类目sku预览图[x]校验失败，应符合宽高比例为1:1，宽>=800px，高>=800px，<=2M", "上传图片不符合格式要求，请重新上传"),
    IMAGE_FORMAT_ERROR(2000021, "图片[x]格式校验失败，只允许.JPG .JPEG .PNG", "请上传JPG、JPEG、PNG的图片"),
    IMAGE_LANGUAGE_ERROR(2000025, "当前图片中文字请使用销售目的地官方语言，请重新上传[x]", "图片存在中文，请重新上传"),
    IMAGE_QUALITY_CHECK_FAILED(2000026, "图片是否存在牛皮癣校验失败,请重试", "查询接口失败，请重试"),
    EMPTY_IMAGE_URL(2000114, "图片不合法，不支持空url", "请勿传入空url"),
    FASHION_MULTI_LANG_CAROUSEL_IMAGE_ERROR(2000317, "服饰类目多语言skc轮播图[x]校验失败，应符合宽高比例为3:4，宽>=1340px，高>=1785px，<=2M", "上传图片不符合格式要求，请重新上传"),
    NON_FASHION_MULTI_LANG_CAROUSEL_IMAGE_ERROR(2000318, "非服饰类目货品多语言轮播图[x]校验失败，应符合宽高比例为1:1，宽>=800px，高>=800px，<=2M", "上传图片不符合格式要求，请重新上传"),
    NON_FASHION_MULTI_LANG_SKU_PREVIEW_IMAGE_ERROR(2000319, "非服饰类目sku多语言预览图[x]校验失败，应符合宽高比例为1:1，宽>=800px，高>=800px，<=2M", "上传图片不符合格式要求，请重新上传"),
    MIDDLE_EAST_ENGLISH_SKU_PREVIEW_REQUIRED(6000056, "请上传中东英语SKU预览图", "请上传中东英语SKU预览图"),
    UK_ENGLISH_SKU_PREVIEW_REQUIRED(6000058, "请上传英国英语SKU预览图", "请上传英国英语SKU预览图"),
    LOCAL_LANGUAGE_PREVIEW_REQUIRED(7000048, "请上传当地语种预览图", "请上传当地语种预览图"),
    LOCAL_LANGUAGE_CAROUSEL_REQUIRED(7000049, "请上传当地语种轮播图", "请上传当地语种轮播图"),
    LOCAL_LANGUAGE_PRODUCT_NAME_REQUIRED(7000050, "请填写当地语种商品名称", "请填写当地语种商品名称"),
    ACCESS_TOKEN_INVALID(7000020, "token已经失效","access_token invalid."),

    // 价格相关错误
    FASHION_PRICE_CONSISTENCY(2000031, "服装类目skc下价格需要保持一致，请进行调整", "服装类目skc下价格需要保持一致，请进行调整"),
    INVALID_CURRENCY(2000060, "请选择正确的币种", "输入的币种入参不合法"),
    CURRENCY_CHANGE_NOT_SUPPORTED(2000061, "暂不支持变更币种", "报价格币种需和店铺支持币种保持一致"),
    DECLARED_PRICE_TOO_HIGH(2000079, "录入申报价格大于x元，商品无法创建成功", "达到申报价格上限，请合理输入"),
    SITE_DECLARED_PRICE_VALIDATION_FAILED(2000204, "分站点申报价格校验失败", "检查分站点报价格入参，比如站点信息是否和经营站点一致"),

    // 店铺相关错误
    EXTERNAL_PRODUCT_LINK_REQUIRED(2000037, "市场部店铺发布货品需要外部商品链接", "请补齐外部商品链接"),
    MANNEQUIN_DATA_VALIDATION_FAILED(2000077, "模特数据校验失败", "请结合具体失败原因解决"),
    INSUFFICIENT_RESERVED_AMOUNT(2000173, "您当前帐户预留金额不足，无法发布商品，请前往【结算管理-资金中心】充值", "请前往【结算管理-资金中心】充值"),
    INSUFFICIENT_RESERVED_AMOUNT_CUSTOM(2000187, "您当前账户预留金额不足，无法选择定制商品，请前往【结算管理-资金中心】充值", "您当前账户预留金额不足，无法选择定制商品，请前往【结算管理-资金中心】充值"),
    INSUFFICIENT_RESERVED_AMOUNT_CUSTOM_WAIT(2000198, "您当前账户预留金额不足，无法选择定制商品，请等待货款回款足额后再进行开启定制", "您当前账户预留金额不足，无法选择定制商品，请等待货款回款足额后再进行开启定制"),
    SHOP_CLOSED(2000322, "当前已操作退店，发品失败", "联系管理员解决"),

    // 说明书相关错误
    INSTRUCTION_FILE_ERROR(2000094, "说明书文件[x]校验失败，单页应<=[x]M，长x宽应为1600*1200", "上传说明书不符合格式要求，请重新上传"),
    INSTRUCTION_NOT_UPLOADED(2000148, "说明书未上传", "请上传说明书"),
    INSTRUCTION_ENGLISH_CONTENT_INVALID(2000154, "说明书英文内容不合格，请重新上传", "说明书英文内容不合格，请重新上传"),
    INSTRUCTION_LANGUAGE_MISSING(2000159, "说明书缺少必要语言", "说明书缺少必要语言"),
    INSTRUCTION_LANGUAGE_ERROR(2000161, "说明书语言错误", "说明书语言入参不合法，请检查"),

    // 产地相关错误
    ORIGIN_REQUIRED(2000146, "产地必填", "请补充产地"),
    ORIGIN_PROOF_FILE_ERROR(6000108, "产地证明文件[x]校验失败，应符合[x]格式，且<=[x]M", "上传的产地证明文件不符合格式要求，请重新上传"),

    // 运费模板相关错误
    SHIPPING_TEMPLATE_NOT_EXIST(2000125, "运费模板不存在", "输入的运费模板id不正确，或者查询运费模板信息失败，请稍后重试，如果不行请联系管理员"),
    SHIPPING_TEMPLATE_VALIDATION_FAILED(2000127, "货品运费模板校验失败", "运费模板运费、区域信息校验失败，请结合具体错误信息解决"),

    // 商品标签相关错误
    PRODUCT_LABEL_NOT_FILLED(2000165, "商品标签未填写，请重新上传", "请填写商品标签"),

    // 重复创建相关错误
    DUPLICATE_PRODUCT_CREATION(2000168, "创建失败。您已创建相同或高度相似的商品，建议您重新编辑商品信息，避免重复创建相同或高度相似的商品", "重新编辑商品信息，避免重复创建相同或高度相似的商品"),
    DUPLICATE_PRODUCT_ATTR(2000171, "创建失败，存在重复的货品属性", "重新编辑商品信息，避免重复创建相同或高度相似的商品"),

    // 合规声明相关错误
    COMPLIANCE_STATEMENT_NOT_SIGNED(2000184, "合规声明未签署", "请签署合规声明"),
    COMPLIANCE_STATEMENT_ERROR(2000199, "合规声明信息错误", "合规声明信息错误，请检查入参"),

    // URL相关错误
    URL_VALIDATION_FAILED(2000158, "URL域名校验不通过或URL包含不合法字符串", "请检查入参位URL的字段"),

    // 备货区域相关错误
    INVENTORY_REGION_NOT_SUPPORTED(2000102, "当前不支持设置备货区域", "当前店铺不支持设置备货区域，如有疑问请咨询管理员"),

    // 定制相关错误
    CATEGORY_NOT_SUPPORT_CUSTOMIZATION(2000188, "当前类目不支持定制", "当前类目不支持定制"),
    JIT_NOT_ALLOW_CUSTOMIZATION(2000193, "jit商品不允许开启定制", "jit商品不允许开启定制"),

    // 发布数量限制
    DAILY_PUBLISH_LIMIT_EXCEEDED(2000197, "已超出今日发品数量限制，若有需要请联系运营", "明日再发品，或者联系管理员加白"),

    // 商品详情装修相关错误
    DECORATION_FLOOR_ID_INVALID(2000301, "商详装修楼层ID不合法", "请检查商详装修楼层ID入参"),
    DECORATION_FLOOR_PRIORITY_INVALID(2000302, "商详装修楼层优先级不合法", "商详装修楼层优先级不能重复，请检查入参"),
    DECORATION_IMAGE_INVALID(2000306, "第x个楼层的商详装修图片不合法", "上传图片不符合格式要求，请重新上传"),
    DECORATION_TEXT_COUNT_INVALID(2000307, "第x个楼层的商详装修文字数量不合法", "文字数量达到上限，具体阈值请咨询管理员"),

    // 视频相关错误
    VIDEO_NOT_TRANS_CODED(2000320, "视频未转码", "请先转码"),
    VIDEO_ASPECT_RATIO_ERROR(6000027, "视频比例仅允许1:1、 4:3、16:9", "视频比例仅允许1:1、 4:3、16:9"),
    VIDEO_SIZE_TOO_LARGE(6000096, "视频大小不能超过xMB", "检查视频大小"),
    VIDEO_DURATION_TOO_LONG(6000097, "视频时长不能超过x秒", "检查视频时长"),

    // 货号相关错误
    PRODUCT_NUMBER_FORMAT_ERROR(6000018, "货号不规范，请使用字母、数字和标点符号维护货号！", "货号不规范，请使用字母、数字和标点符号维护货号！"),
    PRODUCT_NUMBER_VIOLATION(600006460, "输入内容存在违规内容，请重新调整货号后输入", "输入内容存在违规内容，请重新调整货号后输入"),

    // 尺码相关错误
    SIZE_PUBLISH_TYPE_ERROR(6000033, "尺码发布请按正确类型勾选后提交", "尺码发布请按正确类型勾选后提交"),

    // 库存相关错误
    STOCK_VALIDATION_FAILED(6000081, "库存信息校验失败", "请结合具体报错信息解决"),

    // 多语言规格相关错误
    MULTI_LANG_SPEC_NAME_DUPLICATE(7000035, "多语言规格名称重复，x：规格id：x 翻译重复，请联系运营修改翻译内容", "请联系运营修改翻译内容"),

    // 站点售卖相关错误
    EU_SELLING_REQUIREMENT(6000135, "泛欧售卖需包含所有欧盟站点", "泛欧售卖需包含所有欧盟站点"),
    NON_EU_SELLING_CONDITION_NOT_MET(6000136, "当前商品不满足非泛欧售卖条件，请提交反馈，或联系对接运营处理", "当前商品不满足非泛欧售卖条件，请提交反馈，或联系对接运营处理"),
    EU_ONLY_SELLING_MODE(6000137, "仅欧盟支持设置站点售卖模式", "仅欧盟支持设置站点售卖模式"),
    UNOPENED_SITE_NOT_SUPPORTED(6000139, "当前商品不支持选择未开站站点：xxx", "移除提示的未开站站点"),
    INVALID_SITE(6000141, "站点不合法：xxx", "移除不合法的站点"),

    // 商品发布失败
    PRODUCT_PUBLISH_FAILED(6000009, "发布商品失败", "请结合具体错误原因解决"),

    // 类目不合法
    INVALID_CATEGORY_PATH(6000011, "所选类目不合法", "类目路径不合法，请检查入参");;
    private final int code;
    private final String vale;
    private final String desc;

    public static TemuErrorCodeEnum from(final int code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("TemuErrorCodeEnum not found by code " + code));
    }
}
