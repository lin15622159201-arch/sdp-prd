import { IRouteConfig } from '@/router/types';

export default [
  {
    path: '',
    component: () => import('@/layouts/main/index.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('./views/dashboard/index.vue'),
        meta: {
          title: '首页',
          auth: true,
        },
      },
      {
        path: 'webview',
        name: 'Webview',
        component: () => import('./views/webview/index.vue'),
        meta: {
          auth: true,
        },
      },
    ],
  },
  {
    path: '/upload-image-h5/:id',
    name: 'UploadImageH5',
    component: () => import('./views/upload-image-h5/index.vue'),
    meta: {
    },
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('./views/error-page/404.vue'),
    meta: {
    },
  },

  {
    path: '/403',
    name: 'NoAuth',
    component: () => import('./views/error-page/403.vue'),
    meta: {},
  },

  {
    path: '/401',
    name: 'NoLogin',
    component: () => import('./views/error-page/401.vue'),
    meta: {},
  },

  {
    path: '/redirect',
    component: () => import('@/layouts/main/index.vue'),
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('./views/redirect/index.vue'),
        meta: {},
      },
    ],
  },
] as IRouteConfig[];
