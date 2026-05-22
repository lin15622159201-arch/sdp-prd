import { IRouteConfig } from '@/router/types';

export default [
  {
    path: '/goods-manage',
    name: 'GoodsManage',
    component: () => import('@/layouts/main/index.vue'),
    meta: {
      title: '商品管理',
    },
    children: [
      {
        path: 'pending-listing',
        name: 'GoodsManagePendingListing',
        component: () => import('./views/pending-listing/index.vue'),
        meta: {
          title: '待上架',
          auth: true,
          isKeepAlive: true,
        },
      },
      {
        path: 'approve-listing/:styleId/:mode?',
        name: 'GoodsManageApproveListing',
        component: () => import('./views/listing-edit/index.vue'),
        meta: {
          title: '审核上架',
          auth: true,
          isKeepAlive: false,
          activeMenu: 'GoodsManagePendingListing',
        },
      },
      {
        path: 'approve-editedit/:styleId/:mode?',
        name: 'GoodsManageApproveEdit',
        component: () => import('./views/listing-edit/index.vue'),
        meta: {
          title: '编辑',
          auth: true,
          isKeepAlive: false,
          activeMenu: 'GoodsManagePendingListing',
        },
      },
      {
        path: 'approve-detailIng/:styleId/:mode?',
        name: 'GoodsManageApproveDetailIng',
        component: () => import('./views/listing-edit/index.vue'),
        meta: {
          title: '查看详情',
          auth: true,
          isKeepAlive: false,
          activeMenu: 'GoodsManagePendingListing',
        },
      },
      {
        path: 'product-list',
        name: 'GoodsManageProductList',
        component: () => import('./views/product-list/index.vue'),
        meta: {
          title: '商品列表',
          auth: true,
          isKeepAlive: true,
        },
      },
      {
        path: 'product-editSkc/:styleId/:mode?',
        name: 'GoodsManageProductSkcEdit',
        component: () => import('./views/listing-edit/index.vue'),
        meta: {
          title: '编辑skc',
          auth: true,
          isKeepAlive: false,
          activeMenu: 'GoodsManageProductList',
        },
      },
      {
        path: 'product-editImg/:styleId/:mode?',
        name: 'GoodsManageProductImgEdit',
        component: () => import('./views/listing-edit/index.vue'),
        meta: {
          title: '编辑图片',
          auth: true,
          isKeepAlive: false,
          activeMenu: 'GoodsManageProductList',
        },
      },
      {
        path: 'product-editDetail/:styleId/:mode?',
        name: 'GoodsManageProductImgDetail',
        component: () => import('./views/listing-edit/index.vue'),
        meta: {
          title: '查看详情',
          auth: true,
          isKeepAlive: false,
          activeMenu: 'GoodsManageProductList',
        },
      },
    ],
  },
] as IRouteConfig[];
