import { YES_NO_NUMBER_ENUM } from '@/constant';

export type IShopPageReq = {
  pageNum?: number;
  pageSize?: number;
  /** 店铺类型 */
  shopType?: string;
  /** 运营人员 ID */
  businessOperatorId?: string;
  /** 是否启用【1启用；0禁用】 */
  enable?: number;
  /** 店铺名 */
  shopName?: string;
  /** 平台编码 */
  platformCode?: string;
  /** 创建开始时间 */
  createdStartTime?: string;
  /** 创建结束时间 */
  createdEndTime?: string;
  /** 创建人 id */
  creatorId?: number;
  /** 创建人姓名 */
  creatorName?: string;
  expired?: number;
};

export type IShopPageResItem = {
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
  shopId?: number;
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
  businessOperatorId?: string;
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
  /**
   * 是否有效【1有效；0无效】
   */
  expired?: number;
};

export type IShopPageRes = {
  pageNum: number;
  total: number;
  list: IShopPageResItem[];
};

export type IShopBatchEnableReq = Array<{ shopId: number; enable: YES_NO_NUMBER_ENUM; }>;

export type IShopCreateReq = {
  /** 平台编码 */
  platformCode: string;
  /** 平台名称 */
  platformName: string;
  /** 主体编码 */
  subjectCode: string;
  /** 主体名称 */
  subjectName: string;
  /** 店铺名 */
  shopName: string;
  /** 店铺类型 */
  shopType: string;
  /** 商品 token */
  productToken: string;
  /** 订单 token */
  orderToken: string;
  /** 标签 */
  label: string;
  /** 运营人员 ID */
  businessOperatorId: string;
  /** 运营人员名称 */
  businessOperatorName: string;
};

export type IShopBatchCreateReq = IShopCreateReq[];

export type IShopEditReq = IShopCreateReq & {
  /** 主键 ID */
  shopId: number;
  /** 是否启用【1启用；0禁用】 */
  enable?: number;
};


export type ICustomerPageReq = {
  pageNum?: number;
  pageSize?: number;
  /** 客户名称|编号 */
  keyword?: string;
  /** 客户名称 */
  customerName?: string;
};

export type ICustomerPageResItem = {
  /** 客户 id */
  customerId: number;
  /** 客户编码 */
  customerCode: string;
  /** 客户全称 */
  customerName: string;
  /** 客户状态；1:禁用，2：启用，3：未准入，4：已禁用 */
  customerState: number;
  /** 客户授信状态 */
  creditGrantingState: number;
  /** 客户类型
1--外部客户，2--内部客户 */
  customerType: number;
  /** 法人联系电话 */
  artificialPersonPhone: string;
  /** 注册地址 */
  registrationAddress: string;
  /** 注册地址-省份 */
  registrationProvince: string;
  /** 注册地址-城市 */
  registrationCity: string;
  /** 注册地址-区/县 */
  registrationRegion: string;
  /** 集团 id */
  groupId: number;
  /** bd id */
  workerId: number;
  /** 百布-bd id */
  baibuWorkerId: number;
  /** bd 名称 */
  workerName: string;
  /** 是否开通金融钱包 */
  isWallet: number;
  /** 激活状态：1-已激活、0-未激活（旧客户） */
  isActive: number;
  /** 是否是代理商:0-否,1-是 */
  isAgency: number;
  /** 合同类型（1--自营，2--平台） */
  contractType: number;
  /** ops 区域code */
  regionCode: string;
  /** ops 区域名字 */
  regionName: string;
};

export type ICustomerPageRes = {
  pageNum: number;
  total: number;
  list: ICustomerPageResItem[];
};
