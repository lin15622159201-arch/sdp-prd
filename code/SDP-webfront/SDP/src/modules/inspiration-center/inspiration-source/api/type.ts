import { YES_NO_NUMBER_ENUM } from '@/constant';
import {
  SUBMIT_STATUS_ENUM,
  IDENTIFY_STATUS_ENUM,
  GENERATE_MODE,
  TASK_STATUS_ENUM,
  DATA_SOURCE_ENUM,
} from '@/modules/inspiration-center/inspiration-source/constant';

// ⬇️ 列表分页请求体 接口：https://yapi.tiangong.site/project/39/interface/api/2866
/**
 * 请求对象
 */
export interface IInspirationPageReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 品类
   */
  externalCategory?: string;
  /**
   * 灵感创建时间-开始
   */
  inspirationStartCreatedTime?: string;
  /**
   * 灵感创建时间-结束
   */
  inspirationEndCreatedTime?: string;
  /**
   * 供给方式
   */
  suggestedSupplyModeCode?: string;
  /**
   * 灵感图来源
   */
  inspirationSource?: string;
  /**
   * 国家站点code
   */
  sourceCountrySiteCode?: string;
  /**
   * 识别结果
   */
  identifiedResult?: IDENTIFY_STATUS_ENUM;
  /**
   * 提交次数
   */
  inspirationSubmitCount?: number;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 提交人名称
   */
  submitterName?: string;
  /**
   * 状态
   */
  submitStatus?: SUBMIT_STATUS_ENUM;
  /**
   * 数据来源
   */
  dataSourceCode?: DATA_SOURCE_ENUM;
  /**
   * 企划来源
   */
  planningSourceCode?: string;
  /**
   * 创建人id
   */
  creatorIds?: string[];
  /**
   * 灵感编号
   */
  inspirationCode?: string;
  /**
   * 波次
   */
  waveBatchCode?: string;
  /**
   * 识别品类code
   */
  identifiedCategoryCode?: string;
  identifiedCategoryName?: string;
}
// ⬆️ 列表分页请求体

// ⬇️ 列表分页响应体 接口：https://yapi.tiangong.site/project/39/interface/api/2866
export interface IInspirationPageRes {
  pageNum: string;
  total: string;
  list: IInspirationPageResListItem[];
}
export interface IInspirationPageResListItem {
  /**
   * 灵感id
   */
  inspirationId: string;
  /**
   * 企划来源
   */
  planningSourceCode: string;
  planningSourceName: string;
  /**
   * 波次
   */
  waveBatchCode: string;
  waveBatchName: string;
  /**
   * 灵感图
   */
  inspirationImage: string;
  /**
   * 外部品类
   */
  externalCategory: string;
  /**
   * 灵感图来源
   */
  inspirationImageSource: string;
  /**
   * 来源国家站点
   */
  sourceCountrySiteName: string;
  /**
   * 划线价(US)
   */
  retailPrice: string;
  /**
   * 售价(US)
   */
  salePrice: string;
  /**
   * 建议供给方式
   */
  suggestedSupplyModeCode: string;
  /**
   * 灵感创建时间
   */
  inspirationCreatedTime: string;
  /**
   * 数据来源
   */
  dataSource: string;
  /**
   * 识别品类
   */
  identifiedCategory: string;
  identifiedCategoryName?: string;
  /**
   * 灵感编号
   */
  inspirationCode: string;
  /**
   * 识别结果
   */
  identifiedStatus: IDENTIFY_STATUS_ENUM;
  /**
   * 识别标签
   */
  identifiedLabel: IInspirationPageResIdentifiedLabelItem[];
  /**
   * 款式类型：0-净色、1-花型
   */
  styleType: string;
  /**
   * 灵感提交次数
   */
  submitCount: string;
  /**
   * 状态
   */
  submitStatus: SUBMIT_STATUS_ENUM;
  /**
   * 创建人名称
   */
  creatorName: string;
  /**
   * 创建人ID
   */
  creatorId: string;
  /**
   * 灵感图品牌
   */
  inspirationBrand: string;
  /**
   * 识别品类code
   */
  identifiedCategoryCode?: string[] | string;
  styleSourceName: string;
  styleSourceCode: string;
}
export interface IInspirationPageResIdentifiedLabelItem {
  key: string;
  value: string;
}
export interface IInspirationImages {
  name?: string;
  url?: string;
}
// ⬆️ 列表分页响应体

export type IInspirationExportReq = IInspirationPageReq;

// ⬇️ 图片导入请求体 接口：https://yapi.tiangong.site/project/39/interface/api/2869
export interface IImageImportReq {
  /**
   * 供给方式
   */
  supplyMethodCode?: string;
  /**
   * 波次
   */
  waveBatchCode?: string;
  /**
   * 企划来源
   */
  planningSourceCode?: string;
  /**
   * 国家站点code
   */
  countrySiteCode?: string;
  /**
   * 灵感图(多个url)
   */
  inspirationImages: IInspirationImages[];
  /**
   * 灵感图来源
   */
  inspirationImageSourceCode?: string;
  /**
   * 灵感图品牌
   */
  inspirationBrandCode?: string;
  /**
   * 风格
   */
  styleCode?: string;
  /**
   * 年龄
   */
  ageCode?: string;
  /**
   * 爆款
   */
  popularCode?: string;
  /**
   * 款式来源编码
   */
  styleSourceCode?: string;
  /**
   * 款式来源名称
   */
  styleSourceName?: string;
}
// ⬆️ 图片导入请求体

// ⬇️ 提交任务请求体 接口：https://yapi.tiangong.site/project/39/interface/api/2871
/**
 * req
 */
export interface ITaskSubmitReq {
  newGenerateNum?: number;
  modelEthnicity?: string;
  materials?: string;
  /**
   * 每款生图数量
   */
  styleGenCount?: number;
  /**
   * 灵感id
   */
  inspirationIds?: string[];
  /**
   * 波次
   */
  waveBatchCode?: string;
  /**
   * 货盘id
   */
  cargoTrayId?: string;
  /**
   * 货盘编号
   */
  cargoTrayCode?: string;
  /**
   * 供给方式
   */
  supplyMethod?: string;
  /**
   * 生成模式,1:多姿势,0:单姿势
   */
  generateMode?: GENERATE_MODE;
  /**
   * 场景code
   */
  sceneInfo?: ITaskSubmitReqSceneInfoItem;
  /**
   * 模特code
   */
  modelInfo?: ITaskSubmitReqModelInfoItem;
  modelMaterialInfo?: ITaskSubmitReqModelMaterialInfoItem;
  /**
   * 生成数量
   */
  generateNum?: number;
  /**
   * 期望成本价
   */
  expectedCostPrice?: number;
  /**
   * 模型code
   */
  modeCode?: string;
  /**
   * 模型名称
   */
  modeName?: string;
  /**
   * 背景增强(1:开启, 0:关闭)
   */
  filterBack?: YES_NO_NUMBER_ENUM;
  /**
   * 脸部修复(1:开启, 0:关闭)
   */
  faceRepair?: YES_NO_NUMBER_ENUM;
  /**
   * 履约增强：0-否；1-是 v3.10.1
   */
  promiseEnhanced?: YES_NO_NUMBER_ENUM;
  /**
   * 品类编码（aigc才可能传）v3.11
   */
  categoryCode?: string;
  /**
   * 品类名称 (aigc才可能传) v3.11
   */
  categoryName?: string;
  /**
   * 是否同步修改灵感识别品类1-是 0-否  v3.11
   */
  syncCategory?: YES_NO_NUMBER_ENUM;
  /**
   * 参考权重
   */
  refWeight: number | null;
  /**
   * 是否开启模型加速，1-开启，0-不开启
   */
  fastForward?: 0 | 1;
  /**
   * 是否加速
   */
  enableDistill?: number;
}
export interface ITaskSubmitReqSceneInfoItem {
  /**
   * 场景ID
   */
  sceneId?: string;
  /**
   * 场景名称
   */
  sceneName?: string;
  /**
   * 图片ID
   */
  pictureId?: string;
  /**
   * 图片路径
   */
  picturePath?: string;
  /**
   * 场景描述
   */
  pictureCaption?: string;

}
export interface ITaskSubmitReqModelInfoItem {
  /**
   * 模特
   */
  aiModelCode?: string;
  aiModelName?: string;
  aiModelUrl?: string;
}
export interface ITaskSubmitReqModelMaterialInfoItem {
  modelMaterialId?: string;
  modelMaterialName?: string;
  modelMaterialUrl?: string;
}
// ⬆️ 提交任务请求体

// ⬇️ 详情响应体 接口：https://yapi.tiangong.site/project/39/interface/api/2870
export interface IInspirationDetailRes {
  /**
   * 灵感id
   */
  inspirationId: string;
  /**
   * 企划来源
   */
  planningSourceCode: string;
  /**
   * 波次
   */
  waveBatchCode: string;
  /**
   * 灵感图
   */
  inspirationImage: string;
  /**
   * 外部品类
   */
  externalCategory: string;
  /**
   * 灵感图来源
   */
  inspirationImageSource: string;
  /**
   * 来源国家站点
   */
  sourceCountrySiteName: string;
  /**
   * 划线价(US)
   */
  retailPrice: string;
  /**
   * 销售价(US)
   */
  salePrice: string;
  /**
   * 建议供给方式
   */
  suggestedSupplyModeCode: string;
  /**
   * 灵感创建时间
   */
  inspirationCreatedTime: string;
  /**
   * 数据来源
   */
  dataSource: string;
  /**
   * 识别品类
   */
  identifiedCategory: string;
  identifiedCategoryName: string;
  /**
   * 灵感编号
   */
  inspirationCode: string;
  /**
   * 识别结果: 1通过, 0无效
   */
  identifiedStatus: IDENTIFY_STATUS_ENUM;
  /**
   * 识别标签
   */
  identifiedLabel: string;
  /**
   * 款式类型：0-净色、1-花型
   */
  styleType: string;
  /**
   * 灵感提交次数
   */
  submitCount: string;
  /**
   * 状态
   */
  submitStatus: SUBMIT_STATUS_ENUM;
  /**
   * 创建人名称
   */
  creatorName: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 商品链接URL
   */
  productLinkUrl: string;
  /**
   * 任务信息
   */
  taskInfo: IInspirationDetailResTaskInfoItem[];
  inspirationBrand: string;
  styleSourceName: string;
}
export interface IInspirationDetailResTaskInfoItem {
  downstreamTaskId?: string;
  /**
   * 日志id
   */
  logId: string;
  /**
   * 业务id
   */
  businessId: string;
  /**
   * 业务code
   */
  businessCode: string;
  /**
   * 跑图类型
   */
  generationType: string;
  /**
   * 提交人
   */
  submitterName: string;
  /**
   * 提交时间
   */
  submitTime: string;
  /**
   * 任务状态
   */
  taskStatus: TASK_STATUS_ENUM;
  /**
   * 波次
   */
  waveBatchName: string;
  /**
   * 跑图任务编号
   */
  aiTaskCode: string;
}
// ⬆️ 详情响应体

// ⬇️ 重新提交-页面回显响应体 接口：https://yapi.tiangong.site/project/39/interface/api/2909
export interface IReSubmitDetailRes {
  /**
   * 灵感id
   */
  inspirationId: string;
  /**
   * 波次
   */
  waveBatchCode: string;
  /**
   * 供给方式
   */
  supplyMethodCode: string;
  /**
   * 生成模式1:多姿势0:单姿势
   */
  generateMode: GENERATE_MODE;
  sceneInfo: IReSubmitDetailResSceneInfo;
  modelInfo: IReSubmitDetailResModelInfo;
  modelMaterialInfo: IReSubmitDetailResModelMaterialInfo;
  /**
   * 生成数量
   */
  generateNum: number;
  /**
   * 模型code
   */
  modeCode: string;
  /**
   * 模型名称
   */
  modeName: string;
  /**
   * 风格模型Id
   */
  styleModelId?: string;
  /**
   * 提示词
   */
  prompt?: string;
  /**
   * 分辨率
   */
  imgSize?: string;
  /**
   * 参考图
   */
  refImgUrl?: string;
  /**
   * 模特提示词
   */
  modelImgDesc?: string;
  /**
   * 背景提示词
   */
  bgImgDesc?: string;
  /**
   * 背景图
   */
  bgImgUrl?: string;
  /**
   * 模特图
   */
  modelImgUrl?: string;
  enableFollowability?: string;
}
/**
 * 场景
 */
export interface IReSubmitDetailResSceneInfo {
  /**
   * 场景ID
   */
  sceneId: string;
  /**
   * 场景名称
   */
  sceneName: string;
  /**
   * 图片ID
   */
  pictureId: string;
  /**
   * 图片路径
   */
  picturePath: string;
  /**
   * 场景描述
   */
  pictureCaption: string;
}
/**
 * 模特
 */
export interface IReSubmitDetailResModelInfo {
  /**
   * 模特
   */
  aiModelCode: string;
  aiModelName: string;
  aiModelUrl: string;
}
export interface IReSubmitDetailResModelMaterialInfo {
  modelMaterialId: string;
  modelMaterialName: string;
  modelMaterialUrl: string;
}
// ⬆️ 重新提交-页面回显响应体

// ⬇️ Excel导入响应体 接口：https://yapi.tiangong.site/project/39/interface/api/2868
export interface IInspirationImportRes {
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
  failureDetails: IInspirationImportResFailureDetailsItem[];
}
export interface IInspirationImportResFailureDetailsItem {
  /**
   * 失败的行号
   */
  rowNumber: number;
  /**
   * 失败原因
   */
  reason: string;
}
// ⬆️ Excel导入响应体

// ⬇️ AI设计品类列表响应体 接口：https://yapi.tiangong.site/project/19/interface/api/1276
/**
 * 响应数据
 */
export type ICategoryListRes = {
  /**
   * 父级ID
   */
  parentId: string;
  /**
   * 父级编码
   */
  parentCode: string;
  /**
   * 标签编码
   */
  labelCode: string;
  /**
   * 分类ID
   */
  id: string;
  /**
   * 标签编码
   */
  code: string;
  /**
   * 标签值
   */
  value: string;
  /**
   * 是否启用：{0-否 ,1-是},默认1
   */
  enable: YES_NO_NUMBER_ENUM;
  /**
   * 排序
   */
  sort: string;
}[];

export interface ICategoryItem {
  code: string;
  /** 名称 */
  value: string;
  /** 品类ID */
  id: string;
  /**
   * 是否可用
   */
  enable?: string;
  parentId?: string;
  children?: ICategoryItem[];
}
/**
 * 重新识别 请求参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/99709
 */
export interface InspirationReIdentificationReq {
  /** 注释 */
  inspirationIds?: string[];
}

/**
 * 编辑图片 请求参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/100171
 */
export interface InspirationEditImageReq {
  /** 灵感图 */
  url?: string;
  /** 灵感图名称 */
  name?: string;
  /** 灵感ID */
  inspirationId?: string | number;
}

/**
 * 编辑图片 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/100171
 */
export interface InspirationEditImageRes {
}


export interface IDictValuesReq {
  /** 内部字典传 `1000`  */
  dictType?: string;
  /**
   * 是否启用：{0-否 ,1-是}
   */
  enable?: string;
  /**
   * 字典编号集合
   */
  dictCodes: string[];
  /**
   * 升序的
   */
  ascending?: boolean;
}

export type IValuesRes = IDictResItem[];
export interface IDictResItem {
  /**
   * 字典Id
   */
  dictId?: string;
  /**
   * 字典编号
   */
  dictCode?: string;
  /**
   * 字典名称
   */
  dictName?: string;
  /**
   * 字典值
   */
  values: IValuesResItemValuesItem[];
}

export interface IValuesResItemValuesItem {
  /**
   * 字典值id
   */
  valueId?: string;
  /**
   * 字典值编号
   */
  valueCode?: string;
  /**
   * 字典值父编号
   */
  valueParentCode?: string;
  /**
   * 字典值
   */
  dictValue?: string;
  /**
   * 扩展值1
   */
  extValue1?: string;
  /**
   * 扩展值2
   */
  extValue2?: string;
  /**
   * 扩展值3
   */
  extValue3?: string;
  /**
   * 扩展值4
   */
  extValue4?: string;
  /**
   * 扩展值5
   */
  extValue5?: string;
  /**
   * 扩展值6
   */
  extValue6?: string;
  /**
   * 排序
   */
  valueSort?: string;
  /**
   * 是否启用：{0-否 ,1-是},默认1
   */
  enable?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 层级
   */
  level?: number;
  /*
  * 子字典值
  *  */
  children?: IValuesResItemValuesItem[];
  /*
  * 是否禁用
  *  */
  disabled?: boolean;
  /**
   * 字典值
   */
  label: string;
  /**
   * 字典值编号
   */
  value: string;
  code?: string;
  name?: string;
}
/**
 * 创建图片解析 请求参数
 * @see https://yapi.textile-story.com/project/1363/interface/api/100057
 */
export interface PictureCaptionCreateReq {
  /** 图片来源 */
  source: string;
  /** 输入图片 */
  inputImg: string;
}

/**
 * 创建图片解析 响应体
 * @see https://yapi.textile-story.com/project/1363/interface/api/100057
 */
export interface PictureCaptionCreateRes {
}
export interface StyleModelDetailRes {
  /** 模型ID */
  styleModelId?: number;
  /** 模型名称 */
  styleModelName?: string;
  /** 模型说明 */
  styleModelDescribe?: string;
  /** 模型编号 */
  loraName?: string;
  /** 底模 */
  baseModel?: string;
  /** 服装类型编码 */
  clothTypeCode?: string;
  /** 服装类型名称 */
  clothTypeName?: string;
  /** 最优分辨率宽度 */
  sizeWidth?: string;
  /** 最优分辨率高度 */
  sizeHeight?: string;
  /** 模型权重 */
  loraWeight?: string;
  /** guidance */
  guidance?: number;
  /** t5Len */
  t5Len?: number;
  /** prePrompt */
  prePrompt?: string;
  /** 示例图片 */
  sampleImage?: string;
  /** 状态，0：禁用，1启用 */
  enable?: number;
  /** 创建人 */
  creatorId?: number;
  /** 创建人名称 */
  creatorName?: string;
  /** 创建时间 */
  createdTime?: string;
}
/**
 * 编辑品类 请求参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/103315
 */
export type InspirationEditCategoryReq = InspirationEditCategoryReqItem[];

/**
 *  单项响应数据
 */
export interface InspirationEditCategoryReqItem {
  /** 灵感ID */
  inspirationId?: string;
  /** 品类编码 */
  categoryCode?: string;
  /** 品类名称 */
  categoryName?: string;
}
/**
 * 编辑品类 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/103315
 */
export interface InspirationEditCategoryRes {
}
