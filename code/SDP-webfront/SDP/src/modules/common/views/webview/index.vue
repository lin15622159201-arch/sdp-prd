<template>
  <iframe
    class="tw-w-100% tw-h-100% tw-block tw-border-none"
    ref='iframeEl'
    allow="clipboard-write *"
  />
</template>
<script setup lang='ts'>
import { computed, onBeforeMount, onBeforeUnmount, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { stringify } from 'qs';
import mitt, { EVENT_BUS_ENUM } from '@/core/event';
import { sortObject } from '@/core/utils/helper';
import { useMessage } from './hooks/use-massage';
import { useAppStore } from '@/store/app';

import { isEmpty } from 'lodash-es';
import { SYSTEM_ENUM } from '@/core/http/env';
import { useAccountStore } from '@/store/account';

const appStore = useAppStore();
const accountStore = useAccountStore();
const $route = useRoute();
const domainEnum = computed(() => $route.query.domain as SYSTEM_ENUM);
const { iframeEl } = useMessage(domainEnum);
watchEffect(() => {
  const queryStr = $route.query.query as string;
  const paramsStr = $route.query.params as string;
  console.log($route.query);
  const domain = $route.query.domain as string;
  const queyPath = $route.query.path as string || '';
  const activeMenu = $route.query.activeMenu as string;
  let routePath = queyPath;
  if (paramsStr) {
    // 解析路由参数
    const params = JSON.parse(decodeURIComponent(paramsStr));
    // 替换对应参数
    routePath = routePath.replace(/:([a-zA-Z]+)/g, (match, param) => params[param]);
  }
  mitt.emit(
    EVENT_BUS_ENUM.UPDATE_ACTIVE_MENU,
    activeMenu || `${$route.name as string}?${stringify(sortObject({ domain, path: queyPath }))}`
  );
  const curDomain = process.env.NODE_ENV === 'development' ? 'http://localhost:8081' : appStore.systemDomain?.[domainEnum.value] || '';

  console.log('curDomain', curDomain);
  const defaultQuery = `iframe=true&token=${accountStore.token}`;
  // eslint-disable-next-line
  const baseUrl = `${curDomain}${routePath}${isEmpty(queryStr) ? `?${defaultQuery}` : `?${stringify(JSON.parse(decodeURIComponent(queryStr)))}&${defaultQuery}`}`;
  console.log(baseUrl);
  iframeEl.value?.contentWindow?.location.replace(baseUrl);
}, {
  flush: 'post'
});

onBeforeMount(() => {
  document.body.className = `${document.body.className} webview_container`;
});
onBeforeUnmount(() => {
  document.body.className = document.body.className.replace('webview_container', '');
});
</script>
<style lang="scss">
.webview_container {
  .sc-app-layout-body {
    padding: 1px !important;
  }
}
</style>
