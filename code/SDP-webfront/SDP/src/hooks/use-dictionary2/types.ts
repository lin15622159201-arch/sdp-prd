export interface IDictionaryItem {
  value: string;
  label: string;
  disabled: boolean;
  level?: number;
  valueCode?: string;
  children?: IDictionaryItem[];
  // attributes?: Record<string, unknown>[];
  attributes?: {
    code: string;
    id: string;
    name: string;
    remark: string;
  }[];
}

export interface IFlatDictionaryItem {
  value: string;
  label: string;
  disabled: boolean;
  pIds: string[];
  cIds: string[];
  lastLevelChildIds: string[];
}

export interface IMapData {
  [key: string]: IDictionaryItem[];
}

export interface IDictMapData {
  [key: string]: {
    id: string;
    code: string;
    name: string;
    data: IDictionaryItem[];
  };
}

export interface ITaskMapItem {
  task: Promise<unknown> | null;
  cb: Function | null;
}

export interface IConfig {
  /** 接口loading */
  apiLoading?: boolean;
  /** 过滤不可选 */
  filterDisabled?: boolean;
}
