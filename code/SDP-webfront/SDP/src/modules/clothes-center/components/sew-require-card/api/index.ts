import http from '@/core/http';
import * as Types from './types';

/**
 * 查询列表（分页）
 * @see yapi地址：https://yapi.tiangong.site/project/43/interface/api/2818
 */
export const styleTemplatePage = (params: Types.IStyleTemplatePageReq) => {
  const url = '/sdp-clothing-material/web/v1/style-template/page';
  return http.post<Types.IStyleTemplatePageRes>({
    url,
    data: params,
    loading: false
  });
};

/**
 * 查询列表（分页）
 * @see yapi地址：https://yapi.tiangong.site/project/43/interface/api/2610
 */
export const sewingComponentTemplatePage = (params: Types.ISewingComponentTemplatePageReq) => {
  const url = '/sdp-clothing-material/web/v1/sewingComponentTemplate/page';
  return http.post<Types.ISewingComponentTemplatePageRes>({
    url,
    data: params,
    loading: false
  });
};

/**
 * 详情(工序部件)
 * @see yapi地址：https://yapi.tiangong.site/project/43/interface/api/2611
 */
export const sewingComponentTemplateDetail = (params: Types.ISewingComponentTemplateDetailReq) => {
  const url = '/sdp-clothing-material/web/v1/sewingComponentTemplate/detail';
  return http.get<Types.ISewingComponentTemplateDetailRes>({
    url,
    params,
    loading: false
  });
};

/**
 * 工序款式库明细信息
 * @see yapi地址：https://yapi.tiangong.site/project/43/interface/api/2816
 */
export const styleTemplateDetail = (params: Types.IStyleTemplateDetailReq) => {
  const url = `/sdp-clothing-material/web/v1/style-template/detail/${params.id}`;
  return http.get<Types.IStyleTemplateDetailRes>({
    url,
    data: params,
    loading: false
  });
};

/**
 * 查询审版工艺款式（模板）基本信息
 * @see yapi地址：https://yapi.tiangong.site/project/43/interface/api/5254
 */
export const auditCraftTemplateListBaseInfo = (params: Types.IAuditCraftTemplateListBaseInfoReq) => {
  const url = '/sdp-clothing-material/web/v1/audit-craft-template/list-base-info';
  return http.post<Types.IAuditCraftTemplateListBaseInfoRes>({
    url,
    data: params,
    loading: false
  });
};

/**
 * 根据ID查询审版工艺款式（模板）明细
 * @see yapi地址：https://yapi.tiangong.site/project/43/interface/api/5246
 */
export const auditCraftTemplateGetDetailById = (params: Types.IAuditCraftTemplateGetDetailByIdReq) => {
  const url = '/sdp-clothing-material/web/v1/audit-craft-template/get-detail-by-id';
  return http.get<Types.IAuditCraftTemplateGetDetailByIdRes>({
    url,
    params,
    loading: true
  });
};

/**
 * 通过SKC查询其他款的加工其他费用 用于引用
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/5286
 */
export const checkPriceGetProcessOtherBySkc = (params: Types.ICheckPriceGetProcessOtherBySkcReq) => {
  const url = `/sdp-sample-clothes/web/v1/check-price/get-process-other-by-skc/${params.designCode}`;
  return http.get<Types.ICheckPriceGetProcessOtherBySkcRes>({
    url,
    params,
    loading: true
  });
};

/**
 * 分页查询审版工艺部件
 * @see yapi地址：https://yapi.tiangong.site/project/43/interface/api/5266
 */
export const auditCraftComponentQueryByList = (params: Types.IAuditCraftComponentQueryByListReq) => {
  const url = '/sdp-clothing-material/web/v1/audit-craft-component/query-by-list';
  return http.post<Types.IAuditCraftComponentQueryByListRes>({
    url,
    data: params,
    loading: false
  });
};
