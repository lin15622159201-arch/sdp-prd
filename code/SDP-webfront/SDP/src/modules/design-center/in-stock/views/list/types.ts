import { ISpotStylePageItem, ISpotStylePageReq, ISpotStyleSkc } from '../../api/spot-style';

export type IParams = ISpotStylePageReq & {
  /** 查询范围 */
  searchRange?: 'all' | 'group' | 'me' | undefined;
};

export type ISpotStyleSkcNew = ISpotStyleSkc & {
  /** 尺码组编码 */
  skcSizeStandardCode?: string;
  taskId?: string;
};
export type IListItem = Omit<ISpotStylePageItem, 'skcs'> & ISpotStyleSkcNew & {
  /**
   * 是否是子项，用于表格子项
   */
  isChild?: boolean;
  id?: string;
  skcs?: ISpotStyleSkcNew[];
};
