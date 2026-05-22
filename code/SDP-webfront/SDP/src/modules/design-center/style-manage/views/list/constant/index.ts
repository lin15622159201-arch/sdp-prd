/**
 * 4是广州8是杭州
 */
export enum REGION_ID_ENUM {
  GZ = '4',
  HZ = '8',
}

export const REGION_ID_LIST = [
  {
    value: REGION_ID_ENUM.GZ,
    label: '广州',
  },
  {
    value: REGION_ID_ENUM.HZ,
    label: '杭州',
  },
];

// 天工尺码标准固定code值
export const TIANGONG_SIZE_STANDARD_CODE = 'tiangong_code_standard';

export enum DEMAND_TYPE {
  /** 面料 */
  ML = 1,
  /** 辅料 */
  FL = 2,
  /** 特殊辅料 */
  TS = 3
}

export const DEMAND_TYPE_LIST = [
  {
    value: DEMAND_TYPE.ML,
    label: '面料',
  },
  {
    value: DEMAND_TYPE.FL,
    label: '辅料',
  },
  {
    value: DEMAND_TYPE.TS,
    label: '特殊辅料',
  },
];
