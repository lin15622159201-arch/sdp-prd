import { IRouteConfig } from '@/router/types';

export default [
  {
    path: '/finance-manage',
    name: 'FinanceManage',
    component: () => import('@/layouts/main/index.vue'),
    redirect: {},
    meta: {
      title: '财务管理',
      icon: 'components',
      noCache: false,
      auth: true,
    },
    children: [
      {
        path: 'statement/list',
        name: 'FinanceManageStatementManage',
        component: () => import('./statement/views/list/index.vue'),
        meta: {
          title: '对账单管理',
          auth: true,
        },
      },
      {
        path: 'payment/list',
        name: 'FinanceManagePaymentManage',
        component: () => import('./payment/views/list/index.vue'),
        meta: {
          title: '付款单管理',
          auth: true,
        },
      },
    ],
  }
] as IRouteConfig[];
