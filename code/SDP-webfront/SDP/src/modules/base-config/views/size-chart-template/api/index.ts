import http from '@/core/http';
import { SYSTEM_ENUM } from '@/core/http/env';
import * as Types from './type';

/**
 * 尺寸表模板图（分页）
 * @see https://yapi.tiangong.site/project/36/interface/api/1805
 *
 */
export const getSizeTemplatePage = (data: Types.ISizeTemplatePageReq) => {
  const url = '/sdp-clothing-material/web/v1/size-template-image/page';
  return http.post<Types.ISizeTemplatePageRes>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};

/**
 * 保存-尺寸表模板图
 * @see https://yapi.tiangong.site/project/36/interface/api/1806
 *
 */
export const saveSizeTemplate = (data: Types.ISaveSiveTemplateItem) => {
  const url = '/sdp-clothing-material/web/v1/size-template-image/save';
  return http.post({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};

/**
 * 尺寸表模板图（详情）
 * @see https://yapi.tiangong.site/project/36/interface/api/1807
 */
export const getSizeTemplateDetail = (id: string) => {
  const url = `/sdp-clothing-material/web/v1/size-template-image/${id}`;
  return http.get<Types.ISizeTemplatePageResListItem>({
    server: SYSTEM_ENUM.OLA_API,
    url,
  });
};

/**
 * 尺寸表模板图（删除）
 * @see https://yapi.tiangong.site/project/36/interface/api/2294
 */
export const delSizeTemplate = (ids: string[]) => {
  const url = '/sdp-clothing-material/web/v1/size-template-image/delete';
  return http.delete({
    server: SYSTEM_ENUM.OLA_API,
    data: ids,
    url,
  });
};
