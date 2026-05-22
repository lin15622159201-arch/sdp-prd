import http from '@/core/http';
import type {
  IDesign,
  IDesignParams,
  IClothingModel,
  IFileDownlog,
  IGetTagLogs,
  IClothingModelParams,
  IDeltClothingModel,
} from './types';
import { SYSTEM_ENUM } from '@/core/http/env';

/**
 * 查询纸样设计列表
 * @param params
 * @returns
 * @see https://yapi.ibaibu.com/project/1080/interface/api/75232
 */
export const getDesigns = (data: IDesignParams) => {
  // const url = '/cloud-room/design-library/list';
  const url = '/sdp-clothing-material/design-file';
  return http.post<IDesign[]>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
  });
};

export const getDesignsDetails = (id: string) => {
  const url = `/sdp-cloud-room/design-library/${id}`;
  return http.get({
    server: SYSTEM_ENUM.OLA_API,
    url,
  });
};

// 获取版型列表
export const getClothingModelList = (data: IClothingModelParams) => {
  const url = '/sdp-clothing-material/clothing-model/list';
  return http.post<IDesign[]>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
  });
};

// 新增版型
export const addClothingModel = (data: IClothingModel) => {
  const url = '/sdp-clothing-material/clothing-model';
  return http.post({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
  });
};

// 删除版型
export const deltClothingModel = (data: IDeltClothingModel) => {
  const url = '/sdp-clothing-material/clothing-model';
  return http.delete({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
  });
};

// 修改版型
export const updateClothingModel = (data: IClothingModel) => {
  const url = '/sdp-clothing-material/clothing-model';
  return http.put({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
  });
};

// 纸样库文件下载日志
export const fileDownlog = (data: IFileDownlog) => {
  const url = '/sdp-clothing-material/operation-log/save';
  return http.post({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
  });
};

/**
 * 获取标签列表
 */
export const getClothingTag = (haveSubTag: boolean) => {
  const url = '/sdp-clothing-material/clothing-tag';
  return http.get({
    server: SYSTEM_ENUM.OLA_API,
    url,
    params: {
      subTag: haveSubTag,
    },
  });
};

/**
 * 获取标签日志
 * @param data
 * @returns
 */
export const getTagLogs = (data: IGetTagLogs) => {
  const url = '/sdp-clothing-material/operation-log/list';
  return http.post({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
  });
};

export const getClothingModel = (modelId: string) => {
  const url = `/sdp-clothing-material/clothing-model/${modelId}`;
  return http.get({
    server: SYSTEM_ENUM.OLA_API,
    url,
    loading: true,
  });
};
