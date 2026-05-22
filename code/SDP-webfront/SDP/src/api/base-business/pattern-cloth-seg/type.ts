import { TASK_STATUS_ENUM } from '@/constant/task';

/**
 * 花型服装分割任务-详情
 */
export type IPatternClothSegDetailRes = {
  /** 任务ID */
  taskId: number;
  /** 任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败； */
  taskStatus: TASK_STATUS_ENUM;
  /** 任务进度0-100 */
  taskProgress: number;
  /** 排队位置 */
  rankPosition: number;
  /** 消息备注 */
  message: string;
  /** 处理失败模型 */
  failTaskMode: string;
  /** AI开始处理时间 */
  aiStartTime: string;
  /** AI结束处理时间 */
  aiEndTime: string;
  /** 创建时间 */
  createdTime: string;
  /** 推送时间 */
  pushTime: string;
  /** 参考图url */
  refImgUrl: string;
  /** 待提取区域 */
  region: string;
  /** 生成图（多张逗号,隔开） */
  resImgs: string;
  /** 业务主键ID */
  busId: number;
};
/**
 * 换装区域枚举
 */
export enum REPLACE_REGION_ENUM {
  /** 上装 */
  TOP = 'top garment',
  /** 下装 */
  BOTTOM = 'bottom garment',
  /** 连体装 */
  ONE_PIECE = 'one-piece garment'
}
/**
 * 花型服装分割任务-创建请求
 */
export type IPatternClothSegCreateReq = {
  /** 参考图url */
  refImgUrl: string;
  /** 待分割区域 */
  region: REPLACE_REGION_ENUM;
};
/**
 * 花型服装分割任务-创建响应
 */
export type IPatternClothSegCreateRes = string;
