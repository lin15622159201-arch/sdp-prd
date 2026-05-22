export enum EXCEPTION_STEP_ENUMS {
  ALL = '',
  PENDING = '1',
  REJECTED_WAIT_REVIEW = '2',
  REJECTED = '3',
  PROCESSING = '4',
  CLOSE_PENDING_REVIEW = '5',
  CANCELLED = '6',
  CLOSED = '7',
}

export const EXCEPTION_STEP_LIST = [
  { value: EXCEPTION_STEP_ENUMS.ALL, label: '全部' },
  { value: EXCEPTION_STEP_ENUMS.PENDING, label: '待处理' },
  { value: EXCEPTION_STEP_ENUMS.PROCESSING, label: '处理中' },
  { value: EXCEPTION_STEP_ENUMS.REJECTED_WAIT_REVIEW, label: '驳回待审核' },
  { value: EXCEPTION_STEP_ENUMS.CLOSE_PENDING_REVIEW, label: '结案待审核' },
  { value: EXCEPTION_STEP_ENUMS.REJECTED, label: '已驳回' },
  { value: EXCEPTION_STEP_ENUMS.CLOSED, label: '已结案' },
  { value: EXCEPTION_STEP_ENUMS.CANCELLED, label: '已取消' },
];

/* 异常-取消环节 */
export const EXCEPTION_CANCEL_STEP_LIST = [
  { value: EXCEPTION_STEP_ENUMS.PENDING, label: '待处理' }, // 1
  { value: EXCEPTION_STEP_ENUMS.REJECTED, label: '已驳回' }, // 3
  { value: EXCEPTION_STEP_ENUMS.PROCESSING, label: '处理中' }, // 4
  { value: EXCEPTION_STEP_ENUMS.REJECTED_WAIT_REVIEW, label: '驳回待审核' }, // 2
  { value: EXCEPTION_STEP_ENUMS.CLOSE_PENDING_REVIEW, label: '结案待审核' }, // 5
  { value: EXCEPTION_STEP_ENUMS.CLOSED, label: '已结案' }, // 7

];

/* 打版类型 */
export enum EXCEPTION_SAMPLE_TYPE_ENUM {
  BIG = '1',
  NORMAL = '2',
  REPLACE = '3',
  REDO = '4',
}
export const EXCEPTION_SAMPLE_TYPE_LIST = [
  { value: EXCEPTION_SAMPLE_TYPE_ENUM.BIG, label: '大货打版' },
  { value: EXCEPTION_SAMPLE_TYPE_ENUM.NORMAL, label: '正常打版' },
  { value: EXCEPTION_SAMPLE_TYPE_ENUM.REPLACE, label: '复色打版' },
  { value: EXCEPTION_SAMPLE_TYPE_ENUM.REDO, label: '补做打版' },
];

/* 备注的业务类型 */
export enum REMARK_BIZ_TYPE_ENUMS {
  SAMPLE_CLOTHES = '1',
  ANOMALY = '2',
  REPAIR = '3',
  SECOND_CRAFT = '4',
}
export const REMARK_BIZ_TYPE_LIST = [
  { value: REMARK_BIZ_TYPE_ENUMS.SAMPLE_CLOTHES, label: '打版' },
  { value: REMARK_BIZ_TYPE_ENUMS.ANOMALY, label: '异常' },
  { value: REMARK_BIZ_TYPE_ENUMS.REPAIR, label: '返修' },
  { value: REMARK_BIZ_TYPE_ENUMS.SECOND_CRAFT, label: '二次工艺' },
];

/* 操作记录的业务类型 */
export enum LOG_BIZ_TYPE_ENUMS {
  ANOMALY = '1',
  REPAIR = '2',
  SECOND_CRAFT = '5',
}
export const LOG_BIZ_TYPE_LIST = [
  { value: LOG_BIZ_TYPE_ENUMS.ANOMALY, label: '异常' },
  { value: LOG_BIZ_TYPE_ENUMS.REPAIR, label: '返修' },
  { value: LOG_BIZ_TYPE_ENUMS.SECOND_CRAFT, label: '二次工艺' },
];

export enum STYLE_REFER_TYPE_ENUM {
  REFER = '1',
  DERI = '2',
}

/* 返修责任方 */
export enum REPAIR_DUTY_PARTY_ENUMS {
  ROOM_REASON = '1',
  DESIGNER_REASON = '2',
  CUSTOMER_REQUIREMENTS = '3',
  FABRIC_REASON = '4',
}
export const REPAIR_DUTY_PARTY_LIST = [
  { value: REPAIR_DUTY_PARTY_ENUMS.ROOM_REASON, label: '版房原因' },
  { value: REPAIR_DUTY_PARTY_ENUMS.DESIGNER_REASON, label: '设计师原因' },
  { value: REPAIR_DUTY_PARTY_ENUMS.CUSTOMER_REQUIREMENTS, label: '客户要求' },
  { value: REPAIR_DUTY_PARTY_ENUMS.FABRIC_REASON, label: '面辅料履约' },
];

export enum PATTERN_SEW_COMBINE_ENUM {
  /** 纸样 */
  PATTERN = '1',
  /** 车版 */
  SEW = '2',
  /* 3D */
  THREE_DIMENSION = '3',
  /* 默认 */
  DEFAULT = '',
}
export const PATTERN_SEW_COMBINE_LIST = [
  { value: PATTERN_SEW_COMBINE_ENUM.PATTERN, label: '纸样' },
  { value: PATTERN_SEW_COMBINE_ENUM.SEW, label: '车版' },
  { value: PATTERN_SEW_COMBINE_ENUM.THREE_DIMENSION, label: '3D' },
];

export const TIME_CONSUMING_TEXT_LIST = [
  { value: PATTERN_SEW_COMBINE_ENUM.PATTERN, label: '预估纸样耗时' },
  { value: PATTERN_SEW_COMBINE_ENUM.SEW, label: '预估车版耗时' },
  { value: PATTERN_SEW_COMBINE_ENUM.THREE_DIMENSION, label: '预估3D耗时' },
  { value: PATTERN_SEW_COMBINE_ENUM.DEFAULT, label: '预估耗时' },
];

export const PATTERN_SEW_COMBINE_TYPE_LIST = [
  { value: PATTERN_SEW_COMBINE_ENUM.PATTERN, label: '纸样' },
  { value: PATTERN_SEW_COMBINE_ENUM.SEW, label: '车版' },
  { value: PATTERN_SEW_COMBINE_ENUM.THREE_DIMENSION, label: '3D' },
];

export const ALLOT_DIALOG_TEXT_LIST = [
  { value: PATTERN_SEW_COMBINE_ENUM.PATTERN, label: '该返修单为纸样的修改，请将单据分配给对应的纸样师！' },
  { value: PATTERN_SEW_COMBINE_ENUM.SEW, label: '该返修单为车版的修改，请将单据分配给对应的车版师！' },
];

export const ACTUAL_TIME_LIST = [
  { value: '0.5', label: '0.5' },
  { value: '1', label: '1' },
  { value: '1.5', label: '1.5' },
  { value: '2', label: '2' },
  { value: '2.5', label: '2.5' },
];
