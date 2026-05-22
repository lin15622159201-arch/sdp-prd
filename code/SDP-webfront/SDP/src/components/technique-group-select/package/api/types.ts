/**
 * **返回类型**
 * 查询列表（分页）
 * @see https://yapi.ibaibu.com/project/1302/interface/api/95898
 *
 * @请求方法: GET
 * @请求地址: /clothing-material/web/v1/technique-group/page
 * @更新时间: 2021-09-24 15:15:51
 */
export interface getWebV1TechniqueGroupPageApiResListResItem {
  groupId?: number;
  /**
   * 技术组别编码
   */
  techniqueGroupCode?: string;
  /**
   * 技术组别名称
   */
  techniqueGroupName?: string;
  /**
   * 区域id
   */
  regionId?: number;
  /**
   * 区域名称
   */
  regionName?: string;
  /**
   * 销售群体
   */
  saleGroupList?: {
    /**
     * 销售群体ops-code
     */
    groupCode?: string;
    /**
     * 销售群体名称
     */
    groupName?: string;
  }[];
  /**
   * 状态: 0-停用 、1-启用
   */
  isEnabled?: number;
  /**
   * 创建人id
   */
  creatorId?: string;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 创建时间
   */
  createdTime?: string;
  /**
   * 修改人id
   */
  reviserId?: number;
  /**
   * 修改人名称
   */
  reviserName?: string;
  /**
   * 修改时间
   */
  revisedTime?: string;
}

export interface GetWebV1TechniqueGroupPageApiRes {
  page?: number;
  total?: number;
  list?: getWebV1TechniqueGroupPageApiResListResItem[];
}

/**
 * **请求类型**
 * 查询列表（分页）
 * @see https://yapi.ibaibu.com/project/1302/interface/api/95898
 *
 * @请求方法: GET
 * @请求地址: /clothing-material/web/v1/technique-group/page
 * @更新时间: 2021-09-24 15:15:51
 */
export interface GetWebV1TechniqueGroupPageApiReq {
  /**
   * 技术组别编码
   */
  techniqueGroupCode?: string;
  /**
   * 技术组别名称 （模糊查询）
   */
  techniqueGroupName?: string;
  /**
   * 状态: 0-停用 、1-启用
   */
  isEnabled?: string;
  pageNum?: string;
  pageSize?: string;
}
