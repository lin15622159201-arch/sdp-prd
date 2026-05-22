// ⬇️ 发起 样衣部位规范识别请求任务请求体 接口：https://yapi.tiangong.site/project/1650/interface/api/9699
export interface IReqBodyPoseCheckReq {
  /**
     * 允许同时提交一个或多个识别任务
     */
  tasks?: IReqBodyPoseCheckReqTasksItem[];
  /**
     * 识别任务的名称
     */
  taskName?: string;
  /**
     * 调用方名称，进行后续报表相关统计
     */
  caller?: string;
  /**
     * 回调接口，留空则不回调
     */
  callback?: string;
  /**
     * 非必填，暂时无效）任务优先级，可选值1,2，默认为1，1为常规优先级，插入队尾排队；2为高优先级，插入队列头部优先处理
     */
  priority?: number;
}
export interface IReqBodyPoseCheckReqTasksItem {
  /**
     * 图片ID （传图片地址）
     */
  id: string;
  /**
     * 图片URL
     */
  url: string;
  extra?: IReqBodyPoseCheckReqExtra;
}
/**
   * 额外字段
   */
export interface IReqBodyPoseCheckReqExtra {
  /**
     * 对应SKC
     */
  skc?: string;
  /**
     * 姿势，可选项：front，side，back，other 分别表示正面、侧面、背面、其他
     */
  orientation?: string;
}
// ⬆️ 发起 样衣部位规范识别请求任务请求体

// ⬇️ 发起 样衣部位规范识别请求任务响应体 接口：https://yapi.tiangong.site/project/1650/interface/api/9699
/**
   * 响应数据
   */
export interface IReqBodyPoseCheckRes {
  /**
     * 状态码，0为成功
     */
  code: string;
  /**
     * 状态信息
     */
  msg: string;
  data: IReqBodyPoseCheckResData;
}
/**
   * 提交任务结果
   */
export interface IReqBodyPoseCheckResData {
  /**
     * 提交成功的任务数量
     */
  submitSuccessCount: string;
}
// ⬆️ 发起 样衣部位规范识别请求任务响应体

// ⬇️ 获取 样衣部位规范识别结果请求体 接口：https://yapi.tiangong.site/project/1650/interface/api/9700
export interface IRespBodyPoseCheckReq {
  /**
     * 任务名称
     */
  taskName?: string;
  /**
     * 调用方名称
     */
  caller?: string;
  /**
     * 任务id
     */
  tasks: IRespBodyPoseCheckReqTasksItem[];
}
export interface IRespBodyPoseCheckReqTasksItem {
  /**
     * 图片id
     */
  id: string;
}
// ⬆️ 获取 样衣部位规范识别结果请求体

// ⬇️ 获取 样衣部位规范识别结果响应体 接口：https://yapi.tiangong.site/project/1650/interface/api/9700
/**
   * 响应数据
   */
export interface IRespBodyPoseCheckRes {
  /**
     * AI识别任务名称
     */
  taskName: string;
  /**
     * 识别任务列表
     */
  tasks: IRespBodyPoseCheckResTasksItem[];
}
export interface IRespBodyPoseCheckResTasksItem {
  /**
     * 图片id
     */
  id: string;
  /**
     * 图片地址
     */
  url: string;
  extra: IRespBodyPoseCheckResExtra;
  /**
     * 识别完成时间戳 秒级；如果任务未完成，该字段为-1
     */
  updateTimestamp: string;
  /**
     * 识别模型版本号
     */
  version: string;
  /**
     * 模型识别耗时 单位毫秒
     */
  costTime: string;
  aiRes: IRespBodyPoseCheckResAiRes;
}
/**
   * 入参的额外字段返回
   */
export interface IRespBodyPoseCheckResExtra {
  /**
     * 对应SKC
     */
  skc: string;
  /**
     * 姿势，可选项：front，side，back，other 分别表示正面、侧面、背面、其他
     */
  orientation: string;
}
/**
   * 识别结果 如果任务未完成，返回该字段为空
   */
export interface IRespBodyPoseCheckResAiRes {
  /**
     * 识别状态，0为正常，其他为处理失败，失败信息见msg
     */
  code: string;
  /**
     * 如果识别成功，该字段为空
     */
  msg: string;
  /**
     * 识别结果
     */
  resData: IRespBodyPoseCheckResResDataItem[];
}
export interface IRespBodyPoseCheckResResDataItem {
  /**
     * 是否通过，0为不通过，1为通过
     */
  checkPass: string;
  /**
     * 缺失的部位列表，如Left_arm
     */
  missing: string[];
}
// ⬆️ 获取 样衣部位规范识别结果响应体
