import type { REMARK_BIZ_TYPE_ENUM, YES_NO_STRING_ENUM } from '@/constant';

/**
 * 查询对象
 */
export interface IDesignerGroupDataListReq {
  id?: string;
  /**
   * 设计师组别编码
   */
  designerGroupCode?: string;
  /**
   * 设计师组别名称
   */
  designerGroupName?: string;
  /**
   * 创建人id
   */
  creatorId?: string;
  /**
   * 更新人id
   */
  reviserId?: string;
  /**
   * 创建时间
   */
  createdTime?: string;
  /**
   * 更新时间
   */
  revisedTime?: string;
  /**
   * 逻辑删除 0 否 1是
   */
  isDeleted?: string;
  pageNum?: string;
  pageSize?: string;
}

export interface IDesignerGroupDataListItem {
  id: string;
  /**
   * 设计师组别编码
   */
  designerGroupCode: string;
  /**
   * 设计师组别名称
   */
  designerGroupName: string;
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
}

export type IDesignerGroupDataListRes = IDesignerGroupDataListItem[];

export interface UserItem {
  accountType?: string; // 账号类型
  bbCode?: string; // 员工编码
  email?: string; // 邮箱
  enabled?: YES_NO_STRING_ENUM; // 是否启用
  mobilePhone?: string; // 手机好吗
  userId: string; // 用户id
  userName: string; // 用户名称
}

/**
 * 查询对象
 */
export interface IDesignerListReq {
  /**
   * 设计师名称【设计师】
   */
  designerName?: string;
  /**
   * 设计师组别编码
   */
  designerGroupCode?: string;
  pageNum?: string;
  pageSize?: string;
}

export interface IDesignerListItem {
  id: string;
  /**
   * 设计师id【设计师】
   */
  designerId: string;
  /**
   * 设计师编号【设计师】
   */
  designerCode: string;
  /**
   * 设计师名称【设计师】
   */
  designerName: string;
  /**
   * 设计师组别编码
   */
  designerGroupCode: string;
  /**
   * 设计师组别名称
   */
  designerGroupName: string;
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
   * 手機號碼
   */
  mobilePhone: string;
}
export type IDesignerListRes = IDesignerListItem[];

export type IDeliveryListReq = Record<string, unknown>;
export interface IDeliveryListItem {
  /**
   * 新增成功后会返回主键的值IdType.AUTO
   */
  id: string;
  /**
   * 交期类型
   */
  deliveryType: string;
  /**
   * 交期类型code
   */
  deliveryTypeCode: string;
  /**
   * 交期天数
   */
  deliveryDate: string;
  /**
   * 标签状态是否启用 0 否 1是-看需要冗余添加
   */
  isEnabled: string;
  /**
   * 修改人id
   */
  reviserId: string;
  /**
   * 更新时间
   */
  revisedTime: string;
  /**
   * 是否删除：0否 1 是
   */
  isDeleted: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 创建时间
   */
  createdTime: string;
}
export type IDeliveryListRes = IDeliveryListItem[];

export interface ISizeHoppingRulesListReq {
  /**
   * 尺码跳码规则状态是否启用 0 否 1是
   */
  enabled?: string;
  standardSizeCode?: string;
}
export type ISizeHoppingRulesListRes = {
  id: string;
  /**
   * 尺码标准 international_size_code|国际码 ,eus_size_code|欧美码 ,us_size_code|美国码 ,chinese_size_code|中国码
   */
  standardSizeName: string;
  /**
   * 跳码规则
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
}[];

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

export interface IClothesPartsSizeListReq {
  /**
   * 部位名称
   */
  clothesPartsName?: string;
  /**
   * 状态是否启用 0 否 1是-看需要冗余添加
   */
  isEnabled?: string;
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

export type IClothesPartsSizeListRes = IClothesPartsSizeListItem[];

/**
 * 请求
 */
export interface IClothingModelListReq {
  /**
   * 版型名称(模糊)
   */
  modelNameLike?: string;
  /**
   * 打版品类(code1,code2,code3)
   */
  category?: string;
  /**
   * 版型标签
   */
  tagSet?: IClothingModelListTagSetItem[];
  pageNum?: string;
  pageSize?: string;
}

/**
 * 子标签
 */
export interface IClothingModelListNext {
  /**
   * 标签编码
   */
  code?: string;
  /**
   * 标枪名称
   */
  name?: string;
}
export interface IClothingModelListRes {
  page: string;
  total: string;
  list: IClothingModelListListItem[];
}
export interface IClothingModelListListItem {
  id: string;
  /**
   * 打版品类(code1-code2-code3)
   */
  category: string;
  /**
   * 版型名称
   */
  modelName: string;
  /**
   * 电子纸样文件名
   */
  designFileName: string;
  /**
   * 电子纸样url
   */
  designFileUrl: string;
  /**
   * 纸样预览图片url
   */
  designUrlSet: string[];
  /**
   * 成衣预览图片url
   */
  sampleUrlSet: string[];
  /**
   * 标签
   */
  tagSet: IClothingModelListTagSetItem[];
  /**
   * 操作日志
   */
  operationLogList: IClothingModelListOperationLogListItem[];
}
export interface IClothingModelListTagSetItem {
  /**
   * 标签编码
   */
  code:
  | 'COAT_STYLE'
  | 'CONTOUR_STYLE'
  | 'ELASTICITY_STYLE'
  | 'SLEEVE_STYLE'
  | 'SHOULDER_STYLE'
  | 'COLLAR_STYLE'
  | 'PANTS_STYLE'
  | 'SKIRT_STYLE'
  | 'CLOTHES_LENGTH_STYLE'
  | 'SLEEVE_LENGTH_STYLE'
  | 'WAIST_STYLE'
  | 'PANTS_LENGTH_STYLE'
  | 'SKIRT_LENGTH_STYLE'
  | 'FABRIC_STYLE';
  /**
   * 标签名称
   */
  name: string;
  /**
   * 子标签
   */
  next: IClothingModelListNextItem[];
}
export interface IClothingModelListNextItem {
  id: string;
  /**
   * 标签名称
   */
  name: string;
  /**
   * 标签编码
   */
  code: string;
  /**
   * 父标签编码
   */
  parentCode: string;
  /**
   * 标签状态1-启用 2-停用
   */
  status: string;
  /**
   * 创建人ID
   */
  creator: string;
  createdTime: string;
  revisedTime: string;
}
export interface IClothingModelListOperationLogListItem {
  /**
   * 业务ID
   */
  buzId: string;
  /**
   * 操作说明
   */
  content: string;
  /**
   * 业务类型 1-版型 2-版型标签
   */
  buzType: 'MODEL' | 'PROTOTYPE' | 'DESIGN_FILE' | 'DESIGN_TAG';
  /**
   * 操作人id
   */
  creator: string;
  /**
   * 操作人名称
   */
  createdName: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 更新时间
   */
  revisedTime: string;
}

export interface IListNameReq {
  /**
   * 版房名称
   */
  name: string;
  /**
   * 启用还是禁用 YES|NO
   */
  enable?: 'NO' | 'YES';
  /**
   * 外发环节类型
   */
  outsourceTypeList?: ('DESIGN' | 'MAKE' | 'DESIGN_AND_MAKE')[];
}
/**
 * 响应数据
 */
export interface IListNameItem {
  /**
   * 版房ID
   */
  roomId: string;
  /**
   * 版房编号
   */
  roomCode: string;
  /**
   * 版房名称
   */
  roomName: string;
  /**
   * 版房类型 外版房-OUTSIDE_ROOM 内版房-WIHIN_ROOM
   */
  roomType: string;
  /**
   * 联系人
   */
  roomContactName: string;
  /**
   * 联系电话
   */
  roomContactPhone: string;
  /**
   * 省
   */
  roomAddressProvince: string;
  /**
   * 市
   */
  roomAddressCity: string;
  /**
   * 区
   */
  roomAddressArea: string;
  /**
   * 详细地址
   */
  roomDetailAddress: string;
  averageDailyOutput: IListNameAverageDailyOutput;
  personnelAllocation: IListNamePersonnelAllocation;
  /**
   * 设备情况
   */
  equipmentSituation: string;
  /**
   * 服务类型
   */
  serviceType: string[];
  /**
   * 擅长品类
   */
  goodAtCategory: string[];
  /**
   * 历史客户
   */
  historicalCustomers: string;
  /**
   * 身份证号码
   */
  idCard: string;
  /**
   * 身份证照片地址
   */
  idCardPictureUrl: string[];
  /**
   * 银行卡图片地址
   */
  bankCardPictureUrl: string[];
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
  createdTime: string;
  /**
   * 业务归属 “4广州”|“8杭州”
   */
  regionId: string;
  /**
   * 版房类型
   */
  externalRoomEnum: 'COOPERATIVE_ROOM' | 'SHARED_ROOM' | 'PART_TIME_ROOM';
  externalRoomTeam: IListNameExternalRoomTeam;
  /**
   * 启用还是禁用 YES|NO
   */
  enable: 'NO' | 'YES';
  /**
   * 账户类型（公账单/私账）
   */
  accountType: string;
  /**
   * 开户账号(卡号)
   */
  bankCardNumber: string;
  /**
   * 账户名称
   */
  accountName: string;
  /**
   * 开户行及支行
   */
  openingBank: string;
  /**
   * 银行名称
   */
  bankName: string;
  /**
   * 银行所在省
   */
  bankProvince: string;
  /**
   * 银行所在市
   */
  bankCity: string;
}
export type IListNameRes = IListNameItem[];

/**
 * 日产均量 json
 */
export interface IListNameAverageDailyOutput {
  /**
   * 整件女装value
   */
  wholeWomenClothing: string;
  /**
   * 整件男装value
   */
  wholeMenClothing: string;
  /**
   * 整件童装value
   */
  wholeChildrenClothing: string;
  /**
   * 车版女装value
   */
  makeWomenClothing: string;
  /**
   * 车版男装value
   */
  makeMenClothing: string;
  /**
   * 车版童装value
   */
  makeChildrenClothing: string;
}
/**
 * 人员配置 json
 */
export interface IListNamePersonnelAllocation {
  /**
   * 纸样师傅value
   */
  designMaster: string;
  /**
   * 车版师傅value
   */
  makeMaster: string;
  /**
   * 兼职纸样师傅value
   */
  partTimeMaster: string;
  /**
   * 兼职车版师傅value
   */
  partTimeMake: string;
}
/**
 * 外发团队信息
 */
export interface IListNameExternalRoomTeam {
  /**
   * 角色类型
   */
  userRoles: ('TEAM_ADMIN' | 'SAMPLE' | 'MAKE_SAMPLE')[];
  /**
   * 用户名称
   */
  userName: string;
  /**
   * 手机号
   */
  phone: string;
  /**
   * 管理员或其他 的ID
   */
  id: string;
  /**
   * 队员
   */
  playerList: IListNamePlayerListItem[];
}
export interface IListNamePlayerListItem {
  /**
   * 租户ID
   */
  id: string;
  /**
   * 账号（当添加管理员才传）
   */
  account: string;
  /**
   * 用户名
   */
  userName: string;
  /**
   * 手机号
   */
  phone: string;
  /**
   * 用户角色,（支持多选不同角色）
   */
  userRoles: ('TEAM_ADMIN' | 'SAMPLE' | 'MAKE_SAMPLE')[];
  /**
   * 服务类型
   */
  serviceType: string[];
  /**
   * 擅长品类
   * 女装-上装-连衣裙
   */
  goodAtCategory: string[];
  /**
   * 当前队员的操作类型 （1:添加、2：删除、3：编辑）
   */
  type: string;
}

export interface IPurchaserItem {
  departmentId: string;
  purchaserCode: string;
  purchaserId: string;
  purchaserMobile: string;
  purchaserName: string;
  purchaserPrimaryId: string;
  purchaserType: string;
  workerId: string;
  workerMobile: string;
  workerName: string;
}

export interface IIPurchaserListRes {
  page: string;
  total: string;
  list: IPurchaserItem[];
}

export type ITechniqueGroupPageReq = Record<string, unknown>;
export interface ITechniqueGroupPageRes {
  page: string;
  total: string;
  list: ITechniqueGroupPageListItem[];
}
export interface ITechniqueGroupPageListItem {
  groupId: string;
  /**
   * 技术组别编码
   */
  techniqueGroupCode: string;
  /**
   * 技术组别名称
   */
  techniqueGroupName: string;
  /**
   * 区域id
   */
  regionId: string;
  /**
   * 区域名称
   */
  regionName: string;
  /**
   * 销售群体
   */
  saleGroupList: ITechniqueGroupPageSaleGroupListItem[];
  /**
   * 状态: 0-停用 、1-启用
   */
  isEnabled: string;
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
  createdTime: string;
  /**
   * 修改人id
   */
  reviserId: string;
  /**
   * 修改人名称
   */
  reviserName: string;
  /**
   * 修改时间
   */
  revisedTime: string;
}
export interface ITechniqueGroupPageSaleGroupListItem {
  /**
   * 销售群体ops-code
   */
  groupCode: string;
  /**
   * 销售群体名称
   */
  groupName: string;
}

export interface IClothingMaterialClothingTagReq {
  subTag: boolean; // ---false 查出所有 true 只查父标签
}
export type IClothingMaterialClothingTagRes = TagItem[];

export interface TagItem {
  /**
   * 标签编码
   */
  code:
  | 'COAT_STYLE'
  | 'CONTOUR_STYLE'
  | 'ELASTICITY_STYLE'
  | 'SLEEVE_STYLE'
  | 'SHOULDER_STYLE'
  | 'COLLAR_STYLE'
  | 'PANTS_STYLE'
  | 'SKIRT_STYLE'
  | 'CLOTHES_LENGTH_STYLE'
  | 'SLEEVE_LENGTH_STYLE'
  | 'WAIST_STYLE'
  | 'PANTS_LENGTH_STYLE'
  | 'SKIRT_LENGTH_STYLE'
  | 'FABRIC_STYLE' | string;

  /**
   * 标签名称
   */
  name: string;
  /**
   * 子标签
   */
  next: IClothingMaterialClothingTagNextItem[];
}
export interface IClothingMaterialClothingTagNextItem {
  id: string;
  /**
   * 标签名称
   */
  name: string;
  /**
   * 标签编码
   */
  code: string;
  /**
   * 父标签编码
   */
  parentCode: string;
  /**
   * 标签状态1-启用 2-停用
   */
  status: string;
  /**
   * 创建人ID
   */
  creator: string;
  createdTime: string;
  revisedTime: string;
}

/**
 * 分页对象
 */
export interface IReworkResponsibilityPageReq {
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
  /**
   * 当前查询的页码
   */
  pageNum?: string | number;
  /**
   * 当前查询单页的数据量
   */
  pageSize?: string | number;
}
/**
 * 响应数据
 */
export interface IReworkResponsibilityPageRes {
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
  list: IReworkResponsibilityPageListItem[];
}
export interface IReworkResponsibilityPageListItem {
  dutyId: string;
  /**
   * 编码
   */
  code: string;
  /**
   * 返修/复版责任方
   */
  reworkingDuty: string;
  /**
   * 计费规则（1-计费，0-不计费）
   */
  payCostRule: 'CHARGING' | 'UN_CHARGING';
  /**
   * 收费规则（1-计费，0-不计费）
   */
  receiveCostRule: 'CHARGING' | 'UN_CHARGING';
  /**
   * 返修计费影响（1-仅纸样，2-仅车版，3-纸样+车版）
   */
  repairChargingAffects: Array<'PATTERN' | 'SEWING' | 'PATTERN_SEWING'>;
  /**
   * 返修类型（1-仅纸样，2-仅车版，3-纸样+车版）
   */
  repairTypes: number[];
  /**
   * 状态（1-启用，0-停用）
   */
  state: string;
  /**
   * 更新人name
   */
  reviserName: string;
}

/**
 * 设计打版备注信息对象
 */
export interface IRemarksSaveReq {
  /**
   * 业务id
   */
  bizId: string;
  /**
   * 业务类型  MATERIAL_PURCHASE：采购申请、BOM_ORDER：开发bom、MATERIAL_CONFIRM：物料确认、DESIGN_PROTOTYPE：设计拆版、CANCELLED：已取消
   */
  bizType: REMARK_BIZ_TYPE_ENUM;
  /**
   * 备注信息
   */
  remark: string;
}
/**
 * 响应数据
 */
export interface IRemarksSaveRes {
  /**
   * 自增id
   */
  designRemarksId: string;
  /**
   * 业务id
   */
  bizId: string;
  /**
   * 业务类型
   */
  bizType: string;
  /**
   * 打版信息id
   */
  prototypeId: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode: string;
  /**
   * 版本号
   */
  versionNum: string;
  /**
   * 业务版本号
   */
  bizVersionNum: string;
  /**
   * 备注信息
   */
  remark: string;
  /**
   * 操作人id
   */
  creatorId: string;
  /**
   * 操作人名称
   */
  createdName: string;
  /**
   * 创建时间
   */
  createdTime: string;
}
/**
 * 备注 请求参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/103411
 */
export interface DevelopStyleRemarkReq {
  /** 任务id */
  taskId: string;
  /** 备注信息 */
  remark: string;
}
/**
 * 备注 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/103411
 */
export interface DevelopStyleRemarkRes {}
