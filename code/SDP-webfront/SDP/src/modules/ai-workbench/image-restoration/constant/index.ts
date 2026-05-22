/** 生成状态 */
export enum DESIGN_DEMAND_STATUS_ENUM {
  /** 排队中 */
  WAIT_DISPATCH = 0,
  /** 生成中 */
  WAIT_HANDLE = 10,
  /** 已生成 */
  DISUSE = 30,
  /** 已中止 */
  FINISH = 20,
  /** 生成失败 */
  GF = 50,
}

export const DESIGN_DEMAND_STATUS_LIST = [
  { label: '排队中', value: DESIGN_DEMAND_STATUS_ENUM.WAIT_DISPATCH, color: 'primary' },
  { label: '生成中', value: DESIGN_DEMAND_STATUS_ENUM.WAIT_HANDLE, color: 'warning' },
  { label: '已生成', value: DESIGN_DEMAND_STATUS_ENUM.DISUSE, color: 'danger' },
  { label: '已中止', value: DESIGN_DEMAND_STATUS_ENUM.FINISH, color: 'success' },
  { label: '生成失败', value: DESIGN_DEMAND_STATUS_ENUM.GF, color: 'success' },
];

/** 任务分配类型 */
export enum ALLOCATE_TYPE_ENUM {
  /** 任务分配 */
  DISPATCH = '1',
  /** 分配变更 */
  DISPATCH_ALTER = '2',
}

export enum COMMODITY_TYPE_ENUM {
  /** 净色 */
  PURE = 'PURE',
  /** 花型 */
  FLOWER = 'FLOWER',
  /** 特殊辅料 */
  SPECIAL_ACCESSORIES = 'SPECIAL_ACCESSORIES',
}

/**
 * 任务状态枚举
 */
export enum TASK_STATE {
  /** 排队中 */
  QUEUEING = 'QUEUEING',
  /** 生成中 */
  GENERATING = 'GENERATING',
  /** 已完成 */
  COMPLETED = 'COMPLETED',
  /** 已中止 */
  ABORTED = 'ABORTED',
  /** 失败 */
  FAILED = 'FAILED',
}

export const UNIQUECSSCOLORS = [
  '#FF3366', '#33CCFF', '#FFCC00', '#9966FF', '#00CC99',
  '#FF6633', '#6633FF', '#FF0066', '#00FF99', '#CC33FF',
  '#33FF66', '#FF9933', '#66FFCC', '#99FF33', '#FF33CC',
  '#3366FF', '#CCFF33', '#FF66CC', '#33FFCC', '#9933FF',
  '#FFCC33', '#66CCFF', '#FF3399', '#0099FF', '#CC66FF',
  '#33FF99', '#FF99CC', '#66FF33', '#99CCFF', '#CC00FF',
  '#FF0033', '#33CC99', '#FF9900', '#6633CC', '#00FFCC',
  '#CC3366', '#33FF00', '#FF6600', '#9933CC', '#00CCFF',
  '#FFCC66', '#66FF99', '#FF3300', '#99FFCC', '#CC6633',
  '#3366CC', '#FF0099', '#66CC33', '#9900FF', '#CC99FF'
];
