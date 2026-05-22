import { ComputedRef, onBeforeUnmount, onMounted, ref } from 'vue';
import { useAccountStore } from '@/store/account';
import { ElMessage } from 'element-plus';
import { IMessageEvent, IHttpErrorEvent, ISendMessage, ComponentEmit } from './types';
import { MESSAGE_EVENT_ENUM } from './constant';
import { SYSTEM_ENUM } from '@/core/http/env';
import { useRoute, useRouter } from 'vue-router';
import { useMenuStore } from '@/store/menu';
import mitt, { EVENT_BUS_ENUM } from '@/core/event';
import { stringify } from 'qs';
import { sortObject } from '@/core/utils/helper';
import { useAppStore } from '@/store/app';

export const useMessage = (domain: ComputedRef<SYSTEM_ENUM>, emit: ComponentEmit) => {
  const $route = useRoute();
  const iframeEl = ref();
  const $router = useRouter();
  const accountStore = useAccountStore();
  const menuStore = useMenuStore();
  const appStore = useAppStore();
  const sendMessage = (data: ISendMessage) => {
    iframeEl.value?.contentWindow.postMessage(data, '*');
  };
  const handleHttpError = async (data: IHttpErrorEvent['data']) => {
    switch (data.code) {
      case '401':
        ElMessage.error('会话过期，请重新登录');
        await accountStore.logout();
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
    console.log('messageListener', data);
    // if (appStore.systemDomain![domain.value] !== origin) return;
    switch (data.type) {
      case MESSAGE_EVENT_ENUM.UPDATE_ACTIVE_MENU: {
        const { path } = data.data;
        mitt.emit(
          EVENT_BUS_ENUM.UPDATE_ACTIVE_MENU,
          `${$route.name as string}?${stringify(sortObject({ domain: domain.value, path }))}`
        );
        break;
      }
      case MESSAGE_EVENT_ENUM.ROUTER_PUSH: {
        const { path, query, params } = data.data;
        emit('router-push', data.data);
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
        handleHttpError(data.data);
        break;
      case MESSAGE_EVENT_ENUM.LOGIN: {
        // const ssoToken = accountStore.ssoToken!;
        // const saasToken = accountStore.token!;
        // const tenantId = accountStore.currentCompany?.tenantId!;
        // const userId = accountStore.account?.userId!;
        // const username = accountStore.account?.username!;
        // const companyInfoList: ICompanyInfoItem[] = accountStore.account!.tenantList!.map(v => ({
        //   companyId: v.tenantId,
        //   companyCode: v.tenantCode,
        //   companyName: v.tenantName,
        //   isCompanyManager: false,
        //   username: v.employeeName,
        //   email: '',
        //   orgList: [],
        // }));
        // sendMessage({
        //   type: MESSAGE_EVENT_ENUM.LOGIN,
        //   data: {
        //     ssoToken,
        //     saasToken,
        //     tenantId,
        //     systemCode: SSO_SYSTEM_CODE,
        //     authButtonList: JSON.stringify(menuStore.authButtonList),
        //     // companyInfoList: JSON.stringify(companyInfoList),
        //     username,
        //     userId,
        //   },
        // });
        break;
      }
      case MESSAGE_EVENT_ENUM.BLANK_OPEN: {
        console.log('blank-open', data.data);
        emit('blank-open', data.data);
        break;
      }
      case MESSAGE_EVENT_ENUM.SUBMIT_SUCCESS: {
        emit('submit-success', data.data);
        break;
      }
      case MESSAGE_EVENT_ENUM.BACK: {
        emit('back', data.data);
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
