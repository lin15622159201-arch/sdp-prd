/**
 * 查询任务列表 请求参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/102373
 */
export interface ImageRepairPageReq {
  /** 注释 */
  pageNum?: number;
  /** 注释 */
  pageSize?: number;
  /** 创建开始时间 */
  createdStartTime?: string;
  /** 创建结束时间 */
  createdEndTime?: string;
  /** 创建人id */
  creatorId?: number;
  /** 创建人姓名 */
  creatorName?: string;
  /** 任务状态
0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败； */
  taskStatus?: number | string;
  /** 任务编号 */
  taskCode?: string;
  /** 任务来源 */
  taskSource?: string;
  /** 灵感来源 */
  source?: string;
  /** 任务类型：1-肢体修复；2-脸部修复；3-超分 */
  fixType?: number;
}

/**
 * 查询任务列表 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/102373
 */
export interface ImageRepairPageRes {
  /** 注释 */
  pageNum?: number;
  /** 注释 */
  total?: number;
  /** 注释 */
  list?: ImageRepairPageResListItem[];
}

/**
 * 注释
 */
export interface ImageRepairPageResListItem {
  /** 任务id */
  taskId?: string;
  /** 任务编号 */
  taskCode?: string;
  /** 任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败； */
  taskStatus?: number | string;
  /** 创建人id */
  creatorId?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 创建时间 */
  createdTime?: string;
  /** 原图 */
  refImgUrl?: string;
  /** 脸部修复(1:开启, 0:关闭) */
  faceFix?: number;
  /** 肢体修复(1:开启, 0:关闭) */
  bodyFix?: number;
  /** 图片超分(1:开启, 0:关闭) */
  imageSuperResolution?: number;
  /** 任务来源 */
  taskSource?: string;
  /** 灵感来源 */
  source?: string;
  /** 生成时间 */
  generateTime?: string;
  /** 排队时长(秒) */
  queueDuration?: number;
  /** 生成时长(秒) */
  generateDuration?: number;
  /** 生成图片结果列表 */
  generateList?: ImageRepairPageResGenerateListItem[];
  resultImg?: any;
  generateImages?: any;
}

/**
 * 注释
 */
export interface ImageRepairPageResGenerateListItem {
  /** 图片ID */
  pictureId?: number;
  /** 图片修复子任务ID */
  imageRepairSubTaskId?: number;
  /** 生成图 */
  pictureUrl?: string;
  /** 序号 */
  serialNum?: number;
  /** 分组ID */
  groupId?: number;
  /** 信息备注 */
  message?: string;
}

/**
 * 创建任务 请求参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/102370
 */
export interface ImageRepairCreateReq {
  /** 脸部修复(1:开启, 0:关闭) */
  faceFix?: number;
  /** 肢体修复(1:开启, 0:关闭) */
  bodyFix?: number;
  /** 图片超分(1:开启, 0:关闭) */
  imageSuperResolution?: number;
  /** 高清倍数(0:x2, 1:x4) */
  highDefinition?: number;
  /** 注释 */
  imageList?: ImageRepairCreateReqImageListItem[];
  /** 模型编码（字典配置编码） */
  modeCode?: string;
  /** 模型名称（字典配置名称） */
  modeName?: string;
  /** 品类编号 */
  categoryCode?: string;
  /** 品类名称 */
  categoryName?: string;
  /** 任务类型来源，来自字典 */
  taskSource?: string;
  /** 灵感来源 */
  source?: string;
  /** 来源业务id */
  sourceBusinessId?: number;
  /** 来源业务编号 */
  sourceBusinessCode?: string;
  url: string;
  combination?: number;
  checked?: boolean;
  imageUrl?: string;
}

/**
 * 注释
 */
export interface ImageRepairCreateReqImageListItem {
}

/**
 * 创建任务 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/102370
 */
export interface ImageRepairCreateRes {
}
/**
 * 任务详情 请求参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/102376
 */
export interface WebImageRepairReq {
}

/**
 * 任务详情 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/102376
 */
export interface WebImageRepairRes {
  /** 主任务ID */
  taskId?: string;
  /** 脸部修复(1:开启, 0:关闭) */
  faceFix?: number;
  /** 肢体修复(1:开启, 0:关闭) */
  bodyFix?: number;
  /** 图片超分(1:开启, 0:关闭) */
  imageSuperResolution?: number;
  /** 高清倍数(0:x2, 1:x4) */
  highDefinition?: number;
  /** 任务类型来源，来自字典 */
  taskSource?: string;
  /** 灵感来源 */
  source?: string;
  /** 来源业务id */
  sourceBusinessId?: number;
  /** 来源业务编号 */
  sourceBusinessCode?: string;
  /** 生成结果图片列表 */
  images?: WebImageRepairResImagesItem[];
  /** 子任务素材信息列表 */
  materials?: WebImageRepairResMaterialsItem[];
  generateImages?: any;
  taskStatus?: number;
  generateTime?: string;
  creatorName?: string;
  taskCode?: string;
}

/**
 * 子任务素材信息列表
 */
export interface WebImageRepairResMaterialsItem {
  /** 素材ID */
  materialId?: number;
  /** 图片修复任务ID */
  imageRepairTaskId?: number;
  /** 序号 */
  serialNum?: number;
  /** 原图URL */
  refImgUrl?: string;
}

/**
 * 生成结果图片列表
 */
export interface WebImageRepairResImagesItem {
  /** 图片ID */
  pictureId?: number;
  /** 图片修复任务ID */
  imageRepairTaskId?: number;
  /** 肢体修复生成图 */
  bodyRepairUrl?: string;
  /** 脸部修复生成图 */
  faceRepairUrl?: string;
  /** 超分生成图 */
  imageSuperResolutionRepairUrl?: string;
  /** 序号 */
  serialNum?: number;
  /** 分组ID */
  groupId?: number;
  /** 信息备注 */
  message?: string;
  selectBodyRepairUrl?: string;
  selectFaceRepairUrl?: string;
  selectImageSuperResolutionRepairUrl?: string;
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
  /** 灵感编码 */
  inspirationCode?: string;
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
