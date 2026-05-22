import http from '@/core/http';
import { IPublishPlatformListReq, IPublishPlatformListRes } from './type';

/**
 * 发布平台列表
 * @see https://yapi.tiangong.site/project/31/interface/api/1322
 */
export const fetchPublishPlatformList = (params: IPublishPlatformListReq) => {
  const url = '/pop-product-service/web/v1/publish-platform/list';
  return http.post<IPublishPlatformListRes>({
    url,
    data: params,
    loading: true,
  });
};
