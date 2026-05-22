import http from '@/core/http';
import type {
  ISewingComponentTemplatePageReq,
  ISewingComponentTemplatePageRes,
  ISwitchStateOpenReq,
  ISewingComponentTemplateCreateReq,
  ISewingComponentTemplateDetailRes,
} from './type';
import { SYSTEM_ENUM } from '@/core/http/env';
/**
 * 获取列表数据
 *
 */
export const sewingComponentTemplatePag = (data: ISewingComponentTemplatePageReq) => {
  return http.post<ISewingComponentTemplatePageRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-clothing-material/web/v1/sewingComponentTemplate/page',
    data,
    loading: true,
  });
};

/**
 * 启用
 */
export const switchStateOpen = (data: ISwitchStateOpenReq) => {
  return http.post({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-clothing-material/web/v1/sewingComponentTemplate/switchState/open',
    data,
    loading: true,
  });
};

/**
 * 停用
 */
export const switchStateClose = (data: ISwitchStateOpenReq) => {
  return http.post({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-clothing-material/web/v1/sewingComponentTemplate/switchState/close',
    data,
    loading: true,
  });
};
/**
 * 新建
 */
export const sewingComponentTemplateCreate = (data: ISewingComponentTemplateCreateReq) => {
  return http.post({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-clothing-material/web/v1/sewingComponentTemplate/create',
    data,
    loading: true,
  });
};
/**
 * 详情
 */
export const sewingComponentTemplateDetail = (id: string) => {
  return http.get<ISewingComponentTemplateDetailRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: `/sdp-clothing-material/web/v1/sewingComponentTemplate/detail?sewingComponentTemplateId=${id}`,
    loading: true,
  });
};
/**
 * 更新
 */
export const sewingComponentTemplateUpdate = (data: ISewingComponentTemplateCreateReq) => {
  return http.post({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-clothing-material/web/v1/sewingComponentTemplate/update',
    data,
    loading: true,
  });
};

/**
 * 导入
 */
export const sewingComponentTemplateImportExcel = (data: FormData) => {
  return http.post({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-clothing-material/web/v1/sewingComponentTemplate/import-excel',
    data,
    loading: true,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  });
};
