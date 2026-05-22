/**
 * 自定义处理字典key
 * @description 建议以custom_开头，避免和系统字典key冲突
 */
export enum CUSTOM_DICTIONARY_KEY {
  /** 平台店铺列表 */
  SHOP_LIST = 'shop_list',
  /** 版型 */
  CLOTHING_MODEL = 'clothing_model',
  /** temu平台品类 */
  TEMU_CATEGORY = 'custom_temu_category',
}

// 字典key
export enum DICTIONARY_KEY {
  /** 变成程度 */
  AIGC_VARIATION_INTENSITY = 'aigc_variation_intensity',
  /**
   * 问题反馈
   */
  RUNNING_DIAGRAM_PROBLEM = 'running_diagram_problem',
  /**
   * 背景
   */
  BACKGROUNDTYPE = 'backgroundType',
  /**
   * 模特体型
   */
  MODEL_BODYTYPE = 'modelBodytype',
  /** 背景 */
  BACKRROUNDTYPE = 'backgroundType',
  /** 季节 */
  PLM_REFERENCE_SEASON = 'plm_reference_season',
  /** 季节 */
  FG_SEAS = 'fg_season',
  /** 品质等级 */
  PLM_QUALITY_LEVEL = 'plm_quality_level',
  /** 裁剪方法 */
  BOM_CUTTING_METHOD = 'plm_cutting_method',
  /** 车缝车种 */
  PLM_SEWING_TYPE = 'plm_sewing_type',
  /** 内部品类 */
  PIMS_CATEGORY = 'clothing_category',
  /** 版房品类 */
  PROTOTYPE_CATEGORY = 'prototype_category',
  /** PLM尺码组 */
  PLM_STANDARY_SIZE = 'plm_standard_size',
  /** 一级为供给方式 二级为商品类型 */
  PLM_STYLE_SOURCE = 'supply_mode',
  /** 国家站点 */
  NATIONAL = 'national',
  /** SKC取消原因 */
  SKC_CANCEL_REASON = 'skc_cancel_reason',
  /** 灵感淘汰原因 */
  INSPIRATION_CANCEL_REASON = 'inspiration_cancel_reason',
  /** 织造方式 */
  APS_CATEGORY_TYPE = 'aps_category_type',
  /** 波段 */
  PLM_CLOTHING_BAND = 'plm_clothing_band',
  /** 款式风格 */
  PLM_CLOTHING_STYLE = 'jv-style',
  /** 弹性 */
  PLM_ELASTIC_REQUIREMENT = 'plm_elastic_requirement',
  /** 返修原因 */
  PLM_REPAIR_REASON = 'plm_repair_reason',
  /** 审版-复版原因 */
  PLM_SAMPLE_REDO_REASON = 'plm_sample_redo_reason',
  /** 个数要求单位 */
  PLM_UMBER_REQUIREMENT_UNIT = 'plm_umber_requirement_unit',
  /** 工序环节 */
  PLM_PROCESS_STEP = 'plm_process_step',
  /** 用料部位（plm） */
  PLM_PURCHASE_YLBW = 'plm_purchase_ylbw',
  /** 纸样改动 */
  // PATTERN_CHANGE = 'pattern_change',
  /** 采购申请原因 */
  PURCHASE_REQUEST_REASON = 'purchase_request_reason',
  /** 单位 */
  UNIT = 'unit',
  /** 需求类型 */
  PLM_DEMAND_TYPE = 'plm_demand_type',
  /** 面料序号 */
  PIMS_FABRIC_SERIAL_NUMBER = 'pims_fabric_serial_number',
  /** 里料序号 */
  PIMS_INSIDE_FABRIC_SERIAL_NUMBER = 'pims_inside_fabric_serial_number',
  /** 辅料序号 */
  PIMS_ACCESSORY_SERIAL_NUMBER = 'pims_accessory_serial_number',
  /** 特殊辅料序号 */
  PLM_SPECIAL_ACCESSORIES_NUMBER = 'plm_special_accessories_number',
  /** 物料采购跟进取消原因 */
  PLM_CANCEL_PURCHASE_REASON = 'plm_cancel_purchase_reason',
  /** 工艺次序 */
  PLM_PROCESS_SEQUENCE = 'plm_process_sequence',
  /** 合身 */
  FIT = 'fit',
  /** 颜色库 */
  CLOTHING_COLOR = 'clothing_color',
  /** 货盘类型 */
  TRAY_TYPE = 'tray_type',
  /** 工艺单位 */
  CRAFT_UNIT = 'craft_unit',
  /** 异常类型 */
  PLM_SAMPLE_EXCEPTION_TYPE = 'plm_sample_exception_type',
  /** 号型 */
  PLM_SPECIFICATION = 'plm_specification',
  /** 小单倍率 */
  SMALL_ORDER_RATIO = 'small_order_ratio',
  /** 风格 */
  JV_STYLE = 'jv-style',
  /** 印花 */
  FD_PRINTING = 'fd-printing',
  /** 供给方式 */
  SUPPLY_MODE = 'supply_mode',
  /** lazada上架站点 */
  LAZADA_NATIONAL = 'lazada_national',
  /** 波次 */
  WAVEBATCH = 'plm_clothing_band',
  /** 企划来源 */
  PLANNINGSOURCE = 'planning_source',
  /** 品类 */
  CATEGORY = 'clothing_category',
  /** 货盘类型 */
  CARGOTARY = 'tray_type',
  /** 跑图反馈 */
  RUNNING_DIAGRAM = 'running_diagram_problem',
  /** 模特标签 */
  FM_MODEL_LABEL = 'FM_model_label',
  /** 场景 */
  JV_SCENE = 'JV_scene',
  /** 场景 */
  SCENE = 'scenes',
  /** 现货类型 */
  STOCKGOODS_TYPE = 'stockgoods_type',
  /** 商品主题 */
  PRODUCT_THEME = 'Product Theme',
  /** 灵感源品牌 */
  INSPIRATION_BRAND = 'inspiration_brand',
  /** 商品类型 */
  PRODUCT_TYPE = 'product_type',
  /** 企划来源 */
  PLANNING_SOURCE = 'planning_source',
  /** 灵感图来源 */
  INSPIRATION_IMAGE_SOURCE = 'Inspiration_Image_Source',
  MATERIAL_SOURCE = 'material_source',
  /** 品类 */
  CLOTHING_CATEGORY = 'clothing_category',
  /** 数码描稿类型 */
  DIGITAL_PAINTING_TYPE = 'digital_painting_type',
  /** FG模型版本 */
  FG_MODEL_VERSION = 'FG_modelVersion',
  /** 参考权重 */
  FG_REF_WEIGHT = 'FG_refWeight',
  /** 风格 */
  STYLE = 'STYLE',
  /** 年龄 */
  AGE = 'AGE',
  /** 爆款 */
  POPULAR = 'POPULAR',
  /** 任务数量 */
  FGOUTPUTNUM = 'FGoutputNum',
  /**
   * 模特图库
   */
  MODEL_GALLERY = 'fm_models',
  /**
   * 分辨率
   */
  NEST_FGLORASIZE = 'FGloraSize',
  /**
   * 服装类型
   */
  FGCLOTHTYPE = 'FGclothType',
  /**
   * 任务来源
   */
  AIFUNCTIONCALL_CONFIGURATION = 'AI_functionCall_configuration',
  /**
   * 场景
   */
  SCENES = 'scenes',
  /**
   * 印花类型
   */
  GD_PRINTING = 'fd-printing',
  /**
   * sku分类
   */
  SKU_CLASSIFICATION = 'SKU_CLASSIFICATION',
  /**
   * 款式标签
   */
  PRODUCT_TAG = 'product_tag',
  /**
   * 款式级别
   */
  PRODUCT_LEVEL = 'product_level',
  /**
   * 风格
   */
  PRODUCT_STYLE = 'product_style',
  /**
   * 节日
   */
  FESTIVAL = 'festival',
  /**
   * 视觉形式
   */
  VISUAL_STYLE = 'visual_style',
  /**
   * 成分
   */
  PLM_ELEMENT = 'plm_element',
  /**
   * 姿势裂变生图分辨率
   */
  POSECHANGE_RATIO = 'poseChange_ratio',
  /** 店铺类型 */
  SHOP_TYPE = 'shop_type',
  /** 店铺标签 */
  SHOP_LABEL = 'shop_label',
  /** 平台 */
  PLATFORM = 'platform',
  /** 经营站点 */
  TEMU_SITE = 'temu_site',
  /** 承诺发货时效 */
  TEMU_TIME_FRAME = 'temu_timeframe',
  /** temu销售属性默认值 */
  TEMU_DEFAULTVALUE = 'temu_defaultValue',
  /**
   * 风格化衍生参考强度
   */
  FG_LORA_FOLLOW = 'FG_lora_follow',
  /**
   * 款式来源
   */
  STYLE_SOURCE = 'style_source',
  /** 关联主体 */
  RELATED_SUBJECT = 'company_id',
  /** 项目类型 */
  PLM_PRODUCTTYPE = 'plm_productType',
  /** 款式类型 */
  STYLETYPE = 'styleType',
  /** Y2同款判定配置 */
  STYLSCORERANGE = 'style_scoreRange',
}

// 字典启用禁用
export enum DICTIONARY_STATUS_ENUM {
  /** 启用 */
  ENABLE = '1',
  /** 禁用 */
  DISABLE = '0',
}
