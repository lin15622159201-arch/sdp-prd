import { YES_NO_ENUM } from '@/constant';
import { CATEGORY_TYPE_ENUM } from '../constant';

// ⬇️ AI品类映射关系（分页）-列表查询请求体 接口：https://yapi.tiangong.site/project/36/interface/api/1802
export interface IAiCategoryMappingPageReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * AI品类编码
   */
  aiCategoryCode?: string;
  /**
   * AI品类名称
   */
  aiCategoryName?: string;
  /**
   * 内部品类编码, 前三级品类编码 用'-'隔开
   */
  categoryCode?: string;
  /**
   * 内部品类名称, 前三级品类名称 用'-'隔开
   */
  categoryName?: string;
}

// ⬆️ AI品类映射关系（分页）-列表查询请求体

// ⬇️ AI品类映射关系（分页）-列表查询响应体 接口：https://yapi.tiangong.site/project/36/interface/api/1802
export interface IAiCategoryMappingPageRes {
  page: number;
  total: number;
  list: IAiCategoryMappingPageResListItem[];
}
export interface IAiCategoryMappingPageResListItem {
  /**
   *AI品类映射关系表id
   */
  aiCategoryMappingId: string;
  /**
   * AI品类编码
   */
  aiCategoryCode: string;
  /**
   * AI品类名称
   */
  aiCategoryName: string;
  /**
   * 内部品类编码, 前三级品类编码 用'-'隔开
   */
  categoryCode: string;
  /**
   * 内部品类名称, 前三级品类名称 用'-'隔开
   */
  categoryName: string;
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
  /** 映射类型 */
  type: string;
}
// ⬆️ AI品类映射关系（分页）-列表查询响应体

// ⬇️ AI品类映射关系（保存）-列表查询请求体 接口：https://yapi.tiangong.site/project/36/interface/api/1803
export interface IUpdateAiCategoryMappingReq {
  /**
   * AI品类映射关系表id
   */
  aiCategoryMappingId: string;
  /**
   * AI品类编码，只传末级的编码就行
   */
  aiCategoryCode?: string;
  /**
   * AI品类名称，全路径的名称，用'-'链接起来
   */
  aiCategoryName?: string;
  /**
   * 内部品类编码, 前三级品类编码 用'-'隔开
   */
  categoryCode?: string;
  /**
   * 内部品类名称, 前三级品类名称 用'-'隔开
   */
  categoryName?: string;
}

// ⬆️ AI品类映射关系（保存）-列表查询请求体

// ⬇️ AI设计品类列表响应体 接口：https://yapi.tiangong.site/project/19/interface/api/1276
export interface IGetCategoryParams {
  label?: string;
  /**
   * 分类编码
   */
  classCode: CATEGORY_TYPE_ENUM;
  /**
   * 分组编码
   */
  groupCode?: string;
}
/**
 * 响应数据
 */
export interface IAiCategoryMappingAiCategoryListItem {
  /**
   * 父级ID
   */
  parentId: string;
  /**
   * 父级编码
   */
  parentCode: string;
  /**
   * 标签编码
   */
  labelCode: string;
  /**
   * 分类ID
   */
  id: string;
  /**
   * 标签编码
   */
  code: string;
  /**
   * 标签值
   */
  value: string;
  /**
   * 是否启用：{0-否 ,1-是},默认1
   */
  enable: string;
  /**
   * 层级：{1-一级,2-二级,3-三级，4-四级},默认1
   */
  level: string;
  /**
   * 是否叶子节点：{0-否,1-是},默认1
   */
  leafy: string;
  /**
   * 排序
   */
  sort: string;
  children?: IAiCategoryMappingAiCategoryListItem[];
}
// ⬆️ AI设计品类列表响应体
