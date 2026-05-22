/** 任务识别状态 */
export enum TASK_STATE_ENUM {
  /** 排队中 */
  QUEUING = 0,
  /** 生成中 */
  GENERATING = 10,
  /** 已中止 */
  ABORTED = 20,
  /** 已完成 */
  COMPLETED = 30,
  /** 失败 */
  FAILED = 50,
  /** 超时失败 */
  TIMEOUT_FAILED = 60,
}

export enum TASK_TYPE_ENUM {
  /** 上传图 */
  DEFAULT = '1',
  /** 细节图 */
  DETAIL = '2',
}
