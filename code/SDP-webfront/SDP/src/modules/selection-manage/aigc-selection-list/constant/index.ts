/** 选用状态 */
export enum PICK_STATE_ENUM {
  /** 未选择 */
  WAIT = 0,
  /** 可用 */
  YES = 1,
  /** 不可用 */
  NO = 2,
}
export const PICK_STATE_LIST = [
  { value: '', label: '全部', key: 'total', type: '' },
  { value: PICK_STATE_ENUM.WAIT, label: '未选择', key: 'toBeSelected', type: 'warning' },
  { value: PICK_STATE_ENUM.YES, label: '可用', key: 'selected', type: 'success' },
  { value: PICK_STATE_ENUM.NO, label: '不可用', key: 'unselected', type: 'danger' },
];

/** 跑图渠道 */
export enum BUSI_CHANNEL_ENUM {
  /** jv */
  JV = '1',
  /** 外部 */
  WB = '0',
}
export const BUSI_CHANNEL_LIST = [
  { value: BUSI_CHANNEL_ENUM.JV, label: 'JV渠道' },
  { value: BUSI_CHANNEL_ENUM.WB, label: '外部渠道' },
];

/**
 * 是否可以履约：不需要展示[-1]；0=不可以[0]；可履约[1]
 */
export enum PROMISE_ENABLED_ENUM {
  /** 不需要展示 */
  NOT_SHOW = -1,
  /** 不可以 */
  NO = 0,
  /** 可履约 */
  YES = 1,
}

export const PROMISE_ENABLED_LIST = [
  { value: PROMISE_ENABLED_ENUM.NO, label: '无可履约面料', type: 'info' },
  { value: PROMISE_ENABLED_ENUM.YES, label: '面料可履约', type: 'success' },
];

/**
 * 面料是否一致：不需要展示[-1]；不一致[0]；一致[1]
 */
export enum FABRIC_CONSISTENT_ENUM {
  /** 不需要展示 */
  NOT_SHOW = -1,
  /** 不一致 */
  NO = 0,
  /** 一致 */
  YES = 1,
}

export const FABRIC_CONSISTENT_LIST = [
  { value: FABRIC_CONSISTENT_ENUM.NO, label: '面料需替换', type: 'warning' },
  { value: FABRIC_CONSISTENT_ENUM.YES, label: '面料一致', type: 'success' },
];

/** 面料面数 */
export enum FABRIC_FACE_ENUM {
  /** 单面 */
  SINGLE = 'SINGULAR',
  /** 双面 */
  DOUBLE = 'DOUBLE'
}

export const FABRIC_FACE_LIST = [
  { value: FABRIC_FACE_ENUM.SINGLE, label: '单面' },
  { value: FABRIC_FACE_ENUM.DOUBLE, label: '双面' }
];

export enum LABEL_CATEGORY_TYPE_ENUM {
  /**
   * 服装-品类标签
   */
  CATEGORY = 'FM240402539',
  /**
   * 面料-品类
   */
  FABRIC = 'FM240402537',
  /**
   * 服装-款式标签
   */
  STYLE_LABEL = 'FM240402540',
  /**
   * 风格
   */
  STYLE = 'FM240402543',
  /**
   * 年龄
   */
  AGE = 'FM240402542',
  /**
   * 区域
   */
  AREA = 'FM240402541',
  /**
   * 季节
   */
  SEASON = 'FM240402544',
  SCULPT = '面料-造型',
  /**
   * 色彩标签
   */
  COLOR = 'FM240402546',
}

/** 任务类型 */
export enum TASK_TYPE {
  /** AI设计 */
  AIDesign = 'smart_develop_style',
  /** 姿势裂变 */
  PoseFission = 'posture_fission',
  /** 风格化衍生 */
  styleGen = 'style_gen',
  /** 虚拟换衣 */
  postureFission = 'fashion_virtual_try_on',
  PatternTryon = 'floral_pattern_apply',
}

/** 任务类型列表 */
export const TASK_TYPE_LIST = [
  { value: TASK_TYPE.AIDesign, label: 'AI设计' },
  { value: TASK_TYPE.PoseFission, label: '姿势裂变' },
  { value: TASK_TYPE.PatternTryon, label: '花型上身' },
  { value: TASK_TYPE.styleGen, label: '风格化衍生' },
  { value: TASK_TYPE.postureFission, label: '虚拟换衣' },
];
