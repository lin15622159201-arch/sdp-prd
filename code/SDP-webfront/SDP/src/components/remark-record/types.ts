export type TriggerEvent = 'hover' | 'click' | 'focus' | 'contextmenu';

export interface Params {
  'bizId': string;
  'bizType': string;
  'remark': string;
  [k: string]: any;
}
export type CreateApi = (params: Params) => Promise<any>;

export type HandleParams = (row: Record<string, any>, remark: string) => Params;
export type HandleCreate = (val: string) => void | boolean | Promise<void | boolean>;

export interface RemarkRecordContent {
  modelValue: Record<string, string>[] | string;
  descKey: string;
  triggerEvent: string;
  width: string | number;
  nameKey: string;
  timeKey: string;
  timeFormatter: (timeValue: string | number) => string;
}

export interface RemarkRecordItem {
  time: string;
  name: string;
  desc: string;
  [k: string]: any;
}

export interface RemarkPopoverOpenOpts {
  width?: number | string;
  list?: RemarkRecordItem[];
  triggerEvent?: string;
  virtualRef?: Record<string, any>;
}

export interface RemarkRecordDialogOpenOpts {
  row?: Record<string, any>;
  maxlength?: number | string;
  createApi?: CreateApi;
  handleParams?: HandleParams;
  handleCreate?: HandleCreate;
  inputDisabled?: boolean;
}

export interface RemarkRecordDialogOpenCbMethods {
  success?: (args?: any) => void;
  create?: (val: string) => void;
}
