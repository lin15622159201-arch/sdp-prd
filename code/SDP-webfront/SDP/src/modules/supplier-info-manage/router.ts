export default [
  {
    path: '/supplier-info-manage',
    name: 'SupplierInfoManage',
    component: () => import('@/layouts/main/index.vue'),
    redirect: {
      name: 'SupplierInfoManageLogoSupplierList',
    },
    meta: {
      title: '供应商信息管理',
      icon: 'components',
      noCache: false,
      auth: false,
    },
    children: [
      {
        path: 'logo-supplier-list',
        name: 'SupplierInfoManageLogoSupplierList',
        component: () => import('./views/list/index.vue'),
        meta: {
          title: '印花供应商',
          noCache: false,
          auth: true,
          activeMenu: 'SupplierInfoManageLogoSupplierList',
        },
      },
    ],
  },
];
