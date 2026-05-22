import { LOG_BIZ_TYPE_ENUMS, REMARK_BIZ_TYPE_ENUMS } from '@/modules/clothes-center/constant';
import { EXCEPTION_STEP_ENUMS } from '../constant';

export interface IExceptionProcesStepItem {
  /**
   * 发起阶段环节code
   */
  exceptionProcessStep: string;
  /**
   * 发起环节 - 子节点的code
   */
  exceptionProcessNode: string;
  /**
   * 发起环节 - 子节点的类型-待提交/已提交的
   */
  exceptionProcessNodeState: string;
}
// 异常管理列表⬇️
export interface IExceptionPageReq {
  /**
   * 设计款号
   */
  designCodeLike?: string;
  /**
   * 技术组别
   */
  techniqueGroupList?: string[];
  /**
   * 异常类型(异常编码)
   */
  sampleClothingExceptionTypeList?: string[];
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType?: '1' | '2' | '3' | '4' | '';
  /**
   * 发起阶段
   */
  exceptionProcessStepList?: IExceptionProcesStepItem[];
  /**
   * 发起阶段-前端用的
   */
  exceptionProcessStepList2?: string[];
  /**
   * 设计师id【设计师】
   */
  designerIdList?: number[];
  /**
   * 设计组编号
   */
  designerGroupCodeList?: string[];
  /**
   * 纸样师id
   */
  patternMakerIdList?: number[];
  /**
   * 发起人
   */
  sponsorIdList?: number[];
  /**
   * 部门
   */
  departmentIdList?: string[];
  /**
   * 责任人
   */
  responsibleIdList?: number[];
  /**
   * 当前耗时-开始（精确到小时）
   */
  timeConsumingStart?: string;
  /**
   * 当前耗时-结束（精确到小时）
   */
  timeConsumingEnd?: string;
  /**
   * 创建时间-开始
   */
  createdTimeStart?: string;
  /**
   * 创建时间-结束
   */
  createdTimeEnd?: string;
  /**
   * 当前耗时排序
   */
  timeConsumingSort?: 'ascending' | 'descending' | '';
  /**
   * 取消时间-开始
   */
  cancelTimeStart?: string;
  /**
   * 取消时间-结束
   */
  cancelTimeEnd?: string;
  /**
   * 处理人ID
   */
  handlerIdList?: number[];
  /**
   * 取消人ID
   */
  cancelerIdList?: number[];
  /**
   * 取消环节
   */
  cancelProcessStepList?: number[];
  /**
   * 是否紧急
   */
  isUrgent?: string;
  /**
   * 是否取消
   */
  isCanceled?: string;
  /**
   * 异常环节
   */
  exceptionState: EXCEPTION_STEP_ENUMS;
  pageNum?: number;
  pageSize?: number;
}
export interface IExceptionPageListItem {
  /**
   * 异常id
   */
  exceptionId: number;
  /**
   * 异常单号,YC+（两位）年（两位）月（两位）日+3位流水号的异常记录
   */
  exceptionCode: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent: string;
  /**
   * 设计款号
   */
  designCode: string;
  /**
   * 图片
   */
  customerPictureList: string[];
  /**
   * 设计图片
   */
  designPictureList: string[];
  customerPicture: string;
  /**
   * 设计师id
   */
  designerId: string;
  /**
   * 设计师名称
   */
  designerName: string;
  /**
   * 纸样师id
   */
  patternMakerId: string;
  /**
   * 纸样师名称
   */
  patternMakerName: string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType: string;
  /**
   * 异常类型编码
   */
  exceptionTypeCode: string;
  /**
   * 异常类型名称
   */
  exceptionTypeName: string;
  /**
   * 发起人id
   */
  sponsorId: string;
  /**
   * 发起人姓名
   */
  sponsorName: string;
  /**
   * 发起阶段 sample_clothes.process_step的子集
   * <p>
   * 环节： 200: 纸样待分单、 230: 内部纸样-待进行、 250: 内部纸样-进行中、 270: 外部纸样-待接单、 290: 外部纸样-进行中、
   * * 300: 面辅料齐套、 400: 车版待分单、 410: 内部车版-裁剪进行中、 420: 内部车版-裁片二次工艺、 430: 内部车版-车缝待进行、
   * * 440: 内部车版-车缝-半成品二次工艺、 460: 内部车版-车缝进行中、 470: 内部车版-成品二次工艺、 500: 外部车版-待接单、
   * * 510: 外部车版-裁剪、 520: 外部车版-裁片二次工艺、 530: 外部车版-车缝待进行、 540: 外部车版-车缝-半成品二次工艺、
   * * 550: 外部车版-车缝进行中、 560: 外部车版-成品二次工艺、 570: 外部车版-送货、 580: 外部车版-收货、 600: 样衣质检、
   * * 610: 样衣审版、 620: 设计审版、 630: 用量维护、 640: 样衣核价、 650: 寄送样衣、 660: 客户审版
   */
  exceptionProcessStep: string;
  /**
   * 责任部门
   */
  responsibleDepartment: string;
  /**
   * 责任人id
   */
  responsibleId: string;
  /**
   * 责任人姓名
   */
  responsibleName: string;
  /**
   * 异常环节
   * （ 1：待处理，2：驳回待审核，3：已驳回，4：处理中，5；结案待审核，6：已取消，7：已结案）
   */
  exceptionState: string;
  /**
   * 环节创建时间（用于计算当前耗时【currentTime-processingStepCreatedTime】）
   */
  processingStepCreatedTime: string;
  /**
   * 当前时间
   */
  currentTime: string;
  /**
   * 拒绝驳回原因
   */
  rejectRejectedReason: string;
  /**
   * 拒绝结案原因
   */
  rejectFinishReason: string;
  /**
   * 驳回原因
   */
  rejectedReason: string;
  /**
   * 取消人id
   */
  cancelerId: string;
  /**
   * 取消人姓名
   */
  cancelerName: string;
  /**
   * 取消环节 sample_clothes.process_step的子集
   */
  cancelProcessStep: string;
  /**
   * 取消时间
   */
  cancelTime: string;
  /**
   * 取消原因
   */
  cancelReason: string;
  /**
   * 需求内容
   */
  intentionContent: string;
  /**
   * 原款-skc编码(需求引用款skc编码),自建SPU时无该字段
   */
  quoteDesignCode: string;
  /**
   * 纸样改动大小, 100:无改动;110:小,120:大
   */
  patternChangeSize: string;
  /**
   * 参考款号
   */
  referenceDesignCode: string;
}
export interface IExceptionPageRes {
  page: string;
  total: string;
  list: IExceptionPageListItem[];
}
// 异常管理列表⬆️

// 异常管理--查询各状态条数⬇️
export type IExceptionStateCountReq = Record<string, unknown>;
export interface IExceptionStateCountStateItemListItem {
  /**
   * 状态
   */
  state: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '';
  /**
   * 数量
   */
  count: string;
}
export interface IExceptionStateCountStateEnumListItem {
  /**
   * 枚举值
   */
  value: string;
  /**
   * 枚举编码
   */
  code: string;
  /**
   * 枚举说明/名称
   */
  showName: string;
}
export interface IExceptionStateCountRes {
  /**
   * 总数
   */
  total: string;
  /**
   * 状态枚举
   */
  stateEnumList: IExceptionStateCountStateEnumListItem[];
  /**
   * 按状态分组
   */
  stateItemList: IExceptionStateCountStateItemListItem[];
}
// 异常管理--查询各状态条数⬆️

// 异常管理-待处理-驳回⬇️
/**
 * 请求参数对象
 */
export interface IExceptionRejectReq {
  /**
   * 异常单id
   */
  exceptionIdList: number[];
  /**
   * 驳回原因
   */
  applyRejectReason: string;
}
export type IExceptionRejectRes = null;
// 异常管理-待处理-驳回⬆️

// 异常管理-待处理-开始处理⬇️
/**
 * 请求参数对象
 */
export interface IExceptionHandleReq {
  /**
   * 异常单id
   */
  exceptionIdList: number[];
  /**
   * 处理人id
   */
  handlerId: string | number;
  /**
   * 处理人姓名
   */
  handlerName: string;
}
export type IExceptionHandleRes = null;

// 异常管理-待处理-开始处理⬆️

// 异常管理-处理中-申请结案⬆️
/**
 * 请求参数对象
 */
export interface IApplyCloseReq {
  /**
   * 异常单id
   */
  exceptionIdList: number[];
}
export type IApplyCloseRes = null;
// 异常管理-处理中-申请结案⬆️

// 异常管理-驳回待审核-同意驳回⬇️
/**
 * 请求参数对象
 */
export interface IAgreeOverruleReq {
  /**
   * 异常单id
   */
  exceptionIdList: number[];
}
export type IAgreeOverruleRes = null;
// 异常管理-驳回待审核-同意驳回⬆️

// 异常管理-驳回待审核-拒绝驳回⬇️
/**
 * 请求参数对象
 */
export interface IRejectOverruleReq {
  /**
   * 异常单id
   */
  exceptionIdList: number[];
  /**
   * 拒绝驳回原因
   */
  rollbackReason: string;
}
export type IRejectOverruleRes = null;
// 异常管理-驳回待审核-拒绝驳回⬆️

// 异常管理-结案待审核-同意结案⬆⬇️
/**
 * 请求参数对象
 */
export interface IAgreeCloseReq {
  /**
   * 异常单id
   */
  exceptionIdList: number[];
}
export type IAgreeCloseRes = null;
// 异常管理-结案待审核-同意结案⬆️

// 异常管理-结案待审核-拒绝结案⬇️
/**
 * 请求参数对象
 */
export interface IRejectCloseReq {
  /**
   * 异常单id
   */
  exceptionIdList: number[];
  /**
   * 拒绝结案原因
   */
  rollbackFinishReason: string;
}
export type IRejectCloseRes = null;
// 异常管理-结案待审核-拒绝结案⬆️

export interface IExceptionExceptionStepItem {
  /**
   * 编码
   */
  code: string;
  /**
   * 描述
   */
  desc: string;
}
// 异常环节
export type IExceptionExceptionStepRes = IExceptionExceptionStepItem[];

// 添加备注⬇️
/**
 * 参数
 */
export interface IRemarkAddReq {
  /**
   * 业务id
   * <p>
   * clothesId 样衣打版id <p>
   * anomalyId 异常单id <p>
   * repairId 返修单id <p>
   */
  bizId: number | string;
  /**
   * 业务类型: 1-打版、2-异常、3-返修 4-二次工艺
   */
  bizType: string;
  /**
   * 备注信息
   */
  remark: string;
}
/**
 * 响应数据
 */
export type IRemarkAddRes = null;

// 添加备注⬇️

// 批量查询备注⬇️
/**
 * 查询条件
 */
export interface IBatchListReq {
  /**
   * 业务类型: 1-打版、2-异常、3-返修 4-二次工艺
   */
  bizType: REMARK_BIZ_TYPE_ENUMS;
  /**
   * 业务ids
   */
  bizIdList?: string[] | number[];
}
export interface IBatchList0Item {
  /**
   * 自增id
   */
  remarkId: string;
  /**
   * 业务id
   */
  bizId: string;
  /**
   * 业务类型: 1-打版、2-异常、3-返修
   */
  bizType: 'SAMPLE_CLOTHES' | 'ANOMALY' | 'REPAIR' | 'SECOND_CRAFT';
  /**
   * 备注信息
   */
  remark: string;
  /**
   * 操作人id
   */
  creatorId: string;
  /**
   * 操作人名称
   */
  createdName: string;
  /**
   * 创建时间
   */
  createdTime: string;
}

/**
 * 响应数据
 */
export interface IBatchListRes {
  '0': IBatchList0Item[];
}

// 批量查询备注⬆️

export interface ILogListReq {
  /**
   * 业务类型 5-二次工艺
   */
  bizType?: LOG_BIZ_TYPE_ENUMS;
  bizTypes?: number[];
  /**
   * 业务id
   * <p>
   * anomalyId 异常单id <p>
   * repairId 返修单id <p>
   */
  bizId?: string;
  /**
   * 业务code
   */
  bizCode?: string;
  /**
   * 是否需要展示打版日志（针对查询用量核算和款式核价的日志时，是否需要显示打版时的日志）
   */
  containSampleClothesLog?: boolean;
}
export type ILogListRes = {
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
  clothesId?: string;
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
}[];

export interface SortInfo {
  column: Record<string, unknown>;
  order: 'ascending' | 'descending' | '';
  prop: string;
  [propsName: string]: any;
}

/**
 * 批量查询备注
 * yapi地址：https://yapi.tiangong.site/project/48/interface/api/3101
 */
export interface IBigBatchListReq {
  /**
   * 业务类型: 1-合同管理 2.生产资料
   */
  bizType: '1' | '2' | '3' | '4' | '5' | '6';
  /**
   * 业务id
   * <p>
   * styleInfoId 款式主表id <p>
   */
  bizIdList: string[];
}

export interface IBigBatchListRes {
  0: IBigBatchListRes0Item[];
}

export interface IBigBatchListRes0Item {
  /**
   * 自增id
   */
  remarkId?: string;
  /**
   * 业务id
   */
  bizId?: string;
  /**
   * 业务类型: 1-合同管理
   */
  bizType?: '1' | '2' | '3' | '4' | '5' | '6';
  /**
   * 备注信息
   */
  remark?: string;
  /**
   * 操作人名称
   */
  creatorName?: string;
  /**
   * 创建时间
   */
  createdTime?: number;
}
// ⬇️ 查询环节节点状态字典请求体 接口：https://yapi.tiangong.site/project/38/interface/api/2889
export interface IStepNodeStateDictReq {
  /**
   * 环节编码
   */
  stepCodes?: number[];
  /**
   * 节点编码
   */
  nodeCodes?: number[];
}
// ⬆️ 查询环节节点状态字典请求体

// ⬇️ 查询环节节点状态字典响应体 接口：https://yapi.tiangong.site/project/38/interface/api/2889
export interface IStepNodeStateDictItem {
  /**
   * 环节名称
   */
  stepName: string;
  /**
   * 环节code
   */
  stepCode: string;
  /**
   * 环节描述
   */
  stepDesc: string;
  /**
   * 节点名称
   */
  nodeName: string;
  /**
   * 节点code
   */
  nodeCode: string;
  /**
   * 节点描述
   */
  nodeDesc: string;
  /**
   * 节点状态值
   */
  nodeStateCode: string;
  /**
   * 节点状态描述
   */
  nodeStateDesc: string;
}
// ⬆️ 查询环节节点状态字典响应体
