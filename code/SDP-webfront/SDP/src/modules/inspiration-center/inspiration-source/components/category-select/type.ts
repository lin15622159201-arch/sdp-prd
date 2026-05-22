export interface IStyleInfoPageReq {
  /**
   * 当前查询的页码
   */
  pageNum?: number;
  /**
   * 当前查询单页的数据量
   */
  pageSize?: number;
  /**
   * 创建时间开始日期
   */
  createTimeFrom?: string;
  /**
   * 创建时间结束日期
   */
  createTimeTo?: string;
  /**
   * 更新状态：1待更新，2已更新
   */
  updateStatus?: number;
  /**
   * 铺货状态：1待铺货，2部分铺货，3已铺货
   */
  sellStatus?: number;
  /**
   * 品类名称
   */
  categoryName?: string;
  /**
   * 款式编号
   */
  spuCode?: string;
  /**
   * 原图编号
   */
  sourceCode?: string;
}
// ⬆️ 分页列表请求体

// ⬇️ 分页列表响应体 接口：https://yapi.textile-story.com/project/1315/interface/api/96011
/**
 * 响应数据
 */
export interface IStyleInfoPageRes {
  /**
   * 当前页码, 主要给 web 端做分页校验
   */
  page: string;
  /**
   * 总数据量
   */
  total: string;
  /**
   * 分页数据
   */
  list: IStyleInfoPageResListItem[];
}
export interface IStyleInfoPageResListItem {
  /**
   * 主键
   */
  styleInfoId: string;
  /**
   * spu主键
   */
  spuId: string;
  /**
   * 尺码组名称
   */
  sizeGroupName: string;
  /**
   * 尺码组编号
   */
  sizeGroupCode: string;
  /**
   * 织造方式
   */
  weaveType: string;
  /**
   * 商品标题
   */
  productTitle: string;
  /**
   * 发货时效
   */
  deliveryDays: string;
  /**
   * 品类名称
   */
  categoryName: string;
  /**
   * 品类编号
   */
  categoryCode: string;
  /**
   * 安全等级
   */
  securityLevel: string;
  /**
   * 材质成分
   */
  material: string;
  /**
   * 尺寸表
   */
  sizeInfo: string;
  /**
   * 尺寸表图片
   */
  sizeInfoImage: string;
  /**
   * 创建人ID
   */
  creatorId: string;
  /**
   * 创建人姓名
   */
  creatorName: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 更新人ID
   */
  reviserId: string;
  /**
   * 更新人姓名
   */
  reviserName: string;
  /**
   * 更新时间
   */
  revisedTime: string;
  /**
   * 更新状态：1待更新，2已更新
   */
  updateStatus: string;
  /**
   * 铺货状态：1待铺货，2部分铺货，3已铺货
   */
  sellStatus?: string;
  /**
   * 颜色
   */
  fabricColor?: string;
  /**
   * 色系
   */
  fabricColorSeries?: string;
}

/**
 * 响应数据
 */
export interface IV1StyleInfoRes {
  /**
   * 主键
   */
  styleInfoId: string;
  /**
   * 款式编号
   */
  spuCode: string;
  /**
   * 商品图
   */
  productImage: string;
  /**
   * 来源渠道
   */
  sourceChannel: string;
  /**
   * 原图编号
   */
  sourceCode: string;
  /**
   * spu主键
   */
  spuId: string;
  /**
   * 尺码组名称
   */
  sizeGroupName: string;
  /**
   * 尺码组编号
   */
  sizeGroupCode: string;
  /**
   * 织造方式
   */
  weaveType: string;
  /**
   * 商品标题
   */
  productTitle: string;
  /**
   * 发货时效
   */
  deliveryDays: string;
  /**
   * 品类名称
   */
  categoryName: string;
  /**
   * 品类编号
   */
  categoryCode: string;
  /**
   * 安全等级
   */
  securityLevel: string;
  /**
   * 材质成分
   */
  material: string;
  /**
   * 尺寸表
   */
  sizeInfo: string;
  /**
   * 尺寸表图片
   */
  sizeInfoImage: string;
  /**
   * 面料颜色
   */
  fabricColor: string;
  /**
   * 色系
   */
  fabricColorSeries: string;
  /**
   * 成本价信息
   */
  skcs: IV1StyleInfoResStylePriceInfosItem[];
  /**
   * 更新状态：1待更新，2已更新
   */
  updateStatus: string;
  /**
   * 铺货状态：1待铺货，2部分铺货，3已铺货
   */
  sellStatus: string;
  /**
   * 创建人ID
   */
  creatorId: string;
  /**
   * 创建人姓名
   */
  creatorName: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 更新人ID
   */
  reviserId: string;
  /**
   * 更新人姓名
   */
  reviserName: string;
  /**
   * 更新时间
   */
  revisedTime: string;
  /**
   * 应用尺码
   */
  applySize: string;
  /**
   * 跳码详细列表
   */
  sizeSkipList: any;
  /**
   * 跳码规则
   */
  sizeRule: string;
  /**
   * 样衣尺码
   */
  sampleSize: string;
}
export interface IV1StyleInfoResStylePriceInfosItem {
  /**
   * 主键
   */
  stylePriceId: string;
  /**
   * spu主键
   */
  spuId: string;
  /**
   * skcid
   */
  skcId: string;
  /**
   * 颜色
   */
  color: string;
  /**
   * 色系
   */
  colorSeries: string;
  /**
   * 成本价
   */
  costPrice: string;
  /**
   * 图片
   */
  skcImage: string;
  /**
   * 款式资料id
   */
  styleInfoId: string;
}

export type IV1StyleInfoResFromType = Pick<
IV1StyleInfoRes,
'sourceCode' |
'spuCode' |
'sourceChannel' |
'productTitle' |
'categoryCode' |
'weaveType' |
'fabricColor' |
'fabricColorSeries' |
'deliveryDays' |
'securityLevel' |
'material'
>;

export type IV1StyleInfoResMainFromType = Pick<
IV1StyleInfoRes,
'sizeGroupCode'
>;

export interface IStyleInfoBatchUpdateReq {
  styleInfos?: IStyleInfoBatchUpdateReqStyleInfosItem[];
}
export interface IStyleInfoBatchUpdateReqStyleInfosItem {
  /**
     * 主键
     */
  styleInfoId?: string;
  /**
     * 尺寸表图片
     */
  sizeInfoImage?: string;
  /**
     * 材质成分: [{"key":"棉","value":"90%"},{"key":"其他","value":"10%"}]
     */
  material?: string;
}
export interface IStyleInfoUpdateReq {
  /**
     * 主键
     */
  styleInfoId?: string;
  /**
     * 尺寸表图片
     */
  sizeInfoImage?: string;
  /**
     * 品类名称
     */
  categoryName?: string;
  /**
     * 织造方式
     */
  weaveType?: string;
  /**
     * 安全等级
     */
  securityLevel?: string;
  /**
     * 尺寸表
     */
  sizeInfo?: string;
  /**
     * skc信息
     */
  skcs?: IStyleInfoUpdateReqSkcsItem[];
  /**
     * 材质成分: [{"key":"棉","value":"90%"},{"key":"其他","value":"10%"}]
     */
  material?: string;
}
export interface IStyleInfoUpdateReqSkcsItem {
  /**
     * skcid
     */
  skcId?: string;
  /**
     * 成本价
     */
  costPrice?: string;
  /**
     * skc图片
     */
  skcImage?: string;
  /**
     * 颜色
     */
  color?: string;
  /**
     * 色系
     */
  colorSeries?: string;
}
