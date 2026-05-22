import http from '@/core/http';
import { AxiosRequestConfig } from 'axios';
import { FileUploadResponseItem } from './types';
import { SYSTEM_ENUM } from '@/core/http/env';

export const uploadFile = (
  data: FormData,
  isNotCancel = true,
  onUploadProgress?: AxiosRequestConfig['onUploadProgress'],
) => {
  return http.post<FileUploadResponseItem[]>({
    url: '/communal/file/upload',
    data,
    loading: false,
    noCancelDuplicate: isNotCancel,
    onUploadProgress,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    server: SYSTEM_ENUM.ARSENAL_API,
  });
};

/**
 * 获取 获取省市区数据
 * @param {*} params
 * @returns
 */
export const getAreaTree = (params: any) => {
  const url = '/ufg/web/v1/area/queryAllAreas';
  return http.get({
    url,
    params,
    server: SYSTEM_ENUM.ARSENAL_API
  });
};
