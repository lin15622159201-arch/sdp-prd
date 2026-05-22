// 分单状态
export enum DISPATCH_STATUS_ENUM {
  /** 待分单 */
  WAIT = '2',
  /** 已分单 */
  DONE = '0',
}

export const DISPATCH_STATUS_LIST = [
  { value: DISPATCH_STATUS_ENUM.WAIT, label: '待分单' },
  { value: DISPATCH_STATUS_ENUM.DONE, label: '已分单' },
];

/**
 * 资料录入状态-推款
 */
export enum DATA_TUIKUAN_INPUT_STATUS_ENUM {
  // 待录入
  WAITING = '1',
  // 录入中
  SAVED = '2',
  /** 已提交 */
  SUBMITED = '3',
}
export const DATA_TUIKUAN_INPUT_STATUS_LIST = [
  { value: DATA_TUIKUAN_INPUT_STATUS_ENUM.WAITING, label: '待录入' },
  { value: DATA_TUIKUAN_INPUT_STATUS_ENUM.SAVED, label: '录入中' },
  { value: DATA_TUIKUAN_INPUT_STATUS_ENUM.SUBMITED, label: '已提交' },
];

/**
 * 大货生成资料，是否已分单
 */
export enum STYLE_INFO_IS_ALLOCATED_ENUM {
  /**
   * 已分单
   */
  YES = '1',
  /**
   * 待分单
   */
  NO = '0',
}
export const STYLE_INFO_IS_ALLOCATED_LIST = [
  { value: STYLE_INFO_IS_ALLOCATED_ENUM.NO, label: '待分单', countKey: 'unallocatedCount' },
  { value: STYLE_INFO_IS_ALLOCATED_ENUM.YES, label: '已分单', countKey: 'allocatedCount' },
];

export enum ALLOCATE_STATE_ENUM {
  /**
   * 未流转
   */
  NOT_FLOW = '0',
  /**
   * 内部
   */
  INTERNAL = '1',
  /**
   * 外部
   */
  OUTSIDE = '2',
}
export const ALLOCATE_STATE_LIST = [
  { value: ALLOCATE_STATE_ENUM.NOT_FLOW, label: '未流转' },
  { value: ALLOCATE_STATE_ENUM.INTERNAL, label: '内部' },
  { value: ALLOCATE_STATE_ENUM.OUTSIDE, label: '外部' },
];

/**
 * 资料录入状态-推款
 */
export enum STYLE_INFO_STATE_ENUM {
  /**
   * 待录入
   */
  WAITING = '1',
  /**
   * 录入中
   */
  // ENTERING = '2',
  /**
   * 已提交
   */
  SUBMITED = '3',
}
export const STYLE_INFO_STATE_LIST = [
  { value: STYLE_INFO_STATE_ENUM.WAITING, label: '待提交', countKey: 'internalUnSubCount' },
  // { value: STYLE_INFO_STATE_ENUM.ENTERING, label: '录入中' },
  { value: STYLE_INFO_STATE_ENUM.SUBMITED, label: '已提交', countKey: 'internalSubCount' },
];

/**
 * 是否接单枚举
 */
export enum STYLE_INFO_RECEIVING_ENUM {
  /**
   * 已接单
   */
  YES = '1',
  /**
   * 未接单
   */
  NO = '0',
}

/* 备注的业务类型 */
export enum REMARK_BIZ_TYPE_ENUMS {
  CONTRACT = '1', // 合同管理
  PRO = '2', // 生产资料
  FOB_DEMAND = '3', // FOB需求
  FOB_CLIENT = '4', // FOB客户价格
  FOB_PRO = '5', // FOB生产资料
  CMT_BOM = '6', // CMT-BOM
}
