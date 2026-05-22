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

/**
 * 任务状态列表
 */
export const TASK_STATE_LIST = [
  { value: TASK_STATE.QUEUEING, label: '排队中' },
  { value: TASK_STATE.GENERATING, label: '生成中' },
  { value: TASK_STATE.COMPLETED, label: '已生成' },
  { value: TASK_STATE.ABORTED, label: '已中止' },
  { value: TASK_STATE.FAILED, label: '失败' },
];

/**
 * 任务状态枚举
 */
export enum LOOP_TASK_STATE {
  /** 排队中 */
  QUEUEING = 0,
  /** 生成中 */
  GENERATING = 10,
  /** 已中止 */
  ABORTED = 20,
  /** 已完成 */
  COMPLETED = 30,
  /** 无效 */
  INVALID = 40,
  /** 失败 */
  FAILED = 50,
  /** 超时失败 */
  TIMEOUT_FAILED = 60,
}

/**
 * 任务状态列表
 */
export const LOOP_TASK_STATE_LIST = [
  { value: LOOP_TASK_STATE.QUEUEING, label: '排队中' },
  { value: LOOP_TASK_STATE.GENERATING, label: '生成中' },
  { value: LOOP_TASK_STATE.ABORTED, label: '已中止' },
  { value: LOOP_TASK_STATE.COMPLETED, label: '已生成' },
  { value: LOOP_TASK_STATE.INVALID, label: '无效' },
  { value: LOOP_TASK_STATE.FAILED, label: '失败' },
  { value: LOOP_TASK_STATE.TIMEOUT_FAILED, label: '超时失败' },
];

/**
 * 款式类型枚举
 */
export enum STYLE_TYPE {
  /** 净色款 */
  SOLID = 0,
  /** 花型款 */
  PATTERNED = 1,
}

/**
 * 款式类型列表
 */
export const STYLE_TYPE_LIST = [
  { value: STYLE_TYPE.SOLID, label: '净色款' },
  { value: STYLE_TYPE.PATTERNED, label: '花型款' },
];

/**
 * 参考图类型枚举
 */
export enum REF_IMG_TYPE {
  /** 真人模特图 */
  REAL_MODEL = 1,
  /** 非真人模特图 */
  NON_REAL_MODEL = 0,
}

/**
 * 参考图类型列表
 */
export const REF_IMG_TYPE_LIST = [
  { value: REF_IMG_TYPE.REAL_MODEL, label: '真人模特图' },
  { value: REF_IMG_TYPE.NON_REAL_MODEL, label: '非真人模特图' },
];

/**
 * 扩展标签枚举
 */
export enum EXTEND_LABEL {
  /** 风格 */
  STYLE = '1',
  /** 花型识别 */
  PATTERN_RECOGNITION = '2',
  /** 多姿势 */
  MULTI_POSE = '3',
  /** 面料识别及推荐 */
  FABRIC_RECOGNITION_RECOMMENDATION = '4',
  /** 花型提取 */
  PATTERN_EXTRACTION = '5',
  /** 场景 */
  SCENE = '6',
  /** 模特 */
  MODEL = '7',
  /** 9-面料履约增强 */
  FABRIC_ENHANCEMENT = '9',
}

/**
 * 扩展标签列表
 */
export const EXTEND_LABEL_LIST = [
  { value: EXTEND_LABEL.STYLE, label: '风格' },
  { value: EXTEND_LABEL.PATTERN_RECOGNITION, label: '花型识别' },
  { value: EXTEND_LABEL.MULTI_POSE, label: '多姿势' },
  { value: EXTEND_LABEL.FABRIC_RECOGNITION_RECOMMENDATION, label: '面料识别及推荐' },
  { value: EXTEND_LABEL.PATTERN_EXTRACTION, label: '花型提取' },
  { value: EXTEND_LABEL.SCENE, label: '场景' },
  { value: EXTEND_LABEL.MODEL, label: '模特' },
  { value: EXTEND_LABEL.FABRIC_ENHANCEMENT, label: '履约增强' },
];

export enum RECOMMEND_FABRIC_TASK_STATUS {
  QUEUING = 0, // 排队中
  GENERATING = 10, // 生成中
  ABORTED = 20, // 已中止
  COMPLETED = 30, // 已完成
  FAILED = 50, // 失败
  TIMEOUT_FAILED = 60 // 超时失败
}

export enum IMAGE_RECOMMEND_FABRIC_STATE {
  /** 0 初始 */
  INIT = 0,
  /** 0 推荐失败 */
  FAILED = 9,
  /** 1 推荐成功 */
  SUCCESS = 3,
  /** 2 推荐中 */
  RECOMMEND = 2
}

// 任务来源：0-FM用户上传；1-灵感源
export enum TASK_SOURCE {
  FM_USER_UPLOAD = 0,
  INSPIRATION_SOURCE = 1,
}

export const TASK_SOURCE_LIST = [
  { value: TASK_SOURCE.FM_USER_UPLOAD, label: '用户上传' },
  { value: TASK_SOURCE.INSPIRATION_SOURCE, label: '灵感源' },
];
export enum MODEL_TYPE {
  // FG2.0
  FG2_0 = 'FG2_0',
  // FG2.0小红书
  FG2_0_RED_BOOK = 'FG2_0_RED_BOOK'
}

/**
 * 任务状态枚举
 */
export enum TRY_ON_TASK_STATE_ENUM {
  /** 生成中 */
  GENERATING = '10',
  /** 已中止 */
  ABORTED = '20',
  /** 已生成 */
  GENERATED = '30',
  /** 生成失败 */
  FAILED = '40',
  /** 排队中 */
  QUEUING = '50',
}

/**
 * 任务状态列表
 */
export const TRY_ON_TASK_STATE_ENUM_LIST = [
  { value: TRY_ON_TASK_STATE_ENUM.QUEUING, label: '排队中' },
  { value: TRY_ON_TASK_STATE_ENUM.GENERATING, label: '生成中' },
  { value: TRY_ON_TASK_STATE_ENUM.GENERATED, label: '已生成' },
  { value: TRY_ON_TASK_STATE_ENUM.ABORTED, label: '已中止' },
  { value: TRY_ON_TASK_STATE_ENUM.FAILED, label: '生成失败' },
];

/**
 * 服装图类型枚举
 */
export enum CLOTHING_TYPE_ENUM {
  /** 3D图 */
  THREE_D = '1',
  /** 平铺|挂拍 */
  FLAT_LAY = '2',
  /** 真人模特 */
  MODEL = '3',
}

/**
 * 服装图类型列表
 */
export const CLOTHING_TYPE_ENUM_LIST = [
  { value: CLOTHING_TYPE_ENUM.THREE_D, label: '3D图' },
  { value: CLOTHING_TYPE_ENUM.FLAT_LAY, label: '平铺|挂拍' },
  { value: CLOTHING_TYPE_ENUM.MODEL, label: '真人模特' },
];

/**
 * 生成模式枚举
 */
export enum GENERATE_MODE {
  /** 多姿势 */
  MULTI_POSE = 1,
  /** 单姿势 */
  SINGLE_POSE = 0,
}
