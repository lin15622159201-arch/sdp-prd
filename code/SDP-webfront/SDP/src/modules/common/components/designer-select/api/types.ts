/**
 * 查询对象
 */
export interface IDesignerGroupDataListReq {
  id?: string;
  /**
   * 设计师组别编码
   */
  designerGroupCode?: string;
  /**
   * 设计师组别名称
   */
  designerGroupName?: string;
  /**
   * 创建人id
   */
  creatorId?: string;
  /**
   * 更新人id
   */
  reviserId?: string;
  /**
   * 创建时间
   */
  createdTime?: string;
  /**
   * 更新时间
   */
  revisedTime?: string;
  /**
   * 逻辑删除 0 否 1是
   */
  isDeleted?: string;
  pageNum?: string;
  pageSize?: string;
}

export interface IDesignerGroupDataListItem {
  id: string;
  /**
   * 设计师组别编码
   */
  designerGroupCode: string;
  /**
   * 设计师组别名称
   */
  designerGroupName: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 更新人id
   */
  reviserId: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 更新时间
   */
  revisedTime: string;
  /**
   * 逻辑删除 0 否 1是
   */
  isDeleted: string;
}

export type IDesignerGroupDataListRes = IDesignerGroupDataListItem[];

/**
 * 查询对象
 */
export interface IDesignerListReq {
  /**
   * 设计师名称【设计师】
   */
  designerName?: string;
  /**
   * 设计师组别编码
   */
  designerGroupCode?: string;
  pageNum?: string;
  pageSize?: string;
}

export interface IDesignerListItem {
  id: string;
  /**
   * 设计师id【设计师】
   */
  designerId: string;
  /**
   * 设计师编号【设计师】
   */
  designerCode: string;
  /**
   * 设计师名称【设计师】
   */
  designerName: string;
  /**
   * 设计师组别编码
   */
  designerGroupCode: string;
  /**
   * 设计师组别名称
   */
  designerGroupName: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 更新人id
   */
  reviserId: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 更新时间
   */
  revisedTime: string;
  /**
   * 逻辑删除 0 否 1是
   */
  isDeleted: string;
  /**
   * 手機號碼
   */
  mobilePhone: string;
}
export type IDesignerListRes = IDesignerListItem[];
