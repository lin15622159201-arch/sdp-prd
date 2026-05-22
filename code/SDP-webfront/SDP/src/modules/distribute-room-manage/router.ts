export default [
  {
    path: '/distribute-room-manage',
    name: 'DistributeRoomManage',
    component: () => import('@/layouts/main/index.vue'),
    redirect: {
      name: 'DistributeRoomManageCooperationRoomList',
    },
    meta: {
      title: '供应商信息管理',
      icon: 'components',
      noCache: false,
      auth: false,
    },
    children: [
      {
        path: 'cooperation-room-list',
        name: 'DistributeRoomManageCooperationRoomList',
        component: () => import('@/modules/distribute-room-manage/views/list.vue'),
        meta: {
          title: '合作版房',
          noCache: false,
          auth: true,
          activeMenu: 'DistributeRoomManageCooperationRoomList',
        },
      },
      {
        path: 'share-room-list',
        name: 'DistributeRoomManageShareRoomList',
        component: () => import('@/modules/distribute-room-manage/views/list.vue'),
        meta: {
          title: '共享版房',
          noCache: false,
          auth: true,
          activeMenu: 'DistributeRoomManageShareRoomList',
        },
      },
      {
        path: 'part-time-room-list',
        name: 'DistributeRoomManagePartTimeRoomList',
        component: () => import('@/modules/distribute-room-manage/views/list.vue'),
        meta: {
          title: '兼职人员',
          noCache: false,
          auth: true,
          activeMenu: 'DistributeRoomManagePartTimeRoomList',
        },
      },
      {
        path: 'cooperation-room-detail',
        name: 'DistributeRoomManageCooperationRoomDetail',
        component: () => import('@/modules/distribute-room-manage/views/detail/add-edit-detail.vue'),
        meta: {
          title: '合作版房详情',
          noCache: false,
          auth: true,
          activeMenu: 'DistributeRoomManageCooperationRoomList',
        },
      },
      {
        path: 'cooperation-room-edit',
        name: 'DistributeRoomManageCooperationRoomEdit',
        component: () => import('@/modules/distribute-room-manage/views/detail/add-edit-detail.vue'),
        meta: {
          title: '合作版房编辑',
          noCache: false,
          auth: true,
          activeMenu: 'DistributeRoomManageCooperationRoomList',
        },
      },
      {
        path: 'cooperation-room-add',
        name: 'DistributeRoomManageCooperationRoomAdd',
        component: () => import('@/modules/distribute-room-manage/views/detail/add-edit-detail.vue'),
        meta: {
          title: '新增合作版房',
          noCache: false,
          auth: true,
          activeMenu: 'DistributeRoomManageCooperationRoomList',
        },
      },
      {
        path: 'share-room-detail',
        name: 'DistributeRoomManageShareRoomDetail',
        component: () => import('@/modules/distribute-room-manage/views/detail/add-edit-detail.vue'),
        meta: {
          title: '共享版房详情',
          noCache: false,
          auth: true,
          activeMenu: 'DistributeRoomManageShareRoomList',
        },
      },
      {
        path: 'share-room-edit',
        name: 'DistributeRoomManageShareRoomEdit',
        component: () => import('@/modules/distribute-room-manage/views/detail/add-edit-detail.vue'),
        meta: {
          title: '共享版房编辑',
          noCache: false,
          auth: true,
          activeMenu: 'DistributeRoomManageShareRoomList',
        },
      },
      {
        path: 'share-room-add',
        name: 'DistributeRoomManageShareRoomAdd',
        component: () => import('@/modules/distribute-room-manage/views/detail/add-edit-detail.vue'),
        meta: {
          title: '新增共享版房',
          noCache: false,
          auth: true,
          activeMenu: 'DistributeRoomManageShareRoomList',
        },
      },
      {
        path: 'part-time-room-detail',
        name: 'DistributeRoomManagePartTimeRoomDetail',
        component: () => import('@/modules/distribute-room-manage/views/detail/add-edit-detail.vue'),
        meta: {
          title: '兼职人员详情',
          noCache: false,
          auth: true,
          activeMenu: 'DistributeRoomManagePartTimeRoomList',
        },
      },
      {
        path: 'part-time-room-edit',
        name: 'DistributeRoomManagePartTimeRoomEdit',
        component: () => import('@/modules/distribute-room-manage/views/detail/add-edit-detail.vue'),
        meta: {
          title: '兼职人员编辑',
          noCache: false,
          auth: true,
          activeMenu: 'DistributeRoomManagePartTimeRoomList',
        },
      },
      {
        path: 'part-time-room-add',
        name: 'DistributeRoomManagePartTimeRoomAdd',
        component: () => import('@/modules/distribute-room-manage/views/detail/add-edit-detail.vue'),
        meta: {
          title: '新增兼职人员',
          noCache: false,
          auth: true,
          activeMenu: 'DistributeRoomManagePartTimeRoomList',
        },
      },
    ],
  },
];
