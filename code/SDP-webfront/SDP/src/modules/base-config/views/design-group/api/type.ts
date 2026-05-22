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
 * 设计组别对象
 */
export interface IDesignerGroupSaveReq {
  id?: string;
  /**
   * 设计师组别名称
   */
  designerGroupName: string;

}
export type IDesignerGroupSaveRes = null;

export type IDesignerGroupDeleteRes = boolean;

/**
 * 设计组别对象
 */
export interface IDesignerGroupUpdateReq {
  id: string;
  /**
   * 设计师组别名称
   */
  designerGroupName: string;

}
export interface IDesignerGroupUpdateRes {
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

// 设计师
export interface IDesignerPageListItem {
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
/**
 * 分页对象
 */
export interface IDesignerPageReq {
  /**
   * 设计师名称【设计师】
   */
  designerName?: string;
  /**
   * 设计师组别编码
   */
  designerGroupCode: string;
  pageNum?: number;
  pageSize?: number;
}
export interface IDesignerPageRes {
  page: string;
  total: string;
  list: IDesignerPageListItem[];
}

/**
 * 设计师对象
 */
export interface IDesignerSaveReq {
  /**
   * 设计师id【设计师】
   */
  designerId: string;
  /**
   * 设计师编号【设计师】
   */
  designerCode: string;
  /**
   * 手机号码
   */
  mobilePhone: string;
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

}
export type IDesignerSaveRes = null;

export type IDesignerDeleteRes = boolean;

/**
 * 设计师对象
 */
export interface IDesignerTransferReq {
  /**
   * 主键
   */
  id: string;
  /**
   * 设计师组别编码
   */
  designerGroupCode: string;
  /**
   * 设计师组别名称
   */
  designerGroupName: string;

}
export type IDesignerTransferRes = null;

export interface UserItem {
  accountType?: string; // 账号类型
  bbCode?: string; // 员工编码
  email?: string; // 邮箱
  enabled?: 'YES' | 'NO'; // 是否启用
  mobilePhone?: string; // 手机好吗
  userId: string; // 用户id
  userName: string; // 用户名称
}
