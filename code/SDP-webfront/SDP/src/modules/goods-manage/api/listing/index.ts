import { IPushShopReviewReq, IStyleOnShelvesDetailRes, IStyleOnShelvesPageReq, IStyleOnShelvesPageRes, IStyleOnShelvesReviewReq, IStyleOnShelvesStateTotalReq, IStyleOnShelvesStateTotalRes, ProductBatchPublishOrAssociateReq, ProductBatchPublishOrAssociateRes } from './type';
import http from '@/core/http';

/**
 * 待上架列表分页查询
 */
export const fetchStyleOnShelvesPage = async (params: IStyleOnShelvesPageReq) => {
  return http.post<IStyleOnShelvesPageRes>({
    url: '/sdp-curation/web/v1/style-on-shelves/page',
    data: params,
    loading: true,
  });
};

/**
 * 待上架详情
 * @param styleId SPU主键ID
 * @see https://yapi.textile-story.com/project/1361/interface/api/106177
 */
export const fetchStyleOnShelvesDetail = (styleId: string | number) => {
  return http.get<IStyleOnShelvesDetailRes>({
    url: `/sdp-curation/web/v1/style-on-shelves/detail/${styleId}`,
    loading: true,
  });
};

/**
 * 待上架详情
 * @param styleId SPU主键ID
 * @see https://yapi.textile-story.com/project/1361/interface/api/106177
 */
export const fetchStyleOnShelvesDetailAll = (styleId: string | number) => {
  return http.get<IStyleOnShelvesDetailRes>({
    url: `/sdp-curation/web/v1/style-on-shelves/detail-all/${styleId}`,
    loading: true,
  });
};

/**
 * 待上架审核
 * @see https://yapi.textile-story.com/project/1361/interface/api/106195
 */
export const fetchStyleOnShelvesReview = (
  params: IStyleOnShelvesReviewReq,
) => {
  return http.post<boolean>({
    url: '/sdp-curation/web/v1/style-on-shelves/review',
    data: params,
    loading: true,
  });
};

/**
 * 查询任务总数
 * @see https://yapi.textile-story.com/project/1361/interface/api/106921
 */
export const fetchStyleOnShelvesStateTotal = (
  params: IStyleOnShelvesStateTotalReq,
) => {
  return http.post<IStyleOnShelvesStateTotalRes>({
    url: '/sdp-curation/web/v1/style-on-shelves/state-total',
    data: params,
    loading: true,
  });
};

/**
 * 批量发布商品
 * @see https://yapi.textile-story.com/project/1361/interface/api/107011
 */
export const fetchProductBatchPublish = (productIds: string[]) => {
  return http.post<boolean>({
    url: '/sdp-curation/web/v1/product/batch-publish',
    data: productIds,
    loading: true,
  });
};

/**
 * 推送店家审核
 * @see https://yapi.textile-story.com/project/1361/interface/api/111205
 */
export const fetchPushShopReview = (
  params: IPushShopReviewReq,
) => {
  return http.post<boolean>({
    url: '/sdp-curation/web/v1/style-on-shelves/push-shop-review',
    data: params,
    loading: true,
  });
};

/**
 * 批量发布前校验平台上是否已经有同款商品
 *
 * @params {Types.ProductFileEditReq} data 主键Id集合
 * @see https://yapi.textile-story.com/project/1361/interface/api/113617
 * @return {*}
 */
export const checkBeforeBatchPublish = (data: string[]) => {
  const url = '/sdp-curation/web/v1/product/check-before-batch-publish';

  return http.post({
    url,
    data,
    loading: true,
  });
};
/**
 * 批量发布或关联平台商品
 *
 * @params {Types.ProductBatchPublishOrAssociateReq} data 批量发布或关联平台商品参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/113599
 * @return {*}
 */
export const productBatchPublishOrAssociateApi = (data: ProductBatchPublishOrAssociateReq) => {
  const url = '/sdp-curation/web/v1/product/batch-publish-or-associate';

  return http.post<ProductBatchPublishOrAssociateRes>({
    url,
    data,
    loading: true,
  });
};
