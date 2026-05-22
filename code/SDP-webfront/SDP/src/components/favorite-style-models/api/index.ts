import http from '@/core/http';
import * as ITypes from './types';

/**
 * 风格模型-用户收藏列表
 *
 * @params {Types.StyleModelUserCollectPageReq} data 风格模型-用户收藏列表参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/101059
 * @return {*}
 */
export const styleModelUserCollectPageApi = (data: ITypes.StyleModelUserCollectPageReq) => {
  const url = '/inspiration/web/style-model/user-collect-page';

  return http.post<ITypes.StyleModelUserCollectPageRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 风格模型-分页查询
 *
 * @params {Types.StyleModelPageReq} data 风格模型-分页查询参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/101056
 * @return {*}
 */
export const styleModelPageApi = (data: ITypes.StyleModelPageReq) => {
  const url = '/inspiration/web/style-model/page';

  return http.post<ITypes.StyleModelPageRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 用户收藏风格模型-收藏或者取消
 *
 * @params {Types.UserCollectStyleModelCollectOrCancelReq} data 用户收藏风格模型-收藏或者取消参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/101053
 * @return {*}
 */
export const userCollectStyleModelCollectOrCancelApi = (data: ITypes.UserCollectStyleModelCollectOrCancelReq) => {
  const url = '/inspiration/web/user-collect-style-model/collectOrCancel';

  return http.post<ITypes.UserCollectStyleModelCollectOrCancelRes>({
    url,
    data,
    loading: true,
  });
};
