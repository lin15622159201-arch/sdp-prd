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
  generatedPicUrls: IFloralPatternGeneratedPic[];
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
};
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
  creatorId?: string;
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
  sourceBusinessId?: string;
  /** 款式来源类型 */
  taskSource?: string;
  /** 来源业务编号 */
  sourceBusinessCode?: string;
  /** 生成时间 */
  generateTime?: string;
  /** 结果图片列表 */
  images?: WebVirtualTryonResImagesItem[];
  /** 素材 */
  materials?: WebVirtualTryonResMaterialsItem[];
  generateImages?: any;
  whRatio?: string;
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
  imageId?: number;
  /** 图片URL */
  imageUrl?: string;
  /** 序号 */
  serialNum?: number;
  /** 脸部修复图 */
  faceRepairUrl?: string;
  groupId?: string;
  materialId?: string;
}
export type IFloralPatternGeneratedPic = {
  picUrls: string[];
  taskId: string;
  serialNum: number;
  message: string | null;
  pictureId: string;
  pictureUrl: string;
  pictureName: string;
};
