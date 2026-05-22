/**
 * 尺寸表模板操作日志数据结构
 */
export interface ISizeTemplatePageLogListItem {
  /**
   * 日志id
   */
  id: string;
  /**
   * 业务id(选中的业务)
   */
  buzId: string;
  /**
   * 业务类型
   */
  buzType: string;
  /**
   * 操作说明
   */
  content: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 创建人名称
   */
  creatorName: string;
  /**
   * 是否删除 0 否  1 是
   */
  isDeleted: string;
}
/**
 * 尺寸表模板列表数据结构
 */
export interface ISizeTemplatePageListItem {
  /**
   * 主键
   */
  id: string;
  /**
    * 模板名称
    */
  templateName: string;
  /**
    * 标签状态是否启用0否 1是
    */
  isEnabled: string;
  /**
    * 商品三级品类
    */
  threeCategory: string;
  /**
    * 创建时间
    */
  createdTime: string;
  /**
    * 操作人id
    */
  operatorId: string;
  /**
    * 操作人名称
    */
  operatorName: string;
  /**
    * 操作时间
    */
  operationTime: string;
  /**
    * 日志信息
    */
  operationContent: string;
}
/**
 * 尺寸表模板列表请求数据结构
 */
export interface ISizeTemplatePageReq {
  /**
   * 模板名称
   */
  templateName?: string;
  /**
    * 商品三级品类
    */
  threeCategory?: string;
  /**
    * 状态是否启用 0 否 1是
    */
  isEnabled?: string;
  /**
    * 创建时间（开始）
    */
  createdTimeBegin?: string;
  /**
    * 创建时间（结束）
    */
  createdTimeEnd?: string;
  /**
    * 当前查询的页码
    */
  pageNum?: string | number;
  /**
    * 当前查询单页的数据量
    */
  pageSize?: string | number;
}
/**
 * 尺寸表模板列表响应数据结构
 */
export interface ISizeTemplatePageRes {
  /**
   * 当前页码
   */
  page: string;
  /**
   * 总数量
   */
  total: string;
  /**
   * 列表数据
   */
  list: ISizeTemplatePageListItem[];
}
/**
 * 尺寸表模板详情尺寸表列表数据结构
 */
export interface ISizeTemplatePageDetailSizeListItem {
  /**
   * 部位编码
   */
  positionCode: string;
  /**
   * 部位名称
   */
  positionName: string;
  /**
   * 尺寸维度
   */
  dimension: string;
  /**
   * 量法
   */
  measuringMethod: string;
  /**
   * 允差范围
   */
  tolerance: string;
}
/**
 * 尺寸表模板详情数据结构
 */
export interface ISizeTemplatePageDetailSize {
  /**
   * id
   */
  id?: string;
  /**
   * 模板名称
   */
  templateName?: string;
  /**
   * 商品三级分类
   */
  categoryNameList?: string[];
  /**
   * 商品品类列表
   */
  categoryName?: string;
  /**
   * 引用尺寸模板
   */
  referSizeTemplate?: string;
  /**
   * 尺寸表数据
   */
  customerSizeList: ISizeTemplatePageDetailSizeListItem[];
}
/**
 * 引用尺寸表模板数据结构请求
 */
export interface ISizeTemplatePageDetailSizeReq {
  /**
   * id
   */
  id?: string;
  /**
   * 模板名称
   */
  referSizeTemplate?: string;
}
/**
 * 尺寸表模板详情响应数据结构
 */
export interface ISizeTemplatePageDetailSizeRes {
  /**
   * 列表数据
   */
  data: ISizeTemplatePageDetailSize;
}

export interface ITemplateChangeStatusReq {
  /**
   * 尺寸模板状态是否启用 0否 1是
   */
  enabled: string;
  /**
   * 主键列表
   */
  ids: (number | string)[];
}

export interface ITemplateListItem {
  /**
   * 主键id
   */
  id: string;
  /**
    * 模板名称
    */
  templateName: string;
  /**
    * 模板名称
    */
  templateCode: string;
  /**
    * 商品三级品类
    */
  threeCategory: string;
  /**
    * 商品三级品类
    */
  threeCategoryCode: string;
  /**
    * 部位尺寸详情信息json
    */
  sizeInfoJson: string;
  /**
    * 标签状态是否启用0否 1是
    */
  isEnabled: string;
  /**
    * 创建人id
    */
  creatorId: string;
  /**
    * 创建人名字
    */
  creatorName: string;
  /**
    * 创建时间
    */
  createdTime: string;
  /**
    * 逻辑删除 0否 1是
    */
  isDeleted: string;
}

/**
 * 响应数据
 */
export type ITemplateListRes = ITemplateListItem[];

/**
 * 响应数据
 */
export interface ITemplateDetailedInfoRes {
  /**
   * 主键
   */
  id: string;
  /**
   * 模板Code
   */
  templateCode: string;
  /**
   * 模板名称
   */
  templateName: string;
  /**
   * 标签状态是否启用0否 1是
   */
  isEnabled: string;
  /**
   * 商品三级品类
   */
  threeCategory: string;
  /**
   * 商品三级品类code
   */
  threeCategoryCode: string;
  /**
   * 尺寸详情信息
   */
  sizeInfoJsons: ITemplateDetailedInfoSizeInfoJsonsItem[];
}
export interface ITemplateDetailedInfoSizeInfoJsonsItem {
  /**
   * 部位名称code
   */
  positionCode: string;
  /**
   * 部位名称
   */
  position: string;
  /**
   * 尺寸维度
   */
  dimension: string;
  /**
   * 量法
   */
  measureMethod: string;
  /**
   * 允差范围
   */
  errorRange: string;
}

/**
 * 对象
 */
export interface ITemplateSaveReq {
  /**
   * 修改会选中修改，这里不做校验，前端注意传即可
   */
  id?: string;
  /**
   * 模板名称
   */
  templateName: string;
  /**
   * 商品三级品类
   */
  threeCategory: string;
  /**
   * 商品三级品类Code
   */
  threeCategoryCode: string;
  /**
   * 客户尺寸信息json
   */
  sizeInfoJsons?: ITemplateSaveSizeInfoJsonItem[];
}
export interface ITemplateSaveSizeInfoJsonItem {
  /**
   * 部位名称
   */
  position: string;
  /**
   * 尺寸维度
   */
  dimension: string;
  /**
   * 量法
   */
  measureMethod: string;
  /**
   * 允差范围
   */
  errorRange: string;
}
