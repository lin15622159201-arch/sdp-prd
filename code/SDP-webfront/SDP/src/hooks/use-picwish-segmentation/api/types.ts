import { TASK_STATE_ENUM, TASK_TYPE_ENUM } from '../constant';

/**
 * 佐糖图片识别分割
 * yapi地址：https://yapi.tiangong.site/project/20/interface/api/656
 */
export interface ISegmentationTaskCreateReq {
  /**
   * 上传的图片url
   */
  refImgUrl: string;
  /**
   * 分割图类型 1:上传图，2：细节识别图
   */
  taskType: TASK_TYPE_ENUM;
}

/**
 * 佐糖图片识别任务详情
 * yapi地址：https://yapi.tiangong.site/project/20/interface/api/675
 */
export interface ISegmentationTaskDetailReq {
  /**
   * 分割任务id
   */
  taskId: string;
}

export interface ISegmentationTaskDetailRes {
  /**
   * 业务主键id
   */
  taskId: string;
  /**
   *  任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；
   */
  taskStatus: TASK_STATE_ENUM;
  classMask: ISegmentationTaskDetailResClassMask;
  /**
   * 佐糖clothes_masks图片文件数组
   */
  clothesMaskList: ISegmentationTaskDetailResClothesMaskListItem[];
}

export interface ISegmentationTaskDetailResClothesMaskListItem {
  /**
   * 图片URL
   */
  path: string;
}

export interface ISegmentationTaskDetailResClassMask {
  /**
   * 全身区域图url
   */
  clothes: string;
}
