// import { IGetTaskListReq, IGetTaskListRes } from '../api/types';

export type IListItem = any['list'][0] & {
  remark: string;
  creatorId?: string;
};
export type IParams = any & {
  categoryArr?: string[];
  suggestedStyleCodeArr?: Array<string[]>;
  taskStatus?: string;
};
