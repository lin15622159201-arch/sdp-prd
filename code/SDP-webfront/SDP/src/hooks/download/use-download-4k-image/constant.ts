// 4K任务模型：FLOWER_PATTERN_EXTRACT-花型提取，SMART_DESIGN-智能设计生图，DRESS_UP-服装上身图
export enum HD_TASK_MODE {
  FLOWER_PATTERN_EXTRACT = 'FLOWER_PATTERN_EXTRACT',
  SMART_DESIGN = 'SMART_DESIGN',
  DRESS_UP = 'DRESS_UP',
  DESIGN_MATERIAL = 'DESIGN_MATERIAL',
  TRY_ON = 'TRY_ON',
}

//  任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；
export enum TASK_STATUS_ENUM {
  QUEUE = 0,
  GENERATING = 10,
  STOP = 20,
  COMPLETED = 30,
  FAILED = 50,
  TIMEOUT_FAILED = 60,
}

export const TASK_STATUS_LIST = [
  { label: '排队中', value: TASK_STATUS_ENUM.QUEUE },
  { label: '生成中', value: TASK_STATUS_ENUM.GENERATING },
  { label: '已中止', value: TASK_STATUS_ENUM.STOP },
  { label: '已完成', value: TASK_STATUS_ENUM.COMPLETED },
  { label: '失败', value: TASK_STATUS_ENUM.FAILED },
  { label: '超时失败', value: TASK_STATUS_ENUM.TIMEOUT_FAILED },
];
