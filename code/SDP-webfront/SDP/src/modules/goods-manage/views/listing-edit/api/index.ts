import http from '@/core/http';
import * as Types from './types';

/**
 * 仓库列表查询
 *
 * @params {Types.TemuWarehouseReq} data 仓库列表查询参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/106930
 * @return {*}
 */
export const temuWarehouseApi = (data: Types.TemuWarehouseReq) => {
  const url = '/sdp-curation/web/v1/temu/warehouse';

  return http.post<Types.TemuWarehouseRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 分页
 *
 * @params {Types.CategoryMappingPageReq} data 分页参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/106336
 * @return {*}
 */
export const categoryMappingPageApi = (data: Types.CategoryMappingPageReq) => {
  const url = '/sdp-curation/web/v1/category-mapping/page';

  return http.post<Types.CategoryMappingPageRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 新增商品
 *
 * @params {Types.ProductCreateReq} data 新增商品参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/106312
 * @return {*}
 */
export const productCreateApi = (data: Types.ProductCreateReq) => {
  const url = '/sdp-curation/web/v1/product/create';

  return http.post<Types.ProductCreateRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 编辑SKC
 *
 * @params {Types.ProductSkcUpsertReq} data 编辑SKC参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/108325
 * @return {*}
 */
export const productSkcUpsertApi = (data: Types.ProductCreateReq) => {
  const url = '/sdp-curation/web/v1/product/skc-upsert';

  return http.post<Types.ProductCreateRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 编辑商品图
 *
 * @params {Types.ProductFileEditReq} data 编辑商品图参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/108298
 * @return {*}
 */
export const productFileEditApi = (data: Types.ProductFileEditReq) => {
  const url = '/sdp-curation/web/v1/product/file-edit';

  return http.post<Types.ProductFileEditRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 货品包装清单类型查询
 *
 * @params {Types.TemuAccessoriesReq} data 货品包装清单类型查询参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/113887
 * @return {*}
 */
export const temuAccessoriesApi = (data: Types.TemuAccessoriesReq) => {
  const url = '/sdp-curation/web/v1/temu/accessories';

  return http.post<Types.TemuAccessoriesRes>({
    url,
    data,
    loading: true,
  });
};
