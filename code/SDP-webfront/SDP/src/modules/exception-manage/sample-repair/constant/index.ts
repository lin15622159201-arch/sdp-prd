// 返修环节
export enum REPAIR_STEP_ENUMS {
  /** 全部 */
  ALL = '0',
  // 内部
  /** 返修分单-待分单 */
  PENDINGORDERS = '1',
  /** 返修分单-已分单  */
  DIVIDEDORDER = '2',
  /** 内部返修-待进行  */
  PENDING = '3',
  /** 内部返修-进行中  */
  INPROGESS = '4',
  /** 已取消  */
  CANCELLED = '5',
  /** 内部返修-已完成  */
  COMPLETED = '6',
  // 外部
  /** 外部返修-待接单 */
  PENDINGORDER = '7',
  /** 外部返修-已接单 */
  ORDERRECEIVED = '8',
  /** 外部返修-返修中 */
  REPAIEING = '9',
  /** 外部返修-已返修 */
  REPAIRED = '10',
  /** 外部返修-待收货 */
  TOBERECEIVE = '11',
  /** 外部返修-已收货 */
  RECEIVED = '12',
  /** 全部已完成 */
  ALLCOMPLETED = '13',
  TOBECONFIRMED = '44',
  CONFIRMED = '45',
}

/* 状态（
1:内部-待分单，2:内部-已分单，3:内部-待进行，4:内部-进行中，5:已取消 ，6:内部-已完成，
7:外部-待接单，8:外部-已接单，
9:外部-返修中（外部：进行中），10:外部-已返修，11:外部-待收货（已完成），12：外部-已收货 */
export const REPAIR_STATE_ALL_LIST = [
  { value: REPAIR_STEP_ENUMS.ALL, label: '全部' },
  // 内部
  { value: REPAIR_STEP_ENUMS.PENDINGORDERS, label: '返修分单-待分单' }, // 1
  { value: REPAIR_STEP_ENUMS.DIVIDEDORDER, label: '返修分单-已分单' }, // 2
  { value: REPAIR_STEP_ENUMS.PENDING, label: '内部返修-待进行' }, // 3
  { value: REPAIR_STEP_ENUMS.INPROGESS, label: '内部返修-进行中' }, // 4
  { value: REPAIR_STEP_ENUMS.CANCELLED, label: '已取消' }, // 5
  { value: REPAIR_STEP_ENUMS.COMPLETED, label: '内部返修-已完成' }, // 6

  // 外部
  { value: REPAIR_STEP_ENUMS.PENDINGORDER, label: '外部返修-待接单' }, // 7
  { value: REPAIR_STEP_ENUMS.ORDERRECEIVED, label: '外部返修-已接单' }, // 8
  { value: REPAIR_STEP_ENUMS.REPAIEING, label: '外部返修-返修中' }, // 9
  { value: REPAIR_STEP_ENUMS.REPAIRED, label: '外部返修-已返修' }, // 10

  { value: REPAIR_STEP_ENUMS.TOBERECEIVE, label: '外部返修-待收货' }, // 11
  { value: REPAIR_STEP_ENUMS.RECEIVED, label: '外部返修-已收货' }, // 12
  // 内部&外部
  { value: REPAIR_STEP_ENUMS.ALLCOMPLETED, label: '全部已完成' }, // 13
];

export const REPAIR_STATE_LIST = [
  { value: REPAIR_STEP_ENUMS.ALL, label: '全部' },
  // 内部
  { value: REPAIR_STEP_ENUMS.PENDINGORDERS, label: '返修分单-待分单' }, // 1
  { value: REPAIR_STEP_ENUMS.PENDING, label: '内部返修-待进行' }, // 3
  { value: REPAIR_STEP_ENUMS.INPROGESS, label: '内部返修-进行中' }, // 4
  // 外部
  { value: REPAIR_STEP_ENUMS.PENDINGORDER, label: '外部返修-待接单' }, // 7
  { value: REPAIR_STEP_ENUMS.REPAIEING, label: '外部返修-返修中' }, // 9
  { value: REPAIR_STEP_ENUMS.TOBERECEIVE, label: '外部返修-待收货' }, // 11
];
/* 样衣返修-发起环节 */
export enum REPAIR_LAUNCH_STEP_ENUMS {
  /** 审版环节 */
  INSP_SAMPLE_AUDIT = '800',
  INSP_SAMPLE_QC = '600',
  INSP_SAMPLE_HANDLE = '615',
  WAIT_LARGE = '670',
}
export const REPAIR_LAUNCH_STEP_LIST = [
  { value: REPAIR_LAUNCH_STEP_ENUMS.INSP_SAMPLE_AUDIT, label: '审版环节' },
  { value: REPAIR_LAUNCH_STEP_ENUMS.INSP_SAMPLE_QC, label: '质检环节' },
  // { value: REPAIR_LAUNCH_STEP_ENUMS.INSP_SAMPLE_AUDIT, label: '样衣审版' },
  // { value: REPAIR_LAUNCH_STEP_ENUMS.INSP_SAMPLE_AUDIT, label: '联合审版' },
  // { value: REPAIR_LAUNCH_STEP_ENUMS.WAIT_LARGE, label: '待下大货' },
];

/* OVERDUE :开发超期 NOT_EXPIRED :开发未超期 */
export enum DESIGN_DEV_TYPE_ENUM {
  DEVTIME = '',
  OVERDUE = 'OVERDUE',
  NOT_EXPIRED = 'NOT_EXPIRED',
}
export const DESIGN_DEV_TYPE_LIST = [
  // { value: DESIGN_DEV_TYPE_ENUM.DEVTIME, label: '开发时效' },
  { value: DESIGN_DEV_TYPE_ENUM.OVERDUE, label: '开发超期' },
  { value: DESIGN_DEV_TYPE_ENUM.NOT_EXPIRED, label: '开发未超期' },
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

// 环节状态 待分单｜已分单
export const WAIT_SEPARATE_STATUS_LIST = [
  { value: REPAIR_STEP_ENUMS.PENDINGORDERS, label: '待分单' },
  { value: REPAIR_STEP_ENUMS.DIVIDEDORDER, label: '已分单' },
];

// 环节状态 待接单｜已接单
export const WAIT_ORDER_STATUS_LIST = [
  { value: REPAIR_STEP_ENUMS.PENDINGORDER, label: '待接单' },
  { value: REPAIR_STEP_ENUMS.ORDERRECEIVED, label: '已接单' },
];

// 环节状态 返修中｜已返修
export const REPAIRING_STATUS_LIST = [
  { value: REPAIR_STEP_ENUMS.REPAIEING, label: '返修中' },
  { value: REPAIR_STEP_ENUMS.REPAIRED, label: '已返修' },
];

// 环节状态 收货中｜已收货
export const RECEIVE_STATUS_LIST = [
  { value: REPAIR_STEP_ENUMS.TOBERECEIVE, label: '待收货' },
  { value: REPAIR_STEP_ENUMS.RECEIVED, label: '已收货' },
];

/**
 * 环节状态 确认耗时
 */
export const CONFIRMATION_TIME_LIST = [
  { value: REPAIR_STEP_ENUMS.TOBECONFIRMED, label: '待确认' },
  { value: REPAIR_STEP_ENUMS.CONFIRMED, label: '已确认' },
];

// 返修分单类型
export enum REPAIR_OUT_IN_ENUMS {
  INNER_REPAIR = '0',
  OUTER_REPAIR = '1',
}

export const REPAIR_OUT_IN_LIST = [
  { value: REPAIR_OUT_IN_ENUMS.INNER_REPAIR, label: '内部返修' },
  { value: REPAIR_OUT_IN_ENUMS.OUTER_REPAIR, label: '外部返修' },
];

/* 返修分单-内部版房 */
export enum CLOTHING_ROOM_ENUMS {
  INNER = '1',
}
export const CLOTHING_INNER_ROOM_LIST = [
  { value: CLOTHING_ROOM_ENUMS.INNER, label: '内部' },
];

/* 收货件数 */
export enum REPAIR_RECEIPT_NUM_ENUM {
  ONE = '1',
  TWO = '2',
  THREE = '3',
}
export const REPAIR_RECEIPT_NUM_LIST = [
  { value: REPAIR_RECEIPT_NUM_ENUM.ONE, label: '1' },
  { value: REPAIR_RECEIPT_NUM_ENUM.TWO, label: '2' },
  { value: REPAIR_RECEIPT_NUM_ENUM.THREE, label: '3' },
];
