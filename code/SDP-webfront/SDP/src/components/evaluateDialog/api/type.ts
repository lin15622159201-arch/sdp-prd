/**
 * 保存 请求参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/100048
 */
export interface ImageGroupProblemFeedbackSaveReq {
  /** 图组ID */
  groupNum?: number;
  /** 任务ID */
  taskId?: number;
  /** 问题反馈信息列表 */
  problemFeedbackList?: ImageGroupProblemFeedbackSaveReqProblemFeedbackListItem[];
  /** 补充图片 */
  supplementPictureList?: string[];
  /** 补充描述 */
  description?: string;
  url?: string;
}

/**
 * 问题反馈信息列表
 */
export interface ImageGroupProblemFeedbackSaveReqProblemFeedbackListItem {
  /** 标签名 */
  name?: string;
  /** 标签编号 */
  code?: string;
  /** 标签值列表 */
  values?: ImageGroupProblemFeedbackSaveReqValuesItem2[];
}

/**
 * 注释
 */
export interface ImageGroupProblemFeedbackSaveReqValuesItem2 {
  /** 标签名 */
  name?: string;
  /** 标签编号 */
  code?: string;
  /** 标签值列表 */
  values?: ImageGroupProblemFeedbackSaveReqValuesItem[];
}

/**
 * 注释
 */
export interface ImageGroupProblemFeedbackSaveReqValuesItem {
}

/**
 * 保存 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/100048
 */
export interface ImageGroupProblemFeedbackSaveRes {
}
