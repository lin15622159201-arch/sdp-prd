import { YES_NO_ENUM } from '@/constant';
import { TIMECONSUMING_SORT_ENUM } from '@/modules/clothes-center/constant/types';

/**
 * 查询列表
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2481
 */
export interface ITakeOverPageReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 打版类型: 1-大货打版 2-正常打版 3-复色打版 4-补做打版
   */
  sampleType?: '1' | '2' | '3' | '4' | '';
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
   * 是否展示取消订单
   */
  showCancel: boolean;
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
}

export interface ITakeOverPageRes {
  page?: number;
  total?: number;
  list: ITakeOverPageResListItem[];
}

export interface ITakeOverPageResListItem {
  /**
   * 环节异常耗时(单位分钟)
   */
  stepExceptionTimeConsuming?: string;
  reviewCraftsmanName?: string;
  remark?: string;
  /**
   * 版单id
   */
  clothesId: string;
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
  craftList: ITakeOverPageResListItemCraftListItem[];
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
  /**
   * 异常信息
   */
  anomaly?: ITakeOverPageResListItemAnomaly;
  /**
   * 返修信息
   */
  repair?: ITakeOverPageResListItemRepair;
  /**
   * 复版信息
   */
  redoInfo?: ITakeOverPageResListItemRedoInfo;
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
   * 交接状态描述
   */
  nodeState?: ITakeOverPageResListItemNodeState;
  processStepDesc?: string;
  processNodeDesc?: string;
  /**
   * 当前处理环节节点状态
   */
  processNodeState?: string;
  /**
   * 当前处理环节节点状态描述
   */
  processNodeStateDesc?: string;
  /**
   * 版单交接环节开始时间
   */
  takeOverStartTime?: number;
  /**
   * 首次版单交接的时间
   */
  firstTakeOverTime?: number;
  /**
   * 版单交接的时间
   */
  takeOverTime?: number;
}

export interface ITakeOverPageResListItemNodeState {
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

export interface ITakeOverPageResListItemRedoInfo {
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

export interface ITakeOverPageResListItemRepair {
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

export interface ITakeOverPageResListItemAnomaly {
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

export interface ITakeOverPageResListItemCraftListItem {
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
 * 版单交接
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2482
 */
export interface ITakeOverSampleClothesReq {
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 样衣ID列表
   */
  sampleClothesIds?: string[];
}
