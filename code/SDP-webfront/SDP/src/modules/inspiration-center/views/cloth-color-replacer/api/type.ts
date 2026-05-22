import { TASK_STATUS_EN_ENUM, TASK_STATUS_ENUM } from '@/constant/task';
import { REPLACE_REGION_ENUM } from '../constant';

export type IReplaceColorTaskSaveBatchReq = { /** 换色内容 */
  replaceColorTaskSaveReqList: IReplaceColorTaskSaveReq[];
};
export type IReplaceColorTaskSaveReq = {
  /** 服装换色图url列表 逗号分隔 */
  replaceColorImgUrls: string[];
  /** 换色区域 */
  replaceColorRegion?: REPLACE_REGION_ENUM;
  /** 服装目标纯色，色块图链接 */
  targetColorUrl: string;
  /** mask 地址 */
  maskImgUrl: string;
  /** 品类名称 */
  categoryName: string;
  /** 品类编号 */
  categoryCode: string;
  /** 任务类型来源，来自字典 */
  taskSource: string;
  /** 来源编号 */
  sourceBusinessCode?: string;
  /** 来源id */
  sourceBusinessId?: string;
};

export type IReplaceColorTaskPageReq = {
  pageNum?: number;
  pageSize?: number;
  /** 任务类型来源，来自字典 */
  taskSource?: string;
  /** 任务编号 */
  taskCodeList?: string[];
  /** 创建人 */
  creatorId?: string;
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
  /** 任务状态 */
  taskStatus?: TASK_STATUS_EN_ENUM;
};

export type IReplaceColorTaskPageRes = {
  pageNum: number;
  total: number;
  list: IReplaceColorTaskPageItem[];
};

export type IReplaceColorTaskPageItem = {
  /** 任务ID */
  taskId: string;
  /** 服装换色任务编码 */
  taskCode: string;
  /** 任务状态 */
  taskStatus: TASK_STATUS_ENUM;
  /** 服装换色图url列表 */
  replaceColorImgUrls: string[];
  /** 换色区域 */
  replaceColorRegion: REPLACE_REGION_ENUM;
  /** 服装目标纯色，色块图链接 */
  targetColorUrl: string;
  /** 服装换色当前任务首图url地址 */
  replaceColorFirstImgUrl: string;
  /** 服装换色生成图片信息列表 */
  replaceColorGeneratedPicUrls: string[];
  /** 服装换色生成时间 */
  replaceColorGeneratedTime: string;
  /** tryOn生成图url列表 */
  tryOnGeneratedPicUrls: string[];
  /** tryOn生成时间 */
  tryOnGeneratedTime: string;
  /** mask 地址 */
  maskImgUrl: string;
  /** 品类名称 */
  categoryName: string;
  /** 品类编号 */
  categoryCode: string;
  /** 任务类型来源，来自字典 */
  taskSource: string;
  /** 来源编号 */
  sourceBusinessCode: string;
  /** 来源id */
  sourceBusinessId: number;
  creatorId: string;
  creatorName: string;
  /**
   * 创建时间
   */
  createdTime?: string;
  /**
   * 更新时间
   */
  revisedTime?: string;
};

export type IReplaceColorTaskDetailRes = IReplaceColorTaskPageItem;
/**
 * 批量查询 请求参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/105697
 */
export interface InspirationListByIdsReq {
}
/**
 * 批量查询 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/105697
 */
export type InspirationListByIdsRes = InspirationListByIdsResItem[];

/**
 *  单项响应数据
 */
export interface InspirationListByIdsResItem {
  /** 灵感id */
  inspirationId?: number;
  /** 企划来源 */
  planningSourceCode?: string;
  /** 波次 */
  waveBatchCode?: string;
  /** 波次 */
  waveBatchName?: string;
  /** 灵感图 */
  inspirationImage?: string;
  /** 外部品类 */
  externalCategory?: string;
  /** 灵感图来源 */
  inspirationImageSource?: string;
  /** 灵感图品牌 v3.10.1 */
  inspirationBrand?: string;
  /** 来源国家站点 */
  sourceCountrySiteName?: string;
  /** 划线价(US) */
  retailPrice?: string;
  /** 销售价(US) */
  salePrice?: string;
  /** 建议供给方式 */
  suggestedSupplyModeCode?: string;
  /** 灵感创建时间 */
  inspirationCreatedTime?: string;
  /** 数据来源 */
  dataSource?: string;
  /** 识别品类 */
  identifiedCategory?: string;
  /** 识别结果: 1通过, 0无效 */
  identifiedStatus?: number;
  /** 识别标签 */
  identifiedLabel?: string;
  /** 款式类型：0-净色、1-花型 */
  styleType?: string;
  /** 灵感提交次数 */
  submitCount?: number;
  /** 状态 */
  submitStatus?: number;
  /** 创建人名称 */
  creatorName?: string;
  /** 创建时间 */
  createdTime?: string;
  /** 商品链接URL */
  productLinkUrl?: string;
  /** 任务信息 */
  taskInfo?: InspirationListByIdsResTaskInfoItem[];
  /** 是否使用加速推理
0-否；1-是 */
  fastForward?: number;
  /** 款生成数量 */
  styleGenCount?: number;
  /** 模型编码（字典配置编码） */
  modeCode?: string;
  /** 模型名称（字典配置名称） */
  modeName?: string;
}

/**
 * 任务信息
 */
export interface InspirationListByIdsResTaskInfoItem {
  /** 日志id */
  logId?: number;
  /** 业务id */
  businessId?: number;
  /** 业务code */
  businessCode?: string;
  /** 波次 */
  waveBatchName?: string;
  /** 跑图类型 */
  generationType?: string;
  /** 提交人 */
  submitterName?: string;
  /** 提交时间 */
  submitTime?: string;
  /** 任务状态 */
  taskStatus?: number;
  /** 跑图任务编号 */
  aiTaskCode?: string;
  /** 下游任务id */
  downstreamTaskId?: number;
}
