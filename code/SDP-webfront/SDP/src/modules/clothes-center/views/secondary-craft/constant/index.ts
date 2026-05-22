/** 当前环节 */
export enum CURRENT_NODE_ENUM {
  /**
   * 补充工艺
   */
  SUPPLEMENT_CRAFT = 'SUPPLEMENT_CRAFT',
  /**
   * 待分配
   */
  TO_WAIT_ASSIGNED = 'TO_WAIT_ASSIGNED',
  /**
   * 待到料
   */
  TO_WAIT_MATERIALS = 'TO_WAIT_MATERIALS',
  /**
   * 处理中
   */
  BEING_PROCESSING = 'BEING_PROCESSING',
  /**
   * 已处理
   */
  BEING_PROCESSED = 'BEING_PROCESSED',
  /**
   * 待审核
   */
  TO_WAIT_CHECK = 'TO_WAIT_CHECK',
  /**
   * 已关闭
   */
  BEING_CLOSED = 'BEING_CLOSED',
  /**
   * UNKNOWN
   */
  UNKNOWN = 'UNKNOWN'
}

export const CURRENT_NODE_LIST = [
  { value: CURRENT_NODE_ENUM.SUPPLEMENT_CRAFT, label: '补充工艺' },
  { value: CURRENT_NODE_ENUM.TO_WAIT_ASSIGNED, label: '待分配' },
  { value: CURRENT_NODE_ENUM.TO_WAIT_MATERIALS, label: '待到料' },
  { value: CURRENT_NODE_ENUM.BEING_PROCESSING, label: '处理中' },
  { value: CURRENT_NODE_ENUM.BEING_PROCESSED, label: '已处理' },
  { value: CURRENT_NODE_ENUM.TO_WAIT_CHECK, label: '待审核' },
  { value: CURRENT_NODE_ENUM.BEING_CLOSED, label: '已关闭' },
];

export const CANCEL_NODE_LIST = [
  { value: CURRENT_NODE_ENUM.TO_WAIT_ASSIGNED, label: '待分配' },
  { value: CURRENT_NODE_ENUM.TO_WAIT_MATERIALS, label: '待到料' },
  { value: CURRENT_NODE_ENUM.BEING_PROCESSING, label: '处理中' },
  { value: CURRENT_NODE_ENUM.TO_WAIT_CHECK, label: '待审核' },
];

/** 承接方式 */
export enum UNDERTAKE_WAY_ENUM {
  /** 工艺组承接 */
  CRAFT_GROUP = 'CRAFT_GROUP',
  /** 客户承接 */
  CUSTOMER = 'CUSTOMER',
}
export const UNDERTAKE_WAY_LIST = [
  { value: UNDERTAKE_WAY_ENUM.CRAFT_GROUP, label: '工艺组承接' },
  { value: UNDERTAKE_WAY_ENUM.CUSTOMER, label: '客户承接' },
];

/** 打版类型 */
export enum SAMPLE_TYPE_ENUM {
  /** 大货打版 */
  LARGE_CARGO_MAKING = '1',
  /** 正常打版 */
  NORMAL_PATTERN_MAKING = '2',
  /** 复色打版 */
  COMPOUND_COLORS_MAKING = '3',
  /** 补做打版 */
  MORE_PATTERN_MAKING = '4',
  /** 样衣放码 */
  SAMPLE_CODE = '5',
}
export const SAMPLE_TYPE_LIST = [
  { value: SAMPLE_TYPE_ENUM.NORMAL_PATTERN_MAKING, label: '正常打版' },
  { value: SAMPLE_TYPE_ENUM.COMPOUND_COLORS_MAKING, label: '复色打版' },
  { value: SAMPLE_TYPE_ENUM.MORE_PATTERN_MAKING, label: '补做打版' },
  { value: SAMPLE_TYPE_ENUM.LARGE_CARGO_MAKING, label: '大货打版' },
];

/** 暂定城市：广州、杭州 */
export enum REGION_ENUM {
  GUANGZHOU = '4',
  HANGZHOU = '8',
}
export const REGION_LIST = [
  { value: REGION_ENUM.GUANGZHOU, label: '广州' },
  { value: REGION_ENUM.HANGZHOU, label: '杭州' },
];

/* 二次环节 */
export enum CRAFTS_REQUIRE_ENUM {
  BEFORE = '100',
  AFTER = '110',
}
export const CRAFTS_REQUIRE_LIST = [
  { value: CRAFTS_REQUIRE_ENUM.BEFORE, label: '裁前' },
  { value: CRAFTS_REQUIRE_ENUM.AFTER, label: '裁后' },
];

/** 工艺补充 - 环节状态 已补充、待补充 */
export enum CRAFT_SUPPLEMENT_ENUM {
  /** 待补充 */
  TO_BE_SUPPLEMENT = '0',
  /** 已补充 */
  HAD_SUPPLEMENT = '1',
}
export const CRAFT_SUPPLEMENT_LIST = [
  { value: CRAFT_SUPPLEMENT_ENUM.TO_BE_SUPPLEMENT, label: '待补充' },
  { value: CRAFT_SUPPLEMENT_ENUM.HAD_SUPPLEMENT, label: '已补充' },
];

/**
 * 一级需求类型
 * FABRIC - 面料
 * CRAFTS - 工艺
 * ACCESSORIES - 辅料
 */
export enum DEMAND_FIRST_TYPE {
  /**
   * 面料
   */
  FABRIC = 'FABRIC',
  /**
   * 工艺
   */
  CRAFTS = 'CRAFTS',
  /**
   * 辅料
   */
  ACCESSORIES = 'ACCESSORIES',
  /**
   * 特殊辅料
   */
  SPECIAL_ACCESSORIES = 'SPECIAL_ACCESSORIES',
}
