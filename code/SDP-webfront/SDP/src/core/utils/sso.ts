import { CURRENT_CLIENT_CODE } from '@/constant';

/**
 * 跳转sso登陆、登出页
 * @param ssoUrl sso系统地址
 * @param logout 是否登出系统
 */
export const jumpSSOLogin = (ssoUrl: string, logout?: boolean) => {
  const url = window.location.href;
  window.location.href = `${ssoUrl}/login?redirect=${encodeURIComponent(
    `${url}`,
  )}&clientCode=${CURRENT_CLIENT_CODE}${logout ? '&logout=true' : ''}&inner=inner`;
};

/**
 * 跳转sso选择租户页
 * @param ssoUrl sso系统地址
 */
export const jumpSSOSelectTenant = (ssoUrl: string) => {
  const url = window.location.href;
  window.location.href = `${ssoUrl}/select-tenant?redirect=${encodeURIComponent(
    `${url}`,
  )}&clientCode=${CURRENT_CLIENT_CODE}`;
};
