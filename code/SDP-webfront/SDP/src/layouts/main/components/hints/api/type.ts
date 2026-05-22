import { MY_TASK_STATUS_ENUM, MY_TASK_TYPE_ENUM } from '../constant';

// ⬇️ 我的队列响应体 接口：https://yapi.tiangong.site/project/20/interface/api/668
export interface IProcessingListRes {
  /**
   * 总任务队列数量
   */
  total: string;
  /**
   * 展示任务队列数量
   */
  show: string;
  /**
   * 隐藏任务队列数量
   */
  hide: string;
  /**
   * 队列列表
   */
  queueList: IProcessingListResQueueListItem[];
}
export interface IProcessingListResQueueListItem {
  /**
   * 队列ID
   */
  queueId: string;
  /**
   * 任务队列类型：10100-花型提取；10101-AI设计
   */
  type: MY_TASK_TYPE_ENUM;
  /**
   * 任务队列类型名称（花型提取，AI设计。。。）
   */
  typeName: string;
  /**
   * 任务ID
   */
  taskId: string;
  /**
   * 业务ID
   */
  busId: string;
  /**
   * 业务编号
   */
  busCode: string;
  /**
   * 任务状态：0-排队中；10-生成中；
   */
  taskStatus: MY_TASK_STATUS_ENUM;
  /**
   * 排队位置
   */
  rankPosition: string;
  /**
   * 预计等待时间（秒）
   */
  estimateTime: string;
}
// ⬆️ 我的队列响应体

// ⬇️ 我的完成队列响应体 接口：https://yapi.tiangong.site/project/20/interface/api/669
export interface ICompletedListItem {
  /**
   * 队列ID
   */
  queueId: string;
  /**
   * 任务队列类型：10100-花型提取；10101-AI设计
   */
  type: MY_TASK_TYPE_ENUM;
  /**
   * 任务队列类型名称（花型提取，AI设计。。。）
   */
  typeName: string;
  /**
   * 任务ID
   */
  taskId: string;
  /**
   * 业务ID
   */
  busId: string;
  /**
   * 业务编号
   */
  busCode: string;
  /**
   * 任务状态：30-已完成；
   */
  taskStatus: string;
}
// ⬆️ 我的完成队列响应体
