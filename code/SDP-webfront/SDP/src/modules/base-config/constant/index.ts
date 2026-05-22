export enum OPEN_STATUS {
  OPEN = '启用',
  CLOSE = '停用',
}

// 交期类型
/** 状态 */
export enum DELIVERY_STATUS_ENUM {
  /** 全部 */
  ALL = 'ALL',
  /** 启用 */
  OPEN = 'OPEN',
  /** 禁用 */
  CLOSE = 'CLOSE',

}

export const DELIVERY_STATUS_LIST = [
  { value: DELIVERY_STATUS_ENUM.ALL, label: '全部' },
  { value: DELIVERY_STATUS_ENUM.OPEN, label: '启用' },
  { value: DELIVERY_STATUS_ENUM.CLOSE, label: '停用' },
];

// 版房类型
/** 状态 */
export enum ROOM_TYPE_ENUM {
  /** 合作 */
  COOP = '1',
  /** 共享 */
  SHARE = '2',
  /** 兼职 */
  PARTTIME = '3',

}
// 版房外发种类 ,1合作版房、2共享版房、3兼职版房
export const ROOM_TYPE_LIST = [
  {
    value: ROOM_TYPE_ENUM.COOP,
    label: '合作版房',
  },
  {
    value: ROOM_TYPE_ENUM.SHARE,
    label: '共享版房',
  },
  {
    value: ROOM_TYPE_ENUM.PARTTIME,
    label: '兼职人员',
  },
];

/** 状态 */
export enum STATUS_ENUM {
  /** 全部 */
  ALL = 'ALL',
  /** 启用 */
  OPEN = 'OPEN',
  /** 禁用 */
  CLOSE = 'CLOSE',

}

export const STATUS_LIST = [
  { value: STATUS_ENUM.ALL, label: '全部' },
  { value: STATUS_ENUM.OPEN, label: '启用' },
  { value: STATUS_ENUM.CLOSE, label: '停用' },
];

export enum SIZE_DIMESSION {
  X1 = 'X1',
  X2 = 'X2',
}
/**
 * 尺寸维度
 */
export enum SIZE_DIMENSION_ENUM {
  // X0 = '0',
  X1 = '1',
  X2 = '2',
}
export const SIZE_DIMENSION_LIST = [
  // { value: SIZE_DIMENSION.X0, label: 'X0' },
  { value: SIZE_DIMENSION_ENUM.X1, label: 'X1' },
  { value: SIZE_DIMENSION_ENUM.X2, label: 'X2' },
];
/**
 * 计费规则（1-计费，0-不计费）
 */
export enum PAY_COST_RULE {
  CHARGING = '1',
  UNCHARGING = '0',
}

export const PAY_COST_RULE_LIST = [
  { value: PAY_COST_RULE.CHARGING, label: '计费' },
  { value: PAY_COST_RULE.UNCHARGING, label: '不计费' },
];

/**
 * 收费规则（1-计费，0-不计费）
 */
export enum RECEIVE_COST_RULE {
  CHARGING = '1',
  UNCHARGING = '0',
}

export const RECEIVE_COST_RULE_LIST = [
  { value: RECEIVE_COST_RULE.CHARGING, label: '收费' },
  { value: RECEIVE_COST_RULE.UNCHARGING, label: '不收费' },
];

/**
 * 返修计费影响（1-仅纸样，2-仅车版，3-纸样+车版）
 */
export enum REPAIR_CHARGE_AFFECT {
  /** 仅纸样 */
  PATTERN = '1',
  /** 仅车版 */
  SEWING = '2',
  /** 3D */
  THREE_DIMENSION = '3',
}

export const REPAIR_CHARGE_AFFECT_LIST = [
  { value: REPAIR_CHARGE_AFFECT.PATTERN, label: '纸样' },
  { value: REPAIR_CHARGE_AFFECT.SEWING, label: '车版' },
  { value: REPAIR_CHARGE_AFFECT.THREE_DIMENSION, label: '3D' },
];

// 根据返修计费影响，设置可以选择的返修类型
export const REPAIR_TYPES_BY_AFFCT = {
  [REPAIR_CHARGE_AFFECT.PATTERN]: [REPAIR_CHARGE_AFFECT.PATTERN],
  [REPAIR_CHARGE_AFFECT.SEWING]: [REPAIR_CHARGE_AFFECT.SEWING],
  [REPAIR_CHARGE_AFFECT.THREE_DIMENSION]: [
    REPAIR_CHARGE_AFFECT.THREE_DIMENSION
  ],

};
/**
 * 状态 0 1
 */
export enum ENABLE_STATE {
  OPEN = '1',
  CLOSE = '0',
}
export const ENABLE_STATE_LIST = [
  { value: ENABLE_STATE.OPEN, label: '启用' },
  { value: ENABLE_STATE.CLOSE, label: '停用' },
];

/** 工序：车缝、裁剪、后道、专机/手工 */
export enum PROCESS_ENUM {
  /** 车缝 */
  CAR = '02',
  /** 裁剪 */
  CROP = '01',
  /** 后道 */
  AFTER = '04',
  /** 专机/手工 */
  MANUAL = '03',
}
/** 工序：车缝、裁剪、后道、专机/手工 */
export const PROCESS_LIST = [
  { value: PROCESS_ENUM.CROP, label: '裁剪' },
  { value: PROCESS_ENUM.CAR, label: '裁剪' },
  { value: PROCESS_ENUM.MANUAL, label: '专机/手工' },
  { value: PROCESS_ENUM.AFTER, label: '后道' },
];

/**
 *  基础资料，外发价格库，操作日志
 *
 * 业务类型:
 * CLOTHES_PARTS- 尺寸部位
 *
 * CLOTHES_SIZE_HOPPING_RULES-尺码跳码规则
 *
 * EXTERNAL_FEE-外发版费倍率
 *
 * EXTERNAL_TIME_PRICE-外发工时价格
 *
 * DELIVERY_TYPE-交期类型
 *
 * TECHNIQUE_GROUP-技术组别
 *
 * RESPONSIBLE_DEPARTMENT-异常责任部门
 *
 * EXTERNAL_CATEGORY_PRICE-外发价格库
 *
 * REWORK_RESPONSIBILITY-返修复版责任方
 *
 * SIZE_TEMPLATE-尺寸表模板
 *
 * CANCEL_REASON-取消原因
 *
 * PLATFORM_PAYMENT_ACCOUNT-平台支付账户设置
 */
export enum BUZ_TYPE {
  CLOTHES_PARTS = 'CLOTHES_PARTS',
  CLOTHES_SIZE_HOPPING_RULES = 'CLOTHES_SIZE_HOPPING_RULES',
  EXTERNAL_FEE = 'EXTERNAL_FEE',
  EXTERNAL_TIME_PRICE = 'EXTERNAL_TIME_PRICE',
  DELIVERY_TYPE = 'DELIVERY_TYPE',
  TECHNIQUE_GROUP = 'TECHNIQUE_GROUP',
  RESPONSIBLE_DEPARTMENT = 'RESPONSIBLE_DEPARTMENT',
  EXTERNAL_CATEGORY_PRICE = 'EXTERNAL_CATEGORY_PRICE',
  REWORK_RESPONSIBILITY = 'REWORK_RESPONSIBILITY',
  SIZE_TEMPLATE = 'SIZE_TEMPLATE',
  CANCEL_REASON = 'CANCEL_REASON',
  PLATFORM_PAYMENT_ACCOUNT = 'PLATFORM_PAYMENT_ACCOUNT',
  CATEGORY_TAG = 'CATEGORY_TAG',
  SEWING_COMPONENT_TEMPLATE = 'SEWING_COMPONENT_TEMPLATE',
  PROCESS_STYLE_TEMPLATE = 'PROCESS_STYLE_TEMPLATE',
}

/**
 * 默认的分钟工资 = 0.35
 */
export const DEFAULT_MINUTE_WAGE = '0.35';
