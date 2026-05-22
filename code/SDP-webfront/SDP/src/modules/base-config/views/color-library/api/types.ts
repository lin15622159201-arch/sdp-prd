import { SORT_ORDER_ENUM, YES_NO_NUMBER_ENUM } from '@/constant';

// ⬇️ 字典 - 根据条件参数查询 接口：https://yapi.tiangong.site/project/35/interface/api/2546
export interface ISysAdminWebDictReq {
  /**
   * 字典编号
   */
  dictCodes: string[];
}
export interface ISysAdminWebDictResLabelItem {
  /**
   * 字典id
   */
  id: string;
  /**
   * 标签，label+value拼接
   */
  labelValue: string;
}
export interface ISysAdminWebDictResAttributeItem {
  /**
   * 字典id
   */
  id: string;
  /**
   * 字典编码
   */
  code: string;
  /**
   * 字典值
   */
  name: string;
  /**
   * 字典描述
   */
  remark: string;
}
export interface ISysAdminWebDictResItem {
  /**
   * 字典id
   */
  id: string;
  /**
   * 字典名称
   */
  dictName: string;
  /**
   * 字典编号
   */
  dictCode: string;
  /**
   * 排序值
   */
  sorted: number;
  /**
   * 是否启用 0 禁用  1启用
   */
  state: YES_NO_NUMBER_ENUM;
  /**
   * 标签
   */
  labels: ISysAdminWebDictResLabelItem[];
  /**
   * 属性
   */
  attributes: ISysAdminWebDictResAttributeItem[];
  /**
   * 子级
   */
  children: ISysAdminWebDictResItem[];
  /** 修改时间 */
  revisedTime: string;
  /** 修改人名称 */
  reviserName: string;
}
// ⬆️ 字典 - 根据条件参数查询

// ⬇️ 字典 - 新增 接口：https://yapi.tiangong.site/project/35/interface/api/1881
export interface IAddSysAdminWebDictReq {
  /**
   * 字典名称
   */
  dictName: string;
  /**
   * 字典编码
   */
  dictCode: string;
  /**
   * 父级id
   * */
  parentId?: string;
  /**
   * 排序值 默认0 数字越大，排序越前
   */
  sorted: number;
  /**
   * 是否启用 0 禁用  1启用
   */
  labels?: ISysAdminWebDictResLabelItem[];
  /**
   * 属性
   */
  attributes?: ISysAdminWebDictResAttributeItem[];
  remark?: string;
}
// ⬆️ 字典 - 新增

// ⬇️ 字典 - 修改 接口：https://yapi.tiangong.site/project/35/interface/api/1882
export interface IUpdateSysAdminWebDictReq {
  /**
   * 字典id
   */
  id: string;
  /**
   * 字典名称
   */
  dictName: string;
  /**
   * 排序值 默认0 数字越大，排序越前
   */
  sorted: number;
  /**
   * 是否启用 0 禁用  1启用
   */
  labels?: ISysAdminWebDictResLabelItem[];
  /**
   * 属性
   */
  attributes?: ISysAdminWebDictResAttributeItem[];
  remark?: string;
}
// ⬆️ 字典 - 修改

// ⬇️ 字典 - 分页查询 接口：https://yapi.tiangong.site/project/35/interface/api/1883
export interface ISysAdminWebDictPageReqSortItem {
  /**
   * 排序字段
   */
  fieId?: string;
  order?: SORT_ORDER_ENUM;
}

export interface ISysAdminWebDictPageReqFilterItem {
  /**
   * 字典编码
   */
  dictCode?: string;
  /**
   * 字典状态
   */
  state?: YES_NO_NUMBER_ENUM;
  /**
   * 字典层级
   */
  level?: number;
  /**
   * 父级id
   */
  parentId?: string;
  /**
   * 标签id
   */
  labelId?: string;
}
export interface ISysAdminWebDictPageReq {
  /**
   * 页码
   */
  pageNum: number;
  /**
   * 每页条数
   */
  pageSize: number;
  /**
   * 排序
   */
  sort?: ISysAdminWebDictPageReqSortItem[];
  filters?: ISysAdminWebDictPageReqFilterItem;
}
export interface ISysAdminWebDictPageResListItem {
  /**
   * 字典id
   */
  id: string;
  /**
   * 字典名称
   */
  dictName: string;
  /**
   * 字典编码
   */
  dictCode: string;
  /**
   * 排序值
   */
  sorted: number;
  /**
   * 是否启用 0 禁用  1启用
   */
  state: YES_NO_NUMBER_ENUM;
  createdTime?: string;
  revisedTime?: string;
  creatorId?: string;
  creatorName?: string;
  reviserId?: string;
  reviserName?: string;
  level?: number;
  remark?: string;
  labels?: ISysAdminWebDictResLabelItem[];
  attributes?: ISysAdminWebDictResAttributeItem[];
}

export interface ISysAdminWebDictPageRes {
  /**
   * 总条数
   */
  total: number;
  /**
   * 页码
   * */
  pageNum: number;
  /**
   * 列表
   */
  list: ISysAdminWebDictPageResListItem[];
}
// ⬆️ 字典 - 分页查询
/**
 * 全部类别以及下属的颜色 请求参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/103861
 */
export interface BaseAllColorCategoryReq {
}
/**
 * 全部类别以及下属的颜色 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/103861
 */
export type BaseAllColorCategoryRes = BaseAllColorCategoryResItem[];

/**
 *  单项响应数据
 */
export interface BaseAllColorCategoryResItem {
  /** 品类名称 */
  name?: string;
  /** 品类编码 */
  code?: string;
  /** 颜色列表 */
  colorRespList?: BaseAllColorCategoryResColorRespListItem[];
}

/**
 * 颜色列表
 */
export interface BaseAllColorCategoryResColorRespListItem {
  /** 颜色名称 */
  name?: string;
  /** 颜色编码 */
  code?: string;
}
