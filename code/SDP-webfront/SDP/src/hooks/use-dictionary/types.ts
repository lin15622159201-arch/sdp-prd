export interface IDictionaryItem {
  value: string;
  label: string;
  disabled: boolean;
  level?: number;
  dictName?: string;
  valueCode?: string;
  children?: IDictionaryItem[];
  attributes?: {
    code: string;
    id: string;
    name: string;
    remark?: string;
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

export interface IQueue {
  fetching: boolean;
  cbs: Array<(val: IDictionaryItem[]) => void>;
}
