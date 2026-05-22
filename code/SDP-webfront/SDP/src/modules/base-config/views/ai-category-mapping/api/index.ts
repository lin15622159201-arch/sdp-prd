import http from '@/core/http';
import { SYSTEM_ENUM } from '@/core/http/env';
import * as Types from './type';

/**
 * AI品类映射关系（分页）
 * @see https://yapi.tiangong.site/project/36/interface/api/1802
 */
export const getAiCategoryMappingPage = (data: Types.IAiCategoryMappingPageReq) => {
  const url = '/sdp-clothing-material/web/v1/ai-category-mapping/page';
  return http.post<Types.IAiCategoryMappingPageRes>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
  });
};

/**
 * AI品类映射关系（保存）
 * @see https://yapi.tiangong.site/project/36/interface/api/1803
 */
export const updateAiCategoryMapping = (data: Types.IUpdateAiCategoryMappingReq) => {
  const url = '/sdp-clothing-material/web/v1/ai-category-mapping/save';
  return http.post({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};

/**
 * AI品类映射关系（详情）
 * @see https://yapi.tiangong.site/project/36/interface/api/1804
 */
export const getAiCategoryMappingDetail = (id: string) => {
  const url = `/sdp-clothing-material/web/v1/ai-category-mapping/${id}`;
  return http.get<Types.IAiCategoryMappingPageResListItem>({
    server: SYSTEM_ENUM.OLA_API,
    url,
  });
};

/**
 * AI品类映射关系（删除）
 * @see https://yapi.tiangong.site/project/36/interface/api/2293
 */
export const delAiCategoryMapping = (ids: string[]) => {
  const url = '/sdp-clothing-material/web/v1/ai-category-mapping/delete';
  return http.delete({
    server: SYSTEM_ENUM.OLA_API,
    data: ids,
    url,
  });
};

/**
 * 查询AI品类
 * @see https://yapi.tiangong.site/project/43/interface/api/2894
 */
export const getAiCategoryMappingAiCategoryList = (data: Types.IGetCategoryParams) => {
  const url = '/sdp-clothing-material/web/v1/ai-category-mapping/ai-category-list';
  return http.post<Types.IAiCategoryMappingAiCategoryListItem[]>({
    data,
    url,
    noCancelDuplicate: true,
  });
};
