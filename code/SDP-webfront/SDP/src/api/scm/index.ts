import http from '@/core/http';
import type * as Types from './types';
import { SYSTEM_ENUM } from '@/core/http/env';

/** TODO:接口没用到
 * WEB - 供应商列表
 * @see https://yapi.tiangong.site/project/93/interface/api/9306
 */
export const scmPostSupplierPageApi = (params: Types.IPostScmSupplierPageReq) => {
  const url = '/plm-buyer/web/v1/scm/supplier/inner/v1/supplier/page';
  return http.post<Types.IPostScmSupplierPageRes>({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 根据供应商id查询供应商明细信息
 * @see https://yapi.tiangong.site/project/93/interface/api/11203
 */
export const scmGetSupplierInfoDetailApi = (supplierId: string) => {
  const url = `/plm-buyer/web/v1/scm/supplier/inner/v1/supplier/info/detail/${supplierId}`;
  return http.get<Types.ISupplierInfoDetailRes>({
    url,
    loading: true,
  });
};

/**
 * WEB - 通过供应商id获取供应商信息
 * @see https://yapi.tiangong.site/project/93/interface/api/9319
 */
export const scmPostSupplierSupplierInfosApi = (params: Types.IPostSupplierSupplierInfosReq) => {
  const url = '/plm-buyer/web/v1/scm/supplier/inner/v1/supplier/supplier-infos';
  return http.post<Types.IPostSupplierSupplierInfosRes>({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 面料商列表
 * @see https://yapi.tiangong.site/project/93/interface/api/9299
 */
export const scmPostsupplierFabricPageApi = (params: Types.IScmPostsupplierFabricPageReq) => {
  const url = '/plm-buyer/web/v1/scm/supplier/inner/v1/supplier/fabric/page';
  return http.post<Types.IScmPostsupplierFabricPageRes>({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 根据供应商id查询供应商明细信息
 * @see https://yapi.tiangong.site/project/93/interface/api/11208
 */
export const scmGetV2SupplierInfoDetail = (supplierId: string) => {
  const url = `/plm-buyer/web/v1/scm/supplier/inner/v1/supplier/info/detail/${supplierId}`;
  return http.get<Types.IV2SupplierInfoDetailRes>({
    url,
    loading: true,
  });
};

/**
 * 商品-商品字典数据
 * @see https://yapi.tiangong.site/project/93/interface/api/9281
 */
export const scmGetCommodityDictionary = () => {
  const url = '/plm-buyer/web/v1/scm/commodity-feign/web/v3/commodity/dictionary';
  return http.get<Types.ICommodityDictionaryRes>({
    url,
    // isNotCancel: true,
    // isCancelDuplicateUrlRequests: false,
  });
};

/**
 *  (商品库)类目 - 商品类目
 * 接口来源履约
 */
export const getCategoryList = (productType: Types.ICategoryListReq) => {
  const url = `/sdp-design/web/v1/scm/product/inner/v1/category/list/${productType}`;
  return http.get<Types.ICategoryListItem[]>({
    url,
  });
};
