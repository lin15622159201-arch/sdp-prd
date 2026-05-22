import { SYSTEM_ENUM } from '@/core/http/env';
import type * as Types from './types';

import http from '@/core/http/index';

// 字典值 - 列表
export const dictValueList = (data: Partial<Types.IdictValueList>) => {
  const url = '/ufg/web/v1/dict-value/list';
  return http.post<Types.IdictValueListItem[]>({
    url,
    data,
    loading: true,
  });
};

// 字典值 - 批量
export const batchDictValues = (data: string[]) => {
  const url = '/sys-admin/web/dict/dict-list';
  return http.post<Types.IbatchDictValuesRes[]>({
    server: SYSTEM_ENUM.NEST_API,
    url,
    data: { dictCodes: data },
    loading: true,
  });
};
/**
 * 工序款式库 查询列表（分页）
 * @see https://yapi.tiangong.site/project/1302/interface/api/8308
 */
export const getStyleTemplatePage = (data: Types.IStyleTemplateParams) => {
  const url = '/clothing-material/web/v1/style-template/page';
  return http.post<Types.IStyleTemplatePageRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 工序款式库明细信息
 * @see https://yapi.tiangong.site/project/1302/interface/api/8303
 */
export const getStyleTemplateDetail = (id: string) => {
  const url = `/clothing-material/web/v1/style-template/detail/${id}`;
  return http.get<Types.IStyleTemplateDetailRes>({
    url,
    loading: true,
  });
};

/**
 * 工序款式库明细信息 批量查询
 * @see https://yapi.tiangong.site/project/1302/interface/api/8303
 */
export const getStyleTemplateDetailByIds = (data: string[]) => {
  const url = '/clothing-material/web/v1/style-template/details';
  return http.post<Types.IStyleTemplateDetailRes[]>({
    url,
    data,
    loading: true,
  });
};

/**
 * 检查当前在process的sewingProcess在对应的component的state
 * @see https://yapi.tiangong.site/project/1302/interface/api/8394
 */
export const getSewingProcessComponentStateByIds = (data: string[]) => {
  const url = '/clothing-material/web/v1/sewingProcess/check-component-state';
  return http.post<Types.ISewingProcessCheckComponentStateItem[]>({
    url,
    data,
    loading: true,
  });
};
