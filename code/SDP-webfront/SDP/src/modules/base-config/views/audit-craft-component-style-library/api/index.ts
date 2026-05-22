import http from '@/core/http';
import * as Types from './type';

/**
 * 分页查询审版工艺款式（模板）
 * @see https://yapi.tiangong.site/project/43/interface/api/5242
 */
export const auditCraftTemplateQueryByPage = (
  params: Types.IAuditCraftTemplateQueryByPageReq
) => {
  const url = '/sdp-clothing-material/web/v1/audit-craft-template/query-by-page';
  return http.post<Types.IAuditCraftTemplateQueryByPageRes>({
    url,
    data: params,
  });
};

/**
 * 修改审版工艺款式（模板）状态
 * @see https://yapi.tiangong.site/project/43/interface/api/5250
 */
export const auditCraftTemplateChangeState = (
  params: Types.IAuditCraftTemplateChangeStateReq
) => {
  const url = '/sdp-clothing-material/web/v1/audit-craft-template/change-state';
  return http.post({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 保存审版工艺款式（模板）
 * @see https://yapi.tiangong.site/project/43/interface/api/5238
 */
export const auditCraftTemplateSaveTemplate = (
  params: Types.IAuditCraftTemplateSaveTemplateReq
) => {
  const url = '/sdp-clothing-material/web/v1/audit-craft-template/save-template';
  return http.post({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 根据ID查询审版工艺款式（模板）明细
 * @see https://yapi.tiangong.site/project/43/interface/api/5246
 */
export const auditCraftTemplateGetDetailById = (templateId: string) => {
  const url = '/sdp-clothing-material/web/v1/audit-craft-template/get-detail-by-id';
  return http.get<Types.IAuditCraftTemplateGetDetailByIdRes>({
    url,
    params: { templateId },
    loading: true,
  });
};
