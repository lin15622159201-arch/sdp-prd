export interface IPageParams {
  pageNum?: number;
  pageSize?: number;
}
// 纸样标签列表
export interface IClothingTag {
  id?: string; // number非必须
  name: string; // 非必须标签名称
  code: string; // 非必须标签编码
  parentCode?: string; // 非必须父标签编码
  status?: string; // 非必须标签状态1-启用 2-停用
  creator?: string; // 非必须创建人ID
  createdTime?: string; // 非必须
  revisedTime?: string; // 非必须
  next: IClothingTag[] | IClothingTag; // 子标签
  children?: IClothingTag[] | IClothingTag; // 子标签 同next
  rules?: any;
}

// 查询子标签列表参数
export interface IClothingTagParams {
  parentCode?: string;
  pageNum?: number;
  pageSize?: number;
}

// 纸样
export interface IDesign {
  id?: number; // 非必须 序号
  version?: string; // 非必须版本号
  createTime?: string; // 非必须创建时间
  category?: string; // 非必须打版品类(code1-code2-code3)
  saleGroup?: string; // 非必须 销售群体
  region?: number | string[] | number[]; // 非必须 区域id 4:广州 8:杭州
  designFileName?: string; // 非必须 电子纸样文件名
  designFileUrl?: string; // 非必须 电子纸样url
  tagList?: []; // 非必须标签 item 类型: object
  operationLogList?: []; // 非必须操作日志 item 类型: object
  stylePictureList?: string[]; // 非必须 款式图片 item 类型: string
  keyPrototypeDesign?: boolean; // 非必须 是否大货纸样
  prototypeDesignId?: string;
}

// 纸样查询参数
export interface IDesignParams {
  prototypeCodeLike?: string; // 非必须 版单编码(模糊)
  version?: string; // 非必须 版本号
  createStartTime?: string; // 非必须 创建开始时间 格式：yyyy-MM-dd HH:mm:ss
  createEndTime?: string; // 非必须 创建结束时间 格式：yyyy-MM-dd HH:mm:ss category string
  category?: string | string[]; // 打版品类
  saleGroup?: string[]; // 非必须 销售群体
  region?: number[]; // 非必须 区域id 4:广州 8:杭州
  tagSet?: IClothingTag[]; // 非必须 纸样标签 item 类型: object
  currentUserId?: number; // 非必须 当前用户ID
  currentUserName?: string; // 非必须 当前登录用户名称
  // keyPrototypeDesign: null, // 非必须 是否大货纸样
  pageNum?: number;
  pageSize?: number;
}

// 版单
export interface IClothingPrototype {
  pictureUrl: string; // 非必须, // 款式图片
  prototypeCode: string; // 非必须, // 版单编号
  prototypeId: number; // 非必须, // 版单id
  category: string; // 非必须, // 打版品类
  prototypeStatus: string; // 非必须, // 打版信息状态,
  purchaserSource: string; // 非必须, // 采购商来源
  purchaserCode: string; // 非必须, // 采购商编号
  purchaserName: string; // 非必须, // 采购商名称
  finishedTime: string; // 非必须, // 打版完成时间-样衣完成版单完成,
  auditFinishedTime: string; // 非必须, // 拆版完成时间-审核完成,
  createdTime: string; // 非必须, // 创建时间,
  deliveryTime: string; // 非必须, // 需求交付日期,
  handlerName: string; // 非必须, // 处理人名称
  handlerCode: string; // 非必须, // 处理人code
  showReceivedButton: boolean; // 非必须, // 是否领取
  creator: number; // 非必须, // 创建人id
  createdName: string; // 非必须, // 创建人名称
  regionId: number; // 非必须, // 区域id
  regionName: string; // 非必须, // 区域id
}

// 版单请求参数

// 版型
export interface ISizeInfo {
  sizeName: string;
  sizeLink: string;
}

export interface IClothingModel {
  id?: string; // 非必须
  modelId?: string; // 同 id
  category?: string | string[]; // 非必须打版品类(code1-code2-code3)
  modelName?: string; // 非必须版型名称
  modelNameLike?: string;// 用于模糊查找的名称
  designFileName?: string; // 非必须电子纸样文件名
  designFileUrl?: string; // 非必须电子纸样url
  designUrlSet?: string[]; // 非必须纸样预览图片url item: 类型: string
  sampleUrlSet?: string[]; // 非必须成衣预览图片url item 类型: string
  tagSet?: IClothingTag[]; // 非必须标签 item 类型: object
  operationLogList?: []; // 非必须操作日志 item 类型: object
  // 尺寸信息文件
  sizeInfoList?: ISizeInfo[];
}

export interface IClothingModelParams extends IPageParams, IClothingModel {

}

export interface IGetTagLogs {
  buzId?: string;
  buzType?: string;
}
export interface IFileDownlog extends IGetTagLogs {
  content?: string;
}

export interface IDeltClothingModel {
  modelIdSet: string[];
}
