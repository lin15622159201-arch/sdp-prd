/**
 * 请求参数对象
 */
export interface IPostScmSupplierPageReq {
  /**
   * 开票状态
   */
  invoiceState?: Char;
  /**
   * 合作类型（1临时，2合作）
   */
  cooperationType?: Char;
  /**
   * 启动与否（0否1是）
   */
  startUp?: Char;
  /**
   * 区域 华南|华东
   */
  region?: string;
  /**
   * 开始时间
   */
  startCreatedTime?: string;
  /**
   * 结束时间
   */
  endCreatedTime?: string;
  /**
   * 是否是色卡仓（0否1是），只用于面料供应商
   */
  isColorCard?: number;
  /**
   * FABRIC_SUPPLIER("面料商"),
   *     INGREDIENT_SUPPLIER("辅料供应商"),
   *     TECHNOLOGY_SUPPLIER("工艺提供商（工艺厂）"),
   */
  supplierCategory?: string;
  /**
   * 旧供应商id
   */
  gid?: string;
  /**
   * 供应商编码
   */
  supplierCode?: string;
  /**
   * 供应商（档口/仓库）名称
   */
  supplierName?: string;
  /**
   * 供应商主体名字（公司名字）
   */
  companyName?: string;
  /**
   * 供应商类型 1-档口 2-仓库 3-公司
   */
  supplierType?: string;
  /**
   * 百布运营人员
   */
  baibuOperator?: string;
  /**
   * 负责人
   */
  principalName?: string;
  /**
   * 负责人手机号
   */
  principalMobilePhone?: string;
  /**
   * 供应商状态 0-临时 1-待认证 2-认证通过 3-认证无效
   */
  status?: string;
  /**
   * 经营范围（类型） 1-净色 2-花型 3-净色&花型
   * 已改为字典数据并且兼容现有的1，2，3:
   * <p>
   * 经营类型由以下字典类下的字典项表示，当选择多个字典项时， businessScope的值为选择的各个字典项相加
   */
  businessScope?: string;
  /**
   * 合作标签
   */
  cooperativeTag?: string;
  /**
   * 主营类目关键字
   */
  businessCategoryKeyWord?: string;
  /**
   * 是否绑定主体，1-绑定，0-未绑定
   */
  isBindingSubject?: string;
  /**
   * 供应商级别 1-普通 2-金牌
   */
  level?: string;
  /**
   * 当前页号
   */
  pageNum?: number;
  /**
   * 每页数量
   */
  pageSize?: number;
}
// ⬆️ WEB - 供应商列表请求体

// ⬇️ WEB - 供应商列表响应体 接口：https://yapi.tiangong.site/project/93/interface/api/9306
export interface IPostScmSupplierPageRes {
  page: string;
  total: string;
  list: ISupplierPageResListItem[];
}
export interface ISupplierPageResListItem {
  /**
   * 负责人电话
   */
  mobilePhone: string;
  supplierPersonnels: ISupplierPageResSupplierPersonnelsItem[];
  extInfo: ISupplierPageResExtInfo;
  /**
   * 服务类型多个英文逗号,分隔
   */
  serviceTypeNames: string[];
  /**
   * 开票状态
   */
  invoiceState: string;
  /**
   * 结算方式
   */
  settlementType: string;
  /**
   * 合作类型（1临时，2合作）
   */
  cooperationType: string;
  /**
   * 启动与否（0否1是）
   */
  startUp: string;
  /**
   * 认证来源
   */
  authenticationSource: string;
  /**
   * 固定电话号码
   */
  telephone: string;
  /**
   * 是否是色卡仓（0否1是），只用于面料供应商
   */
  isColorCard: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 供应商大类 FABRIC_SUPPLIER-面料商，INGREDIENT_SUPPLIER-辅料商，TECHNOLOGY_SUPPLIER-工艺厂
   */
  supplierCategory: string;
  /**
   * 底布，多个以,号隔开
   */
  bottomCloth: string;
  /**
   * 档口/仓库id
   */
  supplierId: string;
  /**
   * 上级供应商ID （经营主体id）
   */
  parentSupplierId: string;
  /**
   * 经营主体名称
   */
  parentSupplierName: string;
  /**
   * 经营主体编码
   */
  parentSupplierCode: string;
  /**
   * 供应商编码
   */
  supplierCode: string;
  /**
   * 档口/仓库名称
   */
  supplierName: string;
  /**
   * 供应商类型 1-档口 2-仓库 3-公司
   */
  supplierType: string;
  /**
   * 经营范围：1-净色 2-花型 3-净色&花型'
   */
  businessScope: string;
  /**
   * 省
   */
  province: string;
  /**
   * 市
   */
  city: string;
  /**
   * 区
   */
  area: string;
  /**
   * 档口/仓库地址
   */
  address: string;
  /**
   * 主营类目，多个以,号隔开
   */
  businessCategory: string;
  /**
   * 供应商状态 0-临时 1-待认证 2-认证通过 3-认证无效
   */
  status: string;
  /**
   * 认证时间
   */
  lastAuthenticationTime: string;
  /**
   * 合作标签，多个以,号隔开
   */
  cooperativeTag: string;
  /**
   * 百布运营id
   */
  baibuOperatorId: string;
  /**
   * 运营负责人
   */
  baibuOperator: string;
  /**
   * 供应商级别 1-普通 2-金牌
   */
  level: string;
  /**
   * 最近修改时间
   */
  revisedTime: string;
}
export interface ISupplierPageResSupplierPersonnelsItem {
  /**
   * 供应商人员主键
   */
  supplierPersonnelId: string;
  /**
   * 人员ID（业务ID）
   */
  personnelId: string;
  /**
   * 供应商ID（业务ID）
   */
  supplierId: string;
  /**
   * 姓名
   */
  name: string;
  /**
   * 手机号码
   */
  mobilePhone: string;
  /**
   * 职位
   */
  position: string;
  /**
   * 人员类型 1-负责人 2-联系人
   */
  type: string;
}
/**
 * 供应商扩展信息
 */
export interface ISupplierPageResExtInfo {
  /**
   * 账单额度
   */
  accountLimit: string;
  /**
   * 对账开始时间
   */
  reconciliationCreateTime: string;
  /**
   * 对账结束时间
   */
  reconciliationEndTime: string;
  /**
   * 结账开始时间
   */
  checkoutCreateTime: string;
  /**
   * 结账结束时间
   */
  checkoutEndTime: string;
  /**
   * 贷款连接人
   */
  loanConnectMan: string;
  /**
   * 图稿（多个以逗号分隔）
   */
  sketch: string;
  /**
   * 价格有效天数
   */
  priceExpireDay: string;
  /**
   * 主键id
   */
  extId: string;
  /**
   * 供应商id
   */
  supplierId: string;
  /**
   * 供应商类型
   */
  supplierType: string;
  /**
   * 服务类型多个英文逗号,分隔
   */
  serviceTypeNames: string[];
  /**
   * 服务类型树
   */
  trees: ISupplierPageResTreesItem[];
  /**
   * 开票状态（字典值 invoice_dict）
   */
  invoiceState: string;
  /**
   * 结算方式（1现结 2账期 字典值：settlement_type）
   */
  settlementType: string;
  /**
   * 修改人id
   */
  reviserId: string;
  /**
   * 更新时间
   */
  revisedTime: string;
  /**
   * 是否删除：0否 1 是
   */
  isDeleted: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 合作类型（1临时，2合作）
   */
  cooperationType: string;
  /**
   * 启动与否（0否1是）
   */
  startUp: string;
  /**
   * 认证来源
   */
  authenticationSource: string;
  /**
   * 是否是色卡仓（0否1是），只用于面料供应商
   */
  isColorCard: string;
  /**
   * 营业照片，多张以,号隔开
   */
  businessPhoto: string;
}
export interface ISupplierPageResTreesItem {
  /**
   * 类目ID
   */
  categoryId: string;
  tree: ISupplierPageResTree;
}
/**
 * 类目树
 */
export interface ISupplierPageResTree {
  /**
   * 类目id
   */
  categoryId: string;
  /**
   * 类目名称
   */
  categoryName: string;
  child: ISupplierPageResChild;
}
/**
 * 子类目
 */
export interface ISupplierPageResChild {}

// ⬇️ 根据供应商id查询供应商明细信息响应体 接口：https://yapi.tiangong.site/project/93/interface/api/11203
export interface ISupplierInfoDetailRes {
  /**
   * 供应商ID（业务ID）
   */
  supplierId: string;
  /**
   * 上级供应商ID
   */
  parentSupplierId: string;
  /**
   * 供应商编码
   */
  supplierCode: string;
  /**
   * 供应商名称
   */
  supplierName: string;
  /**
   * 供应商大类 FABRIC_SUPPLIER-面料商，INGREDIENT_SUPPLIER-辅料商，TECHNOLOGY_SUPPLIER-工艺厂
   */
  supplierCategory: string;
  /**
   * 供应商级别 1-普通 2-金牌
   */
  level: string;
  /**
   * 经营范围（类型） 1-净色 2-花型 3-净色&花型。多个以,号分隔
   */
  businessScope: string;
  /**
   * 固定电话号码
   */
  telephone: string;
  /**
   * 手机号码
   */
  mobilePhone: string;
  /**
   * 省
   */
  province: string;
  /**
   * 市
   */
  city: string;
  /**
   * 区
   */
  area: string;
  /**
   * 详细地址
   */
  address: string;
  /**
   * 区域 华南|华东
   */
  region: string;
  /**
   * 商圈
   */
  tradingArea: string;
  /**
   * 主营类目，多个以,号隔开
   */
  businessCategory: string;
  /**
   * 供应商类型 1-档口 2-仓库 3-公司
   */
  supplierType: string;
  /**
   * 创建者名字
   */
  creatorName: string;
  /**
   * 供应商状态 0-临时 1-待认证 2-认证通过 3-认证无效
   */
  status: string;
  /**
   * 百布运营人员
   */
  baibuOperatorId: string;
  /**
   * 百布运营人员
   */
  baibuOperator: string;
  /**
   * 百布运营人员手机号码
   */
  baibuOperatorMobilePhone: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 底布，多个以,号隔开
   */
  bottomCloth: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 创建时间
   */
  createdTime: string;
  extInfo: IInfoDetailResExtInfo;
  /**
   * 供应商联系人
   */
  supplierPersonnels: IInfoDetailResSupplierPersonnelsItem[];
}
/**
 * 供应商扩展信息
 */
export interface IInfoDetailResExtInfo {
  /**
   * 主键id
   */
  extId: string;
  /**
   * 供应商id
   */
  supplierId: string;
  /**
   * 供应商类型
   */
  supplierType: string;
  /**
   * 服务类型多个英文逗号,分隔
   */
  serviceTypeNames: string[];
  /**
   * 服务类型树
   */
  trees: IInfoDetailResTreesItem[];
  /**
   * 开票状态（字典值 invoice_dict）
   */
  invoiceState: string;
  /**
   * 结算方式（1现结 2账期 字典值：settlement_type）
   */
  settlementType: string;
  /**
   * 修改人id
   */
  reviserId: string;
  /**
   * 更新时间
   */
  revisedTime: string;
  /**
   * 是否删除：0否 1 是
   */
  isDeleted: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 合作类型（1临时，2合作）
   */
  cooperationType: string;
  /**
   * 启动与否（0否1是）
   */
  startUp: string;
  /**
   * 认证来源
   */
  authenticationSource: string;
  /**
   * 是否是色卡仓（0否1是），只用于面料供应商
   */
  isColorCard: string;
  /**
   * 营业照片，多张以,号隔开
   */
  businessPhoto: string;
  /**
   * 图稿（多个以逗号分隔）
   */
  sketch: string;
  /**
   * 价格有效天数
   */
  priceExpireDay: string;
}
export interface IInfoDetailResTreesItem {
  /**
   * 类目ID
   */
  categoryId: string;
  tree: IInfoDetailResTree;
}
/**
 * 类目树
 */
export interface IInfoDetailResTree {
  /**
   * 类目id
   */
  categoryId: string;
  /**
   * 类目名称
   */
  categoryName: string;
  child: IInfoDetailResChild;
}
/**
 * 子类目
 */
export interface IInfoDetailResChild {}
export interface IInfoDetailResSupplierPersonnelsItem {
  /**
   * 供应商人员主键
   */
  supplierPersonnelId: string;
  /**
   * 人员ID（业务ID）
   */
  personnelId: string;
  /**
   * 供应商ID（业务ID）
   */
  supplierId: string;
  /**
   * 姓名
   */
  name: string;
  /**
   * 手机号码
   */
  mobilePhone: string;
  /**
   * 职位
   */
  position: string;
  /**
   * 人员类型 1-负责人 2-联系人
   */
  type: string;
}

/**
 * 供应商id集合
 */
export type IPostSupplierSupplierInfosReq = Char[];
// ⬆️ WEB - 通过供应商id获取供应商信息请求体

// ⬇️ WEB - 通过供应商id获取供应商信息响应体 接口：https://yapi.tiangong.site/project/93/interface/api/9319
export interface IPostSupplierSupplierInfosResItem {
  /**
   * 服务类型多个英文逗号,分隔
   */
  serviceTypeNames: string[];
  /**
   * 开票状态
   */
  invoiceState: string;
  /**
   * 结算方式
   */
  settlementType: string;
  /**
   * 合作类型（1临时，2合作）
   */
  cooperationType: string;
  /**
   * 启动与否（0否1是）
   */
  startUp: string;
  /**
   * 认证来源
   */
  authenticationSource: string;
  /**
   * 固定电话号码
   */
  telephone: string;
  /**
   * 手机号码
   */
  mobilePhone: string;
  /**
   * 是否是色卡仓（0否1是），只用于面料供应商
   */
  isColorCard: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 供应商大类 FABRIC_SUPPLIER-面料商，INGREDIENT_SUPPLIER-辅料商，TECHNOLOGY_SUPPLIER-工艺厂
   */
  supplierCategory: string;
  /**
   * 底布，多个以,号隔开
   */
  bottomCloth: string;
  /**
   * 档口/仓库id
   */
  supplierId: string;
  /**
   * 上级供应商ID （经营主体id）
   */
  parentSupplierId: string;
  /**
   * 经营主体名称
   */
  parentSupplierName: string;
  /**
   * 经营主体编码
   */
  parentSupplierCode: string;
  /**
   * 供应商编码
   */
  supplierCode: string;
  /**
   * 档口/仓库名称
   */
  supplierName: string;
  /**
   * 供应商类型 1-档口 2-仓库 3-公司
   */
  supplierType: string;
  /**
   * 经营范围：1-净色 2-花型 3-净色&花型'
   */
  businessScope: string;
  /**
   * 省
   */
  province: string;
  /**
   * 市
   */
  city: string;
  /**
   * 区
   */
  area: string;
  /**
   * 档口/仓库地址
   */
  address: string;
  /**
   * 主营类目，多个以,号隔开
   */
  businessCategory: string;
  /**
   * 供应商状态 0-临时 1-待认证 2-认证通过 3-认证无效
   */
  status: string;
  /**
   * 认证时间
   */
  lastAuthenticationTime: string;
  /**
   * 合作标签，多个以,号隔开
   */
  cooperativeTag: string;
  /**
   * 百布运营id
   */
  baibuOperatorId: string;
  /**
   * 运营负责人
   */
  baibuOperator: string;
  /**
   * 供应商级别 1-普通 2-金牌
   */
  level: string;
  /**
   * 最近修改时间
   */
  revisedTime: string;
}

export type IPostSupplierSupplierInfosRes = IPostSupplierSupplierInfosResItem[];

// ⬇️ 面料商列表请求体 接口：https://yapi.tiangong.site/project/93/interface/api/9299
/**
 * req
 */
export interface IScmPostsupplierFabricPageReq {
  /**
   * 供应商名称
   */
  supplierName?: string;
  /**
   * 供应商编码
   */
  supplierCode?: string;
  /**
   * 开票状态
   */
  invoiceState?: Char;
  /**
   * 合作类型（1临时，2合作）
   */
  cooperationType?: Char;
  /**
   * 启动与否（0否1是）
   */
  startUp?: Char;
  /**
   * 当前页号
   */
  pageNum?: Char;
  /**
   * 每页数量
   */
  pageSize?: Char;
  /**
   * 是否是色卡仓（0否1是），只用于面料供应商
   */
  isColorCard?: Char;
}
// ⬆️ 面料商列表请求体

// ⬇️ 面料商列表响应体 接口：https://yapi.tiangong.site/project/93/interface/api/9299
export interface IScmPostsupplierFabricPageRes {
  page: string;
  total: string;
  list: IFabricPageResListItem[];
}
export interface IFabricPageResListItem {
  /**
   * 供应商Id
   */
  supplierId: string;
  /**
   * 供应商名称
   */
  supplierName: string;
  /**
   * 供应商编码
   */
  supplierCode: string;
  /**
   * 开票状态
   */
  invoiceState: string;
  /**
   * 结算方式
   */
  settlementType: string;
  /**
   * 合作类型（1临时，2合作）
   */
  cooperationType: string;
  /**
   * 启动与否（0否1是）
   */
  startUp: string;
}
// ⬆️ 面料商列表响应体

// ⬇️ 根据供应商id查询供应商明细信息响应体 接口：https://yapi.tiangong.site/project/93/interface/api/11208
export interface IV2SupplierInfoDetailRes {
  /**
   * 供应商ID（业务ID）
   */
  supplierId: string;
  /**
   * 上级供应商ID
   */
  parentSupplierId: string;
  /**
   * 供应商编码
   */
  supplierCode: string;
  /**
   * 供应商名称
   */
  supplierName: string;
  /**
   * 供应商大类 FABRIC_SUPPLIER-面料商，INGREDIENT_SUPPLIER-辅料商，TECHNOLOGY_SUPPLIER-工艺厂
   */
  supplierCategory: string;
  /**
   * 供应商级别 1-普通 2-金牌
   */
  level: string;
  /**
   * 经营范围（类型） 1-净色 2-花型 3-净色&花型。多个以,号分隔
   */
  businessScope: string;
  /**
   * 固定电话号码
   */
  telephone: string;
  /**
   * 手机号码
   */
  mobilePhone: string;
  /**
   * 区域 华南|华东
   */
  region: string;
  /**
   * 主营类目，多个以,号隔开
   */
  businessCategory: string;
  /**
   * 供应商类型 1-档口 2-仓库 3-公司
   */
  supplierType: string;
  /**
   * 创建者名字
   */
  creatorName: string;
  /**
   * 供应商状态 0-临时 1-待认证 2-认证通过 3-认证无效
   */
  status: string;
  /**
   * 百布运营人员
   */
  baibuOperatorId: string;
  /**
   * 百布运营人员
   */
  baibuOperator: string;
  /**
   * 百布运营人员手机号码
   */
  baibuOperatorMobilePhone: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 底布，多个以,号隔开
   */
  bottomCloth: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 创建时间
   */
  createdTime: string;
  extInfo: IV2SupplierInfoDetailResExtInfo;
  /**
   * 供应商联系人
   */
  supplierPersonnels: IV2SupplierInfoDetailResSupplierPersonnelsItem[];
  /**
   * 供应商地址
   */
  supplierAddresses: IInfoDetailResSupplierAddressesItem[];
  /**
   * 供应商账号信息
   */
  supplierAccountRelations: IInfoDetailResSupplierAccountRelationsItem[];
  /**
   * 发票信息
   */
  invoiceTitles: IInfoDetailResInvoiceTitlesItem[];
}
/**
 * 供应商扩展信息
 */
export interface IV2SupplierInfoDetailResExtInfo {
  /**
   * 账单额度
   */
  accountLimit: string;
  /**
   * 对账开始时间
   */
  reconciliationCreateTime: string;
  /**
   * 对账结束时间
   */
  reconciliationEndTime: string;
  /**
   * 结账开始时间
   */
  checkoutCreateTime: string;
  /**
   * 结账结束时间
   */
  checkoutEndTime: string;
  /**
   * 贷款连接人
   */
  loanConnectMan: string;
  /**
   * 图稿（多个以逗号分隔）
   */
  sketch: string;
  /**
   * 价格有效天数
   */
  priceExpireDay: string;
  /**
   * 主键id
   */
  extId: string;
  /**
   * 供应商id
   */
  supplierId: string;
  /**
   * 供应商类型
   */
  supplierType: string;
  /**
   * 服务类型多个英文逗号,分隔
   */
  serviceTypeNames: string[];
  /**
   * 服务类型树
   */
  trees: IV2SupplierInfoDetailResTreesItem[];
  /**
   * 开票状态（字典值 invoice_dict）
   */
  invoiceState: string;
  /**
   * 结算方式（1现结 2账期 字典值：settlement_type）
   */
  settlementType: string;
  /**
   * 修改人id
   */
  reviserId: string;
  /**
   * 更新时间
   */
  revisedTime: string;
  /**
   * 是否删除：0否 1 是
   */
  isDeleted: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 合作类型（1临时，2合作）
   */
  cooperationType: string;
  /**
   * 启动与否（0否1是）
   */
  startUp: string;
  /**
   * 认证来源
   */
  authenticationSource: string;
  /**
   * 是否是色卡仓（0否1是），只用于面料供应商
   */
  isColorCard: string;
  /**
   * 营业照片，多张以,号隔开
   */
  businessPhoto: string;
}
export interface IV2SupplierInfoDetailResTreesItem {
  /**
   * 类目ID
   */
  categoryId: string;
  tree: IV2SupplierInfoDetailResTree;
}
/**
 * 类目树
 */
export interface IV2SupplierInfoDetailResTree {
  /**
   * 类目id
   */
  categoryId: string;
  /**
   * 类目名称
   */
  categoryName: string;
  child: IV2SupplierInfoDetailResChild;
}
/**
 * 子类目
 */
export interface IV2SupplierInfoDetailResChild {}
export interface IV2SupplierInfoDetailResSupplierPersonnelsItem {
  /**
   * 供应商人员主键
   */
  supplierPersonnelId: string;
  /**
   * 人员ID（业务ID）
   */
  personnelId: string;
  /**
   * 供应商ID（业务ID）
   */
  supplierId: string;
  /**
   * 姓名
   */
  name: string;
  /**
   * 手机号码
   */
  mobilePhone: string;
  /**
   * 职位
   */
  position: string;
  /**
   * 人员类型 1-负责人 2-联系人
   */
  type: string;
}
export interface IInfoDetailResSupplierAddressesItem {
  /**
   * 供应商地址id
   */
  supplierAddressId: string;
  /**
   * 地址类型（1档口地址 2配发货地址）
   */
  type: string;
  /**
   * 供应商id
   */
  supplierId: string;
  /**
   * 省
   */
  province: string;
  /**
   * 市
   */
  city: string;
  /**
   * 区
   */
  area: string;
  /**
   * 商圈
   */
  tradingArea: string;
  /**
   * 详细地址
   */
  address: string;
  /**
   * 是否默认（0否 1是）
   */
  isDefault: string;
}
export interface IInfoDetailResSupplierAccountRelationsItem {
  /**
   * 主键id
   */
  supplierAccountRelationId: string;
  /**
   * 支付账号ID
   */
  paymentAccountId: string;
  /**
   * 客户ID
   */
  settlementId: string;
  /**
   * 客户编码
   */
  settlementCode: string;
  /**
   * 客户名称
   */
  settlementName: string;
  /**
   * 客户类型
   */
  settlementType: 'SUPPLIER' | 'PURCHASER';
  /**
   * 账户类型
   */
  paymentAccountType:
  | 'BUSINESS_BANK_CARD'
  | 'PERSONAL_BANK_CARD'
  | 'ALIPAY'
  | 'DEFAULT_TYPE';
  /**
   * 开户银行
   * 账户类型是银行卡时，不能为空
   */
  bankName: string;
  /**
   * 开户支行
   * 账户类型是银行卡时，不能为空
   */
  bankSubbranch: string;
  /**
   * 账号 卡号/支付宝账号
   */
  accountNo: string;
  /**
   * 开户名
   */
  accountName: string;
  /**
   * 是否启用(状态)
   */
  isEnabled: string;
}
export interface IInfoDetailResInvoiceTitlesItem {
  /**
   * 主键id
   */
  invoiceTitleId: string;
  /**
   * 供应商id
   */
  supplierId: string;
  /**
   * 供应商类型,FABRIC_SUPPLIER:面料商:、INGREDIENT_SUPPLIER:辅料供应商、TECHNOLOGY_SUPPLIER:工艺提供商(工艺厂)
   */
  supplierType: string;
  /**
   * 发票类型
   */
  invoiceType: string;
  /**
   * 抬头名称
   */
  titleName: string;
  /**
   * 供应商编码
   */
  supplierCode: string;
  /**
   * 供应商名称(企业名称)
   */
  supplierName: string;
  /**
   * 税号
   */
  invoiceCode: string;
  /**
   * 供应商地址(企业地址)
   */
  supplierAddress: string;
  /**
   * 开票税率,百分比转化成小数
   */
  invoiceRate: string;
  /**
   * 供应商电话号码(电话号码)
   */
  supplierPhone: string;
  /**
   * 报价方式
   */
  quotationType: string;
  /**
   * 加成率
   */
  markupPercentage: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 状态（1：启用，0：停用）
   */
  isEnabled: string;
  /**
   * 开票转态
   */
  invoiceState: string;
}
// ⬆️ 根据供应商id查询供应商明细信息响应体

// ⬇️ 商品-商品字典数据响应体 接口：https://yapi.tiangong.site/project/93/interface/api/9281
export interface ICommodityDictionaryRes {
  widthUnit: ICommodityDictionaryResWidthUnit;
  weightUnit: ICommodityDictionaryResWeightUnit;
  spacingUnit: ICommodityDictionaryResSpacingUnit;
  sampleUnit: ICommodityDictionaryResSampleUnit;
  unit: ICommodityDictionaryResUnit;
  material: ICommodityDictionaryResMaterial;
  colorSystem: ICommodityDictionaryResColorSystem;
  weave: ICommodityDictionaryResWeave;
  elasticity: ICommodityDictionaryResElasticity;
  texture: ICommodityDictionaryResTexture;
  technology: ICommodityDictionaryResTechnology;
  category: ICommodityDictionaryResCategory;
  grade: ICommodityDictionaryResGrade;
  season: ICommodityDictionaryResSeason;
  use: ICommodityDictionaryResUse;
}
/**
 * 门幅单位
 */
export interface ICommodityDictionaryResWidthUnit {
  /**
   * 字典类目代码
   */
  code: string;
  /**
   * 字典类目名称
   */
  name: string;
  /**
   * 字典类目下面的字典项
   */
  items: ICommodityDictionaryResItemsItem[];
}
export interface ICommodityDictionaryResItemsItem {
  /**
   * 字典项ID
   */
  id: string;
  /**
   * 字典项名称
   */
  name: string;
  /**
   * 字典值
   */
  value: string;
  /**
   * 备注
   */
  remark: string;
}
/**
 * 克重单位
 */
export interface ICommodityDictionaryResWeightUnit {
  /**
   * 字典类目代码
   */
  code: string;
  /**
   * 字典类目名称
   */
  name: string;
  /**
   * 字典类目下面的字典项
   */
  items: ICommodityDictionaryResItemsItem[];
}
/**
 * 间距单位
 */
export interface ICommodityDictionaryResSpacingUnit {
  /**
   * 字典类目代码
   */
  code: string;
  /**
   * 字典类目名称
   */
  name: string;
  /**
   * 字典类目下面的字典项
   */
  items: ICommodityDictionaryResItemsItem[];
}
/**
 * 剪版单位
 */
export interface ICommodityDictionaryResSampleUnit {
  /**
   * 字典类目代码
   */
  code: string;
  /**
   * 字典类目名称
   */
  name: string;
  /**
   * 字典类目下面的字典项
   */
  items: ICommodityDictionaryResItemsItem[];
}
/**
 * 大货单位
 */
export interface ICommodityDictionaryResUnit {
  /**
   * 字典类目代码
   */
  code: string;
  /**
   * 字典类目名称
   */
  name: string;
  /**
   * 字典类目下面的字典项
   */
  items: ICommodityDictionaryResItemsItem[];
}
/**
 * 成分
 */
export interface ICommodityDictionaryResMaterial {
  /**
   * 字典类目代码
   */
  code: string;
  /**
   * 字典类目名称
   */
  name: string;
  /**
   * 字典类目下面的字典项
   */
  items: ICommodityDictionaryResItemsItem[];
}
/**
 * 色系
 */
export interface ICommodityDictionaryResColorSystem {
  /**
   * 字典类目代码
   */
  code: string;
  /**
   * 字典类目名称
   */
  name: string;
  /**
   * 字典类目下面的字典项
   */
  items: ICommodityDictionaryResItemsItem[];
}
/**
 * 编织方法
 */
export interface ICommodityDictionaryResWeave {
  /**
   * 字典类目代码
   */
  code: string;
  /**
   * 字典类目名称
   */
  name: string;
  /**
   * 字典类目下面的字典项
   */
  items: ICommodityDictionaryResItemsItem[];
}
/**
 * 弹力
 */
export interface ICommodityDictionaryResElasticity {
  /**
   * 字典类目代码
   */
  code: string;
  /**
   * 字典类目名称
   */
  name: string;
  /**
   * 字典类目下面的字典项
   */
  items: ICommodityDictionaryResItemsItem[];
}
/**
 * 纹路
 */
export interface ICommodityDictionaryResTexture {
  /**
   * 字典类目代码
   */
  code: string;
  /**
   * 字典类目名称
   */
  name: string;
  /**
   * 字典类目下面的字典项
   */
  items: ICommodityDictionaryResItemsItem[];
}
/**
 * 工艺
 */
export interface ICommodityDictionaryResTechnology {
  /**
   * 字典类目代码
   */
  code: string;
  /**
   * 字典类目名称
   */
  name: string;
  /**
   * 字典类目下面的字典项
   */
  items: ICommodityDictionaryResItemsItem[];
}
/**
 * 品类
 */
export interface ICommodityDictionaryResCategory {
  /**
   * 字典类目代码
   */
  code: string;
  /**
   * 字典类目名称
   */
  name: string;
  /**
   * 字典类目下面的字典项
   */
  items: ICommodityDictionaryResItemsItem[];
}
/**
 * 档次
 */
export interface ICommodityDictionaryResGrade {
  /**
   * 字典类目代码
   */
  code: string;
  /**
   * 字典类目名称
   */
  name: string;
  /**
   * 字典类目下面的字典项
   */
  items: ICommodityDictionaryResItemsItem[];
}
/**
 * 季节
 */
export interface ICommodityDictionaryResSeason {
  /**
   * 字典类目代码
   */
  code: string;
  /**
   * 字典类目名称
   */
  name: string;
  /**
   * 字典类目下面的字典项
   */
  items: ICommodityDictionaryResItemsItem[];
}
/**
 * 用途
 */
export interface ICommodityDictionaryResUse {
  /**
   * 字典类目代码
   */
  code: string;
  /**
   * 字典类目名称
   */
  name: string;
  /**
   * 字典类目下面的字典项
   */
  items: ICommodityDictionaryResItemsItem[];
}
// ⬆️ 商品-商品字典数据响应体

// 商品类型
// 辅料 : 10
// 工艺 : 20
export type ICategoryListReq = '10' | '20';
/**
 * 响应数据
 */

export interface ICategoryListItem {
  /**
     * 类目名称
     */
  label: string;
  /**
     * 类目id
     */
  value: string;
  /**
     * 父类目id
     */
  parent: string;
  /**
     * 是否被引用
     */
  isRef: boolean;
  /**
     * 类目排序,初步是按照自然升序
     */
  categorySort: string;
  /**
     * 子类目列表
     */
  children?: ICategoryListChildrenItem[];
  [k: string]: any;
}

export interface ICategoryListChildrenItem {
  /**
     * 类目名称
     */
  label: string;
  /**
     * 类目id
     */
  value: string;
  /**
     * 父类目id
     */
  parent: string;
  /**
     * 是否被引用
     */
  isRef: boolean;
  /**
     * 类目排序,初步是按照自然升序
     */
  categorySort: string;
  children?: ICategoryListChildrenItem[];
  [k: string]: any;
}

export type ICategoryListRes = ICategoryListItem[];
