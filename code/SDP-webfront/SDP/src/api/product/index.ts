import http from '@/core/http/index';
import type * as Types from './types';

const loading = true;

/**
 * 查询好料网面辅料信息 自选物料
 */
export const postMaterialBySkuIdList = (data: Types.IBomGoodMaterialReq) => {
  return http.post<Types.IBomGoodMaterialRes>({
    url: '/sdp-design/web/v1/bom/good-material',
    data,
    loading,
  });
};
