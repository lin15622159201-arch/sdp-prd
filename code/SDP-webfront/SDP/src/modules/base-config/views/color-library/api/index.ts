import http from '@/core/http';
import type * as Types from './types';
import { SYSTEM_ENUM } from '@/core/http/env';

/**
 * 字典管理
 */
/**
 * 颜色类别列表接口
 * @see https://yapi.tiangong.site/project/1752/interface/api/17006
 */
export const getSysAdminWebDictList = (data: Types.ISysAdminWebDictReq) => {
  return http.post<Types.ISysAdminWebDictResItem[]>({
    server: SYSTEM_ENUM.NEST_API,
    url: '/sys-admin/web/dict/tree-list',
    data: { ...data, consumerCode: 'SDP' }
  });
};

/**
 * 字典 - 新增
 * 颜色新增类别、颜色接口
 * @see https://yapi.tiangong.site/project/35/interface/api/1881
 */
export const addSysAdminWebDict = (data: Types.IAddSysAdminWebDictReq) => {
  return http.post({
    server: SYSTEM_ENUM.NEST_API,
    url: '/sys-admin/web/dict',
    data,
  });
};

/**
 * 字典 - 修改
 * 颜色修改类别、颜色接口
 * @see https://yapi.tiangong.site/project/35/interface/api/1882
 */
export const updateSysAdminWebDict = (data: Types.IUpdateSysAdminWebDictReq) => {
  return http.put({
    server: SYSTEM_ENUM.NEST_API,
    url: '/sys-admin/web/dict',
    data,
  });
};

/**
 * 字典 - 分页查询
 * 根据颜色类别获取颜色列表
 * @see https://yapi.tiangong.site/project/35/interface/api/1883
 */
export const getSysAdminWebDictPage = (data: Types.ISysAdminWebDictPageReq) => {
  return http.post<Types.ISysAdminWebDictPageRes>({
    server: SYSTEM_ENUM.NEST_API,
    url: '/sys-admin/web/dict/page',
    data,
  });
};

/**
 * 字典 - 停用
 * 颜色类别、颜色停用
 * @see https://yapi.tiangong.site/project/35/interface/api/2224
 */
export const disabledSysAdminWebDict = (dictId: string) => {
  return http.put({
    server: SYSTEM_ENUM.NEST_API,
    url: `/sys-admin/web/dict/disable/${dictId}`,
  });
};

/**
 * 字典 - 启用
 * 颜色类别、颜色启用
 * @see https://yapi.tiangong.site/project/35/interface/api/2223
 */
export const enabledSysAdminWebDict = (dictId: string) => {
  return http.put({
    server: SYSTEM_ENUM.NEST_API,
    url: `/sys-admin/web/dict/enable/${dictId}`,
  });
};

/**
 * 全部类别以及下属的颜色
 *
 * @see https://yapi.textile-story.com/project/1361/interface/api/103861
 * @return {*}
 */
export const baseAllColorCategoryApi = () => {
  const url = '/sdp-curation/web/v1/base/all-color-category';

  return http.post<Types.BaseAllColorCategoryRes>({
    url,
    loading: true,
  });
};
