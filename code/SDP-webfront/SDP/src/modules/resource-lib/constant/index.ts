// CUSTOMER :客户（款式）图片
//  DESIGN :设计图片
//  MARK_FRAME :唛架图片
export enum PICTURE_TYPE {
  CUSTOMER = 'CUSTOMER',
  DESIGN = 'DESIGN',
  MARK_FRAME = 'MARK_FRAME',
}

/* 需求任务类型
1-打版订单 2-设计订单 3-加工订单；
1、2属于样衣，3属于生产(大货) */
export enum DESIGN_ORDER_TYPE_ENUM {
  SAMPLE = '1',
  DESIGN = '2',
  PROCE = '3',
}
export const DESIGN_ORDER_TYPE_LIST = [
  { value: DESIGN_ORDER_TYPE_ENUM.SAMPLE, label: '打版订单' },
  { value: DESIGN_ORDER_TYPE_ENUM.DESIGN, label: '设计订单' },
  { value: DESIGN_ORDER_TYPE_ENUM.PROCE, label: '加工订单' },
];

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
  { value: DESIGN_SAMPLE_TYPE_ENUM.PRE, label: '大货' },
  { value: DESIGN_SAMPLE_TYPE_ENUM.NORMAL, label: '正常' },
  { value: DESIGN_SAMPLE_TYPE_ENUM.REPLACE, label: '复色' },
  { value: DESIGN_SAMPLE_TYPE_ENUM.SUPPLEMENT, label: '补做' },
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

/* 裁剪方法 */
export enum DESIGN_CUTTING_METHOD_ENUM {
  FABRIC_REVERSE = 'FABRIC_REVERSE', // 10,
  FABRIC_UPSIDE_DOWN = 'FABRIC_UPSIDE_DOWN', // 20
  FABRIC_CROSS_CUT = 'FABRIC_CROSS_CUT', // 30
  POSITIONING_AND_CUTTING = 'POSITIONING_AND_CUTTING', // 40
}

export const DESIGN_CUTTING_METHOD_LIST = [
  { value: DESIGN_CUTTING_METHOD_ENUM.FABRIC_REVERSE, label: '面料反面正做' },
  { value: DESIGN_CUTTING_METHOD_ENUM.FABRIC_UPSIDE_DOWN, label: '面料倒裁' },
  { value: DESIGN_CUTTING_METHOD_ENUM.FABRIC_CROSS_CUT, label: '面料横裁' },
  { value: DESIGN_CUTTING_METHOD_ENUM.POSITIONING_AND_CUTTING, label: '定位裁剪' },
];

/* 物料类型: 1:面料  2:辅料 3:特殊辅料 */
export enum DESIGN_MATERIAL_TYPE_ENUM {
  FABRIC = '1',
  ASSIST = '2',
  SPECIAL_ASSIST = '3',
}
export const DESIGN_MATERIAL_TYPE_LIST = [
  { value: DESIGN_MATERIAL_TYPE_ENUM.FABRIC, label: '面料' },
  { value: DESIGN_MATERIAL_TYPE_ENUM.ASSIST, label: '辅料' },
  { value: DESIGN_MATERIAL_TYPE_ENUM.SPECIAL_ASSIST, label: '特殊辅料' },

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

/**
 * 客户授信状态
 */
export enum CUSTOMER_CREDIGRANTING_STATE_ENUM {
  // 未申请
  WAIT_APPLY = '0',
  // 待审核
  WAIT_AUDIT = '1',
  // 待授信
  WAIT_CREDIT = '2',
  // 启用，已授信
  CAN_USE = '3',
  // 停用，已授信
  DIS_USE = '4',
}
