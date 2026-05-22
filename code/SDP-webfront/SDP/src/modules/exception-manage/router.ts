import { IRouteConfig } from '@/router/types';

export default [
  {
    path: '/exception',
    name: 'Exception',
    component: () => import('@/layouts/main/index.vue'),
    redirect: 'ExceptionHandleList',
    meta: {
      title: '异常管理',
      icon: 'components',
    },
    children: [
      {
        path: 'exception-handle/list',
        name: 'ExceptionHandleList',
        component: () => import('./exception-handle/views/list.vue'),
        meta: {
          title: '异常处理',
          auth: true,
          activeMenu: 'ExceptionHandleList',
        },
      },
      {
        path: 'sample-repair/list',
        name: 'SampleRepairList',
        component: () => import('./sample-repair/views/list.vue'),
        meta: {
          title: '样衣返修',
          auth: true,
          activeMenu: 'SampleRepairList',
        },
      },
    ],
  },
] as IRouteConfig[];
