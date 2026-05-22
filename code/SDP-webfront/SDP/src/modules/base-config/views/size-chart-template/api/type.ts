// ⬇️ 尺寸表模板图（分页）-列表查询请求体 接口：https://yapi.tiangong.site/project/36/interface/api/1805
export interface ISizeTemplatePageReq {
  pageNum: number;
  pageSize: number;
  /**
   * 打版品类Code 例如：女装-套装-连衣裙 用'-'隔开
   */
  categoryCode?: string;
  /**
   * 打版品类 例如：女装-套装-连衣裙 用'-'隔开
   */
  categoryName?: string;
}

// ⬆️ 尺寸表模板图（分页）-列表查询请求体

// ⬇️ 尺寸表模板图（分页）-列表查询响应体 接口：https://yapi.tiangong.site/project/36/interface/api/1805
export interface ISizeTemplatePageRes {
  page: number;
  total: number;
  list: ISizeTemplatePageResListItem[];
}
export interface ISizeTemplatePageResListItem {
  /**
   *主键id
   */
  sizeTemplateImageId: string;
  /**
   * 打版品类Code 例如：女装-套装-连衣裙 用'-'隔开
   */
  categoryCode: string;
  /**
   * 打版品类 例如：女装-套装-连衣裙 用'-'隔开
   */
  categoryName: string;
  /**
   * 尺寸表模板图url
   * */
  sizeTemplateImageUrls: string[];
  /**
   * 量法图
   */
  quantityMethodImageUrls: string[];
  /**
   * 备注
   */
  remark: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 创建人
   */
  creatorName: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 修改人id
   */
  reviserId: string;
  /**
   * 修改人
   */
  reviserName: string;
  /**
   * 修改时间
   */
  revisedTime: string;
}
// ⬆️ 尺寸表模板图（分页）-列表查询响应体

// ⬇️ 保存-尺寸表模板图-请求体 接口：https://yapi.tiangong.site/project/36/interface/api/1806
export interface ISaveSiveTemplateItem {
  /**
   * AI品类映射关系表id
   */
  sizeTemplateImageId: string;
  /**
   * 内部品类编码, 前三级品类编码 用'-'隔开
   */
  categoryCode: string;
  /**
   * 内部品类名称, 前三级品类名称 用'-'隔开
   */
  categoryName: string;
  /**
   * 尺寸表模板图url
   * */
  sizeTemplateImageUrls: string[];
  /**
   * 量法图
   */
  quantityMethodImageUrls: string[];
  /**
   * 备注
   */
  remark: string;
}

// ⬆️ 保存-尺寸表模板图-请求体
