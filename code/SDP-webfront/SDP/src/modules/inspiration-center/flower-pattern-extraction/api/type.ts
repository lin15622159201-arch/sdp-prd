import { TASK_STATUS_EN_ENUM } from '../../constant';
import {
  FLOWER_PATTERN_DETAIL_INT_TASK_STATUS_ENUM,
  FLOWER_PATTERN_EXTRACTION_REGION_ENUM,
} from '../constant';

// ⬇️ design-花型提取-列表查询请求体 接口：https://yapi.tiangong.site/project/18/interface/api/503
export interface IFloralPrintExtractionPageReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 任务编号
   */
  taskCode?: string;
  /**
   * 创建人
   */
  creatorName?: string;
  /**
   * 创建时间-开始
   */
  createdStartTime?: string;
  /**
   * 创建时间-结束
   */
  createdEndTime?: string;
  taskStatus?: TASK_STATUS_EN_ENUM | '';
}

// ⬆️ design-花型提取-列表查询请求体

// ⬇️ design-花型提取-列表查询响应体 接口：https://yapi.tiangong.site/project/18/interface/api/503
export interface IFloralPrintExtractionPageRes {
  pageNum: string;
  total: string;
  list: IFloralPrintExtractionPageResListItem[];
}
export interface IFloralPrintExtractionPageResListItem {
  /**
   * 任务编号
   */
  taskCode: string;
  creatorId: string;
  /**
   * 创建人
   */
  creatorName: string;
  /**
   * 创建时间
   */
  createdTime: string;
  taskStatus: TASK_STATUS_EN_ENUM | '';
  /**
   * 原图
   */
  originalImage: string;
  /**
   * 生成内容（前四张图）
   */
  generateImages: string[];
  /**
   * 提取区域：1-上半身；2-下半身；3-全身
   */
  extractRegion: FLOWER_PATTERN_EXTRACTION_REGION_ENUM;
}
// ⬆️ design-花型提取-列表查询响应体

// ⬇️ design-花型提取-创建任务请求体 接口：https://yapi.tiangong.site/project/18/interface/api/502
export interface IFloralPrintExtractionCreateReq {
  /**
   * AI设计任务的任务id
   */
  sourceBusinessCode?: string | null;
  /**
   * 来源类型， FASHION_SMART_DEVELOP_STYLE： 智能开款 ，花型提取为空
   */
  sourceType?: string | null;
  /**
   * 原图
   */
  originalImage?: string;
  // boxSelectionCoordinates: IFloralPrintExtractionCreateReqBoxSelectionCoordinates[];
  /**
   * 提取区域：1-上半身；2-下半身；3-全身
   */
  extractRegion: FLOWER_PATTERN_EXTRACTION_REGION_ENUM;
}
/**
 * 框选坐标
 */
export interface IFloralPrintExtractionCreateReqBoxSelectionCoordinates {
  /**
   * X坐标起点
   */
  xmin: number;
  /**
   * Y坐标起点
   */
  ymin: number;
  /**
   * X坐标终点
   */
  xmax: number;
  /**
   * Y坐标终点
   */
  ymax: number;
}
// ⬆️ design-花型提取-创建任务请求体

// ⬇️ design-花型提取-查询任务详情响应体 接口：https://yapi.tiangong.site/project/18/interface/api/508
export interface IFloralPrintExtractionDetailRes {
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
   * 原图
   */
  originalImage: string;
  /**
   * 框选坐标
   */
  boxSelectionCoordinates: IFloralPrintExtractionCreateReqBoxSelectionCoordinates[];
  /**
   * 提取花型图片结果图列表
   */
  generateImages: IFLowerPatternPictureItem[];
}

export interface IFLowerPatternPictureItem {
  pictureId: string;
  pictureUrl: string;
  /** 自动消除时候，需要传给后台的 */
  patchImage: string;
  pictureName: string;
}
// ⬆️ design-花型提取-查询任务详情响应体

// ⬇️ 创建请求体 接口：https://yapi.tiangong.site/project/20/interface/api/550
/**
 * FlowerPatternMarkTaskReq
 */
export interface IFlowerPatternMarkCreateReq {
  /**
   * 参考图url
   */
  refImgUrl: string;
  /**
   * 参考图宽度（单位：像素）
   */
  refImgWidth: number;
  /**
   * 参考图高度（单位：像素）
   */
  refImgHeight: number;
}
// ⬆️ 创建请求体

// ⬇️ 详情响应体 接口：https://yapi.tiangong.site/project/20/interface/api/551
export interface IWebFlowerPatternMarkRes {
  /**
   * 任务ID
   */
  taskId: string;
  /**
   * 任务状态：0-排队中；10-生成中；20-已中止；30-已完成；40-无效；50-失败；60-超时失败；
   */
  taskStatus: FLOWER_PATTERN_DETAIL_INT_TASK_STATUS_ENUM;
  /**
   * 任务进度0-100
   */
  taskProgress: string;
  /**
   * 消息备注
   */
  message: string;
  /**
   * 参考图url
   */
  refImgUrl: string;
  /**
   * 选区矩形坐标列表，默认拿第一个
   */
  coordsList: IFloralPrintExtractionCreateReqBoxSelectionCoordinates[];
}
// ⬆️ 详情响应体

// ⬇️ 花型提取-消除褶皱-自动识别-创建请求体 接口：https://yapi.tiangong.site/project/20/interface/api/552
/**
 * WrinkleMarkTaskReq
 */
export interface IWrinkleMarkCreateReq {
  /**
   * 参考图url
   */
  refImgUrl: string;
  /**
   * 从衣服切出来的原始patch
   */
  refOriPatchUrl: string;
  /**
   * 参考图宽度（单位：像素）
   */
  refImgWidth: number;
  /**
   * 参考图高度（单位：像素）
   */
  refImgHeight: number;
}
// ⬆️ 创建请求体

// ⬇️ 花型提取-消除褶皱-自动识别详情响应体 接口：https://yapi.tiangong.site/project/20/interface/api/553
export interface IWebWrinkleMarkRes {
  /**
   * 任务ID
   */
  taskId: string;
  /**
   * 任务状态：0-排队中；10-生成中；20-已中止；30-已完成；40-无效；50-失败；60-超时失败；
   */
  taskStatus: FLOWER_PATTERN_DETAIL_INT_TASK_STATUS_ENUM;
  /**
   * 任务进度0-100
   */
  taskProgress: string;
  /**
   * 消息备注
   */
  message: string;
  /**
   * 参考图url
   */
  refImgUrl: string;
  /**
   * 从衣服切出来的原始patch
   */
  refOriPatchUrl: string;
  /**
   * 生成Mark图
   */
  resImg: string;
}
// ⬆️ 详情响应体

// ⬇️ 花型提取-消除褶皱-开始消除-创建请求体 接口：https://yapi.tiangong.site/project/20/interface/api/554
/**
 * WrinkleEliminateTaskReq
 */
export interface IWrinkleEliminateCreateReq {
  /**
   * 参考图url
   */
  refImgUrl: string;
  /**
   * 修复的mask区域url
   */
  maskUrl: string;
}
// ⬆️ 创建请求体

// ⬇️  花型提取-消除褶皱-开始消除-详情响应体 接口：https://yapi.tiangong.site/project/20/interface/api/555
export interface IWebWrinkleEliminateRes {
  /**
   * 任务ID
   */
  taskId: string;
  /**
   * 任务状态：0-排队中；10-生成中；20-已中止；30-已完成；40-无效；50-失败；60-超时失败；
   */
  taskStatus: FLOWER_PATTERN_DETAIL_INT_TASK_STATUS_ENUM;
  /**
   * 任务进度0-100
   */
  taskProgress: string;
  /**
   * 消息备注
   */
  message: string;
  /**
   * 参考图url
   */
  refImgUrl: string;
  /**
   * 修复的mask区域url
   */
  maskUrl: string;
  /**
   * 生成图
   */
  resImg: string;
}
// ⬆️ 详情响应体

// ⬇️ design-花型提取-提交消除褶皱结果图片请求体 接口：https://yapi.tiangong.site/project/18/interface/api/565
/**
 * 请求对象
 */
export interface IEliminateWrinklesReq {
  /**
   * 任务编号
   */
  taskCode?: string;
  /**
   * 消除褶皱结果图片地址
   */
  image?: string;
  pictureName: string;
}
// ⬆️ design-花型提取-提交消除褶皱结果图片请求体
// ⬇️ design-花型提取-再次编辑页面提交请求体 接口：https://yapi.tiangong.site/project/18/interface/api/627
/**
 * 请求对象
 */
export interface IFloralPrintExtractionEditReq {
  /**
   * 原图
   */
  originalImage: string;
  // /**
  //  * 框选坐标
  //  */
  // boxSelectionCoordinates: IFloralPrintExtractionCreateReqBoxSelectionCoordinates[];
  /**
   * 任务编号
   */
  taskCode?: string;
  /**
   * 提取区域：1-上半身；2-下半身；3-全身
   */
  extractRegion: FLOWER_PATTERN_EXTRACTION_REGION_ENUM;
}
// ⬆️ design-花型提取-再次编辑页面提交请求体
