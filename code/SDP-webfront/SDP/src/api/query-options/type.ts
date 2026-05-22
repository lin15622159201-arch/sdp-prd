/*
 * 用户查询参数
 */
export interface IUsersQueryUserByUsernameAndCompanyIdReq {
  companyId?: string;
  username?: string;
  secretKey?: string;
  operatorUserCode?: string;
  operatorUserId?: string;
  systemCode?: string;
}

/**
 * 响应数据
 */
export type IUsersQueryUserByUsernameAndCompanyIdRes = {
  username: string;
  userId: string;
  userCode: string;
}[];

export type IGetShopListReq = {

};
export type IGetShopListRes = {
  /**
   * 主键ID
   */
  shopId?: string;
  /**
   * 平台店铺唯一标识
   */
  platformSellerId?: string;
  /**
   * 平台ID
   */
  platformId?: string;
  /**
   * 渠道ID
   */
  channelId?: string;
  /**
   * 渠道名称
   */
  channelName?: string;
  /**
   * 店铺名
   */
  shopName?: string;
  /**
   * lazada short code
   */
  shortCode?: string;
  /**
   * 品牌ID
   */
  brandId?: string;
  /**
   * 品牌名
   */
  brandName?: string;
  /**
   * 授权链接
   */
  authUrl?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * token
   */
  token?: string;
  /**
   * 是否授权【1已授权；0未授权】
   */
  isAuth?: string;
  /**
   * 站点
   */
  country?: string;
  /**
   * lzd店铺类型【cb-跨境店;asc-单站点】
   */
  countryType?: string;
}[];
/**
 * 分页 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/106387
 */
export interface ShopPageRes {
  /** 注释 */
  pageNum?: number;
  /** 注释 */
  total?: number;
  /** 注释 */
  list?: ShopPageResListItem[];
}

/**
 * 注释
 */
export interface ShopPageResListItem {
  /** 创建人id */
  creatorId?: number;
  /** 创建人名称 */
  creatorName?: string;
  /** 创建时间 */
  createdTime?: string;
  /** 修改人ID */
  reviserId?: number;
  /** 修改人名称 */
  reviserName?: string;
  /** 更新时间 */
  revisedTime?: string;
  /** 主键 ID */
  shopId?: string;
  /** 平台编码 */
  platformCode?: string;
  /** 平台名称 */
  platformName?: string;
  /** 主体编码 */
  subjectCode?: string;
  /** 主体名称 */
  subjectName?: string;
  /** 店铺名 */
  shopName?: string;
  /** 店铺类型 */
  shopType?: string;
  /** 商品 token */
  productToken?: string;
  /** 订单 token */
  orderToken?: string;
  /** 标签 */
  label?: string;
  /** 运营人员 ID */
  businessOperatorId?: number;
  /** 运营人员名称 */
  businessOperatorName?: string;
  /** 信息备注 */
  message?: string;
  /** 是否启用【1启用；0禁用】 */
  enable?: number;
  /** 授权开始时间 */
  authStartTime?: string;
  /** 授权结束时间 */
  authEndTime?: string;
}
