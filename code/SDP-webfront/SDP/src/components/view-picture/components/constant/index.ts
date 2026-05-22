export enum PLAN_ENUM {
  // 智能开款：900
  INTELLIGENT_OPENING = '900',
  // 款式衍生：1300
  STYLE_DERIVATION = '1300',
  // 花型任务：1400
  PATTERN = '1400',
  // LOGO印：1500
  LOGO = '1500',
}

export const PLAN_ENUM_LIST = [
  { value: PLAN_ENUM.INTELLIGENT_OPENING, label: '智能开款' },
  { value: PLAN_ENUM.STYLE_DERIVATION, label: '款式衍生' },
  { value: PLAN_ENUM.PATTERN, label: '花型任务' },
];

export enum IMG_LOG_TYPE_ENUM {
  // 1 下载；
  DOWNLOAD = 1,
  // 3 复制
  COPY = 3
}

export const IMG_LOG_TYPE_ENUM_LIST = [
  { value: IMG_LOG_TYPE_ENUM.DOWNLOAD, label: '下载' },
  { value: IMG_LOG_TYPE_ENUM.COPY, label: '复制' }
];

/**
 * 任务状态枚举
 */
export enum POLL_TASK_STATUS_ENUM {
  /**
   * 排队中
   */
  QUEUED = '50',

  /**
   * 生成中
   */
  GENERATING = '10',

  /**
   * 已完成
   */
  COMPLETED = '30',

  /**
   * 失败
   */
  FAILED = '40',
  /**
   * 已中止
   */
  ABORTED = '20',
}

/**
 * 任务状态枚举-EN
 * 'QUEUEING' | 'GENERATING' | 'COMPLETED' | 'ABORTED' | 'FAILED'
 */
export enum TASK_STATUS_EN_ENUM {
  /**
   * 生成中
   */
  GENERATING = 'GENERATING',
  /**
   * 已中止
   */
  ABORTED = 'ABORTED',
  /**
   * 已完成
   */
  COMPLETED = 'COMPLETED',
  /**
   * 失败
   */
  FAILED = 'FAILED',
  /**
   * 排队中
   */
  QUEUEING = 'QUEUEING',
}

/**
 * 生成模式枚举
 */
export enum GENERATE_MODE {
  /** 多姿势 */
  MULTI_POSE = 1,
  /** 单姿势 */
  SINGLE_POSE = 0,
}

/**
 * 生成模式列表
 */
export const GENERATE_MODE_LIST = [
  { value: GENERATE_MODE.MULTI_POSE, label: '多姿势' },
  { value: GENERATE_MODE.SINGLE_POSE, label: '单姿势' },
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
  /**
   * 面料视觉
   */
  VISION = 'FM240600009',
  /**
   * 花型-风格
   */
  PATTERN_STYLE = 'FM24091203',
  /**
   * 花型-元素
   */
  PATTERN_ELEMENT = 'FM24091202',
  /**
   * 风格-场景分类
   */
  STYLE_SCENE = 'FM24091207',
  /**
   * 风格-设计理念
   */
  STYLE_DESIGN = 'FM24091206',
  /**
   * 风格-艺术风格
   */
  STYLE_ART = 'FM24091205',
  /**
   * 风格-区域风格
   */
  STYLE_AREA = 'FM24091204',
  /**
   * 风格-风格
   */
  STYLE_STYLE = 'FM240402588',
}

export enum MAIN_TAG_ENUM {
  AGE = 'FM240402579',
  AREA = 'FM240402578',
  SEASON = 'FM240402589',
  STYLE = 'FM240402588',
}

/**
 * 4k任务状态枚举
 */
export enum HD_TASK_STATUS {
  QUEUING = 0, // 排队中
  GENERATING = 10, // 生成中
  ABORTED = 20, // 已中止
  COMPLETED = 30, // 已完成
  FAILED = 50, // 失败
  TIMEOUT_FAILED = 60 // 超时失败
}

/**
 * 4K任务模型枚举
 */
export enum HD_TASK_MODE {
  FLOWER_PATTERN_EXTRACT = 'FLOWER_PATTERN_EXTRACT', // 花型提取
  SMART_DESIGN = 'SMART_DESIGN' // 智能设计生图
}

export enum RECOMMEND_FABRIC_TASK_STATUS {
  QUEUING = 0, // 排队中
  GENERATING = 10, // 生成中
  ABORTED = 20, // 已中止
  COMPLETED = 30, // 已完成
  FAILED = 50, // 失败
  TIMEOUT_FAILED = 60 // 超时失败
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
