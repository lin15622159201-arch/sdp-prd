import { RouteRecordRaw } from 'vue-router';

export type IRouteConfig = RouteRecordRaw & {
  /** 路由元信息 */
  meta: {
    /** 标题 */
    title?: string;
    /** 是否验证登录 默认false */
    auth?: boolean;
    /** 是否缓存 默认false */
    isKeepAlive?: boolean;
    /** 是否在面包屑中显示 默认true */
    breadcrumb?: boolean;
    /** 激活菜单的路由名 默认为当前路由名 */
    activeMenu?: string;
    /** 激活tab的路由名 默认为当前路由名 */
    activeTab?: string;
  };
  children?: IRouteConfig[];
};
