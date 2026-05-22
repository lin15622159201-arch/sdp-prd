import http from '@/core/http';
import type * as Types from './types';
import { SYSTEM_ENUM } from '@/core/http/env';
import { IClothingTag } from '../types';

/**
 * 获取标签列表
 */
export const getClothingTag = (haveSubTag: boolean) => {
  const url = '/sdp-clothing-material/clothing-tag';
  return http.get<IClothingTag[]>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    params: {
      subTag: haveSubTag,
    },
  });
};

/**
 * 版型库列表
 */
export const repositoryList = (data: Types.PatternLibs) => {
  const url = '/sdp-clothing-material/web/v1/model/repository/page';
  return http.post<Types.PatternLibs[]>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
  });
};

/**
 * 版型库删除
 */
export const repositoryDel = (modelRepositoryId: string) => {
  const url = `/sdp-clothing-material/web/v1/model/repository/remove/${modelRepositoryId}`;
  return http.get<boolean>({
    url,
  });
};

/**
 * 版型库新增
 */
export const repositoryAdd = (data: Types.PatternLibs) => {
  const url = '/sdp-clothing-material/web/v1/model/repository/add';
  return http.post({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
    loadingMessage: '正在提交',
  });
};
