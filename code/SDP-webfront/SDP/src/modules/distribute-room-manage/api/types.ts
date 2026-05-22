import { YES_NO_ENUM } from '@/constant';
import { PAYMENT_CHANNEL_ENUM } from '../constant';

export type YesOrNo = 'YES' | 'NO';

export type RoomType = 'OUTSIDE_ROOM' | 'WIHIN_ROOM';
export type ExternalRoomType = 'COOPERATIVE_ROOM' | 'SHARED_ROOM' | 'PART_TIME_ROOM' | 'SUPPLIER_ROOM';

// 查询条件
export interface SearchParamsType {
  serviceType: string; // 服务类型
  roomAddressProvince: string; // 省
  roomAddressCity: string; // 城市
  roomAddressArea: string; // 区
  goodAtCategory?: string; // 擅长品类
  goodAtCategorys?: string[];
  roomName: string; // 外发版房名称
  regionId: string; // 业务归属
  enable: YesOrNo | ''; // 启用YES | 停用NO
  externalRoomEnum: ExternalRoomType | ''; // 版房类型
  createdTimeEnd: string; // 创建时间
  createdTimeStart: string; // 创建时间
  pageNum: number;
  pageSize: number;
}
// 人员配置
export interface PersonnelAllocation {
  partTimeMake: number; // 兼职车版师傅人数
  designMaster: number; // 纸样师傅人数
  makeMaster: number; // 车版师傅人数
  partTimeMaster: number; // 兼职纸样师傅人数
}
// 日均产量
export interface AverageDailyOutput {
  wholeWomenClothing: number; // 整件女装数量
  makeWomenClothing: number; // 车版女装数量
  wholeMenClothing: number; // 整件男装数量
  makeMenClothing: number; // 车版男装数量
  makeChildrenClothing: number; // 车版童装数量
  wholeChildrenClothing: number; // 整件童装数量
}
// 列表项
export interface CooperationItem {
  enable: YesOrNo; // 状态
  roomName: string; // 版房名称
  serviceType: string; // 服务类型
  roomContactPhone: string; // 联系电话
  goodAtCategory: string; // 擅长品类
  bankCardNumber: string; // 开户账号
  accountName: string; // 银行名称
  personnelAllocation: PersonnelAllocation; // 人员配置
  idCard: number; // 身份证号
  idCardPictureUrl: string[]; // 身份证正反面图片
  averageDailyOutput: AverageDailyOutput; // 日均产量
  roomCode: string; // 外发版房Code
  roomId: string; // 客外发版房ID
  openingBank: string; // 开户行及支行
  roomAddressProvince: string; // 省
  roomAddressCity: string; // 市
  roomAddressArea: string; // 区
  roomDetailAddress: string; // 详细地址
  roomContactName: string; // 联系人
  createdTime: string; // 创建时间
  createdName: string; // 创建人名称
  historicalCustomers: string; // 历史客户
  roomType: RoomType; // 版房类型 外版房-OUTSIDE_ROOM 内版房-WIHIN_ROOM
  bankCardPictureUrl: string[]; // 银行卡图片地址
  creator: string; // 创建人ID
  equipmentSituation: string; // 设备情况
}

// 通过支行名称模糊搜索相关银行信息
export type IWebClothingRoomRes = {
  /**
   * 银行名称
   */
  bankName: string;
  /**
   * 省
   */
  province: string;
  /**
   * 市
   */
  city: string;
  /**
   * 支行名称
   */
  branchName: string;
  /**
   * 联行号
   */
  branchCode: string;
}[];

// 外发版房列表
/**
 * 日产均量 json
 */
export interface IClothingRoomListAverageDailyOutput {
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
export interface IClothingRoomListPersonnelAllocation {
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

export interface IClothingRoomListPlayerListItem {
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

export interface IClothingRoomListExternalRoomTeam {
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
  playerList: IClothingRoomListPlayerListItem[];
}
export interface IClothingRoomListListItem {
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
   * 经营类型：1-净色 2-花型 3-净色&花型
   */
  operationType?: string;
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
  averageDailyOutput: IClothingRoomListAverageDailyOutput;
  personnelAllocation: IClothingRoomListPersonnelAllocation;
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
   * 账户名称(银行名称)
   */
  accountName: string;
  /**
   * 身份证号码
   */
  idCard: string;
  /**
   * 身份证照片地址
   */
  idCardPictureUrl: string[];
  /**
   * 开户账号
   */
  bankCardNumber: string;
  /**
   * 开户行及支行
   */
  openingBank: string;
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
  createdName: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 更新时间
   */
  revisedTime: string;
  /**
   * 业务归属 “4广州”|“8杭州”
   */
  regionId: string;
  /**
   * 版房类型
   */
  externalRoomEnum: ExternalRoomType;
  externalRoomTeam: IClothingRoomListExternalRoomTeam;
  /**
   * 启用还是禁用 YES|NO
   */
  enable: 'NO' | 'YES';
}

export interface IClothingRoomListReq {
  /**
   * 版房名称
   */
  roomName?: string;
  /**
   * 省
   */
  roomAddressProvince?: string;
  /**
   * 市
   */
  roomAddressCity?: string;
  /**
   * 区
   */
  roomAddressArea?: string;
  /**
   * 服务类型
   */
  serviceType?: string;
  /**
   * 擅长品类
   */
  goodAtCategory?: string;
  /**
   * 业务归属 “广州4”|“杭州8”  原先的百布的接口返回的区域ID
   */
  regionId?: string;
  /**
   * 版房类型,如不传默认是《合作版房》
   */
  externalRoomEnum?: ExternalRoomType;
  /**
   * 启用还是禁用 YES|NO
   */
  enable?: 'NO' | 'YES';
  /**
   * 当前用户ID
   */
  currentUserId?: string;
  /**
   * 当前登录用户名称
   */
  currentUserName?: string;
  /**
   * 当前查询的页码
   */
  pageNum?: string;
  /**
   * 当前查询单页的数据量
   */
  pageSize?: string;
  /**
   * 是否是印花供应商，固定传“1”
   */
  digitalDraftAble?: YES_NO_ENUM;
}

export interface IClothingRoomListRes {
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
  list: IClothingRoomListListItem[];
}

/**
 * 版房详情
 */

/**
 * 版房详情
 */
/**
 * 日产均量 json
 */
export interface IClothingRoomDetailAverageDailyOutput {
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
export interface IClothingRoomDetailPersonnelAllocation {
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

export type TuserRole = 'TEAM_ADMIN' | 'SAMPLE' | 'MAKE_SAMPLE';

export interface IClothingRoomDetailPlayerListItem {
  /**
   * 租户ID
   */
  id?: string;
  /**
   * 账号（当添加管理员才传）
   */
  account?: string;
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
  userRoles: TuserRole[];
  /**
   * 服务类型
   */
  serviceType: string[];
  /**
   * 擅长品类
   * 女装-上装-连衣裙
   */
  goodAtCategory: string[];

  goodAtCategorys: string[][];
  /**
   * 当前队员的操作类型 （1:添加、2：删除、3：编辑）
   */
  type: string;
}

/**
 * 外发团队信息
 */
export interface IClothingRoomDetailExternalRoomTeam {
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
  playerList: IClothingRoomDetailPlayerListItem[];
}

export interface IClothingRoomDetailClothingRoomInfoVo {
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
   * 经营类型：1-净色 2-花型 3-净色&花型
   */
  operationType: string;
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
  averageDailyOutput: IClothingRoomDetailAverageDailyOutput;
  personnelAllocation: IClothingRoomDetailPersonnelAllocation;
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
  createdName: string;
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
  externalRoomEnum: ExternalRoomType;
  externalRoomTeam: IClothingRoomDetailExternalRoomTeam;
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
  paymentChannel: PAYMENT_CHANNEL_ENUM | '';
  taxSubsidyFeeRate: string;
}

export interface IClothingRoomDetailClothingRoomLogVosItem {
  /**
   * 自增id
   */
  id: string;
  /**
   * 版房id
   */
  roomId: string;
  /**
   * 操作说明
   */
  content: string;
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
  /**
   * 更新时间
   */
  revisedTime: string;
}

export interface IClothingRoomDetailRes {
  clothingRoomInfoVo: IClothingRoomDetailClothingRoomInfoVo;
  /**
   * 版房操作日志
   */
  clothingRoomLogVos: IClothingRoomDetailClothingRoomLogVosItem[];
}

/**
 * 修改版房信息
 */

export interface IWebClothingRoomPlayerListItem {
  /**
   * 租户ID
   */
  id?: string;
  /**
   * 账号（当添加管理员才传）
   */
  account?: string;
  /**
   * 用户名
   */
  userName?: string;
  /**
   * 手机号
   */
  phone?: string;
  /**
   * 用户角色,（支持多选不同角色）
   */
  userRoles?: ('TEAM_ADMIN' | 'SAMPLE' | 'MAKE_SAMPLE')[];
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
  type?: string;
}
/**
 * 外发团队信息
 */
export interface IWebClothingRoomExternalRoomTeam {
  /**
   * 角色类型
   */
  userRoles: ('TEAM_ADMIN' | 'SAMPLE' | 'MAKE_SAMPLE')[];
  /**
   * 用户名称
   */
  userName?: string;
  /**
   * 手机号
   */
  phone?: string;
  /**
   * 管理员或其他 的ID
   */
  id?: string;
  /**
   * 队员
   */
  playerList?: IWebClothingRoomPlayerListItem[];
}

/**
 * 日产均量 json
 */
export interface IWebClothingRoomAverageDailyOutput {
  /**
   * 整件女装value
   */
  wholeWomenClothing?: string;
  /**
   * 整件男装value
   */
  wholeMenClothing?: string;
  /**
   * 整件童装value
   */
  wholeChildrenClothing?: string;
  /**
   * 车版女装value
   */
  makeWomenClothing?: string;
  /**
   * 车版男装value
   */
  makeMenClothing?: string;
  /**
   * 车版童装value
   */
  makeChildrenClothing?: string;
}
/**
 * 人员配置 json
 */
export interface IWebClothingRoomPersonnelAllocation {
  /**
   * 纸样师傅value
   */
  designMaster?: string;
  /**
   * 车版师傅value
   */
  makeMaster?: string;
  /**
   * 兼职纸样师傅value
   */
  partTimeMaster?: string;
  /**
   * 兼职车版师傅value
   */
  partTimeMake?: string;
}

export interface IWebClothingRoomReq {
  /**
   * 版房ID
   */
  roomId: string;

  roomCode: string;

  roomContactId: string;
  /**
   * 联系人
   */
  roomContactName?: string;
  /**
   * 联系电话
   */
  roomContactPhone?: string;
  /**
   * 省
   */
  roomAddressProvince?: string;
  /**
   * 市
   */
  roomAddressCity?: string;
  /**
   * 区
   */
  roomAddressArea?: string;
  /**
   * 详细地址
   */
  roomDetailAddress?: string;
  averageDailyOutput?: IWebClothingRoomAverageDailyOutput;
  personnelAllocation?: IWebClothingRoomPersonnelAllocation;
  /**
   * 设备情况
   */
  equipmentSituation?: string;
  /**
   * 服务类型
   */
  serviceType?: string[];
  /**
   * 擅长品类
   * 女装-上装-连衣裙
   */
  goodAtCategory?: string[];
  /**
   * 历史客户
   */
  historicalCustomers?: string;
  /**
   * 账户名称
   */
  accountName?: string;
  /**
   * 身份证号码
   */
  idCard?: string;
  /**
   * 身份证照片地址
   */
  idCardPictureUrl?: string[];
  /**
   * 开户账号
   */
  bankCardNumber?: string;
  /**
   * 开户行及支行
   */
  openingBank?: string;
  bankName?: string;
  bankProvince?: string;
  bankCity?: string;
  /**
   * 银行卡图片地址
   */
  bankCardPictureUrl?: string[];
  /**
   * 业务归属 “广州4”|“杭州8”  原先的百布的接口返回的区域ID
   */
  regionId?: string;
  /**
   * 版房类型
   */
  externalRoomEnum: ExternalRoomType;
  externalRoomTeam?: IWebClothingRoomExternalRoomTeam;

  bankFrontImage?: string;
  bankBackImage?: string;
  idCardBackImage?: string;
  idCardFrontImage?: string;
  paymentChannel?: PAYMENT_CHANNEL_ENUM | '';
  taxSubsidyFeeRate?: string;
}

/**
 * 添加/更新 版房队员信息
 */
export interface IClothingRoomAddOrUpdateRoomTeamPlayerListItem {
  /**
   * 租户ID
   */
  id?: string;
  /**
   * 账号（当添加管理员才传）
   */
  account?: string;
  /**
   * 用户名
   */
  userName?: string;
  /**
   * 手机号
   */
  phone?: string;
  /**
   * 用户角色,（支持多选不同角色）
   */
  userRoles?: ('TEAM_ADMIN' | 'SAMPLE' | 'MAKE_SAMPLE')[];
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
  type?: string;
}
export interface IClothingRoomAddOrUpdateRoomTeamReq {
  /**
   * 版房id
   */
  roomId: string;
  /**
   * 队员
   */
  playerList?: IClothingRoomAddOrUpdateRoomTeamPlayerListItem[];
}

/**
 * 查询系统下的所有租户，带分页
 */
export interface ICompanyPageReq {
  systemCodeArray?: string[];
  status?: string;
  companyName?: string;
  currentPage?: string;
  pageSize?: string;
  secretKey?: string;
  operatorUserCode?: string;
  operatorUserId?: string;
  /**
   * @NotEmpty(message = "系统编码不能为空")
   */
  systemCode?: string;
}

export interface ICompanyPagePageDataItem {
  companyId: string;
  companyName: string;
  companyCode: string;
  managerPhone: string;
  managerUsername: string;
  managerUserId: string;
  email: string;
  remark: string;
  createBy: string;
  createTime: string;
  status: string;
}

export interface ICompanyPageRes {
  totalPage: string;
  pageData: ICompanyPagePageDataItem[];
  totalCount: string;
  currentPage: string;
  pageSize: string;
  offset: string;
}

/**
 * 请求系统角色编码（systemCode入参为外协系统的CODE）
 */
export interface IClothingRoomQueryRolesReq {
  /**
   * 角色名称
   */
  roleName?: string;
  /**
   * 公司编码（租户编码/版房编码）
   */
  companyCode?: string;
  /**
   * 公司id（租户Id/版房ID）
   */
  companyId: string;
  /**
   * 系统编码
   */
  systemCode: string;
}

export interface IClothingRoomQueryRoleItem {
  id: string;
  roleId: string;
  roleCode: string;
  roleName: string;
  companyName: string;
  systemName: string;
  systemCode: string;
  status: string;
  roleType: string;
  statusName: string;
  remark: string;
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string;
}
export type IClothingRoomQueryRolesRes = IClothingRoomQueryRoleItem[];

// 添加 版房队员信息

export interface IClothingRoomAddRoomUserUserRolesItem {
  /**
   * 角色Id
   */
  roleId?: string;
  /**
   * 角色编码
   */
  roleCode?: string;
  /**
   * 角色名称
   */
  roleName?: string;
}
export interface IClothingRoomAddRoomUserReq {
  /**
   * 姓名
   */
  userName?: string;
  /**
   * 手机号码
   */
  phone?: string;
  /**
   * 版房表主键(租户id)
   */
  roomId?: string;
  /**
   * 版房表编码(租户code)
   */
  roomCode?: string;
  /**
   * 版房类型的code 1: 合作版房 2: 共享版房 3: 兼职版房
   */
  externalRoomCode?: string;
  /**
   * 用户角色,（支持多选不同角色）
   */
  userRoles: IClothingRoomAddRoomUserUserRolesItem[];
  /**
   * 服务类型
   */
  serviceType: string[];
  /**
   * 擅长品类
   * 女装-上装-连衣裙
   */
  goodAtCategory: string[];
}
export type IClothingRoomAddRoomUserRes = null;

/**
 * 更新 版房队员信息
 */
export interface IClothingRoomUpdateRoomUserReq {
  /**
   * id
   */
  userId?: string;
  /**
   * 姓名
   */
  userName?: string;
  /**
   * 版房表主键(租户id)
   */
  roomId?: string;
  /**
   * 版房类型的code 1: 合作版房 2: 共享版房 3: 兼职版房
   */
  externalRoomCode?: string;
  /**
   * 用户角色,（支持多选不同角色）
   */
  userRoles: IClothingRoomAddRoomUserUserRolesItem[];
  /**
   * 服务类型
   */
  serviceType: string[];
  /**
   * 擅长品类
   */
  goodAtCategory: string[];
  /**
   * 是否启动{0=未启用，1=已启用}
   */
  isEnabled?: string;
}

export type IClothingRoomUpdateRoomUserRes = null;

// 通过版房id查询版房团队信息
export interface IClothingRoomRoomTeamItem {
  /**
   * id
   */
  userId: string;
  /**
   * SSO系统用户ID
   */
  ssoUserId: string;
  /**
   * 账号
   */
  account: string;
  /**
   * 姓名
   */
  userName: string;
  /**
   * 手机号码
   */
  phone: string;
  /**
   * 版房表主键
   */
  roomId: string;
  /**
   * 用户角色,（支持多选不同角色）
   */
  userRoles: IClothingRoomAddRoomUserUserRolesItem[];
  /**
   * 服务类型
   */
  serviceType: string[];
  /**
   * 擅长品类
   */
  goodAtCategory: string[];
  goodAtCategorys?: string[][];
  /**
   * 版房类型的code 1: 合作版房 2: 共享版房 3: 兼职版房
   */
  externalRoomCode: string;
  /**
   * 是否启动{0=未启用，1=已启用}
   */
  isEnabled: string;
  userRoleList?: string[];
  isModify?: boolean;
}
export type IClothingRoomRoomTeamRes = IClothingRoomRoomTeamItem[];
