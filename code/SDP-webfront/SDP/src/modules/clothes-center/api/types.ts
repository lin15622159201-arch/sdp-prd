import {
  SIZE_TABLE_TYPE_ENUM, PROCESSNODE_ENUM, PROCESSSTEP_ENUM, REMARK_BIZ_TYPE_ENUMS,
  PROCESS_STEP_CODE_ENUM,
  PROCESS_NODE_CODE_ENUM
} from '@/modules/clothes-center/constant';
import { YES_NO_NUMBER_ENUM } from '@/constant';

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
  DETAIL = 'detail'
}

/**
 * 部位模版引用列表查询
 * yapi地址：https://yapi.tiangong.site/project/420/interface/api/51442
 */
export interface IPositionTemplateListWithEntryReq {
  /**
   * 当前查询的页码
   */
  pageNum?: number;
  /**
   * 当前查询单页的数据量
   */
  pageSize?: number;
  /**
   * 部位模板ID
   */
  positionTemplateId?: string;
  /**
   * 部位模板名称
   */
  positionTemplateName?: string;
  /**
   * 状态：1--启用，0--禁用
   */
  state?: YES_NO_NUMBER_ENUM;
}

export type IPositionTemplateListWithEntryRes = IPositionTemplateListWithEntryResItem[];
export interface IPositionTemplateListWithEntryResItem {
  /**
   * 部位模板ID
   */
  positionTemplateId: string;
  /**
   * 部位模板名称
   */
  positionTemplateName: string;
  /**
   * 状态：1--启用，0--禁用
   */
  state: YES_NO_NUMBER_ENUM;
  /**
   * 创建人ID
   */
  creatorId?: string;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 创建时间
   */
  createdTime?: number;
  /**
   * 最近修改者ID
   */
  reviserId?: string;
  /**
   * 修改人名称
   */
  reviserName?: string;
  /**
   * 最近修改时间
   */
  revisedTime?: number;
  /**
   * 逻辑删除 0 否 1是
   */
  deleted?: string;
  /**
   * 部位条目列表
   */
  positionEntryList: IPositionTemplateListWithEntryResItemPositionEntryListItem[];
}

export interface IPositionTemplateListWithEntryResItemPositionEntryListItem {
  /**
   * 部位条目ID
   */
  positionEntryId?: string;
  /**
   * 部位模板ID
   */
  positionTemplateId?: string;
  /**
   * 部位字典值ID
   */
  positionId?: string;
  /**
   * 部位名称
   */
  position: string;
  /**
   * 量法
   */
  measureWay?: string;
  /**
   * 允差范围
   */
  scope?: string;
  /**
   * 部位字典是否删除：0否；1是
   */
  dictValueDeleted?: string;
  /**
   * 部位字段是否启用：{0-否 ,1-是}
   */
  dictValueEnable?: string;
}

export interface IPlateInfoResSizeTableItem {
  picture?: string;
  parentId?: string;
  tableId?: string;
  /**
   * ID
   */
  id?: string;
  /**
   * 部位
   */
  position?: string;
  /**
   * 尺寸维度
   */
  sizeDimension?: string;
  /**
   * 量法
   */
  measureWay?: string;
  /**
   * 纸样尺寸
   */
  paperSize?: string | number | '';
  /**
   * 样衣尺寸
   */
  clothingSize?: string;
  /**
   * 允差范围
   */
  scope?: string;
  /**
   * 备注
   */
  remark?: string;
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
   * 工序描述
   */
  processDescribe?: string;
}

/**
 * 响应数据
 */
export type PostWebV1CategoryPricePageApiRes = {
  children: PostWebV1CategoryPricePageApiRes;
  /**
   * 品类ID（字典值ID）
   */
  categoryId: string;
  /**
   * 品类名称
   */
  categoryName: string;
  /**
   * 品类编号
   */
  categoryCode: string;
  /**
   * 父品类编号
   */
  parentCategoryCode: string;
  /**
   * 品类状态：{0-禁用 ,1-启用}
   */
  categoryStatus: YES_NO_NUMBER_ENUM;
  /**
   * 品类标准价格列表
   */
  priceList: {
    /**
     * 品类标准价格ID
     */
    priceId: string;
    /**
     * 是否启用：0-禁用；1-启用
     */
    enabled: YES_NO_NUMBER_ENUM;
    /**
     * 品类ID（字典值ID）
     */
    categoryId: string;
    /**
     * 品类编号
     */
    categoryCode: string;
    /**
     * 版房品类
     */
    patternCategoryName: string;
    /**
     * 3D制版费用
     */
    patternPlateAmount: string;
    /**
     * 放码费用
     */
    patternGradingAmount: string;
    /**
     * 用量核算费用
     */
    patternUsageAmount: string;
    /**
     * 样衣车版费用
     */
    patternClothingAmount: string;
    /**
     * 创建人id
     */
    creatorId: string;
    /**
     * 创建人名称
     */
    creatorName: string;
    /**
     * 创建时间
     */
    createdTime: number;
    /**
     * 更新人id
     */
    reviserId: string;
    /**
     * 更新人名称
     */
    reviserName: string;
    /**
     * 更新时间
     */
    revisedTime: string;
    /**
     * 逻辑删除  1是 0 否
     */
    deleted?: string;
  }[];
}[];

export interface IGradingInfoRes {
  /**
   * 保存时间
   */
  savedTime?: number;
  /**
   * 放码ID
   */
  gradingId: string;
  /**
   * 任务ID
   */
  taskId: string;
  /**
   * 需求D
   */
  demandId: string;
  /**
   * 任务状态：10-待接单、20-进行中、30-待确认、40-待支付、41-支付中、50-修改中、60-已完成、70-已关闭
   */
  taskState: string;
  /**
   * 内容状态：(0, "未保存"),(10, "已保存"),(20, "已交付"),(30, "修改中"),(40, "已取消");
   */
  state: string;
  /**
   * 放码纸样文件
   */
  paperPatternFile: IGradingInfoResPaperPatternFile;
  /**
   * 尺码组编号，如：chinese_size_code
   */
  sizeTypeCode: string;
  /**
   * 尺码组名称，如：中国码
   */
  sizeTypeName: string;
  /**
   * 纸样尺寸
   */
  paperPatternSize: string;
  /**
   * 样衣尺寸
   */
  clothingPatternSize: string;
  /**
   * 是否有放码尺寸：0否；1是
   */
  existGradingTable: SIZE_TABLE_TYPE_ENUM;
  /**
   * 放码尺寸表附件
   */
  sizeTableAttachmentFiles: {
    /**
     * 文件|图片路径
     */
    filePath: string;
    /**
     * 文件|图片名称
     */
    fileName: string;
  }[];
  /**
   * 放码规则JSON：[{"from":"S","to":"L"},{"from":L,"to":"XL"}]
   */
  gradingRules: IGradingInfoResGradingRulesItem[];
  /**
   * 服务金额
   */
  serviceAmount: string;
  /**
   * 应收金额
   */
  receivableAmount: string | number;
  /**
   * 已付金额
   */
  payedAmount?: string;
  /**
   * 交付时间
   */
  consignedTime: number;
  /**
   * 放码版本号
   */
  version?: string;
  /**
   * 需求版本号
   */
  demandVersion: string;
  /**
   * 放码明细信息
   */
  gradingDetailList: IGradingInfoResGradingDetailListItem[];
  /**
   * 款式品类编号：以"-"隔开（如：code1-code2-code3）
   */
  categoryCode: string;
  /**
   * 款式品类名称：以"-"隔开（如：女装-上装-T恤）
   */
  categoryName: string;
  /**
   * 品类标准价格ID
   */
  priceId: string;
  /**
   * 版房品类名称
   */
  patternCategoryName: string;
  /**
   * 版房放码费用
   */
  patternGradingAmount: string;
}
export interface IGradingInfoResPaperPatternFile {
  /**
   * 文件标记【缩略的：thumbnail；原始的：ordinary；工程：project】
   */
  fileMark?: string;
  /**
   * 文件|图片路径
   */
  filePath?: string;
  /**
   * 文件|图片名称
   */
  fileName?: string;
}

export interface IGradingInfoResGradingDetailListItem {
  /**
   * 放码明细ID
   */
  gradingDetailId?: string;
  /**
   * 部位名称
   */
  position: string;
  /**
   * 部位编码
   */
  positionCode?: string;
  /**
   * 尺寸维度
   */
  sizeDimension?: string;
  /**
   * 量法
   */
  measureWay?: string;
  /**
   * 纸样尺寸
   */
  paperSize?: string | number | '';
  /**
   * 样衣尺寸
   */
  clothingSize: string;
  /**
   * 放码档差J
   */
  gradingInterval: IGradingInfoResGradingDetailListItemGradingIntervalItem[];
  /**
   * 放码尺寸
   */
  gradingSize: IGradingInfoResGradingDetailListItemGradingSizeItem[];
  /**
   * 允差范围
   */
  scope: string;
  /**
   * 备注
   */
  remark?: string;
}

export interface IGradingInfoResGradingDetailListItemGradingSizeItem {
  /**
   * 尺寸
   */
  size: string;
  /**
   * 尺寸值
   */
  value: string | number;
}

export interface IGradingInfoResGradingDetailListItemGradingIntervalItem {
  /**
   * 尺码区间
   */
  interval: string;
  /**
   * 差档距离
   */
  distance: string;
}

export interface IGradingInfoResGradingRulesItem {
  /**
   * 开始
   */
  from: string;
  /**
   * 结束
   */
  to: string;
}

/**
 * 样衣图片（用于AI识别）
 */
export interface IV1SewResSamplePicture {
  frontPicture: IV1SewResFrontPicture;
  sidePicture: IV1SewResSidePicture;
  backPicture: IV1SewResBackPicture;
  otherPictures?: IV1SewResOtherPictures;
  detailPictures?: IV1SewResDetailPictures;
}

export interface IV1SewResUrlsItem {
  /**
   * 图片地址
   */
  url: string;
  /**
   * 是否校验通过
   */
  checkPass?: string;
  msg?: string;
}

/**
 * 正面图
 */
export interface IV1SewResFrontPicture {
  /**
   * 图片地址
   */
  urls: IV1SewResUrlsItem[];
  /**
   * 图片类型 （正/侧/背/其他）
   * 'FRONT' | 'SIDE' | 'BACK' | 'OTHER';
   */
  pictureOrientationEnum: PICTURE_ORIENTATION_ENUM;
}
/**
 * 侧面图
 */
export interface IV1SewResSidePicture {
  /**
   * 图片地址
   */
  urls: IV1SewResUrlsItem[];
  /**
   * 图片类型 （正/侧/背/其他）
   * 'FRONT' | 'SIDE' | 'BACK' | 'OTHER';
   */

  pictureOrientationEnum: PICTURE_ORIENTATION_ENUM;
}
/**
 * 背面图
 */
export interface IV1SewResBackPicture {
  /**
   * 图片地址
   */
  urls: IV1SewResUrlsItem[];
  /**
   * 图片类型 （正/侧/背/其他）
   * 'FRONT' | 'SIDE' | 'BACK' | 'OTHER';
   */

  pictureOrientationEnum: PICTURE_ORIENTATION_ENUM;
}
/**
 * 其他图片
 */
export interface IV1SewResOtherPictures {
  /**
   * 图片地址
   */
  urls?: IV1SewResUrlsItem[];
  /**
   * 图片类型 （正/侧/背/其他）
   * 'FRONT' | 'SIDE' | 'BACK' | 'OTHER';
   */

  pictureOrientationEnum?: PICTURE_ORIENTATION_ENUM;
}

/**
 * 其他图片
 */
export interface IV1SewResDetailPictures {
  /**
   * 图片地址
   */
  urls?: IV1SewResUrlsItem[];
  /**
   * 图片类型 （正/侧/背/其他）
   * 'FRONT' | 'SIDE' | 'BACK' | 'OTHER';
   */

  pictureOrientationEnum?: PICTURE_ORIENTATION_ENUM;
}

/**
 * 查询列表（分页）
 * yapi地址：https://yapi.tiangong.site/project/43/interface/api/2967
 */
export interface IReworkResponsibilityPageReq {
  pageNum?: number;
  pageSize?: number;
  dutyId?: string;
  /**
   * 编码
   */
  code?: string;
  /**
   * 返修/复版责任方
   */
  reworkingDuty?: string;
  /**
   * 状态（1-启用，0-停用）
   */
  state?: string;
  /**
   * 创建日期开始。如2021-08-05 00:00:00
   */
  createTimeStart?: string;
  /**
   * 创建日期结束。如2021-08-05 23:59:59
   */
  createTimeEnd?: string;
}

export interface IReworkResponsibilityPageRes {
  page?: number;
  total?: number;
  list: IReworkResponsibilityPageResListItem[];
}

export interface IReworkResponsibilityPageResListItem {
  dutyId?: string;
  /**
   * 编码
   */
  code?: string;
  /**
   * 返修/复版责任方
   */
  reworkingDuty?: string;
  /**
   * 计费规则（1-计费，0-不计费）
   */
  payCostRule?: '1' | '0';
  /**
   * 收费规则（1-计费，0-不计费）
   */
  receiveCostRule?: '1' | '0';
  /**
   * 返修计费影响（1-仅纸样，2-仅车版，3-纸样+车版）
   */
  repairChargingAffects?: '1' | '2' | '3';
  /**
   * 返修类型（1-仅纸样，2-仅车版，3-纸样+车版）
   */
  repairTypes: string[];
  /**
   * 状态（1-启用，0-停用）
   */
  state?: '1' | '0';
  /**
   * 更新时间
   */
  revisedTime?: number;
  /**
   * 更新人name
   */
  reviserName?: string;
}

/**
 * 处理环节统计
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2829
 */
export interface IStepNodeCountReq {
  /**
   * 打版环节
   */
  clothesStep?: string;
  /**
   * 打版节点
   */
  clothesNode?: string;
  /**
   * 节点状态值
   * 参考不同ClothesNodeEnum下的IClothesStepNodeStateEnum
   */
  clothesStepNodeState?: string;
  /**
   * 是否查询我的 true=我的、false/null=全部
   */
  personal?: boolean;
}

export type IStepNodeCountRes = IStepNodeCountResItem[];
export interface IStepNodeCountResItem {
  /**
   * 环节枚举值
   */
  processStep?: PROCESSSTEP_ENUM;
  /**
   * 环节编码
   */
  processStepCode?: string;
  /**
   * 环节描述
   */
  processStepDesc?: string;
  /**
   * 环节节点枚举值
   */
  processNode?: PROCESSNODE_ENUM;
  /**
   * 环节节点编码
   */
  processNodeCode?: string;
  /**
   * 环节节点描述
   */
  processNodeDesc?: string;
  /**
   * 当前环节（或者节点）任务数量
   */
  count?: string;
}

/**
 * 添加备注
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2598
 */
export interface IRemarkAddReq {
  /**
   * 业务id
   * <p>
   * clothesId 样衣打版id <p>
   * anomalyId 异常单id <p>
   * repairId 返修单id
   * grading_id 样衣放码id <p>
   */
  bizId: string;
  /**
   * 业务类型: 1-打版、2-异常、3-返修 4-二次工艺 、5-样衣放码
   */
  bizType: REMARK_BIZ_TYPE_ENUMS | '';
  /**
   * 备注信息
   */
  remark: string;
}

/**
 * 【尺寸模版库】查询列表（非分页）
 * yapi地址：https://yapi.tiangong.site/project/43/interface/api/2624
 */
export interface ITemplateListReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 模板名称
   */
  templateName?: string;
  /**
   * 商品三级品类
   */
  threeCategory?: string;
  /**
   * 状态是否启用 0 否 1是
   */
  isEnabled?: string;
  /**
   * 创建时间（开始）
   */
  createdTimeBegin?: string;
  /**
   * 创建时间（结束）
   */
  createdTimeEnd?: string;
}

export type ITemplateListRes = ITemplateListResItem[];
export interface ITemplateListResItem {
  /**
   * 主键id
   */
  id?: string;
  /**
   * 模板名称
   */
  templateName?: string;
  /**
   * 模板名称
   */
  templateCode?: string;
  /**
   * 商品三级品类
   */
  threeCategory?: string;
  /**
   * 商品三级品类
   */
  threeCategoryCode?: string;
  /**
   * 部位尺寸详情信息json
   */
  sizeInfoJsons: ITemplateListResItemSizeInfoJsonsItem[];
  /**
   * 标签状态是否启用0否 1是
   */
  isEnabled?: string;
  /**
   * 创建人id
   */
  creatorId?: string;
  /**
   * 创建人名字
   */
  creatorName?: string;
  /**
   * 创建时间
   */
  createdTime?: number;
  /**
   * 逻辑删除 0否 1是
   */
  isDeleted?: string;
}

export interface ITemplateListResItemSizeInfoJsonsItem {
  /**
   * 部位名称
   */
  position: string;
  /**
   * 部位名称
   */
  positionCode: string;
  /**
   * 尺寸维度
   */
  dimension: string;
  /**
   * 量法
   */
  measureMethod: string;
  /**
   * 允差范围
   */
  errorRange: string;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 部件模板的分页查询
 * yapi地址：https://yapi.tiangong.site/project/43/interface/api/2618
 */
export interface ISewingComponentTemplatePageByNameReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 车缝工序部件名称
   */
  componentName?: string;
  /**
   * 工序名称
   */
  processName?: string;
  /**
   * parentType
   */
  parentType?: string;
  /**
   * 区域id
   */
  regionId?: string;
}

export interface ISewingComponentTemplatePageByNameRes {
  page?: number;
  total?: number;
  list: ISewingComponentTemplatePageByNameResListItem[];
}

export interface ISewingComponentTemplatePageByNameResListItem {
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

/**
 * 查询列表（分页）
 * yapi地址：https://yapi.tiangong.site/project/43/interface/api/2610
 */
export interface ISewingComponentTemplatePageReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 区域id
   */
  regionId?: string;
  /**
   * 车缝工序部件名称
   */
  componentName?: string;
  /**
   * 状态（1-启用，0-停用）
   * isNullAble:0
   */
  state?: string;
  /**
   * 创建开始时间 格式：yyyy-MM-dd HH:mm:ss
   */
  createStartTime?: string;
  /**
   * 创建结束时间 格式：yyyy-MM-dd HH:mm:ss
   */
  createEndTime?: string;
}

export interface ISewingComponentTemplatePageRes {
  page?: number;
  total?: number;
  list: ISewingComponentTemplatePageResListItem[];
}

export interface ISewingComponentTemplatePageResListItem {
  /**
   * 主键
   * 车缝工序部件模板ID
   */
  sewingComponentTemplateId?: string;
  /**
   * 车缝工序部件名称
   */
  componentName?: string;
  /**
   * 区域id
   */
  regionId?: string;
  /**
   * 区域名
   */
  regionName?: string;
  /**
   * 状态（1-启用，0-停用）
   */
  state?: string;
  /**
   * 修改人名称
   */
  reviserName?: string;
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
 * 加工单详情 ⬇️
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2453
 */
export interface ISampleClothesInfoDetailReq {
  /**
   * 样衣打版id
   */
  clothesId: string;
}

export interface ISampleClothesInfoDetailRes {
  /**
   * 加工单基本信息
   */
  clothes?: ISampleClothesInfoDetailResClothes;
  /**
   * 加工单明细
   */
  detail?: ISampleClothesInfoDetailResDetail;
  /**
   * 审版工艺单明细
   */
  auditCraftOrderDetailVo?: ISampleClothesInfoDetailResAuditCraftOrderDetailVo;
  /**
   * 上架图片信息
   */
  shelvePicture?: ISampleClothesInfoDetailResShelvePicture;
}

export interface ISampleClothesInfoDetailResAuditCraftOrderDetailVo {
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
  referSize?: ISampleClothesInfoDetailResAuditCraftOrderDetailVoReferSize;
  /**
   * 裁剪要求
   */
  cuttingRequire?: string;
  /**
   * 车缝要求
   */
  sewRequire: ISampleClothesInfoDetailResAuditCraftOrderDetailVoSewRequireItem[];
  /**
   * 尾部要求
   */
  tailRequire?: string;
}

export interface ISampleClothesInfoDetailResAuditCraftOrderDetailVoReferSize {
  /**
   * 版房品类(版房品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  roomCategory: string;
  /**
   * 版房品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  roomCategoryName?: string;
  /**
   * 纸样尺寸码
   */
  patternSize: string;
  /**
   * 引用尺寸表模板
   */
  referSizeTemplate?: string;
  /**
   * 尺寸表
   */
  sizeTable: ISampleClothesInfoDetailResAuditCraftOrderDetailVoReferSizeSizeTableItem[];
}

export interface ISampleClothesInfoDetailResAuditCraftOrderDetailVoReferSizeSizeTableItem {
  /**
   * 部位编码
   */
  positionCode?: string;
  /**
   * 部位名
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
   * 纸样尺寸值
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

export interface ISampleClothesInfoDetailResAuditCraftOrderDetailVoSewRequireItem {
  /**
   * 审版工艺部件ID
   */
  componentId: string;
  /**
    * 工序部件名称
    */
  componentName: string;
  /**
   * 版型结构分解
   */
  structurals: ISampleClothesInfoDetailResAuditCraftOrderDetailStructuralsItem[];
}

export interface ISampleClothesInfoDetailResAuditCraftOrderDetailStructuralsItem {
  /**
   * 版型结构分解描述
   */
  desc: string;
  /**
   * 车缝工艺要求
   */
  sewingRequires: ISampleClothesInfoDetailResAuditCraftOrderDetailResSewingRequiresItem[];
}
export interface ISampleClothesInfoDetailResAuditCraftOrderDetailResSewingRequiresItem {
  /**
   * 车缝工艺要求描述
   */
  desc: string;
}

export interface ISampleClothesInfoDetailResDetail {
  /**
   * 版单详细表id
   */
  detailId?: string;
  /**
   * 版单id
   */
  clothesId?: string;
  /**
   * 设计图片
   */
  designPicture?: string;
  /**
   * 设计图片
   */
  designPictureList: string[];
  /**
   * 纸样文件链接
   */
  designFileUrl?: string;
  /**
   * 文件名
   */
  designFileName?: string;
  /**
   * skc颜色
   */
  color?: string;
  /**
   * 复色款号
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
   * 和design_code绑定（为了兼容履约）
   */
  fakeId?: string;
  /**
   * 尺码标准
   */
  sizeStandard?: string;
  /**
   * 尺码标准编号
   */
  sizeStandardCode?: string;
  /**
   * 样衣尺码
   */
  sampleSize?: string;
  /**
   * 样衣件数
   */
  sampleAmount?: string;
  /**
   * 版型要求
   */
  layoutRequirement?: string;
  /**
   * 专机工艺名称
   */
  specialCraftName?: string;
  /**
   * SKC（款）生成时间
   */
  skcCreatedTime?: number;
  /**
   * SPU生成时间
   */
  spuCreatedTime?: number;
  /**
   * 齐套创建时间
   */
  materialCreatedTime?: number;
  /**
   * 齐套签收时间
   */
  materialSignTime?: number;
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
   * 设计师code
   */
  designerCode?: string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 纸样分单员id
   */
  patternAllocateeId?: string;
  /**
   * 纸样分单员名称
   */
  patternAllocateeName?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 车版分单员id
   */
  sewAllocateeId?: string;
  /**
   * 车版分单员名称
   */
  sewAllocateeName?: string;
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
   * 核价师id
   */
  pricerId?: string;
  /**
   * 核价师名称
   */
  pricerName?: string;
  /**
   * 完成时间
   */
  doneTime?: number;
  /**
   * 版单取消时间
   */
  cancelTime?: number;
  /**
   * 版单取消原因
   */
  cancelReason?: string;
  /**
   * 取消版单操作人id
   */
  cancelUserId?: string;
  /**
   * 版单取消操作人姓名
   */
  cancelUserName?: string;
  /**
   * 版单取消备注
   */
  cancelRemark?: string;
  /**
   * 备注记录
   */
  remark?: string;
  /**
   * 复版时间
   */
  redoTime?: number;
  /**
   * 复版原因
   */
  redoReason?: string;
  /**
   * 复版责任方: 1:版房原因、2:设计师原因、3:客户要求、4:面辅料履约
   */
  responsibleParty?: '1' | '2' | '3' | '4';
  /**
   * 拆版备注
   */
  splitRemark?: string;
  /**
   * 补做描述  ---推款0.1
   */
  redoDesc?: string;
  /**
   * 上架图片信息
   */
  shelvePicture?: ISampleClothesInfoDetailResDetailShelvePicture;
  /**
   * 3D版师id
   */
  dimensionDesignerId?: string;
  /**
   * 3D版师名称
   */
  dimensionDesignerName?: string;
}

export interface ISampleClothesInfoDetailResDetailShelvePicture {
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

export interface ISampleClothesInfoDetailResClothes {
  /**
   * bomId
   */
  bomId: string;
  /**
   * 版单id
   */
  clothesId?: string;
  /**
   * 打版类型: 1-大货打版 2-正常打版 3-复色打版 4-补做打版
   */
  sampleType?: '1' | '2' | '3' | '4';
  /**
   * 版本号
   */
  versionNum?: string;
  /**
   * 设计版单id
   */
  prototypeId?: string;
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
   * 版单整状态：0待开始1进行中2已完成3已取消
   * SampleClothesStateEnum
   */
  state?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 打版件数
   */
  sampleAmount?: string;
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
   * 是否需要下采购（1:是,0/null:否）
   */
  isPurchase?: string;
  /**
   * 面辅料齐套状态(0-未流转、1-待签收、2-已签收)
   */
  materialState?: string;
  /**
   * 是否完成 0-进行中、1-已完成
   */
  isDone?: string;
  /**
   * 是否取消 0-否、1-是
   */
  isCancel?: string;
  /**
   * 是否最新(同一加工单号最新的条) 0-否、1-是
   */
  isLatest?: string;
  /**
   * 审核工艺单详情ID
   */
  auditCraftOrderDetailId?: string;
  /**
   * 交接状态 0-待处理、1-已交接
   */
  takeOverState?: string;
  /**
   * 打版类型: 0-仅纸样 1-实物样 2-3D样 3-3D样+实物样
   */
  makeClothesType?: string;
  /**
   * 打版类型编码: 0-仅纸样 1-实物样 2-3D样 3-3D样+实物样
   */
  makeClothesTypeCode?: string;
  /**
   * 打版类型描述: 0-仅纸样 1-实物样 2-3D样 3-3D样+实物样
   */
  makeClothesTypeDesc?: string;
  /**
   * BOM单ID
   */
  bom_id?: string;
  /**
   * 创建人id
   */
  creatorId?: string;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 创建人时间
   */
  createdTime?: number;
  /**
   * 修改人id
   */
  reviserId?: string;
  /**
   * 修改人名称
   */
  reviserName?: string;
  /**
   * 修改人时间
   */
  revisedTime?: number;
}
/** ⬆️ 加工单详情 */

/**
 * 获取bom详情信息
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2637
 */
export interface IDesignCommonBomReq {
  /**
   * 设计款号
   */
  designCode: string;
}

export type IDesignCommonBomRes = IDesignCommonBomResItem[];
export interface IDesignCommonBomResItem {
  bomMaterialId?: string;
  bomId?: string;
  bomMaterialType?: string;
  prototypeMaterialName?: string;
  partUse?: string;
  partUseName?: string;
  cuttingMethod?: string;
  cuttingMethodName?: string;
  dosageAccount?: string;
  materialRemarkList: IDesignCommonBomResItemMaterialRemarkListItem[];
  /**
   * 「已废弃」
   * 「已废弃」
   */
  demandId?: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  demandCode?: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  demandTag?: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  fabricDemandTag?: string;
  demandType?: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  matchId?: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  matchCode?: string;
  commodityType?: string;
  commodityName?: string;
  flowerCategory?: string;
  commodityId?: string;
  commodityCode?: string;
  commodityNumber?: string;
  categoryCode?: string;
  categoryName?: string;
  skuId?: string;
  skuCode?: string;
  /**
   * 成分; json, 会有多种成分比例
   */
  material?: string;
  matchPictureList: string[];
  matchSalePrice?: string;
  matchPurchaseUnitName?: string;
  packNumber?: string;
  packUnitName?: string;
  packAssistantUnitName?: string;
  minPrice?: string;
  minPriceUnit?: string;
  skuAttrs?: string;
  widthStrFormat?: string;
  saleUnit?: string;
  weightStrFormat?: string;
  colorName?: string;
  colorType?: string;
  warehouseColorInfo?: IDesignCommonBomResItemWarehouseColorInfo;
  colorNumber?: string;
  matchSampleGuidePrice?: string;
  matchSampleUnit?: string;
  matchGuidePrice?: string;
  matchCostPriceUnit?: string;
  matchPurchaseGap?: string;
  meterPrice?: string;
  meterPriceUnit?: string;
  matchSource?: string;
  matcherName?: string;
  matchRemark?: string;
  unfinishedReason?: string;
  colorCardPictureList: string[];
  purchaseColorCardPictureList: string[];
  isConfirm?: string;
  sort?: string;
  widthConfirm?: string;
  supplierId?: string;
  supplierCode?: string;
  supplierName?: string;
  invoiceState?: string;
  priceReplyTime?: number;
  priceInvalidTime?: number;
  purchasePrice?: string;
  skuPrice?: string;
  accessoriesFlagId?: string;
  craftDemandInfoList: IDesignCommonBomResItemCraftDemandInfoListItem[];
  purchaseApplyFollowCount?: string;
  dosageAccountUnit?: string;
  attritionRate?: string;
  bulkPurchasePrice?: string;
  bulkPurchasePriceUnit?: string;
  materialSnapshotId?: string;
  materialContextId?: string;
  isNoCraft?: string;
  enableState?: string;
  onShelfState?: string;
  supplyExistState?: string;
  bomMaterialIdCopy?: string;
  materialTypeCode?: string;
  materialType?: string;
  bomMaterialDemandId?: string;
  colorMatchMaterialState?: string;
  colorMatchMaterialName?: string;
  colorMatchMaterialId?: string;
  materialState?: string;
  replaceBomMaterialId?: string;
  samplePurchasingCycle?: string;
  samplePurchasingCycleUnit?: string;
  bulkPurchasingCycle?: string;
  bulkPurchasingCycleUnit?: string;
  isPlanning?: string;
  bandDate?: number;
  identifyMaterialId?: string;
  encryptionCommodityCode?: string;
  encryptionSkuCode?: string;
  encryptionCommodityName?: string;
  identifySelection?: boolean;
  materialImg?: string;
}

export interface IDesignCommonBomResItemCraftDemandInfoListItem {
  craftDemandId?: string;
  designCode?: string;
  bomId?: string;
  bomMaterialId?: string;
  state?: string;
  category1?: string;
  category2?: string;
  category3?: string;
  craftsRequire?: string;
  undertakeType?: string;
  customerSupplyFactory?: string;
  innerFactoryId?: string;
  factoryName?: string;
  contactName?: string;
  contactPhone?: string;
  contactProvince?: string;
  contactCity?: string;
  contactRegion?: string;
  contactDetailAddress?: string;
  pictureList: string[];
  positionRequirement?: string;
  sizeRequirement?: string;
  colorRequirement?: string;
  weightRequirement?: string;
  otherRequirement?: string;
  relationDemandId?: string;
  thirdPartyCraftDemandId?: string;
  thirdPartyCraftDemandCode?: string;
  sampleCraftCycle?: string;
  sampleCraftCycleUnit?: string;
  bulkCraftCycle?: string;
  bulkCraftCycleUnit?: string;
  sampleUnit?: string;
  samplePrice?: string;
  bulkUnit?: string;
  bulkPrice?: string;
  creatorId?: string;
  createdTime?: number;
  creatorName?: string;
  materialDemandId?: string;
  prototypeId?: string;
  craftUnit?: string;
  isTransient?: string;
}

export interface IDesignCommonBomResItemWarehouseColorInfo {
  skuId?: string;
  colorNumber?: string;
  skuCode?: string;
  remainingQuantity?: string;
  colorNumberDesc?: string;
  colorSystem?: string;
  warehouseName?: string;
  belongArea?: BELONG_AREA_ENUM;
  supplierRegion?: string;
  regionId?: string;
}

export interface IDesignCommonBomResItemMaterialRemarkListItem {
  designRemarksId?: string;
  remark?: string;
  transientState?: string;
  creatorId?: string;
  createdName?: string;
  createdTime?: number;
}

export enum BELONG_AREA_ENUM {
  /**
   * NATIONWIDE
   */
  NATIONWIDE = 'NATIONWIDE',
  /**
   * GUANGZHOU
   */
  GUANGZHOU = 'GUANGZHOU',
  /**
   * HANGZHOU
   */
  HANGZHOU = 'HANGZHOU'
}
/**
 * 查询纸样师或版房订单数量（分页）
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2832
 */
export interface IPatternClothesMakerRoomReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 纸样分单状态。（1:内部纸样 2:外发纸样）
   */
  allocateState?: string;
  /**
   * 打版类型: 1-大货打版 2-正常打版 3-复色打版 4-补做打版
   */
  sampleType?: '1' | '2' | '3' | '4';
  /**
   * 纸样师或板房名字
   */
  makerOrRoom?: string;
  /**
   * 区域id
   */
  regionId?: string;
}

export interface IPatternClothesMakerRoomRes {
  page?: number;
  total?: number;
  list: IPatternClothesMakerRoomResListItem[];
}

export interface IPatternClothesMakerRoomResListItem {
  /**
   * 纸样师id或版房id
   */
  makerOrRoomId?: string;
  /**
   * 纸样师名称或版房名称
   */
  makerOrRoomName?: string;
  /**
   * 订单数
   */
  orderCount?: string;
}

/**
 * 通过尺寸模板code获取详细信息
 * yapi地址：https://yapi.tiangong.site/project/43/interface/api/2625
 */
export interface ITemplateDetailedInfoReq {
  /**
   * 模板code
   */
  templateCode: string;
}

export interface ITemplateDetailedInfoRes {
  /**
   * 主键
   */
  id?: string;
  /**
   * 模板Code
   */
  templateCode?: string;
  /**
   * 模板名称
   */
  templateName?: string;
  /**
   * 标签状态是否启用0否 1是
   */
  isEnabled?: string;
  /**
   * 商品三级品类
   */
  threeCategory?: string;
  /**
   * 商品三级品类code
   */
  threeCategoryCode?: string;
  /**
   * 尺寸详情信息
   */
  sizeInfoJsons: ITemplateDetailedInfoResSizeInfoJsonsItem[];
}

export interface ITemplateDetailedInfoResSizeInfoJsonsItem {
  paperSize?: string | number | '';
  sizeStandardCode?: string;
  // 样衣尺寸
  sampleClothesSize?: string;
  // 纸样尺寸
  patternSize?: string;

  id: string;
  remark?: string;
  /**
   * 部位名称
   */
  position: string;
  /**
   * 部位名称
   */
  positionCode: string;
  positionName?: string;
  /**
   * 尺寸维度
   */
  dimension: string;
  /**
   * 量法
   */
  measureMethod?: string;
  measuringMethod?: string;
  /**
   * 允差范围
   */
  errorRange?: string;
  tolerance?: string;
}

/**
 * 【】查询列表（分页）
 * yapi地址：https://yapi.tiangong.site/project/43/interface/api/2623
 */
export interface ITemplatePageReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 模板名称
   */
  templateName?: string;
  /**
   * 商品三级品类
   */
  threeCategory?: string;
  /**
   * 状态是否启用 0 否 1是
   */
  isEnabled?: string;
  /**
   * 创建时间（开始）
   */
  createdTimeBegin?: string;
  /**
   * 创建时间（结束）
   */
  createdTimeEnd?: string;
}

export interface ITemplatePageRes {
  page?: number;
  total?: number;
  list: ITemplatePageResListItem[];
}

export interface ITemplatePageResListItem {
  /**
   * 主键
   */
  id?: string;
  /**
   * 模板名称
   */
  templateName?: string;
  /**
   * 模板code
   */
  templateCode?: string;
  /**
   * 标签状态是否启用0否 1是
   */
  isEnabled?: string;
  /**
   * 商品三级品类
   */
  threeCategory?: string;
  /**
   * 商品三级品类
   */
  threeCategoryCode?: string;
  /**
   * 创建时间
   */
  createdTime?: number;
  /**
   * 操作人id
   */
  operatorId?: string;
  /**
   * 操作人名称
   */
  operatorName?: string;
  /**
   * 操作时间
   */
  operationTime?: number;
  /**
   * 日志信息
   */
  operationContent?: string;
}

// 打版统计
/**
 * 处理环节节点状态统计
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2830
 */
export interface IStepNodeStateCountReqs {
  /**
   * 打版环节
   */
  clothesStep?: string;
  /**
   * 打版节点
   */
  clothesNode?: string;
  /**
   * 节点状态值
   * 参考不同ClothesNodeEnum下的IClothesStepNodeStateEnum
   */
  clothesStepNodeState?: string;
  /**
   * 是否查询我的 true=我的、false/null=全部
   */
  personal?: boolean;
}

export type IStepNodeStateCountRes = IStepNodeStateCountResItem[];
export interface IStepNodeStateCountResItem {
  /**
   * 环节枚举值
   */
  processStep: PROCESSSTEP_ENUM;
  /**
   * 环节编码
   */
  processStepCode?: PROCESS_STEP_CODE_ENUM;
  /**
   * 环节描述
   */
  processStepDesc?: string;
  /**
   * 环节节点枚举值
   */
  processNode?: PROCESSNODE_ENUM;
  /**
   * 环节节点编码
   */
  processNodeCode?: PROCESS_NODE_CODE_ENUM;
  /**
   * 环节节点描述
   */
  processNodeDesc?: string;
  /**
   * 环节节点状态值
   */
  nodeStateCode?: string;
  /**
   * 环节节点状态值描述
   */
  nodeStateDesc?: string;
  /**
   * 当前环节（或者节点）任务数量
   */
  count?: string;
  /**
   * 当前环节（或者节点）任务数量(不包含已取消数据)
   */
  unFinishCount?: string;
}

/**
 * 节点处理环节统计
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2317
 */
export interface IProcessStepNodeCountReq {
  /**
   * 打版环节
   */
  processStep: string;
  /**
   * 打版节点
   */
  processNode: string;
  /**
   * 节点状态值
   */
  processNodeState?: string;
  /**
   * 是否查询我的 true=我的、false/null=全部
   */
  personal?: boolean;
  currentUserId?: string;
}

export type IProcessStepNodeCountRes = IProcessStepNodeCountResItem[];
export interface IProcessStepNodeCountResItem {
  /**
   * 环节枚举值
   */
  processStep: string;
  /**
   * 环节编码
   */
  processStepCode: string;
  /**
   * 环节描述
   */
  processStepDesc: string;
  /**
   * 环节节点枚举值
   */
  processNode: string;
  /**
   *  环节节点编码
   */
  processNodeCode: string;
  /**
   * 环节节点描述
   */
  processNodeDesc: string;
  /**
   * 当前环节（或者节点）任务数量
   */
  count: string;
}

/**
 * 处理环节节点状态统计
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2326
 */
export interface IProcessStepNodeStateCountReq {
  /**
   * 打版环节
   */
  processStep: string;
  /**
   * 打版节点
   */
  processNode: string;
  /**
   * 节点状态值
   */
  processNodeState?: string;
  /**
   * 是否查询我的 true=我的、false/null=全部
   */
  personal?: boolean;
  currentUserId?: string;
}

export type IProcessStepNodeStateCountRes = IProcessStepNodeStateCountResItem[];
export interface IProcessStepNodeStateCountResItem {
  /**
   * 环节枚举值
   */
  processStep: string;
  /**
   * 环节编码
   */
  processStepCode: string;
  /**
   * 环节描述
   */
  processStepDesc: string;
  /**
   * 环节节点枚举值
   */
  processNode: string;
  /**
   *  环节节点编码
   */
  processNodeCode: string;
  /**
   * 环节节点描述
   */
  processNodeDesc: string;
  /**
   * 环节节点状态值
   */
  nodeStateCode: string;
  /**
   *  环节节点状态值描述
   */
  nodeStateDesc: string;
  /**
   * 当前环节（或者节点）任务数量
   */
  count: string;
  /**
   * 当前环节（或者节点）任务数量(不包含已取消数据)
   */
  unFinishCount?: string;
}

/**
 * 通过BOMID获取bom详情信息
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/3245
 */
export interface IDesignCommonGetBomByIdReq {
  /**
   * BOMID
   */
  bomId: string;
}

export type IDesignCommonGetBomByIdRes = IDesignCommonGetBomByIdResItem[];
export interface IDesignCommonGetBomByIdResItem {
  bomMaterialId?: string;
  bomId?: string;
  bomMaterialType?: string;
  prototypeMaterialName?: string;
  partUse?: string;
  partUseName?: string;
  cuttingMethod?: string;
  cuttingMethodName?: string;
  dosageAccount?: string;
  materialRemarkList: IDesignCommonGetBomByIdResItemMaterialRemarkListItem[];
  /**
   * 「已废弃」
   * 「已废弃」
   */
  demandId?: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  demandCode?: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  demandTag?: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  fabricDemandTag?: string;
  demandType?: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  matchId?: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  matchCode?: string;
  commodityType?: string;
  commodityName?: string;
  flowerCategory?: string;
  commodityId?: string;
  commodityCode?: string;
  commodityNumber?: string;
  categoryCode?: string;
  categoryName?: string;
  skuId?: string;
  skuCode?: string;
  material?: string;
  matchPictureList: string[];
  matchSalePrice?: string;
  matchPurchaseUnitName?: string;
  packNumber?: string;
  packUnitName?: string;
  packAssistantUnitName?: string;
  minPrice?: string;
  minPriceUnit?: string;
  skuAttrs?: string;
  widthStrFormat?: string;
  saleUnit?: string;
  weightStrFormat?: string;
  colorName?: string;
  colorType?: string;
  warehouseColorInfo?: IDesignCommonGetBomByIdResItemWarehouseColorInfo;
  colorNumber?: string;
  matchSampleGuidePrice?: string;
  matchSampleUnit?: string;
  matchGuidePrice?: string;
  matchCostPriceUnit?: string;
  matchPurchaseGap?: string;
  meterPrice?: string;
  meterPriceUnit?: string;
  matchSource?: string;
  matcherName?: string;
  matchRemark?: string;
  unfinishedReason?: string;
  colorCardPictureList: string[];
  purchaseColorCardPictureList: string[];
  isConfirm?: string;
  sort?: string;
  widthConfirm?: string;
  supplierId?: string;
  supplierCode?: string;
  supplierName?: string;
  invoiceState?: string;
  priceReplyTime?: number;
  priceInvalidTime?: number;
  purchasePrice?: string;
  skuPrice?: string;
  accessoriesFlagId?: string;
  craftDemandInfoList: IDesignCommonGetBomByIdResItemCraftDemandInfoListItem[];
  purchaseApplyFollowCount?: string;
  dosageAccountUnit?: string;
  attritionRate?: string;
  bulkPurchasePrice?: string;
  bulkPurchasePriceUnit?: string;
  materialSnapshotId?: string;
  materialContextId?: string;
  isNoCraft?: string;
  enableState?: string;
  onShelfState?: string;
  supplyExistState?: string;
  bomMaterialIdCopy?: string;
  materialTypeCode?: string;
  materialType?: string;
  bomMaterialDemandId?: string;
  colorMatchMaterialState?: string;
  colorMatchMaterialName?: string;
  colorMatchMaterialId?: string;
  materialState?: string;
  replaceBomMaterialId?: string;
  samplePurchasingCycle?: string;
  samplePurchasingCycleUnit?: string;
  bulkPurchasingCycle?: string;
  bulkPurchasingCycleUnit?: string;
  isPlanning?: string;
  bandDate?: number;
  identifyMaterialId?: string;
  encryptionCommodityCode?: string;
  encryptionSkuCode?: string;
  encryptionCommodityName?: string;
  identifySelection?: boolean;
  materialImg?: string;
}

export interface IDesignCommonGetBomByIdResItemCraftDemandInfoListItem {
  craftDemandId?: string;
  designCode?: string;
  bomId?: string;
  bomMaterialId?: string;
  state?: string;
  category1?: string;
  category2?: string;
  category3?: string;
  craftsRequire?: string;
  undertakeType?: string;
  customerSupplyFactory?: string;
  innerFactoryId?: string;
  factoryName?: string;
  contactName?: string;
  contactPhone?: string;
  contactProvince?: string;
  contactCity?: string;
  contactRegion?: string;
  contactDetailAddress?: string;
  pictureList: string[];
  positionRequirement?: string;
  sizeRequirement?: string;
  colorRequirement?: string;
  weightRequirement?: string;
  otherRequirement?: string;
  thirdPartyCraftDemandId?: string;
  thirdPartyCraftDemandCode?: string;
  sampleCraftCycle?: string;
  sampleCraftCycleUnit?: string;
  bulkCraftCycle?: string;
  bulkCraftCycleUnit?: string;
  sampleUnit?: string;
  samplePrice?: string;
  bulkUnit?: string;
  bulkPrice?: string;
  creatorId?: string;
  createdTime?: number;
  creatorName?: string;
  materialDemandId?: string;
  prototypeId?: string;
  craftUnit?: string;
  isTransient?: string;
}

export interface IDesignCommonGetBomByIdResItemWarehouseColorInfo {
  skuId?: string;
  colorNumber?: string;
  skuCode?: string;
  remainingQuantity?: string;
  colorNumberDesc?: string;
  colorSystem?: string;
  warehouseName?: string;
  belongArea?: BELONG_AREA_ENUM;
  supplierRegion?: string;
  regionId?: string;
}

export interface IDesignCommonGetBomByIdResItemMaterialRemarkListItem {
  designRemarksId?: string;
  remark?: string;
  transientState?: string;
  creatorId?: string;
  createdName?: string;
  createdTime?: number;
}
