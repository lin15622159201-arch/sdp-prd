<script lang="ts" setup>
import { debounce } from 'lodash-es';
import { MICRO_APP_MAP } from '@/core/plugins/micro-app/constant';
import { currentEnv, ENV_ENUM } from '@/core/http/env';
import { useAccountStore } from '@/store/account';
import { SSO_SYSTEM_CODE } from '@/constant';
import { ROUTER_TYPE_ENUM, getDefaultToken } from '../constant';
import getHistoryState from '../utils/get-history-state';
import mitt, { EVENT_BUS_ENUM } from '@/core/event';

import type { IMICRO_APP_MAP_DATA } from '@/core/plugins/micro-app';
import { useRoute, useRouter, type RouteLocationNamedRaw, type RouteLocationRaw } from 'vue-router';
import { computed, nextTick, onUnmounted, shallowRef, watchEffect } from 'vue';
import { hideFullScreenLoading, showFullScreenLoading } from '@/core/http/helper';

interface Props {
  /**
   * 子应用路由信息
   */
  routeOptions: RouteLocationNamedRaw;
  /**
   * 基座地址（当前使用地址）
   */
  baseRoute: string;
  /**
   * 接入子应用信息
  */
  app?: IMICRO_APP_MAP_DATA;
  /**
   * 子应用路由跳转方式，
   *
   * 默认 false(使用 pust)，true 则使用 replace
   */
  replace?: boolean;
  /**
   * 跳转之前处理回传的path
   */
  setRoutePath?: (route: string | ROUTER_TYPE_ENUM) => void | RouteLocationRaw;
  /**
   * 其他 options
   */
  options?: Record<string, any>;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    baseRoute: '/',
    app: () => {
      return MICRO_APP_MAP.HOULIU_BOM_APP;
    },
    replace: false,
    options: () => ({}),
  },
);

const emit = defineEmits(['created', 'beforemount', 'mounted', 'unmount', 'error']);

// 当前子应用地址
const subAppUrl = computed(() => {
  const isDev = process.env.NODE_ENV === 'development';
  const subApp = props.app;
  const { protocol, hostname } = window.location;

  if (isDev) {
    const { DEV_SERVER } = subApp;
    // 开发地址
    return `${protocol}//${hostname}:${DEV_SERVER.port}${DEV_SERVER.base}`;
  }

  if (currentEnv === ENV_ENUM.PROD) {
    return `${protocol}//${subApp.URL}`;
  }
  const envConvert = (src: string) => {
    if (/qa/.test(src)) return 'sit';
    return src.replace(/\d+/g, '');
  };

  // 生产模式地址
  return `${protocol}//${envConvert(currentEnv)}-${subApp.URL}`;
});

const accountStore = useAccountStore();
const router = useRouter();
// 记录是否 是通知的跳转(来子应用)
const isRouterChangeByMySelf = shallowRef(false);

const subAppData = computed(() => {
  return {
    ...props.options,
    token: getDefaultToken(),
    /** 写死了token 所以租户id必须是zj的 */
    companyId: '1',
    BASE_APP_CODE: SSO_SYSTEM_CODE,
    routerFn: (path: string) => {
      isRouterChangeByMySelf.value = true;
      let _path: RouteLocationRaw = path === ROUTER_TYPE_ENUM.BACK
        ? path
        : `/${path.split('/').filter(Boolean).join('/')}`;

      if (typeof props.setRoutePath === 'function') {
        _path = props.setRoutePath(_path) || _path;
      }

      if (path === ROUTER_TYPE_ENUM.BACK) {
        router.back();
        return;
      }
      if (props.replace) {
        router.replace(_path);
      } else {
        router.push(_path);
      }
    },
    options: {
      // routeName: props.routeName,
      routeOptions: props.routeOptions,
      baseRoute: props.baseRoute,
      // TODO: 补丁参数 解决好料网 收藏夹 - 去逛逛按钮跳转404问题，后期需要解决
      firstLevelBase: props.baseRoute,
    },
    account: {
      phone: accountStore.account?.account?.phone || '',
      username: accountStore.account?.account?.name || '',
      userId: accountStore.account?.id || '',
    },
  };
});
const route = useRoute();

const handleAyncRouter = debounce(async () => {
  if (isRouterChangeByMySelf.value) {
    isRouterChangeByMySelf.value = false;
    return;
  }
  hideFullScreenLoading();
  const locationFullPath = `${window.location.pathname}${window.location.search}`;
  // 可能是子应用的跳转
  if (locationFullPath !== route.fullPath) {
    showFullScreenLoading();
    await router.push(locationFullPath);
    hideFullScreenLoading();
  }
}, 300);

watchEffect(handleAyncRouter);

getHistoryState();

window.addEventListener('replaceState', handleAyncRouter);
window.addEventListener('pushState', handleAyncRouter);

const handleCheckBodyClassName = () => {
  nextTick(() => {
    const targetName = 'el-loading-parent--relative';
    let { className } = document.body;
    if (className.includes(targetName)) {
      className = className.replace(targetName, '').trim();
      document.body.className = className;
    }
  });
};

mitt.on(EVENT_BUS_ENUM.HOULIU_BOM_APP.CLOSE_LOADING, handleCheckBodyClassName);

onUnmounted(() => {
  window.removeEventListener('replaceState', handleAyncRouter);
  window.removeEventListener('pushState', handleAyncRouter);

  mitt.off(EVENT_BUS_ENUM.HOULIU_BOM_APP.CLOSE_LOADING, handleCheckBodyClassName);
});

/**
 * 监听生命周期钩子
 */
const created = () => {
  emit('created');
};
const beforemount = () => {
  emit('beforemount');
};
const mounted = () => {
  emit('mounted');
};
const unmount = () => {
  emit('unmount');
};
const error = (err: Error) => {
  console.error(err);
  emit('error');
};

</script>

<template>
  <micro-app
    :name="app.APP_CODE"
    :url="subAppUrl"
    inline
    disable-sandbox
    :data="subAppData"
    class="plm-micro-app"
    @created="created"
    @beforemount="beforemount"
    @mounted="mounted"
    @unmount="unmount"
    @error="error"
  />
</template>

<style lang="scss">
.plm-micro-app {
  position: relative;
  height: 100%;
  /* stylelint-disable-next-line */
  micro-app-body {
    height: 100%;
    // :deep(.el-select) {
    //   width: auto !important;
    // }
  }
  .el-select {
    width: max-content;
  }
}
</style>
