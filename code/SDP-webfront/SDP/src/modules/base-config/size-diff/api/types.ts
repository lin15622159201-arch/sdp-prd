
export type ISizeDiffEditDiffItem = {
  /** 尺码 */
  size: string;
  /** 部档差值 */
  parts: {
    /** 部位 id */
    partId: string;
    /** 部位名称 */
    partName: string;
    /** 部档差值 */
    diff: number;
  }[];
};
export type ISizeDiffPageReq = {
  pageNum?: number;
  pageSize?: number;
  /** 尺码 */
  sizeCode?: string;
  /** 尺码名称 */
  sizeName?: string;
  /** 是否启用【1启用；0禁用】 */
  enable?: number;
  /** 创建开始时间 */
  createdStartTime?: string;
  /** 创建结束时间 */
  createdEndTime?: string;
  /** 创建人 id */
  creatorId?: number;
  /** 创建人姓名 */
  creatorName?: string;
};

export type ISizeDiffPageRes = {
  pageNum: number;
  total: number;
  list: ISizeDiffPageResItem[];
};

export type ISizeDiffPageResItem = {
  /** 创建人 ID */
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
  /** 主键id */
  sizeDiffId: number;
  /** 尺码 */
  sizeCode: string;
  /** 尺码名称 */
  sizeName: string;
  /** 部位 */
  part: string;
  /** 尺码 */
  size: string;
  /** 是否启用【1启用；0禁用】 */
  enable: number;
  /** 档差值 */
  diffs: ISizeDiffEditDiffItem[];
};

export type ISizeDiffCreateReq = {
  /** 尺码 */
  sizeCode: string;
  /** 尺码名称 */
  sizeName: string;
  /** 选中部位 */
  part: string;
  /** 选中尺码 */
  size: string;
  /** 档差值 */
  diffs: ISizeDiffEditDiffItem[];
};

export type ISizeDiffEditReq = Omit<ISizeDiffCreateReq, 'sizeCode' | 'sizeName'> & {
  /** 档差 ID */
  sizeDiffId: number;
};

export type ITemuPartListItem = {
  /** 名称 */
  name: string;
  /** ID */
  id: string;
  /** 必填的 1:必填 */
  required: number;
};

export type ITemuPartListRes = ITemuPartListItem[];
