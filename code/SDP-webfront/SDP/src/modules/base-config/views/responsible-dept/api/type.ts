// 查询列表（分页）
export interface IResponsibleDepartmentPageReq {
  pageNum?: number;
  pageSize?: number;
}

export interface IResponsibleDepartmentPageListItem {
  /**
   * 责任部门id
   */
  departmentId: string;
  /**
   * 责任部门编码
   */
  departmentCode: string;
  /**
   * 责任部门名称
   */
  departmentName: string;
  /**
   * 责任人id
   */
  responsibleId: string;
  /**
   * 责任人姓名
   */
  responsibleName: string;
  /**
   * 状态: 0-停用 、1-启用
   */
  isEnabled: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 创建人名称
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
   * 修改人名称
   */
  reviserName: string;
  /**
   * 修改时间
   */
  revisedTime: string;
}

export interface IResponsibleDepartmentPageRes {
  page: string;
  total: string;
  list: IResponsibleDepartmentPageListItem[];
}

// 详情
export interface IV1ResponsibleDepartmentRes {
  /**
   * 责任部门id
   */
  departmentId: string;
  /**
   * 责任部门编码
   */
  departmentCode: string;
  /**
   * 责任部门名称
   */
  departmentName: string;
  /**
   * 责任人id
   */
  responsibleId: string;
  /**
   * 责任人姓名
   */
  responsibleName: string;
  /**
   * 状态: 0-停用 、1-启用
   */
  isEnabled: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 创建人名称
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
   * 修改人名称
   */
  reviserName: string;
  /**
   * 修改时间
   */
  revisedTime: string;
}

/**
 * 新建
 */
export interface IResponsibleDepartmentSaveReq {
  /**
   * 责任部门id
   */
  departmentId?: string;
  /**
   * 责任部门编码
   */
  departmentCode?: string;
  /**
   * 责任部门名称
   */
  departmentName: string;
  /**
   * 责任人id
   */
  responsibleId: string;
  /**
   * 责任人姓名
   */
  responsibleName: string;
  /**
   * 状态: 0-停用 、1-启用
   */
  isEnabled?: string;
}

/**
 * 修改
 */
export interface IResponsibleDepartmentUpdateReq {
  /**
   * 责任部门id
   */
  departmentId?: string;
  /**
   * 责任部门编码
   */
  departmentCode?: string;
  /**
   * 责任部门名称
   */
  departmentName: string;
  /**
   * 责任人id
   */
  responsibleId: string;
  /**
   * 责任人姓名
   */
  responsibleName: string;
  /**
   * 状态: 0-停用 、1-启用
   */
  isEnabled?: string;
}

/**
 * 启停用状态
 */
export interface IResponsibleDepartmentStatusReq {
  /**
   * 技术级别id
   */
  departmentIds: number[];
  /**
   * 状态: 0-停用 、1-启用
   */
  isEnabled: string;
}
