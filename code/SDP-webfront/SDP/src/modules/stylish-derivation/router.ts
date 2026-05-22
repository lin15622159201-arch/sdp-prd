import { IRouteConfig } from '@/router/types';

export default [
  {
    path: '/stylish-derivation',
    name: 'StylishDerivation',
    component: () => import('@/layouts/main/index.vue'),
    redirect: '/stylish-derived-tasks/list',
    meta: {
      title: '风格化衍生',
    },
    children: [
      {
        path: 'stylish-derived-tasks/list',
        name: 'StylishDerivedTasksList',
        component: () => import('./stylish-derived-tasks/views/list.vue'),
        meta: {
          title: '风格化衍生任务',
          auth: false,
          isKeepAlive: false,
        },
      },
      {
        path: 'stylish-derived-tasks/create',
        name: 'StylishDerivedTasksAdd',
        component: () => import('./stylish-derived-tasks/views/create.vue'),
        meta: {
          title: '创建风格化衍生任务',
          auth: false,
          isKeepAlive: false,
          activeMenu: 'StylishDerivedTasksList',
        },
      },
      {
        path: 'stylish-derived-tasks/create',
        name: 'StylishDerivedTasksCreate',
        component: () => import('./stylish-derived-tasks/views/create.vue'),
        meta: {
          title: '复制风格化衍生任务',
          auth: false,
          isKeepAlive: false,
          activeMenu: 'StylishDerivedTasksList',
        },
      },
      {
        path: 'stylish-derived-tasks/detail',
        name: 'StylishDerivedTasksDetail',
        component: () => import('./stylish-derived-tasks/views/detail/index.vue'),
        meta: {
          title: '查看任务详情',
          auth: false,
          isKeepAlive: false,
          activeMenu: 'StylishDerivedTasksList',
        },
      },
    ],
  },
  {
    path: '/posture-fission',
    name: 'PostureFission',
    component: () => import('@/layouts/main/index.vue'),
    redirect: '/posture-fission/list',
    meta: {
      title: '姿势裂变',
    },
    children: [
      {
        path: 'posture-fission/list',
        name: 'PostureFissionList',
        component: () => import('./posture-fission/views/list.vue'),
        meta: {
          title: '姿势裂变列表',
          auth: false,
          isKeepAlive: false,
        },
      },
      {
        path: 'posture-fission/create',
        name: 'PostureFissionAdd',
        component: () => import('./posture-fission/views/create.vue'),
        meta: {
          title: '创建姿势裂变任务',
          auth: false,
          isKeepAlive: false,
          activeMenu: 'PostureFissionList',
        },
      },
      {
        path: 'posture-fission/copy',
        name: 'PostureFissionCreate',
        component: () => import('./posture-fission/views/create.vue'),
        meta: {
          title: '复制姿势裂变任务',
          auth: false,
          isKeepAlive: false,
          activeMenu: 'PostureFissionList',
        },
      },
      {
        path: 'posture-fission/detail',
        name: 'PostureFissionDetail',
        component: () => import('./posture-fission/views/detail/index.vue'),
        meta: {
          title: '查看任务详情',
          auth: false,
          isKeepAlive: false,
          activeMenu: 'PostureFissionList',
        },
      },
    ],
  },
] as IRouteConfig[];
