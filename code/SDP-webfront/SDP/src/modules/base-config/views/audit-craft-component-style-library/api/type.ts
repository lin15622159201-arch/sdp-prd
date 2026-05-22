// ⬇️ 分页查询审版工艺款式（模板）请求体 接口：https://yapi.tiangong.site/project/43/interface/api/5242
/**
 * 分页对象
 */
export interface IAuditCraftTemplateQueryByPageReq {
  /**
   * 当前查询的页码
   */
  pageNum?: number;
  /**
   * 当前查询单页的数据量
   */
  pageSize?: number;
  /**
   * 模板名称
   */
  templateName?: string;
  /**
   * 版房品类
   */
  roomCategory?: string;
  /**
   * 状态（1-启用，0-停用）
   */
  state?: string;
}
// ⬆️ 分页查询审版工艺款式（模板）请求体

// ⬇️ 分页查询审版工艺款式（模板）响应体 接口：https://yapi.tiangong.site/project/43/interface/api/5242
/**
 * 响应数据
 */
export interface IAuditCraftTemplateQueryByPageRes {
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
  list: IAuditCraftTemplateQueryByPageResListItem[];
}
export interface IAuditCraftTemplateQueryByPageResListItem {
  /**
   * 模板id
   */
  templateId: string;
  /**
   * 模板名称
   */
  templateName: string;
  /**
   * 版房品类
   */
  roomCategorys: IRoomCategoryItem[];
  /**
   * 最新模板配置明细ID
   */
  latestDetailId: string;
  /**
   * 状态: 0-停用 、1-启用
   */
  state: string;
  /**
   * 状态描述
   */
  stateDesc: string;
}
// ⬆️ 分页查询审版工艺款式（模板）响应体

// ⬇️ 修改审版工艺款式（模板）状态请求体 接口：https://yapi.tiangong.site/project/43/interface/api/5250
export interface IAuditCraftTemplateChangeStateReq {
  /**
   * 模板ID
   */
  templateId: string;
  /**
   * 状态（1-启用，0-停用）
   */
  state: string;
}
// ⬆️ 修改审版工艺款式（模板）状态请求体

// ⬇️ 保存审版工艺款式（模板）请求体 接口：https://yapi.tiangong.site/project/43/interface/api/5238

export interface IRoomCategoryItem {
  roomCategory: string;
  /**
 * 版房品类名称
 */
  roomCategoryName: string;
}
export interface IAuditCraftTemplateSaveTemplateReq {
  /**
   * 款式（模板）id
   */
  templateId?: string;
  /**
   * 款式（模板）名称
   */
  templateName: string;
  /**
   * 版房品类
   */
  roomCategorys: IRoomCategoryItem[];

  /**
   * 模板明细JSON对象
   */
  components?: IAuditCraftTemplateSaveTemplateReqComponentsItem[];
}
export interface IAuditCraftTemplateSaveTemplateReqComponentsItem {
  /**
   * 审版工艺部件ID
   */
  componentId?: string;
  /**
   * 工序部件名称
   */
  componentName?: string;
  /**
   * 版型结构分解
   */
  structurals: IAuditCraftTemplateSaveTemplateReqStructuralsItem[];
}
export interface IAuditCraftTemplateSaveTemplateReqStructuralsItem {
  /**
   * 版型结构分解描述
   */
  desc: string;
  /**
   * 车缝工艺要求
   */
  sewingRequires?: IAuditCraftTemplateSaveTemplateReqSewingRequiresItem[];
}
export interface IAuditCraftTemplateSaveTemplateReqSewingRequiresItem {
  /**
   * 车缝工艺要求描述
   */
  desc: string;
}
// ⬆️ 保存审版工艺款式（模板）请求体

// ⬇️ 根据ID查询审版工艺款式（模板）明细响应体 接口：https://yapi.tiangong.site/project/43/interface/api/5246
/**
 * 响应数据
 */
export interface IAuditCraftTemplateGetDetailByIdRes {
  isDeleted: string;
  creatorId: string;
  createdTime: string;
  reviserId: string;
  revisedTime: string;
  /**
   * 模板ID
   */
  templateId: string;
  /**
   * 模板名称
   */
  templateName: string;
  /**
   * 版房品类
   */
  roomCategorys: IRoomCategoryItem[];
  /**
   * 最新模板配置明细ID
   */
  latestDetailId: string;
  /**
   * 状态: 0-停用 、1-启用
   */
  state: string;
  /**
   * 模板明细JSON对象
   */
  detailJson: IAuditCraftTemplateGetDetailByIdResDetailJsonItem[];
}
export interface IAuditCraftTemplateGetDetailByIdResDetailJsonItem {
  /**
   * 审版工艺部件ID
   */
  componentId: string;
  /**
   * 工序部件名称
   */
  componentName: string;
  /**
   * 版型结构分解
   */
  structurals: IAuditCraftTemplateGetDetailByIdResStructuralsItem[];
}
export interface IAuditCraftTemplateGetDetailByIdResStructuralsItem {
  /**
   * 版型结构分解描述
   */
  desc: string;
  /**
   * 车缝工艺要求
   */
  sewingRequires: IAuditCraftTemplateGetDetailByIdResSewingRequiresItem[];
}
export interface IAuditCraftTemplateGetDetailByIdResSewingRequiresItem {
  /**
   * 车缝工艺要求描述
   */
  desc: string;
}
// ⬆️ 根据ID查询审版工艺款式（模板）明细响应体
