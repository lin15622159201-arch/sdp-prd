import http from '@/core/http';
import {
  ICategoryMappingPageReq,
  ICategoryMappingPageRes,
  ICategoryMappingCreateReq,
} from './type';

/**
 * 品类关联分页
 * @see https://yapi.textile-story.com/project/1361/interface/api/106336
 */
export const fetchCategoryMappingPage = (
  params: ICategoryMappingPageReq,
) => {
  return http.post<ICategoryMappingPageRes>({
    url: '/sdp-curation/web/v1/category-mapping/page',
    data: params,
    loading: true,
  });
};

/**
 * 批量创建品类关联
 * @see https://yapi.textile-story.com/project/1361/interface/api/106333
 */
export const fetchCategoryMappingBatchCreate = (data: ICategoryMappingCreateReq[]) => {
  return http.post<boolean>({
    url: '/sdp-curation/web/v1/category-mapping/batch-create',
    data,
    loading: true,
  });
};

/**
 * 批量删除
 * @see https://yapi.textile-story.com/project/1361/interface/api/106327
 */
export const fetchCategoryMappingBatchRemove = (mappingIds: string[]) => {
  return http.post<boolean>({
    url: '/sdp-curation/web/v1/category-mapping/batch-remove',
    data: mappingIds,
    loading: true,
  });
};
