// 获取支付申请单信息返回
export interface IGetPayApplicationRes {
  /**
   * 申请单号
   */
  applyCode?: string;
  /**
   * 支付金额
   */
  payAmount?: string;
  /**
   * 客户id
   */
  customerId?: string;
  /**
   * 代理商ID
   */
  agentId?: string;
}

// 支付
export interface IPayReq {
  /**
   * 支付申请号
   */
  applyCode?: string;
  /**
   * 账号卡号
   */
  accountNumber?: string;
  /**
   * 账号名
   */
  accountName?: string;
  /**
   * 收款凭证
   */
  certificateList: string[];
}

/**
 * login
 * yapi地址：https://yapi.tiangong.site/project/2370/interface/api/149561
 */
export interface IAuthLoginReq {
  /**
   * 业务系统编码
   */
  loginFromSystemCode: string;
  /**
   * 1：手机登录   3：账号登录
   */
  loginType: string;
  /**
   * 密码
   */
  password: string;
  /**
   * 密码加密版本,为空的时候表示没有RSA加密传输; 为1的时候表示使用RSA加密传输
   */
  passwordVersion: string;
  /**
   * 手机号
   */
  username: string;
  /**
   * 密码错误次数到规定次数之后的图形验证码
   */
  verification?: string;
}

export interface AuthLoginRes {
  /*
  * ssoToken
  *  */
  ssoToken: string;
  /*
  * 租户列表
  *  */
  companyInfoList: AuthLoginResCompanyInfoList[];
  /*
  * token刷新时间
  *  */
  refreshTime: string;
  /*
   * 用户ID
   * */
  userId: string;
  /*
   * 用户名称
   * */
  username: string;
}

export interface AuthLoginResCompanyInfoList {
  /*
  * 租户ID
  *  */
  companyId: string;
  /*
  * 租户编码
  *  */
  companyCode: string;
  /*
  * 租户名称
  *  */
  companyName: string;
  /*
  * 用户名
  *  */
  username: string;
  /*
  * 邮箱
  *  */
  email: string;
  /*
  * 是否租户管理员
  *  */
  isCompanyManager: boolean;
  /*
  * 组织列表
  *  */
  orgList: AuthLoginResCompanyInfoListOrgList[];
  /*
  * 用户ID
  *  */
  userId: string;
  /*
  * 用户编码
  *  */
  userCode: string;
}

export interface AuthLoginResCompanyInfoListOrgList {
  /*
  * 组织id
  *  */
  orgId: string;
  /*
  * 组织id路径
  *  */
  orgPath: string;
  /*
  * 组织名称
  *  */
  orgName: string;
}

/**
 * 密码重置，短信验证方式
 * yapi地址：https://yapi.tiangong.site/project/2370/interface/api/153897
 */
export interface IPasswordResetReq {
  phone: string;
  verifyCode: string;
  password: string;
  /**
   * 密码加密版本,为空的时候表示没有RSA加密传输;为1的时候表示使用RSA加密传输
   */
  passwordVersion: string;
}

/**
 * 发送短信验证码
 * @see yapi地址：https://yapi.tiangong.site/project/2370/interface/api/5329
 */
export interface ISmsGetSmsCaptchaReq {
  phone: string;
  action: string;
  templateCode?: string;
}
