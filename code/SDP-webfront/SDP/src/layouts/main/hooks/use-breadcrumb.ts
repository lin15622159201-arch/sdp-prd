import mitt, { EVENT_BUS_ENUM } from '@/core/event';
import { sortObject } from '@/core/utils/helper';
import { useMenuStore } from '@/store/menu';
import { stringify } from 'qs';
import { onBeforeUnmount, ref, watch } from 'vue';
import { RouteRecord, useRoute, useRouter } from 'vue-router';

export const useBreadcrumbList = () => {
  const menuStore = useMenuStore();
  // 首页路由配置
  const HOME_ROUTE: Partial<RouteRecord> = {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      title: '首页',
      icon: 'document',
    },
  };
  const currentRoute = useRoute();
  const router = useRouter();
  const breadcrumbList = ref<RouteRecord[]>([]);
  const queryText = ref<any>('');
  // 是否为首页
  const isDashboard = (route: RouteRecord) => {
    const name = route && (route.name as string);
    if (!name || !HOME_ROUTE.name) {
      return false;
    }
    return name.trim().toLowerCase() === (HOME_ROUTE.name as string).toLowerCase();
  };

  // 获取路由记录列表
  const getBreadcrumbList = () => {
    // 获取带标题的路由
    let matched = currentRoute.matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false);

    const [first] = matched;

    if (!isDashboard(first)) {
      matched = [HOME_ROUTE as RouteRecord].concat(matched);
    }

    breadcrumbList.value = matched;
  };

  /** 监听eventBus传播的当前激活菜单更新事件 从而更新面包屑 */
  const activeMenuListener = (val?: string) => {
    console.log('val', val);
    val = decodeURIComponent(val || '');
    if (val) {
      const list:RouteRecord[] = [];
      let cur = menuStore.flatMenus
        .find(
          v => decodeURIComponent(
            `${(v.componentName || v.url)}${v.query ? `?${stringify(sortObject(v.query))}` : ''}`
          ) === val
        );

      console.log('cur', cur);
      while (cur) {
        list.unshift({
          name: cur.componentName || cur.url,
          query: cur.query,
          meta: {
            title: cur.name
          },
        } as any);
        if (cur.parentId && cur.parentId !== '-1') {
          // eslint-disable-next-line
          cur = menuStore.flatMenus.find(v => v.id === cur!.parentId);
        } else {
          cur = null as any;
        }
      }
      list.unshift(HOME_ROUTE as RouteRecord);
      console.log('list', list);
      if (currentRoute.query.path === '/#/inspiration-center/pattern-modify/create') {
        list[1].name = '';
        list[1].path = '/webview';
        const { query } = list[2] as any;
        queryText.value = query;
      }
      breadcrumbList.value = list;
    }
  };
  watch(
    () => currentRoute,
    (newRoute) => {
      if (queryText.value) {
        router.replace({
          path: newRoute.path,
          query: queryText.value,
        });
        setTimeout(() => {
          window.location.reload();
        });
        queryText.value = '';
      }
    },
    { deep: true }
  );
  mitt.on(EVENT_BUS_ENUM.UPDATE_ACTIVE_MENU, activeMenuListener);
  onBeforeUnmount(() => {
    mitt.off(EVENT_BUS_ENUM.UPDATE_ACTIVE_MENU, activeMenuListener);
  });
  // 监听 重新获取 路由记录
  watch(
    () => {
      return currentRoute.path;
    },
    (path) => {
      // if you go to the redirect page, do not update the breadcrumbs
      if (path.startsWith('/redirect/')) {
        return;
      }
      getBreadcrumbList();
    },
  );

  // 初始化
  getBreadcrumbList();
  return {
    breadcrumbList,
  };
};
