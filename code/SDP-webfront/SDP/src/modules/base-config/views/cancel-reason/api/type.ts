// 操作日志数据结构
export interface ICancelReasonPageLogListItem {
  /**
   * 日志id
   */
  id: string;
  /**
   * 业务id(选中的业务)
   */
  buzId: string;
  /**
   * 业务类型
   */
  buzType: string;
  /**
   * 操作说明
   */
  content: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 创建人名称
   */
  creatorName: string;
  /**
   * 是否删除 0 否  1 是
   */
  isDeleted: string;
}
// 取消原因数据结构
export interface ICancelReasonPageListItem {
  /**
   * 取消原因的id
   */
  id: string;
  /**
   * 取消的原因
   */
  cancelReason: string;
  /**
   * 是否收费 0 否   1 是
   */
  isCharge: string;
  /**
   * 状态是否启用 0 否  1 是
   */
  isEnabled: string;
  /**
   * 状态名称
   */
  isEnabledName?: string;
  /**
   * 操作日志
   */
  logList: ICancelReasonPageLogListItem[];
  /**
   * 最新一条操作日志
   */
  logStrFirst: string;
}
// 取消原因请求数据结构
export interface ICancelReasonPageReq {
  /**
   * 取消原因
   */
  cancelReason?: string;
  /**
   * 状态是否启用 0 否  1是
   */
  isEnabled?: string;
  /**
   * 创建时间的开始日期
   */
  createdTimeBegin?: string | number;
  /**
   * 创建时间的结束日期
   */
  createdTimeEnd?: string | number;
  /**
   * 分页页码
   */
  pageNum?: number;
  /**
   * 分页数量
   */
  pageSize?: number;
  /**
   * 创建时间
   */
  createdTime?: string[] | number[];
  /**
   * 状态
   */
  status?: string;
}
// 取消原因获取数据结构
export interface ICancelReasonPageRes {
  /**
   * 分页页码
   */
  page: string;
  /**
   * 总数量
   */
  total: string;
  /**
   * 返回的列表数据
   */
  list: ICancelReasonPageListItem[];
}
// 修改取消原因请求数据结构
export interface ICancelReasonChangeStatusReq {
  /**
   * 选中的数据id列表
   * 变量名与useHandleClose中对应
   */
  ids: string[];
  /**
   * 状态是否启用 0 否  1 是
   * 变量名与useHandleClose中对应
   */
  enabled: string;
}
// 添加取消原因请求数据结构
export interface ICancelReasonAddReq {
  /**
   * 取消原因
   */
  cancelReason: string;
  /**
   * 是否收费 0 否  1 是
   */
  isCharge: string;
}
// 更新取消原因请求数据结构
export interface ICancelReasonUpdateReq {
  /**
   * 选中的数据id列表
   * 变量名与useHandleClose中对应
   */
  id: string;
  /**
   * 取消原因
   */
  cancelReason: string;
  /**
   * 是否收费 0 否  1 是
   */
  isCharge: string;
}
