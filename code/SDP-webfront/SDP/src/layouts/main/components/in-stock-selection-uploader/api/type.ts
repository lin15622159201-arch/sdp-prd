import { BATCH_STATUS } from '../constant';

// ⬇️ 选款批次列表查询请求体 接口：https://yapi.tiangong.site/project/93/interface/api/5206
export interface IBatchPageReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 批次ID集合
   */
  batchIds?: string[];
  /**
   * 文件名称
   */
  fileName?: string;
  /**
   * 批次状态：0-待处理；10-处理中；20-已中止；30-已完成；60-失败；
   */
  batchStatus?: BATCH_STATUS;
  /**
   * 创建人
   */
  creatorId?: string;
  /**
   * 创建人
   */
  creatorName?: string;
  /**
   * 创建时间-开始
   */
  createdStartTime?: string;
  /**
   * 创建时间-结束
   */
  createdEndTime?: string;
  /**
   * 租户id
   */
  tenantId?: string;
}
// ⬆️ 选款批次列表查询请求体

// ⬇️ 选款批次列表查询响应体 接口：https://yapi.tiangong.site/project/93/interface/api/5206
export interface IBatchPageRes {
  pageNum: string;
  total: string;
  list: IBatchPageResListItem[];
}
export interface IBatchPageResListItem {
  /**
   * 批次ID
   */
  batchId: string;
  /**
   * 批次名称
   */
  batchName: string;
  /**
   * 批次编码
   */
  batchCode: string;
  /**
   * 导入类型
   */
  importType: string;
  /**
   * OSS地址
   */
  ossUrl: string;
  /**
   * 文件名称
   */
  fileName: string;
  /**
   * 文件大小
   */
  fileSize: string;
  /**
   * 批次状态：0-待处理；10-处理中；20-已中止；30-已完成；60-失败；
   */
  batchStatus: BATCH_STATUS;
  /**
   * 提示信息
   */
  message: string;
  /**
   * 创建人 id
   */
  creatorId: string;
  /**
   * 创建人 名称
   */
  creatorName: string;
  /**
   * 创建时间
   */
  createdTime: string;
}
// ⬆️ 选款批次列表查询响应体
