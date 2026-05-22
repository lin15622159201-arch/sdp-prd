import { LOOP_TASK_STATE } from '../constant';

// ⬇️ 创建分割图请求体 接口：https://yapi.tiangong.site/project/519/interface/api/28031
export interface IV1CreateSplitTaskReq {
  /**
   * 基础图片
   */
  splitBasePicture: string;
  /**
   * 图片MD5
   */
  md5Code: string;
  /** 任务类型(分割图:1000【默认】,背景虚化：1100)  */
  taskType?: string;
}
// ⬆️ 创建分割图请求体

// ⬇️ 创建分割图响应体 接口：https://yapi.tiangong.site/project/519/interface/api/28031
export interface IV1CreateSplitTaskRes {
  /**
   * 主键
   */
  id: string;
  /**
   * 任务编号ID
   */
  taskId: string;
  /**
   * md5值用来区分是否是同一张图片
   */
  md5Code: string;
  /**
   * 基础素材图片
   */
  splitBasePicture: string;
  /**
   * 分割图片
   */
  splitPicture: string;
  /**
   * 0:未下发 1已下发
   */
  status: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 更新人id
   */
  reviserId: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 更新时间
   */
  revisedTime: string;
  /**
   * 逻辑删除 0 否 1是
   */
  isDeleted: string;
}
// ⬆️ 创建分割图响应体

// ⬇️ 创建请求体 接口：https://yapi.tiangong.site/project/20/interface/api/563
/**
 * WatermarkReq
 */
export interface IWatermarkCreateReq {
  /**
   * 参考图url
   */
  refImgUrl: string;
  /**
   * Mark图
   */
  maskUrl: string;
}
export interface IWatermarkCreateReqRectangleListItem {
  /**
   * X坐标起点
   */
  xmin: number;
  /**
   * Y坐标起点
   */
  ymin: number;
  /**
   * X坐标终点
   */
  xmax: number;
  /**
   * Y坐标终点
   */
  ymax: number;
}
// ⬆️ 创建请求体

// ⬇️ 创建响应体 接口：https://yapi.tiangong.site/project/20/interface/api/563
export type IWatermarkCreateRes = string;
// ⬆️ 创建响应体

// ⬇️ 详情响应体 接口：https://yapi.tiangong.site/project/20/interface/api/564
export interface IPicwishWatermarkRes {
  /**
   * 任务ID
   */
  taskId: string;
  /**
   * 任务状态：0-排队中；10-生成中；20-已中止；30-已完成；40-无效；50-失败；60-超时失败；
   */
  taskStatus: LOOP_TASK_STATE;
  /**
   * 任务进度0-100
   */
  taskProgress: string;
  /**
   * 消息备注
   */
  message: string;
  /**
   * 参考图url
   */
  refImgUrl: string;
  /**
   * 去水印矩形区域坐标列表
   */
  rectangleList: IPicwishWatermarkResRectangleListItem[];
  /**
   * 生成图
   */
  resImg: string;
}
export interface IPicwishWatermarkResRectangleListItem {
  /**
   * X坐标起点
   */
  xmin: string;
  /**
   * Y坐标起点
   */
  ymin: string;
  /**
   * X坐标终点
   */
  xmax: string;
  /**
   * Y坐标终点
   */
  ymax: string;
}
// ⬆️ 详情响应体
