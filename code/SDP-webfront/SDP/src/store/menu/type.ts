import { IUserFindMenuTreeResKeyItem } from '@/api/iam/user/types';

export interface IMenuItem extends IUserFindMenuTreeResKeyItem {
  /**
   * 查询参数
   */
  query?: Record<string, string>;
  /**
   * 父级菜单ID
   */
  parentId?: string;

  children?: IMenuItem[];
}

export interface MenuState {
  menus: IMenuItem[];
  isGetMenu: boolean;
  authMenuList: string[];
  authButtonList: string[];
  needReload: boolean;
  flatMenus: IMenuItem[];
  activeMenu: string;
}
