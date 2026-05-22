import { defineStore } from 'pinia';
import { currentEnv, ENV_ENUM } from '@/core/http/env';
import http from '@/core/http';
import { AppState } from './type';

// import { useDomainConf } from '@toy/business-components';

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    systemDomain: null,
  }),

  actions: {
    async getEnvConfig() {
      if (this.systemDomain) return;
      // const { getDomainConf } = useDomainConf(currentEnv);
      // const data = await getDomainConf(`${currentEnv}-${currentSystem}`);

      const getDomainConf = (env: ENV_ENUM) => {
        const curEnvStr = env === ENV_ENUM.PROD ? '' : `${env}-`;
        console.log('curEnvStr', curEnvStr);
        return {
          'nest-web': `https://${curEnvStr}xiniu-uacs.textile-story.com`,
          'arsenal-api': `https://${curEnvStr}arsenal-api.textile-story.com`,
          openPlatformApi: `https://${curEnvStr}xiniu-open-platform-api.textile-story.com`,
          'ola-api': `https://${curEnvStr}xiniu-nest-api.textile-story.com`,
          'nest-api': `https://${curEnvStr}xiniu-nest-api.textile-story.com`,
          sso: `https://${curEnvStr}sso-api.textile-story.com`,
          'fashion-design': `https://${curEnvStr}xiniu-fashion-design.textile-story.com`,
          FashionDesignApi: `https://${curEnvStr}xiniu-nest-api.textile-story.com`,
          tgFashionDesignApi: `https://${curEnvStr}xiniu-nest-api.textile-story.com`,
          'login-web': `https://${curEnvStr}xiniu-login.textile-story.com`
        };
      };
      const data = getDomainConf(currentEnv);

      // // 遍历替换域名配置
      // // eslint-disable-next-line no-restricted-syntax
      // for (const key in data) {
      //   if (typeof (data as Record<string, string>)[key] === 'string') {
      //     const value = (data as Record<string, string>)[key];
      //     let newValue = value;
      //     if (value.endsWith('login.tiangong.tech')) {
      //       newValue = value.replace('login.tiangong.tech', 'xiniu-login.textile-story.com');
      //     } else if (value.endsWith('uacs.tiangong.tech')) {
      //       newValue = value.replace('uacs.tiangong.tech', 'xiniu-uacs.textile-story.com');
      //     } else if (value.endsWith('nest-api.tiangong.tech')) {
      //       newValue = value.replace('nest-api.tiangong.tech', 'xiniu-nest-api.textile-story.com');
      //     } else if (value.endsWith('arsenal-api.tiangong.tech')) {
      //       newValue = value.replace('arsenal-api.tiangong.tech', 'xiniu-arsenal-api.textile-story.com');
      //     } else if (value.endsWith('open-platform-api.tiangong.tech')) {
      //       newValue = value.replace('open-platform-api.tiangong.tech', 'xiniu-open-platform-api.textile-story.com');
      //     } else if (value.endsWith('fashion-design.tiangong.tech')) {
      //       newValue = value.replace('fashion-design.tiangong.tech', 'xiniu-fashion-design.textile-story.com');
      //     } else if (value.endsWith('sso-api.tiangong.tech')) {
      //       newValue = value.replace('sso-api.tiangong.tech', 'sso-api.textile-story.com');
      //     }

      //     (data as Record<string, string>)[key] = newValue;
      //   }
      // }
      console.log('getEnvConfig =>>', JSON.stringify(data));

      this.systemDomain = data;
      http.setDomain(data);
    },
  },
});
