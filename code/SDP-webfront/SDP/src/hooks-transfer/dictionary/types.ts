import type { Ref } from 'vue';
// import { OpsDict } from '@/hooks/dictionary/class/ops';
// import { ScmDict } from '@/hooks/dictionary/class/scm';
// import { BasDict } from '@/hooks/dictionary/class/bas';
// import { Dictionary } from '@/hooks/dictionary/core/base';
import type { IbatchDictValuesRes as Dict, IdictValuesItem } from '@/api/dict/types';
import type { ICategoryListReq, ICategoryListItem } from '@/api/scm/types';
import type * as basicTypes from '@/api/basis/types';

export type CustomObj = Record<string, IdictValuesItem[]>;
export interface PageDictsOpt {
  name: string;
  codes: string[];
}

export type ModulesOpts = PageDictsOpt[];

export type System = 'OPS' | 'SCM' | 'BAS';
// export type Instance = OpsDict | ScmDict | BasDict;
// export type Dictionary_ = Dictionary;
export type Instance = Record<string, any>;
export type Dictionary_ = Record<string, any>;

/* scm */
export interface CasacaderOpt_ { code: ICategoryListReq; }
export type scmDictRes = ICategoryListItem[];

/* ops */
export type opsDictRes = Dict[];

export type Fn<R = any, T = any> = (params?: R) => T;
export interface Task {
  params: string[];
  type: System;
}

export interface RequestSendInfo {
  params: string[];
  response: opsDictRes | scmDictRes;
}
export interface DictIns {
  // acceptResponse(info: RequestSendInfo): void;
  // getDefautDicts(): void;
}

export type dictItem = IdictValuesItem;
export type mapValue = dictItem | ICategoryListItem;
export interface storeOption {
  length?: number;
}

export interface Options {
  cutting: string;
}

export interface treeNode {
  children?: treeNode[];
  [k: string]: any;
}

export interface conversionOption {
  // eslint-disable-next-line no-use-before-define
  batchDictListMap: Ref<BatchDictListMap>;
  code: string;
  comma?: boolean;
  maxLayer?: number;
}

export interface OptOps extends Options {
  batchDictListMap: Ref<CustomObj>; // 字典集合
}

export interface MapByOpsParams {
  labels?: string | string[]; // 中文值
  codes?: string | string[]; // code 值
  dictCode: string; // 字典编码
  isCascader?: boolean; // 选择项存在级联关系
  batchDictListMap?: Ref<CustomObj>; // 字典集合
  cutting?: string;
}

export type IdictValuesItemNode = dictItem & { children?: IdictValuesItemNode[]; };
export type NodeMapOps = Record<string, IdictValuesItemNode>;

export type BatchDictListMap = Record<string, dictItem[]>;
export interface CasacaderOpt {
  code: string;
  comma?: boolean; // 处理逗号拼接
  maxLayer?: number; // 最大层级
}

export type CasacaderOptScm_ = { code: ICategoryListReq; } & CasacaderOpt;

export type NodeMapScm = {
  [k in ICategoryListReq | string]?: scmDictRes;
};

export type ICategoryListReq_ = ICategoryListReq;
export type ICategoryListItem_ = ICategoryListItem;

export interface OptScm extends Options {
  nodeMap?: Ref<NodeMapScm>; // Product服务响应级联数据
}

export interface mapByProductParams {
  labels?: string | string[]; // 中文值
  codes?: string | string[]; // code值
  dictCode: ICategoryListReq; // 字典编码
  isCascader?: boolean; // 选择项存在级联关系
  nodeMap?: Ref<NodeMapScm>; // Product 服务响应级联数据
  cutting?: string;
}

export enum BASIC_DATA_TYPE {
  /* 交期类型 */
  DELIVERY = 'DELIVERY',
  /* 标签信息 */
  TAG = 'TAG',
  /* 部位 */
  PARTS = 'PARTS',
}

export type basicCodes = keyof typeof BASIC_DATA_TYPE;

export type BasicData = Partial<{
  [BASIC_DATA_TYPE.DELIVERY]: basicTypes.IDeliveryListRes;
  [BASIC_DATA_TYPE.TAG]: basicTypes.IClothingMaterialClothingTagRes;
  [BASIC_DATA_TYPE.PARTS]: basicTypes.IClothesPartsSizeListRes;
  [p: string]: any;
}>;

export type CallBack = (BatchDictListMap: Ref<BatchDictListMap>) => void;
