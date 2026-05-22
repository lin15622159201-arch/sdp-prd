import { YES_NO_NUMBER_ENUM } from '@/constant';
import {
  FABRIC_CONSISTENT_ENUM,
  PICK_STATE_ENUM,
  PROMISE_ENABLED_ENUM,
  TASK_TYPE,
} from '@/modules/selection-manage/aigc-selection-list/constant';

// ⬇️ 选款任务分页查询请求体 接口：https://yapi.textile-story.com/project/1058/interface/api/78692
/**
 * 分页参数
 */
export interface IPickingStylePageReq {
  pickingTime?: undefined;
  pageNum?: number;
  pageSize?: number;
  /**
   * 品类
   */
  categoryCode?: string;
  /**
   * 外部品类
   */
  externalCategory?: string;
  /**
   * 创建人名称
   */
  pickingCreatorName?: string;
  /**
   * 创建开始时间
   */
  pickingStartTime?: string;
  /**
   * 创建结束时间
   */
  pickingEndTime?: string;
  /**
   * 灵感来源，ins、shein等
   */
  inspirationSource?: string;
  /**
   * 国家站点，东南亚的6个站点
   */
  countrySiteCode?: string;
  /**
   * 选款人 买手
   */
  selectorId?: string;
  /**
   * 选款人 买手
   */
  selectorName?: string;
  /**
   * 选图时间开始
   */
  imagePickingStartTime?: string;
  /**
   * 选图时间结束
   */
  imagePickingEndTime?: string;
  /**
   * 波次
   */
  waveBatchCode?: string;
  /**
   * 选用状态：null-全部，0-未选择，1-可用，2-不可用
   */
  pickingState?: PICK_STATE_ENUM | '';
  /**
   * 创建人id v3.10.1
   */
  creatorIds?: string[];
  /**
   * 任务编码  v3.10.1
   */
  taskCode?: string[];
  dataSourceType?: string;
}
// ⬆️ 选款任务分页查询请求体

// ⬇️ 选款任务分页查询响应体 接口：https://yapi.textile-story.com/project/1058/interface/api/78692
export interface IPickingStylePageRes {
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
  list: IPickingStylePageResListItem[];
}
export interface IPickingStylePageResListItem {
  designTaskId?: string;
  /**
   * 选款任务ID
   */
  pickingId: string;
  /**
   * 数据类型（导入）
   */
  dataSourceType: string;
  /**
   * 国家站点
   */
  countrySiteCode: string;
  countrySiteName: string;
  /**
   * 品类
   */
  category: string;
  /**
   * 外部品类
   */
  externalCategory: string;
  /**
   * 算法品类
   */
  identifyCategoryCode: string;
  identifyCategoryName: string;
  /**
   * 波次
   */
  waveBatchCode: string;
  waveBatchName: string;
  /**
   * 跑图任务编码
   */
  taskCode: string;
  /**
   * 创建人 id
   */
  creatorId: string;
  /**
   * 创建人 name
   */
  creatorName: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 灵感图
   */
  inspirationImage: string;
  /**
   * 灵感来源，ins、shein等
   */
  inspirationSourceType: string;
  /**
   * 划线价(US)
   */
  retailPrice: string;
  /**
   * 销售价(US)
   */
  salePrice: string;
  /**
   * AIGC图片详情列表
   */
  pickingStyleDetails: IPickingStylePageResPickingStyleDetailsItem[];
  /**
   * 选款任务状态0待处理，1已完成
   */
  state: YES_NO_NUMBER_ENUM;
  postureFissionRefImgUrl?: string;
  origin: TASK_TYPE;
  /**
   * 花型上身任务参考图
   */
  sourceImage?: string;
}
export interface IPickingStylePageResPickingStyleDetailsItem {
  /**
   * 款式id
   */
  pickingStyleId: string;
  /**
   * 选款id
   */
  pickingId: string;
  /**
   * 款式名称(款式1,款式2..)
   */
  pickingStyleName: string;
  /**
   * 选用状态：0待选中,1已选中,2未选中
   */
  pickingState: PICK_STATE_ENUM;
  /**
   * 排序号
   */
  sortOrder: string;
  resultDetail: IPickingStylePageResResultDetail;
  /**
   * 图片集合
   */
  pickingStyleImages: IPickingStylePageResPickingStyleImagesItem[];
  styleTag?: IPickingStylePageResStyleTag;
}
/**
 * 图片标签 v3.10.1
 */
export interface IPickingStylePageResStyleTag {
  /**
   * 组号
   */
  groupNum: string;
  /**
   * 履约检查图片ID（给前端拿来查看推荐面料）
   */
  pictureId: string;
  /**
   * 是否可以履约：不需要展示[-1]；0=不可以[0]；可履约[1]
   */
  promiseEnabled: PROMISE_ENABLED_ENUM;
  /**
   * 面料是否一致：不需要展示[-1]；不一致[0]；一致[1]
   */
  fabricConsistent: FABRIC_CONSISTENT_ENUM;
}
export interface IPickingStylePageResPickingStyleImagesItem {
  /**
   * 图片id
   */
  pickingPictureId: string;
  /**
   * 选款id
   */
  pickingId: string;
  /**
   * 款式id
   */
  pickingStyleId: string;
  /**
   * 生成图
   */
  pictureUrl: string;
  /**
   * 修复图
   */
  repairImgUrl: string;
  /**
   * 组号
   */
  groupNum: string;
  /**
   * 序号
   */
  serialNum: number;
  /**
   * 是否主图 1是 0否
   */
  mainImageType: YES_NO_NUMBER_ENUM;
  /**
   * 是否修图 1是 0否
   */
  fixImageType: YES_NO_NUMBER_ENUM;
  /**
   * 是否淘汰 1是 0否
   */
  eliminateType: YES_NO_NUMBER_ENUM;
  /**
   * 淘汰原因
   */
  eliminateReasonCodes: string[];
  pickingState?: number;
}
/**
 * 结果明细
 */
export interface IPickingStylePageResResultDetail {
  /**
   * 建议价格
   */
  suggestedPrice: number;
  /**
   * 建议风格
   */
  suggestedStyleCode: string;
  suggestedStyleName: string;
  /**
   * 建议品类
   */
  suggestedCategoryCode: string;
  suggestedCategoryName: string;
  /**
   * 建议波段
   */
  suggestedWaveBatchCode: string;
  /**
   * 建议店铺
   */
  suggestedShopName: string;
  /**
   * 建议店铺
   */
  suggestedShopId: string;
  suggestedShopCode: string;
  /**
   * 建议印花：0-无，1-定位印，2-满印，3-净色
   */
  suggestedPrintingCode: string;
  suggestedPrintingName: string;
  /**
   * 场景
   */
  sceneCode: string;
  sceneName: string;
  /**
   * 建议国家站点
   */
  suggestedCountrySiteCode: string;
  /**
   * 货盘id
   */
  cargoTrayId: string;
  /**
   * 货盘编号
   */
  cargoTrayCode: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 附件
   */
  attachments: IPickingStylePageResAttachmentsItem[];
  /**
   * 更新版本号(随机)
   */
  updateVersion: string;
  /**
   * 商品主题
   */
  productThemeCode: string;
  /**
   * 商品主题名称
   */
  productThemeName: string;
  /**
   * 跑图问题反馈code
   */
  runningDiagramProblemCodes: string[];
}
export interface IPickingStylePageResAttachmentsItem {
  /**
   * 文件地址
   */
  fileUrl: string;
  /**
   * 文件名称
   */
  fileName: string;
  /**
   * 文件类型
   */
  fileType: string;
}
// ⬆️ 选款任务分页查询响应体

// ⬇️ 各版本未选任务款数列表响应体 接口：https://yapi.textile-story.com/project/1058/interface/api/78948
export type IPickingStyleVersionTaskCountsRes = {
  /**
   * 版本名称
   */
  versionName: string;
  /**
   * 各站点未选数量列表
   */
  siteCounts: IPickingStyleVersionTaskCountsResSiteCountsItem[];
  /** 未选总数 */
  totalUnselectedCount: number;
}[];

export interface IPickingStyleVersionTaskCountsResSiteCountsItem {
  /**
   * 站点名称
   */
  siteName: string;
  /**
   * 未选数量
   */
  unselectedCount: string;
}
// ⬆️ 各版本未选任务款数列表响应体

// ⬇️ 查询当前版本选中/未选中数量请求体 接口：https://yapi.textile-story.com/project/1058/interface/api/78908
/**
 * 查询参数（复用 PickingStylePageReq）
 */
export type IPickingStyleCountStatusReq = IPickingStylePageReq;
// ⬆️ 查询当前版本选中/未选中数量请求体

// ⬇️ 查询当前版本选中/未选中数量响应体 接口：https://yapi.textile-story.com/project/1058/interface/api/78908
export interface IPickingStyleCountStatusRes {
  /**
   * 全部数量
   */
  total: string;
  /**
   * 待选择数量
   */
  toBeSelected: string;
  /**
   * 已选中数量
   */
  selected: string;
  /**
   * 未选中数量
   */
  unselected: string;
}
// ⬆️ 查询当前版本选中/未选中数量响应体

// ⬇️ 确认选款请求体 接口：https://yapi.textile-story.com/project/1058/interface/api/79556
/**
 * 确认请求
 */
export interface IPickingStyleConfirmReq {
  /**
   * 选款任务ID
   */
  pickingId: string;
  result: IPickingStyleConfirmReqResultItem[];
}
export interface IPickingStyleConfirmReqResultItem {
  /**
   * 选款任务明细ID
   */
  pickingStyleId: string;
  /**
   * 选用状态
   */
  pickingState: PICK_STATE_ENUM;
  resultDetail?: IPickingStyleConfirmReqResultDetail;
  /**
   * 更新版本(不为空则无修改, 空则修改)
   */
  updateVersion?: number;
  /**
   * 图片信息
   */
  imageInfos?: IPickingStyleConfirmReqImageInfosItem[];
}
export interface IPickingStyleConfirmReqImageInfosItem {
  /**
   * 图片id
   */
  pickingPictureId?: string;
  /**
   * 序号
   */
  serialNum?: number;
  /**
   * 是否主图 1是 0否
   */
  mainImageType?: YES_NO_NUMBER_ENUM;
  /**
   * 是否修图 1是 0否
   */
  fixImageType?: YES_NO_NUMBER_ENUM;
  /**
   * 是否淘汰 1是 0否
   */
  eliminateType?: YES_NO_NUMBER_ENUM;
  /**
   * 淘汰原因
   */
  eliminateReasonCodes?: string[];
}
/**
 * 可用配置
 */
export interface IPickingStyleConfirmReqResultDetail {
  /**
   * 建议价格
   */
  suggestedPrice?: number;
  /**
   * 建议风格
   */
  suggestedStyleCode?: string;
  suggestedStyleName?: string;
  /**
   * 建议类别
   */
  suggestedCategoryCode?: string;
  suggestedCategoryName?: string;
  /**
   * 建议波段
   */
  suggestedWaveBatchCode?: string;
  /**
   * 建议店铺名
   */
  suggestedShopName?: string;
  suggestedShopId?: string;
  /**
   * 建议店铺 lazada shop short code
   */
  suggestedShopCode?: string;
  /**
   * 建议站点
   */
  suggestedCountrySiteCode?: string;
  /**
   * 印花标识：0-无，1-定位印，2-满印，3-净色
   */
  suggestedPrintingCode?: string;
  suggestedPrintingName?: string;
  /**
   * 备注（不超过512个字符）
   */
  remark?: string;
  /**
   * 附件url列表
   */
  attachments?: IPickingStyleConfirmReqAttachmentsItem[];
  /**
   * 货盘id
   */
  cargoTrayId?: number;
  /**
   * 货盘编号
   */
  cargoTrayCode?: string;
  /**
   * 跑图问题反馈code
   */
  runningDiagramProblemCodes?: string[];
  /**
   * 【商品主题】编号 v3.10.1
   */
  productThemeCode?: string;
  /**
   * 【商品主题】名称 v3.10.1
   */
  productThemeName?: string;
}
export interface IPickingStyleConfirmReqAttachmentsItem {
  /**
   * 文件地址
   */
  fileUrl?: string;
  /**
   * 文件名称
   */
  fileName?: string;
  /**
   * 文件类型
   */
  fileType?: string;
}
// ⬆️ 确认选款请求体

// ⬇️ 获取选图历史记录响应体 接口：https://yapi.textile-story.com/project/1058/interface/api/78916
export type IPickingStyleHistoryItem = {
  /**
   * 买手ID
   */
  selectorId: string;
  /**
   * 买手名称
   */
  selectorName: string;
  /**
   * 选款时间
   */
  selectionTime: string;
  /**
   * 选款结果列表
   */
  pickingStyleResults: IPickingStyleHistoryResPickingStyleResultsItem[];
};

export interface IPickingStyleHistoryResPickingStyleResultsItem {
  /**
   * 选款结果ID
   */
  pickingStyleResultId: string;
  /**
   * 序号
   */
  serialNum: number;
  /**
   * 图片
   */
  pickingStyleResultDetails: IPickingStyleHistoryResPickingStyleResultDetailsItem[];
  /**
   * 选用状态：0-未选择，1-可用，2-不可用
   */
  pickingState: PICK_STATE_ENUM;
  /**
   * 建议价格
   */
  suggestedPrice: string;
  /**
   * 建议风格
   */
  suggestedStyleCode: string;
  suggestedStyleName: string;
  /**
   * 建议类目
   */
  suggestedCategoryCode: string;
  suggestedCategoryName: string;
  /**
   * 建议波段
   */
  suggestedWaveBatchName: string;
  /**
   * 建议店铺
   */
  suggestedShopName: string;
  /**
   * 建议店铺简码
   */
  suggestedShopShortCode: string;
  /**
   * 印花标识：0-无，1-定位印，2-满印，3-净色
   */
  suggestedPrintingName: string;
  /**
   * 货盘
   */
  cargoTrayName: string;
  /**
   * 建议国家站点
   */
  suggestedCountrySiteName: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 附件地址列表
   */
  attachments: IPickingStyleHistoryResAttachmentsItem[];
}
export interface IPickingStyleHistoryResPickingStyleResultDetailsItem {
  /**
   * 图片id
   */
  pickingPictureId: string;
  /**
   * 生成图
   */
  pictureUrl: string;
  /**
   * 修复图
   */
  repairImgUrl: string;
  /**
   * 组号
   */
  groupNum: string;
  /**
   * 序号
   */
  serialNum: string;
  /**
   * 是否主图 1是 0否
   */
  mainImageType: YES_NO_NUMBER_ENUM;
  /**
   * 是否修图 1是 0否
   */
  fixImageType: YES_NO_NUMBER_ENUM;
  /**
   * 是否淘汰 1是 0否
   */
  eliminateType: YES_NO_NUMBER_ENUM;
  /**
   * 淘汰原因
   */
  eliminateReasonCodes: string[];
}
export interface IPickingStyleHistoryResAttachmentsItem {
  /**
   * 文件地址
   */
  fileUrl: string;
  /**
   * 文件名称
   */
  fileName: string;
  /**
   * 文件类型
   */
  fileType: string;
}
// ⬆️ 获取选图历史记录响应体

// ⬇️ 批量确认选款样式请求体 接口：https://yapi.textile-story.com/project/1058/interface/api/78820
/**
 * 批量确认请求
 */
export interface IPickingStyleConfirmBatchReq {
  /**
   * 选款明细ID
   */
  confirmDetailIds: IPickingStyleConfirmBatchReqConfirmDetailIdsItem[];
  availableDetail?: IPickingStyleConfirmBatchReqAvailableDetail;
}
export interface IPickingStyleConfirmBatchReqConfirmDetailIdsItem {
  /**
   * 选款任务ID
   */
  pickingId: string;
  /**
   * 可用款式明细ID
   */
  availablePickingStyleDetailIds?: string[];
  /**
   * 不可用款式明细ID
   */
  unAvailablePickingStyleDetailIds?: string[];
}
/**
 * 可用款式配置详情
 */
export interface IPickingStyleConfirmBatchReqAvailableDetail {
  /**
   * 建议价格
   */
  suggestedPrice?: number;
  /**
   * 建议风格
   */
  suggestedStyleCode?: string;
  suggestedStyleName?: string;
  /**
   * 建议类别
   */
  suggestedCategoryCode?: string;
  suggestedCategoryName?: string;
  /**
   * 建议波段
   */
  suggestedWaveBatchCode?: string;
  /**
   * 建议店铺名
   */
  suggestedShopName?: string;
  suggestedShopId?: string;
  /**
   * 建议店铺 lazada shop short code
   */
  suggestedShopCode?: string;
  /**
   * 建议站点
   */
  suggestedCountrySiteCode?: string;
  /**
   * 印花标识：0-无，1-定位印，2-满印，3-净色
   */
  suggestedPrintingCode?: string;
  suggestedPrintingName?: string;
  /**
   * 备注（不超过512个字符）
   */
  remark?: string;
  /**
   * 附件url列表
   */
  attachments?: IPickingStyleConfirmReqAttachmentsItem[];
  /**
   * 货盘id
   */
  cargoTrayId?: number;
  /**
   * 货盘编号
   */
  cargoTrayCode?: string;
}
export interface IPickingStyleConfirmBatchReqAttachmentsItem {
  /**
   * 文件地址
   */
  fileUrl?: string;
  /**
   * 文件名称
   */
  fileName?: string;
  /**
   * 文件类型
   */
  fileType?: string;
}
// ⬆️ 批量确认选款样式请求体

// ⬇️ 导入选款列表外部数据响应体 接口：https://yapi.textile-story.com/project/1058/interface/api/78812
export interface IPickingStyleImportRes {
  /**
   * 成功导入的记录数
   */
  successCount: number;
  /**
   * 失败的记录数
   */
  failCount: number;
  /**
   * 失败的详细信息列表
   */
  failureDetails: IPickingStyleImportResFailureDetailsItem[];
}
export interface IPickingStyleImportResFailureDetailsItem {
  /**
   * 失败的行号
   */
  rowNumber: string;
  /**
   * 失败原因
   */
  reason: string;
}
// ⬆️ 导入选款列表外部数据响应体

// ⬇️ 新增店铺请求体 接口：https://yapi.textile-story.com/project/1058/interface/api/79028
/**
 * 新增店铺请求对象
 */
export interface ILazadaPublishTaskAddShopReq {
  /**
   * 商铺名称
   */
  shopName: string;
  /**
   * 商铺简码
   */
  shopShortCode: string;
}
// ⬆️ 新增店铺请求体

// ⬇️ 全部店铺列表响应体 接口：https://yapi.textile-story.com/project/1058/interface/api/80916
export type ILazadaAllShopItem = {
  /**
   * 主键ID
   */
  lazadaShopId: string;
  /**
   * lazada店铺名
   */
  lazadaShopName: string;
  /**
   * shortCode
   */
  shortCode: string;
};
// ⬆️ 全部店铺列表响应体

// ⬇️ 查询站点下拉框数据响应体 接口：https://yapi.textile-story.com/project/1058/interface/api/78924
export type IPickingStyleCountrySitesRes = {
  /**
   * 站点代码
   */
  code: string;
  /**
   * 站点名称
   */
  name: string;
}[];
// ⬆️ 查询站点下拉框数据响应体

// ⬇️ 查询供给落坑数请求体 接口：https://yapi.tiangong.site/project/39/interface/api/2989
/**
 * req
 */
export interface IBatchConfirmReq {
  /**
   * 品类code
   */
  categoryCode?: string;
  /**
   * 波次code
   */
  waveBatchCode?: string;
  /**
   * 供给方式code
   */
  supplyModeCode?: string;
  /**
   * 店铺id
   */
  shopId?: string;
}
// ⬆️ 查询供给落坑数请求体

// ⬇️ 查询供给落坑数响应体 接口：https://yapi.tiangong.site/project/39/interface/api/2989
export interface IBatchConfirmRes {
  /**
   * 品类code
   */
  categoryCode: string;
  /**
   * 波次code
   */
  waveBatchCode: string;
  /**
   * 供给方式code
   */
  supplyModeCode: string;
  /**
   * 企划总供给数量
   */
  planningTotalQuantity: string;
  /**
   * 落坑总供给数量
   */
  finishTotalQuantity: string;
}
// ⬆️ 查询供给落坑数响应体

/**
 * 批量确认选款 v4.1 请求参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/100615
 */
export interface PickingStyleBatchConfirmReq {
  /** 注释 */
  confirms?: PickingStyleBatchConfirmReqConfirmsItem[];
}

/**
 * 注释
 */
export interface PickingStyleBatchConfirmReqConfirmsItem {
  /** 选款任务ID */
  pickingId: string;
  /** 注释 */
  result: PickingStyleBatchConfirmReqResultItem[];
}

/**
 * 注释
 */
export interface PickingStyleBatchConfirmReqResultItem {
  /** 款式id */
  pickingStyleId: string;
  /** 选用状态：1已选中,2未选中 */
  pickingState: number;
  /** 更新版本(不为空则无修改, 空则修改) */
  updateVersion?: number;
  /** 图片信息 */
  imageInfos?: any[];
}

/**
 * 注释
 */
export interface PickingStyleBatchConfirmReqImageInfosItem {
  /** 图片id */
  pickingPictureId?: number;
  /** 序号 */
  serialNum?: number;
  /** 是否主图 1是 0否 */
  mainImageType?: number;
  /** 是否修图 1是 0否 */
  fixImageType?: number;
  /** 是否淘汰 1是 0否 */
  eliminateType?: number;
  /** 淘汰原因 */
  eliminateReasonCodes?: string[];
}

/**
 * 批量确认选款 v4.1 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/100615
 */
export interface PickingStyleBatchConfirmRes {
}

/**
 * 获取ai任务 请求参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/100663
 */
export interface PickingStyleDesignTaskReq {
}

/**
 * 获取ai任务 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/100663
 */
export interface PickingStyleDesignTaskRes {
  /** 模特图 */
  aiModelUrl?: string;
  /** 场景图 */
  picturePath?: string;
  refWeight?: number;
  /** 模特名称 */
  modeName?: string;
  /** 背景增强(1:开启, 0:关闭) */
  filterBack?: number;
  /** 生成模式：0-单姿势；1-多姿势 */
  generateMode?: number;
  /** 履约增强：0-否；1-是 v3.10.1 */
  promiseEnhanced?: number;
  /** 脸部修复(1:开启, 0:关闭) */
  faceRepair?: number;
  /** 是否使用加速推理 */
  fastForward?: number;
  /** 一拖三(1:开启, 0:关闭) */
  tryOnFix?: number;
  /** 素材 */
  materials?: string[];
}

/**
 * admin-智能开款-查询任务详情 请求参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/100675
 */
export interface SmartDevelopStyleDetailReq {
}

/**
 * admin-智能开款-查询任务详情 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/100675
 */
export interface SmartDevelopStyleDetailRes {
  /** 任务id */
  taskId?: number;
  /** 任务编号 */
  taskCode?: string;
  /** 任务状态 */
  taskStatus?: string;
  /** 任务类型(智能开款) */
  taskType?: string;
  /** 任务来源：0-FM用户上传；1-灵感源 */
  taskSource?: number;
  /** 关联任务类型 */
  relationTaskType?: string;
  /** 关联任务编号 */
  relationTaskCode?: string;
  /** 排队时长(秒) */
  queueDuration?: string;
  /** 生成时长(秒) */
  generateDuration?: string;
  /** 像素值:宽高 */
  size?: string;
  /** 随机数种子 */
  seed?: string;
  /** 面料市场名 */
  fabricMarketName?: string;
  /** 面料色号 */
  fabricColorCode?: string;
  /** 模特描述词 */
  aiModelCaption?: string;
  /** 模型版本 */
  modelVersion?: string;
  /** 客户名称 */
  customerName?: string;
  /** 参考图 */
  referencePicture?: string;
  /** 参考图权重，值越大，参考度越低，建议1~8的浮点数（默认0） */
  refWeight?: number;
  /** 识别品类Code */
  identifyCategoryCode?: string;
  /** 识别品类名称 */
  identifyCategoryName?: string;
  /** 品类Code */
  categoryCode?: string;
  /** 品类名称 */
  categoryName?: string;
  /** 款式类型：0-净色、1-花型 */
  styleType?: number;
  /** 生成模式,1:多姿势,0:单姿势 */
  generateMode?: number;
  /** 场景信息 */
  sceneInfo?: SmartDevelopStyleDetailResSceneInfo;
  /** 模特 编号 */
  aiModelCode?: string;
  /** 模特 名称 */
  aiModelName?: string;
  /** 模特图片Url */
  aiModelUrl?: string;
  /** 模特素材ID */
  modelMaterialId?: number;
  /** 模特素材名称 */
  modelMaterialName?: string;
  /** 模特素材URL */
  modelMaterialUrl?: string;
  /** 模特素材描述 */
  modelMaterialCaption?: string;
  /** Aigc任务描述 */
  taskAigcMessage?: string;
  /** 背景增强 (1:开启, 0:关闭)
- 多姿势:默认开启, 入参传"不开启"才改变值
- 单姿势:默认关闭 */
  bgEnhanced?: number;
  /** 履约增强：0-否；1-是 */
  promiseEnhanced?: number;
  /** 脸部修复(1:开启, 0:关闭) */
  faceFix?: number;
  /** 原始识别clip标签列表 */
  identifyClipLabels?: SmartDevelopStyleDetailResIdentifyClipLabelsItem[];
  /** 主题标签列表 */
  topicLabels?: SmartDevelopStyleDetailResIdentifyClipLabelsItem[];
  /** 款式标签列表 */
  designLabels?: SmartDevelopStyleDetailResIdentifyClipLabelsItem[];
  /** 款式标签 */
  labels?: SmartDevelopStyleDetailResIdentifyClipLabelsItem[];
  /** 花型标签 */
  flowerPatternLabels?: SmartDevelopStyleDetailResIdentifyClipLabelsItem[];
  /** 风格标签 */
  styleLabels?: SmartDevelopStyleDetailResIdentifyClipLabelsItem[];
  /** 推荐面料 */
  recommendFabricList?: SmartDevelopStyleDetailResRecommendFabricListItem[];
  /** 推荐面料任务信息 */
  fabricRecommendTask?: SmartDevelopStyleDetailResFabricRecommendTask;
  /** 生成图 */
  generateImages?: SmartDevelopStyleDetailResGenerateImagesItem[];
  /** 生成描述词 */
  prompts?: string;
  /** 创建人id */
  creatorId?: number;
  /** 创建人 */
  creatorName?: string;
  /** 创建时间 */
  createdTime?: string;
  /** 模型编码（字典配置编码） */
  modeCode?: string;
  /** 模型名称（字典配置名称） */
  modeName?: string;
  /** 是否使用加速推理 */
  fastForward?: number;
  /** 素材 */
  materials?: SmartDevelopStyleDetailResMaterialsItem[];
}

/**
 * 素材
 */
export interface SmartDevelopStyleDetailResMaterialsItem {
  /** 素材库ID */
  materialLibraryId?: number;
  /** 素材类型 */
  materialType?: string;
  /** 模特图片URL */
  pictureUrl?: string;
  /** mask图URL */
  maskPictureUrl?: string;
}

/**
 * 生成图
 */
export interface SmartDevelopStyleDetailResGenerateImagesItem {
  /** 图片组ID */
  pictureId?: string;
  pictureUrl?: string;
  repairImgUrl?: string;
  /** 评价ID */
  evaluateImageId?: number;
  /** 是否是好评：0-否；1-是，返回null就是还没评分 */
  good?: number;
  /** 组号 */
  groupNum?: number;
  /** 是否可以履约：不需要展示[-1]；0=不可以[0]；可履约[1]；履约处理中（不需展示）[2]； */
  promiseEnabled?: number;
  /** 面料是否一致：不需要展示[-1]；不一致[0]；一致[1] */
  fabricConsistent?: number;
  /** 推荐状态：
0-初始（什么标签都不用展示，因为不用做面料推荐）；
2-推荐中；
3-推荐成功；
9-推荐失败； */
  recommendState?: number;
  /** 图片列表 */
  pictureList?: SmartDevelopStyleDetailResPictureListItem[];
  select?: boolean;
}

/**
 * 注释
 */
export interface SmartDevelopStyleDetailResPictureListItem {
  /** 图片ID */
  pictureId?: number;
  /** 图片url */
  pictureUrl?: string;
  /** 图片名称 */
  pictureName?: string;
  /** 修复图 */
  repairImgUrl?: string;
  /** 序号 */
  serialNum?: number;
  select?: boolean;
}

/**
 * 推荐面料任务信息
 */
export interface SmartDevelopStyleDetailResFabricRecommendTask {
  /** 任务ID */
  taskId?: number;
  /** 任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败； */
  taskStatus?: number;
  /** 任务进度0-100 */
  taskProgress?: number;
  /** 排队位置 */
  rankPosition?: number;
  /** 消息备注 */
  message?: string;
  /** 创建时间 */
  createdTime?: string;
}

/**
 * 推荐面料
 */
export interface SmartDevelopStyleDetailResRecommendFabricListItem {
  /** 推荐面料ID */
  id?: number;
  /** 家族代表面料类目 */
  familyFabricCategory?: string;
  /** 中台主商品ID */
  sourceCommodityId?: number;
  /** 商品ID */
  commodityId?: number;
  /** 商品编码 */
  commodityCode?: string;
  /** 商品名称 */
  commodityName?: string;
  /** 商品图片 */
  commodityPicture?: string;
  /** 纹理色块图 */
  colorPicture?: string;
  /** SKU-ID */
  skuId?: number;
  /** SKU-编码 */
  skuCode?: string;
  /** 色号 */
  colorCode?: string;
  /** RGB */
  rgb?: string;
}

/**
 * 原始识别clip标签列表
 */
export interface SmartDevelopStyleDetailResIdentifyClipLabelsItem {
  /** 中文标签 */
  cn?: SmartDevelopStyleDetailResCn;
  /** 英文标签 */
  en?: SmartDevelopStyleDetailResCn;
  /** coloro的编码，非颜色标签不存在此字段；多个颜色用逗号分隔 */
  coloroCodes?: string;
}

/**
 * 注释
 */
export interface SmartDevelopStyleDetailResCn {
  /** 标签名 */
  name?: string;
  /** 标签编号 */
  code?: string;
  /** 标签值列表 */
  values?: SmartDevelopStyleDetailResValuesItem2[];
}

/**
 * 注释
 */
export interface SmartDevelopStyleDetailResValuesItem2 {
  /** 标签名 */
  name?: string;
  /** 标签编号 */
  code?: string;
  /** 标签值列表 */
  values?: SmartDevelopStyleDetailResValuesItem[];
}

/**
 * 注释
 */
export interface SmartDevelopStyleDetailResValuesItem {
}

/**
 * 场景信息
 */
export interface SmartDevelopStyleDetailResSceneInfo {
  /** 场景ID */
  sceneId?: number;
  /** 场景名称 */
  sceneName?: string;
  /** 图片ID */
  pictureId?: number;
  /** 图片路径 */
  picturePath?: string;
  /** 场景描述 */
  pictureCaption?: string;
}
/**
 * 根据ID查询姿势列表详情 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/101311
 */
export interface ByIdRes {
  /** 任务ID */
  taskId?: number;
  /** 灵感ID */
  inspirationId?: number;
  /** 任务编号 */
  taskCode?: string;
  /** 任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败； */
  taskState?: number;
  /** 来源类型
0-用户上传，1-灵感源 */
  sourceType?: string;
  /** 来源业务id */
  sourceBusinessId?: string;
  /** 来源编码 */
  taskSource?: string;
  /** 来源业务编号 */
  sourceBusinessCode?: string;
  /** 品类编码 */
  categoryCode?: string;
  /** 品类名称 */
  category?: string;
  /** 服装类型编码 */
  clothTypeCode?: string;
  /** 服装类型名称 */
  clothTypeName?: string;
  /** 模型编码（字典配置编码） */
  modeCode?: string;
  /** 模型名称（字典配置名称） */
  modeName?: string;
  /** 原图url */
  refImgUrl?: string;
  /** 是否裁头(1:开启, 0:关闭) */
  cuttingHead?: number;
  /** 是否需要背面(1:开启, 0:关闭) */
  needBackSide?: number;
  /** 背面图数量 */
  backSideCount?: number;
  /** 生成数量 */
  genCount?: number;
  /** 排队时长(秒) */
  queueDuration?: number;
  /** 生成时长(秒) */
  generateDuration?: number;
  /** 信息备注 */
  message?: string;
  /** 创建人 id */
  creatorId?: number;
  /** 创建人 名称 */
  creatorName?: string;
  /** 创建时间 */
  createdTime?: string;
  /** 生成时间 */
  generateTime?: string;
  /** 任务状态 */
  taskStatus?: number;
  /** 生成图 */
  generateImages?: ByIdResGenerateImagesItem[];
  /** 风格化衍生信息 */
  styleGenTask?: ByIdResStyleGenTask;
}

/**
 * 风格化衍生信息
 */
export interface ByIdResStyleGenTask {
  /** 任务id */
  taskId?: number;
  /** 任务编号 */
  taskCode?: string;
  /** 任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败； */
  taskStatus?: number;
  /** 创建人id */
  creatorId?: number;
  /** 创建人名称 */
  creatorName?: string;
  /** 创建时间 */
  createdTime?: string;
  /** 生图类型 */
  genType?: string;
  /** 参考图 */
  refImgUrl?: string;
  /** 提示词 */
  prompt?: string;
  /** 脸部修复(1:开启, 0:关闭) */
  faceFix?: number;
  /** 生成数量 */
  genCount?: number;
  /** 背景图描述 */
  bgImgDesc?: string;
  /** 背景图url */
  bgImgUrl?: string;
  /** 模特图描述 */
  modelImgDesc?: string;
  /** 模特图url */
  modelImgUrl?: string;
  /** 生图的尺寸 */
  imgSize?: string;
  /** 来源 */
  source?: string;
  /** 来源 */
  sourceBusiness?: string;
  /** 来源业务id */
  sourceBusinessId?: number;
  /** 来源业务编号 */
  sourceBusinessCode?: string;
  /** 风格模型ID */
  styleModelId?: number;
  /** 模型名称 */
  styleModelName?: string;
  /** lora的名字 */
  loraName?: string;
  /** 底模 */
  baseModel?: string;
  /** 生成时间 */
  generateTime?: string;
  /** 衍生图片列表 */
  images?: ByIdResImagesItem[];
}

/**
 * 衍生图片列表
 */
export interface ByIdResImagesItem {
  /** 图片ID */
  imageId?: number;
  /** 图片URL */
  imageUrl?: string;
  /** 序号 */
  serialNum?: number;
  /** 脸部修复图 */
  faceRepairUrl?: string;
}

/**
 * 生成图
 */
export interface ByIdResGenerateImagesItem {
  /** 图片ID */
  pictureId?: number;
  /** 图片url */
  pictureUrl?: string;
  /** 图片名称 */
  pictureName?: string;
  /** 任务ID */
  taskId?: number;
  /** 修复图 */
  repairImgUrl?: string;
  /** 序号 */
  serialNum?: number;
}
