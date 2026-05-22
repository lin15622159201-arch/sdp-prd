import http from '@/core/http';
import type * as Types from './types';

/**
 * 大货bom列表
 */
export const getStyleInfoPageForTuikuan = (data: Types.IStyleInfoPageForTuikuanReq) => {
  const url = '/sdp-order-info/web/v1/prod-bom/page';
  return http.post<Types.IStyleInfoPageListItemForTuikuan[]>({
    url,
    data,
  });
};

// 推款大货bom 详情
export const getProductionBomDetail = (prodBomInfoId: string) => {
  return http.get<Types.IV1ProdBomRes>({
    url: `/sdp-order-info/web/v1/prod-bom/${prodBomInfoId}`,
    loading: true,
  });
};
