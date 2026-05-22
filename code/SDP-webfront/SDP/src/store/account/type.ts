import { IUserMeRes } from '@/api/iam/user/types';

export interface IState {
  /**
   * token
   */
  token: string | null;
  /**
   * SSOToken
   */
  ssoToken: string | null;
  /**
   * 用户信息
   */
  account: IUserMeRes | null;
}
