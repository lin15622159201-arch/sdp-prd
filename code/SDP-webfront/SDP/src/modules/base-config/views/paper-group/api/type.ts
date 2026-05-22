// 分页https://yapi.ibaibu.com/project/1302/interface/api/111904
export interface IGroupPageReq {
  pageNum?: string;
  pageSize?: string;
}

export interface IGroupPageListItem {
  groupId: string;
  /**
   * 组别类型； 1:纸样师组别
   */
  groupType: string;
  /**
   * 组别编码
   */
  groupCode: string;
  /**
   * 组别名称
   */
  groupName: string;
}

export interface IGroupPageRes {
  page: string;
  total: string;
  list: IGroupPageListItem[];
}

// 新增
export interface IGroupAddReq {
  /**
   * 组别名称
   */
  groupName: string;
  /**
   * 组别类型
   */
  groupType: 'GROUP_TYPE_PATTERN';
}
export interface IGroupAddRes {
  groupId: string;
  /**
   * 组别类型； 1:纸样师组别
   */
  groupType: string;
  /**
   * 组别编码
   */
  groupCode: string;
  /**
   * 组别名称
   */
  groupName: string;
}

// 修改
export interface IGroupModifyReq {
  /**
   * 组别主键ID
   */
  groupId: string;
  /**
   * 组别名称
   */
  groupName: string;
}
export interface IGroupModifyRes {
  groupId: string;
  /**
   * 组别类型； 1:纸样师组别
   */
  groupType: string;
  /**
   * 组别编码
   */
  groupCode: string;
  /**
   * 组别名称
   */
  groupName: string;
}

export type IGroupRemoveReq = Record<string, unknown>;
export type IGroupRemoveRes = null;

// 组别用户管理
/**
 * : 分页查询参数
 */
export interface IGroupUserPageReq {
  /**
   * 组别名称
   */
  userName?: string;
  /**
   * 组别类型
   */
  groupType: 'GROUP_TYPE_PATTERN';
  pageNum?: number;
  pageSize?: number;
  groupCode?: string;
}

export interface IGroupUserPageListItem {
  /**
   * ID
   */
  groupUserId: string;
  /**
   * 用户ID
   */
  userId: string;
  /**
   * 用户名称
   */
  userName: string;
  /**
   * 用户编号
   */
  userCode: string;
  /**
   * 组别编码
   */
  groupCode: string;
  /**
   * 组别类型； 1:纸样师组别
   */
  groupType: 'GROUP_TYPE_PATTERN';
  /**
   * 扩展信息
   */
  extInfo: string;
  /**
   * 手机号码
   */
  phone: string;
  /**
   * 区域名称
   */
  regionName: string;
  /**
   * 区域ID
   */
  regionId: string;
}
export interface IGroupUserPageRes {
  page: string;
  total: string;
  list: IGroupUserPageListItem[];
}

/**
 * : 新增参数
 */
export interface IGroupUserAddReq {
  /**
   * 用户ID
   */
  userId: string;
  /**
   * 用户编号
   */
  userCode: string;
  /**
   * 用户名称
   */
  userName: string;
  /**
   * 组别编号
   */
  groupCode: string;
  /**
   * 组别类型
   */
  groupType: 'GROUP_TYPE_PATTERN';
  phone: string;
  regionName: string;
  regionId: string;
  /**
   * 拓展字段属性
   */
  extInfo?: string;
}
export interface IGroupUserAddRes {
  /**
   * ID
   */
  groupUserId: string;
  /**
   * 用户ID
   */
  userId: string;
  /**
   * 用户名称
   */
  userName: string;
  /**
   * 用户编号
   */
  userCode: string;
  /**
   * 组别编码
   */
  groupCode: string;
  /**
   * 组别类型； 1:纸样师组别
   */
  groupType: string;
  /**
   * 扩展信息
   */
  extInfo: string;
  /**
   * 手机号码
   */
  phone: string;
  /**
   * 区域名称
   */
  regionName: string;
  /**
   * 区域ID
   */
  regionId: string;
}
/**
 * :
 */
export interface IGroupUserResetReq {
  /**
   * 组别用户ID
   */
  groupUserId: string;
  /**
   * 组别编号
   */
  groupCode: string;
}
export interface IGroupUserResetRes {
  /**
   * ID
   */
  groupUserId: string;
  /**
   * 用户ID
   */
  userId: string;
  /**
   * 用户名称
   */
  userName: string;
  /**
   * 用户编号
   */
  userCode: string;
  /**
   * 组别编码
   */
  groupCode: string;
  /**
   * 组别类型； 1:纸样师组别
   */
  groupType: string;
  /**
   * 扩展信息
   */
  extInfo: string;
  /**
   * 手机号码
   */
  phone: string;
  /**
   * 区域名称
   */
  regionName: string;
  /**
   * 区域ID
   */
  regionId: string;
}
export type IGroupUserRemoveReq = Record<string, unknown>;
export type IGroupUserRemoveRes = null;
