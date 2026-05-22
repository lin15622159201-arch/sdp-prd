import http from '@/core/http';
import { defineStore } from 'pinia';
import { useMenuStore } from '../menu';
import { IState } from './type';
import { userMe, userSsoToken } from '@/api/iam/user';
import { useAppStore } from '@/store/app';
import { currentEnv, SYSTEM_ENUM } from '@/core/http/env';
import { jumpSSOLogin } from '@/core/utils/sso';
import { ElMessage } from 'element-plus';
import { TokenCookie } from '@toy/utils';

const tokenCookie = new TokenCookie(currentEnv);
const initToken = () => {
  const token = tokenCookie.getToken();
  http.setHeader({
    Authorization: token ? `Bearer ${token}` : '',
  });
  return token || '';
};

export const useAccountStore = defineStore({
  id: 'account',
  state: (): IState => ({
    account: null,
    ssoToken: null,
    token: initToken(),
  }),

  // 定义修改state数据函数
  actions: {
    setToken(token: string) {
      this.token = token;
      tokenCookie.setToken(token);
      http.setHeader({
        Authorization: `Bearer ${token}`,
      });
    },
    // 获取用户信息
    async getAccountInfo() {
      try {
        // 如果没有SSOToken 获取一下SSOToken
        if (!this.ssoToken) {
          try {
            const { data } = await userSsoToken();
            this.ssoToken = data.ssoToken;
            http.setHeader({
              Ssotoken: data.ssoToken!,
              /** TODO: 临时处理 */
              'tenant-id': 1,
            });
          } catch (e) {
            // 获取失败就不管了。
            this.ssoToken = 'error';
            console.log('获取SSOToken失败');
          }
        }
        if (this.account) return;
        const { data } = await userMe();
        this.account = data;
      } catch (e) {
        console.log(e);
        throw Error('获取用户信息失败');
      }
    },
    jumpLogin(logout: boolean = true) {
      const appStore = useAppStore();
      const ssoUrl = appStore.systemDomain ? appStore.systemDomain[SYSTEM_ENUM.LOGIN_WEB] : '';
      if (ssoUrl) {
        jumpSSOLogin(ssoUrl, logout);
      } else {
        ElMessage.error('sso地址未配置');
        window.location.reload();
      }
    },
    async logout() {
      this.clearCache();
      this.jumpLogin();
    },
    async login() {
      this.clearCache();
      this.jumpLogin(false);
    },
    // 清除所有缓存信息
    clearCache() {
      const menuStore = useMenuStore();
      this.clearToken();
      this.account = null;
      menuStore.clearMenus();
    },
    // 清除token
    clearToken() {
      this.token = null;
      http.setHeader({
        Authorization: '',
      });
    },
  },
});

http.setUnauthorizedCallback(async () => {
  await useAccountStore().login();
});
