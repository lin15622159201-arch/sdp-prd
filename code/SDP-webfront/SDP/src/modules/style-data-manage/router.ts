import { IRouteConfig } from '@/router/types';

export default [
  {
    path: '/style-data-manage',
    name: 'StyleDataManage',
    component: () => import('@/layouts/main/index.vue'),
    redirect: {},
    meta: {
      title: '服装工程中心',
      icon: 'components',
      noCache: false,
      auth: true,
    },
    children: [
      {
        path: 'large-bom/list',
        name: 'StyleDataManageLargeBomList',
        component: () => import('./large-bom/views/list/index.vue'),
        meta: {
          title: '大货BOM',
          auth: true,
        },
      },
      {
        path: 'large-bom/detail/:id',
        name: 'StyleDataManageLargeBomDetail',
        component: () => import('./large-bom/views/detail/index.vue'),
        meta: {
          title: '大货BOM详情',
          activeMenu: 'StyleDataManageLargeBomList',
          auth: true,
        },
      },
      {
        path: 'dosage-account/list',
        name: 'StyleDataManageDosageAccountList',
        component: () => import('./dosage-account/views/list/index.vue'),
        meta: {
          title: '用量核算',
          auth: true,
        },
      },
      {
        path: 'dosage-account/detail/:id',
        name: 'StyleDataManageDosageAccountDetail',
        component: () => import('./dosage-account/views/update/index.vue'),
        meta: {
          title: '用量核算详情',
          activeMenu: 'StyleDataManageDosageAccountList',
          auth: true,
        },
      },
      {
        path: 'dosage-account/update/:id',
        name: 'StyleDataManageDosageAccountUpdate',
        component: () => import('./dosage-account/views/update/index.vue'),
        meta: {
          title: '编辑用量核算',
          activeMenu: 'StyleDataManageDosageAccountList',
          auth: true,
        },
      },
      {
        path: 'style-peicing/list',
        name: 'StyleDataManageStylePeicingList',
        component: () => import('./style-pricing/views/list/index.vue'),
        meta: {
          title: '款式核价',
          auth: true,
        },
      },
      {
        path: 'style-peicing/detail/:id',
        name: 'StyleDataManageStylePeicingDetail',
        component: () => import('./style-pricing/views/edit/index.vue'),
        meta: {
          title: '款式核价详情',
          activeMenu: 'StyleDataManageStylePeicingList',
          auth: true,
        },
      },
      {
        path: 'style-peicing/edit/:id',
        name: 'StyleDataManageStylePeicingEdit',
        component: () => import('./style-pricing/views/edit/index.vue'),
        meta: {
          title: '款式核价编辑',
          activeMenu: 'StyleDataManageStylePeicingList',
          auth: true,
        },
      },
      {
        path: 'estimate-pricing/list',
        name: 'StyleDataManageEstimatePricingList',
        component: () => import('./estimate-pricing/views/list/index.vue'),
        meta: {
          title: '预估核价',
          auth: true,
        },
      },
      {
        path: 'estimate-peicing/detail/:id',
        name: 'StyleDataManageEstimatePeicingDetail',
        component: () => import('./estimate-pricing/views/edit/index.vue'),
        meta: {
          title: '预估核价详情',
          activeMenu: 'StyleDataManageEstimatePricingList',
          auth: true,
        },
      },
      {
        path: 'estimate-peicing/edit/:id',
        name: 'StyleDataManageEstimatePeicingEdit',
        component: () => import('./estimate-pricing/views/edit/index.vue'),
        meta: {
          title: '预估核价编辑',
          activeMenu: 'StyleDataManageEstimatePricingList',
          auth: true,
        },
      },
      {
        path: 'large/list',
        name: 'StyleDataManageLargeList',
        component: () => import('./large/views/list/index.vue'),
        meta: {
          title: '大货资料',
          auth: true,
        },
      },
      {
        path: 'large/detail/:id',
        name: 'StyleDataManageLargeDetail',
        component: () => import('./large/views/edit/index.vue'),
        meta: {
          title: '大货资料详情',
          activeMenu: 'StyleDataManageLargeList',
          auth: true,
        },
      },
      {
        path: 'large/edit/:id',
        name: 'StyleDataManageLargeEdit',
        component: () => import('./large/views/edit/index.vue'),
        meta: {
          title: '大货资料编辑',
          activeMenu: 'StyleDataManageLargeList',
          auth: true,
        },
      },
    ],
  },
] as IRouteConfig[];
