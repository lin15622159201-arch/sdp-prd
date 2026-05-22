export enum MY_TASK_TYPE_ENUM {
  /*  花型提取  */
  FLOWER_PATTERN = 10100,
  /* AI任务设计 */
  AI_DESIGN = 10101,
}
export const MY_TASK_TYPE_LIST = [
  {
    label: '花型提取',
    value: MY_TASK_TYPE_ENUM.FLOWER_PATTERN,
  },
  {
    label: 'AI任务设计',
    value: MY_TASK_TYPE_ENUM.AI_DESIGN,
  },
];

export enum MY_TASK_STATUS_ENUM {
  /**
   * 排队中
   */
  QUEUED = 0,
  /**
   * 生成中
   */
  GENERATING = 10,
}
