import { TASK_STATUS_ENUM } from '../constant';

/**
 * 新增
 * yapi地址：https://yapi.textile-story.com/project/974/interface/api/75300
 */
export interface ISplitCreateReq {
  /**
   * 基础图片
   */
  splitBasePicture: string;
  /**
   * 图片MD5
   */
  md5Code: string;
  /**
   * 任务类型(分割图:1000【默认】,背景虚化：1100, SAM分割：1200)
   */
  taskType?: string;
}

/**
 * 详情
 * yapi地址：https://yapi.textile-story.com/project/974/interface/api/75292
 */
export interface IWebSplitReq {
  id: string;
}

export interface IWebSplitRes {
  /**
   * 主键
   */
  taskId?: string;
  /**
   * md5值用来区分是否是同一张图片
   */
  md5Code?: string;
  /**
   * 基础素材图片
   */
  splitBasePicture?: string;
  /**
   * 分割图片
   */
  splitPicture?: string;
  /**
   * sam masks json串
   */
  samMasks?: string;
  /**
   * 10：生成中，20：已中止 30：已完成,40：失败,50:排队中
   */
  taskStatus: TASK_STATUS_ENUM;
  /**
   * 备注信息
   */
  remark?: string;
  /**
   * 创建人姓名
   */
  creatorName?: string;
  /**
   * 创建时间
   */
  createdTime?: number;
  /**
   * 更新时间
   */
  revisedTime?: number;
  /**
   * 创建人Id
   */
  creatorId?: string;
  /**
   * 租户ID
   */
  companyId?: string;
  /**
   * 逻辑删除 0 否 1是
   */
  deleted?: string;
}
