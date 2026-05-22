// import { YesOrNo } from '@/types/index.d';

/**
 * 用户查询参数
 */
export interface UserReq {
  companyId?: string;
  username?: string;
  secretKey?: string;
  operatorUserCode?: string;
  operatorUserId?: string;
  /**
   * @NotEmpty(message = "系统编码不能为空")
   */
  systemCode?: string;
  [k: string]: any;
}
export interface UserItem {
  username: string;
  userId: string;
  userCode: string;
}

export type UserRes = UserItem[];

/**
 *查用户手机号，调sso接口
 * see https://yapi.ibaibu.com/project/1656/interface/api/97892
 */
export interface IUsersQueryUserReq {
  userId?: string;
  companyId?: string;
  secretKey?: string;
  operatorUserCode?: string;
  operatorUserId?: string;
  systemCode?: string;
}
export interface IUsersQueryUserRes {
  id: string;
  username: string;
  phone: string;
  email: string;
  companyCode: string;
  status: string;
  userCode: string;
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string;
  orgInfo: string;
}
