import http from '@/core/http';
import { IFabricFmRes, IFabricInfoRes } from './type';
import { SYSTEM_ENUM } from '@/core/http/env';

/**
 * 查看AI设计生图推荐面料结果（传每个分组第一张图片ID）
 * @see https://yapi.tiangong.site/project/18/interface/api/3202
 */
export const getFabricInfo = (params: { pictureId: string; }) => {
  const url = '/inspiration/web/smart-develop-picture/recommend/fabric/info';
  return http.get<IFabricInfoRes>({
    url,
    loading: true,
    params,
  });
};

/**
 * FM面料详情
 * @see https://yapi.tiangong.site/project/855/interface/api/59122
 */
export const getFabricDetail = (commodityId: string) => {
  const url = `/tg-aigc-server/web/v1/fashionmind/commodity/fabric/fm/${commodityId}`;
  return http.get<IFabricFmRes>({
    server: SYSTEM_ENUM.FASHION_DESIGN_API,
    url,
    loading: true,
  });
};
