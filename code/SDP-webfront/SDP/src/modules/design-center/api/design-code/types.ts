/**
 * 打版日志
 * @see https://yapi.ibaibu.com/project/1650/interface/api/91892
 *
 * @请求方法: GET
 * @请求地址: /sdp-sample-clothes/web/v1/log/sample-clothes/list
 * @更新时间: 2021-09-08 09:50:30
 */
export type ISampleClothesLogListReq = Record<string, unknown>;
export type ISampleClothesLogListRes = ISampleClothesLogListItem[];
export interface ISampleClothesLogListItem {
  /**
   * 日志id
   */
  logId: string;
  /**
   * 业务id
   */
  bizId: string;
  /**
   * 业务类型
   */
  bizType: string;
  /**
   * 样衣打版id
   */
  clothesId: string;
  /**
   * 日志信息
   */
  content: string;
  /**
   * 操作人id
   */
  creatorId: string;
  /**
   * 操作人名称
   */
  creatorName: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 租户id
   */
  tenantId: string;
  /**
   * 租户名称
   */
  tenantName: string;
}
