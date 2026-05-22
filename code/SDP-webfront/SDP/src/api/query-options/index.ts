import http from '@/core/http';
import {
  IUsersQueryUserByUsernameAndCompanyIdReq,
  IUsersQueryUserByUsernameAndCompanyIdRes,
  IGetShopListReq,
  ShopPageRes,
} from './type';
import { SYSTEM_ENUM } from '@/core/http/env';

/** *
 * 获取店铺列表
 */
export const getShopList = (data: IGetShopListReq) => {
  return http.post<ShopPageRes>({
    // url: '/pop-product-service/web/v1/shop/list',
    url: '/sdp-curation/web/v1/shop/page',
    data,
    loading: true,
  });
};
