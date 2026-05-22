// ⬇️ 分页查询请求体 接口：https://yapi.tiangong.site/project/26/interface/api/2291
export interface IUserQueryFindPageReq {
  pageNum?: number;
  pageSize?: number;
  sort?: IUserQueryFindPageReqSortItem[];
  filters?: IUserQueryFindPageReqFilters;
}
export interface IUserQueryFindPageReqSortItem {
  field?: string;
  order?: 'asc' | 'desc' | 'ASC' | 'DESC';
}
export interface IUserQueryFindPageReqFilters {
  /**
   * 工号
   */
  code?: string;
  /**
   * 姓名
   */
  name?: string;
}
// ⬆️ 分页查询请求体

// ⬇️ 分页查询响应体 接口：https://yapi.tiangong.site/project/26/interface/api/2291
export interface IUserQueryFindPageRes {
  pageNum: string;
  total: string;
  list: IUserQueryFindPageResListItem[];
}
export interface IUserQueryFindPageResListItem {
  /**
   * 用户ID
   */
  id: string;
  /**
   * 工号
   */
  code: string;
  /**
   * 姓名
   */
  name: string;
}
// ⬆️ 分页查询响应体
