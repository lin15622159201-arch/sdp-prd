import { ALLOCATE_TYPE_ENUM, COMMODITY_TYPE_ENUM, DESIGN_DEMAND_STATUS_ENUM } from '../constant';

export interface IGetTaskListReq {
  /**
   * 设计需求主键id
   */
  designDemandId?: string;
  /**
   * 灵感选款ID
   */
  inspirationStyleId?: string;
  /**
   * 企划id
   */
  planningId?: string;
  /**
   * 状态: 10-待分配; 20-待处理; 30-已淘汰; 40-已开款
   */
  designDemandStatus?: DESIGN_DEMAND_STATUS_ENUM | '';
  /**
   * 供给方式-OPS
   */
  supplyModeName?: string;
  /**
   * 供给方式编码
   */
  supplyModeCode?: string;
  /**
   * 灵感品类编码-OPS
   */
  category?: string;
  /**
   * 建议风格编码   (多选)
   */
  suggestedStyleCodeList?: string[];
  /**
   * 国家站点id集合 (多选)
   */
  countrySiteCodeList?: string[];
  /**
   * 店铺id集合   (多选)
   */
  storeIdList?: string[];
  /**
   * 期望成本
   */
  sellingPrice?: string;
  /**
   * 波段编码-OPS: plm_clothing_band  (多选)
   */
  waveBandCodeList?: string[];
  /**
   * 分配设计师编码
   */
  designerIdList?: string;
  /**
   * 提交人idid集合  (多选)  v1.020
   */
  submitUserIdList?: string[];
  /**
   * 分配设计师组编码
   */
  designerGroupCodeList?: string;
  /**
   * 开款SPU
   */
  styleCode?: string;
  pageNum: number;
  pageSize: number;
  /**
   * 选图人
   */
  chosenIdList?: string[];
  /**
   * 选图开始时间
   */
  chosenTimeStart?: string;
  /**
   * 选图结束时间
   */
  chosenTimeEnd?: string;
}
export interface IGetTaskListRes {
  page?: number;
  total?: number;
  list: {
    /**
     * 设计需求主键id
     */
    designDemandId: string;
    /**
     * 状态: 10-待分配; 20-待处理; 30-已淘汰; 40-已开款
     */
    designDemandStatus: DESIGN_DEMAND_STATUS_ENUM;
    /**
     * 灵感选款ID
     */
    inspirationStyleId: string;
    /**
     * 供给方式-OPS
     */
    supplyModeName: string;
    /**
     * 供给方式编码 imitation=仿款
     */
    supplyModeCode: string;
    /**
     * 商品链接
     */
    productLink: string;
    /**
     * 灵感品类编码-OPS
     */
    category: string;
    /**
     * 灵感品类名称
     */
    categoryName: string;
    /**
     * 建议风格-OPS
     */
    suggestedStyle: string;
    /**
     * 建议风格编码
     */
    suggestedStyleCode: string;
    /**
     * 国家站点id
     */
    countrySiteId: string;
    /**
     * 国家站点name
     */
    countrySiteName: string;
    /**
     * 店铺id
     */
    storeId: string;
    /**
     * 店铺名称
     */
    storeName: string;
    /**
     * 期望成本
     */
    sellingPrice: string;
    /**
     * 期望成本(仿款时有值)  v1.020
     */
    expectedCostPrice: string;
    /**
     * 波段编码-OPS: plm_clothing_band
     */
    waveBandCode: string;
    /**
     * 波段名称
     */
    waveBandName: string;
    /**
     * 选中人id
     */
    chosenId: string;
    /**
     * 选中人名称
     */
    chosenName: string;
    /**
     * 选中时间
     */
    chosenTime: number;
    /**
     * 需求提交人  v1.020
     */
    submitUserName: string;
    /**
     * 需求提交人id  v1.020
     */
    submitUserId: string;
    /**
     * 分配人名称  v1.020
     */
    allocateUserName: string;
    /**
     * 分配设计师id
     */
    designerId: string;
    /**
     * 分配设计师名称
     */
    designerName: string;
    /**
     * 分配设计师组名称
     */
    designerGroup: string;
    /**
     * 开款SPU
     */
    styleCode: string;
    /**
     * 灵感图集合
     */
    inspirationImageList: string[];
    /**
     * 淘汰原因名称
     */
    noPassReasonName?: string;
    /**
     * 淘汰原因code
     */
    noPassReasonCode?: string;
    /**
     * 淘汰人名称
     */
    noPassUserName?: string;
    /**
     * 淘汰时间
     */
    noPassTime?: number;
  }[];
}

export interface IDispatchTaskReq {
  /**
   * 设计需求单id
   */
  designDemandIdList: string[];
  /**
   * 分配设计师id
   */
  designerId: string;
  /**
   * 仿款进行任务分配必填参数信息   v1.020
   */
  copyStyleInfo: {
    /**
     * 国家站点code
     */
    countrySiteCode: string;
    /**
     * 国家站点name
     */
    countrySiteName: string;
    /**
     * 店铺id
     */
    storeId: string;
    /**
     * 店铺名称
     */
    storeName: string;
    /**
     * 建议风格-OPS
     */
    suggestedStyle: string;
    /**
     * 建议风格编码
     */
    suggestedStyleCode: string;
    /**
     * 场景名称(ops: JV_scene)
     */
    sceneName: string;
    /**
     * 场景编码
     */
    sceneCode: string;
    /**
     * 波段编码
     */
    waveBandCode: string;
    /**
     * 波段名称
     */
    waveBandName: string;
    /**
     * 货盘类型名称
     */
    palletTypeName: string;
    /**
     * 货盘类型编码
     */
    palletTypeCode: string;
  };
}

export interface IGetTaskInfoReq {
  /**
   * 设计需求id
   */
  designDemandId: string;
}
export interface IGetTaskInfoRes {
  /**
   * 设计需求主键id
   */
  designDemandId?: string;
  /**
   * 状态: 10-待分配; 20-待处理; 30-已淘汰; 40-已开款
   */
  designDemandStatus?: DESIGN_DEMAND_STATUS_ENUM;
  /**
   * 灵感选款ID
   */
  inspirationStyleId?: string;
  /**
   * 企划id
   */
  planningId?: string;
  /**
   * 供给方式-OPS
   */
  supplyModeName?: string;
  /**
   * 供给方式编码
   */
  supplyModeCode?: string;
  /**
   * 商品链接
   */
  productLink?: string;
  /**
   * 灵感品类编码-OPS
   */
  category?: string;
  /**
   * 灵感品类名称
   */
  categoryName?: string;
  /**
   * 建议风格-OPS
   */
  suggestedStyle?: string;
  /**
   * 建议风格编码
   */
  suggestedStyleCode?: string;
  /**
   * 国家站点id
   */
  countrySiteId?: string;
  /**
   * 国家站点name
   */
  countrySiteName?: string;
  /**
   * 店铺id
   */
  storeId?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 期望成本
   */
  sellingPrice?: string;
  /**
   * 期望成本(仿款时有值)  v1.020
   */
  expectedCostPrice?: string;
  /**
   * 场景名称(ops: JV_scene)  v1.020
   */
  sceneName?: string;
  /**
   * 场景编码  v1.020
   */
  sceneCode?: string;
  /**
   * 货盘类型名称  v1.020
   */
  palletTypeName?: string;
  /**
   * 货盘类型编码  v1.020
   */
  palletTypeCode?: string;
  /**
   * 波段编码-OPS: plm_clothing_band
   */
  waveBandCode?: string;
  /**
   * 波段名称
   */
  waveBandName?: string;
  /**
   * 选中人id
   */
  chosenId?: string;
  /**
   * 选中人名称
   */
  chosenName?: string;
  /**
   * 选中时间
   */
  chosenTime?: number;
  /**
   * 需求提交人  v1.020
   */
  submitUserName?: string;
  /**
   * 需求提交人id  v1.020
   */
  submitUserId?: string;
  /**
   * 分配人名称  v1.020
   */
  allocateUserName?: string;
  /**
   * 分配人id  v1.020
   */
  allocateUserId?: string;
  /**
   * 分配设计师id
   */
  designerId?: string;
  /**
   * 分配设计师编码
   */
  designerCode?: string;
  /**
   * 分配设计师名称
   */
  designerName?: string;
  /**
   * 分配设计师组编码
   */
  designerGroupCode?: string;
  /**
   * 分配设计师组名称
   */
  designerGroup?: string;
  /**
   * 开款SPU
   */
  styleCode?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * aigc备注 ---2025-01-16新增
   */
  aigcRemark?: string;
  /**
   * 企划来源name  v1.020
   */
  planningSourceName: string;
  /**
   * 企划来源code  v1.020
   */
  planningSourceCode: string;
  /**
   * 灵感图来源
   */
  inspirationImageSource: string;
  inspirationImageSourceCode: string;
  /**
   * 灵感源品牌
   */
  inspirationBrand: string;
  inspirationBrandCode: string;
  /**
   * 详情信息
   */
  demandDetailInfo?: {
    /**
     * 设计需求详情主键id
     */
    designDemandDetailId?: string;
    /**
     * 设计需求id
     */
    designDemandId?: string;
    /**
     * 原图
     */
    originalImage?: string;
    /**
     * 灵感图集合
     */
    inspirationImageList: string[];
    /**
     * 淘汰原因
     */
    noPassReason?: string;
    /**
     * 淘汰人id
     */
    noPassUserId?: string;
    /**
     * 淘汰人名称
     */
    noPassUserName?: string;
    /**
     * 淘汰时间
     */
    noPassTime?: number;
  };
}

export interface IGetSuggestFabricReq {
  /**
   * 设计需求id
   */
  designDemandId: string;
}
export type IGetSuggestFabricRes = {
  /**
   * 主键id
   */
  suggestedMaterialId?: string;
  /**
   * 设计需求id
   */
  designDemandId?: string;
  /**
   * 排序序号
   */
  sortNum?: string;
  /**
   * 是否选中: 0-否; 1-是; (默认0)
   */
  isChosen?: string;
  /**
   * 物料信息(查自中台,与bom的物料查询出参字段一致)
   */
  materialInfo: {
    /**
     * 商品类型: PURE净色 FLOWER花型 ACCESSORIES : 特殊辅料：SPECIAL_ACCESSORIES
     */
    commodityType?: COMMODITY_TYPE_ENUM;
    /**
     * 商品名称(品名)  ---面料-净色、辅料、特殊辅料
     */
    commodityName?: string;
    /**
     * 花型品类
     */
    flowerCategory?: string;
    /**
     * 商品id
     */
    commodityId?: string;
    /**
     * 商品编码
     */
    commodityCode?: string;
    /**
     * 货号: 商品货号
     */
    commodityNumber?: string;
    /**
     * skuId
     */
    skuId?: string;
    /**
     * SKU编码
     */
    skuCode?: string;
    /**
     * 成分; json, 会有多种成分比例(面料)
     */
    material?: string;
    /**
     * 匹配物料图片
     */
    matchPictureList: string[];
    /**
     * 幅宽; 格式如: '120-130CM'或'125±5CM'  --v5.11
     */
    widthStrFormat?: string;
    /**
     * 销售单位
     */
    saleUnit?: string;
    /**
     * 克重; 格式如: '120-130g'或'120±5g'  --v5.11
     *
     * 需求:
     *  未迁移到中台的商品，字符串形式为如“120-130g”这样的格式；
     *  如果是迁移到中台的商品，字符串形式为如“120±5g”这样的格式；
     */
    weightStrFormat?: string;
    /**
     * 色系(面料)
     */
    colorName?: string;
    /**
     * 色号(面料)
     */
    colorNumber?: string;
    /**
     * 剪版销价(面料)
     */
    matchSampleGuidePrice?: string;
    /**
     * 剪版销价单位(面料)
     */
    matchSampleUnit?: string;
    /**
     * 大货销价(面料)
     */
    matchGuidePrice?: string;
    /**
     * 大货销价单位(面料)
     */
    matchCostPriceUnit?: string;
    /**
     * 销售空差(面料)
     */
    matchPurchaseGap?: string;
    /**
     * 足米价(面料)
     */
    meterPrice?: string;
    /**
     * 足米价单位(面料)
     */
    meterPriceUnit?: string;
    /**
     * 好料网-是否启用：{0-否 ,1-是}
     */
    enableState?: string;
    /**
     * 好料网-上架状态：{0-否 ,1-是}
     */
    onShelfState?: string;
  };
}[];

export interface ICreateSpuReq {
  /**
   * 设计需求单id
   */
  designDemandId: string;
  /**
   * 选中物料Id (选中物料必填)
   */
  suggestedMaterialId: string;
  /**
   * spu编码
   */
  spuCode: string;
  /**
   * sku编码
   */
  skuCode: string;
}

export interface IPassInspirationReq {
  /**
   * 设计需求单id
   */
  designDemandIdList: string[];
  /**
   * 淘汰原因
   */
  noPassReasonName: string;
  /**
   * 淘汰原因字典编码
   */
  noPassReasonCode: string;
}

export interface IReDispatchTaskReq {
  /**
   * 分配的设计需求单id集合
   */
  designDemandIdList: string[];
  /**
   * 分配设计师id
   */
  designerId: string;
}

/**
 * 创建图片解析 请求参数
 * @see https://yapi.textile-story.com/project/1363/interface/api/100057
 */
export interface PictureCaptionCreateReq {
  /** 图片来源 */
  source: string;
  /** 输入图片 */
  inputImg: string;
}

/**
 * 创建图片解析 响应体
 * @see https://yapi.textile-story.com/project/1363/interface/api/100057
 */
export interface PictureCaptionCreateRes {
}
/**
 * 图片描述-任务详情 请求参数
 * @see https://yapi.textile-story.com/project/1363/interface/api/101218
 */
export interface WebPictureCaptionReq {
}
/**
 * 图片描述-任务详情 响应体
 * @see https://yapi.textile-story.com/project/1363/interface/api/101218
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
  /** 来源 */
  source?: string;
}

/**
 * 创建任务 请求参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/101128
 */
export interface StyleGenCreateReq {
  /** 生图类型 */
  genType: string;
  /** 参考图 */
  refImgUrl?: string;
  /** 提示词 */
  prompt?: string;
  /** 脸部修复(1:开启, 0:关闭) */
  faceFix: number;
  /** 生成数量 */
  genCount: number;
  /** 风格模型ID */
  styleModelId: number;
  /** 分辨率 */
  imgSize: string;
  /** 背景图描述 */
  bgImgDesc?: string;
  /** 背景图url */
  bgImgUrl?: string;
  /** 模特图描述 */
  modelImgDesc?: string;
  /** 模特图url */
  modelImgUrl?: string;
}

/**
 * 创建任务 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/101128
 */
export interface StyleGenCreateRes {
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
  taskSource?: string;
}

/**
 * 查询任务列表 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/101131
 */
export interface StyleGenPageRes {
  /** 注释 */
  pageNum?: number;
  /** 注释 */
  total?: number;
  /** 注释 */
  list?: StyleGenPageResListItem[];
}

/**
 * 注释
 */
export interface StyleGenPageResListItem {
  /** 任务id */
  taskId: string;
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
}

/**
 * 注释
 */
export interface StyleGenPageResImagesItem {
  /** 图片ID */
  imageId?: number;
  /** 图片URL */
  imageUrl?: string;
  /** 序号 */
  serialNum?: number;
}
/**
 * 重试 请求参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/101149
 */
export interface StyleGenRetryReq {
}
/**
 * 重试 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/101149
 */
export interface StyleGenRetryRes {
}
/**
 * 任务详情 请求参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/101155
 */
export interface WebStyleGenReq {
}
/**
 * 任务详情 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/101155
 */
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
  enableDistill?: number;
  enableFollowability?: string;
}

/**
 * 衍生图片列表
 */
export interface WebStyleGenResImagesItem {
  /** 图片ID */
  imageId?: number;
  /** 图片URL */
  imageUrl?: string;
  /** 序号 */
  serialNum?: number;
}
/**
 * 风格模型-详情 请求参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/101068
 */
export interface StyleModelDetailReq {
}
/**
 * 风格模型-详情 响应体
 * @see https://yapi.textile-story.com/project/1359/interface/api/101068
 */
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
  sourceBusinessCode?: string;
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
  /** 生成图 */
  generateImages?: PostureFissionTaskPageResGenerateImagesItem[];
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
  taskStatus?: string;
}

/**
 * 注释
 */
export interface PostureFissionTaskPageResGenerateImagesItem {
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
}
