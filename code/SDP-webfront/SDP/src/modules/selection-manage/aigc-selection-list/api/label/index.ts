import http from '@/core/http';
import type { IColorLabelListReq, IColorLabelListRes, IGetLabelParams, ILabel } from './type';
/**
 * 基础标签查询
 * @see https://yapi.tiangong.site/project/447/interface/api/57106
 */
export const getLabel = (data: IGetLabelParams) => {
  return http.post<ILabel[]>({
    url: '/bfg/web/v1/fm/base-label/list',
    data,
    loading: true,
  });
};

/**
 * 颜色标签 - 查询
 * @see https://yapi.tiangong.site/project/447/interface/api/59178
 */
export const getColorList = (params: IColorLabelListReq) => {
  const url = '/bfg/v1/fm/color-label/list';
  return http.post<IColorLabelListRes>({
    url,
    data: params,
    loading: true,
  });
};
