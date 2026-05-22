import { THREE_D_COLLECTION_TASK_STATUS_ENUM, THREE_D_PURCHASE_STATUS_ENUM } from '../constant';

// ⬇️ 分页查询同步的3D采集任务请求体 接口：https://yapi.tiangong.site/project/37/interface/api/3798

/**
 * 请求参数对象
 */
export interface IDimensionGleanQueryByPageReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 3D采集任务编号
   */
  gleanCode?: string;
  gleanState?: THREE_D_COLLECTION_TASK_STATUS_ENUM;
  /**
   * skc编码(客户款号)
   */
  customerStyleCode?: string;
  /**
   * sku编码
   */
  skuCode?: string;
  /**
   * 设计师ID
   */
  designerId?: string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 采购状态 1010待开单,1030待处理,1070已签收,1080取消中,1110已关闭
   */
  purchaseState?: THREE_D_PURCHASE_STATUS_ENUM;
  /**
   * 3D采集任务完成时间开始
   */
  gleanTaskFinishTimeStart?: string;
  /**
   * 3D采集任务完成时间结束
   */
  gleanTaskFinishTimeEnd?: string;
}
// ⬆️ 分页查询同步的3D采集任务请求体

// ⬇️ 分页查询同步的3D采集任务响应体 接口：https://yapi.tiangong.site/project/37/interface/api/3798
export interface IDimensionGleanQueryByPageRes {
  page: string;
  total: string;
  list: IDimensionGleanQueryByPageResListItem[];
}
export interface IDimensionGleanQueryByPageResListItem {
  /**
   * 记录ID
   */
  id: string;
  /**
   * 中台的3D采集任务ID
   */
  gleanId: string;
  /**
   * 中台的采集任务编号
   */
  gleanCode: string;
  /**
   * 中台的采集任务状态0待领取,1待采集,2采集中,3已采集,4已关闭
   * 参考 tech.tiangong.sdp.design.enums.DimensionGleanTaskStateEnum
   */
  gleanState: THREE_D_COLLECTION_TASK_STATUS_ENUM;
  /**
   * 中台的采集任务状态描述
   */
  gleanStateDesc: string;
  /**
   * 商品code
   */
  commodityCode: string;
  /**
   * 任务领取人名字
   */
  taskTaker: string;
  /**
   * 设计师ID
   */
  designerId: string;
  /**
   * 设计师名称
   */
  designerName: string;
  /**
   * 客户款号
   */
  customerStyleCode: string;
  /**
   * 3D采集任务创建时间
   */
  taskCreatedTime: string;
  /**
   * 3D采集任务完成时间
   */
  taskFinishTime: string;
  /**
   * sku编码
   */
  skuCode: string;
  /**
   * 设计图片
   */
  designPictureList: string[];
  /**
   * 色号
   */
  colorCode: string;
  /**
   * 履约的采购单ID
   */
  purchaseId: string;
  /**
   * 履约的采购单号
   */
  purchaseCode: string;
  /**
   * 履约的采购状态 1010待开单,1030待处理,1070已签收,1080取消中,1110已关闭
   * 参考：tech.tiangong.sdp.design.enums.DimensionGleanPurchaseStateEnum
   */
  purchaseState: THREE_D_PURCHASE_STATUS_ENUM;
  /**
   * 履约的采购状态
   */
  purchaseStateDesc: string;
  /**
   * 采购数量
   */
  quantity: string;
  /**
   * 剪版进价
   */
  cuttingPurchasePrice: string;
  /**
   * 散剪价(足米价*散剪倍率)，其中散剪倍率是取JV这边的字典配置
   * 计算逻辑由中台处理，JV直接保存结果，确保两边精度一致，
   */
  scatteredCuttingPrice: string;
  /**
   * 散剪价单位
   */
  scatteredCuttingUnit: string;
  /**
   * 剪版费用(散剪价*采购数量)
   * 计算逻辑由中台处理，JV直接保存结果，确保两边精度一致，
   */
  cuttingFee: string;
  /**
   * 采购单创建时间
   */
  purchaseCreateTime: string;
  /**
   * 采购单更新时间
   */
  purchaseRevisedTime: string;
}
// ⬆️ 分页查询同步的3D采集任务响应体

// ⬇️ 按采集任务状态统计3D采集任务数量响应体 接口：https://yapi.tiangong.site/project/37/interface/api/3910
export interface IDimensionGleanCountByStateItem {
  /**
   * 中台的采集任务状态0待领取,1待采集,2采集中,3已采集,4已关闭
   */
  gleanState: THREE_D_COLLECTION_TASK_STATUS_ENUM;
  /**
   * 任务状态描述
   */
  gleanStateDesc: string;
  /**
   * 数量
   */
  count: string;
}
// ⬆️ 按采集任务状态统计3D采集任务数量响应体
