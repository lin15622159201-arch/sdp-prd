import http from '@/core/http';
import {
  IGetCustomerInfo,
  IGetNoticeDialogListRes
} from './type';

/**
 * 获取客户详情
 * @see https://yapi.tiangong.site/project/420/interface/api/24926
 */
export const getCustomerInfo = (data: { customerId: string; }) => {
  return http.get<IGetCustomerInfo>({
    url: `/customer/frontend/web/info/${data.customerId}`,
    cancelDuplicateUrl: true,
    loading: true,
  });
};

/**
 * 获取系统弹窗列表
 */
export const getNoticeDialogList = () => {
  return http.post<IGetNoticeDialogListRes>({
    url: '/bfg/web/fm/popup/record/take',
    cancelDuplicateUrl: true,
    loading: true,
    // data: { triggerPath: '1' }
  });
};

/**
 * 记录弹窗展示
 */
export const submitNoticeLog = (data: { configId: string; }) => {
  return http.post<IGetNoticeDialogListRes>({
    url: '/bfg/web/fm/popup/record/save',
    cancelDuplicateUrl: true,
    loading: false,
    data
  });
};
