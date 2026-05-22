import { Env2 } from '@toy/utils';

// 环境枚举
export enum ENV_ENUM {
  DEV = 'dev',
  QA = 'qa',
  UAT = 'uat',
  PROD = 'prod',
}

// 系统枚举
export enum SYSTEM_ENUM {
  'NEST_API' = 'nest-api',
  'ARSENAL_API' = 'arsenal-api',
  'NEST_WEB' = 'nest-web',
  'LOGIN_WEB' = 'login-web',
  'OLA_API' = 'ola-api',
  'FASHION_DESIGN_API' = 'FashionDesignApi',
  // FASHION_PHOTO = 'FashionPhoto',
  FASHION_DESIGN = 'fashion-design',
  TG_FASHION_DESIGN_API = 'FashionDesignApi',
}

export const envInstance = new Env2<ENV_ENUM, SYSTEM_ENUM>({
  onlineEnv: window.$frontEnv,
  /* 本地环境 使用环境 */
  localEnv: ENV_ENUM.QA,
  onlineDomain: 'textile-story.com',
  localDomain: 'textile-story.com',
});

// 获取 api 前置路径

export const { API_BASE, currentEnv } = envInstance;

export const currentSystem = window.$system as string || 'ola';

export const ENV_PREFIX = window.location.host;
