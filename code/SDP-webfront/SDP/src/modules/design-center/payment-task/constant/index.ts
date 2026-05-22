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

/** 开款类型 */
export enum TYPE_OF_OPENING {
  /** 现货款 */
  SPOT_STYLE = 'SPOT_STYLE',
  /** AI款 */
  AI_STYLE = 'AI_STYLE',
  /** 跟卖款 */
  SHARED_LISTING = 'SHARED_LISTING',
}

export const TYPE_OF_OPENING_LIST = [
  { label: '现货款', value: TYPE_OF_OPENING.SPOT_STYLE, color: 'rgba(128, 128, 255, 1)' },
  { label: 'AI款', value: TYPE_OF_OPENING.AI_STYLE, color: 'rgba(236, 128, 141, 0.6)' },
  { label: '跟卖款', value: TYPE_OF_OPENING.SHARED_LISTING, color: 'rgba(112, 182, 3, 0.8)' },
];

/** 任务状态 */
export enum DESIGN_DEMAND_STATUS_TYPE {
  /** 待审核 */
  WAIT_DISPATCH = 0,
  /** 待开款 */
  WAIT_HANDLE = 10,
  /** 已淘汰 */
  DISUSE = 20,
  /** 已开款 */
  FINISH = 30,
  /** 失败 */
  GF = 50,
}

export const DESIGN_DEMAND_STATUS_TYPE_LIST = [
  { label: '待审核', value: DESIGN_DEMAND_STATUS_TYPE.WAIT_DISPATCH, color: 'primary' },
  { label: '待开款', value: DESIGN_DEMAND_STATUS_TYPE.WAIT_HANDLE, color: 'warning' },
  { label: '已开款', value: DESIGN_DEMAND_STATUS_TYPE.FINISH, color: 'success' },
  { label: '已淘汰', value: DESIGN_DEMAND_STATUS_TYPE.DISUSE, color: 'danger' },
  // { label: '失败', value: DESIGN_DEMAND_STATUS_TYPE.GF, color: 'success' },
];


/** 关联状态 */
export enum ASSOCIATED_TYPE {
  /** 未关联 */
  UN_RELA = 'UN_RELA',
  /** 虚拟换衣 */
  VIRTUAL_TRY_ON = 'VIRTUAL_TRY_ON',
  /** 姿势裂变 */
  POSTURE_FISSION = 'POSTURE_FISSION',
}

export const ASSOCIATED_TYPE_LIST = [
  { label: '未关联', value: ASSOCIATED_TYPE.UN_RELA, color: 'primary' },
  { label: '虚拟换衣', value: ASSOCIATED_TYPE.VIRTUAL_TRY_ON, color: 'warning' },
  { label: '姿势裂变', value: ASSOCIATED_TYPE.POSTURE_FISSION, color: 'danger' },
];

/** 识别状态 */
export enum IDENTIFY_STATUS {
  /** 排队中 */
  QUEUING = 0,
  /** 识别中 */
  RECOGNIZING = 10,
  /** 已中止 */
  ABORTED = 20,
  /** 已完成 */
  COMPLETED = 30,
  /** 失败 */
  FAILED = 50,
  /** 超时失败 */
  TIMEOUT_FAILED = 60,
}

export const IDENTIFY_STATUS_LIST = [
  { label: '排队中 ', value: IDENTIFY_STATUS.QUEUING },
  { label: '识别中 ', value: IDENTIFY_STATUS.RECOGNIZING },
  { label: '已中止 ', value: IDENTIFY_STATUS.ABORTED },
  { label: '已完成 ', value: IDENTIFY_STATUS.COMPLETED },
  { label: '失败 ', value: IDENTIFY_STATUS.FAILED },
  // { label: '超时失败 ', value: IDENTIFY_STATUS.TIMEOUT_FAILED },
];

/** 审核结果 */
export const AUDIT_RESUITS = {
  /** 暂不处理 */
  UN_CHECK: 'UN_CHECK',
  /** 淘汰 */
  DISUSE: 'DISUSE',
  /** 通过 */
  PASS: 'PASS'
};
/** 开款类型 */
export enum TYPE_STYLE {
  /** 同款 */
  SAME = 'same',
  /** 相似款 */
  SIMILAR = 'similar',
}

/** 来源 */
export enum TASK_SOUCE {
  /** 手动创建 */
  USER_UPLOAD = 'USER_UPLOAD',
  /** AIGC选款 */
  AIGC = 'AIGC',
  /** 以料开款 */
  STUDIO = 'STUDIO',
  /** 未知类型 */
  UNKNOWN = 'UNKNOWN',
  /** 现货款 */
  spot_style = 'spot_style',
}

export const TASK_SOUCE_LIST = [
  { label: '手动创建', value: TASK_SOUCE.USER_UPLOAD },
  { label: 'AIGC选款', value: TASK_SOUCE.AIGC },
  { label: '以料开款', value: TASK_SOUCE.STUDIO },
  { label: '未知类型', value: TASK_SOUCE.UNKNOWN },
];
