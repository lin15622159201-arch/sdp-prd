import { IRouteConfig } from '@/router/types';

export default [
  {
    path: '/design-center',
    name: 'DesignCenter',
    component: () => import('@/layouts/main/index.vue'),
    redirect: '/design-center/inspiration-demand/task-dispatch',
    meta: {
      title: '设计中心',
    },

    children: [
      {
        path: 'inspiration-demand/task-list',
        name: 'DesignCenterInspirationDemandTaskList',
        component: () => import('./inspiration-demand/views/task-list/index.vue'),
        meta: {
          title: '灵感任务分配',
          auth: true,
          isKeepAlive: true,
        },
      },
      {
        path: 'style-manage/list',
        name: 'DesignCenterStyleManageList',
        component: () => import('./style-manage/views/list/index.vue'),
        meta: {
          title: '款式管理',
          auth: true,
          isKeepAlive: true,
        },
      },
      {
        path: 'style-manage/skc-detail/:designCode',
        name: 'DesignCenterStyleManageSkcDetail',
        component: () => import('./style-manage/views/skc-detail/index.vue'),
        meta: {
          title: '款式管理',
          auth: true,
          activeMenu: 'DesignCenterStyleManageList'
        },
      },
      {
        path: 'style-manage/update-skc/:designCode',
        name: 'DesignCenterStyleManageUpdateSkc',
        component: () => import('./style-manage/views/skc-detail/index.vue'),
        meta: {
          title: '款式管理',
          auth: true,
          activeMenu: 'DesignCenterStyleManageList'
        },
      },
      {
        path: 'develop-bom/list',
        name: 'DesignCenterDevelopBomList',
        component: () => import('./develop-bom/views/list/index.vue'),
        meta: {
          title: '开发BOM',
          auth: true,
          isKeepAlive: true
        },
      },
      {
        path: 'develop-bom/detail/:bomId/:page*',
        name: 'DesignCenterDevelopBomDetail',
        component: () => import('./develop-bom/views/detail/index.vue'),
        meta: {
          title: 'BOM详情',
          auth: true,
          activeMenu: 'DesignCenterDevelopBomList'
        },
      },
      {
        path: 'develop-bom/edit/:bomId/:page*',
        name: 'DesignCenterDevelopBomEdit',
        component: () => import('./develop-bom/views/edit/index.vue'),
        meta: {
          title: '编辑BOM',
          auth: true,
          activeMenu: 'DesignCenterDevelopBomList'
        },
      },
      {
        path: 'digital-print-style/list',
        name: 'DesignCenterDigitalPrintStyleList',
        component: () => import('./digital-print-style/views/list/index.vue'),
        meta: {
          title: '数码印花款',
          auth: true,
        },
      },
      {
        path: 'in-stock/update-spu/:taskId',
        name: 'DesignCenterInStockUpdateSpu',
        component: () => import('./in-stock/views/update-spu/index.vue'),
        meta: {
          title: '现货管理',
          auth: true,
          activeMenu: 'DesignCenterInStockList',
        },
      },
      {
        path: 'in-stock/create-spu',
        name: 'DesignCenterInStockCreateSpu',
        component: () => import('./in-stock/views/update-spu/index.vue'),
        meta: {
          title: '现货管理',
          auth: true,
          activeMenu: 'DesignCenterInStockList',
        },
      },
      {
        path: 'in-stock/spu-detail/:taskId',
        name: 'DesignCenterInStockSpuDetail',
        component: () => import('./in-stock/views/update-spu/index.vue'),
        meta: {
          title: '现货管理',
          auth: true,
          activeMenu: 'DesignCenterInStockList',
        },
      },
      {
        path: 'in-stock/list',
        name: 'DesignCenterInStockList',
        component: () => import('./in-stock/views/list/index.vue'),
        meta: {
          title: '现货管理',
          auth: true,
          activeMenu: 'DesignCenterInStockList',
          isKeepAlive: true
        },
      },
      {
        path: 'image-update/list',
        name: 'DesignCenterImageUpdateList',
        component: () => import('./image-update/views/list/index.vue'),
        meta: {
          title: '图片更新任务',
          auth: true,
          isKeepAlive: true
        },
      },
      {
        path: 'image-update/create/:styleCode?/:taskType?',
        name: 'DesignCenterImageUpdateCreate',
        component: () => import('./image-update/views/create/index.vue'),
        meta: {
          title: '创建图片更新任务',
          activeMenu: 'DesignCenterImageUpdateList',
          auth: true,
        },
      },
      {
        path: 'image-update/edit/:taskId',
        name: 'DesignCenterImageUpdateEdit',
        component: () => import('./image-update/views/create/index.vue'),
        meta: {
          title: '编辑图片更新任务',
          activeMenu: 'DesignCenterImageUpdateList',
          auth: true,
        },
      },
      {
        path: 'image-update/detail/:taskId',
        name: 'DesignCenterImageUpdateDetail',
        component: () => import('./image-update/views/detail/index.vue'),
        meta: {
          title: '图片更新任务详情',
          activeMenu: 'DesignCenterImageUpdateList',
          auth: true,
        },
      },
      {
        path: 'payment-task/task-list',
        name: 'DesignCenterPaymentTaskList',
        component: () => import('./payment-task/views/task-list/index.vue'),
        meta: {
          title: '开款任务',
          auth: true,
          isKeepAlive: false,
        },
      },
      {
        path: 'payment-task/create',
        name: 'DesignCenterPaymentTaskCreate',
        component: () => import('./payment-task/views/task-list/create.vue'),
        meta: {
          title: '创建开款任务',
          activeMenu: 'DesignCenterPaymentTaskList',
          auth: true,
        },
      },
      {
        path: 'payment-task/batchPayment',
        name: 'DesignCenterPaymentTaskBatchPayment',
        component: () => import('./payment-task/views/task-list/batchPayment.vue'),
        meta: {
          title: '批量开款',
          activeMenu: 'DesignCenterPaymentTaskList',
          auth: true,
        },
      },
      {
        path: 'payment-task/reviewTask',
        name: 'DesignCenterPaymentTaskBatchReviewTask',
        component: () => import('./payment-task/views/task-list/review-task.vue'),
        meta: {
          title: '开款任务处理',
          activeMenu: 'DesignCenterPaymentTaskList',
          auth: true,
        },
      },
    ],
  },
] as IRouteConfig[];
