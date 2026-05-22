// ⬇️ 分页查询审版工艺部件请求体 接口：https://yapi.tiangong.site/project/43/interface/api/5266
/**
 * 分页对象
 */
export interface IAuditCraftComponentQueryByPageReq {
  /**
   * 当前查询的页码
   */
  pageNum?: number;
  /**
   * 当前查询单页的数据量
   */
  pageSize?: number;
  /**
   * 部件名称
   */
  componentName?: string;
  /**
   * 状态（1-启用，0-停用）
   */
  state?: string;
}
// ⬆️ 分页查询审版工艺部件请求体

// ⬇️ 分页查询审版工艺部件响应体 接口：https://yapi.tiangong.site/project/43/interface/api/5266
/**
 * 响应数据
 */
export interface IAuditCraftComponentQueryByPageRes {
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
  list: IAuditCraftComponentQueryByPageResListItem[];
}
export interface IAuditCraftComponentQueryByPageResListItem {
  /**
   * 部件id
   */
  componentId: string;
  /**
   * 工序部件名称
   */
  componentName: string;
  /**
   * 状态: 0-停用 、1-启用
   */
  state: string;
  /**
   * 状态: 0-停用 、1-启用
   */
  stateDesc: string;
}
// ⬆️ 分页查询审版工艺部件响应体

// ⬇️ 修改部件状态请求体 接口：https://yapi.tiangong.site/project/43/interface/api/5274
export interface IAuditCraftComponentChangeStateReq {
  /**
   * 部件ID
   */
  componentId: string;
  /**
   * 状态（1-启用，0-停用）
   */
  state: string;
}
// ⬆️ 修改部件状态请求体

// ⬇️ 保存审版工艺部件请求体 接口：https://yapi.tiangong.site/project/43/interface/api/5262
export interface IAuditCraftComponentSaveComponentReq {
  /**
   * 部件id
   */
  componentId?: string;
  /**
   * 工序部件名称
   */
  componentName: string;
  /**
   * 版型结构分解
   */
  structurals?: IAuditCraftComponentSaveComponentReqStructuralsItem[];
}
export interface IAuditCraftComponentSaveComponentReqStructuralsItem {
  /**
   * 版型结构分解描述
   */
  desc: string;
  /**
   * 车缝工艺要求
   */
  sewingRequires?: IAuditCraftComponentSaveComponentReqSewingRequiresItem[];
}
export interface IAuditCraftComponentSaveComponentReqSewingRequiresItem {
  /**
   * 车缝工艺要求描述
   */
  desc: string;
}
// ⬆️ 保存审版工艺部件请求体

// ⬇️ 查询部件明细响应体 接口：https://yapi.tiangong.site/project/43/interface/api/5270
/**
 * 响应数据
 */
export interface IAuditCraftComponentGetByIdRes {
  /**
   * 部件id
   */
  componentId: string;
  /**
   * 工序部件名称
   */
  componentName: string;
  /**
   * 状态: 0-停用 、1-启用
   */
  state: string;
  /**
   * 状态: 0-停用 、1-启用
   */
  stateDesc: string;
  /**
   * 版型结构分解
   */
  structurals: IAuditCraftComponentGetByIdResStructuralsItem[];
}
export interface IAuditCraftComponentGetByIdResStructuralsItem {
  /**
   * 版型结构分解描述
   */
  desc: string;
  /**
   * 车缝工艺要求
   */
  sewingRequires: IAuditCraftComponentGetByIdResSewingRequiresItem[];
}
export interface IAuditCraftComponentGetByIdResSewingRequiresItem {
  /**
   * 车缝工艺要求描述
   */
  desc: string;
}
// ⬆️ 查询部件明细响应体
