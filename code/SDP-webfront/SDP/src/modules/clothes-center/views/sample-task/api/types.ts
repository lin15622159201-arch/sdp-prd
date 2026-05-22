/**
 * 3D列表查询
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/1963
 */
export interface IDimensionPageReq {
  /**
   * 审版工艺师
   */
  reviewCraftsmanId?: string;
  /**
   * 样衣所在处理环节code （参考 ClothesStepEnum）
   */
  clothesStep?: string;
  /**
   * 样衣所在处理节点code （参考 ClothesNodeEnum）
   */
  clothesNode?: string;
  /**
   * 样衣所在处理环节节点状态
   */
  clothesStepNodeState?: string;
  /**
   *  * 1-3D任务分单页面      * 2-3D任务待接单      * 3-3D任务待提交(外部处理-待提交)      * 4-3D任务已提交(外部处理-已提交)
   */
  pageType?: string;
  /**
   * 3D任务是否已分单(1:是,0:不是)
   */
  isAllocated?: string;
  /**
   * 是否外发(1:是,0:不是)
   */
  isOutsourced?: string;
  /**
   * 供应商id(外部分单,内部分单)
   */
  roomIdList?: string[];
  /**
   * 3D分单状态 0:内部待进行(外部待接单) |1进行中 |2已完成
   */
  dimensionState?: string;
  /**
   * 分单员id
   */
  allocateeIdList: string[];
  /**
   * 波段编码集合
   */
  waveBandCodeList: string[];
  /**
   * 接单状态(0:未接单,1:已接单)
   */
  dimensionReceiving?: string;
  /**
   * 制作方式
   * 0-仅纸样 1-实物样 2-3D样
   */
  makeClothesType?: string;
  /**
   * 打版类型: 1-大货打版 2-正常打版 3-复色打版 4-补做打版
   */
  sampleType?: string | '';
  /**
   * 打版类型集合: 1-大货打版 2-正常打版 3-复色打版
   */
  sampleTypeList: string[];
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode?: string;
  /**
   * 技术组别编码
   */
  techniqueGroup?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: string;
  /**
   * 纸样师id集合
   */
  patternMakerIdList?: string[];
  /**
   * 设计师id【设计师】
   */
  designerIdList: string[];
  /**
   * 设计组编号
   */
  designerGroupCodeList: string[];
  /**
   * 3D版师
   */
  dimensionDesignerIdList?: string[];
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: string;
  /**
   * 是否查询我的 true=我的、false/null=全部
   */
  personal?: boolean;
  /**
   * 设计小组组别 1 == 选择了设计小组组别 ， 0 == 没有选择设计小组组别，默认就是为 0
   */
  clothesDesigner?: string;
  /**
   * 当前查询的页码
   */
  pageNum?: number;
  /**
   * 当前查询单页的数据量
   */
  pageSize?: number;
  /**
   * 3D版师id
   */
  dimensionDesignerId?: string;
  /**
   * 3D版师名称
   */
  dimensionDesignerName?: string;
  /**
   * 是否展示取消订单
   */
  showCancel: boolean;
  /**
   * 3D任务分单开始时间开始
   */
  seperateStartTimeStart?: string;
  /**
   * 3D任务分单开始时间结束
   */
  seperateStartTimeEnd?: string;
  /**
   * 3D任务分单完成时间开始
   */
  seperateFinishTimeStart?: string;
  /**
   * 3D任务分单完成时间结束
   */
  seperateFinishTimeEnd?: string;
  /**
   * 3D任务提交时间开始
   */
  dimensionFinishTimeStart?: string;
  /**
   * 3D任务提交时间结束
   */
  dimensionFinishTimeEnd?: string;
}

export interface IDimensionPageRes {
  /**
   * 当前页码, 主要给 web 端做分页校验
   */
  page?: number;
  /**
   * 总数据量
   */
  total?: number;
  /**
   * 分页数据
   */
  list: IDimensionPageResListItem[];
}

export interface IDimensionPageResListItem {
  /**
   * 审版工艺师
   */
  reviewCraftsmanName?: string;
  processNodeDesc?: string;
  processNodeStateDesc?: string;
  allocateState?: string;
  /**
   * 纸样id
   */
  patternId?: string;
  /**
   * 3D分单状态 0:内部待进行(外部待接单) |1进行中 |2已完成
   */
  dimensionState?: string;
  patternFileList: IDimensionPageResListItemPatternFileListItem[];
  /**
   * 3D样版本状态数量 0:待上传 | >0上传版本,dimensionState状态不等于2的时候这里都是待提交-1，提交状态后就是：提交-n（任务状态展示逻辑）
   */
  dimensionVersion: string;
  /**
   * 板房id(1:内部,其他外部板房id)
   */
  roomId?: string;
  /**
   * 板房名字
   */
  roomName?: string;
  /**
   * 分单员id
   */
  allocateeId?: string;
  /**
   * 分单员名字
   */
  allocateeName?: string;
  /**
   * 是否外发(1:是,0:不是)
   */
  isOutsourced?: string;
  /**
   * 是否已分单(1:是,0:不是)
   */
  isAllocated?: string;
  /**
   * 尺寸版本数量统计 0:新建| >0纸样尺寸版本
   */
  sizeVersion?: string;
  /**
   * 纸样版本状态数量 0:待上传 | >0上传版本
   */
  patternVersion?: string;
  /**
   * 纸样url
   */
  patternUrl?: string;
  /**
   * 纸样文件名字
   */
  patternName?: string;
  /**
   * 分单状态 1:纸样,2:车版,3:纸样加车版
   */
  allocateType?: string;
  /**
   * 分单开始时间
   */
  seperateStartTime?: number;
  /**
   * 分单完成时间
   */
  seperateFinishTime?: number;
  /**
   * 首次分单完成时间
   */
  firstSeperateFinishTime?: number;
  /**
   * 3D样首次完成时间
   */
  firstFinishTime?: number;
  /**
   * 最后一个异常完结时间
   */
  lastExceptionDoneTime?: number;
  /**
   * 3D打板开始时间
   */
  dimensionStartTime?: number;
  /**
   * 3D打板进行中开始时间
   */
  dimensionOnTime?: number;
  /**
   * 3D打板完成时间
   */
  dimensionFinishTime?: number;
  /**
   * 创建人id
   */
  creatorId?: string;
  /**
   * 创建人名字
   */
  creatorName?: string;
  /**
   * 创建时间
   */
  createdTime?: number;
  /**
   * 完成时间
   */
  finishTime?: number;
  /**
   * 更新人id
   */
  reviserId?: string;
  /**
   * 更新人名字
   */
  reviserName?: string;
  /**
   * 更新时间
   */
  revisedTime?: number;
  /**
   * 设计版单id
   */
  prototypeId?: string;
  /**
   * 销售bdid
   */
  bdId?: string;
  /**
   * 销售bd编号
   */
  bdCode?: string;
  /**
   * 销售bd名字
   */
  bdName?: string;
  /**
   * 是否最新(同一加工单号最新的条) 0-否、1-是
   */
  isLatest?: string;
  /**
   * 版单详细表id
   */
  detailId?: string;
  /**
   * 尺码标准
   */
  sizeStandard?: string;
  /**
   * 样衣尺码
   */
  sampleSize?: string;
  /**
   * 版型要求
   */
  layoutRequirement?: string;
  /**
   * 销售群体
   */
  saleGroup?: string;
  /**
   * 客户款号
   */
  customerStyleCode?: string;
  /**
   * SKC（款）生成时间
   */
  skcCreatedTime?: number;
  /**
   * SPU生成时间
   */
  spuCreatedTime?: number;
  /**
   * 齐套签收时间
   */
  materialSignTime?: number;
  /**
   * 设计组code
   */
  designerGroupCode?: string;
  /**
   * 设计组
   */
  designerGroup?: string;
  /**
   * 客户尺寸信息
   */
  customerSizeList: IDimensionPageResListItemCustomerSizeListItem[];
  /**
   * 裁剪方法编码
   */
  cuttingMethodCode?: string;
  /**
   * 大货纸样url
   */
  designFileUrl?: string;
  /**
   * 大货纸样文件名字
   */
  designFileName?: string;
  /**
   * 尺寸首次版本
   */
  firstSizeCount?: string;
  /**
   * 尺寸总版本
   */
  newSizeCount?: string;
  /**
   * 纸样首版本
   */
  firstFileCount?: string;
  /**
   * 纸样首版本url
   */
  firstFileUrl?: string;
  /**
   * 纸样首版本名称
   */
  firstFileName?: string;
  /**
   * 纸样总版本
   */
  newFileCount?: string;
  /**
   * 纸样最新版本url
   */
  newFileUrl?: string;
  /**
   * 纸样最新版本名字
   */
  newFileName?: string;
  /**
   * 尺寸版本（最新尺寸）
   */
  sampleClothesSizeVersion?: string;
  /**
   * 纸样版本状态数量 0:待上传 | >0上传版本  （最新纸样）
   */
  sampleClothesPatternVersion?: string;
  /**
   * （最新纸样Url）
   */
  sampleClothesPatternUrl?: string;
  /**
   * （最新纸样名称）
   */
  sampleClothesPatternName?: string;
  /**
   * 是否打版: 0:不打版，1:打版
   */
  isMakeClothing?: boolean;
  /**
   * 3d图带地址
   */
  patternClothes3dPicWithUrl?: IDimensionPageResListItemPatternClothes3dPicWithUrl;
  /**
   * 版单id
   */
  clothesId: string;
  /**
   * 打版类型: 1-大货打版 2-正常打版 3-复色打版 4-补做打版
   */
  sampleType?: string;
  /**
   * 订单类型: 1-打版订单 2-设计订单 3-加工订单；1、2属于样衣，3属于生产(大货)
   */
  demandTaskType?: string;
  /**
   * 版本号
   */
  versionNum?: string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode?: string;
  /**
   * 原始加工单号
   */
  baseProcessCode?: string;
  /**
   * 客户图片
   */
  customerPictureList: string[];
  /**
   * 设计图片
   */
  designPictureList: string[];
  /**
   * 上架图
   */
  shelvePicture?: {
    /**
     * 样衣打版id
     */
    clothesId?: string;
    /**
     * spu上架图片
     */
    spuShelvePictureList: string[];
    /**
     * skc上架图片
     */
    skcShelvePictureList: string[];
  };
  /**
   * 打版件数
   */
  sampleAmount?: string;
  /**
   * 当前处理环节
   */
  processStep?: string;
  /**
   * 当前处理环节名称
   */
  processStepDesc?: string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: string;
  /**
   * 客户编号
   */
  purchaserCode?: string;
  /**
   * 客户名称
   */
  purchaserName?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 区域id
   */
  regionId?: string;
  /**
   * 区域名
   */
  regionName?: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: string;
  /**
   * 是否需要下采购（true:是,false/null:否）
   */
  isPurchase?: string;
  /**
   * 面辅料齐套状态(0-未流转、1-待签收、2-已签收)
   */
  materialState?: string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName?: string;
  /**
   * 开发交付日期
   */
  deliveryTime?: number;
  /**
   * 开发交付周期。如：T+3，此值就是3
   */
  deliveryPeriod?: string;
  /**
   * 期望交期
   */
  planDeliveryTime?: number;
  /**
   * 设计师id
   */
  designerId?: string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 跟单员id
   */
  merchandiserId?: string;
  /**
   * 跟单员名称
   */
  merchandiserName?: string;
  /**
   * 复色款号，不为""时代表复色版
   */
  makeSameDesignCode?: string;
  /**
   * 套版款：1 衍生款：2
   */
  styleReferType?: string;
  /**
   * 套版款/衍生款的设计款号
   */
  styleReferDesignCode?: string;
  /**
   * 环节创建时间（用于计算当前耗时【currentTime-processingStepCreatedTime】）
   */
  processingStepCreatedTime?: number;
  /**
   * 当前时间
   */
  currentTime?: number;
  /**
   * 二次工艺
   */
  craftList: IDimensionPageResListItemCraftListItem[];
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
  /**
   * 异常信息
   */
  anomaly?: IDimensionPageResListItemAnomaly;
  /**
   * 返修信息
   */
  repair?: IDimensionPageResListItemRepair;
  /**
   * 复版信息
   */
  redoInfo?: IDimensionPageResListItemRedoInfo;
  /**
   * 是否取消 0-否、1-是
   */
  isCancel?: string;
  /**
   * 是否完成 0-进行中、1-已完成
   */
  isDone?: string;
  /**
   * 复版原因
   */
  redoReason?: string;
  /**
   * 是否上新 1是  0否
   */
  onShelfStatus?: string;
  /**
   * 是否上架 1是  0否
   */
  putOnShelfStatus?: string;
  /**
   * 上架人(putOnShelfStatus=1时有值) --v4.12
   */
  putOnShelfPerson?: string;
  /**
   * bom文件名称（推款新增）
   */
  bomFileName?: string;
  /**
   * bom文件路径（推款新增）
   */
  bomFileUrl?: string;
  /**
   * 1-是 0-不是
   */
  isFob?: string;
  /**
   * 以价开款(单位：元)
   */
  paymentAtPrice?: string;
  /**
   * 需求内容
   */
  intentionContent?: string;
  /**
   * 原款-skc编码(需求引用款skc编码),自建SPU时无该字段
   */
  quoteDesignCode?: string;
  /**
   * 纸样改动大小, 100:无改动;110:小,120:大
   * {@link PatternChangeSizeEnum}
   */
  patternChangeSize?: string;
  /**
   * 参考款号
   */
  referenceDesignCode?: string;
  /**
   * 核算数据是否有更新,0:否,1:是
   */
  checkCountIsUpdate?: string;
  /**
   * 是否最新(同一加工单号最新的条) 0-否、1-是
   */
  sampleClothesIsLatest?: string;
  /**
   * 款式类别：0-平台 1-大客户
   */
  styleCategory?: string;
  /**
   * 制作方式
   * 0-仅纸样 1-实物样 2-3D样
   */
  makeClothesType?: string;
  /**
   * 3D打板任务id
   */
  dimensionId?: string;
  remark?: string;
  /** 3D版师 */
  dimensionDesignerName?: string;
  dimensionDesignerId?: string;
}

export interface IDimensionPageResListItemRedoInfo {
  /**
   * 样衣打版id
   */
  clothesId?: string;
  /**
   * 复版原因
   */
  redoReason?: string;
  /**
   * 复版责任方: 来源基础资料,传code; (1:版房原因、2:设计师原因、3:客户要求、4:面辅料履约;)
   */
  responsibleParty?: string;
  /**
   * 复版责任方名称
   */
  responsiblePartyName?: string;
  /**
   * 问题描述
   */
  questionDescription?: string;
}

export interface IDimensionPageResListItemRepair {
  /**
   * 样衣打版id
   */
  clothesId?: string;
  /**
   * 返修原因编码
   */
  repairReasonCode?: string;
  /**
   * 返修原因名称
   */
  repairReasonName?: string;
  /**
   * 返修原因描述
   */
  repairDescription?: string;
  /**
   * 返修时间
   */
  createdTime?: number;
}

export interface IDimensionPageResListItemAnomaly {
  /**
   * 样衣打版id
   */
  clothesId?: string;
  /**
   * 异常单号
   */
  anomalyCode?: string;
  /**
   * 异常原因类型
   */
  typeDescription?: string;
  /**
   * 异常描述
   */
  description?: string;
  /**
   * 责任人id
   */
  responsibleId?: string;
  /**
   * 责任人姓名
   */
  responsibleName?: string;
}

export interface IDimensionPageResListItemCraftListItem {
  /**
   * 工艺要求:  100:裁版前工艺 110:裁版后工艺
   */
  craftsRequire?: string;
  /**
   * 工艺环节名称
   * 如果有工艺环节，优先展示工艺环节
   * 没有工艺环节直接显示工艺要求
   */
  craftsProcessName?: string;
  /**
   * 二次工艺名称
   */
  nameList: string[];
}

export interface IDimensionPageResListItemPatternClothes3dPicWithUrl {
  /**
   * 3d正面图完整地址url
   */
  front3dPicUrl?: string;
  /**
   * 3d侧面图完整地址url
   */
  side3dPicUrl?: string;
  /**
   * 3d背面图完整地址url
   */
  back3dPicUrl?: string;
  /**
   * 样衣背面图完整地址url
   */
  frontSamplePicUrl?: string;
  /**
   * 样衣侧面图完整地址url
   */
  sideSamplePicUrl?: string;
  /**
   * 样衣背面图完整地址url
   */
  backSamplePicUrl?: string;
  /**
   * 3d正面图路径
   */
  front3dPicPath?: string;
  /**
   * 3d侧面图路径
   */
  side3dPicPath?: string;
  /**
   * 3d背面图路径
   */
  back3dPicPath?: string;
  /**
   * 样衣背面图路径
   */
  frontSamplePicPath?: string;
  /**
   * 样衣侧面图路径
   */
  sideSamplePicPath?: string;
  /**
   * 样衣背面图路径
   */
  backSamplePicPath?: string;
}

export interface IDimensionPageResListItemCustomerSizeListItem {
  /**
   * 部位编码
   */
  positionCode?: string;
  /**
   * 部位编码名字
   */
  positionName?: string;
  /**
   * 尺寸维度
   */
  dimension?: string;
  /**
   * 量法
   */
  measuringMethod?: string;
  /**
   * 客户尺寸
   */
  size?: string;
  /**
   * 样衣尺寸
   */
  sampleClothesSize?: string;
  /**
   * 纸样尺寸
   */
  patternSize?: string;
  /**
   * 允差范围
   */
  tolerance?: string;
}

export interface IDimensionPageResListItemPatternFileListItem {
  /**
   * 纸样版本号
   */
  patternVersion: string;
  /**
   * 纸样文件url
   */
  patternUrl: string;
  patternName: string;
}

/**
 * 撤回分单
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/1967
 */
export interface IDimensionRecallReq {
  /**
   * 纸样信息
   */
  list: IDimensionRecallReqListItem[];
}

export interface IDimensionRecallReqListItem {
  /**
   * 样衣打版id
   */
  clothesId: string;
  /**
   * 3D打板任务id
   */
  dimensionId: string;
}

/**
 * 任务编辑
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/1964
 */
export interface IDimensionEditReq {
  /**
   * 3D打板任务id
   */
  dimensionId: string;
  /**
   * 样衣打版id
   */
  clothesId: string;
  /**
   * 3D文件url
   */
  dimensionUrl: string;
  /**
   * 3D文件名称
   */
  dimensionName?: string;
  dimensionPicture: IDimensionEditReqDimensionPicture;
}

export interface IDimensionEditReqDimensionPicture {
  /**
   * 背面图，pictureOrientationEnum :  "back"
   */
  backPicture: IDimensionDimensionPicture;
  /**
   * 正面图（格式同上），pictureOrientationEnum :  "front"，
   */
  frontPicture: IDimensionDimensionPicture;
  /**
   * 侧面图（格式同上）,pictureOrientationEnum :  "side"
   */
  sidePicture: IDimensionDimensionPicture;
  /**
   * 细节图（格式同上）
   */
  detailPictures: IDimensionDimensionPicture;
}

export interface IDimensionDimensionPicture {
  /**
   * back
   */
  pictureOrientationEnum: string;
  urls: {
    /**
   * 图片路径
   */
    url: string;
  }[];
}

export interface IDimensionEditRes {
  dimensionPicture: IDimensionEditResSamplePicture;
}

export interface IDimensionEditResSamplePicture {
  /**
   * 背面照
   */
  backPicture: IDimensionDimensionPicture;
  /**
   * 正面图（格式同上）
   */
  frontPicture: IDimensionDimensionPicture;
  /**
   * 侧面图（格式同上）
   */
  sidePicture: IDimensionDimensionPicture;
  /**
   * 细节图（格式同上）
   */
  otherPictures: IDimensionDimensionPicture;
  /**
   * 3d打版任务id
   */
  dimensionId: string;
}

/**
 * 3D任务详情
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/1962
 */
export interface IDimensionDetailReq {
  /**
   * 3D打板任务id
   */
  dimensionId: string;
}

export interface IDimensionDetailReqListItem {
  /**
   * 样衣打版id
   */
  clothesId: string;
  /**
   * 3D打板任务id
   */
  dimensionId: string;
}

export interface IDimensionDetailRes {
  dimensionPicture: IDimensionDetailResSamplePicture;
  /**
   * 3d打版任务id
   */
  dimensionId: string;
  /**
    * 3D文件url
    */
  dimensionUrl: string;
  /**
    * 3D文件名称
    */
  dimensionName: string;
}

export interface IDimensionDetailResSamplePicture {
  /**
   * 背面照
   */
  backPicture: IDimensionDimensionPicture;
  /**
   * 正面图（格式同上）
   */
  frontPicture: IDimensionDimensionPicture;
  /**
   * 侧面图（格式同上）
   */
  sidePicture: IDimensionDimensionPicture;
  /**
   * 细节图（格式同上）
   */
  detailPictures: IDimensionDimensionPicture;
  /**
   * 3d打版任务id
   */
  dimensionId: string;
}

export interface IDimensionDetailResSamplePictureBackPicture {
  /**
   * back
   */
  pictureOrientationEnum: string;
  urls: {
    /**
   * 图片url
   */
    url: string;
  }[];
}

/**
 * 任务转交
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/1965
 */
export interface IDimensionTaskTransferReq {
  /**
   * 纸样信息
   */
  list: IDimensionTaskTransferReqListItem[];
  /**
   * 3D版师id
   */
  dimensionDesignerId: string;
  /**
   * 3D版师名称
   */
  dimensionDesignerName: string;
}

export interface IDimensionTaskTransferReqListItem {
  /**
   * 样衣打版id
   */
  clothesId: string;
  /**
   * 3D打板任务id
   */
  dimensionId: string;
}

/**
 * 开始分单
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/1966
 */
export interface IDimensionAssignReq {
  /**
   * 纸样信息
   */
  processInfoList: IDimensionAssignReqProcessInfoListItem[];
  /**
   * 板房id（外部分单必传），如果是内部传1
   */
  roomId?: string;
  /**
   * 板房名称（外部分单必传）
   */
  roomName?: string;
  /**
   * 3D版师id（内部分单必传）
   */
  dimensionDesignerId?: string;
  /**
   * 3D版师名称（内部分单必传）
   */
  dimensionDesignerName?: string;
}

export interface IDimensionAssignReqProcessInfoListItem {
  /**
   * 3d打版任务id
   */
  dimensionId: string;
  clothesId: string;
}

/**
 * 查询3D版师订单数量（分页）
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2850
 */
export interface IDimensionDesignerRoomReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 3D分单状态。（0:内部处理 1:外部处理）
   */
  allocateState: string;
  /**
   * 打版类型: 1-任务分单
   */
  sampleType: '1' | '2' | '3' | '4';
  /**
   * 纸样师或板房名字
   */
  designerOrRoom?: string;
  /**
   * 区域id
   */
  regionId: string;
}

export interface IDimensionDesignerRoomRes {
  page?: number;
  total?: number;
  list: IDimensionDesignerRoomResListItem[];
}

export interface IDimensionDesignerRoomResListItem {
  /**
   * 3D版师id或版房id
   */
  designerOrRoomId?: string;
  /**
   * 3D版名称或版房名称
   */
  designerOrRoomName?: string;
  /**
   * 订单数
   */
  orderCount?: string;
}
