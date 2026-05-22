// 推款生产资料 获取尺寸列表
import { ALLOCATE_STATE_ENUM, STYLE_INFO_IS_ALLOCATED_ENUM } from '../constant';
import { IFile } from '@/components/upload/package/type';
import { YES_NO_ENUM } from '@/constant';
import {
  ISewRequireSewingRequireListItemSewProcessListItem
} from '@/modules/clothes-center/components/sew-require-card/api/types';

export interface IProductionDataStyleInfoSizeItem {
  /** 数据类型 */
  type?: string;
  /**
   * 主键
   */
  styleSizeDetailId?: string;
  /**
   * 款式主表id
   */
  styleInfoId: string;
  /**
   * 部位
   */
  position: string;
  /**
   * 尺寸维度 1-X1、2-X2
   */
  sizeDimension: string;
  /**
   * 量法
   */
  measureWay: string;
  /**
   * 样衣尺寸
   */
  sampleSize: string;
  /**
   * 样衣尺寸基码
   */
  sampleBaseYardage: string;
  /**
   * 纸样尺寸
   */
  designSize: string;
  /**
   * 纸样尺寸基码
   */
  designBaseYardage: string;
  /**
   * 跳码系数
   */
  skipSizeQuotietyList: IProductionDataStyleInfoSizeSkipSizeQuotietyListItem[];
  /**
   * 尺寸数据
   */
  sizeList: IProductionDataStyleInfoSizeSizeListItem[];
  /**
   * 允差范围 CM
   */
  deviationRange: string;
  reviserId?: string;
  revisedTime?: string;
  isDeleted?: string;
  creatorId?: string;
  createdTime?: string;
}

export interface IProductionDataStyleInfoSizeSkipSizeQuotietyListItem {
  /**
   * 尺码
   */
  size?: string;
  /**
   * 尺寸
   */
  data: string;
}

export interface IProductionDataStyleInfoSizeSizeListItem {
  /**
   * 尺码
   */
  size?: string;
  /**
   * 尺寸
   */
  data: string;
}

export interface MeasurementItem {
  clothesPartsMeasurementId: string;
  measuringMethod: string;
  partsSizeCode: string;
}

export interface IClothesPartsSizeListItem {
  id: string;
  /**
   * 部位名称
   */
  clothesPartsName: string;
  /**
   * 尺寸部位编码
   */
  partsSizeCode: string;
  /**
   * 尺寸维度   1|X1、2|X2
   */
  sizeDimensions: string;
  /**
   * 允差范（cm）
   */
  errorRange: string;
  /**
   * 标签状态是否启用 0 否 1是-看需要冗余添加
   */
  isEnabled: string;
  /**
   * 标签状态是否启用 0 否 1是-看需要冗余添加
   */
  isEnabledName: string;
  /* 量法数据 */
  partsMeasurementVOList: MeasurementItem[];
}

// 跳码规则，不分页,

export interface ISizeHoppingRulesListLogListItem {
  id: string;
  /**
   * 业务ID
   */
  buzId: string;
  /**
   * 操作说明
   */
  content: string;
  /**
   * 业务类型 CLOTHES_PARTS-尺寸部位、CLOTHES_SIZE_HOPPING_RULES-尺码跳码规则、EXTERNAL_FEE-外发版费倍率、EXTERNAL_TIME_PRICE-外发工时价格
   */
  buzType: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 逻辑删除 0 否 1是
   */
  isDeleted: string;
  /**
   * 创建人名称
   */
  creatorName: string;
}

export interface ISizeHoppingRulesListReq {
  /**
   * 尺码跳码规则状态是否启用 0 否 1是
   */
  enabled?: string;
  /**
   * 尺码标准 international_size_code|国际码 ,eus_size_code|欧美码 ,us_size_code|美国码 ,chinese_size_code|中国码
   */
  standardSizeCode?: string;
}

export interface ISizeHoppingRuleItem {
  id: string;
  /**
   * 尺码标准 international_size_code|国际码 ,eus_size_code|欧美码 ,us_size_code|美国码 ,chinese_size_code|中国码
   */
  standardSizeName: string;
  standardSizeCode: string;
  /**
   * 跳码规则
   *
   * 使用 ',' 作为多条数据的分割，开始和结束使用 '-' 分割
   */
  hoppingRules: string;
  /**
   * 标签状态是否启用 0 否 1是-看需要冗余添加
   */
  isEnabled: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 更新人id
   */
  reviserId: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 更新时间
   */
  revisedTime: string;
  /**
   * 逻辑删除 0 否 1是
   */
  isDeleted: string;
  /**
   * 标签的操作日志信息
   */
  logList: ISizeHoppingRulesListLogListItem[];
  /**
   * 最新的一条日志
   */
  logStrFirst: string;
}
export type ISizeHoppingRulesListRes = ISizeHoppingRuleItem[];

export interface IPatternClothesQueryLastBySpuResCustomerSizeListItem {
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
   * 客户尺寸
   */
  size: string;
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
}

/**
 * 生产资料列表
 * yapi地址：https://yapi.tiangong.site/project/37/interface/api/2788
 */
export interface IStyleInfoPageReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 款式号SPU
   */
  styleCodeLike?: string;
  /**
   * 状态：1-待录入 2-录入中 3-已提交
   */
  state?: string;
  /**
   * 所属区域
   */
  regionId?: string;
  /**
   * 款式品类 code1-code2-code3
   */
  styleTypeLike?: string;
  styleTypeNames?: string[];
  /**
   * styleInfo版本号
   */
  styleCodeVersionLike?: string;
  /**
   * 创建日期开始。如2021-08-05 00:00:00
   */
  createStart?: string;
  /**
   * 创建日期结束。如2021-08-05 23:59:59
   */
  createEnd?: string;
  /**
   * 提交日期开始。如2021-08-05 00:00:00
   */
  submitStart?: string;
  /**
   * 提交日期结束。如2021-08-05 23:59:59
   */
  submitEnd?: string;
  /**
   * 操作人ID
   */
  operatorId?: string;
  /**
   * 我的true:我的。 false或null:全部
   */
  personal?: boolean;
  /**
   * 我的订单(个人id)
   * 注意 : 此参数前端不传,由后台处理
   */
  personalId?: string;
  /**
   * 款式类别: 0-平台; 1-大客户
   */
  styleCategory?: string;
  /**
   * 纸样更新状态, 0-未更新; 1-已更新
   */
  patternUpdateState?: string;
  /**
   * 是否外发 1：外发 0：内部
   */
  isOutsourced?: string;
  /**
   * 是否已分单(1:是,0:不是)
   */
  isAllocated?: STYLE_INFO_IS_ALLOCATED_ENUM;
  /**
   * 分单员id
   */
  allocateeIdList?: string[];
  /**
   * 纸样分单id(外部分单,内部分单)
   */
  roomIdList?: string[];
  /**
   * 是否接单(1.是,0否)
   */
  styleInfoReceiving?: string;
  /**
   * 分单状态。（0:未流转 1:内部 2:外部）
   */
  allocateState?: ALLOCATE_STATE_ENUM;
  /**
   * 大货技术员id
   */
  proderId?: string;
  /**
   * 大货技术员名称
   */
  proderName?: string;
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

export interface IStyleInfoPageRes {
  page?: number;
  total?: number;
  list: IStyleInfoPageResListItem[];
}

export interface IStyleInfoPageResListItem {
  /**
   * 主键
   */
  styleInfoId: string;
  /**
   * 款式号SPU
   */
  styleCode?: string;
  /**
   * SPU资料版本号 (SZ+【SPU规则中的数字】+1位版本号。 如SZ2107130001-1)
   */
  styleCodeVersion?: string;
  /**
   * 版本号
   */
  styleInfoVersion?: string;
  /**
   * 是否最新0-否、1-是
   */
  isLatest?: string;
  /**
   * 核算分单状态。（0:未流转 1:待分单 2:已分单）
   */
  allocateState?: ALLOCATE_STATE_ENUM;
  /**
   * 板房id(1:内部,其他外部板房id)
   */
  roomId?: string;
  /**
   * 板房名字
   */
  roomName?: string;
  /**
   * 分单员id
   */
  allocateeId?: string;
  /**
   * 分单员名字
   */
  allocateeName?: string;
  /**
   * 是否取消 0-否、1-是
   */
  isCancel?: YES_NO_ENUM;
  /**
   * 是否外发(1:是,0:不是)
   */
  isOutsourced?: string;
  /**
   * 是否已分单(1:是,0:不是)
   */
  isAllocated?: STYLE_INFO_IS_ALLOCATED_ENUM;
  /**
   * 接单状态(0:未接单,1:已接单)
   */
  styleInfoReceiving?: string;
  /**
   * 区域id
   */
  regionId?: string;
  /**
   * 区域名
   */
  regionName?: string;
  /**
   * 客户图片{多张以英文逗号分隔}
   */
  customerPicture?: string;
  /**
   * 款式品类code。如01-1003  (取值OPS，字段编码：pims_category)
   */
  styleType?: string;
  /**
   * 款式品类名称。如女装-套装-连衣裙
   */
  styleTypeName?: string;
  /**
   * 大货技术员id
   */
  proderId?: string;
  /**
   * 大货技术员名称
   */
  proderName?: string;
  /**
   * 尺码类型【码数范围】。如chinese_size_code
   */
  clothingSizeType?: string;
  /**
   * 尺码类型名称【码数范围】。如国际
   */
  clothingSizeTypeName?: string;
  /**
   * 状态： 1-待录入 2-录入中 3-已提交
   */
  state?: string;
  /**
   * 提交时间
   */
  submitTime?: number;
  /**
   * 首次创建时间
   */
  firstCreatedTime?: number;
  /**
   * 首次提交时间
   */
  firstFinishTime?: number;
  /**
   * 纸样更新状态, 0-未更新; 1-已更新
   */
  patternUpdateState?: string;
  /**
   * 其它要求
   */
  remark?: string;
  /**
   * 创建人姓名
   */
  creatorName?: string;
  /**
   * 修改人姓名
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
   * 款式类别: 0-平台; 1-大客户
   */
  styleCategory?: string;
  /**
   * 推荐体重范围(json)
   */
  recommendWeightJson?: string;
  /**
   * 款式号型(json)
   */
  sizeCategoryJson?: string;
  /**
   * 工艺指导书(json)
   */
  craftBookJson?: string;
  /**
   * 分单开始时间
   */
  seperateStartTime?: number;
  /**
   * 分单完成时间
   */
  seperateFinishTime?: number;
  /**
     * 首次分单时间
     */
  firstSeperateFinishTime?: number;
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
}

/**
 * 大货资料分单
 * yapi地址：https://yapi.tiangong.site/project/37/interface/api/2789
 */
export interface IStyleInfoSplittingReq {
  styleInfoIds: string[];
  /**
   * 板房id(0未流转的,内部分单的话 id是1,其他id为外部板房的id)
   */
  roomId: string;
  /**
   * 板房名称
   */
  roomName?: string;
}

/**
 * 查询核算师或版房订单数量（分页）
 * yapi地址：https://yapi.tiangong.site/project/37/interface/api/2793
 */
export interface IStyleInfoMakerRoomReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 纸样分单状态。（1:内部大货资料 2:外发大货资料）
   */
  allocateState: string;
  /**
   * 纸样师或板房名字
   */
  makerOrRoom?: string;
  /**
   * 区域id
   */
  regionId?: string;
}

export interface IStyleInfoMakerRoomRes {
  page?: number;
  total?: number;
  list: IStyleInfoMakerRoomResListItem[];
}

export interface IStyleInfoMakerRoomResListItem {
  /**
   * 大货资料师id或版房id
   */
  makerOrRoomId?: string;
  /**
   * 大货资料师名称或版房名称
   */
  makerOrRoomName?: string;
  /**
   * 订单数
   */
  orderCount?: string;
}

/**
 * 款式提交
 * yapi地址：https://yapi.tiangong.site/project/37/interface/api/2792
 */
export interface IStyleInfoSubmitReq {
  /**
   * 内部styleInfoId
   */
  styleInfoId: string;
  /**
   * 款式号SPU
   */
  styleCode: string;
  /**
   * 大货纸样/大货唛架
   */
  styleAttachmentReqs: IStyleInfoSubmitReqStyleAttachmentReqsItem[];
  /**
   * 大货尺寸表
   */
  styleDetailSizeReq?: IStyleInfoSubmitReqStyleDetailSizeReq;
  /**
   * 款式号型
   */
  sizeCategoryReq?: IStyleInfoSubmitReqSizeCategoryReq;
  /**
   * 工艺指导书
   */
  craftBookReq?: IStyleInfoSubmitReqCraftBookReq;
  /**
   * 是否要推送外发 0:否 1：是
   */
  syncExt?: string;
}

export interface IStyleInfoSubmitReqCraftBookReq {
  /**
   * 工序款式库ID
   */
  processStyleTemplateId?: string;
  /**
   * 工序款式名称
   */
  styleName?: string;
  /**
   * 工序部件库ID
   */
  sewingComponentTemplateId?: string;
  /**
   * 工序部件名称
   */
  componentName?: string;
  /**
   * 裁剪要求
   */
  cutDemand: string;
  /**
   * 车缝要求
   */
  sewDemands: IStyleInfoSubmitReqCraftBookReqSewDemandsItem[];
  /**
   * 尾部要求
   */
  tailDemand: string;
}

export interface IStyleInfoSubmitReqCraftBookReqSewDemandsItem {
  /**
   * 工序部件
   */
  componentName?: string;
  /**
   * 车缝详情
   */
  processStyleSewingDetail: IStyleInfoSubmitReqCraftBookReqSewDemandsItemProcessStyleSewingDetailItem[];
}

export interface IStyleInfoSubmitReqCraftBookReqSewDemandsItemProcessStyleSewingDetailItem {
  /**
   * 工序部件库-工序id
   */
  sewingComponentTemplateId?: string;
  /**
   * 工序款式库-车缝工序id
   */
  sewingProcessId?: string;
  /**
   * 车缝工序部件名称
   * isNullAble:0
   */
  componentName: string;
  /**
   * 图片
   * isNullAble:1
   */
  picture?: string;
  /**
   * 车种编码
   * isNullAble:0
   */
  plmSewingType?: string;
  /**
   * 车种名称
   * isNullAble:1
   */
  plmSewingName?: string;
  /**
   * 工序名称
   * isNullAble:0
   */
  processName?: string;
  /**
   * 工序要求
   */
  processDescribe?: string;
  /**
   * 款式库引用时独有的字段，对应引用时候的的sewingProcessId
   */
  referenceSewingProcessId?: string;
  /**
   * 版型结构分解
   */
  structural: string;
  /**
   * 车缝工艺要求
   */
  sewingRequires: IStyleInfoSubmitReqCraftBookReqSewDemandsItemProcessStyleSewingDetailItemSewingRequiresItem[];
}

export interface IStyleInfoSubmitReqCraftBookReqSewDemandsItemProcessStyleSewingDetailItemSewingRequiresItem {
  /**
   * 车缝工艺要求描述
   */
  desc: string;
}

export interface IStyleInfoSubmitReqStyleDetailSizeReq {
  /**
   * 款式主表id
   */
  styleInfoId: string;
  /**
   * 尺码类型。如chinese_size_code
   */
  clothingSizeType: string;
  /**
   * 尺码类型名称。如中国码
   */
  clothingSizeTypeName: string;
  /**
   * 推荐体重范围(json)
   */
  recommendWeightJson?: string;
  /**
   * 尺寸列表
   */
  list: IStyleInfoSubmitReqStyleDetailSizeReqListItem[];
}

export interface IStyleInfoSubmitReqStyleDetailSizeReqListItem {
  /**
   * 主键
   */
  styleSizeDetailId?: string;
  /**
   * 部位
   */
  position: string;
  /**
   * 尺寸维度 1-X1、2-X2
   */
  sizeDimension: string;
  /**
   * 量法
   */
  measureWay: string;
  /**
   * 样衣尺寸
   */
  sampleSize: string;
  /**
   * 样衣尺寸基码
   */
  sampleBaseYardage: string;
  /**
   * 纸样尺寸
   */
  designSize: string;
  /**
   * 纸样尺寸基码
   */
  designBaseYardage: string;
  /**
   * 跳码系数
   */
  skipSizeQuotietyList: IStyleInfoSubmitReqStyleDetailSizeReqListItemSkipSizeQuotietyListItem[];
  /**
   * 尺寸数据
   */
  sizeList: IStyleInfoSubmitReqStyleDetailSizeReqListItemSizeListItem[];
  /**
   * 允差范围
   */
  deviationRange: string;
}

export interface IStyleInfoSubmitReqStyleDetailSizeReqListItemSizeListItem {
  /**
   * 尺码
   */
  size: string;
  /**
   * 尺寸
   */
  data: string;
}

export interface IStyleInfoSubmitReqStyleDetailSizeReqListItemSkipSizeQuotietyListItem {
  /**
   * 尺码
   */
  size: string;
  /**
   * 尺寸
   */
  data: string;
}

export interface IStyleInfoSubmitReqSizeCategoryReq {
  /**
   * 尺码品类表id
   */
  sizeCategoryId?: string;
  sizeNumInfoList: IStyleInfoSubmitReqSizeCategoryReqSizeNumInfoListItem[];
  /**
   * 尺码标准名称 (如:天工尺码标准)
   */
  sizeStandard: string;
  /**
   * 尺码标准编号 (如:tiangong_code_standard)
   */
  sizeStandardCode: string;
}

export interface IStyleInfoSubmitReqSizeCategoryReqSizeNumInfoListItem {
  /**
   * 品类尺码号型关联表id
   */
  sizeCategoryNumId?: string;
  /**
   * 尺码品类表id
   */
  sizeCategoryId?: string;
  /**
   * 尺码名称 (如:XS)
   */
  sampleSize?: string;
  /**
   * 号型编码
   */
  sizeTypeCode?: string;
  /**
   * 号型名称
   */
  sizeTypeName?: string;
}

export interface IStyleInfoSubmitReqStyleAttachmentReqsItem {
  /**
   * 款式id
   */
  styleInfoId: string;
  /**
   * 附件类型（1-工艺单,2-尺寸表,3-纸样文件,4-唛架文件,5-下单凭证）
   */
  attachmentType: '1' | '2' | '3' | '4' | '5';
  /**
   * 附件路径
   */
  attachmentUrl: string;
  /**
   * 附件名称（加后缀）
   */
  attachmentName: string;
}

export interface IStyleInfoDetailRes {
  /**
   * 主键
   */
  styleInfoId: string;
  /**
   * 版本号
   */
  styleInfoVersion?: string;
  /**
   * 是否最新0-否、1-是
   */
  isLatest?: string;
  /**
   * 款式号SPU
   */
  styleCode: string;
  /**
   * SPU版本号 (SZ+【SPU规则中的数字】+1位版本号。 如SZ2107130001-1)
   */
  styleCodeVersion?: string;
  /**
   * 核算分单状态。（0:未流转 1:待分单 2:已分单）
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
  /**
   * 分单员id
   */
  allocateeId?: string;
  /**
   * 分单员名字
   */
  allocateeName?: string;
  /**
   * 是否外发(1:是,0:不是)
   */
  isOutsourced?: string;
  /**
   * 是否已分单(1:是,0:不是)
   */
  isAllocated?: string;
  /**
   * 接单状态(0:未接单,1:已接单)
   */
  styleInfoReceiving?: string;
  /**
   * 区域id【所属区域】
   */
  regionId?: string;
  /**
   * 区域名称
   */
  regionName?: string;
  /**
   * 客户图片{多张以英文逗号分隔}
   */
  customerPicture?: string;
  /**
   * 状态： 1-待录入 2-录入中 3-已提交
   */
  state?: string;
  /**
   * 款式品类code。如01-1003  (取值OPS，字段编码：pims_category)
   */
  styleType?: string;
  /**
   * 款式品类名称。如女装-套装-连衣裙
   */
  styleTypeName?: string;
  /**
   * 尺码类型【码数范围】。如chinese_size_code
   */
  clothingSizeType?: string;
  /**
   * 尺码类型名称【码数范围】。如国际
   */
  clothingSizeTypeName?: string;
  /**
   * 款式号型(json)
   */
  sizeCategoryJson?: string;
  /**
   * 工艺指导书(json)
   */
  craftBookJson?: string;
  /**
   * 推荐体重范围(json)
   */
  recommendWeightJson?: string;
  /**
   * 纸样更新状态, 0-未更新; 1-已更新
   */
  patternUpdateState?: string;
  /**
   * 分单开始时间
   */
  seperateStartTime?: number;
  /**
   * 分单完成时间
   */
  seperateFinishTime?: number;
  /**
   * 提交时间
   */
  submitTime?: number;
  /**
   * 其它要求
   */
  remark?: string;
  /**
   * 大货技术员id
   */
  proderId?: string;
  /**
   * 大货技术员名称
   */
  proderName?: string;
  /**
   * 大货纸样/大货唛架
   */
  styleAttachments: IStyleInfoDetailResStyleAttachmentsItem[];
  /**
   * 大货尺寸表
   */
  styleSizeDetailVos: IStyleInfoDetailResStyleSizeDetailVosItem[];
  /**
   * 款式号型
   */
  sizeCategory?: IStyleInfoDetailResSizeCategory;
  /**
   * 工艺指导书
   */
  craftBook?: IStyleInfoDetailResCraftBook;
  /**
   * 款式来源：1-致景PLM 2-JV PLM 3-JV SDP
   * 参考BizChannelEnum
   */
  bizChannel?: string;
  /**
   * SPU基本信息
   */
  spuInfoVo?: {
    /**
     * 成衣SPU(款式SPU)
     */
    styleCode?: string;
    /**
     * 设计图-首图
     */
    designPicture?: string;
    /**
     * 设计图
     */
    designPictureList: string[];
    /**
     * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
     */
    category?: string;
    /**
     * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
     */
    categoryName?: string;
    /**
     * 设计师id【设计师】(对应SPU为创建人)
     */
    designerId?: string;
    /**
     * 设计师编号【设计师】(对应SPU为创建人)
     */
    designerCode?: string;
    /**
     * 设计师名称【设计师】(对应SPU为创建人)
     */
    designerName?: string;
    /**
     * (对应SPU为创建人)
     */
    creatorName?: string;
    /**
     * 波段编码
     */
    waveBandCode?: string;
    /**
     * 波段名称
     */
    waveBandName?: string;
    /**
     * 织造方式code
     */
    weaveModeCode?: string;
    /**
     * 织造方式
     */
    weaveMode?: string;
    /**
     * 建议售价
     */
    suggestedSellingPrice?: string;
    /**
     * 供给方式-OPS
     */
    supplyModeName?: string;
    /**
     * 供给方式编码
     */
    supplyModeCode?: string;
  };
  /**
   * 是否取消 0-否、1-是
   */
  isCancel?: string;
}

export interface IStyleInfoDetailResCraftBook {
  /**
   * 裁剪要求
   */
  cutDemand?: string;
  /**
   * 车缝要求
   */
  sewDemands: IStyleInfoDetailResCraftBookSewDemandsItem[];
  /**
   * 尾部要求
   */
  tailDemand?: string;
}

export interface IStyleInfoDetailResCraftBookSewDemandsItem {
  /**
   * 工序部件
   */
  componentName?: string;
  /**
   * 车缝详情
   */
  processStyleSewingDetail: IStyleInfoDetailResCraftBookSewDemandsItemProcessStyleSewingDetailItem[];
}

export interface IStyleInfoDetailResCraftBookSewDemandsItemProcessStyleSewingDetailItem {
  /**
   * 工序部件库-工序id
   */
  sewingComponentTemplateId?: string;
  /**
   * 工序款式库-车缝工序id
   */
  sewingProcessId?: string;
  /**
   * 车缝工序部件名称
   * isNullAble:0
   */
  componentName: string;
  /**
   * 图片
   * isNullAble:1
   */
  picture?: string;
  /**
   * 车种编码
   * isNullAble:0
   */
  plmSewingType?: string;
  /**
   * 车种名称
   * isNullAble:1
   */
  plmSewingName?: string;
  /**
   * 工序名称
   * isNullAble:0
   */
  processName?: string;
  /**
   * 工序要求
   */
  processDescribe?: string;
  /**
   * 款式库引用时独有的字段，对应引用时候的的sewingProcessId
   */
  referenceSewingProcessId?: string;
  /**
   * 版型结构分解
   */
  structural: string;
  /**
   * 车缝工艺要求
   */
  sewingRequires: IStyleInfoDetailResCraftBookSewDemandsItemProcessStyleSewingDetailItemSewingRequiresItem[];
}

export interface IStyleInfoDetailResCraftBookSewDemandsItemProcessStyleSewingDetailItemSewingRequiresItem {
  /**
   * 车缝工艺要求描述
   */
  desc: string;
}

export interface IStyleInfoDetailResSizeCategory {
  /**
   * 尺码品类表id
   */
  sizeCategoryId?: string;
  sizeNumInfoList: IStyleInfoDetailResSizeCategorySizeNumInfoListItem[];
  /**
   * 尺码标准名称 (如:天工尺码标准)
   */
  sizeStandard?: string;
  /**
   * 尺码标准编号 (如:tiangong_code_standard)
   */
  sizeStandardCode?: string;
}

export interface IStyleInfoDetailResSizeCategorySizeNumInfoListItem {
  /**
   * 品类尺码号型关联表id
   */
  sizeCategoryNumId?: string;
  /**
   * 尺码品类表id
   */
  sizeCategoryId?: string;
  /**
   * 尺码名称 (如:XS)
   */
  sampleSize?: string;
  /**
   * 号型编码
   */
  sizeTypeCode?: string;
  /**
   * 号型名称
   */
  sizeTypeName?: string;
}

export interface IStyleInfoDetailResStyleSizeDetailVosItem {
  /**
   * 主键
   */
  styleSizeDetailId: string;
  /**
   * 款式主表id
   */
  styleInfoId: string;
  /**
   * 部位
   */
  position: string;
  /**
   * 尺寸维度 1-X1、2-X2
   */
  sizeDimension: string;
  /**
   * 量法
   */
  measureWay: string;
  /**
   * 样衣尺寸
   */
  sampleSize: string;
  /**
   * 样衣尺寸基码
   */
  sampleBaseYardage: string;
  /**
   * 纸样尺寸
   */
  designSize: string;
  /**
   * 纸样尺寸基码
   */
  designBaseYardage: string;
  /**
   * 跳码系数
   */
  skipSizeQuotietyList: IStyleInfoDetailResStyleSizeDetailVosItemSkipSizeQuotietyListItem[];
  /**
   * 尺寸数据
   */
  sizeList: IStyleInfoDetailResStyleSizeDetailVosItemSizeListItem[];
  /**
   * 允差范围 CM
   */
  deviationRange: string;
}

export interface IStyleInfoDetailResStyleSizeDetailVosItemSizeListItem {
  /**
   * 尺码
   */
  size: string;
  /**
   * 尺寸
   */
  data: string;
}

export interface IStyleInfoDetailResStyleSizeDetailVosItemSkipSizeQuotietyListItem {
  /**
   * 尺码
   */
  size: string;
  /**
   * 尺寸
   */
  data: string;
}

export interface IStyleInfoDetailResStyleAttachmentsItem {
  /**
   * 主键
   */
  attachmentId?: string;
  /**
   * 款式主表id
   */
  styleInfoId?: string;
  /**
   * 附件类型（1-工艺单,2-尺寸表,3-纸样文件,4-唛架文件,5-下单凭证）
   */
  attachmentType?: string;
  /**
   * 附件路径
   */
  attachmentUrl: string;
  /**
   * 附件名称（加后缀）
   */
  attachmentName?: string;
  /**
   * 创建人id
   */
  creatorId?: string;
  /**
   * 创建时间
   */
  createdTime?: number;
}

/**
 * 统计核算各个状态的数量
 * yapi地址：https://yapi.tiangong.site/project/48/interface/api/2902
 */

export interface IStyleInfoStatisticsRes {
  /**
   * 已分单
   */
  allocatedCount?: string;
  /**
   * 未分单
   */
  unallocatedCount?: string;
  /**
   * 内部未提交
   */
  internalUnSubCount?: string;
  /**
   * 内部已提交
   */
  internalSubCount?: string;
  /**
   * 外部未提交
   */
  externalUnSubCount?: string;
  /**
   * 外部已提交
   */
  externalSubCount?: string;
  /**
   * 外部未接单
   */
  externalUnReceivingCount?: string;
}

/**
 * 查询所有(无分页)
 * yapi地址：https://yapi.tiangong.site/project/43/interface/api/2904
 */
export interface ISizeCategoryListReq {
  /**
   * 前三级品类编码集合 (不传查全部)
   */
  categoryCodeList: string[];
}

export type ISizeCategoryListRes = ISizeCategoryListResItem[];
export interface ISizeCategoryListResItem {
  /**
   * 尺码品类表id
   */
  sizeCategoryId?: string;
  /**
   * 前三级品类编码
   */
  categoryCode?: string;
  /**
   * 前三级品类名称
   */
  categoryName?: string;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 修改人名称
   */
  reviserName?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 更新时间
   */
  revisedTime?: number;
  /**
   * 创建时间
   */
  createdTime?: number;
}

/**
 * 查询列表（分页）
 * yapi地址：https://yapi.tiangong.site/project/43/interface/api/2903
 */
export interface ISizeCategoryPageReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 前三级品类编码集合
   */
  categoryCodeList: string[];
}

export interface ISizeCategoryPageRes {
  page?: number;
  total?: number;
  list: ISizeCategoryPageResListItem[];
}

export interface ISizeCategoryPageResListItem {
  /**
   * 尺码品类表id
   */
  sizeCategoryId?: string;
  /**
   * 前三级品类编码
   */
  categoryCode?: string;
  /**
   * 前三级品类名称
   */
  categoryName?: string;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 修改人名称
   */
  reviserName?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 更新时间
   */
  revisedTime?: number;
  /**
   * 创建时间
   */
  createdTime?: number;
  /**
   * 尺码标准信息集合
   */
  sizeStandardInfoList: ISizeCategoryPageResListItemSizeStandardInfoListItem[];
}

export interface ISizeCategoryPageResListItemSizeStandardInfoListItem {
  /**
   * 尺码品类表id
   */
  sizeCategoryId?: string;
  /**
   * 尺码标准名称 (如:天工尺码标准)
   */
  sizeStandard?: string;
  /**
   * 尺码标准编号 (如:tiangong_code_standard)
   */
  sizeStandardCode?: string;
  /**
   * 尺码-号型信息集合
   */
  sizeNumInfoList: ISizeCategoryPageResListItemSizeStandardInfoListItemSizeNumInfoListItem[];
}

export interface ISizeCategoryPageResListItemSizeStandardInfoListItemSizeNumInfoListItem {
  /**
   * 品类尺码号型关联表id
   */
  sizeCategoryNumId?: string;
  /**
   * 尺码品类表id
   */
  sizeCategoryId?: string;
  /**
   * 尺码标准名称 (如:天工尺码标准)
   */
  sizeStandard?: string;
  /**
   * 尺码标准编号 (如:tiangong_code_standard)
   */
  sizeStandardCode?: string;
  /**
   * 尺码名称 (如:XS)
   */
  sampleSize?: string;
  /**
   * 号型编码
   */
  sizeTypeCode?: string;
  /**
   * 号型名称
   */
  sizeTypeName?: string;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 修改人名称
   */
  reviserName?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 更新时间
   */
  revisedTime?: number;
  /**
   * 创建时间
   */
  createdTime?: number;
}

/**
 * 添加备注
 * yapi地址：https://yapi.tiangong.site/project/48/interface/api/3100
 */
export interface IOrderInfoRemarkAddReq {
  /**
   * 业务id
   */
  bizId: string;
  /**
   * 业务类型
   */
  bizType: '1' | '2' | '3' | '4' | '5' | '6';
  /**
   * 备注信息
   */
  remark: string;
}

/**
 * 查询生产资料日志
 * yapi地址：https://yapi.tiangong.site/project/48/interface/api/3103
 */
export interface IOrderInfoLogProdLogsReq {
  bizId: string;
}

export type IOrderInfoLogProdLogsRes = IOrderInfoLogProdLogsResItem[];
export interface IOrderInfoLogProdLogsResItem {
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
}
/**
 * 根据设计款号styleCode（SPU）查询审版工艺单详情
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2990
 */
export interface IAuditCraftOrderDetailByStyleCodeReq {
  styleCode: string;
}

export interface IAuditCraftOrderDetailByStyleCodeRes {
  isDeleted?: string;
  creatorId?: string;
  createdTime?: number;
  reviserId?: string;
  revisedTime?: number;
  /**
   * 审版工艺单明细ID
   */
  auditCraftOrderDetailId?: string;
  /**
   * 审版工艺单ID
   */
  auditCraftOrderId?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 设计图片{多张以英文逗号分隔}
   */
  designPicture?: string;
  /**
   * 尺码标准
   */
  sizeStandard?: string;
  /**
   * 尺码标准编号
   */
  sizeStandardCode?: string;
  /**
   * 审版工艺单状态(1-已提交、0-待提交)
   */
  state?: string;
  /**
   * 审版工艺单状态描述
   */
  stateDesc?: string;
  /**
   * 版本号,默认1
   */
  versionNum?: string;
  /**
   * 最新提交的明细ID
   */
  latestDetailId?: string;
  /**
   * 审版工艺单提交版本
   */
  submitVersion?: string;
  /**
   * 审版工艺师id
   */
  reviewCraftsmanId?: string;
  /**
   * 审版工艺师名称
   */
  reviewCraftsmanName?: string;
  /**
   * 打版参考尺寸表
   */
  referSize?: IAuditCraftOrderDetailByStyleCodeResReferSize;
  /**
   * 裁剪要求
   */
  cuttingRequire?: string;
  /**
   * 车缝要求
   */
  sewRequire?: IAuditCraftOrderDetailByStyleCodeResSewRequireItem[];
  /**
   * 尾部要求
   */
  tailRequire?: string;
}
export interface IAuditCraftOrderDetailByStyleCodeResSewRequireItem {
  /**
   * 工序款式库(模板)ID
   * 20250325迭代改用审版工艺模板记录车缝要求
   * 「已废弃」
   */
  processStyleTemplateId?: string;
  /**
   * 工序款式(模板)名称
   * 20250325迭代改用审版工艺模板记录车缝要求
   * 「已废弃」
   */
  styleName?: string;
  /**
   * 工序部件库(模板)ID
   * 20250325迭代改用审版工艺模板记录车缝要求
   * 「已废弃」
   */
  sewingComponentTemplateId?: string;
  /**
   * 工序部件名称
   */
  componentName: string;
  /**
   * 审版工艺部件ID
   */
  componentId?: string;
  /**
   * 工序款式模板-车缝工序id
   * 20250325迭代改用审版工艺模板记录车缝要求
   * 「已废弃」
   */
  sewingProcessId?: string;
  /**
   * 款式库引用时独有的字段，对应引用时候的sewingProcessId
   * 20250325迭代改用审版工艺模板记录车缝要求
   * 「已废弃」
   */
  referenceSewingProcessId?: string;
  /**
   * 工序名称
   * 20250325迭代改用审版工艺模板记录车缝要求
   * 「已废弃」
   */
  processName?: string;
  /**
   * 版型结构分解
   * 20250325迭代改用审版工艺模板记录车缝要求
   * 「已废弃」
   */
  structural?: string;
  /**
   * 车缝要求
   * 20250325迭代改用审版工艺模板记录车缝要求
   * 「已废弃」
   */
  processRequire?: string;
  /**
   * 图片路径
   * 20250325迭代改用审版工艺模板记录车缝要求
   * 「已废弃」
   */
  picture?: string;
  /**
   * 车种编码
   * 20250325迭代改用审版工艺模板记录车缝要求
   * 「已废弃」
   */
  sewingType?: string;
  /**
   * 车种名称
   * 20250325迭代改用审版工艺模板记录车缝要求
   * 「已废弃」
   */
  sewingTypeName?: string;
  minutelyPay?: string;
  /**
   * 版型结构分解
   */
  structurals: IAuditCraftOrderDetailByStyleCodeResSewRequireItemStructuralsItem[];
}

export interface IAuditCraftOrderDetailByStyleCodeResSewRequireItemStructuralsItem {
  /**
   * 版型结构分解描述
   */
  desc: string;
  /**
   * 车缝工艺要求
   */
  sewingRequires: IAuditCraftOrderDetailByStyleCodeResSewRequireItemStructuralsItemSewingRequiresItem[];
}

export interface IAuditCraftOrderDetailByStyleCodeResSewRequireItemStructuralsItemSewingRequiresItem {
  /**
   * 车缝工艺要求描述
   */
  desc: string;
}

export interface IAuditCraftOrderDetailByStyleCodeResSewRequire {
  /**
   * 引用款式模板编码
   */
  referStyleTemplateCode?: string;
  /**
   * 引用款式模板名称
   */
  referStyleTemplateName?: string;
  /**
   * 引用部件模板编码
   */
  referComponentTemplateCode?: string;
  /**
   * 引用部件模板名称
   */
  referComponentTemplateName?: string;
  /**
   * 部位车缝要求
   */
  sewingRequireList: IAuditCraftOrderDetailByStyleCodeResSewRequireSewingRequireListItem[];
}

export interface IAuditCraftOrderDetailByStyleCodeResSewRequireSewingRequireListItem {
  /**
   * 部件名称
   */
  componentName: string;
  /**
   * 部位工序车缝要求
   */
  sewProcessList: IAuditCraftOrderDetailByStyleCodeResSewRequireSewingRequireListItemSewProcessListItem[];
}

export interface IAuditCraftOrderDetailByStyleCodeResSewRequireSewingRequireListItemSewProcessListItem {
  /**
   * 工序名称
   */
  processName: string;
  picture?: string;
  /**
   * 车种编码
   */
  sewingType?: string;
  /**
   * 车种名称
   */
  sewingTypeName?: string;
  /**
   * 工序车缝要求
   */
  processRequire: string;
}

export interface IAuditCraftOrderDetailByStyleCodeResReferSize {
  /**
   * 版房品类(版房品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  roomCategory: string;
  /**
   * 版房品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  roomCategoryName?: string;
  /**
   * 纸样尺寸
   */
  patternSize: string;
  /**
   * 引用尺寸表模板
   */
  referSizeTemplate?: string;
  /**
   * 尺寸表
   */
  sizeTable: IAuditCraftOrderDetailByStyleCodeResReferSizeSizeTableItem[];
}

export interface IAuditCraftOrderDetailByStyleCodeResReferSizeSizeTableItem {
  /**
   * 部位编码
   */
  positionCode?: string;
  /**
   * 部位名
   */
  position?: string;
  /**
   * 尺寸维度
   */
  sizeDimensions?: string;
  /**
   * 量法
   */
  measureMethod?: string;
  /**
   * 纸样尺寸
   */
  patternSizes: IAuditCraftOrderDetailByStyleCodeResReferSizeSizeTableItemPatternSizesItem[];
  /**
   * 允许误差
   */
  errorRange?: string;
  /**
   * 备注
   */
  remark?: string;
}

export interface IAuditCraftOrderDetailByStyleCodeResReferSizeSizeTableItemPatternSizesItem {
  name?: string;
  value?: string;
}

// ⬇️ 获取号型给大货资料用请求体 接口：https://yapi.tiangong.site/project/43/interface/api/3140
export interface ISizeCategoryFindSizeCategoryReq {
  /**
   * 前三级品类编码
   */
  categoryCode: string;
  /**
   * 尺码标准编号集合
   */
  sizeStandardCodes: string[];
}
// ⬆️ 获取号型给大货资料用请求体

// ⬇️ 获取号型给大货资料用响应体 接口：https://yapi.tiangong.site/project/43/interface/api/3140
export interface ISizeCategoryFindSizeCategoryRes {
  /**
   * 尺码品类表id
   */
  sizeCategoryId: string;
  /**
   * 前三级品类编码
   */
  categoryCode: string;
  /**
   * 前三级品类名称
   */
  categoryName: string;
  /**
   * 创建人名称
   */
  creatorName: string;
  /**
   * 修改人名称
   */
  reviserName: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 更新时间
   */
  revisedTime: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 尺码标准信息集合
   */
  sizeStandardInfoList: ISizeCategoryFindSizeCategoryResSizeStandardInfoListItem[];
}
export interface ISizeCategoryFindSizeCategoryResSizeStandardInfoListItem {
  /**
   * 尺码品类表id
   */
  sizeCategoryId: string;
  /**
   * 尺码标准名称 (如:天工尺码标准)
   */
  sizeStandard: string;
  /**
   * 尺码标准编号 (如:tiangong_code_standard)
   */
  sizeStandardCode: string;
  /**
   * 尺码-号型信息集合
   */
  sizeNumInfoList: ISizeCategoryFindSizeCategoryResSizeNumInfoListItem[];
}
export interface ISizeCategoryFindSizeCategoryResSizeNumInfoListItem {
  /**
   * 品类尺码号型关联表id
   */
  sizeCategoryNumId: string;
  /**
   * 尺码品类表id
   */
  sizeCategoryId: string;
  /**
   * 尺码标准名称 (如:天工尺码标准)
   */
  sizeStandard: string;
  /**
   * 尺码标准编号 (如:tiangong_code_standard)
   */
  sizeStandardCode: string;
  /**
   * 尺码名称 (如:XS)
   */
  sampleSize: string;
  /**
   * 号型编码
   */
  sizeTypeCode: string;
  /**
   * 号型名称
   */
  sizeTypeName: string;
  /**
   * 创建人名称
   */
  creatorName: string;
  /**
   * 修改人名称
   */
  reviserName: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 更新时间
   */
  revisedTime: string;
  /**
   * 创建时间
   */
  createdTime: string;
}
// ⬆️ 获取号型给大货资料用响应体

/**
 * ⬇️ 根据ids查询车缝信息
 * yapi地址：https://yapi.tiangong.site/project/43/interface/api/3193
 */
export interface ISewingProcessListByIdsReq {
  /**
   * 款式id必传
   */
  sewingProcessIds: string[];
}

export type ISewingProcessListByIdsRes = ISewingProcessListByIdsResItem[];
export interface ISewingProcessListByIdsResItem {
  /**
   * 主键
   * 车缝工序ID
   * isNullAble:0
   */
  sewingProcessId?: string;
  /**
   * 车缝工序部件名称
   * isNullAble:0
   */
  componentName?: string;
  /**
   * 工序名称
   * isNullAble:0
   */
  processName?: string;
  /**
   * 车种编码
   * isNullAble:0
   */
  plmSewingType?: string;
  /**
   * 车种名称
   * isNullAble:0
   */
  plmSewingName?: string;
  /**
   * 图片
   * isNullAble:1
   */
  picture?: string;
  /**
   * 工序描述
   * isNullAble:0
   */
  processDescribe?: string;
  /**
   * 预计用时
   * isNullAble:0
   */
  estimatedTime?: string;
  /**
   * 备注
   * isNullAble:1
   */
  remark?: string;
  /**
   * 父级ID
   * isNullAble:0
   */
  parentId?: string;
  /**
   * 父级类型：0:sewing_component_template_id,1:process_style_template_id
   * isNullAble:1,defaultVal:0
   */
  parentType?: string;
}

// ⬆️ 根据ids查询车缝信息响应体

/**
 * ⬇️ 查询生产资料日志
 * yapi地址：https://yapi.tiangong.site/project/48/interface/api/3214
 */
export interface IOrderInfoLogProdLogsByCodeReq {
  bizCode: string;
}

export type IOrderInfoLogProdLogsByCodeRes = IOrderInfoLogProdLogsByCodeResItem[];
export interface IOrderInfoLogProdLogsByCodeResItem {
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
  bizType: '1' | '2' | '10' | '12' | '3' | '4' | '5' | '6' | '7';
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
}

// ⬆️ 查询生产资料日志响应体
