import { useMenuStore } from '@/store/menu';
import { useAccountStore } from '@/store/account';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useInstances } from '@/hooks/use-instances';
import { useAppStore } from '@/store/app';
import { jumpSSOLogin } from '@/core/utils/sso';
import { SYSTEM_ENUM } from '@/core/http/env';

NProgress.configure({ showSpinner: true });
const { getVueRouterInstance } = useInstances();
const router = getVueRouterInstance();
const hasRoute = (route: RouteLocationNormalized) => {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  const { authMenuList } = useMenuStore();
  return authMenuList.includes(route.name as string);
};

const pathHandler = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const { token } = useAccountStore();
  const isLogin = token;
  const isLoginPath = to.path === '/login';
  const noMatchRouter = to.matched.length === 0;
  const needAuth = !!to.meta?.auth;
  const redirectUrl = encodeURIComponent(to.fullPath);
  const queryToken = to.query.token as string;

  if (queryToken) {
    delete to.query.token;
  }
  // 判断是否携带#、/#/、#/ 解决路由包含 hash时，导致query参数丢失的问题
  const hasHash = to.fullPath.includes('#');
  const hasToken = to.fullPath.includes('token');
  // 解决路由包含 hash时，导致query参数丢失的问题
  let resolveRoute = null;
  if (hasHash && hasToken) {
    resolveRoute = router.resolve(to.fullPath.replace(/\/?#\/?[^?]*/g, ''));
  }
  const validators = [
    // 处理路由异常（携带#/）
    {
      rule: hasHash && hasToken,
      params: {
        path: resolveRoute?.path,
        query: {
          ...resolveRoute?.query
        },
        params: {
          ...to.params,
          ...resolveRoute?.params,
        },
        replace: true
      }
    },
    // 是否存在 token 如果存在 删除token 进入页面
    { rule: !!queryToken, params: { path: to.path, query: to.query, params: to.params, replace: true } },
    // 没有匹配对应路由 直接调整404
    { rule: noMatchRouter, params: { path: '/redirect/404', replace: true } },
    // 登陆过 && 进入登陆页面 调整首页
    { rule: isLogin && isLoginPath, params: { path: '/' } },
    // 不需要登陆 直接下一步
    { rule: !needAuth },
    // 没有登陆 && 不是登陆页面 调整登陆页面
    { rule: !isLogin && !isLoginPath, params: { path: '/login', query: { redirect: redirectUrl }, replace: true } },
    // 登陆过 && 有权限 直接下一步
    { rule: isLogin && hasRoute(to) },
    // 登陆过 && 没有权限 跳过
    { rule: isLogin && !hasRoute(to), params: { path: '/redirect/403', replace: true } },
  ];

  const found = validators.find((valid) => {
    return valid.rule;
  });
  if (found && found.params) {
    if (found.params.path === '/login') {
      const appStore = useAppStore();
      const ssoUrl = appStore.systemDomain ? appStore.systemDomain[SYSTEM_ENUM.LOGIN_WEB] : '';
      if (ssoUrl) {
        jumpSSOLogin(ssoUrl);
      }
      next();
    } else {
      next(found.params);
    }
  } else {
    next();
  }
};

// 处理当前用户信息
const handleCurrentUser = async (to: RouteLocationNormalized) => {
  const accountStore = useAccountStore();
  const menuStore = useMenuStore();
  const token = to.query.token as string;
  if (token) {
    accountStore.setToken(token);
  }

  // 已登陆
  if (accountStore.token && to.name !== 'Login') {
    // 获取用户信息
    await accountStore.getAccountInfo();
    // 获取菜单
    await menuStore.getMenus();
  }
};

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const { getEnvConfig } = useAppStore();
  await getEnvConfig();
  await handleCurrentUser(to);
  pathHandler(to, from, next);
});

router.afterEach(() => {
  NProgress.done();
});
