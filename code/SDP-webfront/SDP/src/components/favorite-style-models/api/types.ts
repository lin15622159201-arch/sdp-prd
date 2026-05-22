/**
 * 风格模型-用户收藏列表 请求参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/101059
 */
export interface StyleModelUserCollectPageReq {
  /** 注释 */
  pageNum?: number;
  /** 注释 */
  pageSize?: number;
  /** 是否查询收藏信息，
0-不要，admin后台不需要传
1-要，创建风格衍生任务需要传 */
  selectCollect?: number;
  /** 模型名称 */
  styleModelName?: string;
  /** 创建人ID */
  creatorId?: number;
  /** 创建人名称 */
  creatorName?: string;
  /** 状态，0：禁用，1启用 */
  enable?: number;
  /** 创建时间-开始 */
  createdTimeStart?: string;
  /** 创建时间-结束 */
  createdTimeEnd?: string;
  /** 服装类型名称 */
  clothTypeName?: string;
}

/**
 * 风格模型-用户收藏列表 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/101059
 */
export interface StyleModelUserCollectPageRes {
  /** 注释 */
  pageNum?: number;
  /** 注释 */
  total?: number;
  /** 注释 */
  list?: StyleModelUserCollectPageResListItem[];
}

/**
 * 注释
 */
export interface StyleModelUserCollectPageResListItem {
  /** 模型ID */
  styleModelId?: number;
  /** 是否收藏，0-否，1-收藏 */
  collect?: number;
  /** 模型名称 */
  styleModelName?: string;
  /** 模型说明 */
  styleModelDescribe?: string;
  /** 模型编号 */
  loraName?: string;
  /** 底模 */
  baseModel?: string;
  /** 服装类型编码 */
  clothTypeCode?: string;
  /** 服装类型名称 */
  clothTypeName?: string;
  /** 最优分辨率宽度 */
  sizeWidth?: string;
  /** 最优分辨率高度 */
  sizeHeight?: string;
  /** 模型权重 */
  loraWeight?: string;
  /** guidance */
  guidance?: number;
  /** t5Len */
  t5Len?: number;
  /** prePrompt */
  prePrompt?: string;
  /** 示例图片 */
  sampleImage?: string;
  /** 状态，0：禁用，1启用 */
  enable?: number;
  /** 创建人 */
  creatorId?: number;
  /** 创建人名称 */
  creatorName?: string;
  /** 创建时间 */
  createdTime?: string;
}

/**
 * 风格模型-分页查询 请求参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/101056
 */
export interface StyleModelPageReq {
  /** 注释 */
  pageNum?: number;
  /** 注释 */
  pageSize?: number;
  /** 是否查询收藏信息，
0-不要，admin后台不需要传
1-要，创建风格衍生任务需要传 */
  selectCollect?: number;
  /** 模型名称 */
  styleModelName?: string;
  /** 创建人ID */
  creatorId?: number;
  /** 创建人名称 */
  creatorName?: string;
  /** 状态，0：禁用，1启用 */
  enable?: number;
  /** 创建时间-开始 */
  createdTimeStart?: string;
  /** 创建时间-结束 */
  createdTimeEnd?: string;
  /** 服装类型名称 */
  clothTypeName?: string;
}
/**
 * 风格模型-分页查询 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/101056
 */
export interface StyleModelPageRes {
  /** 注释 */
  pageNum?: number;
  /** 注释 */
  total?: number;
  /** 注释 */
  list?: StyleModelPageResListItem[];
}

/**
 * 注释
 */
export interface StyleModelPageResListItem {
  /** 模型ID */
  styleModelId?: number;
  /** 是否收藏，0-否，1-收藏 */
  collect?: number;
  /** 模型名称 */
  styleModelName?: string;
  /** 模型说明 */
  styleModelDescribe?: string;
  /** 模型编号 */
  loraName?: string;
  /** 底模 */
  baseModel?: string;
  /** 服装类型编码 */
  clothTypeCode?: string;
  /** 服装类型名称 */
  clothTypeName?: string;
  /** 最优分辨率宽度 */
  sizeWidth?: string;
  /** 最优分辨率高度 */
  sizeHeight?: string;
  /** 模型权重 */
  loraWeight?: string;
  /** guidance */
  guidance?: number;
  /** t5Len */
  t5Len?: number;
  /** prePrompt */
  prePrompt?: string;
  /** 示例图片 */
  sampleImage?: string;
  /** 状态，0：禁用，1启用 */
  enable?: number;
  /** 创建人 */
  creatorId?: number;
  /** 创建人名称 */
  creatorName?: string;
  /** 创建时间 */
  createdTime?: string;
}

/**
 * 用户收藏风格模型-收藏或者取消 请求参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/101053
 */
export interface UserCollectStyleModelCollectOrCancelReq {
  /** 模型ID */
  styleModelId: string;
  /** 操作类型，1-收藏，2-取消收藏 */
  operatorType: number;
}

/**
 * 用户收藏风格模型-收藏或者取消 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/101053
 */
export interface UserCollectStyleModelCollectOrCancelRes {
}
