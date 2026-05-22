import { YES_NO_NUMBER_ENUM } from '@/constant';

/** 菜单类型 */
export enum MENU_TYPE_ENUM {
  /** 菜单 */
  MENU = '0',
  /** 按钮 */
  BUTTON = '1'
}

interface IResourceTreeItem {
  /**
   * 菜单ID
   */
  menuId: string;
  /**
   * 菜单名称
   */
  name: string;
  /**
   * 菜单权限标识
   */
  permission?: string;
  /**
   * 前端路由标识路径
   */
  path: string;
  /**
   * 父菜单ID
   */
  parentId?: string;
  /**
   * 菜单图标
   */
  icon?: string;
  /**
   * 排序值
   */
  sortOrder?: number;
  /**
   * "菜单类型,0:菜单 1:按钮
   */
  menuType: MENU_TYPE_ENUM;
  /**
   * 是否启用
   */
  enabled?: YES_NO_NUMBER_ENUM;
  children?: IResourceTreeItem[];
}

export type IGetUserResourceItemRes = IResourceTreeItem[];

export interface IGetUserTenantsReq {
  userId: string;
}
export interface IGetUserTenantsRes {
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
  username: string;
  /**
   * 手机号码
   */
  phone: string;
  /**
   * 租户列表
   */
  tenantList: {
    /**
     * 客户ID
     */
    customerId: string;
    /**
     * 客户ID
     */
    tenantUserId: string;
    /**
     * 租户ID
     */
    tenantId: string;
    /**
     * 租户编号
     */
    tenantCode: string;
    /**
     * 租户名称
     */
    tenantName: string;
    /**
     * 租户员工名称
     */
    employeeName: string;
  }[];
}

export interface ILoginByDesignReq {
  /**
   * ssoToken
   */
  ssoToken: string;
  /**
   * 租户id
   */
  tenantId: string;
}
export interface ILoginByDesignRes {
  /**
   * token
   */
  token: string;
}
export interface IGetDesignUserInfoRes {
  /**
   * 客户id
   */
  customerId: string;
  /**
   * 客户名称
   */
  customerName: string;
  /**
   * 中台商家ID
   */
  merchantId: string;
}
