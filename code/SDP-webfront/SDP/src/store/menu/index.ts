import { defineStore } from 'pinia';
import { MenuState, IMenuItem } from './type';
import { uniq } from 'lodash-es';
import { parse } from 'qs';
import { MENU_TYPE_ENUM } from '@/api/iam/user/constant';
import { RouteLocationNormalized } from 'vue-router';
import { CURRENT_CLIENT_CODE } from '@/constant';
import { userFindMenuTree } from '@/api/iam/user';

// 首页路由配置
const BASE_ROUTE: IMenuItem[] = [
  {
    parentId: '-1',
    id: '-1',
    componentName: 'Dashboard',
    name: '首页',
    type: MENU_TYPE_ENUM.MENU,
    icon: 'font_family icon-shouye',
  },
];
const TEMPLATE_ROUTE: IMenuItem[] = [
  {
    parentId: '-1',
    id: '-2',
    componentName: 'Template',
    name: '模板',
    type: MENU_TYPE_ENUM.MENU,
    icon: 'font_family icon-shouye',
    children: [
      {
        parentId: '-2',
        id: '-3',
        componentName: 'TemplateList',
        name: '列表模板',
        type: MENU_TYPE_ENUM.MENU,
        children: [],
      },
      {
        parentId: '-2',
        id: '-4',
        componentName: 'KeepAlivePage1',
        name: 'KeepAlive示例',
        type: MENU_TYPE_ENUM.MENU,
        children: [],
      },
      {
        parentId: '-2',
        id: '-5',
        componentName: 'TemplateComponents',
        name: '组件Demo',
        type: MENU_TYPE_ENUM.MENU,
        children: [],
      },
    ],
  },
];

export const useMenuStore = defineStore({
  id: 'menu',
  state: (): MenuState => ({
    menus: [],
    needReload: false,
    isGetMenu: false,
    authMenuList: [],
    authButtonList: [],
    flatMenus: [],
    activeMenu: '',
  }),

  actions: {
    async getMenus() {
      try {
        if (this.isGetMenu) return;
        const { data } = await userFindMenuTree([CURRENT_CLIENT_CODE]);
        const resourceTreeVos: IMenuItem[] = [...BASE_ROUTE];
        Object.keys(data).forEach((key) => {
          resourceTreeVos.push(...data[key]);
        });
        const authMenuList: string[] = ['Dashboard'];
        const authButtonList: string[] = [];
        const flatMenus: IMenuItem[] = [];
        const deep = (menuTree: IMenuItem[], parentId: string = '-1'): IMenuItem[] => {
          return menuTree.map((it) => {
            const row = {
              ...it,
              parentId,
            } as IMenuItem;
            let path = row.componentName || row.url;
            if (row.type === MENU_TYPE_ENUM.MENU) {
              if (path) {
                if (path.includes('?')) {
                  const [routeName, search] = path.split('?');
                  path = routeName;
                  row.componentName = path;
                  row.query = parse(search) as unknown as any;
                }
                authMenuList.push(path);
              }
              flatMenus.push(row);
            }
            if (row.children?.length && row.type === MENU_TYPE_ENUM.MENU) {
              row.children = deep(row.children, row.id);
            } else if (row.type === MENU_TYPE_ENUM.BUTTON) {
              if (path) {
                authMenuList.push(...path.split(','));
              }
            }
            if (row.code) {
              authButtonList.push(row.code);
            }
            return row;
          });
        };
        this.menus = deep(resourceTreeVos);
        this.flatMenus = flatMenus;
        this.authMenuList = uniq(authMenuList);
        this.authButtonList = uniq(authButtonList);
        this.isGetMenu = true;
      } catch (error) {
        // 获取菜单失败 清空菜单
        this.clearMenus();
        throw Error('获取资源失败');
      }
    },
    clearMenus() {
      this.menus = [...BASE_ROUTE];
      this.authMenuList = [];
      this.authButtonList = [];
      this.flatMenus = [];
      this.isGetMenu = false;
    },
    setActiveMenu(menu: string) {
      this.activeMenu = menu;
    },
    hasPermission(code: string): boolean {
      if (process.env.NODE_ENV === 'development') {
        return true;
      }
      return this.authButtonList.includes(code);
    },

    hasMenu(route: RouteLocationNormalized) {
      if (process.env.NODE_ENV === 'development') {
        return true;
      }
      return this.authMenuList.includes(route.name as string);
    },
  },
});
