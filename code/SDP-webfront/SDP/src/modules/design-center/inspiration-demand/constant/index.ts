/** 任务状态 */
export enum DESIGN_DEMAND_STATUS_ENUM {
  /** 待分配 */
  WAIT_DISPATCH = '10',
  /** 待处理 */
  WAIT_HANDLE = '20',
  /** 已淘汰 */
  DISUSE = '30',
  /** 已开款 */
  FINISH = '40',
}

export const DESIGN_DEMAND_STATUS_LIST = [
  { label: '待分配', value: DESIGN_DEMAND_STATUS_ENUM.WAIT_DISPATCH, color: 'primary' },
  { label: '待处理', value: DESIGN_DEMAND_STATUS_ENUM.WAIT_HANDLE, color: 'warning' },
  { label: '已淘汰', value: DESIGN_DEMAND_STATUS_ENUM.DISUSE, color: 'danger' },
  { label: '已开款', value: DESIGN_DEMAND_STATUS_ENUM.FINISH, color: 'success' },
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
