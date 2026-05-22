import { TIMECONSUMING_SORT_ENUM } from '@/modules/clothes-center/constant/types';
import { IFile } from '@/components/upload/package/type';
import { YES_NO_ENUM } from '@/constant';

/**
 * 查询分单列表
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2486
 */
export interface IAllocatePageReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 打版类型: 1-大货打版 2-正常打版 3-复色打版 4-补做打版
   */
  sampleType?: string;
  /**
   * 打版类型集合: 1-大货打版 2-正常打版 3-复色打版 4-补做打版
   */
  sampleTypeList: string[];
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode?: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCodeList: string[];
  /**
   * 纸样师id
   */
  patternMakerId?: string;
  /**
   * 纸样师id集合
   */
  patternMakerIdList: string[];
  /**
   * 3D版师id集合
   */
  dimensionDesignerIdList: string[];
  /**
   * 设计师id【设计师】
   */
  designerIdList: string[];
  /**
   * 设计组编号
   */
  designerGroupCodeList: string[];
  /**
   * 款生成时间
   */
  skcCreatedTimeStart?: string;
  /**
   * 款生成时间
   */
  skcCreatedTimeEnd?: string;
  /**
   * 创建时间-开始
   */
  createdTimeStart?: string;
  /**
   * 创建时间-结束
   */
  createdTimeEnd?: string;
  /**
   * 当前耗时排序 ascending:升序,descending:降序
   */
  timeConsumingSort?: TIMECONSUMING_SORT_ENUM;
  /**
   * 是否套版款: 0 否 1是
   */
  copyReferType?: string;
  /**
   * 是否衍生款: 0 否 1是
   */
  extendReferType?: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: string;
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
   * 是否取消 0-否、1-是
   */
  isCancel?: string;
  /**
   * 是否查询我的 true=我的、false/null=全部
   */
  personal?: boolean;
  /**
   * 设计小组组别 1 == 选择了设计小组组别 ， 0 == 没有选择设计小组组别，默认就是为 0
   */
  clothesDesigner?: string;
  /**
   * 套版款：1 衍生款：2
   */
  styleReferType?: string;
  /**
   * 是否改款  1:是  0：否   改款0.1
   */
  isChange?: string;
  /**
   * 是否引用
   */
  isReference?: string;
  /**
   * 制作方式
   * 0-仅纸样 1-实物样 2-3D样 3-3D样+实物
   */
  makeClothesType?: string;
  /**
   * 尺码标准编号
   */
  sizeStandardCode?: string;
  /**
   * 版单整状态：0待开始1进行中2已完成3已取消
   * SampleClothesStateEnum
   */
  state?: string;
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
  clothesNodeStepState?: string;
  clothesStepNodeState?: string;
  /**
   * 波段编码集合
   */
  waveBandCodeList: string[];
  /**
   * 审版工艺师ID
   */
  reviewCraftsmanId?: string;
  /**
   * 审版工艺师名称
   */
  reviewCraftsmanName?: string;
  /**
   * 分单结果-版房id
   */
  roomIdList: string[];
  /**
   * 分单员id
   */
  allocateeIdList: string[];
}

export interface IAllocatePageRes {
  page?: number;
  total?: number;
  list: IAllocatePageResListItem[];
}

export interface IAllocatePageResListItem {
  /**
   * 版单id
   */
  clothesId?: string;
  /**
   * 设计版单id
   */
  prototypeId?: string;
  /**
   * 打版类型: 1-大货打版 2-正常打版 3-复色打版 4-补做打版
   */
  sampleType?: string;
  /**
   * 版本号
   */
  versionNum?: string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode?: string;
  /**
   * 原始加工单号
   */
  baseProcessCode?: string;
  /**
   * 设计图片
   */
  designPictureList: string[];
  /**
   * 打版件数
   */
  sampleAmount?: string;
  /**
   * 版单整体状态：0待开始1进行中2已完成3已取消
   * SampleClothesStateEnum
   */
  state?: string;
  /**
   * 版单整体状态描述
   * SampleClothesStateEnum
   */
  stateDesc?: string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: string;
  /**
   * 是否需要下采购（true:是,false/null:否）
   */
  isPurchase?: string;
  /**
   * 面辅料齐套状态(0-未流转、1-待签收、2-已签收)
   */
  materialState?: string;
  /**
   * 设计师id
   */
  designerId?: string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 裁剪师id
   */
  cutterId?: string;
  /**
   * 裁剪师名称
   */
  cutterName?: string;
  /**
   * 车缝师id
   */
  sewerId?: string;
  /**
   * 车缝师名称
   */
  sewerName?: string;
  /**
   * 质检师id
   */
  qualityCheckerId?: string;
  /**
   * 质检师名称
   */
  qualityCheckerName?: string;
  /**
   * 审版师id
   */
  editionReviewerId?: string;
  /**
   * 审版师名称
   */
  editionReviewerName?: string;
  /**
   * 3D版师id
   */
  dimensionDesignerId?: string;
  /**
   * 3D版师名称
   */
  dimensionDesignerName?: string;
  /**
   * 复色款号，不为""时代表复色版
   */
  makeSameDesignCode?: string;
  /**
   * 套版款：1 衍生款：2
   */
  styleReferType?: string;
  /**
   * 套版款/衍生款的设计款号
   */
  styleReferDesignCode?: string;
  /**
   * 环节创建时间（用于计算当前耗时【currentTime-processingStepCreatedTime】）
   */
  processingStepCreatedTime?: number;
  /**
   * 当前时间
   */
  currentTime?: number;
  /**
   * 二次工艺
   */
  craftList: IAllocatePageResListItemCraftListItem[];
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
  /**
   * 异常信息
   */
  anomaly?: IAllocatePageResListItemAnomaly;
  /**
   * 返修信息
   */
  repair?: IAllocatePageResListItemRepair;
  /**
   * 复版信息
   */
  redoInfo?: IAllocatePageResListItemRedoInfo;
  /**
   * 是否取消 0-否、1-是
   */
  isCancel?: string;
  /**
   * 是否完成 0-进行中、1-已完成
   */
  isDone?: string;
  /**
   * 复版原因
   */
  redoReason?: string;
  /**
   * bom文件名称（推款新增）
   */
  bomFileName?: string;
  /**
   * bom文件路径（推款新增）
   */
  bomFileUrl?: string;
  /**
   * 需求内容
   */
  intentionContent?: string;
  /**
   * 原款-skc编码(需求引用款skc编码),自建SPU时无该字段
   */
  quoteDesignCode?: string;
  /**
   * 纸样改动大小, 100:无改动;110:小,120:大
   * {@link PatternChangeSizeEnum}
   */
  patternChangeSize?: string;
  /**
   * 参考款号
   */
  referenceDesignCode?: string;
  /**
   * 是否最新(同一加工单号最新的条) 0-否、1-是
   */
  sampleClothesIsLatest?: string;
  /**
   * 制作方式
   * 0-仅纸样 1-实物样 2-3D样 3-3D+实物样
   */
  makeClothesType?: string;
  /**
   * 同个SKC打版次数
   */
  makeTimes?: string;
  /**
   * 纸样id
   */
  patternId?: string;
  /**
   * 分单状态描述
   */
  nodeState?: IAllocatePageResListItemNodeState;
  /**
   * 纸样分单状态。（0:未流转 1:待分单 2:已分单）
   */
  allocateState?: string;
  /**
   * 板房id(1:内部,其他外部板房id)
   */
  roomId?: string;
  /**
   * 板房名字
   */
  roomName?: string;
  remark?: string;
}

export interface IAllocatePageResListItemNodeState {
  /**
   * 样衣打版id
   */
  clothesId?: string;
  /**
   * 当前处理环节
   */
  processStep?: string;
  /**
   * 当前处理环节名称
   */
  processStepDesc?: string;
  /**
   * 当前处理环节节点编码
   */
  processNode?: string;
  /**
   * 当前处理环节节点名称
   */
  processNodeDesc?: string;
  /**
   * 当前处理环节节点状态
   */
  processNodeState?: string;
  /**
   * 当前处理环节节点状态描述
   */
  processNodeStateDesc?: string;
}

export interface IAllocatePageResListItemRedoInfo {
  /**
   * 样衣打版id
   */
  clothesId?: string;
  /**
   * 复版原因
   */
  redoReason?: string;
  /**
   * 复版责任方: 来源基础资料,传code; (1:版房原因、2:设计师原因、3:客户要求、4:面辅料履约;)
   */
  responsibleParty?: string;
  /**
   * 复版责任方名称
   */
  responsiblePartyName?: string;
  /**
   * 问题描述
   */
  questionDescription?: string;
}

export interface IAllocatePageResListItemRepair {
  /**
   * 样衣打版id
   */
  clothesId?: string;
  /**
   * 返修原因编码
   */
  repairReasonCode?: string;
  /**
   * 返修原因名称
   */
  repairReasonName?: string;
  /**
   * 返修原因描述
   */
  repairDescription?: string;
  /**
   * 返修时间
   */
  createdTime?: number;
}

export interface IAllocatePageResListItemAnomaly {
  /**
   * 样衣打版id
   */
  clothesId?: string;
  /**
   * 异常单号
   */
  anomalyCode?: string;
  /**
   * 异常原因类型
   */
  typeDescription?: string;
  /**
   * 异常描述
   */
  description?: string;
  /**
   * 责任人id
   */
  responsibleId?: string;
  /**
   * 责任人姓名
   */
  responsibleName?: string;
}

export interface IAllocatePageResListItemCraftListItem {
  /**
   * 工艺要求:  100:裁版前工艺 110:裁版后工艺
   */
  craftsRequire?: string;
  /**
   * 工艺环节名称
   * 如果有工艺环节，优先展示工艺环节
   * 没有工艺环节直接显示工艺要求
   */
  craftsProcessName?: string;
  /**
   * 二次工艺名称
   */
  nameList: string[];
}

/**
 * 纸样分单
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2487
 */
export interface IPatternClothesAllocateReq {
  patternIds: string[];
  /**
   * 板房id(0未流转的,内部分单的话 id是1,其他id为外部板房的id)
   */
  roomId: string;
  /**
   * 板房名称
   */
  roomName?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
}

/**
 * 撤回分单
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2488
 */
export interface IPatternClothesWithdrawReq {
  /**
   * 纸样Id
   */
  patternIds: string[];
}

/**
 * 任务转交（排班变更）
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2491
 */
export interface IPatternClothesChangeMakerReq {
  patternIds: string[];
  /**
   * 纸样师id
   */
  patternMakerId: string;
  /**
   * 纸样师名称
   */
  patternMakerName: string;
}

/**
 * 获取样衣打版弹窗二次工艺信息维护信息
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2493
 */
export interface IPatternClothesCraftReq {
  /**
   * 请求参数
   */
  patternId: string;
}

export interface IPatternClothesCraftRes {
  /**
   * 纸样id
   */
  patternId?: string;
  /**
   * 版单id
   */
  clothesId?: string;
  /**
   * 裁剪方法编码
   */
  cuttingMethodCode?: string;
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
  /**
   * bomId
   */
  bomId?: string;
  /**
   * 二次工艺维护
   */
  secondCraftList: IPatternClothesCraftResSecondCraftListItem[];
}

export interface IPatternClothesCraftResSecondCraftListItem {
  /**
   * 二次工艺主键id
   */
  craftDemandId?: string;
  /**
   * bomID
   */
  bomId?: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 材料类型 一级分类 FABRIC:面料 ACCESSORIES:辅料
   */
  category1?: string;
  /**
   * 材料类型 二级分类
   */
  category2?: string;
  /**
   * 材料类型 三级分类
   */
  category3?: string;
  /**
   * 工艺要求:  100:裁版前工艺 110:裁版后工艺
   */
  craftsRequire?: string;
  /**
   * 承接方式,{CRAFT_GROUP:工艺组,CUSTOMER:客户}
   */
  undertakeType?: string;
  /**
   * 内部工艺厂ID
   */
  innerFactoryId?: string;
  /**
   * 工艺厂名,外部独有
   */
  factoryName?: string;
  /**
   * 工艺承接者-联系人
   */
  contactName?: string;
  /**
   * 工艺承接者-工厂联系电话
   */
  contactPhone?: string;
  /**
   * 工艺承接者-所在省份
   */
  contactProvince?: string;
  /**
   * 工艺承接者-所在城市
   */
  contactCity?: string;
  /**
   * 工艺承接者-所在区/县
   */
  contactRegion?: string;
  /**
   * 工艺承接者-详细地址
   */
  contactDetailAddress?: string;
  /**
   * 工艺图片，最多9张
   */
  pictureList: string[];
  /**
   * 位置要求
   */
  positionRequirement?: string;
  /**
   * 尺寸要求
   */
  sizeRequirement?: string;
  /**
   * 颜色要求
   */
  colorRequirement?: string;
  /**
   * 克重要求
   */
  weightRequirement?: string;
  /**
   * 其他工艺要求
   */
  otherRequirement?: string;
  /**
   * 创建人id
   */
  creatorId?: string;
  /**
   * 创建时间
   */
  createdTime?: number;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 工艺环节,字典code
   */
  craftsProcessCode?: string;
  /**
   * 工艺环节,字典值
   */
  craftsProcessName?: string;
  /** 第三方工艺需求ID */
  thirdPartyCraftDemandId?: string;
}

/**
 * 提交纸样
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2492
 */
export interface IPatternClothesConfirmReq {
  /**
   * 纸样版单id
   */
  patternId: string;
  /**
   * 纸样文件
   */
  patternFileUrl: string;
  /**
   * 纸样文件名字
   */
  patternFileName?: string;
  /**
   * 裁剪方法编码
   */
  cuttingMethodCode?: string;
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
  /**
   * 引用设计款号(判断部位是否改变使用)
   */
  modelDesignCode?: string;
  /**
   * 引用尺寸模板code
   */
  modelSizeTemplateCode?: string;
  /**
   * 样衣尺寸
   */
  sampleClothesSize: string;
  /**
   * 纸样尺寸
   */
  patternSize: string;
  /**
   * 尺寸id
   */
  patternSizeId?: string;
  /**
   * 尺寸信息
   */
  patternClothesSizeList: IPatternClothesConfirmReqPatternClothesSizeListItem[];
  /**
   * bomId
   */
  bomId: string;
  /**
   * 二次工艺需求列表
   */
  secondCraftList: IPatternClothesConfirmReqSecondCraftListItem[];
}

export interface IPatternClothesConfirmReqSecondCraftListItem {
  /**
   * 二次工艺主键id
   */
  craftDemandId?: string;
  /**
   * 工艺次序,字典code
   */
  craftsProcessCode?: string;
  /**
   * 工艺次序,字典值
   */
  craftsProcessName?: string;
}

export interface IPatternClothesConfirmReqPatternClothesSizeListItem {
  /**
   * 部位编码
   */
  positionCode: string;
  /**
   * 部位编码名字
   */
  positionName: string;
  /**
   * 尺寸维度
   */
  dimension: string;
  /**
   * 量法
   */
  measuringMethod: string;
  /**
   * 样衣尺寸
   */
  sampleClothesSize: string;
  /**
   * 纸样尺寸
   */
  patternSize: string;
  /**
   * 允差范围
   */
  tolerance: string;
  /**
   * 备注
   */
  remark?: string;
  id?: string;
}

/**
 * 查询纸样列表
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2820
 */
export interface IPatternClothesQueryByPageReq {
  /**
   * 当前查询的页码
   */
  pageNum?: number;
  /**
   * 当前查询单页的数据量
   */
  pageSize?: number;
  /**
   * 打版类型: 1-大货打版 2-正常打版 3-复色打版 4-补做打版
   */
  sampleType?: string;
  /**
   * 打版类型集合: 1-大货打版 2-正常打版 3-复色打版 4-补做打版
   */
  sampleTypeList: string[];
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 设计款号
   */
  designCodeList: string[];
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode?: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCodeList: string[];
  /**
   * 审版工艺师下的成衣SPU，当reviewCraftsmanId不为空时，系统自动查找
   */
  auditCraftOrderStyleCodeList: string[];
  /**
   * 我的-相关打版单ID
   */
  personalClothesIdList: string[];
  /**
   * 纸样师id
   */
  patternMakerId?: string;
  /**
   * 纸样师id集合
   */
  patternMakerIdList: string[];
  /**
   * 3D版师id集合
   */
  dimensionDesignerIdList: string[];
  /**
   * 设计师id【设计师】
   */
  designerIdList: string[];
  /**
   * 设计组编号
   */
  designerGroupCodeList: string[];
  /**
   * 车缝师id
   */
  sewerIdList: string[];
  /**
   * 裁剪师id
   */
  cutterIdList: string[];
  /**
   * 款生成时间
   */
  skcCreatedTimeStart?: string;
  /**
   * 款生成时间
   */
  skcCreatedTimeEnd?: string;
  /**
   * 齐套创建时间开始
   */
  materialCreatedTimeStart?: string;
  /**
   * 齐套创建时间结束
   */
  materialCreatedTimeEnd?: string;
  /**
   * 齐套签收时间开始
   */
  materialSignTimeStart?: string;
  /**
   * 齐套签收时间结束
   */
  materialSignTimeEnd?: string;
  /**
   * 创建时间-开始
   */
  createdTimeStart?: string;
  /**
   * 创建时间-结束
   */
  createdTimeEnd?: string;
  /**
   * 当前耗时排序 ascending:升序,descending:降序
   */
  timeConsumingSort?: TIMECONSUMING_SORT_ENUM;
  /**
   * 是否套版款: 0 否 1是
   */
  copyReferType?: string;
  /**
   * 是否衍生款: 0 否 1是
   */
  extendReferType?: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: string;
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
   * 是否取消 0-否、1-是
   */
  isCancel?: string;
  /**
   * 是否查询我的 true=我的、false/null=全部
   */
  personal?: boolean;
  /**
   * 设计小组组别 1 == 选择了设计小组组别 ， 0 == 没有选择设计小组组别，默认就是为 0
   */
  clothesDesigner?: string;
  /**
   * 套版款：1 衍生款：2
   */
  styleReferType?: string;
  /**
   * 是否改款  1:是  0：否   改款0.1
   */
  isChange?: string;
  /**
   * 是否引用
   */
  isReference?: string;
  /**
   * 制作方式
   * 0-仅纸样 1-实物样 2-3D样 3-3D样+实物
   */
  makeClothesType?: string;
  /**
   * 尺码标准编号
   */
  sizeStandardCode?: string;
  /**
   * 版单整状态：0待开始1进行中2已完成3已取消
   * SampleClothesStateEnum
   */
  state?: string;
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
   * 波段编码集合
   */
  waveBandCodeList: string[];
  /**
   * 审版工艺师ID
   */
  reviewCraftsmanId?: string;
  /**
   * 审版工艺师名称
   */
  reviewCraftsmanName?: string;
  /**
   * 是否包含已取消的记录，false（不包含），true(包含)，默认true(包含)
   */
  showCancel?: boolean;
  /**
   * 首版创建时间开始
   */
  firstSampleCreatedTimeStart?: string;
  /**
   * 首版创建时间结束
   */
  firstSampleCreatedTimeEnd?: string;
  /**
   * 版单审版通过时间开始
   */
  auditPassTimeStart?: string;
  /**
   * 版单审版通过时间结束
   */
  auditPassTimeEnd?: string;
  /**
   * 版单交接环节开始时间开始
   */
  takeOverStartTimeStart?: string;
  /**
   * 版单交接环节开始时间结束
   */
  takeOverStartTimeEnd?: string;
  /**
   * 版单交接时间开始
   */
  takeOverTimeStart?: string;
  /**
   * 版单交接时间结束
   */
  takeOverTimeEnd?: string;
  /**
   * 完成耗时开始时间 天
   */
  timeConsumingStartDay?: string;
  /**
   * 完成耗时结束时间 天
   */
  timeConsumingEndDay?: string;
  /**
   * 完成耗时开始时间 时
   */
  timeConsumingStartHour?: string;
  /**
   * 完成耗时结束时间 时
   */
  timeConsumingEndHour?: string;
  /**
   * 完成耗时开始时间 分
   */
  timeConsumingStartMinute?: string;
  /**
   * 完成耗时结束时间 分
   */
  timeConsumingEndMinute?: string;
  /**
   * 纸样接单版房id(内部为1，外部供应商ID)
   */
  roomIdList: string[];
  /**
   * 分单员ID
   */
  allocateeIdList: string[];
  /**
   * 纸样任务分单开始时间开始
   */
  seperateStartTimeStart?: string;
  /**
   * 纸样任务分单开始时间结束
   */
  seperateStartTimeEnd?: string;
  /**
   * 纸样任务分单完成时间开始
   */
  seperateFinishTimeStart?: string;
  /**
   * 纸样任务分单完成时间结束
   */
  seperateFinishTimeEnd?: string;
  /**
   * 纸样任务提交时间开始
   */
  patternFinishTimeStart?: string;
  /**
   * 纸样任务提交时间结束
   */
  patternFinishTimeEnd?: string;
}

export interface IPatternClothesQueryByPageRes {
  page?: number;
  total?: number;
  list: IPatternClothesQueryByPageResListItem[];
}

export interface IPatternClothesQueryByPageResListItem {
  processStepDesc?: string;
  processNodeDesc?: string;
  processNodeStateDesc?: string;
  clothesNodeStepState?: string;
  processNodeState?: string;
  /**
   * 是否最新(同一加工单号最新的条) 0-否、1-是
   */
  isLatest?: string;
  /**
   * 版单id
   */
  clothesId?: string;
  /**
   * 设计版单id
   */
  prototypeId?: string;
  /**
   * 打版类型: 1-大货打版 2-正常打版 3-复色打版 4-补做打版
   */
  sampleType?: string;
  /**
   * 版本号
   */
  versionNum?: string;
  /**
 * 纸样版单版本号
 */
  patternVersionNum?: string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode?: string;
  /**
   * 原始加工单号
   */
  baseProcessCode?: string;
  /**
   * 设计图片
   */
  designPictureList: string[];
  /**
   * 上架图
   */
  shelvePicture?: {
    /**
     * 样衣打版id
     */
    clothesId?: string;
    /**
     * spu上架图片
     */
    spuShelvePictureList: string[];
    /**
     * skc上架图片
     */
    skcShelvePictureList: string[];
  };
  /**
   * 打版件数
   */
  sampleAmount?: string;
  /**
   * 版单整体状态：0待开始1进行中2已完成3已取消
   * SampleClothesStateEnum
   */
  state?: string;
  /**
   * 版单整体状态描述
   * SampleClothesStateEnum
   */
  stateDesc?: string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: string;
  /**
   * 是否需要下采购（true:是,false/null:否）
   */
  isPurchase?: string;
  /**
   * 面辅料齐套状态(0-未流转、1-待签收、2-已签收)
   */
  materialState?: string;
  /**
   * 设计师id
   */
  designerId?: string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 裁剪师id
   */
  cutterId?: string;
  /**
   * 裁剪师名称
   */
  cutterName?: string;
  /**
   * 车缝师id
   */
  sewerId?: string;
  /**
   * 车缝师名称
   */
  sewerName?: string;
  /**
   * 质检师id
   */
  qualityCheckerId?: string;
  /**
   * 质检师名称
   */
  qualityCheckerName?: string;
  /**
   * 审版师id
   */
  editionReviewerId?: string;
  /**
   * 审版师名称
   */
  editionReviewerName?: string;
  /**
   * 3D版师id
   */
  dimensionDesignerId?: string;
  /**
   * 3D版师名称
   */
  dimensionDesignerName?: string;
  /**
   * 复色款号，不为""时代表复色版
   */
  makeSameDesignCode?: string;
  /**
   * 套版款：1 衍生款：2
   */
  styleReferType?: string;
  /**
   * 套版款/衍生款的设计款号
   */
  styleReferDesignCode?: string;
  /**
   * 环节创建时间（用于计算当前耗时【currentTime-processingStepCreatedTime】）
   */
  processingStepCreatedTime?: number;
  /**
   * 当前时间
   */
  currentTime?: number;
  /**
   * 二次工艺
   */
  craftList: IPatternClothesQueryByPageResListItemCraftListItem[];
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
  /**
   * 异常信息
   */
  anomaly?: IPatternClothesQueryByPageResListItemAnomaly;
  /**
   * 返修信息
   */
  repair?: IPatternClothesQueryByPageResListItemRepair;
  /**
   * 复版信息
   */
  redoInfo?: IPatternClothesQueryByPageResListItemRedoInfo;
  /**
   * 是否取消 0-否、1-是
   */
  isCancel?: YES_NO_ENUM;
  /**
   * 是否完成 0-进行中、1-已完成
   */
  isDone?: string;
  /**
   * 复版原因
   */
  redoReason?: string;
  /**
   * bom文件名称（推款新增）
   */
  bomFileName?: string;
  /**
   * bom文件路径（推款新增）
   */
  bomFileUrl?: string;
  /**
   * 需求内容
   */
  intentionContent?: string;
  /**
   * 原款-skc编码(需求引用款skc编码),自建SPU时无该字段
   */
  quoteDesignCode?: string;
  /**
   * 纸样改动大小, 100:无改动;110:小,120:大
   * {@link PatternChangeSizeEnum}
   */
  patternChangeSize?: string;
  /**
   * 参考款号
   */
  referenceDesignCode?: string;
  /**
   * 是否最新(同一加工单号最新的条) 0-否、1-是
   */
  sampleClothesIsLatest?: string;
  /**
   * 制作方式
   * 0-仅纸样 1-实物样 2-3D样 3-3D+实物样
   */
  makeClothesType?: string;
  /**
   * 同个SKC打版次数
   */
  makeTimes?: string;
  /**
   * 纸样id
   */
  patternId: string;
  /**
   * 任务状态
   */
  nodeState?: IPatternClothesQueryByPageResListItemNodeState;
  /**
   * 纸样分单状态。（0:未流转 1:待分单 2:已分单）
   */
  allocateState?: string;
  /**
   * 分单员id
   */
  allocateeId?: string;
  /**
   * 分单员名字
   */
  allocateeName?: string;
  /**
   * 版房ID
   */
  roomId?: string;
  /**
   * 版房名称
   */
  roomName?: string;
  remark?: string;
  // 审版工艺师
  // reviewCraftsmanId?: string;
  reviewCraftsmanName?: string;
  /**
   * 分单开始时间
   */
  seperateStartTime?: number;
  /**
   * 首次分单完成时间
   */
  firstSeperateFinishTime?: number;
  /**
   * 分单完成时间
   */
  seperateFinishTime?: number;
  /**
   * 纸样任务开始时间
   */
  patternStartTime?: number;
  /**
   * 纸样任务进行中开始时间
   */
  patternOnTime?: number;
  /**
   * 纸样任务完成时间
   */
  patternFinishTime?: number;
  /**
   * 纸样任务创建时间
   */
  patternCreatedTime?: number;
  /**
   * 纸样首次完成时间
   */
  firstFinishTime?: number;
}

export interface IPatternClothesQueryByPageResListItemNodeState {
  /**
   * 样衣打版id
   */
  clothesId?: string;
  /**
   * 当前处理环节
   */
  processStep?: string;
  /**
   * 当前处理环节名称
   */
  processStepDesc?: string;
  /**
   * 当前处理环节节点编码
   */
  processNode?: string;
  /**
   * 当前处理环节节点名称
   */
  processNodeDesc?: string;
  /**
   * 当前处理环节节点状态
   */
  processNodeState?: string;
  /**
   * 当前处理环节节点状态描述
   */
  processNodeStateDesc?: string;
}

export interface IPatternClothesQueryByPageResListItemRedoInfo {
  /**
   * 样衣打版id
   */
  clothesId?: string;
  /**
   * 复版原因
   */
  redoReason?: string;
  /**
   * 复版责任方: 来源基础资料,传code; (1:版房原因、2:设计师原因、3:客户要求、4:面辅料履约;)
   */
  responsibleParty?: string;
  /**
   * 复版责任方名称
   */
  responsiblePartyName?: string;
  /**
   * 问题描述
   */
  questionDescription?: string;
}

export interface IPatternClothesQueryByPageResListItemRepair {
  /**
   * 样衣打版id
   */
  clothesId?: string;
  /**
   * 返修原因编码
   */
  repairReasonCode?: string;
  /**
   * 返修原因名称
   */
  repairReasonName?: string;
  /**
   * 返修原因描述
   */
  repairDescription?: string;
  /**
   * 返修时间
   */
  createdTime?: number;
}

export interface IPatternClothesQueryByPageResListItemAnomaly {
  /**
   * 样衣打版id
   */
  clothesId?: string;
  /**
   * 异常单号
   */
  anomalyCode?: string;
  /**
   * 异常原因类型
   */
  typeDescription?: string;
  /**
   * 异常描述
   */
  description?: string;
  /**
   * 责任人id
   */
  responsibleId?: string;
  /**
   * 责任人姓名
   */
  responsibleName?: string;
}

export interface IPatternClothesQueryByPageResListItemCraftListItem {
  /**
   * 工艺要求:  100:裁版前工艺 110:裁版后工艺
   */
  craftsRequire?: string;
  /**
   * 工艺环节名称
   * 如果有工艺环节，优先展示工艺环节
   * 没有工艺环节直接显示工艺要求
   */
  craftsProcessName?: string;
  /**
   * 二次工艺名称
   */
  nameList: string[];
}

/**
 * 根据纸样ID查询纸样详情
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2856
 */
export interface IPatternClothesDetailReq {
  patternId: string;
}
export interface IPatternClothesDetailRes {
  /**
   * 打版需求尺码
   */
  requirementSampleClothesSize?: string;
  /**
   * 版单id
   */
  clothesId?: string;
  /**
   * 设计版单id
   */
  prototypeId?: string;
  /**
   * 打版类型: 1-大货打版 2-正常打版 3-复色打版 4-补做打版
   */
  sampleType?: string;
  /**
   * 版本号
   */
  versionNum?: string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode?: string;
  /**
   * 原始加工单号
   */
  baseProcessCode?: string;
  urls?: IFile[];
  /**
   * 设计图片
   */
  designPictureList: string[];
  /**
   * 上架图片
   */
  shelvePictureList: string[];
  /**
   * 打版件数
   */
  sampleAmount?: string;
  /**
   * 版单整体状态：0待开始1进行中2已完成3已取消
   * SampleClothesStateEnum
   */
  state?: string;
  /**
   * 版单整体状态描述
   * SampleClothesStateEnum
   */
  stateDesc?: string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: string;
  /**
   * 是否需要下采购（true:是,false/null:否）
   */
  isPurchase?: string;
  /**
   * 面辅料齐套状态(0-未流转、1-待签收、2-已签收)
   */
  materialState?: string;
  /**
   * 样衣尺码
   */
  sampleSize?: string;
  /**
   * 颜色
   */
  color?: string;
  /**
   * 尺码标准
   */
  sizeStandard?: string;
  /**
   * 尺码标准编号
   */
  sizeStandardCode?: string;
  /**
   * 设计师组
   */
  designerGroup?: string;
  /**
   * 设计师组code
   */
  designerGroupCode?: string;
  /**
   * 设计师id
   */
  designerId?: string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 裁剪师id
   */
  cutterId?: string;
  /**
   * 裁剪师名称
   */
  cutterName?: string;
  /**
   * 车缝师id
   */
  sewerId?: string;
  /**
   * 车缝师名称
   */
  sewerName?: string;
  /**
   * 质检师id
   */
  qualityCheckerId?: string;
  /**
   * 质检师名称
   */
  qualityCheckerName?: string;
  /**
   * 审版师id
   */
  editionReviewerId?: string;
  /**
   * 审版师名称
   */
  editionReviewerName?: string;
  /**
   * 3D版师id
   */
  dimensionDesignerId?: string;
  /**
   * 3D版师名称
   */
  dimensionDesignerName?: string;
  /**
   * 复色款号，不为""时代表复色版
   */
  makeSameDesignCode?: string;
  /**
   * 套版款：1 衍生款：2
   */
  styleReferType?: string;
  /**
   * 套版款/衍生款的设计款号
   */
  styleReferDesignCode?: string;
  /**
   * 环节创建时间（用于计算当前耗时【currentTime-processingStepCreatedTime】）
   */
  processingStepCreatedTime?: number;
  /**
   * 当前时间
   */
  currentTime?: number;
  /**
   * 二次工艺
   */
  craftList: IPatternClothesDetailResCraftListItem[];
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
  /**
   * 异常信息
   */
  anomaly?: IPatternClothesDetailResAnomaly;
  /**
   * 返修信息
   */
  repair?: IPatternClothesDetailResRepair;
  /**
   * 复版信息
   */
  redoInfo?: IPatternClothesDetailResRedoInfo;
  /**
   * 是否取消 0-否、1-是
   */
  isCancel?: string;
  /**
   * 是否完成 0-进行中、1-已完成
   */
  isDone?: string;
  /**
   * 复版原因
   */
  redoReason?: string;
  /**
   * bom文件名称（推款新增）
   */
  bomFileName?: string;
  /**
   * bom文件路径（推款新增）
   */
  bomFileUrl?: string;
  /**
   * 参考款号
   */
  referenceDesignCode?: string;
  /**
   * 是否最新(同一加工单号最新的条) 0-否、1-是
   */
  sampleClothesIsLatest?: string;
  /**
   * 制作方式
   * 0-仅纸样 1-实物样 2-3D样 3-3D+实物样
   */
  makeClothesType?: string;
  /**
   * 同个SKC打版次数
   */
  makeTimes?: string;
  /**
   * 纸样版单id
   */
  patternId?: string;
  /**
   * 供给方式
   */
  supplyModeName?: string;
  /**
   * 供给方式编码
   */
  supplyModeCode?: string;
  /**
   * 纸样文件
   */
  patternFileUrl?: string;
  /**
   * 纸样文件名字
   */
  patternFileName?: string;
  /**
   * 裁剪方法编码
   */
  cuttingMethodCode?: string;
  /**
   * 引用设计款号(判断部位是否改变使用)
   */
  modelDesignCode?: string;
  /**
   * 引用尺寸模板code
   */
  modelSizeTemplateCode?: string;
  /**
   * 样衣尺寸
   */
  sampleClothesSize?: string;
  /**
   * 纸样尺寸
   */
  patternSize?: string;
  /**
   * 尺寸id
   */
  patternSizeId?: string;
  /**
   * 尺寸信息
   */
  patternClothesSizeList: IPatternClothesDetailResPatternClothesSizeListItem[];
  /**
   * bomId
   */
  bomId?: string;
  /**
   * 二次工艺需求列表
   */
  secondCraftList: IPatternClothesDetailResSecondCraftListItem[];
  /**
   * 纸样版单的版本号
   */
  patternVersionNum?: string;
  /**
   * 上架图片信息
   */
  shelvePicture?: ISampleClothesInfoDetailResShelvePicture;
}
export interface ISampleClothesInfoDetailResShelvePicture {
  /**
   * 样衣打版id
   */
  clothesId?: string;
  /**
   * spu上架图片
   */
  spuShelvePictureList: string[];
  /**
   * skc上架图片
   */
  skcShelvePictureList: string[];
}
export interface IPatternClothesDetailResSecondCraftListItem {
  /**
   * 二次工艺主键id
   */
  craftDemandId?: string;
  /**
   * 工艺次序,字典code
   */
  craftsProcessCode?: string;
  /**
   * 工艺次序,字典值
   */
  craftsProcessName?: string;
}

export interface IPatternClothesDetailResPatternClothesSizeListItem {
  id?: string;
  /**
   * 部位编码
   */
  positionCode?: string;
  /**
   * 部位编码名字
   */
  positionName?: string;
  /**
   * 尺寸维度
   */
  dimension?: string;
  /**
   * 量法
   */
  measuringMethod?: string;
  /**
   * 样衣尺寸
   */
  sampleClothesSize?: string;
  /**
   * 纸样尺寸
   */
  patternSize?: string;
  /**
   * 允差范围
   */
  tolerance?: string;
  /**
   * 备注
   */
  remark?: string;
}

export interface IPatternClothesDetailResRedoInfo {
  /**
   * 样衣打版id
   */
  clothesId?: string;
  /**
   * 复版原因
   */
  redoReason?: string;
  /**
   * 复版责任方: 来源基础资料,传code; (1:版房原因、2:设计师原因、3:客户要求、4:面辅料履约;)
   */
  responsibleParty?: string;
  /**
   * 复版责任方名称
   */
  responsiblePartyName?: string;
  /**
   * 问题描述
   */
  questionDescription?: string;
}

export interface IPatternClothesDetailResRepair {
  /**
   * 样衣打版id
   */
  clothesId?: string;
  /**
   * 返修原因编码
   */
  repairReasonCode?: string;
  /**
   * 返修原因名称
   */
  repairReasonName?: string;
  /**
   * 返修原因描述
   */
  repairDescription?: string;
  /**
   * 返修时间
   */
  createdTime?: number;
}

export interface IPatternClothesDetailResAnomaly {
  /**
   * 样衣打版id
   */
  clothesId?: string;
  /**
   * 异常单号
   */
  anomalyCode?: string;
  /**
   * 异常原因类型
   */
  typeDescription?: string;
  /**
   * 异常描述
   */
  description?: string;
  /**
   * 责任人id
   */
  responsibleId?: string;
  /**
   * 责任人姓名
   */
  responsibleName?: string;
}

export interface IPatternClothesDetailResCraftListItem {
  /**
   * 工艺要求:  100:裁版前工艺 110:裁版后工艺
   */
  craftsRequire?: string;
  /**
   * 工艺环节名称
   * 如果有工艺环节，优先展示工艺环节
   * 没有工艺环节直接显示工艺要求
   */
  craftsProcessName?: string;
  /**
   * 二次工艺名称
   */
  nameList: string[];
}

// ⬇️ 根据款式编码查询最新审版通过的纸样详情响应体 接口：https://yapi.tiangong.site/project/38/interface/api/3130
export interface IPatternClothesGetLatestPassAuditPatternByStyleCodeRes {
  /**
   * 版单id
   */
  clothesId: string;
  /**
   * 设计版单id
   */
  prototypeId: string;
  /**
   * 打版类型: 1-大货打版 2-正常打版 3-复色打版 4-补做打版
   */
  sampleType: string;
  /**
   * 版本号
   */
  versionNum: string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode: string;
  /**
   * 原始加工单号
   */
  baseProcessCode: string;
  /**
   * 设计图片
   */
  designPictureList: string[];
  /**
   * 上架图片
   */
  shelvePictureList: string[];
  /**
   * 打版件数
   */
  sampleAmount: string;
  /**
   * 版单整体状态：0待开始1进行中2已完成3已取消
   * SampleClothesStateEnum
   */
  state: string;
  /**
   * 版单整体状态描述
   * SampleClothesStateEnum
   */
  stateDesc: string;
  /**
   * 设计款号
   */
  designCode: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName: string;
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
   * 是否有二次工艺(1:是,0:不是)
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
   * 样衣尺码
   */
  sampleSize: string;
  /**
   * 颜色
   */
  color: string;
  /**
   * 尺码标准
   */
  sizeStandard: string;
  /**
   * 尺码标准编号
   */
  sizeStandardCode: string;
  /**
   * 设计师组
   */
  designerGroup: string;
  /**
   * 设计师组code
   */
  designerGroupCode: string;
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
   * 裁剪师id
   */
  cutterId: string;
  /**
   * 裁剪师名称
   */
  cutterName: string;
  /**
   * 车缝师id
   */
  sewerId: string;
  /**
   * 车缝师名称
   */
  sewerName: string;
  /**
   * 质检师id
   */
  qualityCheckerId: string;
  /**
   * 质检师名称
   */
  qualityCheckerName: string;
  /**
   * 审版师id
   */
  editionReviewerId: string;
  /**
   * 审版师名称
   */
  editionReviewerName: string;
  /**
   * 审版工艺师id
   */
  reviewCraftsmanId: string;
  /**
   * 审版工艺师名称
   */
  reviewCraftsmanName: string;
  /**
   * 3D版师id
   */
  dimensionDesignerId: string;
  /**
   * 3D版师名称
   */
  dimensionDesignerName: string;
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
  craftList: IPatternClothesGetLatestPassAuditPatternByStyleCodeResCraftListItem[];
  /**
   * 裁剪方法编码
   */
  cuttingMethodCode: string;
  /**
   * 裁剪方法
   */
  cuttingMethod: string;
  anomaly: IPatternClothesGetLatestPassAuditPatternByStyleCodeResAnomaly;
  repair: IPatternClothesGetLatestPassAuditPatternByStyleCodeResRepair;
  redoInfo: IPatternClothesGetLatestPassAuditPatternByStyleCodeResRedoInfo;
  /**
   * 是否取消 0-否、1-是
   */
  isCancel: string;
  /**
   * 是否完成 0-进行中、1-已完成
   */
  isDone: string;
  /**
   * 复版原因
   */
  redoReason: string;
  /**
   * bom文件名称（推款新增）
   */
  bomFileName: string;
  /**
   * bom文件路径（推款新增）
   */
  bomFileUrl: string;
  /**
   * 参考款号
   */
  referenceDesignCode: string;
  /**
   * 是否最新(同一加工单号最新的条) 0-否、1-是
   */
  sampleClothesIsLatest: string;
  /**
   * 制作方式
   * 0-仅纸样 1-实物样 2-3D样 3-3D+实物样
   */
  makeClothesType: string;
  /**
   * 同个SKC打版次数
   */
  makeTimes: string;
  /**
   * 是否已完成审版工艺单(1-是、0-否)
   */
  isFinishedAco: string;
  /**
   * 最新版纸样任务ID
   */
  latestPatternId: string;
  /**
   * 审版通过后最终确认的BOM ID
   */
  bomId: string;
  /**
   * 审版通过时的审核工艺单明细ID
   */
  auditCraftOrderDetailId: string;
  /**
   * 纸样版单id
   */
  patternId: string;
  /**
   * 供给方式
   */
  supplyModeName: string;
  /**
   * 供给方式编码
   */
  supplyModeCode: string;
  /**
   * 纸样文件
   */
  patternFileUrl: string;
  /**
   * 纸样文件名字
   */
  patternFileName: string;
  /**
   * 引用设计款号(判断部位是否改变使用)
   */
  modelDesignCode: string;
  /**
   * 引用尺寸模板code
   */
  modelSizeTemplateCode: string;
  /**
   * 样衣尺寸
   */
  sampleClothesSize: string;
  /**
   * 纸样尺寸
   */
  patternSize: string;
  /**
   * 尺寸id
   */
  patternSizeId: string;
  /**
   * 纸样版单的版本号
   */
  patternVersionNum: string;
  /**
   * 尺寸信息
   */
  patternClothesSizeList: IPatternClothesGetLatestPassAuditPatternByStyleCodeResPatternClothesSizeListItem[];
  /**
   * 二次工艺需求列表
   */
  secondCraftList: IPatternClothesGetLatestPassAuditPatternByStyleCodeResSecondCraftListItem[];
}
export interface IPatternClothesGetLatestPassAuditPatternByStyleCodeResCraftListItem {
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
export interface IPatternClothesGetLatestPassAuditPatternByStyleCodeResAnomaly {
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
export interface IPatternClothesGetLatestPassAuditPatternByStyleCodeResRepair {
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
 * 复版信息
 */
export interface IPatternClothesGetLatestPassAuditPatternByStyleCodeResRedoInfo {
  /**
   * 样衣打版id
   */
  clothesId: string;
  /**
   * 复版原因
   */
  redoReason: string;
  /**
   * 复版责任方: 来源基础资料,传code; (1:版房原因、2:设计师原因、3:客户要求、4:面辅料履约;)
   */
  responsibleParty: string;
  /**
   * 复版责任方名称
   */
  responsiblePartyName: string;
  /**
   * 问题描述
   */
  questionDescription: string;
}
export interface IPatternClothesGetLatestPassAuditPatternByStyleCodeResPatternClothesSizeListItem {
  /**
   * 部位编码
   */
  positionCode: string;
  /**
   * 部位编码名字
   */
  positionName: string;
  /**
   * 尺寸维度
   */
  dimension: string;
  /**
   * 量法
   */
  measuringMethod: string;
  /**
   * 样衣尺寸
   */
  sampleClothesSize: string;
  /**
   * 纸样尺寸
   */
  patternSize: string;
  /**
   * 允差范围
   */
  tolerance: string;
  /**
   * 备注
   */
  remark: string;
}
export interface IPatternClothesGetLatestPassAuditPatternByStyleCodeResSecondCraftListItem {
  /**
   * 二次工艺主键id
   */
  craftDemandId: string;
  /**
   * 工艺次序,字典code
   */
  craftsProcessCode: string;
  /**
   * 工艺次序,字典值
   */
  craftsProcessName: string;
}
// ⬆️ 根据款式编码查询最新审版通过的纸样详情响应体
