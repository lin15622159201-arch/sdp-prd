import { IRouteConfig } from '@/router/types';

export default [
  {
    path: '/selection-manage',
    name: 'SelectionManage',
    component: () => import('@/layouts/main/index.vue'),
    redirect: '/selection-manage/aigc-selection-list',
    meta: {
      title: '选款管理'
    },
    children: [
      {
        path: 'aigc-selection-list',
        name: 'AigcSelectionManageSelectionList',
        component: () => import('./aigc-selection-list/views/list/index.vue'),
        meta: {
          title: 'AIGC选款列表',
          auth: true,
          isKeepAlive: true,
        },
      },
      {
        path: 'aigc-selection-result',
        name: 'AigcSelectionManageSelectionResult',
        component: () => import('./aigc-selection-result/views/list/index.vue'),
        meta: {
          title: 'AIGC选款结果',
          auth: true,
        },
      },
      {
        path: 'quick-selection',
        name: 'QuickSelection',
        component: () => import('./quick-selection/views/index.vue'),
        meta: {
          title: '快速选款',
          auth: false,
          activeMenu: 'AigcSelectionManageSelectionList',
        },
      },
      {
        path: 'quick-selection-fission/:taskType?',
        name: 'QuickSelectionFission',
        component: () => import('./quick-selection-fission/views/index.vue'),
        meta: {
          title: '快速选款',
          auth: false,
          activeMenu: 'AigcSelectionManageSelectionList',
        },
      },
      {
        path: 'aigc-selection-result/detail/:id',
        name: 'AigcSelectionManageSelectionResultDetail',
        component: () => import('./aigc-selection-result/views/detail/index.vue'),
        meta: {
          title: 'AIGC选款结果详情',
          auth: true,
          activeMenu: 'AigcSelectionManageSelectionResult',
        },
      },
      {
        path: 'in-stock-selection',
        name: 'AigcSelectionManageInStockSelection',
        component: () => import('./in-stock-selection/views/list/index.vue'),
        meta: {
          title: '现货选款',
          auth: true,
          activeMenu: 'AigcSelectionManageInStockSelection',
        },
      },
      {
        path: 'in-stock-selection/batch-selection',
        name: 'AigcSelectionManageInStockSelectionBatchSelection',
        component: () => import('./in-stock-selection/views/selection/index.vue'),
        meta: {
          title: '批量选款',
          auth: true,
          activeMenu: 'AigcSelectionManageInStockSelection',
        },
      },
      {
        path: 'in-stock-selection/batch-quote',
        name: 'AigcSelectionManageInStockSelectionBatchQuote',
        component: () => import('./in-stock-selection/views/quote/index.vue'),
        meta: {
          title: '批量报价',
          auth: true,
          activeMenu: 'AigcSelectionManageInStockSelection',
        },
      },
      {
        path: 'in-stock-selection/batch-confirm',
        name: 'AigcSelectionManageInStockSelectionBatchConfirm',
        component: () => import('./in-stock-selection/views/confirm/index.vue'),
        meta: {
          title: '批量确认',
          auth: true,
          activeMenu: 'AigcSelectionManageInStockSelection',
        },
      },
    ],
  }
] as IRouteConfig[];
