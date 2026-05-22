export default [
  {
    path: '/resource-lib',
    name: 'ResourceLib',
    component: () => import('@/layouts/main/index.vue'),
    redirect: {
      name: 'ResourceLibPatternLibs',
    },
    meta: {
      title: '资源库',
      icon: 'components',
      noCache: false,
      auth: true,
    },
    children: [
      {
        path: 'paper-pattern',
        name: 'ResourceLibPaperPattern',
        component: () => import('@/modules/resource-lib/views/paper-pattern/list.vue'),
        meta: {
          title: '开发纸样库',
          noCache: false,
          auth: true,
          activeMenu: 'ResourceLibPaperPattern',
        },
      },
      {
        path: 'size-pattern',
        name: 'ResourceLibSizePattern',
        component: () => import('@/modules/resource-lib/views/size-pattern/list.vue'),
        meta: {
          title: '开发尺寸库',
          noCache: false,
          auth: true,
          activeMenu: 'ResourceLibSizePattern',
        },
      },
      {
        path: 'bom-pattern',
        name: 'ResourceLibBomPattern',
        component: () => import('@/modules/resource-lib/views/bom-pattern/list.vue'),
        meta: {
          title: '开发BOM库',
          noCache: false,
          auth: true,
          activeMenu: 'ResourceLibBomPattern',
        },
      },
      {
        path: 'sample-clothes',
        name: 'ResourceLibSampleClothes',
        component: () => import('@/modules/resource-lib/views/sample-clothes/list.vue'),
        meta: {
          title: '样衣排料库',
          noCache: false,
          auth: true,
          activeMenu: 'ResourceLibSampleClothes',
        },
      },
      {
        path: 'bulk-paper',
        name: 'ResourceLibBulkPaper',
        component: () => import('@/modules/resource-lib/views/bulk-paper/list.vue'),
        meta: {
          title: '大货纸样库',
          noCache: false,
          auth: true,
          activeMenu: 'ResourceLibBulkPaper',
        },
      },
      {
        path: 'bulk-size',
        name: 'ResourceLibBulkSize',
        component: () => import('@/modules/resource-lib/views/bulk-size/list.vue'),
        meta: {
          title: '大货尺寸库',
          noCache: false,
          auth: true,
          activeMenu: 'ResourceLibBulkSize',
        },
      },
    ],
  },
];
