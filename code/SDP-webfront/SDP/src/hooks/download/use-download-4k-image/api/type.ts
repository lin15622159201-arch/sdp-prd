// ⬇️ 获取4K高清图请求体 接口：https://yapi.tiangong.site/project/20/interface/api/655

import { HD_TASK_MODE, TASK_STATUS_ENUM } from '../constant';

/**
 * UltraHdTaskReq
 */
export interface IUltraHdObtainReq {
  /**
   * 原始任务ID
   */
  originTaskId: string;
  /**
   * 4K任务模型：FLOWER_PATTERN_EXTRACT-花型提取，SMART_DESIGN-智能设计生图，DRESS_UP-服装上身图, TRY_ON-虚拟换衣
   */
  taskMode: HD_TASK_MODE;
  /**
   * 图片ID
   */
  pictureId: string;
  /**
   * 图片url
   */
  pictureUrl: string;
}
// ⬆️ 获取4K高清图请求体

// ⬇️ 获取4K高清图响应体 接口：https://yapi.tiangong.site/project/20/interface/api/655
export interface IUltraHdObtainRes {
  /**
   * 任务ID
   */
  taskId: string;
  /**
   * 任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；
   */
  taskStatus: TASK_STATUS_ENUM;
  /**
   * 任务进度0-100
   */
  taskProgress: string;
  /**
   * 排队位置
   */
  rankPosition: string;
  /**
   * 消息备注
   */
  message: string;
  /**
   * 处理失败模型
   */
  failTaskMode: string;
  /**
   * AI开始处理时间
   */
  aiStartTime: string;
  /**
   * AI结束处理时间
   */
  aiEndTime: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 推送时间
   */
  pushTime: string;
  /**
   * 原始任务ID
   */
  originTaskId: string;
  /**
   * 4K任务模型：FLOWER_PATTERN_EXTRACT-花型提取，SMART_DESIGN-智能设计生图
   */
  taskMode: HD_TASK_MODE;
  /**
   * 图片ID
   */
  pictureId: string;
  /**
   * 图片url
   */
  pictureUrl: string;
  /**
   * 生成图
   */
  resImg: string;
}
// ⬆️ 获取4K高清图响应体
