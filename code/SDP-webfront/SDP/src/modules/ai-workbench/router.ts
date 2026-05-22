import { IRouteConfig } from '@/router/types';

export default [
  {
    path: '/ai-workbench',
    name: 'AiWorkbench',
    component: () => import('@/layouts/main/index.vue'),
    redirect: '/image-restoration/list',
    meta: {
      title: 'AI工作台',
    },
    children: [
      {
        path: 'image-restoration/list',
        name: 'InspirationImageRestorationList',
        component: () => import('./image-restoration/views/list.vue'),
        meta: {
          title: '图片修复',
          auth: true,
          isKeepAlive: false,
        },
      },
      {
        path: 'image-restoration/create',
        name: 'ImageRestorationAdd',
        component: () => import('./image-restoration/views/create.vue'),
        meta: {
          title: '创建任务',
          auth: true,
          isKeepAlive: false,
          activeMenu: 'InspirationImageRestorationList',
        },
      },
      {
        path: 'image-restoration/copy',
        name: 'ImageRestorationCreate',
        component: () => import('./image-restoration/views/create.vue'),
        meta: {
          title: '复制任务',
          auth: true,
          isKeepAlive: false,
          activeMenu: 'InspirationImageRestorationList',
        },
      },
      {
        path: 'image-restoration/detail',
        name: 'ImageRestorationDetail',
        component: () => import('./image-restoration/views/detail/index.vue'),
        meta: {
          title: '查看任务详情',
          auth: true,
          isKeepAlive: false,
          activeMenu: 'InspirationImageRestorationList',
        },
      },
    ],
  },
] as IRouteConfig[];
