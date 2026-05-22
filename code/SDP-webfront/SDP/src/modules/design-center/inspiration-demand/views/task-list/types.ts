import { IGetTaskListReq, IGetTaskListRes } from '../../api/types';

export type IListItem = IGetTaskListRes['list'][0] & {
  remark: string;
};
export type IParams = IGetTaskListReq & {
  categoryArr?: string[];
  suggestedStyleCodeArr?: Array<string[]>;
};
