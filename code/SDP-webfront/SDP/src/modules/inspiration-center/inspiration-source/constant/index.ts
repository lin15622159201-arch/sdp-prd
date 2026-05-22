export enum SUBMIT_STATUS_ENUM {
  /** 待提交 */
  WAIT = 0,
  /** 已提交 */
  SUCCESS = 1,
}

export const SUBMIT_STATUS_LIST = [
  { label: '待提交', value: SUBMIT_STATUS_ENUM.WAIT, type: 'primary' },
  { label: '已提交', value: SUBMIT_STATUS_ENUM.SUCCESS, type: 'success' }
];

export enum TASK_STATUS_ENUM {
  /** 已生成 */
  SUCCESS = 30,
  /** 已中止 */
  CANCLE = 20,
  /** 排队中 */
  WAIT = 0,
  /** 生成中 */
  PENDING = 10,
  /** 生成失败 */
  FAIL = 50,
  /** 已提交 */
  HAS = -1,
}

export const TASK_STATUS_LIST = [
  { label: '已生成', value: TASK_STATUS_ENUM.SUCCESS, type: 'success' },
  { label: '已中止', value: TASK_STATUS_ENUM.CANCLE, type: 'danger' },
  { label: '排队中', value: TASK_STATUS_ENUM.WAIT, type: 'info' },
  { label: '生成中', value: TASK_STATUS_ENUM.PENDING, type: 'warning' },
  { label: '生成失败', value: TASK_STATUS_ENUM.FAIL, type: 'danger' },
  { label: '已提交', value: TASK_STATUS_ENUM.HAS, type: 'primary' },
];

export enum IDENTIFY_STATUS_ENUM {
  /** 无效 */
  NONE = 0,
  /** 通过 */
  SUCCESS = 1,
  /** 识别失败 */
  FAIL = 2,
  /** 识别中 */
  PENDING = 3,
}

export const IDENTIFY_STATUS_LIST = [
  { label: '无效', value: IDENTIFY_STATUS_ENUM.NONE, type: 'warning' },
  { label: '识别中', value: IDENTIFY_STATUS_ENUM.PENDING, type: 'primary' },
  { label: '识别失败', value: IDENTIFY_STATUS_ENUM.FAIL, type: 'danger' },
  { label: '通过', value: IDENTIFY_STATUS_ENUM.SUCCESS, type: 'success' }
];

export enum IMPORT_TYPE_ENUM {
  /** 模板导入 */
  TEM = '1',
  /** 图片形式 */
  IMG = '2',
}

export const IMPORT_TYPE_LIST = [
  { label: '模板导入', value: IMPORT_TYPE_ENUM.TEM },
  { label: '图片形式', value: IMPORT_TYPE_ENUM.IMG },
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

/**
 * 生成模式列表
 */
export const GENERATE_MODE_LIST = [
  { value: GENERATE_MODE.MULTI_POSE, label: '多姿势' },
  { value: GENERATE_MODE.SINGLE_POSE, label: '单姿势' },
];

/**
 * 数据来源
 */
export enum DATA_SOURCE_ENUM {
  /** 导入 */
  IMPORT = 'IMPORT',
  /** AIDC-趋势中心 */
  AIDC_TREND_CENTER = 'AIDC_TREND_CENTER',
  /** AIDC-商品智脑 */
  AIDC_ALIEXPRESS = 'AIDC_ALIEXPRESS',
}

export const DATA_SOURCE_LIST = [
  { value: DATA_SOURCE_ENUM.IMPORT, label: '导入' },
  { value: DATA_SOURCE_ENUM.AIDC_TREND_CENTER, label: 'AIDC-趋势中心' },
  { value: DATA_SOURCE_ENUM.AIDC_ALIEXPRESS, label: 'AIDC-商品智脑' },
];

export enum MODEL_TYPE {
  // FG2.0
  FG2_0 = 'FG2_0',
  // FG2.0小红书
  FG2_0_RED_BOOK = 'FG2_0_RED_BOOK'
}

export enum SUPPLY_METHOD {
  /** 姿势裂变 */
  POSTURE_FISSION = 'posture_fission',
  /** 虚拟换衣 */
  FASHION_VIRTUAL_TRY_ON = 'fashion_virtual_try_on',
  /** aigc */
  ARTIFICIAL = 'Artificial',
  /** 风格化衍生 */
  SUPPLYMETHODCODE = 'supplyMethodCode',
}
