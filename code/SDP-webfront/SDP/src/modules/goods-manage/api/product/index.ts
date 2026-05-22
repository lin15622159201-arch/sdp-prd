import http from '@/core/http';
import type { IProductPageReq, IProductPageRes, IProductStateTotalReq, IProductStateTotalRes, IProductTestPriceReq } from './type';

/**
 * 分页
 * @see https://yapi.textile-story.com/project/1361/interface/api/106795
 */
export const fetchProductPage = (params: IProductPageReq) => {
  return http.post<IProductPageRes>({
    url: '/sdp-curation/web/v1/product/page',
    data: params,
    loading: true,
  });
};

/**
 * 查询商品总数
 * @see https://yapi.textile-story.com/project/1361/interface/api/106876
 */
export const fetchProductStateTotal = (
  params: IProductStateTotalReq,
) => {
  return http.post<IProductStateTotalRes>({
    url: '/sdp-curation/web/v1/product/state-total',
    data: params,
    loading: true,
  });
};

/**
 * 测价
 * @see https://yapi.textile-story.com/project/1361/interface/api/108289
 */
export const fetchProductBatchTestPrice = (data: IProductTestPriceReq[]) => {
  return http.post<boolean>({
    url: '/sdp-curation/web/v1/product/batch-test-price',
    data,
    loading: true,
  });
};
