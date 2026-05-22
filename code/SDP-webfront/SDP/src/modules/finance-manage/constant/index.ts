import { YES_NO_NUMBER_ENUM } from '@/constant';

// 付款状态
export const PAYMENT_STATUS_LIST = [
  { value: YES_NO_NUMBER_ENUM.NO, label: '待付款', color: 'primary' },
  { value: YES_NO_NUMBER_ENUM.YES, label: '已付款', color: 'success' },
];

// 对账状态
export const RECONCILED_STATUS_LIST = [
  { value: '', label: '全部', countKey: 'totalCount' },
  { value: YES_NO_NUMBER_ENUM.NO, label: '待对账', countKey: 'pendingCount', color: 'primary' },
  { value: YES_NO_NUMBER_ENUM.YES, label: '已对账', countKey: 'reconciledCount', color: 'success' },
];

export enum TOTALBILL_STATUS_ENUM {
  PENDING_VERIFICATION = 'PENDING_VERIFICATION', // 待核实
  ABNORMAL = 'ABNORMAL', // 异常
  ABNORMAL_CONFIRMING = 'ABNORMAL_CONFIRMING', // 异常确认中
  VERIFIED = 'VERIFIED', // 已核实
}

// 账单状态
export const TOTALBILL_STATUS_LIST = [
  { value: TOTALBILL_STATUS_ENUM.PENDING_VERIFICATION, label: '待核实', color: 'primary' },
  { value: TOTALBILL_STATUS_ENUM.ABNORMAL, label: '异常', color: 'danger' },
  { value: TOTALBILL_STATUS_ENUM.ABNORMAL_CONFIRMING, label: '异常确认中', color: 'warning' },
  { value: TOTALBILL_STATUS_ENUM.VERIFIED, label: '已核实', color: 'success' },
];

export enum BILLTYPE_ENUM {
  FABRIC_CUTTING_ORDER = 'FABRIC_CUTTING_ORDER', // 面料剪版
  THREE_DIMENSIONAL_CUTTING_ORDER = 'THREE_DIMENSIONAL_CUTTING_ORDER', // 3D剪版
  ACCESSORIES_ORDER = 'ACCESSORIES_ORDER', // 辅料开发
  DIGITAL_SKETCH_ORDER = 'DIGITAL_SKETCH_ORDER', // 数码描稿
  PLATFORM_SUMMARY = 'PLATFORM_SUMMARY' // 总计
}

// 账单类型
export const BILLTYPE_LIST = [
  { value: BILLTYPE_ENUM.FABRIC_CUTTING_ORDER, label: '面料剪版' },
  { value: BILLTYPE_ENUM.THREE_DIMENSIONAL_CUTTING_ORDER, label: '3D剪版' },
  { value: BILLTYPE_ENUM.ACCESSORIES_ORDER, label: '辅料开发' },
  { value: BILLTYPE_ENUM.DIGITAL_SKETCH_ORDER, label: '数码描稿' },
];

// 账单类型
export const ALL_BILLTYPE_LIST = [
  { value: BILLTYPE_ENUM.FABRIC_CUTTING_ORDER, label: '面料剪版' },
  { value: BILLTYPE_ENUM.THREE_DIMENSIONAL_CUTTING_ORDER, label: '3D剪版' },
  { value: BILLTYPE_ENUM.ACCESSORIES_ORDER, label: '辅料开发' },
  { value: BILLTYPE_ENUM.DIGITAL_SKETCH_ORDER, label: '数码描稿' },
  { value: BILLTYPE_ENUM.PLATFORM_SUMMARY, label: '总计' },
];

export enum CUTTING_TYPE_ENUM {
  NEED = '1', // 外采剪版
  PROMPT = '2', // 齐料仓
  NOT_NEED = '3', // 无需剪版
  LOGO = '4', // 数码印花
  CUSTOMER = '5', // 客户供料
  ONESELF = '6', // 自有余料
  MATERIAL = '7', // 物料仓
}

// 剪版方式
export const CUTTING_TYPE_LIST = [
  { value: CUTTING_TYPE_ENUM.NEED, label: '外采剪版' },
  { value: CUTTING_TYPE_ENUM.PROMPT, label: '齐料仓' },
  { value: CUTTING_TYPE_ENUM.NOT_NEED, label: '无需剪版' },
  { value: CUTTING_TYPE_ENUM.LOGO, label: '数码印花' },
  { value: CUTTING_TYPE_ENUM.CUSTOMER, label: '客户供料' },
  { value: CUTTING_TYPE_ENUM.ONESELF, label: '自有余料' },
  { value: CUTTING_TYPE_ENUM.MATERIAL, label: '物料仓' },
];

export enum ORDER_TYPE_ENUM {
  GENERAL = '0',
  BIG = '1',
  SMALL = '2',
}

// 配版类型
export const ORDER_TYPE_LIST = [
  { value: ORDER_TYPE_ENUM.GENERAL, label: '普通样衣' },
  { value: ORDER_TYPE_ENUM.BIG, label: '大货样衣' },
  { value: ORDER_TYPE_ENUM.SMALL, label: '小单动销' },
];

// 日志业务类型
export enum LOG_BIZ_TYPE_ENUMS {
  // 对账单 1
  RECONCILED_BILL = '1',
}
