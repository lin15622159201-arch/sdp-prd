import { YES_NO_NUMBER_ENUM } from '@/constant';

export type ISizeTempPageReq = {
  pageNum?: number;
  pageSize?: number;
  /** 是否启用【1启用；0禁用】 */
  enable?: YES_NO_NUMBER_ENUM;
  /** 模板名 */
  templateName?: string;
  /** 品类 ID */
  catId?: number;
  /** 尺码组 ID */
  groupId?: number;
  /** 创建开始时间 */
  createdStartTime?: string;
  /** 创建结束时间 */
  createdEndTime?: string;
  /** 创建人 id */
  creatorId?: number;
  /** 创建人姓名 */
  creatorName?: string;
};

export type ISizeTempSizeResSizeItem = {
  /** 尺码 */
  size: string;
  /** 部位尺码 */
  values: {
    /** 部位 */
    part: number;
    /** 部位名称 */
    partName: string;
    /** 部位值 */
    value: number | undefined;
    /** 部档差值 */
    diff: number;
  }[];
};

export type ISizeTempPageResItem = {
  /** 创建人id */
  creatorId: number;
  /** 创建人名称 */
  creatorName: string;
  /** 创建时间 */
  createdTime: string;
  /** 修改人ID */
  reviserId: number;
  /** 修改人名称 */
  reviserName: string;
  /** 更新时间 */
  revisedTime: string;
  /** 模板 ID */
  templateId: string;
  /** 模板名 */
  templateName: string;
  /** 品类 ID */
  catId: string;
  /** 品类名称 */
  catName: number;
  /** 尺码组 ID */
  groupId: number;
  /** 尺码 */
  sizes: string[];
  /** 部位 */
  parts: string[];
  /** 尺码列表 */
  temps: ISizeTempSizeResSizeItem[];
  /** 状态 */
  enable: YES_NO_NUMBER_ENUM;
};

export type ISizeTempPageRes = {
  pageNum: number;
  total: number;
  list: ISizeTempPageResItem[];
};

/**
 * 尺码模板-批量启用/禁用请求参数
 */
export type ISizeTempBatchEnableReq = { templateId: string; enable: YES_NO_NUMBER_ENUM; }[];

/**
 * 创建模板请求参数
 */
export type ISizeTempCreateReq = {
  /** 模板名 */
  templateName: string;
  /** 品类 ID */
  catId: string;
  catName?: string;
  /** 尺码组编码 */
  groupCode: string;
  /** 尺码组名称 */
  groupName: string;
  /** 尺码 */
  sizes: string[];
  /** 部位 */
  parts?: string[];
  /** 尺码列表 */
  sizeReqs: ISizeTempSizeResSizeItem[];
};

/**
 * 编辑模板请求参数
 */
export type ISizeTempEditReq = ISizeTempCreateReq & {
  /** 模板 ID */
  templateId: string;
};
