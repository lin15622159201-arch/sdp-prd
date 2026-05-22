export enum UPLOAD_STATUS {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const UPLOAD_STATUS_MAP = {
  [UPLOAD_STATUS.PENDING]: '上传中',
  [UPLOAD_STATUS.SUCCESS]: '上传成功',
  [UPLOAD_STATUS.ERROR]: '上传失败',
};

/**
 * 批次状态：0-待处理；10-处理中；20-已中止；30-已完成；50-失败； 60-超时失败；
 */
export enum BATCH_STATUS {
  PENDING = 0,
  PROCESSING = 10,
  STOPPED = 20,
  COMPLETED = 30,
  FAILED = 50,
  TIMEOUT_FAILED = 60,
}

export const BATCH_STATUS_MAP = {
  [BATCH_STATUS.PENDING]: '待处理',
  [BATCH_STATUS.PROCESSING]: '处理中',
  [BATCH_STATUS.STOPPED]: '已中止',
  [BATCH_STATUS.COMPLETED]: '已完成',
  [BATCH_STATUS.FAILED]: '导入失败',
  [BATCH_STATUS.TIMEOUT_FAILED]: '超时失败',
};
