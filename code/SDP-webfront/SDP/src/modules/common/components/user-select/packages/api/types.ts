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
