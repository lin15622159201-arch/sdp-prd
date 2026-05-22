<template>
  <iframe
    class="tw-w-100% tw-h-100% tw-block tw-border-none"
    ref='iframeEl'
    allow="clipboard-write *"
  />
</template>
<script setup lang='ts'>
import { computed, onBeforeMount, onBeforeUnmount, PropType, watchEffect } from 'vue';
import { useMessage } from './hooks/use-massage';
import { isEmpty } from 'lodash-es';
import { useAppStore } from '@/store/app';
import { useAccountStore } from '@/store/account';
import { SYSTEM_ENUM } from '@/core/http/env';
import { IBlankOpenEvent } from './hooks/types';

interface IQuery {
  query?: string;
  params?: string;
  path?: string;
}

const props = defineProps({
  domainEnum: {
    type: String as PropType<SYSTEM_ENUM>,
    required: true
  },
  query: {
    type: Object as PropType<IQuery>,
    default: () => {},
    required: true
  },
});

const emit = defineEmits<{
  (e: 'router-push', data: any): void;
  (e: 'blank-open', data: IBlankOpenEvent['data']): void;
  (e: 'submit-success', data: any): void;
  (e: 'back', data: any): void;
}>();

const domainEnum = computed(() => props.domainEnum);

const { iframeEl } = useMessage(domainEnum, emit);
const appStore = useAppStore();
const accountStore = useAccountStore();
watchEffect(() => {
  const queryStr = props.query.query as string; // 传入前需自行encodeURIComponent或做其他处理一下，url只拼接
  const paramsStr = props.query.params as string;
  const queyPath = props.query.path as string || '';
  let routePath = queyPath;
  if (paramsStr) {
    // 解析路由参数
    const params = JSON.parse(decodeURIComponent(paramsStr));
    // 替换对应参数
    routePath = routePath.replace(/:([a-zA-Z]+)/g, (match, param) => params[param]);
  }

  // mitt.emit(
  //   EVENT_BUS_ENUM.UPDATE_ACTIVE_MENU,
  //   `${$route.name as string}?${stringify(sortObject({ domain, path: queyPath }))}`
  // );

  const curDomain = appStore.systemDomain?.[domainEnum.value] || '';
  // const curDomain = 'http://localhost:8080';
  console.log('curDomain', curDomain);

  const defaultQuery = `iframe=true&token=${accountStore.token}`;
  // const curDomain = `${domain}/#/dashboard?token=${accountStore.token}&iframePath=${props.path}`;
  // eslint-disable-next-line
  // const baseUrl = `${curDomain}${!query ? '' : `&query=${(JSON.stringify(query))}`}${!params ? '' : `&params=${(JSON.stringify(params))}`}`;
  // eslint-disable-next-line vue/max-len
  const baseUrl = `${curDomain}${routePath}${isEmpty(queryStr) ? `?${defaultQuery}` : `?${queryStr}&${defaultQuery}`}`;
  console.log('baseUrl', baseUrl);
  iframeEl.value?.contentWindow?.location.replace(baseUrl);
}, {
  flush: 'post'
});

onBeforeMount(() => {
  document.body.className = `${document.body.className} aigc_container`;
});
onBeforeUnmount(() => {
  document.body.className = document.body.className.replace('aigc_container', '');
});
</script>
<style lang="scss">
.aigc_container {
  .app-layout-body {
    padding: 1px !important;
  }
}
</style>
