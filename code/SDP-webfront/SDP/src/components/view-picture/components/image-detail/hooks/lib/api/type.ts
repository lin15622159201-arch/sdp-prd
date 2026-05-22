// ⬇️ 记录下载日志请求体 接口：https://yapi.tiangong.site/project/519/interface/api/48346

import { YES_NO_ENUM } from '@/constant';
import {
  HD_TASK_MODE,
  HD_TASK_STATUS,
  IMG_LOG_TYPE_ENUM,
  LABEL_CATEGORY_TYPE_ENUM,
  POLL_TASK_STATUS_ENUM,
} from './constant';

/**
 * 参数
 */
export interface IAigcTaskAddImgDownloadLogReq {
  /**
   * aigc任务业务ID
   */
  aigcTaskId: string;
  /**
   * 任务编号ID
   */
  taskId: string;
  /**
   * 任务编码
   */
  taskCode: string;
  /**
   * 任务名称
   */
  taskName: string;
  /**
   * 100 真人图生成AI模特图 / 200 CAD图生成AI模特图 / 300 人台图生成AI模特图 / 400 改款 / 500 改图案
   */
  taskType: string;
  /**
   * 图片名称
   */
  imgName: string;
  /**
   * 图片地址
   */
  imgUrl?: string;
  /**
   * 操作类型 ，1 下载； 3 复制.  默认下载
   */
  type: IMG_LOG_TYPE_ENUM;
}
// ⬆️ 记录下载日志请求体

// ⬇️ 记录下载日志响应体 接口：https://yapi.tiangong.site/project/519/interface/api/48346
export type IAigcTaskAddImgDownloadLogRes = null;

// ⬇️ 创建FgClip任务请求体 接口：https://yapi.tiangong.site/project/699/interface/api/58370
/**
 * 图片参数
 */
export interface IFgClipTaskReq {
  params: IFgClipTaskReqParamsItem[];
}
export interface IFgClipTaskReqParamsItem {
  /**
   * 图片
   */
  splitBasePicture: string;
  /**
   * 图片MD5
   */
  md5Code: string;
}
// ⬆️ 创建FgClip任务请求体

// ⬇️ 创建FgClip任务响应体 接口：https://yapi.tiangong.site/project/699/interface/api/58370
export type IFgClipTaskRes = {
  /**
   * 任务ID
   */
  taskId: string;
  /**
   * 原图图片
   */
  basePicture: string;
}[];
// ⬆️ 创建FgClip任务响应体

// ⬇️ 查询FgClip任务请求体 接口：https://yapi.tiangong.site/project/699/interface/api/58354
/**
 * ID集合
 */
export interface IFgTaskReq {
  /**
   * ID集合
   */
  taskIds: string[];
}
// ⬆️ 查询FgClip任务请求体

export type IFgTaskRes = IFgTaskItem[];

// ⬇️ 查询FgClip任务响应体 接口：https://yapi.tiangong.site/project/699/interface/api/58354
export type IFgTaskItem = {
  /**
   * 任务ID
   */
  taskId: string;
  /**
   * 当前任务都是fg_clip
   */
  taskType: string;
  /**
   * 任务进度
   */
  taskProgress: number;
  /**
   * 10：排队中，20：生成中 30：已完成,40：失败
   */
  taskStatus: POLL_TASK_STATUS_ENUM;
  /**
   * md5值用来区分是否是同一张图片
   */
  md5Code: string;
  /**
   * 原图图片
   */
  basePicture: string;
  /**
   * 标签版本
   */
  labelVersion: string;
  labelInfo: IFgClipTaskResLabelInfo;
  /**
   * 可用的 0 否 1是
   */
  usable: YES_NO_ENUM;
  /**
   * 主题
   */
  theme: { name: string; code: string; values: { name: string; code: string; }[]; }[];
};

/**
 * 标签
 */
export interface IFgClipTaskResLabelInfo {
  /**
   * 色号
   */
  coloroCodes: string;
  /**
   * 标签中文名
   */
  cn: IFgClipTaskResCnItem[];
}
export interface IFgClipTaskResCnItem {
  /**
   * 标签名
   */
  name: string;
  /**
   * 标签值
   */
  code: string;
  /**
   * 标签值
   */
  values: {
    code: string;
    name: string;
  }[];
}

// ⬇️ 第三级标签信息响应体 接口：https://yapi.tiangong.site/project/447/interface/api/68331
export interface IFmThirdLabelRes {
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
  enable: YES_NO_ENUM;
  /**
   * 宽
   */
  width: string;
  /**
   * 高
   */
  height: string;
  /**
   * 扩图
   */
  expand: YES_NO_ENUM;
}
// ⬆️ 第三级标签信息响应体

// ⬇️ 第三级标签查询响应体 接口：https://yapi.tiangong.site/project/447/interface/api/67779
export type IThirdLabelListRes = {
  /**
   * 父级ID
   */
  parentId: string;
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
}[];
// ⬆️ 第三级标签查询响应体

// ⬇️ 查询启用的场景库列表请求体 接口：https://yapi.textile-story.com/project/447/interface/api/79436
export interface IModelTemplateLibraryEnableListReq {
  /**
   * 当前查询的页码
   */
  pageNum: number;
  /**
   * 当前查询单页的数据量
   */
  pageSize: number;
}
// ⬆️ 查询启用的场景库列表请求体

// ⬇️ 查询启用的场景库列表响应体 接口：https://yapi.textile-story.com/project/447/interface/api/79436
/**
 * compiled code *
 */
export interface IModelTemplateLibraryEnableListRes {
  /**
   * 当前页码
   */
  page: number;
  /**
   * 总数据量
   */
  total: number;
  /**
   * 分页数据
   */
  list: IModelTemplateLibraryEnableListResListItem[];
}

// ⬇️ 查询启用的场景库列表响应体 接口：https://yapi.textile-story.com/project/447/interface/api/79436
/**
 * compiled code *
 */
export type IModelTemplateLibraryEnableListResListItem = {
  /**
   * 模板库ID
   */
  id: string;
  /**
   * 状态，0：停用，1启用
   */
  enable: YES_NO_ENUM;
  /**
   * 排序， 0.00-999.99
   */
  templateSort: string;
  /**
   * 场景名称
   */
  sceneName: string;
  /**
   * 图片数组
   */
  pictureList: IModelTemplateLibraryEnableListResPictureListItem[];
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 更新人id
   */
  reviserId: string;
  /**
   * 修改人名称
   */
  reviserName: string;
  /**
   * 更新时间
   */
  revisedTime: string;
  /**
   * 创建人姓名
   */
  creatorName: string;
};

export interface IModelTemplateLibraryEnableListResPictureListItem {
  /**
   * 图片url
   */
  pictureUrl: string;
  /**
   * 是否是主图， 0 否 1是
   */
  mainPicture: YES_NO_ENUM;
}

export interface IGetLabelParams {
  /**
   * 分类编码
   */
  classCode: LABEL_CATEGORY_TYPE_ENUM;
  /**
   * 分组编码
   */
  groupCode?: string;
}

export interface ILabel {
  /**
   * 分类ID
   */
  parentId: string;
  /**
   * 父级编码
   */
  parentCode: string;
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
   * 是否启用
   */
  enable: YES_NO_ENUM;
}
// ⬇️ 标签查询列表（分页）请求体 接口：https://yapi.tiangong.site/project/447/interface/api/57130

// ⬇️ 标签 - 查询请求体 接口：https://yapi.tiangong.site/project/447/interface/api/57162
/**
 * 前端实体
 */
export interface IBaseLabelListReq {
  /**
   * 标签类型
   */
  label: 'CATEGORY' | 'FABRIC';
  /**
   * 分类编码
   * <p>categoryCode</p>
   */
  classCode?: string;
  /**
   * 分组编码
   * <p>categoryCode</p>
   */
  groupCode?: string;
}
// ⬆️ 标签 - 查询请求体

// ⬇️ 标签 - 查询响应体 接口：https://yapi.tiangong.site/project/447/interface/api/57162
/**
 * 响应数据
 */
export type IBaseLabelListRes = {
  /**
   * 父级ID
   */
  parentId: string;
  /**
   * 父级code
   */
  parentCode: string;
  /**
   * 关联code
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
   * 是否启用
   */
  enable: YES_NO_ENUM;
}[];

// ⬇️ 获取4K高清图请求体 接口：https://yapi.tiangong.site/project/20/interface/api/655
/**
 * UltraHdTaskReq
 */
export interface IUltraHdObtainReq {
  /**
   * 原始任务ID
   */
  originTaskId: string;
  /**
   * 4K任务模型：FLOWER_PATTERN_EXTRACT-花型提取，SMART_DESIGN-智能设计生图
   */
  taskMode: HD_TASK_MODE;
  /**
   * 图片ID
   */
  pictureId: string;
  /**
   * 图片url
   */
  pictureUrl: string;
}
// ⬆️ 获取4K高清图请求体

// ⬇️ 获取4K高清图响应体 接口：https://yapi.tiangong.site/project/20/interface/api/655
export interface IUltraHdObtainRes {
  /**
   * 任务ID
   */
  taskId: string;
  /**
   * 任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；
   */
  taskStatus: HD_TASK_STATUS;
  /**
   * 任务进度0-100
   */
  taskProgress: string;
  /**
   * 消息备注
   */
  message: string;
  /**
   * AI开始处理时间
   */
  aiStartTime: string;
  /**
   * AI结束处理时间
   */
  aiEndTime: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 推送时间
   */
  pushTime: string;
  /**
   * 原始任务ID
   */
  originTaskId: string;
  /**
   * 4K任务模型：FLOWER_PATTERN_EXTRACT-花型提取，SMART_DESIGN-智能设计生图
   */
  taskMode: HD_TASK_MODE;
  /**
   * 图片ID
   */
  pictureId: string;
  /**
   * 图片url
   */
  pictureUrl: string;
  /**
   * 生成图
   */
  resImg: string;
}
// ⬆️ 获取4K高清图响应体
