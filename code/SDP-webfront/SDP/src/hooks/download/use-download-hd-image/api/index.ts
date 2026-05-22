import http from '@/core/http';
import { IHighDefinitionObtainReq, IHighDefinitionObtainRes } from './type';
import { CancelToken } from 'axios';

/**
 * 获取高清处理图
 * @see https://yapi.tiangong.site/project/20/interface/api/3679
 */
export const highDefinitionObtain = (params: IHighDefinitionObtainReq, loading = true, cancelToken?: CancelToken) => {
  const url = '/butted/web/high-definition/obtain';
  return http.post<IHighDefinitionObtainRes>({
    url,
    data: params,
    loading,
    cancelToken
  });
};
