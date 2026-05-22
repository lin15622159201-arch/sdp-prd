import { IRouteConfig } from '@/router/types';

export default [
  {
    path: '/material-schedule',
    name: 'MaterialSchedule',
    component: () => import('@/layouts/main/index.vue'),
    redirect: '/material-schedule/purchase-kitting/list',
    meta: {
      title: '物料进度管理',
    },

    children: [
      {
        path: 'purchase-kitting/list',
        name: 'MaterialSchedulePurchaseKittingList',
        component: () => import('./purchase-kitting/views/list/index.vue'),
        meta: {
          title: '物料齐套跟进',
          auth: true,
        },
      },
      {
        path: 'purchase-kitting/sign',
        name: 'MaterialSchedulePurchaseKittingSign',
        component: () => import('./purchase-kitting/views/sign/index.vue'),
        meta: {
          title: '物料齐套签收',
          auth: true,
        },
      },
      {
        path: 'purchase-follow/list',
        name: 'MaterialSchedulePurchaseFollowList',
        component: () => import('./purchase-follow/views/list/index.vue'),
        meta: {
          title: '物料采购跟进',
          auth: true,
        },
      },
      {
        path: 'threed-collection/list',
        name: 'ThreedCollectionList',
        component: () => import('./threed-collection/views/list/index.vue'),
        meta: {
          title: '3D采集任务',
          auth: true,
        },
      },
      {
        path: 'digital-draft-task/list',
        name: 'DigitalDraftTaskList',
        component: () => import('./digital-draft-task/views/list/index.vue'),
        meta: {
          title: '数码描稿任务',
          auth: true,
        },
      },
    ],
  },
] as IRouteConfig[];
