import http from '@/core/http';
import { ISizeDiffCreateReq, ISizeDiffEditReq, ISizeDiffPageReq, ISizeDiffPageRes, ITemuPartListRes } from './types';

/**
 * 分页
 * @see https://yapi.textile-story.com/project/1361/interface/api/112015
 */
export const fetchSizeDiffPage = (params: ISizeDiffPageReq) => {
  return http.post<ISizeDiffPageRes>({
    url: '/sdp-curation/web/v1/size-diff/page',
    data: params,
    loading: true,
  });
};

/**
 * 编辑
 * @see https://yapi.textile-story.com/project/1361/interface/api/111997
 */
export const fetchSizeDiffEdit = (params: ISizeDiffEditReq) => {
  return http.put<boolean>({
    url: '/sdp-curation/web/v1/size-diff/edit',
    data: params,
    loading: true,
  });
};

/**
 * 创建
 * @see https://yapi.textile-story.com/project/1361/interface/api/112033
 */
export const fetchSizeDiffCreate = (params: ISizeDiffCreateReq) => {
  return http.post<boolean>({
    url: '/sdp-curation/web/v1/size-diff/create',
    data: params,
    loading: true,
  });
};

/**
 * 查询所有部位
 * @see https://yapi.textile-story.com/project/1361/interface/api/112042
 */
export const fetchTemuPartList = () => {
  return http.get<ITemuPartListRes>({
    url: '/sdp-curation/web/v1/temu/part-list',
    loading: true,
  });
};
