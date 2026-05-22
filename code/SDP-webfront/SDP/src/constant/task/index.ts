import { IOption } from '@/types';

/**
 * 任务来源 TODO: 待补充完善其他来源（用到时补充）
 */
export enum TASK_SOURCE_ENUM {
  /** 款式管理 */
  STYLE = 'prototype_manage',
  /** 现货管理 */
  SPOT_STYLE = 'spot_style',
}

export const TASK_SOURCE_LIST = [
  { label: '款式管理', value: TASK_SOURCE_ENUM.STYLE },
  { label: '现货管理', value: TASK_SOURCE_ENUM.SPOT_STYLE },
];

/**
 * 通用任务状态枚举-EN
 */
export enum TASK_STATUS_EN_ENUM {
  /**
   * 生成中
   */
  GENERATING = 'GENERATING',
  /**
   * 已中止
   */
  ABORTED = 'ABORTED',
  /**
   * 已完成
   */
  COMPLETED = 'COMPLETED',
  /**
   * 失败
   */
  FAILED = 'FAILED',
  /**
   * 排队中
   */
  QUEUEING = 'QUEUEING',
}
/**
 * 通用任务状态列表
 */
export const TASK_STATUS_EN_LIST = [
  {
    value: TASK_STATUS_EN_ENUM.QUEUEING,
    label: '排队中',
    style: 'primary',
  },
  {
    value: TASK_STATUS_EN_ENUM.GENERATING,
    label: '生成中',
    style: 'warning',
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
 * 通用任务状态枚举-数字
 */
export enum TASK_STATUS_ENUM {
  /**
   * 排队中
   */
  QUEUEING = 0,
  /**
   * 生成中
   */
  GENERATING = 10,
  /**
   * 已中止
   */
  ABORTED = 20,
  /**
   * 已完成
   */
  COMPLETED = 30,
  /**
   * 失败
   */
  FAILED = 50,
  /**
   * 超时失败
   */
  TIMEOUT = 60,
}
/**
 * 通用任务状态列表
 */
export const TASK_STATUS_LIST: IOption<TASK_STATUS_ENUM>[] = [
  {
    value: TASK_STATUS_ENUM.QUEUEING,
    label: '排队中',
    style: 'primary',
  },
  {
    value: TASK_STATUS_ENUM.GENERATING,
    label: '生成中',
    style: 'warning',
  },
  {
    value: TASK_STATUS_ENUM.COMPLETED,
    label: '已生成',
    style: 'success',
  },
  {
    value: TASK_STATUS_ENUM.ABORTED,
    label: '已中止',
    style: 'info',
  },
  {
    value: TASK_STATUS_ENUM.FAILED,
    label: '生成失败',
    style: 'danger',
  },
  {
    value: TASK_STATUS_ENUM.TIMEOUT,
    label: '超时失败',
    style: 'danger',
  },
];
/**
 * 任务类型枚举
 */
export enum TASK_TYPE_ENUM {
  /** 虚拟换衣 */
  VIRTUAL_TRY_ON = 'fashion_virtual_try_on',
  /** 姿势裂变 */
  POSE_FISSION = 'posture_Fission',
  /** AI设计 */
  AI_DESIGN = 'ai_design',
  /** 风格化衍生 */
  STYLE_GEN = 'style_gen',
  /** 花型上身 */
  PATTERN_APPLY = 'floral_pattern_apply',
  /** 局部改款 */
  REDESIGN = 'redesign',
  /** 花型提取 */
  PATTERN_EXTRACTION = 'pattern_extraction',
  /** 四方连续 */
  SEAMLESS_PATTERN = 'seamless_pattern',
  /** 图片超清upscale */
  UPSCALE = 'upscale',
  /** 服装换色 */
  REPLACE_COLOR = 'replace_color',
  /** 图案修复 */
  IMAGE_REPAIR = 'image_repair',
  /** 图片更新 */
  IMAGE_UPDATE = 'image_update',
  /** 现货管理 */
  SPOT_STYLE = 'spot_style',
  /** 款式管理 */
  STYLE = 'prototype_manage',
}

/**
 * 任务类型列表
 */
export const TASK_TYPE_LIST = [
  { label: '虚拟换衣', value: TASK_TYPE_ENUM.VIRTUAL_TRY_ON },
  { label: '姿势裂变', value: TASK_TYPE_ENUM.POSE_FISSION },
  { label: '图片更新', value: TASK_TYPE_ENUM.IMAGE_UPDATE },
];
