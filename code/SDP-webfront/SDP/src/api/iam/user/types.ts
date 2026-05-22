import { SOURCE_ENUM, MENU_TYPE_ENUM, TENANT_TYPE_ENUM, ORG_TYPE_ENUM } from './constant';
/**
 * 获取当前用户基本信息
 * yapi地址：https://yapi.tiangong.site/project/26/interface/api/1449
 */

export interface IUserMeRes {
  /**
   * 用户来源
   */
  source?: SOURCE_ENUM;
  /**
   * 是否超级管理员
   */
  superAdmin?: boolean;
  /**
   * 工号
   */
  code: string;
  id: string;
  /**
   * 账号
   */
  account?: IUserMeResAccount;
  /**
   * 租户
   */
  tenant?: IUserMeResTenant;
  /**
   * 组织信息
   */
  organization: IUserMeResOrganization;
}

export interface IUserMeResOrganization {
  /**
   * 组织id
   */
  id: string;
  /**
   * 组织名称
   */
  name: string;
  /**
   * 组织类型
   */
  type: ORG_TYPE_ENUM;
  /**
   * 父级
   */
  parent?: IUserMeResOrganization;
}

export interface IUserMeResTenant {
  /**
   * 租户名称
   */
  name: string;
  /**
   * 租户类型
   */
  type: TENANT_TYPE_ENUM;
  id: string;
}

export interface IUserMeResAccount {
  /**
   * 帐号id
   */
  id: string;
  /**
   * 用户名
   */
  username?: string;
  /**
   * 姓名
   */
  name?: string;
  /**
   * 手机号
   */
  phone?: string;
  /**
   * 邮箱
   */
  email?: string;
}

/**
 * 获取当前用户菜单树
 * yapi地址：https://yapi.tiangong.site/project/26/interface/api/1450
 */

export interface IUserFindMenuTreeRes {
  [key: string]: IUserFindMenuTreeResKeyItem[];
}

export interface IUserFindMenuTreeResKeyItem {
  /**
   * 名称
   */
  name: string;
  /**
   * 资源编码
   */
  code?: string;
  /**
   * 菜单类型
   */
  type?: MENU_TYPE_ENUM;
  /**
   * 菜单URL
   */
  url?: string;
  /**
   * 组件名称
   */
  componentName?: string;
  /**
   * 图标
   */
  icon?: string;
  /**
   * 是否可见
   */
  display?: boolean;
  /**
   * 排序号
   */
  sorted?: string;
  /**
   * 状态：true-启用，false-停用
   */
  state?: boolean;
  id: string;
  /**
   * 子菜单列表
   */
  children?: IUserFindMenuTreeResKeyItem[];
}

/**
 * 修改密码
 * yapi地址：https://yapi.tiangong.site/project/26/interface/api/1490
 */
export interface IUserChangePasswordReq {
  /**
   * 账号ID
   */
  accountId: string;
  /**
   * 旧密码
   */
  oldPassword: string;
  /**
   * 新密码
   */
  newPassword: string;
}

export interface IUserQueryReq {
  pageNum: number;
  pageSize: number;
  sort?: SortItem[];
  filters?: Filters;
}

interface SortItem {
  field: string;
  order: 'asc' | 'desc' | 'ASC' | 'DESC';
}

interface Filters {
  code?: string; // 工号
  name?: string; // 姓名
}

export interface IUserQueryRes {
  pageNum: number;
  total: number;
  list: ListItem[];
}

interface ListItem {
  id: string; // 用户ID
  code: string; // 工号
  name: string; // 姓名
}
