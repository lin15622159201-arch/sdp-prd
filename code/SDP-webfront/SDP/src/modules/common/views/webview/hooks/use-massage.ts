import { Ref, onBeforeUnmount, onMounted, ref } from 'vue';
import { useAccountStore } from '@/store/account';
import { ElMessage } from 'element-plus';
import { IMessageEvent, IHttpErrorEvent, ISendMessage } from './types';
import { MESSAGE_EVENT_ENUM } from './constant';
import { CURRENT_CLIENT_CODE } from '@/constant';
import { useAppStore } from '@/store/app';
import { useRoute, useRouter } from 'vue-router';
import { useMenuStore } from '@/store/menu';
import mitt, { EVENT_BUS_ENUM } from '@/core/event';
import { stringify } from 'qs';
import { sortObject } from '@/core/utils/helper';
import { SYSTEM_ENUM } from '@/core/http/env';
import { useMenus } from '@/layouts/main/hooks/use-menus';

export const useMessage = (domain: Ref<SYSTEM_ENUM>) => {
  const $route = useRoute();
  const iframeEl = ref();
  const $router = useRouter();
  const accountStore = useAccountStore();
  const menuStore = useMenuStore();
  const appStore = useAppStore();
  const menu = useMenus();
  const sendMessage = (data: ISendMessage) => {
    iframeEl.value?.contentWindow.postMessage(data, '*');
  };
  const handleHttpError = async (data: IHttpErrorEvent['data']) => {
    switch (data.code) {
      case '401':
        ElMessage.error('会话过期，请重新登录');
        await accountStore.login();
        break;
      case '403':
        $router.push({ name: 'NoAuth' });
        break;
      case '404':
        $router.push({ name: 'NotFound' });
        break;
      default:
        if (data.message && typeof data.message === 'string') {
          ElMessage.error(data.message);
        }
        break;
    }
  };
  const messageListener = (event: IMessageEvent) => {
    const { data, origin } = event;
    const fromFashionDesigns: any = event.data;
    if (fromFashionDesigns?.fromFashionDesign) {
      const { name, query, params, isNewWin } = fromFashionDesigns.fromFashionDesign;
      if (isNewWin) {
        window.open($router.resolve({ name, query, params }).href, '_blank');
        return;
      }
      $router.push({ name, query });
      return;
    }
    console.log(`[messageListener] ${data.type}`, data);
    // if (appStore.systemDomain && appStore.systemDomain[domain.value] !== origin) return;
    switch (data.type) {
      case MESSAGE_EVENT_ENUM.UPDATE_ACTIVE_MENU: {
        const { path } = data.data;
        // if (!/^\/#\//.test(path) && domain.value === SYSTEM_ENUM.FASHION_PHOTO) {
        //   path = `/#${path}`;
        // }
        mitt.emit(
          EVENT_BUS_ENUM.UPDATE_ACTIVE_MENU,
          `${$route.name as string}?${stringify(sortObject({ domain: domain.value, path }))}`
        );
        break;
      }
      case MESSAGE_EVENT_ENUM.ROUTER_PUSH: {
        const { path, query, params } = data.data;
        $router.push({
          name: 'Webview',
          query: {
            domain: data.data.domain,
            path,
            params: params ? encodeURIComponent(JSON.stringify(params)) : undefined,
            query: query ? encodeURIComponent(JSON.stringify(query)) : undefined,
          },
        });
        break;
      }
      case MESSAGE_EVENT_ENUM.HTTP_ERROR:
        console.log('error', data);
        handleHttpError(data.data);
        break;
      case MESSAGE_EVENT_ENUM.LOGIN: {
        const ssoToken = accountStore.ssoToken!;
        const saasToken = accountStore.token!;
        const tenantId = accountStore?.account?.tenant?.id || '';
        const userId = accountStore.account?.id!;
        const username = accountStore.account?.account?.name!;
        const tenant = accountStore?.account?.tenant;
        sendMessage({
          type: MESSAGE_EVENT_ENUM.LOGIN,
          data: {
            ssoToken,
            saasToken,
            tenantId,
            systemCode: CURRENT_CLIENT_CODE,
            authButtonList: JSON.stringify(menuStore.authButtonList),
            companyInfoList: JSON.stringify([tenant]),
            username,
            userId,
          },
        });
        break;
      }
      case MESSAGE_EVENT_ENUM.BLANK_OPEN: {
        const { path, activeMenu } = data.data;
        console.log(menu.activeMenu.value);
        const { href } = $router.resolve({
          name: 'Webview',
          query: {
            domain: data.data.domain,
            path,
            query: data.data.query || undefined,
            activeMenu: activeMenu ?? menu.activeMenu.value,
          },
        });
        window.open(href, data.data.isNoBlank ? '_self' : '_blank');
        break;
      }
      default:
        break;
    }
  };
  onMounted(() => {
    window.addEventListener('message', messageListener);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('message', messageListener);
  });
  return {
    iframeEl,
  };
};
