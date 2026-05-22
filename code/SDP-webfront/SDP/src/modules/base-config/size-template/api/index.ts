import http from '@/core/http';
import type { ISizeTempBatchEnableReq, ISizeTempCreateReq, ISizeTempEditReq, ISizeTempPageReq, ISizeTempPageRes } from './types';

/**
 * 尺码表模板分页
 * @see https://yapi.textile-story.com/project/1361/interface/api/106477
 */
export const fetchSizeTempPage = (params: ISizeTempPageReq) => {
  return http.post<ISizeTempPageRes>({
    url: '/sdp-curation/web/v1/size-temp/page',
    data: params,
    loading: true,
  });
};

/**
 * 批量启用
 * @see https://yapi.textile-story.com/project/1361/interface/api/106465
 */
export const fetchSizeTempBatchEnable = (data: ISizeTempBatchEnableReq) => {
  return http.post<boolean>({
    url: '/sdp-curation/web/v1/size-temp/batch-enable',
    data,
    loading: true,
  });
};

/**
 * 编辑尺寸模板
 * @see https://yapi.textile-story.com/project/1361/interface/api/106471
 */
export const fetchSizeTempEdit = (params: ISizeTempEditReq) => {
  return http.put<boolean>({
    url: '/sdp-curation/web/v1/size-temp/edit',
    data: params,
    loading: true,
  });
};

/**
 * 批量创建
 * @see https://yapi.textile-story.com/project/1361/interface/api/106459
 */
export const fetchSizeTempBatchCreate = (data: ISizeTempCreateReq[]) => {
  return http.post<boolean>({
    url: '/sdp-curation/web/v1/size-temp/batch-create',
    data,
    loading: true,
  });
};
