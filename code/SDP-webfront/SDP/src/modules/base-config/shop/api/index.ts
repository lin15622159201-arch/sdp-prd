import http from '@/core/http';
import type { ICustomerPageReq, ICustomerPageRes, IShopBatchCreateReq, IShopBatchEnableReq, IShopEditReq, IShopPageReq, IShopPageRes } from './type';

/**
 * 店铺分页
 * @see https://yapi.textile-story.com/project/1361/interface/api/106387
 */
export const fetchShopPage = (params: IShopPageReq) => {
  return http.post<IShopPageRes>({
    url: '/sdp-curation/web/v1/shop/page',
    data: params,
    loading: true,
  });
};

/**
 * 批量启用
 * @see https://yapi.textile-story.com/project/1361/interface/api/106723
 */
export const fetchShopBatchEnable = (data: IShopBatchEnableReq) => {
  return http.post<boolean>({
    url: '/sdp-curation/web/v1/shop/batch-enable',
    data,
    loading: true,
  });
};

/**
 * 批量创建
 * @see https://yapi.textile-story.com/project/1361/interface/api/106390
 */
export const fetchShopBatchCreate = (data: IShopBatchCreateReq) => {
  return http.post<boolean>({
    url: '/sdp-curation/web/v1/shop/batch-create',
    data,
    loading: true,
  });
};

/**
 * 编辑
 * @see https://yapi.textile-story.com/project/1361/interface/api/106381
 */
export const fetchShopEdit = (params: IShopEditReq) => {
  return http.put<boolean>({
    url: '/sdp-curation/web/v1/shop/edit',
    data: params,
    loading: true,
  });
};

/**
 * 客户分页
 * @see https://yapi.textile-story.com/project/1361/interface/api/106447
 */
export const fetchCustomerPage = (params: ICustomerPageReq) => {
  return http.post<ICustomerPageRes>({
    url: '/sdp-curation/web/v1/customer/page',
    data: params,
    loading: true,
  });
};
