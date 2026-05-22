import { YES_NO_ENUM, TIME_CONSUMING_TYPE_ENUM } from '@/constant';
import { IV1SewResSamplePicture } from '@/modules/clothes-center/api/types';
import { SAMPLE_REFER_NUMTYPE_ENUM, SAMPLE_TYPE_ENUM } from '@/modules/clothes-center/constant';
import { TIMECONSUMING_SORT_ENUM } from '@/modules/clothes-center/constant/types';
import { STATUS_LIST_ENUM } from '../constant';

/**
 * 图片类型 （正/侧/背/其他）
 */
export enum PICTURE_ORIENTATION_ENUM {
  /**
   * 正面
   */
  FRONT = 'front',
  /**
   * 侧面
   */
  SIDE = 'side',
  /**
   * 背面
   */
  BACK = 'back',
  /**
   * 其他
   */
  OTHER = 'other',
  DETAIL = 'detail',
}

/**
 * 款式审版_查询列表（分页）
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/1986
 */
export interface ISampleAuditPageReq {
  /**
   * 审版工艺师
   */
  reviewCraftsmanId?: string;
  /**
   * 是否展示取消订单
   */
  showCancel?: boolean;
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
  pageNum?: number;
  pageSize?: number;
  /**
   * 打版类型: 1-大货打版 2-正常打版 3-复色打版 4-补做打版
   */
  sampleType: SAMPLE_TYPE_ENUM | '';
  /**
   * 打版类型集合: 1-大货打版 2-正常打版 3-复色打版
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
   * 技术组别编码
   */
  techniqueGroup?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: string;
  /**
   * 纸样师id集合
   */
  patternMakerIdList: string[];
  /**
   * 客户id
   */
  purchaserId?: string;
  /**
   * 客户id集合
   */
  purchaserIdList: string[];
  /**
   * 设计师id【设计师】
   */
  designerIdList?: string[];
  /**
   * 设计组编号
   */
  designerGroupCodeList: string[];
  /**
   * 期望交期:开始时间
   */
  planDeliveryTimeStart?: string;
  /**
   * 期望交期:开始时间
   */
  planDeliveryTimeEnd?: string;
  /**
   * 款生成时间
   */
  skcCreatedTimeStart?: string;
  /**
   * 款生成时间
   */
  skcCreatedTimeEnd?: string;
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
   * 跟单员id
   */
  merchandiserId?: string;
  /**
   * 跟单员ids
   */
  merchandiserIdList?: string[];
  /**
   * 销售群体
   */
  saleGroupList: string[];
  /**
   * 开发时效（如果默认是开发时效，前端不需要传数据）
   */
  effectivenessType?: EFFECTIVENESS_TYPE_ENUM;
  /**
   * 开发时效-开始天数（传数值）
   */
  effectivenessTimeStart?: string;
  /**
   * 开发时效-结束天数（传数值）
   */
  effectivenessTimeEnd?: string;
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
   * 区域id
   */
  regionId?: string;
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
   * 款式类别：0-平台 1-大客户 2-其他
   */
  styleCategory?: string;
  /**
   * 制作方式
   * 0-仅纸样 1-实物样 2-3D样
   */
  makeClothesType?: string;
  /**
   * cad是否确认 1-是 0-否
   */
  cadIsConfirm?: string;
  /**
   * cad是否更新 1-是 0-否
   */
  cadIsUpdate?: string;
  /**
   * 尺码标准编号
   */
  sizeStandardCode?: string;
  /**
   * 环节：
   * 200: 纸样待分单、 230: 内部纸样-待进行、 250: 内部纸样-进行中、
   * 270: 外部纸样-待接单、 290: 外部纸样-进行中、 300: 面辅料齐套、 400: 车版待分单、
   * 410: 内部车版-裁剪进行中、 420: 内部车版-裁片二次工艺、 430: 内部车版-车缝待进行、
   * 440: 内部车版-车缝-半成品二次工艺、 460: 内部车版-车缝进行中、 470: 内部车版-成品二次工艺、
   * 500: 外部车版-待接单、 510: 外部车版-裁剪、 520: 外部车版-裁片二次工艺、 530: 外部车版-车缝待进行、
   * 540: 外部车版-车缝-半成品二次工艺、 550: 外部车版-车缝进行中、 560: 外部车版-成品二次工艺、
   * 570: 外部车版-送货、 580: 外部车版-收货、 600: 样衣质检、 610: 联合审版、 620: 设计审版、 630: 用量维护、
   * 640: 样衣核价、 650: 寄送样衣、 660: 客户审版
   */
  processStep?: string;
  /**
   * 主键: 联合审版id
   */
  sampleAuditId?: string;
  /**
   * 联合审版版本号
   */
  versionNum?: string;
  /**
   * 质检师id
   */
  qualityCheckerId?: string;
  /**
   * 审版师id
   */
  editionReviewerId?: string;
  /**
   * 联合审版状态: 0, 待审版; 1,已审版
   */
  auditStatus?: STATUS_LIST_ENUM;
  /**
   * 审版结果: 0,不通过; 1,通过; 2,返修;
   */
  auditResult?: string;
  /**
   * 审核时间
   */
  auditTime?: string;
  /**
   * 波段编码集合
   */
  waveBandCodeList: string[];
  /**
   * 开始审核时间
   */
  startAuditTime?: string;
  /**
   * 结束审核时间
   */
  endAuditTime?: string;
  timeConsumingType?: TIME_CONSUMING_TYPE_ENUM;
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
   * 审核任务创建时间开始
   */
  auditCreatedTimeStart?: string;
  /**
   * 审核创建时间结束
   */
  auditCreatedTimeEnd?: string;
}

export interface ISampleAuditPageRes {
  page?: number;
  total?: number;
  list: ISampleAuditPageResListItem[];
}

export interface ISampleAuditPageResListItem {
  /**
   * 审版工艺师
   */
  reviewCraftsmanName?: string;
  /**
   * 版单id
   */
  clothesId?: string;
  /**
   * 打版类型: 1-大货打版 2-正常打版 3-复色打版 4-补做打版
   */
  sampleType?: string;
  /**
   * 订单类型: 1-打版订单 2-设计订单 3-加工订单；1、2属于样衣，3属于生产(大货)
   */
  demandTaskType?: string;
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
   * 客户图片
   */
  customerPictureList: string[];
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
   * 当前处理环节
   */
  processStep?: string;
  /**
   * 当前处理环节名称
   */
  processStepDesc?: string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: string;
  /**
   * 客户编号
   */
  purchaserCode?: string;
  /**
   * 客户名称
   */
  purchaserName?: string;
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
  regionId?: string;
  /**
   * 区域名
   */
  regionName?: string;
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
  deliveryTime?: number;
  /**
   * 开发交付周期。如：T+3，此值就是3
   */
  deliveryPeriod?: string;
  /**
   * 期望交期
   */
  planDeliveryTime?: number;
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
   * 跟单员id
   */
  merchandiserId?: string;
  /**
   * 跟单员名称
   */
  merchandiserName?: string;
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
  craftList: ISampleAuditPageResListItemCraftListItem[];
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
  /**
   * 异常信息
   */
  anomaly?: ISampleAuditPageResListItemAnomaly;
  /**
   * 返修信息
   */
  repair?: ISampleAuditPageResListItemRepair;
  /**
   * 复版信息
   */
  redoInfo?: ISampleAuditPageResListItemRedoInfo;
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
   * 是否上新 1是  0否
   */
  onShelfStatus?: string;
  /**
   * 是否上架 1是  0否
   */
  putOnShelfStatus?: string;
  /**
   * 上架人(putOnShelfStatus=1时有值) --v4.12
   */
  putOnShelfPerson?: string;
  /**
   * bom文件名称（推款新增）
   */
  bomFileName?: string;
  /**
   * bom文件路径（推款新增）
   */
  bomFileUrl?: string;
  /**
   * 1-是 0-不是
   */
  isFob?: string;
  /**
   * 以价开款(单位：元)
   */
  paymentAtPrice?: string;
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
   * 核算数据是否有更新,0:否,1:是
   */
  checkCountIsUpdate?: string;
  /**
   * 是否最新(同一加工单号最新的条) 0-否、1-是
   */
  sampleClothesIsLatest?: string;
  /**
   * 款式类别：0-平台 1-大客户
   */
  styleCategory?: string;
  /**
   * 制作方式
   * 0-仅纸样 1-实物样 2-3D样
   */
  makeClothesType?: string;
  /**
   * 联合审版id
   */
  sampleAuditId?: string;
  /**
   * 开发bom单id
   */
  bomOrderId?: string;
  /**
   * 纸样单id
   */
  patternId?: string;
  /**
   * 核算（用量）表ID
   */
  checkCountId?: string;
  /**
   * 车缝单id
   */
  sewId?: string;
  /**
   * 样衣质检单id
   */
  sampleQcId?: string;
  /**
   * 联合审版版本号
   */
  auditVersionNum?: string;
  /**
   * 联合审版状态: 0, 待审版; 1,已审版;
   */
  auditStatus?: string;
  /**
   * 审版结果: 0,不通过; 1,通过; 2,返修;
   */
  auditResult?: string;
  /**
   * 审核时间
   */
  auditTime?: number;
  /**
   * 审版任务创建时间
   */
  auditCreatedTime?: number;
  /**
   * 收货件数
   */
  receiptNumber?: string;
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
   * 创建时间
   */
  createdTime?: number;
  /**
   * 完成时间
   */
  finishTime?: number;
  /**
   * 环节异常耗时(单位分钟)
   */
  stepExceptionTimeConsuming?: string;
}

export interface ISampleAuditPageResListItemRedoInfo {
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

export interface ISampleAuditPageResListItemRepair {
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

export interface ISampleAuditPageResListItemAnomaly {
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

export interface ISampleAuditPageResListItemCraftListItem {
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
 * 开发时效（如果默认是开发时效，前端不需要传数据）
 */
export enum EFFECTIVENESS_TYPE_ENUM {
  /**
   * 开发超期
   */
  OVERDUE = 'OVERDUE',
  /**
   * 开发未超期
   */
  NOT_EXPIRED = 'NOT_EXPIRED'
}

/**
 * 联合审版_详情-基础信息
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2101
 */
export interface ISampleAuditBaseInfoReq {
  /**
   * 联合审版单id
   */
  sampleAuditId: string;
}

export interface ISampleAuditBaseInfoRes {
  /**
   * 加工单id
   */
  clothesId?: string;
  /**
   * 联合审版详情id
   */
  sampleAuditDetailId?: string;
  /**
   * 联合审版id
   */
  sampleAuditId?: string;
  /**
   * 联合审版评语集合
   */
  auditCommentList?: ISampleAuditBaseInfoResAuditCommentListItem[];
  /**
   * 其他审版意见
   */
  otherAuditComments?: string;
  /**
   * 问题描述
   */
  questionDescription?: string;
  /**
   * 样衣图集合
   */
  sampleClothPictureList?: string[];
  /**
   * 是否强制通过图片校验（1-是，0-不是）
   */
  enforcePassPicture?: string;
  /**
   * 样衣图图片
   */
  samplePicture: IV1SewResSamplePicture;
  /**
   * 3D图任务信息
   */
  dimensionPicture: IV1SewResSamplePicture;
  /**
   * 尺寸表信息
   */
  sizeTable: IQcLableInfoResSizeInfoListItem[];
  /**
   * 款式标签
   */
  categoryTags?: ISampleAuditBaseInfoResCategoryTagsItem[];
  /**
   * 返修信息对象
   */
  repairInfo?: ISampleAuditBaseInfoResRepairInfo;
  /**
   * 复版原因
   */
  redoReason?: string;
  /**
   * 复版原因编码
   */
  redoReasonCode?: string;
  /**
   * 复版责任方: 1:版房原因、2:设计师原因、3:客户要求
   */
  responsibleParty?: string;
  /**
   * 复版责任方名称
   */
  responsiblePartyName?: string;
  /**
   * 联合审版意见json
   */
  auditComments?: string;
  /**
   * 3d图带完整地址
   */
  patternClothes3dPicWithUrl?: ISampleAuditBaseInfoResPatternClothes3dPicWithUrl;
  /**
   * 联合审版版本号
   */
  versionNum?: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 纸样单id
   */
  patternId?: string;
  /**
   * 核算（用量）表ID
   */
  checkCountId?: string;
  /**
   * 样衣质检单id
   */
  sampleQcId?: string;
  /**
   * 联合审版状态: 0, 待审版; 1,已审版; 2, 待处理; 3,已处理
   */
  auditStatus?: string;
  /**
   * 审版结果: 0,不通过; 1,通过; 2,返修;
   */
  auditResult?: string;
  /**
   * 审核时间
   */
  auditTime?: number;
  /**
   * 审版人Id
   */
  auditId?: string;
  /**
   * 审版人
   */
  auditName?: string;
  /**
   * 纸样信息
   */
  patternBaseInfo?: ISampleAuditBaseInfoResPatternBaseInfo;
  /**
   * 款号基本信息
   */
  clothesBaseInfo?: ISampleAuditBaseInfoResClothesBaseInfo;
  /**
   * 区域id, 4-广州，8-杭州
   */
  regionId?: string;
  /**
   * 区域名
   */
  regionName?: string;
  /**
   * 唛架图{多张以英文逗号分隔}
   */
  markFramePictures: string[];
}

export interface ISampleAuditBaseInfoSamplePicture {
  /**
   * 正面图
   */
  frontPicture?: ISampleAuditBaseInfoSamplePictureList;
  /**
   * 侧面图
   */
  sidePicture?: ISampleAuditBaseInfoSamplePictureList;
  /**
   * 背面图
   */
  backPicture?: ISampleAuditBaseInfoSamplePictureList;
  /**
   * 其他图片
   */
  otherPictures?: ISampleAuditBaseInfoSamplePictureList;
  detailPictures?: ISampleAuditBaseInfoSamplePictureList;
}

export interface ISampleAuditBaseInfoSamplePictureList {
  /**
   * 图片地址
   */
  urls?: ISampleAuditBaseInfoSamplePictureUrlsItem[];
  /**
   * 图片类型 （正/侧/背/其他）
   */
  pictureOrientationEnum?: PICTURE_ORIENTATION_ENUM;
}

export interface ISampleAuditBaseInfoSamplePictureUrlsItem {
  /**
   * 图片地址
   */
  url: string;
  /**
   * 是否校验通过
   */
  checkPass?: string;
  /**
   * 校验不通过原因
   */
  msg?: string;
}

export interface ISampleAuditBaseInfoResClothesBaseInfo {
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
  makeClothesType?: string;
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

export interface ISampleAuditBaseInfoResPatternBaseInfo {
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

export interface ISampleAuditBaseInfoResPatternClothes3dPicWithUrl {
  /**
   * 3d正面图路径
   */
  front3dPicPath?: string;
  /**
   * 3d侧面图路径
   */
  side3dPicPath?: string;
  /**
   * 3d背面图路径
   */
  back3dPicPath?: string;
  /**
   * 样衣背面图路径
   */
  frontSamplePicPath?: string;
  /**
   * 样衣侧面图路径
   */
  sideSamplePicPath?: string;
  /**
   * 样衣背面图路径
   */
  backSamplePicPath?: string;
  /**
   * 3d正面图完整地址url
   */
  front3dPicUrl?: string;
  /**
   * 3d侧面图完整地址url
   */
  side3dPicUrl?: string;
  /**
   * 3d背面图完整地址url
   */
  back3dPicUrl?: string;
  /**
   * 样衣背面图完整地址url
   */
  frontSamplePicUrl?: string;
  /**
   * 样衣侧面图完整地址url
   */
  sideSamplePicUrl?: string;
  /**
   * 样衣背面图完整地址url
   */
  backSamplePicUrl?: string;
}

export interface ISampleAuditBaseInfoResRepairInfo {
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
  repairTypes?: SAMPLE_REFER_NUMTYPE_ENUM[];
  /**
   * 预估纸样耗时（单位：h）
   */
  patternCostTime?: string;
  /**
   * 预估车版耗时（单位：h）
   */
  sewCostTime?: string;
  /**
   * 预估3D耗时（单位：h）
   */
  dimensionCostTime?: string;
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
  /**
   * 是否做样衣
   */
  isMakeClothing?: boolean;
}

export interface ISampleAuditBaseInfoResCategoryTagsItem {
  /**
   * 标签编码
   */
  clothTagCode?: string;
  /**
   * 标签名称
   */
  clothTagName?: string;
  /**
   * 标签值编码
   */
  tagCode?: string;
  /**
   * 标签值名称
   */
  tagName?: string;
}

export interface ISampleAuditBaseInfoResAuditCommentListItem {
  /**
   * 联合审版id
   */
  sampleAuditId?: string;
  /**
   * 序号(排序用)
   */
  serialNumber?: string;
  /**
   * 审版评语
   */
  auditComment?: string;
  /**
   * 审版评语编码
   */
  auditCode?: string;
  /**
   * 纸样修改意见
   */
  patternOpinion?: string;
  /**
   * 样衣修改意见
   */
  sampleOpinion?: string;
}

/**
 * 根据样衣质检单id-获取质检单标签页信息
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2111
 */
export interface IQcLableInfoReq {
  /**
   * 质检单id
   */
  sampleQcId: string;
}

export interface IQcLableInfoRes {
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
  problemPictureList: string[];
  /**
   * 样衣图集合
   */
  sampleClothPictureList?: string[];
  /**
   * 样衣图图片（用于AI识别）
   */
  samplePicture?: IQcLableInfoResSamplePicture;
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
  sizeInfoList: IQcLableInfoResSizeInfoListItem[];
  /**
   * 返修信息对象
   */
  repairInfo?: IQcLableInfoResRepairInfo;
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
   * 尺码标准
   */
  sizeStandard?: string;
  /**
   * 样衣尺码
   */
  sampleSize?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
}

export interface IQcLableInfoResSamplePicture {
  /**
   * 正面图
   */
  frontPicture?: IQcLableInfoResSamplePictures;
  /**
   * 侧面图
   */
  sidePicture?: IQcLableInfoResSamplePictures;
  /**
   * 背面图
   */
  backPicture?: IQcLableInfoResSamplePictures;
  /**
   * 其他图片
   */
  otherPictures?: IQcLableInfoResSamplePictures;
}

export interface IQcLableInfoResSamplePictures {
  /**
   * 图片地址
   */
  urls: IQcLableInfoResSamplePictureUrlsItem[];
  /**
   * 图片类型 （正/侧/背/其他）
   */
  pictureOrientationEnum: PICTURE_ORIENTATION_ENUM;
}

export interface IQcLableInfoResSamplePictureUrlsItem {
  /**
   * 图片地址
   */
  url: string;
  /**
   * 是否校验通过
   */
  checkPass?: string;
  /**
   * 校验不通过原因
   */
  msg?: string;
}

export interface IQcLableInfoResSizeInfoListItem {
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
   * 客户尺寸
   */
  size?: string;
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
   * 实测样衣（如：实测样衣1尺寸、实测样衣2尺寸）
   */
  clothesTrimSizeList: IQcLableInfoResSizeInfoListItemClothesTrimSizeListItem[];
}

export interface IQcLableInfoResSizeInfoListItemClothesTrimSizeListItem {
  /**
   * 保存是"1、2"。前端拼接： 实测样衣1尺寸、实测样衣2尺寸
   */
  clothesName?: string;
  value?: string;
  error?: boolean;
}

export interface IQcLableInfoResRepairInfo {
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
 * 联合审版_通过
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2103
 */
export interface ISampleAuditPassReq {
  /**
   * 联合审版id
   */
  sampleAuditId: string;
  /**
   * 核算（用量）表ID (大货打版流程 非必填, 其他必填)
   */
  checkCountId?: string;
  /**
   * 尺寸表信息
   */
  sizeTable: ISampleAuditReqSizeTableItem[];
  /**
   * 展示该加工单版本在车缝环节上传的样衣图
   */
  samplePicture?: ISampleAuditBaseInfoSamplePicture;
  /**
   * 展示该加工单版本在3D环节上传的样衣图
   */
  dimensionPicture?: ISampleAuditBaseInfoSamplePicture;
  /**
   * 纸样文件
   */
  patternFileUrl: string;
  /**
   * 纸样任务ID,doUpdatePatternFile=1时，该字段不能为空
   */
  patternId?: string;
  /**
   * 纸样文件名字,doUpdatePatternFile=1时，该字段不能为空
   */
  patternFileName?: string;
  /**
   * 是否有操作过上传纸样文件 1是0否
   */
  doUpdatePatternFile?: string;
  /**
   * 唛架图{多张以英文逗号分隔}
   */
  markFramePicture?: string;
}

export interface ISampleAuditPassReqCategoryTagsItem {
  /**
   * 标签编码
   */
  clothTagCode?: string;
  /**
   * 标签名称
   */
  clothTagName?: string;
  /**
   * 标签值编码
   */
  tagCode?: string;
  /**
   * 标签值名称
   */
  tagName?: string;
}

/**
 * 联合审版_不通过(复版)
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2098
 */
export interface ISampleAuditNoPassReq {
  /**
   * 联合审版id
   */
  sampleAuditId?: string | '';
  /**
   * 核算（用量）表ID (大货打版流程 非必填, 其他必填)
   */
  checkCountId?: string;
  /**
   * 尺寸表信息
   */
  sizeTable?: ISampleAuditReqSizeTableItem[];
  /**
   * 展示该加工单版本在车缝环节上传的样衣图
   */
  samplePicture?: ISampleAuditBaseInfoSamplePicture;
  /**
   * 展示该加工单版本在3D环节上传的样衣图
   */
  dimensionPicture?: ISampleAuditBaseInfoSamplePicture;
  /**
   * 复版原因编码
   */
  redoReasonCode: string;
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
   * 纸样文件
   */
  patternFileUrl: string;
  /**
   * 纸样任务ID,doUpdatePatternFile=1时，该字段不能为空
   */
  patternId?: string;
  /**
   * 纸样文件名字,doUpdatePatternFile=1时，该字段不能为空
   */
  patternFileName?: string;
  /**
   * 是否有操作过上传纸样文件 1是0否
   */
  doUpdatePatternFile?: string;
  /**
   * 唛架图{多张以英文逗号分隔}
   */
  markFramePicture?: string;
}

export interface ISampleAuditReqSizeTableItem {
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
   * 客户尺寸
   */
  size?: string;
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
}

export interface ISampleAuditNoPassReqCategoryTagsItem {
  /**
   * 标签编码
   */
  clothTagCode?: string;
  /**
   * 标签名称
   */
  clothTagName?: string;
  /**
   * 标签值编码
   */
  tagCode?: string;
  /**
   * 标签值名称
   */
  tagName?: string;
}

/**
 * 联合审版_返修
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2102
 */
export interface ISampleAuditRepairReq {
  /**
   * 联合审版id
   */
  sampleAuditId: string;
  /**
   * 核算（用量）表ID (大货打版流程 非必填, 其他必填)
   */
  checkCountId?: string;
  /**
   * 尺寸表信息
   */
  sizeTable: ISampleAuditReqSizeTableItem[];
  /**
   * 展示该加工单版本在车缝环节上传的样衣图
   */
  samplePicture?: ISampleAuditBaseInfoSamplePicture;
  /**
   * 展示该加工单版本在3D环节上传的样衣图
   */
  dimensionPicture?: ISampleAuditBaseInfoSamplePicture;
  /**
   * 返修信息对象
   */
  repairInfo?: ISampleAuditRepairReqRepairInfo;
  /**
   * 纸样文件
   */
  patternFileUrl: string;
  /**
   * 纸样任务ID,doUpdatePatternFile=1时，该字段不能为空
   */
  patternId?: string;
  /**
   * 纸样文件名字,doUpdatePatternFile=1时，该字段不能为空
   */
  patternFileName?: string;
  /**
   * 是否有操作过上传纸样文件 1是0否
   */
  doUpdatePatternFile?: string;
  /**
   * 唛架图{多张以英文逗号分隔}
   */
  markFramePicture?: string;
}

export interface ISampleAuditRepairReqRepairInfo {
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
  repairType: '1' | '2' | '3';
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
  repairNum: string;
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

export interface ISampleAuditRepairReqCategoryTagsItem {
  /**
   * 标签编码
   */
  clothTagCode?: string;
  /**
   * 标签名称
   */
  clothTagName?: string;
  /**
   * 标签值编码
   */
  tagCode?: string;
  /**
   * 标签值名称
   */
  tagName?: string;
}

/**
 * 根据版单id-获取开发尺寸表标签页信息
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2639
 */
export interface IPatternSizeReq {
  /**
   * 版单id
   */
  clothesId: string;
}

export interface IPatternSizeRes {
  /**
   * 尺寸表id
   */
  patternSizeId?: string;
  /**
   * 纸样主表id
   */
  patternId?: string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 引用设计款号
   */
  modelDesignCode?: string;
  /**
   * 引用尺寸模板字段
   */
  modelSizeTemplateCode?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 样衣尺寸
   */
  sampleClothesSize?: string;
  /**
   * 纸样尺寸
   */
  patternSize?: string;
  /**
   * 尺码标准
   */
  sizeStandard?: string;
  /**
   * 样衣尺码
   */
  sampleSize?: string;
  /**
   * 尺寸表信息
   */
  sizeTable?: IPatternSizeResSizeTableItem[];
  /**
   * 尺寸版本
   */
  sizeVersion?: string;
  /**
   * 设计师id
   */
  designerId?: string;
  /**
   * 设计师名字
   */
  designerName?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: string;
  /**
   * 纸样师名字
   */
  patternMakerName?: string;
  /**
   * 创建人名字
   */
  creatorName?: string;
  /**
   * 更新人名字
   */
  reviserName?: string;
  /**
   * 纸样状态
   */
  patternState?: string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode?: string;
}

export interface IPatternSizeResSizeTableItem {
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
   * 客户尺寸
   */
  size?: string;
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
}
