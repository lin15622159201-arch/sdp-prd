import { CLOTHES_STEP_ENUM } from '@/modules/common/components/error-dialog/constant';

// 返修状态数量统计⬇️
export interface IRepairCountReq {
  /**
   * 样衣所在处理环节code （参考 ClothesStepEnum）
   */
  clothesStep?: string;
  /**
   * 样衣所在处理节点code （参考 ClothesNodeEnum）
   */
  clothesNode?: string;
  /**
   * 样衣所在处理环节节点状态
   */
  clothesStepNodeState?: string;
  /**
   * 设计款号, skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 环节：
   * 200: 纸样待分单
   * 230: 内部纸样-待进行
   * 250: 内部纸样-进行中
   * 270: 外部纸样-待接单
   * 290: 外部纸样-进行中
   * 300: 面辅料齐套
   * 400: 车版待分单
   * 410: 内部车版-裁剪进行中
   * 420: 内部车版-裁片二次工艺
   * 430: 内部车版-车缝待进行
   * 440: 内部车版-车缝-半成品二次工艺
   * 460: 内部车版-车缝进行中
   * 470: 内部车版-成品二次工艺
   * 500: 外部车版-待接单
   * 510: 外部车版-裁剪
   * 520: 外部车版-裁片二次工艺
   * 530: 外部车版-车缝待进行
   * 540: 外部车版-车缝-半成品二次工艺
   * 550: 外部车版-车缝进行中
   * 560: 外部车版-成品二次工艺
   * 570: 外部车版-送货
   * 580: 外部车版-收货
   * 600: 样衣质检
   * 610: 样衣审版
   * 620: 设计审版
   * 630: 用量维护
   * 640: 样衣核价
   * 650: 寄送样衣
   * 660: 客户审版
   */
  repairProcessStep?: string;
  /**
   * 返修环节（当前返修状态）状态（0/不传: 全部，1:待分单，2:已分单，3:待进行，4:进行中，5:已取消 6:已完成）
   */
  repairState?: string;
  /**
   * 版房类型（1：外部，0：内部）
   */
  roomType?: string;
  /**
   * 返修原因编码
   */
  repairReasonCode?: string;
  /**
   * 返修原因名称
   */
  repairReasonName?: string;
  /**
   * 版本号
   */
  versionNum?: string;
  /**
   * 预估耗时最小（单位：h）
   */
  estimatedTimeMin?: string;
  /**
   * 预估耗时最大（单位：h）
   */
  estimatedTimeMax?: string;
  /**
   * 期望交期开始时间
   */
  planDeliveryTimeStart?: string;
  /**
   * 期望交期结束时间
   */
  planDeliveryTimeEnd?: string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName?: string;
  /**
   * 开发交付日期开始时间
   */
  deliveryTimeStart?: string;
  /**
   * 开发交付日期结束时间
   */
  deliveryTimeEnd?: string;
  /**
   * 开发时效
   */
  effectivenessTypeEnum?: string;
  /**
   * 开发时效最小天数
   */
  effectivenessTimeStart?: string;
  /**
   * 开发时效最大天数
   */
  effectivenessTimeEnd?: string;
  /**
   * 技术组别
   */
  techniqueGroup?: string;
  /**
   * 纸样师id
   */
  patternMakerIdList?: number[];
  /**
   * 车缝师id
   */
  sewerIdList?: number[];
  /**
   * 分单员id
   */
  allocateeIdList?: number[];
  /**
   * 版房id（外部版房id，内部：1）
   */
  roomId?: string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: string;
  /**
   * 是否取消 0-否、1-是
   */
  isCancel?: string;
  /**
   * 当前耗时开始时间
   */
  timeConsumingStart?: string;
  /**
   * 当前耗时结束时间
   */
  timeConsumingEnd?: string;
  /**
   * 当前耗时排序
   */
  timeConsumingSort?: 'ascending' | 'descending' | '';
  /**
   * 版单取消时间开始
   */
  cancelTimeStart?: string;
  /**
   * 版单取消时间结束
   */
  cancelTimeEnd?: string;
  /**
   * 取消版单操作人id
   */
  cancelUserId?: number[];
  /**
   * 取消环节 sample_clothes.process_step的子集
   */
  cancelProcessStep?: string;
  /**
   * 返修人id
   */
  repairmanId?: string;
  /**
   * 取消页面（1：取消页面,0:不是）
   */
  isCancelPage?: string;
  /**
   * 取消人
   */
  cancelUserIdList?: number[];
  /**
   * 实际耗时（单位：h）
   */
  actualCostTime?: string;
  /**
   * 确认耗时状态(0-待确认; 1-已确认;3-默认状态,为了其他数据该值不为null)
   */
  confirmCostState?: string;
  /**
   * 打版类型: 1-大货打版 2-正常打版 3-复色打版 4-补做打版
   */
  sampleType?:
  | 'LARGE_CARGO_MAKING'
  | 'NORMAL_PATTERN_MAKING'
  | 'COMPOUND_COLORS_MAKING'
  | 'MORE_PATTERN_MAKING';
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: string;
  /**
   * 客户id
   */
  purchaserId?: string;
  /**
   * 设计师id【设计师】
   */
  designerIdList?: number[];
  /**
   * 设计组编号
   */
  designerGroupCodeList?: string[];
  /**
   * 款生成时间
   */
  skcCreatedTimeStart?: string;
  /**
   * 款生成时间
   */
  skcCreatedTimeEnd?: string;
  /**
   * 跟单员id
   */
  merchandiserId?: string;
  /**
   * 跟单员ids
   */
  merchandiserIdList?: number[];
  /**
   * 销售群体
   */
  saleGroupList?: string[];
  /**
   * 开发时效（如果默认是开发时效，前端不需要传数据）
   */
  effectivenessType?: 'OVERDUE' | 'NOT_EXPIRED' | '';
  /**
   * 创建时间-开始
   */
  createdTimeStart?: string;
  /**
   * 创建时间-结束
   */
  createdTimeEnd?: string;
  /**
   * 区域id
   */
  regionId?: string;
  /**
   * 面辅料齐套状态(0-未流转、1-待签收、2-已签收)
   */
  materialState?: string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: string;
  /**
   * 是否查询我的 true=我的、false/null=全部
   */
  personal?: boolean;
  /**
   * 当前查询的页码
   */
  pageNum?: number;
  /**
   * 当前查询单页的数据量
   */
  pageSize?: number;
}
export type IRepairCountRes = {
  /**
   * 状态
   */
  code: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '';
  /**
   * 数量
   */
  count: string;
}[];
// 返修状态数量统计⬆️

/**
 * 响应数据
 */
export interface IAllPageRes {
  /**
   * 当前页码, 主要给 web 端做分页校验
   */
  page: string;
  /**
   * 总数据量
   */
  total: string;
  /**
   * 分页数据
   */
  list: IAllPageListItem[];
}
export interface IAllPageListItem {
  /**
   * 返修单id
   */
  repairId: string;
  /**
   * 返修单号,F+（后两位）年（两位）月（两位）日+3位流水号-版本号的返修记录
   */
  repairCode: string;
  /**
   * 样衣打版id
   */
  clothesId: string;
  /**
   * 设计款号, skc+年月日+4位流水号
   */
  designCode: string;
  /**
   * 返修件数
   */
  repairNum: string;
  /**
   * 收货件数
   */
  receivedNum: string;
  /**
   * 环节： 200: 纸样待分单
   *  230: 内部纸样-待进行
   *  250: 内部纸样-进行中
   *  270: 外部纸样-待接单
   *  290: 外部纸样-进行中
   *  300: 面辅料齐套
   *  400: 车版待分单
   *  410: 内部车版-裁剪进行中
   *  420: 内部车版-裁片二次工艺
   *  430: 内部车版-车缝待进行
   *  440: 内部车版-车缝-半成品二次工艺
   *  460: 内部车版-车缝进行中
   *  470: 内部车版-成品二次工艺
   *  500: 外部车版-待接单
   *  510: 外部车版-裁剪
   *  520: 外部车版-裁片二次工艺
   *  530: 外部车版-车缝待进行
   *  540: 外部车版-车缝-半成品二次工艺
   *  550: 外部车版-车缝进行中
   *  560: 外部车版-成品二次工艺
   *  570: 外部车版-送货
   *  580: 外部车版-收货
   *  600: 样衣质检
   *  610: 样衣审版
   *  620: 设计审版
   *  630: 用量维护
   *  640: 样衣核价
   *  650: 寄送样衣
   *  660: 客户审版
   */
  repairProcessStep: string;
  /**
   * 返修类型(1,仅纸样; 2,仅车版; 3,纸样+车版)
   */
  repairType: string;
  /**
   * 返修类型二级分类(1,纸样; 2,车版;)
   */
  repairTypeSecond: string;
  /**
   * 分单员id
   */
  allocateeId: string;
  /**
   * 分单员名字
   */
  allocateeName: string;
  /**
   * 返修原因编码
   */
  repairReasonCode: string;
  /**
   * 返修原因名称
   */
  repairReasonName: string;
  /**
   * 返修责任方code(1:版房原因、2:设计师原因、3:客户要求、4:面辅料履约)
   */
  responsibleParty:
  | 'ROOM_REASON'
  | 'DESIGNER_REASON'
  | 'CUSTOMER_REQUIREMENTS'
  | 'SURFACE_ACCESSORIES_FULFILLMENT';
  /**
   * 返修责任方描述(1:版房原因、2:设计师原因、3:客户要求、4:面辅料履约)
   */
  responsiblePartyName: string;
  /**
   * 返修原因描述
   */
  repairDescription: string;
  /**
   * 预估耗时（单位：h）
   */
  estimatedTime: string;
  /**
   * 实际耗时（单位：h）
   */
  actualCostTime: string;
  /**
   * 确认耗时状态(0-待确认; 1-已确认;3-默认状态,为了其他数据该值不为null)
   */
  confirmCostState: string;
  /**
   * 状态（1:待分单，2:已分单，3:进行中，4:已完成）
   */
  repairState: string;
  /**
   * 版房id（外部版房id，内部：1）
   */
  roomId: string;
  /**
   * 板房名字
   */
  roomName: string;
  /**
   * 版房类型（1：外部，0：内部）
   */
  roomType: string;
  /**
   * 版本号
   */
  versionNum: string;
  /**
   * 客户图片{多张以英文逗号分隔}
   */
  customerPicture: string;
  /**
   * 纸样师id
   */
  patternMakerId: string;
  /**
   * 纸样师名称
   */
  patternMakerName: string;
  /**
   * 车缝师id
   */
  sewerId: string;
  /**
   * 车缝师名称
   */
  sewerName: string;
  /**
   * 裁剪方法编码
   */
  cuttingMethodCode: string;
  /**
   * 裁剪方法
   */
  cuttingMethod: string;
  /**
   * 期望交期
   */
  planDeliveryTime: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName: string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode: string;
  /**
   * 开发交付日期
   */
  deliveryTime: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 已分单创建时间
   */
  orderCreateTime: string;
  /**
   * 待进行创建时间
   */
  pendingCreateTime: string;
  /**
   * 进行中创建时间
   */
  processCreateTime: string;
  /**
   * 待分单创建时间
   */
  pendingAssignTime: string;
  /**
   * 外发版房返修结束时间
   */
  extFinishTime: string;
  /**
   * 返修结束时间
   */
  finishTime: string;
  /**
   * 当前耗时开始时间
   */
  timeConsumingStart: string;
  /**
   * 当前耗时结束时间
   */
  timeConsumingEnd: string;
  /**
   * 取消人
   */
  cancelerId: string;
  /**
   * 取消人
   */
  cancelUserName: string;
  /**
   * 版单取消时间开始
   */
  cancelTime: string;
  /**
   * 取消原因
   */
  cancelReason: string;
  /**
   * 返修人id
   */
  repairmanId: string;
  /**
   * 返修人姓名
   */
  repairmanName: string;
  /**
   * 是否取消 0-否、1-是
   */
  isCancel: string;
  /**
   * 当前时间(用于计算时效)
   */
  currentLocalTime: string;
  /**
   * 返修环节描述
   */
  currentStepDec: string;
  /**
   * 打版类型: 1-大货打版 2-正常打版 3-复色打版 4-补做打版
   */
  sampleType: string;
  /**
   * 订单类型: 1-打版订单 2-设计订单 3-加工订单；1、2属于样衣，3属于生产(大货)
   */
  demandTaskType: string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode: string;
  /**
   * 原始加工单号
   */
  baseProcessCode: string;
  /**
   * 客户图片
   */
  customerPictureList: string[];
  /**
   * 设计图片
   */
  designPictureList: string[];
  /**
   * 打版件数
   */
  sampleAmount: string;
  /**
   * 当前处理环节
   */
  processStep: string;
  /**
   * 当前处理环节名称
   */
  processStepDesc: string;
  processNodeDesc?: string;
  processNodeStateDesc?: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode: string;
  /**
   * 客户id
   */
  purchaserId: string;
  /**
   * 客户编号
   */
  purchaserCode: string;
  /**
   * 客户名称
   */
  purchaserName: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName: string;
  /**
   * 区域id
   */
  regionId: string;
  /**
   * 区域名
   */
  regionName: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent: string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal: string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair: string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial: string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft: string;
  /**
   * 是否需要下采购（true:是,false/null:否）
   */
  isPurchase: string;
  /**
   * 面辅料齐套状态(0-未流转、1-待签收、2-已签收)
   */
  materialState: string;
  /**
   * 开发交付周期。如：T+3，此值就是3
   */
  deliveryPeriod: string;
  /**
   * 设计师id
   */
  designerId: string;
  /**
   * 设计师名称
   */
  designerName: string;
  /**
   * 跟单员id
   */
  merchandiserId: string;
  /**
   * 跟单员名称
   */
  merchandiserName: string;
  /**
   * 复色款号，不为""时代表复色版
   */
  makeSameDesignCode: string;
  /**
   * 套版款：1 衍生款：2
   */
  styleReferType: string;
  /**
   * 套版款/衍生款的设计款号
   */
  styleReferDesignCode: string;
  /**
   * 环节创建时间（用于计算当前耗时【currentTime-processingStepCreatedTime】）
   */
  processingStepCreatedTime: string;
  /**
   * 当前时间
   */
  currentTime: string;
  /**
   * 二次工艺
   */
  craftList: IAllPageCraftListItem[];
  anomaly: IAllPageAnomaly;
  repair: IAllPageRepair;
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
export interface IAllPageCraftListItem {
  /**
   * 工艺要求:  100:裁版前工艺 110:裁版后工艺
   */
  craftsRequire: string;
  /**
   * 工艺环节名称
   * 如果有工艺环节，优先展示工艺环节
   * 没有工艺环节直接显示工艺要求
   */
  craftsProcessName: string;
  /**
   * 二次工艺名称
   */
  nameList: string[];
}
/**
 * 异常信息
 */
export interface IAllPageAnomaly {
  /**
   * 样衣打版id
   */
  clothesId: string;
  /**
   * 异常单号
   */
  anomalyCode: string;
  /**
   * 异常原因类型
   */
  typeDescription: string;
  /**
   * 异常描述
   */
  description: string;
  /**
   * 责任人id
   */
  responsibleId: string;
  /**
   * 责任人姓名
   */
  responsibleName: string;
}
/**
 * 返修信息
 */
export interface IAllPageRepair {
  /**
   * 样衣打版id
   */
  clothesId: string;
  /**
   * 返修原因编码
   */
  repairReasonCode: string;
  /**
   * 返修原因名称
   */
  repairReasonName: string;
  /**
   * 返修原因描述
   */
  repairDescription: string;
  /**
   * 返修时间
   */
  createdTime: string;
}

/**
 * 该skc存在未完成的纸样返修单，请先完成纸样返修单
 * @see https://yapi.ibaibu.com/project/1650/interface/api/166681
 *
 * @请求方法: GET
 * @请求地址: /plm-sample-clothes/web/v1/repair/exist-pattern-unfinished/{clothesId}/{repairId}
 * @更新时间: 2022-06-20 15:42:12
 */
export interface IRepairExistPatternUnfinishedReq {
  clothesId: string;
  repairId: string;
}
export type IRepairExistPatternUnfinishedRes = null;

// 开始分单⬇️
export interface IRepairAssignListItem {
  /**
   * 样衣打版id
   */
  clothesId: string;
  /**
   * 返修单id
   */
  repairId: string;
  /**
   * 版房类型（1：外部，0：内部）
   */
  roomType: string;
  /**
   * 版房id（外部版房id，内部：1）
   */
  roomId?: string | number;
  /**
   * 版房名字
   */
  roomName?: string;
}
export interface IRepairAssignReq {
  list: IRepairAssignListItem[];
}
export type IRepairAssignRes = null;
// 开始分单⬆️

// 撤回分单⬇️
export interface IRepairRecallListItem {
  /**
   * 样衣打版id
   */
  clothesId: string;
  /**
   * 返修单id
   */
  repairId: string;
}
export interface IRepairRecallReq {
  list: IRepairRecallListItem[];
}
export type IRepairRecallRes = null;

// 撤回分单⬆️

/**
 * **请求类型**
 * 发起异常
 * @see https://yapi.ibaibu.com/project/1650/interface/api/92444
 *
 * @请求方法: POST
 * @请求地址: /plm-sample-clothes/web/v1/anomaly/save
 * @更新时间: 2021-09-10 11:54:34
 */
/**
 * 请求参数对象
 */
export interface PostWebV1AnomalySaveApiReq {
  /**
   * 版单id
   */
  clothesId?: number | string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 异常类型（）
   */
  anomalyType?: number | string;
  /**
   * 异常发起人
   */
  sponsorName?: string;
  /**
   * 发起环节
   */
  processStep?: string;
  /**
   * 责任部门
   */
  responsibleDepartment?: string;
  /**
   * 责任人
   */
  responsible?: string;
  /**
   * 处理人
   */
  handlerName?: string;
  /**
   * 状态（1：待处理，2：驳回待审核，3：已驳回，4：处理中，5；结案待审核，6：已结案）
   */
  status?: number | string;
  /**
   * 异常描述
   */
  description?: string;
  /**
   * 图片
   */
  picture?: string;
  /**
   * 发起异常所在环节- 样衣返修下-固定 /**_返修环节/REPAIR(800,"返修环节"),
   */
  clothesStep: CLOTHES_STEP_ENUM;
}

/**
 * **返回类型**
 * 发起异常
 * @see https://yapi.ibaibu.com/project/1650/interface/api/92444
 *
 * @请求方法: POST
 * @请求地址: /plm-sample-clothes/web/v1/anomaly/save
 * @更新时间: 2021-09-10 11:54:34
 */
export type PostWebV1AnomalySaveApiRes = null;
/**
 * 异常信息
 */
export interface IInnerPageAnomaly {
  /**
   * 样衣打版id
   */
  clothesId: string;
  /**
   * 异常单号
   */
  anomalyCode: string;
  /**
   * 异常类型
   */
  typeDescription: string;
  /**
   * 异常描述
   */
  description: string;
  /**
   * 责任人id
   */
  responsibleId: string;
  /**
   * 责任人姓名
   */
  responsibleName: string;
}
/**
 * 返修信息
 */
export interface IInnerPageRepair {
  /**
   * 样衣打版id
   */
  clothesId: string;
  /**
   * 返修原因编码
   */
  repairReasonCode: string;
  /**
   * 返修原因名称
   */
  repairReasonName: string;
  /**
   * 返修原因描述
   */
  repairDescription: string;
  /**
   * 返修时间
   */
  createdTime: string;
}
export interface IInnerPageListItem {
  /**
   * 返修单id
   */
  repairId: string;
  /**
   * 返修单号,F+（后两位）年（两位）月（两位）日+3位流水号-版本号的返修记录
   */
  repairCode: string;
  /**
   * 样衣打版id
   */
  clothesId: string;
  /**
   * 设计款号, skc+年月日+4位流水号
   */
  designCode: string;
  /**
   * 返修件数
   */
  repairNum: string;
  /**
   * 发起环节/返修环节
   */
  processStep: string;
  /**
   * 环节
   */
  repairProcessStep: string;
  /**
   * 发起环节描述
   */
  currentStepDec: string;
  /**
   * 分单员id
   */
  allocateeId: string;
  /**
   * 分单员名字
   */
  allocateeName: string;
  /**
   * 返修原因编码
   */
  repairReasonCode: string;
  /**
   * 返修原因名称
   */
  repairReasonName: string;
  /**
   * 返修责任方(1:版房原因、2:设计师原因、3:客户要求)
   */
  responsibleParty: string;
  /**
   * 返修原因描述
   */
  repairDescription: string;
  /**
   * 预估耗时（单位：h）
   */
  estimatedTime: string;
  /**
   * 状态（1:待分单，2:已分单，3:进行中，4:已完成）
   */
  repairState: string;
  /**
   * 版房id（外部版房id，内部：1）
   */
  roomId: string;
  /**
   * 版本号
   */
  versionNum: string;
  /**
   * 客户图片{多张以英文逗号分隔}
   */
  customerPicture: string;
  /**
   * 纸样师id
   */
  patternMakerId: string;
  /**
   * 纸样师名称
   */
  patternMakerName: string;
  /**
   * 车缝师id
   */
  sewerId: string;
  /**
   * 车缝师名称
   */
  sewerName: string;
  /**
   * 裁剪方法编码
   */
  cuttingMethodCode: string;
  /**
   * 裁剪方法
   */
  cuttingMethod: string;
  /**
   * 期望交期
   */
  planDeliveryTime: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName: string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode: string;
  /**
   * 开发交付日期
   */
  deliveryTime: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 已分单创建时间
   */
  orderCreateTime: string;
  /**
   * 待进行创建时间
   */
  pendingCreateTime: string;
  /**
   * 进行中创建时间
   */
  processCreateTime: string;
  /**
   * 返修结束时间
   */
  finishTime: string;
  /**
   * 当前耗时开始时间
   */
  timeConsumingStart: string;
  /**
   * 当前耗时结束时间
   */
  timeConsumingEnd: string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType: string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode: string;
  /**
   * 原始加工单号
   */
  baseProcessCode: string;
  /**
   * 客户图片
   */
  customerPictureList: string[];
  /**
   * 设计图片
   */
  designPictureList: string[];
  /**
   * 打版件数
   */
  sampleAmount: string;
  /**
   * 当前处理环节名称
   */
  processStepDesc: string;
  processNodeDesc?: string;
  processNodeStateDesc?: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode: string;
  /**
   * 客户id
   */
  purchaserId: string;
  /**
   * 客户编号
   */
  purchaserCode: string;
  /**
   * 客户名称
   */
  purchaserName: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName: string;
  /**
   * 区域id
   */
  regionId: string;
  /**
   * 区域名
   */
  regionName: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent: string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal: string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair: string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial: string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft: string;
  /**
   * 面辅料齐套状态(0-未流转、1-待签收、2-已签收)
   */
  materialState: string;
  /**
   * 开发交付周期。如：T+3，此值就是3
   */
  deliveryPeriod: string;
  /**
   * 设计师id
   */
  designerId: string;
  /**
   * 设计师名称
   */
  designerName: string;
  /**
   * 环节创建时间（用于计算当前耗时【currentTime-processingStepCreatedTime】）
   */
  processingStepCreatedTime: string;
  /**
   * 当前时间
   */
  currentTime: string;
  /**
   * 二次工艺
   */
  craftList: IInnerPageCraftListItem[];
  anomaly: IInnerPageAnomaly;
  repair: IInnerPageRepair;
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
export interface IInnerPageRes {
  page: string;
  total: string;
  list: IInnerPageListItem[];
}
// 查询内部返修列表⬆️

// 查询内部返修列表⬇️
export type IInnerPageReq = Record<string, unknown>;
export interface IInnerPageCraftListItem {
  /**
   * 工艺要求:  100:裁版前工艺 110:裁版后工艺
   */
  craftsRequire: string;
  /**
   * 工艺环节名称
   * 如果有工艺环节，优先展示工艺环节
   * 没有工艺环节直接显示工艺要求
   */
  craftsProcessName: string;
  /**
   * 二次工艺名称
   */
  nameList: string[];
}

// 开始返修⬇️️
/**
 * 请求参数对象
 */
export interface IRepairStartListItem {
  /**
   * 样衣打版id
   */
  clothesId: string;
  /**
   * 返修单id
   */
  repairId: string;
  /**
   * 返修人id
   */
  repairmanId: string | number;
  /**
   * 返修人姓名
   */
  repairmanName: string;
}
export interface IRepairStartReq {
  list: IRepairStartListItem[];
}
export type IRepairStartRes = null;

// 开始返修⬆️

// 排单变更⬇️
export interface IRepairChangeListItem {
  /**
   * 样衣打版id
   */
  clothesId: string;
  /**
   * 返修单id
   */
  repairId: string;
  /**
   * 返修人id
   */
  repairmanId: string | number;
  /**
   * 返修人姓名
   */
  repairmanName: string;
}
export interface IRepairChangeReq {
  list: IRepairChangeListItem[];
}
export type IRepairChangeRes = null;
// 排单变更⬆️

// 返修完成⬇️️
export interface IRepairFinishListItem {
  /**
   * 样衣打版id
   */
  clothesId: string;
  /**
   * 返修单id
   */
  repairId: string;
  /**
   * 确认耗时
   */
  confirmCostTime: string;
}

export interface IRepairFinishReq {
  list: IRepairFinishListItem[];
}
export type IRepairFinishRes = null;

// 返修完成⬆️

// 确认收货⬇️
export interface IRepairReceiptListItem {
  /**
   * 样衣打版id
   */
  clothesId: string;
  /**
   * 返修单id
   */
  repairId: string;
  /**
   * 收货件数
   */
  receivedNum: string;
}
export interface IRepairReceiptReq {
  list: IRepairReceiptListItem[];
}
export type IRepairReceiptRes = null;

// 确认收货⬆️

// 查询外部返修列表⬇️
export type IExternalPageReq = Record<string, unknown>;
export interface IExternalPageCraftListItem {
  /**
   * 工艺要求:  100:裁版前工艺 110:裁版后工艺
   */
  craftsRequire: string;
  /**
   * 工艺环节名称
   * 如果有工艺环节，优先展示工艺环节
   * 没有工艺环节直接显示工艺要求
   */
  craftsProcessName: string;
  /**
   * 二次工艺名称
   */
  nameList: string[];
}

/**
 * 异常信息
 */
export interface IExternalPageAnomaly {
  /**
   * 样衣打版id
   */
  clothesId: string;
  /**
   * 异常单号
   */
  anomalyCode: string;
  /**
   * 异常原因类型
   */
  typeDescription: string;
  /**
   * 异常描述
   */
  description: string;
  /**
   * 责任人id
   */
  responsibleId: string;
  /**
   * 责任人姓名
   */
  responsibleName: string;
}
/**
 * 返修信息
 */
export interface IExternalPageRepair {
  /**
   * 样衣打版id
   */
  clothesId: string;
  /**
   * 返修原因编码
   */
  repairReasonCode: string;
  /**
   * 返修原因名称
   */
  repairReasonName: string;
  /**
   * 返修原因描述
   */
  repairDescription: string;
  /**
   * 返修时间
   */
  createdTime: string;
}
export interface IExternalPageListItem {
  /**
   * 确认耗时状态(0-待确认; 1-已确认;3-默认状态,为了其他数据该值不为null)
   */
  confirmCostState: string;
  /**
   * 返修单id
   */
  repairId: string;
  /**
   * 返修单号,F+（后两位）年（两位）月（两位）日+3位流水号-版本号的返修记录
   */
  repairCode: string;
  /**
   * 样衣打版id
   */
  clothesId: string;
  /**
   * 设计款号, skc+年月日+4位流水号
   */
  designCode: string;
  /**
   * 返修件数
   */
  repairNum: string;
  /**
   * 收货件数
   */
  receivedNum: string;
  /**
   * 发起环节/返修环节
   */
  processStep: string;
  /**
   * 环节
   */
  repairProcessStep: string;
  /**
   * 发起环节描述
   */
  currentStepDec: string;
  /**
   * 分单员id
   */
  allocateeId: string;
  /**
   * 分单员名字
   */
  allocateeName: string;
  /**
   * 返修原因编码
   */
  repairReasonCode: string;
  /**
   * 返修原因名称
   */
  repairReasonName: string;
  /**
   * 返修责任方(1:版房原因、2:设计师原因、3:客户要求)
   */
  responsibleParty: string;
  /**
   * 返修原因描述
   */
  repairDescription: string;
  /**
   * 预估耗时（单位：h）
   */
  estimatedTime: string;
  /**
   * 状态（1:待分单，2:已分单，3:进行中，4:已完成）
   */
  repairState: string;
  /**
   * 版房id（外部版房id，内部：1）
   */
  roomId: string;
  /**
   * 版房名字
   */
  roomName: string;
  /**
   * 版房类型（1：外部，0：内部）
   */
  roomType: string;
  /**
   * 版本号
   */
  versionNum: string;
  /**
   * 客户图片{多张以英文逗号分隔}
   */
  customerPicture: string;
  /**
   * 纸样师id
   */
  patternMakerId: string;
  /**
   * 纸样师名称
   */
  patternMakerName: string;
  /**
   * 车缝师id
   */
  sewerId: string;
  /**
   * 车缝师名称
   */
  sewerName: string;
  /**
   * 裁剪方法编码
   */
  cuttingMethodCode: string;
  /**
   * 裁剪方法
   */
  cuttingMethod: string;
  /**
   * 期望交期
   */
  planDeliveryTime: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName: string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode: string;
  /**
   * 开发交付日期
   */
  deliveryTime: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 已分单创建时间
   */
  orderCreateTime: string;
  /**
   * 待进行创建时间
   */
  pendingCreateTime: string;
  /**
   * 进行中创建时间
   */
  processCreateTime: string;
  /**
   * 返修结束时间
   */
  finishTime: string;
  /**
   * 当前耗时开始时间
   */
  timeConsumingStart: string;
  /**
   * 当前耗时结束时间
   */
  timeConsumingEnd: string;
  /**
   * 取消人
   */
  cancelerId: string;
  /**
   * 取消人
   */
  cancelUserName: string;
  /**
   * 版单取消时间开始
   */
  cancelTime: string;
  /**
   * 取消原因
   */
  cancelReason: string;
  /**
   * 打版类型: 1-大货打版 2-正常打版 3-复色打版 4-补做打版
   */
  sampleType: string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode: string;
  /**
   * 原始加工单号
   */
  baseProcessCode: string;
  /**
   * 客户图片
   */
  customerPictureList: string[];
  /**
   * 设计图片
   */
  designPictureList: string[];
  /**
   * 打版件数
   */
  sampleAmount: string;
  /**
   * 当前处理环节名称
   */
  processStepDesc: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode: string;
  /**
   * 客户id
   */
  purchaserId: string;
  /**
   * 客户编号
   */
  purchaserCode: string;
  /**
   * 客户名称
   */
  purchaserName: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName: string;
  /**
   * 区域id
   */
  regionId: string;
  /**
   * 区域名
   */
  regionName: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent: string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal: string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair: string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial: string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft: string;
  /**
   * 面辅料齐套状态(0-未流转、1-待签收、2-已签收)
   */
  materialState: string;
  /**
   * 开发交付周期。如：T+3，此值就是3
   */
  deliveryPeriod: string;
  /**
   * 设计师id
   */
  designerId: string;
  /**
   * 设计师名称
   */
  designerName: string;
  /**
   * 环节创建时间（用于计算当前耗时【currentTime-processingStepCreatedTime】）
   */
  processingStepCreatedTime: string;
  /**
   * 当前时间
   */
  currentTime: string;
  /**
   * 二次工艺
   */
  craftList: IExternalPageCraftListItem[];
  anomaly: IExternalPageAnomaly;
  repair: IExternalPageRepair;
  /**
   * 返修类型
   */
  repairType: string;
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
export interface IExternalPageRes {
  page: string;
  total: string;
  list: IExternalPageListItem[];
}
// 查询外部返修列表⬆️

/**
 * 请求参数对象
 */
export interface ICostTimeReq {
  list?: ICostTimeListItem[];
}
export interface ICostTimeListItem {
  /**
   * 样衣打版id
   */
  clothesId: string | number;
  /**
   * 返修单id
   */
  repairId: string | number;
  /**
   * 收货件数
   */
  confirmCostTime: string;
}
