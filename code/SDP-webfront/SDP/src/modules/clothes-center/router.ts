export default [
  {
    path: '/clothes-center',
    name: 'ClothesCenter',
    component: () => import('@/layouts/main/index.vue'),
    redirect: {
      // name: 'ContractManageContractList',
    },
    meta: {
      title: '服装工程中心',
      icon: 'components',
      noCache: false,
      auth: true,
    },
    children: [
      {
        path: 'sample-demand/list',
        name: 'ClothesCenterSampleDemandList',
        component: () => import('@/modules/clothes-center/views/sample-demand/list/index.vue'),
        meta: {
          title: '打版需求汇总',
          noCache: false,
          auth: true,
          activeMenu: 'ClothesCenterSampleDemandList',
        },
      },
      {
        path: 'prototype-handover/list',
        name: 'ClothesCenterPrototypeHandoverList',
        component: () => import('@/modules/clothes-center/views/prototype-handover/list/index.vue'),
        meta: {
          title: '版单交接',
          noCache: false,
          auth: true,
          activeMenu: 'ClothesCenterPrototypeHandoverList',
        },
      },
      {
        path: 'audit-craft-task/list',
        name: 'ClothesCenterAuditCraftTaskList',
        component: () => import('@/modules/clothes-center/views/audit-craft-task/views/list/index.vue'),
        meta: {
          title: '审版工艺单任务',
          noCache: false,
          auth: true,
          activeMenu: 'ClothesCenterAuditCraftTaskList',
        },
      },
      {
        path: 'audit-craft-task/detail/:id',
        name: 'ClothesCenterAuditCraftTaskDetail',
        component: () => import('@/modules/clothes-center/views/audit-craft-task/views/edit/index.vue'),
        meta: {
          title: '审版工艺单详情',
          noCache: false,
          auth: true,
          activeMenu: 'ClothesCenterAuditCraftTaskList',
        },
      },
      {
        path: 'audit-craft-task/edit/:id',
        name: 'ClothesCenterAuditCraftTaskEdit',
        component: () => import('@/modules/clothes-center/views/audit-craft-task/views/edit/index.vue'),
        meta: {
          title: '审版工艺单编辑',
          noCache: false,
          auth: true,
          activeMenu: 'ClothesCenterAuditCraftTaskList',
        },
      },
      {
        path: 'paper-task',
        name: 'ClothesCenterPatternTask',
        component: () => import('@/modules/clothes-center/views/paper-task/main.vue'),
        meta: {
          title: '纸样任务',
          noCache: false,
          auth: true,
          activeMenu: 'ClothesCenterPatternTask',
        },
      },
      {
        path: 'paper-task/edit/:id',
        name: 'ClothesCenterPatternTaskEdit',
        component: () => import('@/modules/clothes-center/views/paper-task/pages/edit/index.vue'),
        meta: {
          title: '纸样任务编辑',
          noCache: false,
          auth: true,
          activeMenu: 'ClothesCenterPatternTask',
        },
      },
      {
        path: 'paper-task/detail/:id',
        name: 'ClothesCenterPatternTaskDetail',
        component: () => import('@/modules/clothes-center/views/paper-task/pages/edit/index.vue'),
        meta: {
          title: '纸样任务详情',
          noCache: false,
          auth: true,
          activeMenu: 'ClothesCenterPatternTask',
        },
      },
      {
        path: 'sample-task',
        name: 'ClothesCenterSampleTaskList',
        component: () => import('@/modules/clothes-center/views/sample-task/main.vue'),
        meta: {
          title: '3D打版任务',
          noCache: false,
          auth: true,
          activeMenu: 'ClothesCenterSampleTaskList',
        },
      },
      {
        path: 'style-sew',
        name: 'ClothesCenterStyleSewList',
        component: () => import('@/modules/clothes-center/views/style-sew/main.vue'),
        meta: {
          title: '款式车版',
          noCache: false,
          auth: true,
          activeMenu: 'ClothesCenterStyleSewList',
        },
      },
      {
        path: 'style-sew/edit/:behavior/:id',
        name: 'ClothesCenterStyleSewEdit',
        component: () => import('@/modules/clothes-center/views/style-sew/pages/edit/index.vue'),
        meta: {
          title: '质检详情',
          noCache: false,
          auth: true,
          activeMenu: 'ClothesCenterStyleSewList',
        },
      },
      {
        path: 'style-audit/list',
        name: 'ClothesCenterStyleAuditList',
        component: () => import('@/modules/clothes-center/views/style-audit/list/index.vue'),
        meta: {
          title: '款式审版',
          noCache: false,
          auth: true,
          activeMenu: 'ClothesCenterStyleAuditList',
        },
      },
      {
        path: 'style-audit/edit/:id',
        name: 'ClothesCenterStyleAuditEdit',
        component: () => import('@/modules/clothes-center/views/style-audit/edit/index.vue'),
        meta: {
          title: '审版编辑',
          noCache: false,
          auth: true,
          activeMenu: 'ClothesCenterStyleAuditList',
        },
      },
      {
        path: 'style-audit/detail/:id',
        name: 'ClothesCenterStyleAuditDetail',
        component: () => import('@/modules/clothes-center/views/style-audit/edit/index.vue'),
        meta: {
          title: '审版详情',
          noCache: false,
          auth: true,
          activeMenu: 'ClothesCenterStyleAuditList',
        },
      },
      {
        path: 'secondary-craft/list',
        name: 'ClothesCenterSecondaryCraftList',
        component: () => import('@/modules/clothes-center/views/secondary-craft/list/index.vue'),
        meta: {
          title: '二次工艺汇总',
          auth: true,
          activeMenu: 'ClothesCenterSecondaryCraftList',
        },
      },
    ]
  }
];
