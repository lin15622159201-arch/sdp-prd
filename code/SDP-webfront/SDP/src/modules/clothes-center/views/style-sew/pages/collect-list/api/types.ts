import { TIMECONSUMING_SORT_ENUM } from '@/modules/clothes-center/constant/types';
import { YES_NO_ENUM } from '@/constant';

/**
 * 确认签收
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2496
 */
export interface IMaterialSignReq {
  /**
   * 设计款号
   */
  designCode: string;
  /**
   * 签收时间
   */
  signingTime?: string;
  /**
   * 签收人名称
   */
  signer?: string;
  /**
   * 签收人id
   */
  signerId?: string;
  /**
   * 是否强制签收 0:否 1:是
   */
  isEnforceSign?: string;
}

/**
 * 分页查询齐套签收列表
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2494
 */
export interface IMaterialPageReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 打版类型: 1-大货打版 2-正常打版 3-复色打版 4-补做打版
   */
  sampleType?: '1' | '2' | '3' | '4';
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
   * 是否展示取消订单
   */
  showCancel: boolean;
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
}

export interface IMaterialPageRes {
  page?: number;
  total?: number;
  list: IMaterialPageResListItem[];
}

export interface IMaterialPageResListItem {
  reviewCraftsmanName?: string;
  processStepDesc?: string;
  processNodeDesc?: string;
  processNodeStateDesc?: string;
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
  isUrgent?: YES_NO_ENUM;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: YES_NO_ENUM;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: YES_NO_ENUM;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: YES_NO_ENUM;
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
  craftList: IMaterialPageResListItemCraftListItem[];
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
  /**
   * 异常信息
   */
  anomaly?: IMaterialPageResListItemAnomaly;
  /**
   * 返修信息
   */
  repair?: IMaterialPageResListItemRepair;
  /**
   * 复版信息
   */
  redoInfo?: IMaterialPageResListItemRedoInfo;
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
   * 任务状态
   */
  nodeState?: IMaterialPageResListItemNodeState;
  remark?: string;
  /**
   * 打版单创建时间
   */
  createdTime?: number;
  /**
   * 齐套创建时间
   */
  materialCreatedTime?: number;
  /**
   * 齐套签收时间
   */
  materialSignTime?: number;
  /**
   * 节点状态值
   */
  processNodeState?: string;
}

export interface IMaterialPageResListItemNodeState {
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

export interface IMaterialPageResListItemRedoInfo {
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

export interface IMaterialPageResListItemRepair {
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

export interface IMaterialPageResListItemAnomaly {
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

export interface IMaterialPageResListItemCraftListItem {
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
 * 检查面辅料是否齐套
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2495
 */
export interface IMaterialCheckMaterialReq {
  designCode: string;
}

/**
 * 扫码管理--齐套签收  -- 齐套签收列表查询
 * yapi地址：https://yapi.tiangong.site/project/37/interface/api/2322
 */
export interface IMaterialSignMaterialListReq {
  /**
   * 设计款号  以设计款号的维度进行签收
   */
  designCode: string;
}

export type IMaterialSignMaterialListRes = IMaterialSignMaterialListResItem[];
export interface IMaterialSignMaterialListResItem {
  /**
   * 打版信息id
   */
  prototypeId?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 采购单号
   */
  purchaseOrderNo?: string;
  /**
   * 剪版单号 当采购申请需求传到供应链履约后，供应链履约返回剪版单号给PLM
   */
  cuttingCode?: string;
  /**
   * 物料spu  .供应链履约提供物料id
   * 面料取SPU，辅料取SKU
   */
  materialCode?: string;
  /**
   * 物料类型
   */
  materialCategory?: string;
  /**
   * 物料名称
   */
  materialName?: string;
  /**
   * 物料颜色
   */
  materialColor?: string;
  /**
   * 物料采购状态
   */
  materialPurchaseStatus?: string;
  /**
   * 物料采购状态code
   */
  materialPurchaseStatusCode?: string;
  /**
   * 采购数量
   */
  purchaseQuantity?: string;
  /**
   * 单位
   */
  purchaseUnit?: string;
  /**
   * 物料是否取消的状态 1|有效，0|取消
   */
  status?: string;
  /**
   * 裁前二次工艺
   */
  cuttingProcess?: string;
  /**
   * 期望采购完成日期
   */
  purchaseApplyTime?: number;
  /**
   * 采购申请原因
   */
  purchaseApplyCause?: string;
  /**
   * 物料色号  开发bom表详情列表中的物料SPU，由供应链履约提供物料SPU
   */
  materialColorNo?: string;
  /**
   * 色卡图片
   */
  colorCardPictureUrl?: string;
  /**
   * 剪版方法
   */
  cutMethod?: string;
  /**
   * 裁剪方法  -- 对应供应履约的特殊要求
   */
  cuttingMethod?: string;
  /**
   * 匹配物料图片
   */
  matchPicture?: string;
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
   * bom物料清单主键
   */
  bomMaterialId?: string;
  /**
   * 需求类型: 1, 面料; 2, 辅料
   */
  demandType?: string;
  /**
   * 齐料单编号
   */
  materialKittingCode?: string;
  /**
   * 二次工艺
   */
  craftDemandInfo?: string;
  /**
   * 物料明细备注
   */
  materialRemark?: string;
  /**
   * 使用部位,字典code
   */
  partUse: string;
}

/**
 * 强制确认签收
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/3189
 */
export interface IForceSignReq {
  /**
   * 设计款号
   */
  designCode: string;
  /**
   * 签收时间
   */
  signingTime?: string;
  /**
   * 签收人名称
   */
  signer?: string;
  /**
   * 签收人id
   */
  signerId?: string;
  /**
   * 是否强制签收 0:否 1:是
   */
  isEnforceSign?: string;
}
