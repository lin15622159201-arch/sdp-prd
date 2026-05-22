import { DevelopStylePageReq, DevelopStylePageResListItem } from '../../api/types';

export type IListItem = DevelopStylePageResListItem & {
  remark: string;
};
export type IParams = DevelopStylePageReq & {
  categoryArr?: string[];
};
