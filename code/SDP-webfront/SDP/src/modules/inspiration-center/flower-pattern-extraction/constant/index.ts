import { TASK_STATUS_EN_ENUM } from '../../constant';

/**
 * 花型提取-任务状态
 */
export const FLOWER_PATTERN_TASK_STATUS_ENUM_LIST = [
  {
    value: TASK_STATUS_EN_ENUM.QUEUEING,
    label: '排队中',
    style: 'danger',
  },
  {
    value: TASK_STATUS_EN_ENUM.GENERATING,
    label: '生成中',
    style: 'danger',
  },
  {
    value: TASK_STATUS_EN_ENUM.COMPLETED,
    label: '已生成',
    style: 'success',
  },
  {
    value: TASK_STATUS_EN_ENUM.ABORTED,
    label: '已中止',
    style: 'info',
  },
  {
    value: TASK_STATUS_EN_ENUM.FAILED,
    label: '生成失败',
    style: 'danger',
  },
];

/**
 * 花型提取任务详情的轮询的taskStatus
 *  任务状态：0-排队中；10-生成中；20-已中止；30-已完成；40-无效；50-失败；60-超时失败；
 */
export const enum FLOWER_PATTERN_DETAIL_INT_TASK_STATUS_ENUM {
  /** 0-排队中 */
  QUEUEING = 0,
  /** 10-生成中 */
  GENERATING = 10,
  /** 20-已中止 */
  ABORTED = 20,
  /** 30-已完成 */
  COMPLETED = 30,
  /** 40-无效 */
  INVALID = 40,
  /** 50-失败 */
  FAILED = 50,
  /** 60-超时失败 */
  TIME_OUT_FAILED = 60,
}

export const FLOWER_PATTERN_EXTRACTION_CUSTOM_LEFT_TOOL_KEY = 'removeFlowerWrinkles';

// 提取区域：1-上半身；2-下半身；3-全身
export enum FLOWER_PATTERN_EXTRACTION_REGION_ENUM {
  /** 1-上半身 */
  UPPER_BODY = 1,
  /** 2-下半身 */
  LOWER_BODY = 2,
  /** 3-全身 */
  FULL_BODY = 3,
}

export const FLOWER_PATTERN_EXTRACTION_REGION_ENUM_LIST = [
  {
    value: FLOWER_PATTERN_EXTRACTION_REGION_ENUM.UPPER_BODY,
    label: '上半身',
  },
  {
    value: FLOWER_PATTERN_EXTRACTION_REGION_ENUM.LOWER_BODY,
    label: '下半身',
  },
  {
    value: FLOWER_PATTERN_EXTRACTION_REGION_ENUM.FULL_BODY,
    label: '全身',
  },
];
