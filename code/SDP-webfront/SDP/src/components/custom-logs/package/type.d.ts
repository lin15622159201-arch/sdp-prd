export interface IRequestConfig {
  listKey?: string;
  timeKey?: string;
  userKey?: string;
  userIdKey?: string;
  contentKey?: string;
  operateList?: {
    value: string;
    label: string;
  }[];

  customizeFormatContent?: (item) => string;
}

export interface IListItem {
  time: string | number;
  user: string;
  userId: string;
  content: string;
  remark?: string;
}

export interface IUsersItem {
  user: string;
  userId: string;
}
