import { IRouteConfig } from '@/router/types';

export default [
  {
    path: '/inspiration-center',
    name: 'InspirationCenter',
    component: () => import('@/layouts/main/index.vue'),
    redirect: '/inspiration-source/list',
    meta: {
      title: '灵感中心',
    },
    children: [
      {
        path: 'inspiration-source/list',
        name: 'InspirationCenterInspirationSourceList',
        component: () => import('./inspiration-source/views/list/index.vue'),
        meta: {
          title: '灵感源列表',
          auth: true,
          isKeepAlive: false,
        },
      },
      {
        path: 'inspiration-source/detail/:id',
        name: 'InspirationCenterInspirationSourceDetail',
        component: () => import('./inspiration-source/views/detail/index.vue'),
        meta: {
          title: '查看任务详情',
          auth: true,
          isKeepAlive: false,
          activeMenu: 'InspirationCenterInspirationSourceList',
        },
      },
      {
        path: 'cloth-color-replacer/list',
        name: 'InspirationCenterClothColorReplacerList',
        component: () => import('./views/cloth-color-replacer/list/index.vue'),
        meta: {
          title: '服装换色',
          auth: true,
          isKeepAlive: false,
        },
      },
      {
        path: 'cloth-color-replacer/create/:copyId?',
        name: 'InspirationCenterClothColorReplacerCreate',
        component: () => import('./views/cloth-color-replacer/create/index.vue'),
        meta: {
          title: '创建服装换色任务',
          auth: true,
          isKeepAlive: false,
          activeMenu: 'InspirationCenterClothColorReplacerList',
        },
      },
      {
        path: 'cloth-color-replacer/detail/:id',
        name: 'InspirationCenterClothColorReplacerDetail',
        component: () => import('./views/cloth-color-replacer/detail/index.vue'),
        meta: {
          title: '服装换色任务详情',
          auth: true,
          isKeepAlive: false,
          activeMenu: 'InspirationCenterClothColorReplacerList',
        },
      },
    ],
  },
] as IRouteConfig[];
