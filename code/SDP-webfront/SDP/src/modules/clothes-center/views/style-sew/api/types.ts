import { IV1SewResSamplePicture } from '@/modules/clothes-center/api/types';
import {
  MAKE_CLOTHES_TYPE_ENUM,
  PROCESS_NODE_CODE_ENUM,
  PROCESS_STEP_CODE_ENUM,
  SAMPLE_REFER_NUMTYPE_ENUM
} from '@/modules/clothes-center/constant';
import { TIMECONSUMING_SORT_ENUM } from '@/modules/clothes-center/constant/types';

/**
 * **请求类型**
 * 查询列表（全部、已完成、已取消页面）
 * @see https://yapi.ibaibu.com/project/1650/interface/api/91848
 *
 * @请求方法: POST
 * @请求地址: /sdp-sample-clothes/web/v1/sample-clothes/page
 * @更新时间: 2021-09-08 10:59:19
 */
/**
 * 分页对象
 */
export interface PostWebV1SampleClothesPageApiReq {
  /**
   * 当前处理环节code （参考 当前环节字典列表api）
   */
  processStep?: number | string;
  /**
   * 打版件数
   */
  sampleAmount?: number | string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType: number | string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 技术组别
   */
  techniqueGroup?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: number | string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: string;
  /**
   * 期望交期:开始时间
   */
  planDeliveryTimeStart?: string;
  /**
   * 期望交期:开始时间
   */
  planDeliveryTimeEnd?: string;
  /**
   * 设计师id【设计师】
   */
  designerIdList?: number[];
  /**
   * 设计组编号
   */
  designerGroupCodeList?: string[];
  /**
   * 款生成时间（创建时间）
   */
  createdTimeStart?: string;
  /**
   * 款生成时间（创建时间）
   */
  createdTimeEnd?: string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 开发交付日期：
   */
  deliveryTimeStart?: string;
  /**
   * 开发交付日期:结束时间
   */
  deliveryTimeEnd?: string;
  /**
   * 开发时效（如果默认是开发时效，前端不需要传数据）
   */
  effectivenessTypeEnum?: 'OVERDUE' | 'NOT_EXPIRED';
  /**
   * 开发时效-开始天数（传数值）
   */
  effectivenessTimeStart?: number | string;
  /**
   * 开发时效-结束天数（传数值）
   */
  effectivenessTimeEnd?: number | string;
  /**
   * 当前耗时-开始（精确到小时）
   */
  timeConsumingStart?: number | string;
  /**
   * 当前耗时-结束（精确到小时）
   */
  timeConsumingEnd?: number | string;
  /**
   * 区域id
   */
  regionId?: number | string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: number | string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: number | string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: number | string;
  /**
   * 面辅料齐套状态(1-已齐套、0-未齐套)
   */
  materialState?: number | string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: number | string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: number | string;
  /** 波段 */
  waveBandCodeList?: string[];
  pageNum?: number | string;
  pageSize?: number | string;
  [k: string]: any;
}

/**
 * **返回类型**
 * 查询列表（全部、已完成、已取消页面）
 * @see https://yapi.ibaibu.com/project/1650/interface/api/91848
 *
 * @请求方法: POST
 * @请求地址: /sdp-sample-clothes/web/v1/sample-clothes/page
 * @更新时间: 2021-09-08 10:59:19
 */
export interface postWebV1SampleClothesPageApiResListResItem {
  /**
   * 版单id
   */
  clothesId?: number | string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType?: number | string;
  /**
   * 版本号
   */
  versionNum?: number | string;
  /**
   * 设计版单id
   */
  prototypeId?: number | string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode?: string;
  /**
   * 原始加工单号
   */
  baseProcessCode?: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: number | string;
  /**
   * 客户编号
   */
  purchaserCode?: string;
  /**
   * 客户名称
   */
  purchaserName?: string;
  /**
   * 当前处理环节
   */
  processStep?: number | string;
  /**
   * 当前处理环节名称
   */
  processStepDesc?: number | string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 区域id
   */
  regionId?: number | string;
  /**
   * 区域名
   */
  regionName?: string;
  /**
   * 客户图片
   */
  customerPictureList?: string[];
  /**
   * 设计图片
   */
  designPictureList?: string[];
  /**
   * 打版件数
   */
  sampleAmount?: number | string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: number | string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: number | string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: number | string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: number | string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: number | string;
  /**
   * 面辅料齐套状态(1-已齐套、0-未齐套)
   */
  materialState?: number | string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName?: string;
  /**
   * 开发交付日期
   */
  deliveryTime?: string;
  /**
   * 开发交付周期。如：T+3，此值就是3
   */
  deliveryPeriod?: string;
  /**
   * 期望交期
   */
  planDeliveryTime?: string;
  /**
   * 是否完成 0-进行中、1-已完成
   */
  isFinish?: number | string;
  /**
   * 是否取消 0-否、1-是
   */
  isCancel?: number | string;
  /**
   * 是否最新(同一加工单号最新的条) 0-否、1-是
   */
  isLatest?: number | string;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 颜色
   */
  color?: string;
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

export interface PostWebV1SampleClothesPageApiRes {
  page?: number | string;
  total?: number | string;
  list?: postWebV1SampleClothesPageApiResListResItem[];
}

/**
 * 样衣质检_查询列表（分页）
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2394
 */
export interface ISampleQcPageReq {
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
   * 完成开始时间
   */
  finishTimeStart?: string;
  /**
   * 完成结束时间
   */
  finishTimeEnd?: string;
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
  showCancel?: string;
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
   * 主键: 样衣质检id
   */
  sampleQcId?: string;
  /**
   * 质检版本号
   */
  versionNum?: string;
  /**
   * 质检师id
   */
  qualityCheckerId?: string;
  /**
   * 样衣质检状态: 0, 待质检; 1, 已质检;
   */
  qcStatus?: string;
  /**
   * 质检结果: 1,通过; 2,返修;
   */
  qcResult?: string;
  /**
   * 质检时间
   */
  qcTime?: string;
  /**
   * 车缝师id
   */
  sewerId?: string;
  /**
   * 是否最新数据(前端不用传)
   */
  isLatest?: string;
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
   * 质检时间开始
   */
  qcTimeStart?: string;
  /**
    * 质检时间结束
    */
  qcTimeEnd?: string;
  /**
    * 质检任务创建时间开始
    */
  qcCreatedTimeStart?: string;
  /**
    * 质检任务创建时间结束
    */
  qcCreatedTimeEnd?: string;
}

export interface ISampleQcPageRes {
  page?: number;
  total?: number;
  list: ISampleQcPageResListItem[];
}

export interface ISampleQcPageResListItem {
  /**
   * 审版工艺师
   */
  reviewCraftsmanName?: string;
  // 备注
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
  craftList: ISampleQcPageResListItemCraftListItem[];
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
  /**
   * 异常信息
   */
  anomaly?: ISampleQcPageResListItemAnomaly;
  /**
   * 返修信息
   */
  repair?: ISampleQcPageResListItemRepair;
  /**
   * 复版信息
   */
  redoInfo?: ISampleQcPageResListItemRedoInfo;
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
   * 样衣质检id
   */
  sampleQcId?: string;
  /**
   * 纸样单id
   */
  patternId?: string;
  /**
   * 车缝单id
   */
  sewId?: string;
  /**
   * 样衣质检状态: 0, 待质检; 1, 已质检;
   */
  qcStatus?: string;
  /**
   * 样衣质检版本号
   */
  auditVersionNum?: string;
  /**
   * 质检结果: 1,通过; 2,返修;
   */
  qcResult?: string;
  /**
   * 质检时间
   */
  qcTime?: number;
  /**
   * 质检创建时间
   */
  qcCreatedTime?: number;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 更新人名称
   */
  reviserName?: string;
  /**
   * 收货件数
   */
  receiptNumber?: string;
  /**
   * 是否强制通过图片校验（1-是，0-不是）
   */
  enforcePassPicture?: string;
  /**
  * 创建时间
  */
  createdTime?: number;
  /**
  * 完成时间
  */
  finishTime?: number;
}

export interface ISampleQcPageResListItemRedoInfo {
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

export interface ISampleQcPageResListItemRepair {
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

export interface ISampleQcPageResListItemAnomaly {
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

export interface ISampleQcPageResListItemCraftListItem {
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
 * 样衣质检_详情-基础信息
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2396
 */
export interface ISampleQcBaseInfoReq {
  /**
   * 样衣质检单id
   */
  sampleQcId: string;
}

export interface ISampleQcBaseInfoRes {
  /**
   * 样衣质检详情id
   */
  sampleQcDetailId?: string;
  /**
   * 样衣质检id
   */
  sampleQcId?: string;
  /**
   * 问题类型编码
   */
  questionTypeCode?: string;
  /**
   * 问题类型名称
   */
  questionTypeName?: string;
  /**
   * 问题描述
   */
  questionDescription?: string;
  /**
   * 问题图片集合
   */
  problemPictureList?: string[];
  /**
   * 样衣图集合
   */
  sampleClothPictureList?: string[];
  /**
   * 样衣图图片（用于AI识别）
   */
  samplePicture: IV1SewResSamplePicture;
  /**
   * 客户要求尺寸(样衣尺码。如：XXS)
   */
  customerSize?: string;
  /**
   * 样衣尺寸(如：XXXS)
   */
  sampleClothesSize?: string;
  /**
   * 纸样尺寸(如：XXXS)
   */
  patternSize?: string;
  /**
   * 质检尺寸数据集合
   */
  sizeInfoList: ISampleQcBaseInfoResSizeInfoListItem[];
  /**
   * 返修信息对象
   */
  repairInfo?: ISampleQcBaseInfoResRepairInfo;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 更新人名称
   */
  reviserName?: string;
  /**
   * 质检版本号
   */
  versionNum?: string;
  /**
   * 样衣质检状态: 0, 待质检; 1, 已质检;
   */
  qcStatus?: string;
  /**
   * 质检结果: 1,通过; 2,返修;
   */
  qcResult?: string;
  /**
   * 质检时间
   */
  qcTime?: number;
  /**
   * 质检人id
   */
  qcId?: string;
  /**
   * 质检人
   */
  qcName?: string;
  /**
   * 是否强制通过图片校验（1-是，0-不是）
   */
  enforcePassPicture?: string;
  /**
   * 款号基本信息
   */
  clothesBaseInfo?: ISampleQcBaseInfoResClothesBaseInfo;
  /**
   * 纸样信息
   */
  patternBaseInfo?: ISampleQcBaseInfoResPatternBaseInfo;
}

export interface ISampleQcBaseInfoResSizeInfoListItem {
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
  /**
   * 实测样衣（如：实测样衣1尺寸、实测样衣2尺寸）
   */
  clothesTrimSizeList: ISampleQcBaseInfoResSizeInfoListItemClothesTrimSizeListItem[];
}

export interface ISampleQcBaseInfoResSizeInfoListItemClothesTrimSizeListItem {
  /**
   * 保存是"1、2"。前端拼接： 实测样衣1尺寸、实测样衣2尺寸
   */
  clothesName?: string;
  value?: string;
  error?: boolean;
}

export interface ISampleQcBaseInfoResPatternBaseInfo {
  /**
   * 纸样id
   */
  patternId?: string;
  /**
   * 纸样版本: 0:待上传 | 大于0,上传版本
   */
  patternVersion?: string;
  /**
   * 纸样文件url
   */
  patternUrl?: string;
  /**
   * 纸样文件名字
   */
  patternName?: string;
}

export interface ISampleQcBaseInfoResClothesBaseInfo {
  /**
   * 版单id
   */
  clothesId?: string;
  /**
   * 打版类型: 1-大货打版 2-正常打版 3-复色打版 4-补做打版
   */
  sampleType?: string;
  /**
   * 打版件数
   */
  sampleAmount?: string;
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
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户图片{多张以英文逗号分隔}
   */
  customerPicture?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 制作方式：0-仅纸样 1-实物样 2-3D样
   */
  makeClothesType?: MAKE_CLOTHES_TYPE_ENUM;
  /**
   * 设计图片{多张以英文逗号分隔}
   */
  designPicture?: string;
  /**
   * 尺码标准
   */
  sizeStandard?: string;
  /**
   * 样衣尺码
   */
  sampleSize?: string;
  /**
   * 设计组code
   */
  designerGroupCode?: string;
  /**
   * 设计组
   */
  designerGroup?: string;
  /**
   * 设计师id
   */
  designerId?: string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 跟单员id
   */
  merchandiserId?: string;
  /**
   * 跟单员名称
   */
  merchandiserName?: string;
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
   * 设计审版师id
   */
  designReviewerId?: string;
  /**
   * 设计审版师名称
   */
  designReviewerName?: string;
  /**
   * 核算师id
   */
  checkerId?: string;
  /**
   * 核算师名称
   */
  checkerName?: string;
  /**
   * bom文件名称（推款新增）
   */
  bomFileName?: string;
  /**
   * bom文件路径（推款新增）
   */
  bomFileUrl?: string;
  /**
   * 是否fob
   * 1-是 0-不是
   */
  isFob?: string;
}

export interface ISampleQcBaseInfoResRepairInfo {
  /**
   * 返修原因编码（字典获取）
   */
  repairReasonCode?: string;
  /**
   * 返修原因名称（字典获取）
   */
  repairReasonName?: string;
  /**
   * 返修责任方编码: 来源基础资料,传code; (1:版房原因、2:设计师原因、3:客户要求、4:面辅料履约):
   */
  responsibleParty?: string;
  /**
   * 返修责任方名称（来源基础资料）
   */
  responsiblePartyName?: string;
  /**
   * 返修描述
   */
  repairDescription?: string;
  /**
   * 返修类型: 1,仅纸样; 2,仅车版; 3,纸样+车版;
   */
  repairType?: '1' | '2' | '3';
  /**
   * 预估纸样耗时（单位：h）
   */
  patternCostTime?: string;
  /**
   * 预估车版耗时（单位：h）
   */
  sewCostTime?: string;
  /**
   * 预估耗时（单位：h）
   */
  estimatedTime?: string;
  /**
   * 实际耗时（单位：h）
   */
  actualCostTime?: string;
  /**
   * 确认耗时状态(0-待确认; 1-已确认;3-默认状态,为了其他数据该值不为null)
   */
  confirmCostState?: string;
  /**
   * 返修件数
   */
  repairNum?: string;
  /**
   * 返修次数(加工单号下的返修次数)
   */
  repairCount?: string;
  /**
   * 返修单创建人id
   */
  repairUserId?: string;
  /**
   * 返修单创建人
   */
  repairUserName?: string;
  /**
   * 返修单创建时间
   */
  repairTime?: number;
}

/**
 * 样衣质检_通过
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2397
 */
export interface ISampleQcPassReq {
  /**
   * 样衣质检单id
   */
  sampleQcId: string;
  /**
   * 问题类型编码
   */
  questionTypeCode?: string;
  /**
   * 问题类型名称
   */
  questionTypeName?: string;
  /**
   * 问题描述
   */
  questionDescription?: string;
  /**
   * 问题图片集合(最多15张)
   */
  problemPictureList?: string[];
  /**
   * 样衣图集合(最少1张,最多15张)
   */
  sampleClothPictureList?: string[];
  /**
   * 样衣图图片（用于AI识别）
   */
  samplePicture: IV1SewResSamplePicture;
  /**
   * 是否强制通过图片校验（1-是，0-不是）
   */
  enforcePassPicture?: string;
  /**
   * 质检尺寸数据集合
   */
  sizeInfoList: ISampleQcPassReqSizeInfoListItem[];
}

export interface ISampleQcPassReqSizeInfoListItem {
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
  /**
   * 实测样衣（如：实测样衣1尺寸、实测样衣2尺寸）
   */
  clothesTrimSizeList: ISampleQcPassReqSizeInfoListItemClothesTrimSizeListItem[];
}

export interface ISampleQcPassReqSizeInfoListItemClothesTrimSizeListItem {
  /**
   * 保存是"1、2"。前端拼接： 实测样衣1尺寸、实测样衣2尺寸
   */
  clothesName?: string;
  value?: string;
}

/**
 * 样衣质检_返修
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2398
 */
export interface ISampleQcRepairReq {
  /**
   * 样衣质检单id
   */
  sampleQcId: string;
  /**
   * 问题类型编码
   */
  questionTypeCode?: string;
  /**
   * 问题类型名称
   */
  questionTypeName?: string;
  /**
   * 问题描述
   */
  questionDescription?: string;
  /**
   * 问题图片集合(最多15张)
   */
  problemPictureList: string[];
  /**
   * 样衣图集合(最少1张,最多15张)
   */
  sampleClothPictureList: string[];
  /**
   * 样衣图图片（用于AI识别）
   */
  samplePicture: IV1SewResSamplePicture;
  /**
   * 是否强制通过图片校验（1-是，0-不是）
   */
  enforcePassPicture?: string;
  /**
   * 质检尺寸数据集合
   */
  sizeInfoList: ISampleQcRepairReqSizeInfoListItem[];
  /**
   * 返修信息对象
   */
  repairInfo?: ISampleQcRepairReqRepairInfo;
}

export interface ISampleQcRepairReqSizeInfoListItem {
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
  /**
   * 实测样衣（如：实测样衣1尺寸、实测样衣2尺寸）
   */
  clothesTrimSizeList: ISampleQcRepairReqSizeInfoListItemClothesTrimSizeListItem[];
}

export interface ISampleQcRepairReqSizeInfoListItemClothesTrimSizeListItem {
  /**
   * 保存是"1、2"。前端拼接： 实测样衣1尺寸、实测样衣2尺寸
   */
  clothesName?: string;
  value?: string;
}

export interface ISampleQcRepairReqRepairInfo {
  /**
   * 返修原因编码（字典获取）
   */
  repairReasonCode: string;
  /**
   * 返修原因名称（字典获取）
   */
  repairReasonName: string;
  /**
   * 返修责任方编码: 来源基础资料,传code;(1:版房原因、2:设计师原因、3:客户要求、4:面辅料履约)
   */
  responsibleParty: string;
  /**
   * 返修责任方名称（来源基础资料）
   */
  responsiblePartyName: string;
  /**
   * 返修描述
   */
  repairDescription: string;
  /**
   * 返修类型: 1,仅纸样; 2,仅车版; 3,纸样+车版;(3D样时,返修类型只能选择仅纸样)
   */
  repairTypes: SAMPLE_REFER_NUMTYPE_ENUM[];
  /**
   * 预估纸样耗时（单位：h）: 返修类型为仅纸样 或 纸样+车版 时 必填
   */
  patternCostTime?: string;
  /**
   * 预估车版耗时（单位：h）: 返修类型为仅车版 或 纸样+车版 时 必填
   */
  sewCostTime?: string;
  /**
   * 预估耗时（单位：h）
   */
  estimatedTime?: string;
  /**
   * 实际耗时（单位：h）
   */
  actualCostTime?: string;
  /**
   * 确认耗时状态(0-待确认; 1-已确认;3-默认状态,为了其他数据该值不为null)
   */
  confirmCostState?: string;
  /**
   * 返修件数
   */
  repairNum?: string;
  /**
   * 返修次数(加工单号下的返修次数),前端不用传
   */
  repairCount?: string;
  /**
   * 返修单创建人id
   */
  repairUserId?: string;
  /**
   * 返修单创建人
   */
  repairUserName?: string;
  /**
   * 返修单创建时间
   */
  repairTime?: string;
}

/**
 * 分页查询
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2544
 */
export interface ISewQueryByPageReq {
  /**
   * 是否展示取消订单
   */
  showCancel?: boolean;
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
   * 完成开始时间
   */
  finishTimeStart?: string;
  /**
   * 完成结束时间
   */
  finishTimeEnd?: string;
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
  clothesStep?: PROCESS_STEP_CODE_ENUM | '';
  /**
   * 样衣所在处理节点code （参考 ClothesNodeEnum）
   */
  clothesNode?: PROCESS_NODE_CODE_ENUM | '';
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
  /**
   * 车缝师id
   */
  sewerIdList: string[];
  /**
   * 裁剪师id
   */
  cutterIdList: string[];
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
   * 分单完成时间开始
   */
  allocateFinishTimeStart?: string;
  /**
   * 分单完成时间结束
   */
  allocateFinishTimeEnd?: string;
  /**
   * 分单开始时间开始
   */
  allocateCreatedTimeStart?: string;
  /**
   * 分单开始时间结束
   */
  allocateCreatedTimeEnd?: string;
  /**
   * 裁剪完成时间开始
   */
  cutFinishTimeStart?: string;
  /**
   * 裁剪完成时间结束
   */
  cutFinishTimeEnd?: string;
  /**
   * 裁剪开始时间开始
   */
  cutCreatedTimeStart?: string;
  /**
   * 裁剪开始时间结束
   */
  cutCreatedTimeEnd?: string;
  /**
   * 裁片二次工艺完成时间开始
   */
  sliceCraftFinishTimeStart?: string;
  /**
   * 裁片二次工艺完成时间结束
   */
  sliceCraftFinishTimeEnd?: string;
  /**
   * 待收货创建时间开始
   */
  sewReceiptCreatedTimeStart?: string;
  /**
   * 待收货创建时间结束
   */
  sewReceiptCreatedTimeEnd?: string;
  /**
   * 收货完成时间开始
   */
  sewReceiptFinishTimeStart?: string;
  /**
   * 收货完成时间结束
   */
  sewReceiptFinishTimeEnd?: string;
  /**
   * 车缝待进行创建时间开始
   */
  pendingTimeStart?: string;
  /**
   * 车缝待进行创建时间结束
   */
  pendingTimeEnd?: string;
  /**
   * 车缝进行中创建时间开始
   */
  sewProgressTimeStart?: string;
  /**
   * 车缝进行中创建时间结束
   */
  sewProgressTimeEnd?: string;
  /**
   * 车缝完成时间开始
   */
  sewFinishTimeStart?: string;
  /**
   * 车缝完成时间结束
   */
  sewFinishTimeEnd?: string;
  /**
   * 半成品工艺进行中创建时间开始
   */
  semiCraftCreatedTimeStart?: string;
  /**
   * 半成品工艺进行中创建时间结束
   */
  semiCraftCreatedTimeEnd?: string;
  /**
   * 半成品工艺进行中完成时间开始
   */
  semiCraftFinishTimeStart?: string;
  /**
   * 半成品工艺进行中完成时间结束
   */
  semiCraftFinishTimeEnd?: string;
  /**
   * 成品二次工艺创建时间开始
   */
  finishCraftCreatedTimeStart?: string;
  /**
   * 成品二次工艺创建时间结束
   */
  finishCraftCreatedTimeEnd?: string;
  /**
   * 成品二次工艺完成时间开始
   */
  finishCraftFinishTimeStart?: string;
  /**
   * 成品二次工艺完成时间结束
   */
  finishCraftFinishTimeEnd?: string;
}

export interface ISewQueryByPageRes {
  page?: number;
  total?: number;
  list: ISewQueryByPageResListItem[];
}

export interface ISewQueryByPageResListItem {
  /**
   * 备注
   */
  remark?: string;
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
   * 是否有二次工艺(1:是,0:不是)
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
   * 审版工艺师id
   */
  reviewCraftsmanId?: string;
  /**
   * 审版工艺师名称
   */
  reviewCraftsmanName?: string;
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
  craftList: ISewQueryByPageResListItemCraftListItem[];
  /**
   * 裁剪方法编码
   */
  cuttingMethodCode?: string;
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
  /**
   * 异常信息
   */
  anomaly?: ISewQueryByPageResListItemAnomaly;
  /**
   * 返修信息
   */
  repair?: ISewQueryByPageResListItemRepair;
  /**
   * 复版信息
   */
  redoInfo?: ISewQueryByPageResListItemRedoInfo;
  /**
   * 是否取消 0-否、1-是
   */
  isCancel?: string;
  /**
   * 是否完成 0-进行中、1-已完成
   */
  isDone?: string;
  /**
   * 是否最新(同一加工单号最新的条) 0-否、1-是
   */
  isLatest?: string;
  /**
   * 复版原因
   */
  redoReason?: string;
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
   * 是否已完成审版工艺单(1-是、0-否)
   */
  isFinishedAco?: string;
  /**
   * 最新版纸样任务ID
   */
  latestPatternId?: string;
  /**
   * 审版通过后最终确认的BOM ID
   */
  bomId?: string;
  /**
   * 审版通过时的审核工艺单明细ID
   */
  auditCraftOrderDetailId?: string;
  /**
   * 车版任务id
   */
  sewId?: string;
  /**
   * 车版收货单id
   */
  sewReceiptId?: string;
  /**
   * 车版收货件数
   */
  pieces?: string;
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
  /**
   * 车版分单状态。（0:未流转 1:待分单 2:已分单）
   */
  allocateState?: string;
  /**
   * 车版分单人id
   */
  allocateeId?: string;
  /**
   * 车版分单人
   */
  allocateeName?: string;
  /**
   * 板房id(1:内部,其他外部板房id)
   */
  roomId?: string;
  /**
   * 板房名字
   */
  roomName?: string;
  /**
  * 创建时间
  */
  createdTime?: number;
  /**
   * 分单创建时间
   */
  allocateCreatedTime?: number;
  /**
    * 分单完成时间
    */
  allocateFinishTime?: number;
  /**
   * 首次分单完成时间
   */
  firstAllocateFinishTime?: number;
  /**
   * 裁剪创建时间
   */
  cutCreatedTime?: number;
  /**
   * 裁剪完成时间
   */
  cutFinishTime?: number;
  /**
   * 裁片二次工艺创建时间
   */
  sliceCraftCreatedTime?: number;
  /**
   * 裁片二次工艺完成时间
   */
  sliceCraftFinishTime?: number;
  /**
   * 待收货创建时间
   */
  sewReceiptCreatedTime?: number;
  /**
   * 收货完成时间
   */
  sewReceiptFinishTime?: number;
  /**
   * 半成品二次工艺创建时间
   */
  semiCraftCreatedTime?: number;
  /**
   * 半成品二次工艺完成时间
   */
  semiCraftFinishTime?: number;
  /**
   * 成品二次工艺创建时间
   */
  finishCraftCreatedTime?: number;
  /**
   * 成品二次工艺完成时间
   */
  finishCraftFinishTime?: number;
  /**
   * 二次工艺创建时间
   */
  craftCreatedTime?: number;
  /**
   * 二次工艺完成时间
   */
  craftFinishTime?: number;
  /**
   * 待进行创建时间
   */
  pendingTime?: number;
  /**
   * 车缝进行中创建时间
   */
  sewProgressTime?: number;
  /**
   * 车缝完成时间
   */
  sewFinishTime?: number;
  /**
   * 外部接单创建时间
   */
  pickExtCreatedTime?: number;
  /**
   * 外部接单完成时间
   */
  pickExtFinishTime?: number;
  /**
   * 车缝任务创建时间
   */
  sewCreatedTime?: number;
}

export interface ISewQueryByPageResListItemNodeState {
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

export interface ISewQueryByPageResListItemRedoInfo {
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

export interface ISewQueryByPageResListItemRepair {
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

export interface ISewQueryByPageResListItemAnomaly {
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

export interface ISewQueryByPageResListItemCraftListItem {
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
 * 车版分单
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2459
 */
export interface ISewAllocateReq {
  /**
   * 车版id列表
   */
  sewId: string[];
  /**
   * 是否外发(1:是,0:不是)
   */
  isOutsourced: string;
  /**
   * 板房id
   */
  roomId: string;
  /**
   * 板房名字
   */
  roomName: string;
}

/**
 * 查询版房订单数量（分页）
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/3082
 */
export interface ISewMakerRoomReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 板房名字
   */
  roomName?: string;
}

export interface ISewMakerRoomRes {
  page?: number;
  total?: number;
  list: ISewMakerRoomResListItem[];
}

export interface ISewMakerRoomResListItem {
  /**
   * 版房id
   */
  roomId?: string;
  /**
   * 版房名称
   */
  roomName?: string;
  /**
   * 订单数
   */
  orderCount?: string;
}

/**
 * 车版分单撤回
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/3129
 */
export interface ISewWithdrawReq {
  /**
   * 车版id
   */
  sewId: string;
}

/**
 * 外部处理-确认收货
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2475
 */
export interface ISewReceiptReq {
  /**
   * 车版收货id
   */
  sewReceiptId: string;
  /**
   * 件数
   */
  pieces: string;
}
