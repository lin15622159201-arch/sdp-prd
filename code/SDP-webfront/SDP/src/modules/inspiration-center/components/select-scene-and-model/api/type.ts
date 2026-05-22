export interface IFmSceneSaveReq {
  /**
   * 智能开款ID
   */
  taskId: string;
  /**
   * 场景ID（为空新增场景；否则更新场景）
   */
  sceneId: string;
  /**
   * 场景名称（新增场景必填）
   */
  sceneName: string;
}
// ⬆️ 新增或者更新场景库请求体

// ⬇️ 场景图选择列表响应体 接口：https://yapi.tiangong.site/project/19/interface/api/1305
/**
 * 响应数据
 */
export type IPicListRes = {
  /**
   * 场景图ID
   */
  pictureId: string;
  /**
   * 图片路径
   */
  path: string;
  /**
   * 图片描述说明
   */
  caption: string;
  pictureName?: string;
}[];
// ⬆️ 场景图选择列表响应体

// ⬇️ 场景下拉选择列表响应体 接口：https://yapi.tiangong.site/project/19/interface/api/1302
/**
 * 响应数据
 */
export type ISceneListRes = {
  /**
   * 场景ID
   */
  sceneId: string;
  /**
   * 场景名称
   */
  sceneName: string;
  /**
   * 主图
   */
  primaryPicture: string;
}[];
// ⬆️ 场景下拉选择列表响应体

// ⬇️ AI设计任务选择模特素材分页查询（给AI设计任务选中使用）请求体 接口：https://yapi.tiangong.site/project/19/interface/api/3554
/**
 * FmModelMaterialQuery
 */
export interface IModelMaterialPageReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 模特素材ID
   */
  modelId?: number;
  /**
   * 人种字典编码
   */
  racialCode?: string;
  /**
   * 人种字典名称
   */
  racialName?: string;
  /**
   * 状态：10-识别中；30-识别完成；50-识别失败；
   */
  status?: number;
  /**
   * 模特名称
   */
  modelName?: string;
  /**
   * 启禁用：0-禁用，1-启用
   */
  enabled?: number;
  /**
   * OPS标签值编码列表
   */
  labelValueCodeList?: string[];
  /**
   * 创建时间-开始
   */
  createdTimeStart?: string;
  /**
   * 创建时间-结束
   */
  createdTimeEnd?: string;
  /**
   * 创建人ID
   */
  creatorId?: number;
  /**
   * 创建人姓名
   */
  creatorName?: string;
  /**
   * 排序:创建时间-createdTime；默认-default
   */
  sortBy?: string;
  /**
   * 前端忽略该字段
   */
  sortList?: IModelMaterialPageReqSortListItem[];
}
export interface IModelMaterialPageReqSortListItem {
  deleted?: number;
  creatorId?: number;
  createdTime?: string;
  creatorName?: string;
  reviserId?: number;
  reviserName?: string;
  revisedTime?: string;
  /**
   * 场景图ID
   */
  pictureId?: number;
  /**
   * 场景ID
   */
  sceneId?: number;
  /**
   * 来源：0-客户端，1-后端
   */
  source?: number;
  /**
   * 状态：10-识别中；30-识别完成；50-识别失败；
   */
  status?: number;
  /**
   * 推送状态：0-未推送；1-已推送；2-推送失败
   */
  pushStatus?: number;
  /**
   * 启禁用：0-禁用，1-启用
   */
  enabled?: number;
  /**
   * 主图：0-否，1-是
   */
  isPrimary?: number;
  /**
   * 图片路径
   */
  path?: string;
  /**
   * 图片描述说明
   */
  caption?: string;
  /**
   * 重试次数
   */
  retryTimes?: number;
  /**
   * 信息备注
   */
  message?: string;
  /**
   * 排序
   */
  sort?: number;
}
// ⬆️ AI设计任务选择模特素材分页查询（给AI设计任务选中使用）请求体

// ⬇️ AI设计任务选择模特素材分页查询（给AI设计任务选中使用）响应体 接口：https://yapi.tiangong.site/project/19/interface/api/3554
export interface IModelMaterialPageRes {
  pageNum: string;
  total: string;
  list: IModelMaterialPageResListItem[];
}
export interface IModelMaterialPageResListItem {
  /**
   * 模特素材ID
   */
  modelId: string;
  /**
   * 人种字典编码
   */
  racialCode: string;
  /**
   * 人种字典名称
   */
  racialName: string;
  /**
   * 模特名称
   */
  modelName: string;
  /**
   * 模特图URL
   */
  modelUrl: string;
}
// ⬆️ AI设计任务选择模特素材分页查询（给AI设计任务选中使用）响应体

// ⬇️ 新增模特素材请求体 接口：https://yapi.tiangong.site/project/18/interface/api/3566
/**
 * 请求参数对象
 */
export interface IFmModelMaterialSaveReq {
  /**
   * 任务ID
   */
  taskId: string;
  /**
   * 人种字典编码
   */
  racialCode: string;
  /**
   * 人种字典名称
   */
  racialName: string;
  /**
   * 模特素材名称
   */
  modelMaterialName?: string;
  /**
   * 标签列表
   */
  labelList?: IFmModelMaterialSaveReqLabelListItem[];
  /**
   * 排序
   */
  sort?: string;
}
export interface IFmModelMaterialSaveReqLabelListItem {
  labelCode: string;
  labelName: string;
  labelValueCode: string;
  labelValueName: string;
}
// ⬆️ 新增模特素材请求体

// ⬇️ 新增模特素材响应体 接口：https://yapi.tiangong.site/project/18/interface/api/3566
export interface IFmModelMaterialSaveRes {}
// ⬆️ 新增模特素材响应体

// ⬇️ 智能AI设计-场景选择列表请求体 接口：https://yapi.tiangong.site/project/19/interface/api/4470
export interface ISmartDesignListReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 场景名称(模糊查询)
   */
  sceneName?: string;
  /**
   * 场景标签编码列表
   */
  sceneLabelCodeList?: string[];
  /**
   * 风格标签编码列表
   */
  styleLabelCodeList?: string[];
  /**
   * 租户ID
   */
  tenantId?: string;
}
// ⬆️ 智能AI设计-场景选择列表请求体

/**
 * 推荐列表 请求参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/99961
 */
export interface RecommendPageReq {
  backgroundNameList?: string[];
  labelNameList?: string[];
  /** 注释 */
  pageNum?: number;
  /** 注释 */
  pageSize?: number;
  /** 品类编码 */
  categoryCode?: string;
  /** 款式标签编码数组 */
  labelCodeList?: string[];
  /** 模特人种 */
  modelRaceCode?: string;
  /** 模特体型 */
  modelBodyTypeCode?: string;
  /** 素材来源 */
  materialSourceCode?: string;
  /** 背景编码数组 */
  backgroundCodeList?: string[];
  /** 季节编码 */
  seasonCode?: string;
}

/**
 * 推荐列表 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/99961
 */
export interface RecommendPageRes {
  /** 注释 */
  pageNum?: number;
  /** 注释 */
  total?: number;
  /** 注释 */
  list?: RecommendPageResListItem[];
}

/**
 * 注释
 */
export interface RecommendPageResListItem {
  /** 模特素材参考图库ID */
  modelMaterialLibraryId?: number;
  /** 状态，0：禁用，1启用 */
  enable?: number;
  /** 素材库的使用次数 */
  useCount?: number;
  /** 创建人 */
  creatorId?: number;
  /** 创建人名称 */
  creatorName?: string;
  /** 创建时间 */
  createdTime?: string;
  /** 模特库文件列表 */
  modelMaterialLibraryFileList?: RecommendPageResModelMaterialLibraryFileListItem[];
}

/**
 * 注释
 */
export interface RecommendPageResModelMaterialLibraryFileListItem {
  /** 模特素材参考图库文件ID（新增/修改时候可为空） */
  modelMaterialLibraryFileId?: number;
  /** 模特素材参考图库ID（新增/修改时候可为空） */
  modelMaterialLibraryId?: number;
  /** 模特图片URL */
  pictureUrl: string;
  /** 花型识别clip任务id */
  smartIdentifyId?: number;
  /** GPT标签提取任务id */
  gptTaskId?: number;
  /** 换装区域提取mask任务id */
  maskTaskId?: number;
  /** 是否是主图：0-否；1-是 */
  mainPicture?: number;
  /** 素材来源编码 */
  materialSourceCode?: string;
  /** 素材来源名称 */
  materialSourceName?: string;
  /** 款式品类编码 */
  categoryCode?: string;
  /** 款式品类名称 */
  categoryName?: string;
  /** 款式标签列表 */
  labelList?: RecommendPageResLabelListItem[];
  /** 模特人种编码 */
  modelRaceCode?: string;
  /** 模特人种名称 */
  modelRaceName?: string;
  /** 模特体型编码 */
  modelBodyTypeCode?: string;
  /** 模特体型名称 */
  modelBodyTypeName?: string;
  /** 背景数组 */
  backgroundList?: RecommendPageResValuesItem2[];
  /** 季节数组 */
  seasonList?: RecommendPageResValuesItem2[];
  /** 任务识别款式品类编码 */
  identifyCategoryCode?: string;
  /** 任务识别款式品类名称 */
  identifyCategoryName?: string;
  /** 任务识别款式信息 */
  identifyLabelList?: RecommendPageResLabelListItem[];
  /** 任务识别模特人种编码 */
  identifyModelRaceCode?: string;
  /** 任务识别模特人种名称 */
  identifyModelRaceName?: string;
  /** 任务识别模特体型编码 */
  identifyModelBodyTypeCode?: string;
  /** 任务识别模特体型名称 */
  identifyModelBodyTypeName?: string;
  /** 任务识别背景数组 */
  identifyBackgroundList?: RecommendPageResValuesItem2[];
  /** 任务识别季节数组 */
  identifySeasonList?: RecommendPageResValuesItem2[];
  /** 任务识别动作 */
  identifyAction?: string;
  /** 是否选中 */
  selected?: boolean;
  materialId?: string;
  maskPictureUrl?: string;
}

/**
 * 注释
 */
export interface RecommendPageResLabelListItem {
  /** 中文标签 */
  cn?: RecommendPageResCn;
  /** 英文标签 */
  en?: RecommendPageResCn;
  /** coloro的编码，非颜色标签不存在此字段；多个颜色用逗号分隔 */
  coloroCodes?: string;
}

/**
 * 注释
 */
export interface RecommendPageResCn {
  /** 标签名 */
  name?: string;
  /** 标签编号 */
  code?: string;
  /** 标签值列表 */
  values?: RecommendPageResValuesItem2[];
}

/**
 * 注释
 */
export interface RecommendPageResValuesItem2 {
  /** 标签名 */
  name?: string;
  /** 标签编号 */
  code?: string;
  /** 标签值列表 */
  values?: RecommendPageResValuesItem[];
}

/**
 * 注释
 */
export interface RecommendPageResValuesItem {
}

/**
 * 虚拟换装模特Mark创建 请求参数
 * @see https://yapi.textile-story.com/project/1363/interface/api/99865
 */
export interface TryOnMarkCreateReq {
  /** 输入图片 */
  inputImg: string;
}

/**
 * 虚拟换装模特Mark创建 响应体
 * @see https://yapi.textile-story.com/project/1363/interface/api/99865
 */
export interface TryOnMarkCreateRes {
}

/**
 * 详情 请求参数
 * @see https://yapi.textile-story.com/project/1363/interface/api/99871
 */
export interface WebPictureMarkReq {
}

/**
 * 详情 响应体
 * @see https://yapi.textile-story.com/project/1363/interface/api/99871
 */
export interface WebPictureMarkRes {
  resImgs?: string;
  /** 任务ID */
  taskId?: number;
  /** 任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败； */
  taskStatus?: number;
  /** 任务进度0-100 */
  taskProgress?: number;
  /** 排队位置 */
  rankPosition?: number;
  /** 消息备注 */
  message?: string;
  /** 处理失败模型 */
  failTaskMode?: string;
  /** AI开始处理时间 */
  aiStartTime?: string;
  /** AI结束处理时间 */
  aiEndTime?: string;
  /** 创建时间 */
  createdTime?: string;
  /** 推送时间 */
  pushTime?: string;
  /** Mark类型 */
  markType?: number;
  /** 输入图片 */
  inputImg?: string;
  /** 生成Mark图列表 */
  resImgList?: string[];
}

/**
 * 素材保存 请求参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/100015
 */
export interface UserUploadMaterialSaveReq {
  /** 注释 */
  pictureList?: UserUploadMaterialSaveReqPictureListItem[];
}

/**
 * 图片数组
 */
export interface UserUploadMaterialSaveReqPictureListItem {
  /** 素材图片URL */
  pictureUrl: string;
  /** mask图URL */
  maskPictureUrl?: string;
}

/**
 * 素材保存 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/100015
 */
export interface UserUploadMaterialSaveRes {
}

/**
 * 素材分页列表 请求参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/100021
 */
export interface UserUploadMaterialPageReq {
  /** 注释 */
  pageNum?: number;
  /** 注释 */
  pageSize?: number;
}

/**
 * 素材分页列表 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/100021
 */
export interface UserUploadMaterialPageRes {
  /** 注释 */
  pageNum?: number;
  /** 注释 */
  total?: number;
  /** 注释 */
  list?: UserUploadMaterialPageResListItem[];
  data?: any;
}

/**
 * 注释
 */
export interface UserUploadMaterialPageResListItem {
  /** 素材信息id */
  materialId?: number;
  /** 素材图片URL */
  pictureUrl?: string;
  /** mask图URL */
  maskPictureUrl?: string;
  /** 用户ID */
  creatorId?: number;
}

/**
 * 素材批量删除 请求参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/100087
 */
export interface UserUploadMaterialBatchDeleteReq {
  /** 注释 */
  materialIds?: number[];
}

/**
 * 素材批量删除 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/100087
 */
export interface UserUploadMaterialBatchDeleteRes {
}

/**
 * 素材更新 请求参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/100018
 */
export interface UserUploadMaterialUpdateReq {
  /** 用户上传模特素材ID */
  materialId?: string;
  /** 原图URL */
  pictureUrl?: string;
  /** mask图URL */
  maskPictureUrl?: string;
}

/**
 * 素材更新 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/100018
 */
export interface UserUploadMaterialUpdateRes {
}
