/* 打版类型。
1-产前样 2-正常打版 3-复色打版 */
export enum DESIGN_SAMPLE_TYPE_ENUM {
  PRE = '1', // 大货打版
  NORMAL = '2', // 正常打版
  REPLACE = '3', // 复色打版
  SUPPLEMENT = '4', // 补做打版
}
export const DESIGN_SAMPLE_TYPE_LIST = [
  { value: DESIGN_SAMPLE_TYPE_ENUM.PRE, label: '大货打版' },
  { value: DESIGN_SAMPLE_TYPE_ENUM.NORMAL, label: '正常打版' },
  { value: DESIGN_SAMPLE_TYPE_ENUM.REPLACE, label: '复色打版' },
  { value: DESIGN_SAMPLE_TYPE_ENUM.SUPPLEMENT, label: '补做打版' },
];
export const DESIGN_SAMPLE_TYPE_LIGHT_LIST = [
  { value: DESIGN_SAMPLE_TYPE_ENUM.PRE, label: '大货', color: 'primary' },
  { value: DESIGN_SAMPLE_TYPE_ENUM.NORMAL, label: '正常', color: 'danger' },
  { value: DESIGN_SAMPLE_TYPE_ENUM.REPLACE, label: '复色', color: 'warning' },
  { value: DESIGN_SAMPLE_TYPE_ENUM.SUPPLEMENT, label: '补做', color: 'primary' },
];

/* 物料类型: 1:面料  2:辅料 3:特殊辅料 */
export enum DESIGN_MATERIAL_TYPE_ENUM {
  /** 面料 */
  FABRIC = '1',
  /** 辅料 */
  ASSIST = '2',
  /** 特殊辅料 */
  SPECIAL_ASSIST = '3',
}
export const DESIGN_MATERIAL_TYPE_LIST = [
  { value: DESIGN_MATERIAL_TYPE_ENUM.FABRIC, label: '面料' },
  { value: DESIGN_MATERIAL_TYPE_ENUM.ASSIST, label: '辅料' },
];

// 二级类型（面料）
export enum DEMAND_CATEGORY_2_ENUM {
  FLOWER = 'FLOWER',
  PURE = 'PURE',
}
// 二级类型（面料）
export const DEMAND_CATEGORY_2_LIST = [
  { value: DEMAND_CATEGORY_2_ENUM.FLOWER, label: '花型' },
  { value: DEMAND_CATEGORY_2_ENUM.PURE, label: '净色' },
];

/* 采购状态（from 履约-订单状态OrderStateEnum） */
export enum DESIGN_ORDER_STATE_ENUM {
  PENDING_DEAL = 1000,
  BILLING = 1010,
  PENDING_PAYMENT = 1020,
  PENDING_NOTICE_TAKE_DELIVERY = 1029,
  PENDING_TAKE_DELIVERY = 1030,
  PENDING_STORAGE = 1040,
  PENDING_CUTTING = 1041,
  CUTTING = 1042,
  OUT_OF_STOCK = 1043,
  PENDING_DELIVERY = 1050,
  PENDING_SIGN_FOR = 1060,
  SIGN_FOR = 1070,
  CANCEL_PENDING_CONFIRM = 1080,
  REJECT_PENDING_DEAL = 1090,
  COMPLETED = 1100,
  CLOSED = 1110,
  UNKNOWN = 9999,
}
export const DESIGN_ORDER_STATE_LIST = [
  { value: DESIGN_ORDER_STATE_ENUM.PENDING_DEAL, label: '待处理' },
  { value: DESIGN_ORDER_STATE_ENUM.BILLING, label: '待开单' },
  { value: DESIGN_ORDER_STATE_ENUM.PENDING_PAYMENT, label: '待付款' },
  { value: DESIGN_ORDER_STATE_ENUM.PENDING_NOTICE_TAKE_DELIVERY, label: '待通知提货' },
  { value: DESIGN_ORDER_STATE_ENUM.PENDING_TAKE_DELIVERY, label: '待提货' },
  { value: DESIGN_ORDER_STATE_ENUM.PENDING_STORAGE, label: '待入库' },
  { value: DESIGN_ORDER_STATE_ENUM.PENDING_CUTTING, label: '待剪版' },
  { value: DESIGN_ORDER_STATE_ENUM.CUTTING, label: '剪版中' },
  { value: DESIGN_ORDER_STATE_ENUM.OUT_OF_STOCK, label: '出库中' },
  { value: DESIGN_ORDER_STATE_ENUM.PENDING_DELIVERY, label: '待发货' },
  { value: DESIGN_ORDER_STATE_ENUM.PENDING_SIGN_FOR, label: '待签收' },
  { value: DESIGN_ORDER_STATE_ENUM.SIGN_FOR, label: '已签收' },
  { value: DESIGN_ORDER_STATE_ENUM.CANCEL_PENDING_CONFIRM, label: '取消中' },
  { value: DESIGN_ORDER_STATE_ENUM.REJECT_PENDING_DEAL, label: '核销驳回' },
  { value: DESIGN_ORDER_STATE_ENUM.COMPLETED, label: '已完成' },
  { value: DESIGN_ORDER_STATE_ENUM.CLOSED, label: '已关闭' },
  { value: DESIGN_ORDER_STATE_ENUM.UNKNOWN, label: '未知状态' },
];

/* bom单状态 */
export enum BOM_ORDER_STATUS_ENUMS {
  /** 待提交 */
  WAIT_SUBMIT = 'WAIT_SUBMIT',
  /** 已提交 */
  SUBMITTED = 'SUBMITTED',
  /** 待核算 */
  WAIT_CALCULATED = 'WAIT_CALCULATED',
  /** 已核算 */
  CALCULATED = 'CALCULATED',
  /** 已作废 */
  CLOSED = 'CLOSED',
  /** 暂存 */
  IS_TRANSIENT = 'IS_TRANSIENT',
}
export const BOM_ORDER_STATUS_LIST = [
  { value: BOM_ORDER_STATUS_ENUMS.WAIT_SUBMIT, label: '待提交', color: 'primary' },
  { value: BOM_ORDER_STATUS_ENUMS.SUBMITTED, label: '已提交', color: 'success' },
  { value: BOM_ORDER_STATUS_ENUMS.WAIT_CALCULATED, label: '待核算', color: 'primary' },
  { value: BOM_ORDER_STATUS_ENUMS.CALCULATED, label: '已核算', color: 'warning' },
  { value: BOM_ORDER_STATUS_ENUMS.CLOSED, label: '已取消', color: 'danger' },
];

export const BOM_ORDER_TAB_STATUS_LIST = [
  { value: '', label: '全部' } as const, // 特殊处理
  { value: BOM_ORDER_STATUS_ENUMS.WAIT_SUBMIT, label: '待提交' },
  { value: BOM_ORDER_STATUS_ENUMS.SUBMITTED, label: '已提交' },
  { value: BOM_ORDER_STATUS_ENUMS.CALCULATED, label: '已核算' },
  { value: BOM_ORDER_STATUS_ENUMS.CLOSED, label: '已取消' },
  // { value: BOM_ORDER_STATUS_ENUMS.IS_TRANSIENT, label: '暂存' },
];

/* 面料剪版方式 */
export enum ORDER_CUTTING_WAY_ENUM {
  CUTTING = 1,
  SPOT_GOODS = 2,
  SURPLUS = 3,
  DIGITAL_PRINTING = 4,
  CUSTOMER_FEED = 5,
  REMAINING = 6,
  UNKNOWN = 9999,
}

export const ORDER_CUTTING_WAY_LIST = [
  { value: ORDER_CUTTING_WAY_ENUM.CUTTING, label: '外采剪版' },
  { value: ORDER_CUTTING_WAY_ENUM.SPOT_GOODS, label: '齐料仓' },
  { value: ORDER_CUTTING_WAY_ENUM.DIGITAL_PRINTING, label: '数码印花' },
  { value: ORDER_CUTTING_WAY_ENUM.CUSTOMER_FEED, label: '客户供料' },
  { value: ORDER_CUTTING_WAY_ENUM.REMAINING, label: '自有余料' },
];

/* 二次环节 */
export enum CRAFTS_REQUIRE_ENUM {
  /** 裁前 */
  BEFORE = '100',
  /** 裁后 */
  AFTER = '110',
}

export const CRAFTS_REQUIRE_LIST = [
  { value: CRAFTS_REQUIRE_ENUM.BEFORE, label: '裁前' },
  { value: CRAFTS_REQUIRE_ENUM.AFTER, label: '裁后' },
];

// 工艺承接方式
export enum SAMPLE_DEMAND_CRAFT_UNDERTAKE_WAY_ENUM {
  CRAFT_GROUP = 'CRAFT_GROUP',
  CUSTOMER = 'CUSTOMER',
}
export const SAMPLE_DEMAND_CRAFT_UNDERTAKE_WAY_LIST = [
  { value: SAMPLE_DEMAND_CRAFT_UNDERTAKE_WAY_ENUM.CRAFT_GROUP, label: '工艺组承接' },
  { value: SAMPLE_DEMAND_CRAFT_UNDERTAKE_WAY_ENUM.CUSTOMER, label: '客户承接' },
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
}
export const SAMPLE_TYPE_LIST = [
  { value: SAMPLE_TYPE_ENUM.LARGE_CARGO_MAKING, label: '大货打版' },
  { value: SAMPLE_TYPE_ENUM.NORMAL_PATTERN_MAKING, label: '正常打版' },
  { value: SAMPLE_TYPE_ENUM.COMPOUND_COLORS_MAKING, label: '复色打版' },
  { value: SAMPLE_TYPE_ENUM.MORE_PATTERN_MAKING, label: '补做打版' },
];

export enum CRAFT_DEMAND_STATE_ENUM {
  SUBMIT = '100',
  CLOSED = '190',
  UNKNOWN = '9999',
}

/* 寄送样衣状态 WAIT_SEND 待寄送 SENT 已寄送 */
export enum DESIGN_SEND_STATE_ENUM {
  /** 待寄送 */
  WAIT_SEND = 'WAIT_SEND',
  /** 已寄送 */
  SENT = 'SENT',
}
export const DESIGN_SEND_STATE_LIST = [
  { value: DESIGN_SEND_STATE_ENUM.WAIT_SEND, label: '待寄送' },
  { value: DESIGN_SEND_STATE_ENUM.SENT, label: '已寄送' },
];

/* 客户审版 0 待审版 1 已审版 */
export enum DESIGN_CUSTOMER_AUDIT_STATE_ENUM {
  /** 待审版 */
  WAIT_AUDIT = '0',
  /** 已审版 */
  HAD_AUDIT = '1',
}
export const DESIGN_CUSTOMER_AUDIT_STATE_LIST = [
  { value: DESIGN_CUSTOMER_AUDIT_STATE_ENUM.WAIT_AUDIT, label: '待审版' },
  { value: DESIGN_CUSTOMER_AUDIT_STATE_ENUM.HAD_AUDIT, label: '已审版' },
];

/* 审版结果: 0,不通过; 1,通过; 2,返修;  3,退回审版 */
export enum DESIGN_CLOTHES_AUDIT_RES_ENUM {
  /** 不通过 */
  NO = '0',
  /** 不通过 */
  YES = '1',
  /* 返修 */
  BACK = '2',
  /* 退回审版 */
  REPAIR = '3',
}
export const DESIGN_CLOTHES_AUDIT_RES_LIST = [
  { value: DESIGN_CLOTHES_AUDIT_RES_ENUM.NO, label: '不通过' },
  { value: DESIGN_CLOTHES_AUDIT_RES_ENUM.YES, label: '通过' },
  // { value: DESIGN_CLOTHES_AUDIT_RES_ENUM.BACK, label: '返修' },
  { value: DESIGN_CLOTHES_AUDIT_RES_ENUM.REPAIR, label: '退回审版' },
];

export enum CHECK_PRICE_STATE_ENUM {
  /** 未核价 */
  NOT_CHECK = '0',
  /** 核价中 */
  CHECKING = '1',
  /** 已核价 */
  ALREADY_CHECK = '2',
}

export const CHECK_PRICE_STATE_ENUM_LIST = [
  { value: CHECK_PRICE_STATE_ENUM.NOT_CHECK, label: '未核价' },
  { value: CHECK_PRICE_STATE_ENUM.CHECKING, label: '核价中' },
  { value: CHECK_PRICE_STATE_ENUM.ALREADY_CHECK, label: '已核价' },
];

// 款来源: 110-CRM改款需求; 120-设计改款需求; 130-自建款; 140-买手款;
export enum SOURCE_TYPE_ENUM {
  CRM_CHANGE = '110', // 110-CRM改款需求
  DESIGN_CHANGE = '120', // 120-设计改款需求
  SELF_BUILD = '130', // 130-自建款
  BUYER = '140',
}

export enum IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM {
  NONE = '0',
  MATCH_COLOR = '1',
  PACK_MATERIAL = '2',
}

export const IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM_LIST = [
  { label: '无', value: IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM.NONE },
  { label: '对色', value: IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM.MATCH_COLOR },
  { label: '包扣', value: IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM.PACK_MATERIAL },
];
export const IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM_LIST2 = [
  { label: '无需对色/包扣', value: IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM.NONE },
  { label: '对色', value: IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM.MATCH_COLOR },
  { label: '包扣', value: IS_MATCH_COLOR_OR_PACK_MATERIAL_ENUM.PACK_MATERIAL },
];
export enum DEMAND_STATE_ENUM {
  INITED = '0', // 初始化
  SUBMITED = '100', // 已提交
  CLOSED = '120', // 履约关闭（已关闭）
  DELETED = '190', // 已删除
}
