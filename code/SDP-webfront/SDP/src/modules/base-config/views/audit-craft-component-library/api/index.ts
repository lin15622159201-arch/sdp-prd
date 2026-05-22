import http from '@/core/http';
import * as Types from './type';

/**
 * 分页查询审版工艺部件
 * @see https://yapi.tiangong.site/project/43/interface/api/5266
 */
export const auditCraftComponentQueryByPage = (
  params: Types.IAuditCraftComponentQueryByPageReq
) => {
  const url = '/sdp-clothing-material/web/v1/audit-craft-component/query-by-page';
  return http.post<Types.IAuditCraftComponentQueryByPageRes>({
    url,
    data: params,
  });
};

/**
 * 修改部件状态
 * @see https://yapi.tiangong.site/project/43/interface/api/5274
 */
export const auditCraftComponentChangeState = (
  params: Types.IAuditCraftComponentChangeStateReq
) => {
  const url = '/sdp-clothing-material/web/v1/audit-craft-component/change-state';
  return http.post({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 保存审版工艺部件
 * @see https://yapi.tiangong.site/project/43/interface/api/5262
 */
export const auditCraftComponentSaveComponent = (
  params: Types.IAuditCraftComponentSaveComponentReq
) => {
  const url = '/sdp-clothing-material/web/v1/audit-craft-component/save-component';
  return http.post({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 查询部件明细
 * @see https://yapi.tiangong.site/project/43/interface/api/5270
 */
export const auditCraftComponentGetById = (componentId: string) => {
  const url = '/sdp-clothing-material/web/v1/audit-craft-component/get-by-id';
  return http.get<Types.IAuditCraftComponentGetByIdRes>({
    url,
    params: {
      componentId,
    },
    loading: true,
  });
};
