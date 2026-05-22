import http from '@/core/http';
import * as Types from './types';

/**
 * 新增
 * @see yapi地址：https://yapi.textile-story.com/project/974/interface/api/75300
 */
export const splitCreate = (params: Types.ISplitCreateReq) => {
  const url = '/aigc-transfer/web/split/create';
  return http.post<string>({
    url,
    data: params,
    loading: false,
  });
};

/**
 * 详情
 * @see yapi地址：https://yapi.textile-story.com/project/974/interface/api/75292
 */
export const webSplit = (params: Types.IWebSplitReq) => {
  const url = `/aigc-transfer/web/split/${params.id}`;
  return http.get<Types.IWebSplitRes>({
    url,
    data: params,
    loading: false,
  });
};
