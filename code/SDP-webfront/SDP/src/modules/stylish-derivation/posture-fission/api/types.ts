import { ALLOCATE_TYPE_ENUM, COMMODITY_TYPE_ENUM, DESIGN_DEMAND_STATUS_ENUM } from '../constant';

/**
 * 列表查询 请求参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/101251
 */
export interface PostureFissionTaskPageReq {
  /** 注释 */
  pageNum?: number;
  /** 注释 */
  pageSize?: number;
  /** 任务ID（风格化衍生任务ID） */
  taskId?: number;
  /** 任务编号 */
  taskCodeList?: string[];
  /** 任务状态 */
  taskStatus?: string;
  /** 创建时间-开始 */
  createdTimeStart?: string;
  /** 创建时间-结束 */
  createdTimeEnd?: string;
  /** 创建人 */
  creatorName?: string;
  /** 生成时间-开始 */
  generateTimeStart?: string;
  /** 生成时间-结束 */
  generateTimeEnd?: string;
  /** 风格模型 */
  modeName?: string;
}
/**
 * 列表查询 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/101251
 */
export interface PostureFissionTaskPageRes {
  /** 注释 */
  pageNum?: number;
  /** 注释 */
  total?: number;
  /** 注释 */
  list?: PostureFissionTaskPageResListItem[];
}

/**
 * 注释
 */
export interface PostureFissionTaskPageResListItem {
  /** 任务ID */
  taskId?: number;
  /** 灵感ID */
  inspirationId?: number;
  /** 任务编号 */
  taskCode?: string;
  /** 任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败； */
  taskState?: number;
  /** 生成图 */
  generateImages?: string[];
  /** 来源类型
0-用户上传，1-灵感源 */
  sourceType?: string;
  /** 来源业务id */
  sourceBusinessId?: number;
  /** 来源业务编号 */
  sourceBusinessCode?: string;
  /** 品类编码 */
  categoryCode?: string;
  /** 品类名称 */
  category?: string;
  /** 模型编码（字典配置编码） */
  modeCode?: string;
  /** 模型名称（字典配置名称） */
  modeName?: string;
  /** 原图url */
  refImgUrl?: string;
  /** 是否裁头(1:开启, 0:关闭) */
  cuttingHead?: number;
  /** 是否需要背面(1:开启, 0:关闭) */
  needBackSide?: number;
  /** 背面图数量 */
  backSideCount?: number;
  /** 生成数量 */
  genCount?: number;
  /** 排队时长(秒) */
  queueDuration?: number;
  /** 生成时长(秒) */
  generateDuration?: number;
  /** 信息备注 */
  message?: string;
  /** 创建人 id */
  creatorId?: number;
  /** 创建人 名称 */
  creatorName?: string;
  /** 创建时间 */
  createdTime?: string;
  /** 生成时间 */
  generateTime?: string;
  /** 任务状态 */
  taskStatus?: number[];
}

/**
 * 创建 请求参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/101431
 */
export interface PostureFissionTaskCreateReq {
  /** 灵感ID，灵感源提交过来的时候必传 */
  inspirationId?: number;
  /** 来源业务id */
  sourceBusinessId: number | string;
  /** 来源业务编号 */
  sourceBusinessCode: string;
  /** 来源款式编码 */
  spuCode?: string;
  /** 来源SKC编码 */
  skcCode?: string;
  /** 来源SKC ID */
  skcId?: string;
  /** 图片列表 */
  pictureUrls: string[];
  /** 是否裁头(1:开启, 0:关闭) */
  cuttingHead?: number;
  /** 是否需要背面(1:开启, 0:关闭) */
  needBackSide?: number;
  /** 背面图数量 */
  backSideCount?: number;
  /** 生成数量 */
  genCount?: number;
  /** 任务来源 */
  taskSource?: string;
  /** 开款任务ID */
  developStyleTaskId: number;
}

/**
 * 创建 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/101431
 */
export interface PostureFissionTaskCreateRes {
}

/**
 * 姿势列表-中止按钮(批量) 请求参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/101425
 */
export interface AbortBatchReq {
  /** 注释 */
  taskCodes?: string[];
}
/**
 * 姿势列表-中止按钮(批量) 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/101425
 */
export interface AbortBatchRes {
}
/**
 * 根据ID查询姿势列表详情 请求参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/101311
 */
export interface ByIdReq {
}

/**
 * 生成图
 */
export interface ByIdResGenerateImagesItem {
  /** 图片ID */
  pictureId?: number;
  /** 图片url */
  pictureUrl?: string;
  /** 图片名称 */
  pictureName?: string;
  /** 任务ID */
  taskId?: number;
  /** 修复图 */
  repairImgUrl?: string;
  /** 序号 */
  serialNum?: number;
  faceRepairUrl?: string;
  select?: boolean;
}
/**
 * 姿势列表--删除按钮(批量) 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/101317
 */
export interface DeletedBatchRes {
}
/**
 * 根据ID查询姿势列表详情 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/101311
 */
export interface ByIdRes {
  /** 任务ID */
  taskId?: string;
  /** 灵感ID */
  inspirationId?: string;
  /** 任务编号 */
  taskCode?: string;
  /** 任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败； */
  taskState?: number;
  /** 来源类型
0-用户上传，1-灵感源 */
  sourceType?: number;
  /** 来源业务id */
  sourceBusinessId?: number;
  /** 来源业务编号 */
  sourceBusinessCode?: string;
  /** 品类编码 */
  categoryCode?: string;
  /** 品类名称 */
  category?: string;
  /** 模型编码（字典配置编码） */
  modeCode?: string;
  /** 模型名称（字典配置名称） */
  modeName?: string;
  /** 原图url */
  refImgUrl?: string;
  /** 是否裁头(1:开启, 0:关闭) */
  cuttingHead?: number;
  /** 是否需要背面(1:开启, 0:关闭) */
  needBackSide?: number;
  /** 背面图数量 */
  backSideCount?: number;
  /** 生成数量 */
  genCount?: number;
  /** 排队时长(秒) */
  queueDuration?: number;
  /** 生成时长(秒) */
  generateDuration?: number;
  /** 信息备注 */
  message?: string;
  /** 创建人 id */
  creatorId?: string;
  /** 创建人 名称 */
  creatorName?: string;
  /** 创建时间 */
  createdTime?: string;
  /** 生成时间 */
  generateTime?: string;
  /** 任务状态 */
  taskStatus?: string;
  /** 生成图 */
  generateImages?: ByIdResGenerateImagesItem[];
  clothTypeName?: string;
  layoutByRef?: number;
  taskSource?: string;
  source?: string;
  completeBody?: number;
  imgSize?: string;
}


/**
 * 根据业务id和来源查询 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/101269
 */
export type UserEvaluateImageGroupGetByBusIdRes = UserEvaluateImageGroupGetByBusIdResItem[];

/**
 *  单项响应数据
 */
export interface UserEvaluateImageGroupGetByBusIdResItem {
  /** 评价ID */
  evaluateImageId?: number;
  /** 图组id */
  pictureGroupId?: number;
  /** 是否是好评：0-否；1-是 */
  good?: number;
  /** 评论来源
AI设计传: smart_develop_style
风格衍生传: style_redesign
姿势裂变: posture_fission */
  origin?: string;
}

/**
 * 用户对生成图片组评价保存 请求参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/100036
 */
export interface UserEvaluateImageGroupSaveOrUpdateReq {
  /** 评价ID，修改时候必须 */
  evaluateImageId?: string;
  /** 图组id，新增时候必须 */
  pictureGroupId?: string;
  /** 是否是好评：0-否；1-是
取消好评/差评时候传null */
  good?: number | null;
  /** 评论来源
AI设计传: smart_develop_style
风格衍生传: style_redesign
姿势裂变: posture_fission */
  origin?: string;
}
/**
 * 用户对生成图片组评价保存 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/100036
 */
export interface UserEvaluateImageGroupSaveOrUpdateRes {
}

// 下载类型
export enum DOWNLOAD_TYPE_ENUM {
  DESIGN_MATERIAL = 'DESIGN_MATERIAL',
  DRESS_UP = 'DRESS_UP',
  TRY_ON = 'TRY_ON',
}

// 下载动作：1-下载；2-下载4K图
export enum DOWNLOAD_ACTION_ENUM {
  DOWNLOAD = 1,
  DOWNLOAD_4K = 2,
  COPY = 3,
}

export interface IImageDownloadLogReq {
  /**
   * 下载类型
   */
  downloadType: string;
  /**
   * 下载动作：1-下载；2-下载4K图
   */
  downloadAction: number;
  /**
   * 任务ID
   */
  taskId: string;
  /**
   * 任务编号
   */
  taskCode?: string;
  /**
   * 图片列表
   */
  imageList: IImageDownloadLogReqImageListItem[];
}

export interface IImageDownloadLogReqImageListItem {
  /**
   * 图片ID
   */
  imageId: string;
  /**
   * 图片地址
   */
  imageUrl: string;
  /**
   * 图片名称
   */
  imageName?: string;
}
// ⬆️ 新增下载记录请求体

// ⬇️ 新增下载记录响应体 接口：https://yapi.tiangong.site/project/18/interface/api/3400
export type IImageDownloadLogRes = number;
/**
 * 根据业务id和来源查询 请求参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/101269
 */
export interface UserEvaluateImageGroupGetByBusIdReq {
  /** 图组业务ID */
  pictureGroupId?: string;
  /** 评论来源
AI设计传: smart_develop_style
风格衍生传: style_redesign
姿势裂变: posture_fission */
  origin?: string;
}

export interface StyleGenPageResListItem {
  /** 任务id */
  taskId: string;
  /** 任务编号 */
  taskCode?: string;
  /** 任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败； */
  taskStatus?: string;
  /** 创建人id */
  creatorId?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 创建时间 */
  createdTime?: string;
  /** 生图类型 */
  genType?: string;
  /** 模型名称 */
  styleModelName?: string;
  /** 参考图 */
  refImgUrl?: string;
  /** 提示词 */
  prompt?: string;
  /** 脸部修复(1:开启, 0:关闭) */
  faceFix?: number;
  /** 生成数量 */
  genCount?: number;
  /** 来源 */
  source?: string;
  /** 生成时间 */
  generateTime?: string;
  /** 衍生图片列表 */
  images?: StyleGenPageResImagesItem[];
  /** 关联任务 */
  related?: number;
  sourceType?: number;
}
export interface StyleGenPageResImagesItem {
  /** 图片ID */
  imageId?: number;
  /** 图片URL */
  imageUrl?: string;
  /** 序号 */
  serialNum?: number;
}

/**
 * 查询任务列表 请求参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/101131
 */
export interface StyleGenPageReq {
  /** 注释 */
  pageNum?: number;
  /** 注释 */
  pageSize?: number;
  /** 创建开始时间 */
  createdStartTime?: string;
  /** 创建结束时间 */
  createdEndTime?: string;
  /** 创建人id */
  creatorId?: string;
  /** 创建人姓名 */
  creatorName?: string;
  /** 任务状态
0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败； */
  taskStatus?: string | number;
  /** 任务编号 */
  taskCode?: string;
  /** lora的名字 */
  loraName?: string;
  /** 模型名称 */
  styleModelName?: string;
  /** 关联任务 */
  related?: number;
  /** 创建开始时间 */
  generateStartTime?: string;
  /** 创建结束时间 */
  generateEndTime?: string;
}
export interface WebStyleGenRes {
  /** 任务id */
  taskId?: string;
  /** 任务编号 */
  taskCode?: string;
  /** 任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败； */
  taskStatus?: number;
  /** 创建人id */
  creatorId?: number;
  /** 创建人名称 */
  creatorName?: string;
  /** 创建时间 */
  createdTime?: string;
  /** 生图类型 */
  genType?: string;
  /** 参考图 */
  refImgUrl?: string;
  /** 提示词 */
  prompt?: string;
  /** 脸部修复(1:开启, 0:关闭) */
  faceFix?: number;
  /** 生成数量 */
  genCount?: number;
  /** 背景图描述 */
  bgImgDesc?: string;
  /** 背景图url */
  bgImgUrl?: string;
  /** 模特图描述 */
  modelImgDesc?: string;
  /** 模特图url */
  modelImgUrl?: string;
  /** 生图的尺寸 */
  imgSize?: string;
  /** 来源 */
  source?: string;
  /** 来源业务id */
  sourceBusinessId?: number;
  /** 来源业务编号 */
  sourceBusinessCode?: string;
  /** 风格模型ID */
  styleModelId?: string;
  /** 模型名称 */
  styleModelName?: string;
  /** lora的名字 */
  loraName?: string;
  /** 底模 */
  baseModel?: string;
  /** 生成时间 */
  generateTime?: string;
  /** 衍生图片列表 */
  images?: any[];
  sourceBusiness?: string;
  inspirationId?: string;
  /** 灵感编码 */
  inspirationCode?: string;
}
export interface StyleModelDetailRes {
  /** 模型ID */
  styleModelId?: number;
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
 * 任务详情 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/102064
 */
export interface WebVirtualTryonRes {
  /** 任务id */
  taskId?: string;
  /** 任务编号 */
  taskCode?: string;
  /** 任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败； */
  taskStatus?: number;
  /** 创建人id */
  creatorId?: number;
  /** 创建人名称 */
  creatorName?: string;
  /** 创建时间 */
  createdTime?: string;
  /** 参考图 */
  refImgUrl?: string;
  /** 模型编码（字典配置编码） */
  modeCode?: string;
  /** 模型名称（字典配置名称） */
  modeName?: string;
  /** 品类编号 */
  categoryCode?: string;
  /** 品类名称 */
  categoryName?: string;
  /** 模特素材ID（手动上传模特素材图为空） */
  modelMaterialId?: number;
  /** 模特素材名称（手动上传模特素材图为空） */
  modelMaterialName?: string;
  /** 模特素材URL（可以手动上传模特素材图） */
  modelMaterialUrl?: string;
  /** 脸部修复(1:开启, 0:关闭) */
  faceFix?: number;
  /** 素材衍生(1:开启, 0:关闭) */
  materialGenerate?: number;
  /** 生成数量 */
  genCount?: number;
  /** 任务来源 */
  busSource?: string;
  /** 来源 */
  sourceBusiness?: string;
  /** 来源业务id */
  sourceBusinessId?: number;
  /** 来源业务编号 */
  sourceBusinessCode?: string;
  /** 生成时间 */
  generateTime?: string;
  /** 结果图片列表 */
  images?: WebVirtualTryonResImagesItem[];
  /** 素材 */
  materials?: WebVirtualTryonResMaterialsItem[];
  generateImages?: any;
  inspirationId?: string;
  inspirationCode?: string;
}

/**
 * 素材
 */
export interface WebVirtualTryonResMaterialsItem {
  /** 素材库ID */
  materialLibraryId?: number;
  /** 素材类型 */
  materialType?: string;
  /** 模特图片URL */
  pictureUrl?: string;
  /** mask图URL */
  maskPictureUrl?: string;
  /** 素材图URL */
  materialUrl?: string;
  /** 素材id */
  materialId?: string;
}

/**
 * 结果图片列表
 */
export interface WebVirtualTryonResImagesItem {
  /** 图片ID */
  imageId?: string;
  /** 图片URL */
  imageUrl?: string;
  /** 序号 */
  serialNum?: number;
  /** 脸部修复图 */
  faceRepairUrl?: string;
  groupId?: string;
  materialId?: string;
}
/**
 * 花型上身任务详情
 */
export type IFloralPatternApplyTaskDetailRes = {
  /** 任务ID */
  taskId: string;
  /** 任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败； */
  taskStatus: number;
  /** 任务编码 */
  taskCode: string;
  /** 参考图url */
  garmImgUrls: string[];
  /** 花型图url */
  patternImgUrl: string;
  /** 满服印花型图id */
  floralPatternId: string;
  /** 模型名称 */
  modelName: string;
  /** 花型上身区域，top garment，bottom garment，one-piece garment */
  garmRegion: string;
  /** 花型拼接次数 */
  patternRepeatCount: number;
  /** 生成图url列表，json列表 */
  generatedPicUrls: string[];
  /** 生成时间 */
  generatedTime: string;
  /** mask 地址列表 */
  maskImgUrls: string[];
  /** 生成图像数，默认每个服装图生成2张 */
  count: number;
  /** 随机数种子 */
  seed: string;
  /** 品类名称 */
  categoryName: string;
  /** 品类编号 */
  categoryCode: string;
  /** 来源（1：用户上传，2：灵感源） */
  sourceType: number;
  /** 来源业务编号 */
  sourceBusinessCode: string;
  /** 来源业务id */
  sourceBusinessId: string;
  /** 创建时间 */
  createdTime: string;
  /** 创建人 */
  creatorName: string;
  inspirationId?: string;
  /** 灵感编码 */
  inspirationCode?: string;
};
