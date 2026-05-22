export enum TASK_STATUS_ENUM {
  /**
   * 生成中
   */
  GENERATING = '10',
  /**
   * 已完成
   */
  COMPLETED = '30',
  /**
   * 已中止
   */
  ABORTED = '20',
  /**
   * 失败
   */
  FAILED = '40',
  /**
   * 排队中
   */
  QUEUEING = '50',
}
