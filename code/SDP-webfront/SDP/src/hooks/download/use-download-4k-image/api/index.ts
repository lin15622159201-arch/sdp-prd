import http from '@/core/http';
import { IUltraHdObtainReq, IUltraHdObtainRes } from './type';
import { CancelToken } from 'axios';

/**
 * 获取4K高清图
 * @see https://yapi.tiangong.site/project/20/interface/api/655
 */
export const ultraHdObtain = (params: IUltraHdObtainReq, loading = true, cancelToken?: CancelToken) => {
  const url = '/butted/web/ultra-hd/obtain';
  return http.post<IUltraHdObtainRes>({
    url,
    data: params,
    loading,
    cancelToken
  });
};
