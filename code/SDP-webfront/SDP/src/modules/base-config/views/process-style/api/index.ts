import http from '@/core/http';
import type {
  IStyleTemplatePageReq,
  IStyleTemplatePageRes,
  IStyleTemplateSwitchStateReq,
  IStyleTemplateInfoByNameReq,
  IStyleTemplateInfoByNameRes,
  ISewingComponentTemplatePageReq,
  ISewingComponentTemplatePageRes,
  IStyleTemplateDetailRes,
  IStyleTemplateCreateReq,
  ISewingComponentTemplateOptionsPageRes,
  ISewingComponentTemplatePageOptionsReq,
} from './type';
import { SYSTEM_ENUM } from '@/core/http/env';
/**
 * 获取列表数据
 *
 */
export const getStyleTemplatePage = (data: IStyleTemplatePageReq) => {
  return http.post<IStyleTemplatePageRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-clothing-material/web/v1/style-template/page',
    data,
  });
};
/**
 * 用、启用
 *
 */
export const changeStyleTemplateSwitchState = (data: IStyleTemplateSwitchStateReq) => {
  return http.put({
    url: '/sdp-clothing-material/web/v1/style-template/switchState',
    data,
    loading: true,
  });
};

/**
 * 工序款式按照名字搜索
 */
export const getStyleTemplateInfoByName = (data: IStyleTemplateInfoByNameReq) => {
  return http.get<IStyleTemplateInfoByNameRes[]>({
    url: `/sdp-clothing-material/web/v1/style-template/info-by-name?name=${data.name}`,
    loading: true,
  });
};

/**
 * 工序部件库
 */
export const sewingComponentTemplatePage = (data: ISewingComponentTemplatePageReq) => {
  return http.post<ISewingComponentTemplatePageRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-clothing-material/web/v1/sewingProcess/sewingComponentTemplate/page',
    data,
    loading: true,
  });
};
/**
 * 工序部件，查询所有
 */
export const sewingComponentTemplateOptionsPage = (data: ISewingComponentTemplatePageOptionsReq) => {
  return http.post<ISewingComponentTemplateOptionsPageRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-clothing-material/web/v1/sewingComponentTemplate/page',
    data,
    loading: true,
  });
};
/**
 * 工序款式库明细
 */
export const styleTemplateDetail = (id: string) => {
  return http.get<IStyleTemplateDetailRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: `/sdp-clothing-material/web/v1/style-template/detail/${id}`,
    loading: true,
  });
};

/**
 * 新建
 */
export const styleTemplateCreate = (data: IStyleTemplateCreateReq) => {
  return http.post({
    url: '/sdp-clothing-material/web/v1/style-template/create',
    data,
    loading: true,
  });
};
/**
 * 编辑
 */
export const styleTemplateEdit = (data?: IStyleTemplateCreateReq) => {
  return http.put({
    url: '/sdp-clothing-material/web/v1/style-template/edit',
    data,
    loading: true,
  });
};
