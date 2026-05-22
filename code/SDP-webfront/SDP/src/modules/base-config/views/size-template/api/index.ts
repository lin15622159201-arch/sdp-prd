import http from '@/core/http';
import type {
  ISizeTemplatePageReq,
  ISizeTemplatePageRes,
  // ISizeTemplatePageDetailSizeReq,
  // ISizeTemplatePageDetailSizeListItem,
  // ISizeTemplatePageDetailSizeRes,
  ITemplateSaveReq,
  ITemplateChangeStatusReq,
  ITemplateListRes,
  ITemplateDetailedInfoRes,
} from './type';
import { SYSTEM_ENUM } from '@/core/http/env';
/**
 * 获取尺寸表模板列表数据
 *
 */
export const getSizeTempalteList = (data: ISizeTemplatePageReq) => {
  return http.post<ISizeTemplatePageRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-clothing-material/web/v1/size/template/page',
    data,
  });
};
/**
 * 尺寸表模板停用、启用
 *
 */
export const changeSizeTempalteStatus = (data: ITemplateChangeStatusReq) => {
  return http.put({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-clothing-material/web/v1/size/template/change-status',
    data,
    loading: true,
  });
};
/**
 * 引用尺寸表模板查询
 */
export const getReferSizeTempalteApi = (data: ISizeTemplatePageReq) => {
  return http.post<ITemplateListRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-clothing-material/web/v1/size/template/list',
    data,
    loading: true,
  });
};
/**
 * 引用尺寸表模板复制
 */
// export const getReferSizeList = (data: string) => {
//   const url = '';
//   return http.post<ISizeTemplatePageDetailSizeListItem[]>({
//     url,
//     data,
//     loading: true,
//   });
// };
/**
 * 尺寸表模板详情查询
 */
export const getSizeTempalteDetailApi = (templateCode: string | number) => {
  return http.get<ITemplateDetailedInfoRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: `/sdp-clothing-material/web/v1/size/template/detailedInfo/${templateCode}`,
    loading: true,
  });
};
/**
 * 尺寸表模板详情保存(新建)
 */
export const saveSizeTempalteDetail = (data?: ITemplateSaveReq) => {
  return http.post({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-clothing-material/web/v1/size/template/save',
    data,
    loading: true,
  });
};
/**
 * 尺寸表模板详情保存(编辑)
 */
export const saveSizeTempalteDetailUpdateApi = (data?: ITemplateSaveReq) => {
  return http.post({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-clothing-material/web/v1/size/template/update',
    data,
    loading: true,
  });
};
