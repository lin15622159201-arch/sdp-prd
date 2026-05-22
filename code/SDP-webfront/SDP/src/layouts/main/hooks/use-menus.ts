import { MENU_TYPE_ENUM } from '@/api/iam/user/constant';
import mitt, { EVENT_BUS_ENUM } from '@/core/event';
import { sortObject } from '@/core/utils/helper';
import { useMenuStore } from '@/store/menu';
import { stringify } from 'qs';
import { computed, onBeforeUnmount, ref, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { cloneDeep } from 'lodash-es';
import { IMenuItem } from '@/store/menu/type';
import { ScAppLayoutMenuItem } from '@toy/business-components';

// 递归修改字段
const deep = (menuList: IMenuItem[]): ScAppLayoutMenuItem[] => {
  return menuList.map((item) => {
    return {
      menuId: item.id,
      name: item.name,
      icon: item.icon || '',
      path: item.componentName || item.url,
      menuType: item.type === MENU_TYPE_ENUM.MENU ? '0' : '1',
      query: item.query,
      parentId: item.parentId,
      children: item.children ? deep(item.children) : [],
    } as ScAppLayoutMenuItem;
  });
};

export const useMenus = () => {
  const route = useRoute();
  const menuStore = useMenuStore();
  const menus = computed(() => {
    const list = cloneDeep(menuStore.menus);
    return deep(list);
  });
  const authMenuList = computed(() => menuStore.authMenuList);
  const activeMenu = ref('');
  watch(() => route, () => {
    const { meta, name } = route;
    let routeName = name;
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
      // return meta.activeMenu;
      routeName = typeof meta.activeMenu === 'function' ? meta.activeMenu(route) : meta.activeMenu;
    }
    activeMenu.value = routeName as string;
  }, {
    immediate: true,
    deep: true,
  });
  const activeMenuId = computed(() => {
    return menuStore.flatMenus.find((item) => {
      return (item.componentName || item.url)
        && item.type === MENU_TYPE_ENUM.MENU
        && decodeURIComponent(
          `${(item.componentName || item.url)}${item.query ? `?${stringify(sortObject(item.query))}` : ''}`
        )
        === activeMenu.value;
    })?.id || '';
  });
  watchEffect(() => {
    menuStore.setActiveMenu(activeMenuId.value || '');
  });
  const activeMenuListener = (val?: string) => {
    if (val) {
      activeMenu.value = decodeURIComponent(val);
      console.log('val active', activeMenu.value);
    }
  };
  mitt.on(EVENT_BUS_ENUM.UPDATE_ACTIVE_MENU, activeMenuListener);
  onBeforeUnmount(() => {
    mitt.off(EVENT_BUS_ENUM.UPDATE_ACTIVE_MENU, activeMenuListener);
  });
  return {
    activeMenuId,
    menus,
    authMenuList,
    activeMenu,
  };
};
