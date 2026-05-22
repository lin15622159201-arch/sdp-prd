// ⬇️ 查询列表（分页）请求体 接口：https://yapi.tiangong.site/project/1302/interface/api/25934

import { SAMPLE_SIZE_STATE_ENUM } from '../constant';

/**
 * 分页对象
 */
export interface ISizeCategoryPageReq {
  /**
   * 前三级品类编码集合
   */
  categoryCodeList: string[];
  /**
   * 当前查询的页码
   */
  pageNum: number;
  /**
   * 当前查询单页的数据量
   */
  pageSize: number;
}
export interface ISizeCategoryPageResSizeNumInfoListItem {
  /**
   * 品类尺码号型关联表id
   */
  sizeCategoryNumId: string;
  /**
   * 尺码品类表id
   */
  sizeCategoryId: string;
  /**
   * 尺码标准名称 (如:天工尺码标准)
   */
  sizeStandard: string;
  /**
   * 尺码标准编号 (如:tiangong_code_standard)
   */
  sizeStandardCode: string;
  /**
   * 尺码名称 (如:XS)
   */
  sampleSize: string;
  /**
   * 号型编码
   */
  sizeTypeCode: string;
  /**
   * 号型名称
   */
  sizeTypeName: string;
  /**
   * 创建人名称
   */
  creatorName: string;
  /**
   * 修改人名称
   */
  reviserName: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 更新时间
   */
  revisedTime: string;
  /**
   * 创建时间
   */
  createdTime: string;
}

export interface ISizeCategoryPageResSizeStandardInfoListItem {
  /**
   * 尺码品类表id
   */
  sizeCategoryId: string;
  /**
   * 尺码标准名称 (如:天工尺码标准)
   */
  sizeStandard: string;
  /**
   * 尺码标准编号 (如:tiangong_code_standard)
   */
  sizeStandardCode: string;
  /**
   * 尺码-号型信息集合
   */
  sizeNumInfoList: ISizeCategoryPageResSizeNumInfoListItem[];
}

export interface ISizeCategoryPageResListItem {
  /**
   * 尺码品类表id
   */
  sizeCategoryId: string;
  /**
   * 前三级品类编码
   */
  categoryCode: string;
  /**
   * 前三级品类名称
   */
  categoryName: string;
  /**
   * 创建人名称
   */
  creatorName: string;
  /**
   * 修改人名称
   */
  reviserName: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 更新时间
   */
  revisedTime: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 尺码标准信息集合
   */
  sizeStandardInfoList: ISizeCategoryPageResSizeStandardInfoListItem[];
}

// ⬆️ 查询列表（分页）请求体

// ⬇️ 查询列表（分页）响应体 接口：https://yapi.tiangong.site/project/1302/interface/api/25934
/**
 * 响应数据
 */
export interface ISizeCategoryPageRes {
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
  list: ISizeCategoryPageResListItem[];
}

// ⬇️ 配置查询请求体 接口：https://yapi.tiangong.site/project/1302/interface/api/25862
export interface ISizeConfigListReq {
  /**
   * 尺码标准编号集合 (不传查全部)
   */
  sizeStandardCodeList: string[];
}

export interface ISizeConfigListResSizeConfigListItem {
  /**
   * 尺码配置表id
   */
  sizeConfigId: string;
  /**
   * 尺码标准名称 (如:天工尺码标准)
   */
  sizeStandard: string;
  /**
   * 尺码标准编号 (如:tiangong_code_standard)
   */
  sizeStandardCode: string;
  /**
   * 尺码名称 (如:XS)
   */
  sampleSize: string;
  /**
   * 关联的尺码数量
   */
  relateSizeCount: string;
  /**
   * 创建人名称
   */
  creatorName: string;
  /**
   * 修改人名称
   */
  reviserName: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 更新时间
   */
  revisedTime: string;
  /**
   * 创建时间
   */
  createdTime: string;
}

// ⬆️ 配置查询请求体

// ⬇️ 配置查询响应体 接口：https://yapi.tiangong.site/project/1302/interface/api/25862
/**
 * 响应数据
 */
export interface ISizeConfigListRes {
  /**
   * 尺码配置信息集合
   */
  sizeConfigList: ISizeConfigListResSizeConfigListItem[];
  /**
   * 更新时间
   */
  revisedTime: string;
  /**
   * 修改人名称
   */
  reviserName: string;
}

export interface ISizeConfigSubmitReqConfigInfoListItem {
  /**
   * 尺码配置表id (该id为null则新增,否则更新)
   */
  sizeConfigId: string;
  /**
   * 尺码标准名称 (如:天工尺码标准)
   */
  sizeStandard: string;
  /**
   * 尺码标准编号 (如:tiangong_code_standard)
   */
  sizeStandardCode: string;
  /**
   * 尺码名称 (如:XS)
   */
  sampleSize: string;
  /**
   * 尺码选中状态: 0-取消选中,1-选中;
   */
  sampleSizeState: SAMPLE_SIZE_STATE_ENUM;
  /**
   * 更新时间(若已经提交过, 更新时间不能为空)
   */
  revisedTime: string;
}
/**
 * 请求参数对象
 */
export interface ISizeConfigSubmitReq {
  /**
   * 尺码配置信息集合
   */
  configInfoList: ISizeConfigSubmitReqConfigInfoListItem[];
  /**
   * 更新时间(若已经提交过, 更新时间不能为空)
   */
  revisedTime?: string;
}

// ⬇️ 批量删除请求体 接口：https://yapi.tiangong.site/project/1302/interface/api/25979
/**
 * 入参
 */
export interface ISizeCategoryDeleteReq {
  /**
   * ID集合
   */
  ids: string[];
}

export interface ISizeCategorySaveReqCategoryAddInfoListItem {
  /**
   * 尺码品类表id
   */
  sizeCategoryId: string;
  /**
   * 品类更新时间(取后端返回的)
   */
  revisedTime: string;
  /**
   * 前三级品类编码
   */
  categoryCode: string;
  /**
   * 前三级品类名称
   */
  categoryName: string;
}
export interface ISizeCategorySaveReqSizeNumAddInfoListItem {
  /**
   * 尺码标准名称 (如:天工尺码标准)
   */
  sizeStandard: string;
  /**
   * 尺码标准编号 (如:tiangong_code_standard)
   */
  sizeStandardCode: string;
  /**
   * 尺码名称 (如:XS)
   */
  sampleSize: string;
  /**
   * 号型编码(至少输入一行),OPS字典 plm_specification
   */
  sizeTypeCode: string;
  /**
   * 号型名称(至少输入一行)
   */
  sizeTypeName: string;
}

// ⬇️ 新增请求体 接口：https://yapi.tiangong.site/project/1302/interface/api/25952
/**
 * 请求参数对象
 */
export interface ISizeCategorySaveReq {
  /**
   * 配置的更新时间
   */
  configRevisedTime: string;
  /**
   * 品类信息集合
   */
  categoryAddInfoList: ISizeCategorySaveReqCategoryAddInfoListItem[];
  /**
   * 尺码-号型信息集合
   */
  sizeNumAddInfoList: ISizeCategorySaveReqSizeNumAddInfoListItem[];
}

export interface ISizeCategoryUpdateReq {
  /**
   * 配置的更新时间
   */
  configRevisedTime: string;
  /**
    * 更新的品类信息集合
    */
  categoryUpdateInfoList: ISizeCategorySaveReqCategoryAddInfoListItem[];
  /**
    * 尺码-号型信息集合 (只传有值的)
    */
  sizeNumUpdateInfoList: ISizeCategorySaveReqSizeNumAddInfoListItem[];
}

// ⬇️ 批量详情查询请求体 接口：https://yapi.tiangong.site/project/1302/interface/api/26096
/**
 * 入参
 */
export interface ISizeCategoryDetailListReq {
  /**
   * ID集合
   */
  ids: string[];
}
// ⬆️ 批量详情查询请求体

// ⬇️ 批量详情查询响应体 接口：https://yapi.tiangong.site/project/1302/interface/api/26096
/**
 * 响应数据
 */
export interface ISizeCategoryDetailItem {
  /**
   * 尺码品类表id
   */
  sizeCategoryId: string;
  /**
   * 前三级品类编码
   */
  categoryCode: string;
  /**
   * 前三级品类名称
   */
  categoryName: string;
  /**
   * 创建人名称
   */
  creatorName: string;
  /**
   * 修改人名称
   */
  reviserName: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 更新时间
   */
  revisedTime: string;
  /**
   * 创建时间
   */
  createdTime: string;
}

// ⬇️ 查询所有(无分页)请求体 接口：https://yapi.tiangong.site/project/1302/interface/api/25943
/**
 * 入参
 */
export interface ISizeCategoryListReq {
  /**
   * 前三级品类编码集合 (不传查全部)
   */
  categoryCodeList: string[];
}
// ⬆️ 查询所有(无分页)请求体

// ⬇️ 查询所有(无分页)响应体 接口：https://yapi.tiangong.site/project/1302/interface/api/25943
/**
 * 响应数据
 */
export interface ISizeCategoryItem {
  /**
   * 尺码品类表id
   */
  sizeCategoryId: string;
  /**
   * 前三级品类编码
   */
  categoryCode: string;
  /**
   * 前三级品类名称
   */
  categoryName: string;
  /**
   * 创建人名称
   */
  creatorName: string;
  /**
   * 修改人名称
   */
  reviserName: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 更新时间
   */
  revisedTime: string;
  /**
   * 创建时间
   */
  createdTime: string;
}
