export interface IRowProps {
  id: string;
  [prop: string]: any;
}

interface Callback {
  (): void;
}

export interface IOptions {
  id?: string;
  designerGroupCode?: string;
  designerGroupName?: string;
  selectedIds?: Array<string | number>;
  api: any;
  callback?: Callback;
  requestParams?: any;
}

export interface IPaperGroupUser {
  id?: string;
  groupCode?: string;
  groupUserId?: string;
  selectedIds?: Array<string | number>;
  api: any;
  callback?: Callback;
  requestParams?: any;
}
