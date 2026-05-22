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
