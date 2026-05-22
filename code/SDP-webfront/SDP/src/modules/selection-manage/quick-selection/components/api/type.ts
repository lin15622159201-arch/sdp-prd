import { YES_NO_NUMBER_ENUM } from '@/constant';
import {
  IMAGE_RECOMMEND_FABRIC_STATE,
  LOOP_TASK_STATE,
  RECOMMEND_FABRIC_TASK_STATUS,
  REF_IMG_TYPE,
  STYLE_TYPE,
  TASK_STATE,
  TASK_SOURCE,
  GENERATE_MODE
} from './constant';

export interface ILabelValue {
  /**
   * 标签名(编号)
   */
  labelCode: string;
  /**
   * 标签名(中文)
   */
  labelName: string;
  /**
   * 标签值(多个子级)
   */
  values: ILabelValue[];
}

// ⬇️ design-智能开款-列表查询请求体 接口：https://yapi.tiangong.site/project/18/interface/api/513
export interface ISmartDevelopStylePageReq {
  tryonFix?: string | number;
  pageNum: number;
  pageSize: number;
  /**
   * 任务编号
   */
  taskCode: string;
  /** 任务编号数组 */
  taskCodeList?: string[];
  /**
   * 品类id
   */
  categoryCode: string;
  /**
   * 品类名称
   */
  categoryName: string;
  /**
   * 主题标签
   */
  topicLabelList: ILabelValue[];
  /**
   * 风格标签
   */
  styleLabelList: ILabelValue[];
  /**
   * 款式标签
   */
  labelList: ILabelValue[];
  /**
   * 色系
   */
  colorScheme: string;
  /**
   * 创建人
   */
  creatorName: string;
  /**
   * 任务状态
   */
  taskStatus: TASK_STATE | '';
  /**
   * 生成模式,1:多姿势,0:单姿势
   */
  generateMode: GENERATE_MODE | '';
  /**
   * 创建时间-开始
   */
  createdStartTime: string;
  /**
    * 创建时间-结束
    */
  createdEndTime: string;
  /**
   * 关联任务编号
   */
  relationTaskCode: string;
  /**
   * 履约增强：0-否；1-是
   */
  promiseEnhanced?: YES_NO_NUMBER_ENUM;
  /**
   * 是否可以履约：1：可以，0：不可以
   */
  promiseEnabled?: YES_NO_NUMBER_ENUM;
  /**
   * 面料是否一致：1：一致，0：不一致
   */
  fabricConsistent?: YES_NO_NUMBER_ENUM;
  /**
   *  模型
   */
  modeCode?: string;
  /** 开始生成时间 */
  generateTimeStart?: string;
  /** 结束生成时间 */
  generateTimeEnd?: string;
  /** 模型加速 */
  fastForward?: string | number;
}

// ⬇️ design-智能开款-列表查询响应体 接口：https://yapi.tiangong.site/project/18/interface/api/513
export interface ISmartDevelopStylePageRes {
  /**
   * 当前页码, 主要给 web 端做分页校验
   */
  page: string;
  /**
   * 总数据量
   */
  total: string;
  /**
   * 分页数据
   */
  list: ISmartDevelopStylePageResListItem[];
}
export interface ISmartDevelopStylePageResListItem {
  /** 模特名称 */
  modeName?: string;
  /** 指定素材 */
  tryonFix?: number;
  /**
   * 任务id
   */
  taskId: string;
  /**
   * 任务编号
   */
  taskCode: string;
  /**
   * 参考图
   */
  referencePicture: string;
  /**
   * 生成图（前四张图）
   */
  generateImages: string[];
  /**
   * 品类id
   */
  categoryCode: string;
  /**
   * 品类名称
   */
  categoryName: string;
  /**
   * 主题 季节
   */
  topicSeason: string;
  /**
   * 主题 季节 code
   */
  topicSeasonCode: string;
  /**
   * 主题 风格
   */
  topicStyle: string;
  /**
   * 主题 风格 code
   */
  topicStyleCode: string;
  /**
   * 主题 适用年龄
   */
  topicAge: string;
  /**
   * 主题 适用年龄 code
   */
  topicAgeCode: string;
  /**
   * 主题 区域(现改为渠道)
   */
  topicArea: string;
  /**
   * 主题 区域(现改为渠道) code
   */
  topicAreaCode: string;
  /**
   * 风格 区域
   */
  styleArea: string;
  /**
   * 风格 区域 code
   */
  styleAreaCode: string;
  /**
   * 风格 场景
   */
  styleScene: string;
  /**
   * 风格 场景 code
   */
  styleSceneCode: string;
  /**
   * 风格 设计理念
   */
  styleDesignConcept: string;
  /**
   * 风格 设计理念 code
   */
  styleDesignConceptCode: string;
  /**
   * 风格 艺术风格
   */
  styleArtStyle: string;
  /**
   * 风格 艺术风格 code
   */
  styleArtStyleCode: string;
  /**
   * 款式标签
   */
  labelList: ISmartDevelopStylePageResLabelListItem[];
  /**
   * 色系
   */
  colorScheme: string;
  /**
   * 创建人
   */
  creatorName: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 生成时间
   */
  generateTime: string;
  /**
   * 任务状态
   */
  taskStatus: TASK_STATE;
  /**
   * 生成模式,1:多姿势,0:单姿势
   */
  generateMode: GENERATE_MODE;
  /**
   * 生成数量
   */
  generateNum: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * Aigc任务描述
   */
  taskAigcMessage: string;
  /**
   * 履约增强：0-否；1-是
   */
  promiseEnhanced: YES_NO_NUMBER_ENUM | -1;
  /**
   * 是否可以履约：1：可以，0：不可以
   */
  promiseEnabled: YES_NO_NUMBER_ENUM | -1;
  /**
   * 任务来源：0-FM用户上传；1-灵感源
   */
  taskSource: TASK_SOURCE;
  /**
   * 模型加速：0-未开启 1-已开启
   */
  fastForward: number;
}

export interface ISmartDevelopStylePageResLabelListItem {
  /**
   * 标签名(中文)
   */
  label: string;
  /**
   * 标签值(中文)
   */
  values: string[];
}
// ⬆️ design-智能开款-列表查询响应体

/**
 * 场景信息
 */
export interface ISmartDevelopStyleCreateReqSceneInfo {
  /**
   * 场景ID
   */
  sceneId: string;
  /**
   * 场景名称
   */
  sceneName: string;
  /**
   * 图片ID
   */
  pictureId: string;
  /**
   * 图片路径
   */
  picturePath: string;
}
// ⬆️ 创建智能开款请求体

// ⬇️ design-智能开款-图文生图请求体 接口：https://yapi.tiangong.site/project/18/interface/api/512
export interface ICreateImageTextToImageReq {
  /**
   * 生图数量
   */
  styleGenCount: number;
  /**
   * 图片名称
   */
  referencePictureName?: string;
  /**
   * 智能识别ID
   */
  smartIdentifyId: string;
  /**
   * 参考图
   */
  referencePicture: string;
  /**
   * 品类code
   */
  categoryCode: string;
  /**
   * 品类名称
   */
  categoryName: string;
  /**
   * 生成模式,1:多姿势,0:单姿势
   */
  generateMode: GENERATE_MODE;
  /**
   * 模特
   */
  aiModelCode: string;
  /**
   * 生成数量
   */
  generateNum: number | string;
  sourceType?:
  | 'FASHION'
  | 'FASHION_FLORAL_PRINT_EXTRACTION'
  | 'FASHION_SMART_DEVELOP_STYLE'
  | 'AI_PICTURE_STYLE'
  | 'FASHION_VIRTUAL_TRY_ON'
  | '';
  /**
   * 来源业务编号
   */
  sourceBusinessId: string;
  /**
   * 背面增强 (1:开启, 0:关闭)
   * - 多姿势:默认开启, 入参传"不开启"才改变值
   * - 单姿势:默认关闭
   */
  bgEnhanced: YES_NO_NUMBER_ENUM;
  /**
   * 脸部修复(1:开启, 0:关闭)
   */
  faceFix: YES_NO_NUMBER_ENUM;
  /**
   * 指定比例(1:开启, 0:关闭)
   */
  // specifiedRatio: YES_NO_NUMBER_ENUM;

  sceneInfo?: ISmartDevelopStyleCreateReqSceneInfo;
  /**
   * 履约增强：0-否；1-是
   */
  promiseEnhanced: YES_NO_NUMBER_ENUM;
  aiModelName: string;
  aiModelUrl: string;
  /**
   * 模特素材ID（手动上传模特素材图为空）
   */
  modelMaterialId?: string;
  /**
   * 模特素材名称（手动上传模特素材图为空）
   */
  modelMaterialName?: string;
  /**
   * 模特素材URL（可以手动上传模特素材图）
   */
  modelMaterialUrl?: string;
  /**
   * 模型编码（字典配置编码）
   */
  modeCode?: string;
  /**
   * 模型名称（字典配置名称）
   */
  modeName?: string;
  /**
   * 参考权重
   */
  refWeight: number;
  /**
   * 模型
   */
  fastForward?: number;
  materials?: MaterialsInter[];
}
// ⬆️ design-智能开款-图文生图请求体

// ⬇️ design-智能开款-图文生图响应体 接口：https://yapi.tiangong.site/project/18/interface/api/512
export type ICreateImageTextToImageRes = string;
// ⬆️ design-智能开款-图文生图响应体

// ⬇️ 创建请求体 接口：https://yapi.tiangong.site/project/20/interface/api/542
/**
 * SmartIdentifyMiniReq
 */
export interface ISmartIdentifyCreateReq {
  /**
   * 参考图url
   */
  refImgUrl: string;
}
// ⬆️ 创建请求体

// ⬇️ 创建响应体 接口：https://yapi.tiangong.site/project/20/interface/api/542
export type ISmartIdentifyCreateRes = string;
// ⬆️ 创建响应体

// ⬇️ 详情响应体 接口：https://yapi.tiangong.site/project/20/interface/api/543
export interface IWebSmartIdentifyRes {
  /**
   * 任务ID
   */
  taskId: string;
  /**
   * 任务状态：0-排队中；10-生成中；20-已中止；30-已完成；40-无效；50-失败；60-超时失败；
   */
  taskStatus: LOOP_TASK_STATE;
  /**
   * 任务进度0-100
   */
  taskProgress: string;
  /**
   * 消息备注
   */
  message: string;
  /**
   * 智能识别ID
   */
  smartIdentifyId: string;
  /**
   * 参考图url
   */
  refImgUrl: string;
  /**
   * 参考图类型：0-真人模特图、1-非真人模特图
   */
  refImgType: REF_IMG_TYPE | '';
  /**
   * 款式类型：0-净色、1-花型
   */
  styleType: STYLE_TYPE | '';
  /**
   * 识别品类
   */
  category: string;
  /**
   * 识别品类编号
   */
  categoryCode: string;
  /**
   * 分割标签列表
   */
  clipLabelList: ILabelItem[];
}
export interface ILabelItem {
  cn: IWebSmartIdentifyResCn;
  en: IWebSmartIdentifyResEn;
  /**
   * coloro的编码，非颜色标签不存在此字段；多个颜色用逗号分隔
   */
  coloroCodes: string;
}
/**
 * 中文标签
 */
export interface IWebSmartIdentifyResCn {
  /**
   * 标签名
   */
  name: string;
  /**
   * 标签编号
   */
  code: string;
  /**
   * 标签值列表
   */
  values: IWebSmartIdentifyResCn[];
}
export interface IWebSmartIdentifyResValuesItem {}
/**
 * 英文标签
 */
export interface IWebSmartIdentifyResEn {
  /**
   * 标签名
   */
  name: string;
  /**
   * 标签编号
   */
  code: string;
  /**
   * 标签值列表
   */
  values: IWebSmartIdentifyResValuesItem[];
}
// ⬆️ 详情响应体

// ⬇️ design-智能开款-复制页面（回显数据）响应体 接口：https://yapi.tiangong.site/project/18/interface/api/566
export interface ICopyDetailRes {
  modelEthnicity?: string;
  /**
   * 任务id
   */
  taskId: string;
  /**
   * 智能识别ID
   */
  smartIdentifyId: string;
  /**
   * 参考图
   */
  referencePicture: string;
  /**
   * 品类code
   */
  categoryCode: string;
  /**
   * 品类名称
   */
  categoryName: string;
  /**
   * 生成模式,1:多姿势,0:单姿势
   */
  generateMode: GENERATE_MODE;
  sceneInfo: ISmartDevelopStyleCreateReqSceneInfo;
  /**
   * 模特 编号
   */
  aiModelCode: string;
  /**
   * 模特 名称
   */
  aiModelName: string;
  /**
   * 模特素材ID
   */
  modelMaterialId: string;
  /**
   * 模特素材名称
   */
  modelMaterialName: string;
  /**
   * 模特素材URL
   */
  modelMaterialUrl: string;
  /**
   * 模特图片Url
   */
  aiModelUrl: string;
  /**
   * 生成数量
   */
  generateNum?: number;
  sourceType?:
  | 'FASHION'
  | 'FASHION_FLORAL_PRINT_EXTRACTION'
  | 'FASHION_SMART_DEVELOP_STYLE'
  | 'AI_PICTURE_STYLE'
  | '';
  /**
   * 来源业务编号
   */
  sourceBusinessId: string;
  /**
   * 模型编码（字典配置编码）
   */
  modeCode: string;
  /**
   * 模型名称（字典配置名称）
   */
  modeName: string;
}
// ⬆️ design-智能开款-复制页面（回显数据）响应体

// ⬇️ 标签查询（根据code查询）响应体 接口：https://yapi.textile-story.com/project/447/interface/api/83527
export interface IByValueRes {
  /**
   * 标签ID
   */
  labelId: string;
  /**
   * 一级品类
   */
  categoryFirst: string;
  /**
   * 二级品类
   */
  categorySecond: string;
  /**
   * 三级品类
   */
  categoryThird: string;
  /**
   * 四级品类
   */
  categoryFourth: string;
  /**
   * 一级品类code
   */
  categoryFirstCode: string;
  /**
   * 二级品类code
   */
  categorySecondCode: string;
  /**
   * 三级品类code
   */
  categoryThirdCode: string;
  /**
   * 四级品类code
   */
  categoryFourthCode: string;
  /**
   * 五级品类
   */
  categoryFifth: string;
  /**
   * 标签值
   */
  value: string;
  /**
   * 是否启用：{0-否 ,1-是},默认1
   */
  enable: string;
  /**
   * 宽
   */
  width: string;
  /**
   * 高
   */
  height: string;
  published: string;
  /**
   * 扩展标签:1-风格,2-花型识别,3-多姿势,4-面料识别及推荐,5-花型提取,6-场景,7-模特
   */
  extendLabel: string;
}

// ⬇️ design-智能开款-查询任务详情响应体 接口：https://yapi.tiangong.site/project/18/interface/api/518
export interface ISmartDevelopStyleDetailRes {
  /**
   * 是否指定素材
   */
  tryonFix?: number;
  modelEthnicity?: string;
  /**
   * 任务id
   */
  taskId: string;
  /**
   * AIGC任务id
   */
  aigcTaskId: string;
  /**
   * 任务编号
   */
  taskCode: string;
  /**
   * 品类Code
   */
  categoryCode: string;
  /**
   * 品类名称
   */
  categoryName: string;
  /**
   * 主题标签
   */
  topicLabels: ILabelItem[];
  /**
   * 款式标签
   */
  labels: ILabelItem[];
  /**
   * 花型标签
   */
  flowerPatternLabels: ILabelItem[];
  /**
   * 风格标签
   */
  styleLabels: ILabelItem[];
  /**
   * 推荐面料
   */
  recommendFabricList: ISmartDevelopStyleDetailResRecommendFabricListItem[];
  /**
   * 生成模式,1:多姿势,0:单姿势
   */
  generateMode: GENERATE_MODE;
  /**
   * 模特
   */
  aiModelCode: string;

  aiModelUrl: string;
  aiModelName: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 创建人
   */
  creatorName: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 任务状态
   */
  taskStatus: TASK_STATE;
  /**
   * 参考图
   */
  referencePicture: string;
  /**
   * 生成图
   */
  generateImages: ISmartDevelopStyleDetailResGenerateImagesItem[];
  /**
   * 生成描述词
   */
  prompts: string;
  /**
   * 款式类型：0-净色、1-花型
   */
  styleType: number;
  /**
   *背面增强 (1:开启, 0:关闭)
  - 多姿势:默认开启, 入参传"不开启"才改变值
  - 单姿势:默认关闭
   */
  bgEnhanced: YES_NO_NUMBER_ENUM;
  /**
   * 履约增强：0-否；1-是
   */
  promiseEnhanced: YES_NO_NUMBER_ENUM;
  /**
   * 脸部修复(1:开启, 0:关闭)
   */
  faceFix: YES_NO_NUMBER_ENUM;
  /**
   * 指定比例(1:开启, 0:关闭)
   */
  // specifiedRatio: YES_NO_NUMBER_ENUM;
  sceneInfo?: ISmartDevelopStyleCreateReqSceneInfo;
  fabricRecommendTask: ISmartDevelopStyleDetailResFabricRecommendTask;
  /**
   * 模特素材ID
   */
  modelMaterialId: string;
  /**
   * 模特素材名称
   */
  modelMaterialName: string;
  /**
   * 模特素材URL
   */
  modelMaterialUrl: string;
  modeName: string;
  modeCode: string;
  refWeight: number;
  fastForward?: number;
  materials?: MaterialsInter[];
}

export interface MaterialsInter {
  materialType?: number | string;
  racialName?: string;
  pictureUrl?: string;
}
export interface ISmartDevelopStyleDetailResFabricRecommendTask {
  /**
   * 任务ID
   */
  taskId: string;
  /**
   * 任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；
   */
  taskStatus: RECOMMEND_FABRIC_TASK_STATUS;
  /**
   * 任务进度0-100
   */
  taskProgress: string;
  /**
   * 排队位置
   */
  rankPosition: string;
  /**
   * 消息备注
   */
  message: string;
  /**
   * 创建时间
   */
  createdTime: string;
}

export interface ISmartDevelopStyleDetailResGenerateImagesItem {
  /**
   * 组号
   */
  groupNum: string;
  /**
   * 是否可以履约：1：可以，0：不可以
   */
  promiseEnabled: YES_NO_NUMBER_ENUM;
  /**
   * 面料是否一致：1：一致，0：不一致
   */
  fabricConsistent: YES_NO_NUMBER_ENUM;
  /**
   * 推荐状态
   */
  recommendState: IMAGE_RECOMMEND_FABRIC_STATE;
  /**
   * 图片列表
   */
  pictureList: ISmartDevelopStyleDetailResPictureListItem[];
}
export interface ISmartDevelopStyleDetailResPictureListItem {
  /**
   * 图片id
   */
  pictureId: string;
  /**
   * 图片url
   */
  pictureUrl: string;
  /**
   * 图片名称
   */
  pictureName: string;
  /**
   * 修复图
   */
  repairImgUrl: string;
}

export interface ISmartDevelopStyleDetailResRecommendFabricListItem {
  /**
   * 中台主商品id
   */
  sourceCommodityId: string;
  /**
   * 商品ID
   */
  commodityId: string;
  /**
   * 商品编码
   */
  commodityCode: string;
  /**
   * 商品名称
   */
  commodityName: string;
  /**
   * 商品图片
   */
  commodityPicture: string;
  /**
   * 纹理色块图
   */
  colorPicture: string;
  /**
   * SKU-ID
   */
  skuId: string;
  /**
   * SKU-编码
   */
  skuCode: string;
  /**
   * 色号
   */
  colorCode: string;
  /**
   * 颜色rgb
   */
  rgb: string;
  /**
   * 家族代表面料类目
   */
  familyFabricCategory: string;
}
// ⬆️ design-智能开款-查询任务详情响应体

// ⬇️ 图片详情响应体 接口：https://yapi.tiangong.site/project/18/interface/api/541
/**
 * compiled code *
 */
export interface IPictureDetailRes {
  /**
   * id
   */
  id: string;
  /**
   * 智能识别ID
   */
  smartIdentifyId: string;
  /**
   * 品类
   */
  baseCategory: string;
  /**
   * 款式类型：0-净色、1-花型
   */
  styleType: string;
  /**
   * 算法识别品类
   */
  identifyCategoryName: string;
  /**
   * 算法识别品类
   */
  identifyCategoryCode: string;
  /**
   * 原图下载后上传到OSS的URL
   */
  basePicture: string;
  clipLabels: ILabelItem[];
}

// ⬇️ design-智能开款-中止按钮(批量)请求体 接口：https://yapi.tiangong.site/project/18/interface/api/662
export interface IAbortBatchReq {
  /**
   * 任务编号
   */
  taskCodes: string[];
}
// ⬆️ design-智能开款-中止按钮(批量)请求体

// ⬇️ design-智能开款-删除按钮(批量)请求体 接口：https://yapi.tiangong.site/project/18/interface/api/663
export interface IDeletedBatchReq {
  /**
   * 任务编号
   */
  taskCodes: string[];
}
// ⬆️ design-智能开款-删除按钮(批量)请求体

// ⬇️ design-智能开款-重试按钮(批量)请求体 接口：https://yapi.tiangong.site/project/18/interface/api/664
export interface IRetryBatchReq {
  /**
   * 任务编号
   */
  taskCodes: string[];
}
// ⬆️ design-智能开款-重试按钮(批量)请求体

// ⬇️ AI设计品类列表响应体 接口：https://yapi.tiangong.site/project/19/interface/api/1276
/**
 * 响应数据
 */
export type ICategoryListRes = {
  /**
   * 父级ID
   */
  parentId: string;
  /**
   * 父级编码
   */
  parentCode: string;
  /**
   * 标签编码
   */
  labelCode: string;
  /**
   * 分类ID
   */
  id: string;
  /**
   * 标签编码
   */
  code: string;
  /**
   * 标签值
   */
  value: string;
  /**
   * 是否启用：{0-否 ,1-是},默认1
   */
  enable: YES_NO_NUMBER_ENUM;
  /**
   * 排序
   */
  sort: string;
}[];
// ⬆️ AI设计品类列表响应体

// ⬇️ 智能设计-一键推荐面料请求体 接口：https://yapi.tiangong.site/project/18/interface/api/1398
export interface IDesignCreateReq {
  /**
   * 智能设计任务ID
   */
  taskId: string;
}
// ⬆️ 智能设计-一键推荐面料请求体

// ⬇️ 面料推荐任务详情响应体 接口：https://yapi.tiangong.site/project/18/interface/api/1399
export interface IFabricRecommendDetailRes {
  /**
   * 任务ID
   */
  taskId: string;
  /**
   * 任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；
   */
  taskStatus: RECOMMEND_FABRIC_TASK_STATUS;
  /**
   * 任务进度0-100
   */
  taskProgress: string;
  /**
   * 排队位置
   */
  rankPosition: string;
  /**
   * 消息备注
   */
  message: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 推荐面料
   */
  recommendFabricList: IFabricRecommendDetailResRecommendFabricListItem[];
}
export interface IFabricRecommendDetailResRecommendFabricListItem {
  /**
   * 家族代表面料类目
   */
  familyFabricCategory: string;
  /**
   * 中台主商品ID
   */
  sourceCommodityId: string;
  /**
   * 商品ID
   */
  commodityId: string;
  /**
   * 商品编码
   */
  commodityCode: string;
  /**
   * 商品名称
   */
  commodityName: string;
  /**
   * 商品图片
   */
  commodityPicture: string;
  /**
   * 纹理色块图
   */
  colorPicture: string;
  /**
   * SKU-ID
   */
  skuId: string;
  /**
   * SKU-编码
   */
  skuCode: string;
  /**
   * 色号
   */
  colorCode: string;
  /**
   * RGB
   */
  rgb: string;
}
// ⬆️ 面料推荐任务详情响应体

// ⬇️ 新增或者更新场景库请求体 接口：https://yapi.tiangong.site/project/18/interface/api/1574
/**
 * 请求参数对象
 */

// ⬇️ 查看AI设计生图推荐面料结果（传每个分组第一张图片ID）响应体 接口：https://yapi.tiangong.site/project/18/interface/api/3202
export interface IFabricInfoRes {
  /**
   * 图片id
   */
  pictureId: string;
  /**
   * 图片url
   */
  pictureUrl: string;
  /**
   * 推荐面料
   */
  fabricList: IFabricInfoResFabricListItem[];
}
export interface IFabricInfoResFabricListItem {
  /**
   * 推荐面料ID
   */
  id: string;
  /**
   * 家族代表面料类目
   */
  familyFabricCategory: string;
  /**
   * 中台主商品ID
   */
  sourceCommodityId: string;
  /**
   * 商品ID
   */
  commodityId: string;
  /**
   * 商品编码
   */
  commodityCode: string;
  /**
   * 商品名称
   */
  commodityName: string;
  /**
   * 商品图片
   */
  commodityPicture: string;
  /**
   * 纹理色块图
   */
  colorPicture: string;
  /**
   * SKU-ID
   */
  skuId: string;
  /**
   * SKU-编码
   */
  skuCode: string;
  /**
   * 色号
   */
  colorCode: string;
  /**
   * RGB
   */
  rgb: string;
}
// ⬆️ 查看AI设计生图推荐面料结果（传每个分组第一张图片ID）响应体


/**
 * 图片描述-任务详情 请求参数
 * @see https://yapi.textile-story.com/project/1363/interface/api/99907
 */
export interface WebPictureCaptionReq {
}

/**
 * 图片描述-任务详情 响应体
 * @see https://yapi.textile-story.com/project/1363/interface/api/99907
 */
export interface WebPictureCaptionRes {
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
  /** 业务主键ID */
  busId?: number;
  /** 输入图片 */
  inputImg?: string;
  /** 图片描述 */
  caption?: string;
}

/**
 * 新增AI标题 请求参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/99913
 */
export interface AiTitleSaveReq {
  /** 任务ID */
  taskId: string;
  /** 输入图片URL */
  inputImage: string;
}

/**
 * 新增AI标题 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/99913
 */
export interface AiTitleSaveRes {
}


/**
 * 重试AI标题 请求参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/99919
 */
export interface AiTitleReSaveReq {
  /** 任务ID */
  taskId: string;
  /** 输入图片URL */
  inputImage: string;
}

/**
 * 重试AI标题 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/99919
 */
export interface AiTitleReSaveRes {
}
/**
 * 用户对生成图片组评价保存 请求参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/100036
 */
export interface UserEvaluateImageGroupSaveOrUpdateReq {
  /** 评价ID，修改时候必须 */
  evaluateImageId?: number;
  /** 图组id，新增时候必须 */
  pictureGroupId?: number;
  /** 是否是好评：0-否；1-是
取消好评/差评时候传null */
  good?: number | null;
}
/**
 * 用户对生成图片组评价保存 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/100036
 */
export interface UserEvaluateImageGroupSaveOrUpdateRes {
}

export interface IDictValuesReq {
  /** 内部字典传 `1000`  */
  dictType?: string;
  /**
   * 是否启用：{0-否 ,1-是}
   */
  enable?: string;
  /**
   * 字典编号集合
   */
  dictCodes: string[];
  /**
   * 升序的
   */
  ascending?: boolean;
}

export type IValuesRes = IDictResItem[];
export interface IDictResItem {
  /**
   * 字典Id
   */
  dictId?: string;
  /**
   * 字典编号
   */
  dictCode?: string;
  /**
   * 字典名称
   */
  dictName?: string;
  /**
   * 字典值
   */
  values: IValuesResItemValuesItem[];
}

export interface IValuesResItemValuesItem {
  /**
   * 字典值id
   */
  valueId?: string;
  /**
   * 字典值编号
   */
  valueCode?: string;
  /**
   * 字典值父编号
   */
  valueParentCode?: string;
  /**
   * 字典值
   */
  dictValue?: string;
  /**
   * 扩展值1
   */
  extValue1?: string;
  /**
   * 扩展值2
   */
  extValue2?: string;
  /**
   * 扩展值3
   */
  extValue3?: string;
  /**
   * 扩展值4
   */
  extValue4?: string;
  /**
   * 扩展值5
   */
  extValue5?: string;
  /**
   * 扩展值6
   */
  extValue6?: string;
  /**
   * 排序
   */
  valueSort?: string;
  /**
   * 是否启用：{0-否 ,1-是},默认1
   */
  enable?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 层级
   */
  level?: number;
  /*
  * 子字典值
  *  */
  children?: IValuesResItemValuesItem[];
  /*
  * 是否禁用
  *  */
  disabled?: boolean;
  /**
   * 字典值
   */
  label: string;
  /**
   * 字典值编号
   */
  value: string;
}

