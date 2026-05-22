/** 选款状态 */
export enum SELECTION_STATUS_ENUM {
  /** 待选款 */
  WAIT_SELECTION = 0,
  /** 选款中 */
  SELECTING = 10,
  /** 待报价 */
  WAIT_QUOTE = 11,
  /** 待确认 */
  WAIT_CONFIRM = 12,
  /** 已中止 */
  CANCELED = 20,
  /** 已完成 */
  COMPLETED = 30,
  /** 已淘汰 */
  OBSOLETE = 50,
  /** 失败 */
  FAILED = 60,
}

/** 选款结果 */
export enum SELECTION_RESULT_ENUM {
  /** 不可用 */
  NO = 1,
  /** 可用 */
  YES = 2,
}

/** 导入结果 */
export enum IMPORT_RESULT_ENUM {
  /** 成功 */
  SUCCESS = 'YES',
  /** 失败 */
  NO = 'NO',
}

/** 导入类型 */
export enum IMPORT_TYPE_ENUM {
  /** 新增数据-待选款 */
  NEW_SELECTION_WAIT = 'ADD_WAIT_SELECTION',
  /** 新增数据-已选款 */
  NEW_SELECTION_SELECTED = 'ADD_ALREADY_SELECTION',
  /** 更新报价 */
  UPDATE_QUOTE = 'UPDATE_QUOTE',
  /** 确认更新报价 */
  CONFIRM_UPDATE_QUOTE = 'UPDATE_CONFIRM_QUOTE',
}

/** 操作类型 */
export enum OPT_TYPE_ENUM {
  /** 新增 */
  ADD = 'ADD',
  /** 选款中 */
  SELECTING = 'SELECTING',
  /** 重新选款 */
  RE_SELECTING = 'RE_SELECTING',
  /** 取消 */
  CANCELED = 'CANCELED',
  /** 报价 */
  WAIT_QUOTE = 'WAIT_QUOTE',
  /** 驳回报价 */
  REJECT_QUOTE = 'REJECT_QUOTE',
  /** 淘汰 */
  REJECT_SELECTION = 'REJECT_SELECTION',
  /** 选款 */
  ALREADY_SELECTION = 'ALREADY_SELECTION',
  /** 确认报价 */
  CONFIRM = 'CONFIRM',
  /** 删除 */
  REMOVE = 'REMOVE',
  /** 重新报价 */
  RE_QUOTE = 'RE_QUOTE',
}

/** 确认报价枚举 */
export enum CONFIRM_QUOTE_ENUM {
  /** 不可用 */
  NO = 1,
  /** 可用 */
  YES = 2,
  /** 重新报价 */
  REQUOTE = 3,
}

export const SELECTION_RESULT = [
  { value: SELECTION_RESULT_ENUM.NO, label: '不可用' },
  { value: SELECTION_RESULT_ENUM.YES, label: '可用' },
];

export const CONFIRM_QUOTE_LIST = [
  { value: CONFIRM_QUOTE_ENUM.NO, label: '不可用' },
  { value: CONFIRM_QUOTE_ENUM.YES, label: '可用' },
  { value: CONFIRM_QUOTE_ENUM.REQUOTE, label: '重新报价' },
];

export const SELECTION_STATUS_LIST = [
  { value: SELECTION_STATUS_ENUM.WAIT_SELECTION, label: '待选款', color: 'warning' },
  { value: SELECTION_STATUS_ENUM.SELECTING, label: '选款中', color: 'success' },
  { value: SELECTION_STATUS_ENUM.WAIT_QUOTE, label: '待报价', color: 'danger' },
  { value: SELECTION_STATUS_ENUM.WAIT_CONFIRM, label: '待确认', color: 'primary' },
  { value: SELECTION_STATUS_ENUM.CANCELED, label: '已中止', color: 'danger' },
  { value: SELECTION_STATUS_ENUM.COMPLETED, label: '已完成', color: 'success' },
  { value: SELECTION_STATUS_ENUM.OBSOLETE, label: '已淘汰', color: 'danger' },
  { value: SELECTION_STATUS_ENUM.FAILED, label: '失败', color: 'danger' },
];

export const IMPORT_TYPE_LIST = [
  { value: IMPORT_TYPE_ENUM.NEW_SELECTION_WAIT, label: '新增数据-待选款' },
  { value: IMPORT_TYPE_ENUM.NEW_SELECTION_SELECTED, label: '新增数据-已选款' },
  { value: IMPORT_TYPE_ENUM.UPDATE_QUOTE, label: '更新报价' },
  { value: IMPORT_TYPE_ENUM.CONFIRM_UPDATE_QUOTE, label: '确认报价' },
];

export const OPT_TYPE_LIST = [
  { value: OPT_TYPE_ENUM.ADD, label: '新增' },
  { value: OPT_TYPE_ENUM.SELECTING, label: '选款中' },
  { value: OPT_TYPE_ENUM.RE_SELECTING, label: '重新选款' },
  { value: OPT_TYPE_ENUM.CANCELED, label: '已取消' },
  { value: OPT_TYPE_ENUM.WAIT_QUOTE, label: '报价' },
  { value: OPT_TYPE_ENUM.REJECT_QUOTE, label: '驳回报价' },
  { value: OPT_TYPE_ENUM.REJECT_SELECTION, label: '淘汰' },
  { value: OPT_TYPE_ENUM.ALREADY_SELECTION, label: '选款' },
  { value: OPT_TYPE_ENUM.CONFIRM, label: '确认报价' },
  { value: OPT_TYPE_ENUM.REMOVE, label: '删除' },
  { value: OPT_TYPE_ENUM.RE_QUOTE, label: '重新报价' },
];
