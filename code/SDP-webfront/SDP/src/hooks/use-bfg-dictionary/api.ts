import http from '@/core/http';
import { SYSTEM_ENUM } from '@/core/http/env';
import {
  ICustomerValuesReq,
  IDictValuesReq,
  IValuesRes,
} from '@/hooks/use-bfg-dictionary/type';

/**
 * 客户字典值 - 批量查询
 * @see yapi地址：https://yapi.tiangong.site/project/447/interface/api/24593truetrue
 */
export const customerDictValues = (params: ICustomerValuesReq) => {
  const url = '/bfg/v1/dict/customer/values';
  return http.post<IValuesRes>({
    server: SYSTEM_ENUM.FASHION_DESIGN_API,
    url,
    data: params,
    loading: true
  });
};

/**
 * 字典值 - 批量查询
 * @see yapi地址：https://yapi.tiangong.site/project/447/interface/api/24584truetrue
 */
export const dictValues = (params: IDictValuesReq) => {
  const url = '/bfg/v1/dict/values';
  return http.post<IValuesRes>({
    server: SYSTEM_ENUM.FASHION_DESIGN_API,    
    url,
    data: params,
    loading: true
  });
};
