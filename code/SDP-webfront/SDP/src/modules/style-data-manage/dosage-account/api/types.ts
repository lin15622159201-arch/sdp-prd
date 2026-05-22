import { YES_NO_ENUM, TIME_CONSUMING_TYPE_ENUM } from '@/constant';
import { SKC_TYPE_ENUM } from '@/modules/design-center/style-manage/constant';
import {
  ALLOCATE_STATE_ENUM,
  CHECK_COUNT_STATE_ENUM,
  CRAFTS_REQUIRE_ENUM,
  MATERIAL_DEMAND_TYPE_ENUM,
  ROOM_ALLOCATE_STATE
} from '../constant';
import { COMMODITY_TYPE_ENUM } from '@/modules/design-center/inspiration-demand/constant';

export interface IGetDosageListReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 创建开始时间
   */
  countCreatedTimeStart?: string;
  /**
   * 创建结束时间
   */
  countCreatedTimeEnd?: string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: YES_NO_ENUM;
  /**
   * 款式类型(1:正常款,2:复色款)
   */
  skcType?: SKC_TYPE_ENUM;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode?: string;
  /**
   * 设计师id【设计师】
   */
  designerIdList?: string[];
  /**
   * 设计组编号
   */
  designerGroupCodeList?: string[];
  /**
   * 用量核算状态 WAIT_CALCULATE 待核算 CALCULATED 已核算
   */
  checkCountState?: CHECK_COUNT_STATE_ENUM | '';
  /**
   * 核算师ID
   */
  checkerId?: string;
  /**
   * 是否外发 1：外发 0：内部
   */
  isOutsourced?: YES_NO_ENUM;
  /**
   * 是否已分单(1:是,0:不是)
   */
  isAllocated?: YES_NO_ENUM;
  /**
   * 分单员id
   */
  allocateeIdList?: string[];
  /**
   * 纸样分单id(外部分单,内部分单)
   */
  roomIdList?: string[];
  /**
   * 分单状态
   */
  allocateState?: ALLOCATE_STATE_ENUM | '';
  /**
   * 接单状态(0:未接单,1:已接单)
   */
  checkCountReceiving?: YES_NO_ENUM;
  /**
   * 创建时间-开始
   */
  createdTimeStart?: string;
  /**
   * 创建时间-结束
   */
  createdTimeEnd?: string;
  /**
   * 核价开始时间
   */
  finishTimeStart?: string;
  /**
   * 核价结束时间
   */
  finishTimeEnd?: string;
  /**
   * 是否查询我的 true=我的、false/null=全部
   */
  personal?: boolean;
  /**
   * 是否待更新 0否 1是
   */
  isUpdate?: YES_NO_ENUM;
  timeConsumingStart?: string;
  timeConsumingEnd?: string;
  timeConsumingType?: TIME_CONSUMING_TYPE_ENUM;
  /**
   * 完成耗时开始时间 天
   */
  timeConsumingStartDay?: string;
  /**
   * 完成耗时结束时间 天
   */
  timeConsumingEndDay?: string;
  /**
   * 完成耗时开始时间 时
   */
  timeConsumingStartHour?: string;
  /**
   * 完成耗时结束时间 时
   */
  timeConsumingEndHour?: string;
  /**
   * 完成耗时开始时间 分
   */
  timeConsumingStartMinute?: string;
  /**
   * 完成耗时结束时间 分
   */
  timeConsumingEndMinute?: string;
  /**
   * 是否最新数据(1-是、0-否), 用来避免分组查询
   */
  isLatest?: string;
  /**
   * 版本号
   */
  versionNum?: string;
}
export interface IGetDosageListRes {
  page?: number;
  total?: number;
  list: {
    /**
     * 版本号
     */
    versionNum?: string;
    /**
     * 客户图片
     */
    customerPictureList: string[];
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
     * 款式类型(1:正常款,2:复色款)
     */
    skcType?: SKC_TYPE_ENUM;
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
     * 是否二次工艺(1:是,0:不是)
     */
    isCraft?: YES_NO_ENUM;
    /**
     * 设计师id
     */
    designerId?: string;
    /**
     * 设计师名称
     */
    designerName?: string;
    /**
     * 二次工艺
     */
    craftList: {
      /**
       * 工艺要求:  100:裁版前工艺 110:裁版后工艺
       */
      craftsRequire: CRAFTS_REQUIRE_ENUM;
      /**
       * 工艺环节名称
       * 如果有工艺环节，优先展示工艺环节
       * 没有工艺环节直接显示工艺要求
       */
      craftsProcessName: string;
      /**
       * 二次工艺名称
       */
      nameList: string[];
    }[];
    state?: string;
    /**
     * 裁剪方法
     */
    cuttingMethod?: string;
    /**
     * 是否取消 0-否、1-是
     */
    isCancel?: YES_NO_ENUM;
    /**
     * 核算（用量）表ID
     */
    checkCountId: string;
    /**
     * 最新BOM ID
     */
    bomId?: string;
    /**
     * 纸样版本
     */
    patternVersion?: string;
    /**
     * 纸样文件名字
     */
    patternName?: string;
    /**
     * 纸样url
     */
    patternUrl?: string;
    /**
     * 用量师ID
     */
    checkerId?: string;
    /**
     * 用量师名称
     */
    checkerName?: string;
    /**
     * 用量核算状态 WAIT_CALCULATE 待核算 CALCULATED 已核算
     */
    checkCountState?: CHECK_COUNT_STATE_ENUM;
    /**
     * 唛架图
     */
    markFramePictureList: string[];
    /**
     * 完成时间
     */
    finishTime?: number;
    /**
   * 创建时间
   */
    createdTime?: number;
    /**
   * 分单开始时间
   */
    seperateStartTime?: number;
    /**
   * 分单完成时间
   */
    seperateFinishTime?: number;
    /**
     * 首次分单时间
     */
    firstSeperateFinishTime?: number;
    /**
   * 接单开始时间
   */
    checkCountStartTime?: number;
    /**
   * 接单完成时间
   */
    checkCountFinishTime?: number;
    /**
   * 首次创建时间
   */
    firstCreatedTime?: number;
    /**
   * 首次提交时间
   */
    firstFinishTime?: number;
    /**
     * 是否待更新 0否 1是
     */
    isUpdate?: YES_NO_ENUM;
    /**
     * 是否最新数据(1-是、0-否)
     */
    isLatest?: YES_NO_ENUM;
    /**
     * 系统版本
     */
    sysVersion?: string;
    /**
     * bom是否更新
     */
    isBomUpdate?: string;
    /**
     * 唛架图{多张以英文逗号分隔}
     */
    markFramePicture?: string;
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
     * 接单状态(0:未接单,1:已接单)
     */
    checkCountReceiving?: string;
    /**
     * 板房id(1:内部,其他外部板房id)
     */
    roomId?: string;
    /**
     * 板房名字
     */
    roomName?: string;
  }[];
}

export interface IGetMakeRoomsReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 纸样分单状态。（1:内部纸样 2:外发纸样）
   */
  allocateState: ROOM_ALLOCATE_STATE;
  /**
   * 纸样师或板房名字
   */
  makerOrRoom?: string;
  /**
   * 区域id
   */
  regionId?: string;
}
export interface IGetMakeRoomsRes {
  page?: number;
  total?: number;
  list: {
    /**
     * 核算师id或版房id
     */
    makerOrRoomId: string;
    /**
     * 核算师名称或版房名称
     */
    makerOrRoomName: string;
    /**
     * 订单数
     */
    orderCount: string;
  }[];
}

export interface ICheckCountSplittingReq {
  checkCountIds: string[];
  /**
   * 板房id(0未流转的,内部分单的话 id是1,其他id为外部板房的id)
   */
  roomId: string;
  /**
   * 板房名称
   */
  roomName: string;
}

export interface IGetCheckCountStatisticsRes {
  /**
   * 已分单
   */
  allocatedCount?: string;
  /**
   * 未分单
   */
  unallocatedCount?: string;
  /**
   * 内部未核价
   */
  internalUncheckedCount?: string;
  /**
   * 内部已核价
   */
  internalCheckedCount?: string;
  /**
   * 外部未核价
   */
  externalUncheckedCount?: string;
  /**
   * 外部已核价
   */
  externalCheckedCount?: string;
  /**
   * 外部未接单
   */
  externalUnReceivingCount?: string;
}

export interface IGetDosageInfoReq {
  /**
   * 主键
   */
  checkCountId: string;
}
export interface IGetDosageInfoRes {
  /**
   * 版本号
   */
  versionNum?: string;
  /**
   * 客户图片
   */
  customerPictureList: string[];
  /**
   * 款式类型(1:正常款,2:复色款)
   */
  skcType?: SKC_TYPE_ENUM;
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
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: YES_NO_ENUM;
  /**
   * 设计师id
   */
  designerId?: string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 二次工艺
   */
  craftList: {
    /**
     * 工艺要求:  100:裁版前工艺 110:裁版后工艺
     */
    craftsRequire?: CRAFTS_REQUIRE_ENUM;
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
  }[];
  state?: string;
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
  /**
   * 核算（用量）表ID
   */
  checkCountId?: string;
  /**
   * 最新BOM ID
   */
  bomId?: string;
  /**
   * 用量核算状态 WAIT_CALCULATE 待核算 CALCULATED 已核算
   */
  checkCountState?: CHECK_COUNT_STATE_ENUM;
  /**
   * 唛架图
   */
  markFramePictureList: string[];
  /**
   * bom物料列表
   */
  bomOrderMaterialList: {
    /**
     * bom物料ID
     */
    bomMaterialId?: string;
    /**
     * bomID
     */
    bomId?: string;
    /**
     * bom物料类型: 1-面料; 2-辅料
     */
    bomMaterialType?: string;
    /**
     * 设计款物料项目名
     */
    prototypeMaterialName: string;
    /**
     * 使用部位,字典code
     */
    partUse?: string | string[];
    /**
     * 使用部位,字典值 多值以逗号隔开 ---自选物料0.1
     */
    partUseName?: string;
    /**
     * 裁剪方式code
     */
    cuttingMethod?: string;
    /**
     * 裁剪方式名  ---自选物料0.1
     */
    cuttingMethodName?: string;
    /**
     * 用量核算
     */
    dosageAccount?: string;
    /**
     * bom物料备注列表
     */
    materialRemarkList?: {
      /**
       * 备注ID
       */
      designRemarksId?: string;
      /**
       * 备注信息
       */
      remark?: string;
      /**
       * 暂存状态: 0:非暂存; 1,暂存; (默认0)
       */
      transientState?: string;
      /**
       * 操作人id
       */
      creatorId?: string;
      /**
       * 操作人名称
       */
      createdName?: string;
      /**
       * 创建时间
       */
      createdTime?: number;
    }[];
    /**
     * 需求单id
     * 「已废弃」
     */
    demandId?: string;
    /**
     * 需求单编号
     * 「已废弃」
     */
    demandCode?: string;
    /**
     * 需求序号
     * 「已废弃」
     */
    demandTag?: string;
    /**
     * 辅料关联的面料tag
     * 「已废弃」
     */
    fabricDemandTag?: string;
    /**
     * 需求类型: 1, 面料; 2, 辅料; 3:特殊辅料; 4:辅料找料 ---V.3.11(添加4类型)
     */
    demandType?: MATERIAL_DEMAND_TYPE_ENUM;
    /**
     * 需求匹配单id
     * 「已废弃」
     */
    matchId?: string;
    /**
     * 需求匹配单编码
     * 「已废弃」
     */
    matchCode?: string;
    /**
     * 商品类型: PURE净色 FLOWER花型 ACCESSORIES : 特殊辅料：SPECIAL_ACCESSORIES   ---0421-V.1.8.4
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
     * 类目code(分类以"[-]"隔开)（如：ACCESSORIES[-]21[-]211）
     */
    categoryCode?: string;
    /**
     * 类目名(分类以"[-]"隔开)（如：辅料[-]扣件[-]对勾（勾扣））
     */
    categoryName?: string;
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
    matchPictureList?: string[];
    /**
     * 销售价格(辅料)
     */
    matchSalePrice?: string;
    /**
     * 销售单位(辅料)
     */
    matchPurchaseUnitName?: string;
    /**
     * 包装数量(辅料)
     */
    packNumber?: string;
    /**
     * 辅料主单位(对应履约-包装计价单位名称)  ---211208-v1.1
     */
    packUnitName?: string;
    /**
     * 辅料副单位(对应履约-包装计价副单位名称)  ---211208-v1.1
     */
    packAssistantUnitName?: string;
    /**
     * 辅料最小价格  ---211208-v1.1
     */
    minPrice?: string;
    /**
     * 辅料最小单位  ---211208-v1.1
     */
    minPriceUnit?: string;
    /**
     * 辅料属性集合(json数据)_用户选择的
     */
    skuAttrs?: string;
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
     * 色号类别: 0,非齐料仓色号; 1, 齐料仓色号(面料)
     */
    colorType?: string;
    /**
     * 齐料仓信息
     */
    warehouseColorInfo?: {
      /**
       * sku信息的id
       */
      skuId?: string;
      /**
       * 色号
       */
      colorNumber?: string;
      /**
       * sku编号
       */
      skuCode?: string;
      /**
       * 可用数量 实际-冻结-已出
       */
      remainingQuantity?: string;
      /**
       * sku颜色描述
       */
      colorNumberDesc?: string;
      /**
       * sku色系
       */
      colorSystem?: string;
      /**
       * 所在仓库
       */
      warehouseName?: string;
      /**
       * 所属区域
       */
      belongArea?: unknown;
      /**
       * 供应商所属区域
       */
      supplierRegion?: string;
      /**
       * 仓库区域ID
       */
      regionId?: string;
    };
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
     * 销售空差(面料)    ---设计打版2.1-0615
     */
    matchPurchaseGap?: string;
    /**
     * 足米价(面料)  --211208-v1.1
     */
    meterPrice?: string;
    /**
     * 足米价单位(面料)   ---211208-v1.1
     */
    meterPriceUnit?: string;
    /**
     * 回复方式(匹配来源，（外匹配1 内匹配2 复用匹配3 设计师匹配4 指定供应商匹配5）)
     */
    matchSource?: string;
    /**
     * 回复人员
     */
    matcherName?: string;
    /**
     * 匹配反馈备注
     */
    matchRemark?: string;
    /**
     * 匹配未完成原因
     */
    unfinishedReason?: string;
    /**
     * 色卡图片: 设计师上传的色卡图片
     */
    colorCardPictureList?: string[];
    /**
     * 色卡图片: 设计师上传的色卡图片(采购申请专用的)
     */
    purchaseColorCardPictureList?: string[];
    /**
     * 匹配是否确认，0 否，是1
     */
    isConfirm?: string;
    /**
     * bom物料排序
     */
    sort?: string;
    /**
     * 用量核算-幅宽确认值 ---1222-v1.2
     */
    widthConfirm?: string;
    /**
     * 供应商ID  ---0923-推款优化v0.1
     */
    supplierId: string;
    /**
     * 供应商编号  ---0923-推款优化v0.1
     */
    supplierCode: string;
    /**
     * 供应商名称  ---0923-推款优化v0.1
     */
    supplierName: string;
    /**
     * 开票状态(合作关系)-对应OPS字典invoice_dict的编码值  ---0923-推款优化v0.1
     */
    invoiceState?: string;
    /**
     * 履约面辅料价格回复时间 ---1018-优化v3.3
     */
    priceReplyTime?: string;
    /**
     * 履约面辅料价格失效时间 ---1018-优化v3.3
     */
    priceInvalidTime?: string;
    /**
     * 商品进货价 单位元    commodityType= "SPECIAL_ACCESSORIES" 特殊辅料独有 ---0421-V.1.8.4
     */
    purchasePrice?: string;
    /**
     * 商品销售价 单位元    commodityType= "SPECIAL_ACCESSORIES" 特殊辅料独有 ---0421-V.1.8.4
     */
    skuPrice?: string;
    /**
     * 特殊辅料标识ID，用于区分上下版本关系   commodityType= "SPECIAL_ACCESSORIES" 特殊辅料独有 ---0421-V.1.8.4
     */
    accessoriesFlagId?: string;
    /**
     * 二次工艺信息列表
     */
    craftDemandInfoList?: {
      /**
       * 工艺需求主键id
       */
      craftDemandId?: string;
      /**
       * 设计款号
       */
      designCode?: string;
      /**
       * bomID
       */
      bomId?: string;
      /**
       * bom详情ID
       */
      bomMaterialId?: string;
      /**
       * 工艺状态 100:已提交 190:已关闭
       */
      state?: '100' | '190' | '9999';
      /**
       * 材料类型 一级分类 FABRIC:面料 ACCESSORIES:辅料
       */
      category1?: string;
      /**
       * 材料类型 二级分类
       */
      category2?: string;
      /**
       * 材料类型 三级分类
       */
      category3?: string;
      /**
       * 工艺要求:  100:裁版前工艺 110:裁版后工艺
       */
      craftsRequire?: string;
      /**
       * 承接方式,{CRAFT_GROUP:工艺组,CUSTOMER:客户}
       */
      undertakeType?: string;
      /**
       * 客户昌否提供工艺厂 PROVIDE 客户提供工艺厂信息 , NO_PROVIDE 客户不提供工艺厂信息
       */
      customerSupplyFactory?: string;
      /**
       * 内部工艺厂ID
       */
      innerFactoryId?: string;
      /**
       * 工艺厂名,外部独有
       */
      factoryName?: string;
      /**
       * 工艺承接者-联系人
       */
      contactName?: string;
      /**
       * 工艺承接者-工厂联系电话
       */
      contactPhone?: string;
      /**
       * 工艺承接者-所在省份
       */
      contactProvince?: string;
      /**
       * 工艺承接者-所在城市
       */
      contactCity?: string;
      /**
       * 工艺承接者-所在区/县
       */
      contactRegion?: string;
      /**
       * 工艺承接者-详细地址
       */
      contactDetailAddress?: string;
      /**
       * 工艺图片，最多9张
       */
      pictureList: string[];
      /**
       * 位置要求
       */
      positionRequirement?: string;
      /**
       * 尺寸要求
       */
      sizeRequirement?: string;
      /**
       * 颜色要求
       */
      colorRequirement?: string;
      /**
       * 克重要求
       */
      weightRequirement?: string;
      /**
       * 其他工艺要求
       */
      otherRequirement?: string;
      /**
       * 工艺关联面料、辅料需求ID
       */
      relationDemandId?: string;
      /**
       * 第三方工艺需求ID
       */
      thirdPartyCraftDemandId?: string;
      /**
       * 第三方工艺需求编号 ---220421-v1.8.4
       */
      thirdPartyCraftDemandCode?: string;
      /**
       * 样衣工艺周期,单位默认天  -- v3.20.3
       */
      sampleCraftCycle?: string;
      /**
       * 样衣工艺周期单位,单位默认天  -- v3.20.3
       */
      sampleCraftCycleUnit?: string;
      /**
       * 大货工艺周期,单位默认天  -- v3.20.3
       */
      bulkCraftCycle?: string;
      /**
       * 大货工艺周期单位,单位默认天  -- v3.20.3
       */
      bulkCraftCycleUnit?: string;
      /**
       * 打版价单位
       */
      sampleUnit?: string;
      /**
       * 打版价
       */
      samplePrice?: string;
      /**
       * 大货价单位
       */
      bulkUnit?: string;
      /**
       * 大货价
       */
      bulkPrice?: string;
      /**
       * 创建人id
       */
      creatorId?: string;
      /**
       * 创建时间
       */
      createdTime?: number;
      /**
       * 创建人名称
       */
      creatorName?: string;
      /**
       * 物料需求id
       */
      materialDemandId?: string;
      /**
       * 打版信息id
       */
      prototypeId?: string;
      /**
       * 工艺单位
       */
      craftUnit?: string;
      /**
       * 是否临时保存 0:否 1:是
       */
      isTransient?: string;
    }[];
    /**
     * 采购次数
     */
    purchaseApplyFollowCount?: string;
    /**
     * 用量核算单位    ---设计打版2.1-0615
     */
    dosageAccountUnit?: string;
    /**
     * 损耗率   ---设计打版2.1-0615
     */
    attritionRate?: string;
    /**
     * 大货进价 单位元   ---设计打版2.1-0615
     * 面料: 足米价; 辅料: 最小价格;
     */
    bulkPurchasePrice?: string;
    /**
     * 大货进价单位，指 米 或 千克  ---设计打版2.1-0615
     * 面料: 足米价单位; 辅料: 最小价格单位;
     */
    bulkPurchasePriceUnit?: string;
    /**
     * 物料快照id  ---自选物料0.1
     */
    materialSnapshotId?: string;
    /**
     * bom物料上下文ID，用于关联上下版本关系    ---自选物料0.1
     */
    materialContextId?: string;
    /**
     * 是否无工艺 1-是  0-否
     */
    isNoCraft?: string;
    /**
     * 好料网-是否启用：{0-否 ,1-是}
     */
    enableState?: string;
    /**
     * 好料网-上架状态：{0-否 ,1-是}
     */
    onShelfState?: string;
    /**
     * 供应链物料是否存在: 0-不存在; 1-存在; -- 3.20.2 (该字段用于bom引用的场景)
     */
    supplyExistState?: string;
    /**
     * bom物料ID(复制, 前端处理引用物料使用)
     */
    bomMaterialIdCopy?: string;
    /**
     * 辅料类型code【字典 pims_accessory_material_type】 ---自选物料0.1
     */
    materialTypeCode?: string;
    /**
     * 辅料类型name     ---自选物料0.1
     */
    materialType?: string;
    /**
     * bom物料需求id --v3.11
     */
    bomMaterialDemandId?: string;
    /**
     * 对色/包料状态: 0-无; 1-对色; 2-包料; (默认0) --v3.11
     */
    colorMatchMaterialState?: string;
    /**
     * 对色/包料对应物料名 --v3.11
     */
    colorMatchMaterialName?: string;
    /**
     * 对色/包料对应物料id --v3.11
     */
    colorMatchMaterialId?: string;
    /**
     * 物料状态:100-正常; 190-已关闭; 200-找料中 --v3.11
     */
    materialState?: string;
    /**
     * 被替换的bom物料id --v3.11
     */
    replaceBomMaterialId?: string;
    /**
     * 样衣采购周期,单位默认天  -- v3.20.3
     */
    samplePurchasingCycle?: string;
    /**
     * 样衣采购周期单位,单位默认天  -- v3.20.3
     */
    samplePurchasingCycleUnit?: string;
    /**
     * 大货采购周期,单位默认天  -- v3.20.3
     */
    bulkPurchasingCycle?: string;
    /**
     * 大货采购周期单位,单位默认天  -- v3.20.3
     */
    bulkPurchasingCycleUnit?: string;
    /**
     * 是否为企划料   -- v4.19.1
     * 1：是
     * 0：否
     * null：否
     */
    isPlanning?: string;
    /**
     * 波段时间   -- v4.19.1
     */
    bandDate?: number;
    /**
     * JV 面料识别物料id
     */
    identifyMaterialId?: string;
    /**
     * 商品编码 - 混淆加密
     * - 对接淘系
     */
    encryptionCommodityCode?: string;
    /**
     * skuCode - 混淆加密
     *  - 对接淘系
     */
    encryptionSkuCode?: string;
    /**
     * 品名 - 混淆加密
     *  - 对接淘系
     */
    encryptionCommodityName?: string;
    /**
     * 识别选中
     *  - 对接淘系
     */
    identifySelection?: boolean;
    /**
     * 物料图,多值以逗号隔开
     *  - 对接淘系
     */
    materialImg?: string;
    /**
     * 类目code(分类以"-"隔开)（如：ACCESSORIES-21-211）
     */
    demandCategoryCode?: string;
    /**
     * 类目名(分类以"-"隔开)（如：辅料-扣件-对勾（勾扣））
     */
    demandCategoryName?: string;
  }[];
  /**
   * 是否最新数据(1-是、0-否)
   */
  isLatest?: YES_NO_ENUM;
  /**
   * 工艺信息
   */
  materialCraftList: {
    /**
     * bom物料备注列表
     */
    materialRemarkList: {
      /**
       * 备注ID
       */
      designRemarksId?: string;
      /**
       * 备注信息
       */
      remark?: string;
      /**
       * 暂存状态: 0:非暂存; 1,暂存; (默认0)
       */
      transientState?: string;
      /**
       * 操作人id
       */
      creatorId?: string;
      /**
       * 操作人名称
       */
      createdName?: string;
      /**
       * 创建时间
       */
      createdTime?: number;
    }[];
    /**
     * 设计款物料项目名
     */
    prototypeMaterialName?: string;
    /**
     * 材料类型 一级分类 FABRIC:面料 ACCESSORIES:辅料
     */
    category1?: string;
    /**
     * 材料类型 二级分类
     */
    category2?: string;
    /**
     * 材料类型 三级分类
     */
    category3?: string;
    /**
     * 工艺要求:  100:裁版前工艺 110:裁版后工艺
     */
    craftsRequire?: CRAFTS_REQUIRE_ENUM;
    /**
     * 二次工艺次序编号
     */
    craftsProcessCode?: string;
    /**
     * 二次工艺次序名称
     */
    craftsProcessName?: string;
    /**
     * 大货价单位
     */
    bulkUnit?: string;
    /**
     * 物料清单id
     */
    bomMaterialId?: string;
    /**
     * 工艺核算用量
     */
    craftDosageAccount?: string;
    /**
     * 工艺损耗率（单位%）
     */
    craftWaste?: string;
    /**
     * 工艺需求主键id
     */
    craftDemandId?: string;
    /**
     * 使用部位,字典值 多值以逗号隔开 ---自选物料0.1
     */
    partUseName?: string;
    /**
     * 位置要求
     */
    positionRequirement?: string;
    /**
     * 内部工艺厂ID
     */
    innerFactoryId?: string;
    /**
     * 工艺厂名,外部独有
     */
    factoryName?: string;
    /**
     * 第三方工艺需求ID
     */
    thirdPartyCraftDemandId?: string;
  }[];
  /**
   * 是否打版: 0:不打版，1:打版
   */
  isMakeClothing?: YES_NO_ENUM;
  /**
   * skc&spu基础信息
   */
  skcInfoVo?: {
    /**
     * 成衣SPU(款式SPU)
     */
    styleCode?: string;
    /**
     * 设计款号
     */
    designCode?: string;
    /**
     * 设计图-首图
     */
    designPicture?: string;
    /**
     * 设计图
     */
    designPictureList: string[];
    /**
     * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
     */
    category?: string;
    /**
     * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
     */
    categoryName?: string;
    /**
     * 颜色
     */
    color?: string;
    /**
     * 款类型: 1--正常款 2-复色款
     */
    skcType?: string;
    /**
     * 设计师id【设计师】
     */
    designerId?: string;
    /**
     * 设计师编号【设计师】
     */
    designerCode?: string;
    /**
     * 设计师名称【设计师】
     */
    designerName?: string;
    /**
     * 设计组
     */
    designerGroup?: string;
    /**
     * 设计组code
     */
    designerGroupCode?: string;
    /**
     * 供给方式-OPS
     */
    supplyModeName?: string;
    /**
     * 供给方式编码
     */
    supplyModeCode?: string;
    /**
     * 商品类型
     */
    productType?: string;
    /**
     * 货盘类型名称
     */
    palletTypeName?: string;
    /**
     * 货盘类型编码
     */
    palletTypeCode?: string;
    /**
     * 品质等级
     */
    qualityLevel?: string;
    /**
     * 品质等级编号
     */
    qualityLevelCode?: string;
    /**
     * 织造方式code
     */
    weaveModeCode?: string;
    /**
     * 织造方式
     */
    weaveMode?: string;
    /**
     * 建议售价
     */
    suggestedSellingPrice?: string;
    /**
     * 波段编码
     */
    waveBandCode?: string;
    /**
     * 波段名称
     */
    waveBandName?: string;
    /**
     * 款式风格名称
     */
    clothingStyleName?: string;
    /**
     * 款式风格编码
     */
    clothingStyleCode?: string;
  };
  /**
   * 核算师ID
   */
  checkerId?: string;
  /**
   * 核算师名称
   */
  checkerName?: string;
  /**
   * 完成时间
   */
  finishTime?: number;
}

export interface IUpdateDosageInfoReq {
  /**
   * 设计款号
   */
  designCode: string;
  /**
   * bomId
   */
  bomId: string;
  /**
   * 物料-更新信息(面辅料与特辅)
   */
  updateList: {
    /**
     * 物料清单id
     */
    bomMaterialId: string;
    /**
     * 用量核算-幅宽确认值(面料)
     */
    widthConfirm?: string;
    /**
     * 核算用量
     */
    dosageAccount: string;
    /**
     * 用量核算单位
     */
    dosageAccountUnit: string;
    /**
     * 损耗率
     */
    attritionRate?: string;
  }[];
  /**
   * 特辅-新增信息
   */
  saveList: {
    /**
     * 核算环节自定义的唯一物料id
     */
    checkCountUnitId: string;
    /**
     * 物料需求名称 如:特辅A
     */
    name: string;
    /**
     * 物料需求名code
     */
    nameCode: string;
    /**
     * SpuID
     */
    spuId: string;
    /**
     * SPU编码
     */
    spuCode: string;
    /**
     * 商品名称
     */
    spuName: string;
    /**
     * SKU ID
     */
    skuId: string;
    /**
     * sku编码
     */
    skuCode: string;
    /**
     * 供应商id
     */
    supplierId: string;
    /**
     * 供应商名称
     */
    supplierName: string;
    /**
     * 供应商编码
     */
    supplierCode: string;
    /**
     * 开票状态(合作关系)-对应OPS字典invoice_dict的编码值  ---0923-推款优化v0.1
     */
    invoiceState: string;
    /**
     * 包装数量(辅料)  ---0923-推款优化v0.1
     */
    packNumber: string;
    /**
     * 包装计价单位名称  ---0923-推款优化v0.1
     */
    packUnitName: string;
    /**
     * 包装计价副单位名称  ---0923-推款优化v0.1
     */
    packAssistantUnitName: string;
    /**
     * 辅料最小价格  ---0923-推款优化v0.1
     */
    minPrice: string;
    /**
     * 辅料最小单位  ---0923-推款优化v0.1
     */
    minPriceUnit: string;
    /**
     * 商品货号  ---0923-推款优化v0.1
     */
    commodityNumber: string;
    /**
     * SPU城市名称
     */
    spuCityName: string;
    /**
     * 特殊辅料属性集合(json数据)
     */
    skuAttrs: string;
    /**
     * 进价单位
     */
    saleUnit: string;
    /**
     * SKU图片列表
     */
    pictureList: string[];
    /**
     * 进货价格
     */
    purchasePrice: string;
    /**
     * 销售价格(进货价/（1-加点系数)
     */
    skuPrice?: string;
    /**
     * 履约价格回复时间 ---1018-优化v3.3
     */
    priceReplyTime?: string;
    /**
     * 履约价格失效时间 ---1110-优化v3.3
     */
    priceInvalidTime?: string;
    /**
     * 样衣采购周期,单位默认天  -- v3.20.3
     */
    samplePurchasingCycle?: string;
    /**
     * 大货采购周期,单位默认天  -- v3.20.3
     */
    bulkPurchasingCycle?: string;
    /**
     * 裁剪方法
     */
    cuttingMethod?: string;
    /**
     * 使用部位 字典code
     */
    partUse: string;
    /**
     * 核算用量
     */
    dosageAccount: string;
    /**
     * 用量核算单位
     */
    dosageAccountUnit: string;
    /**
     * 损耗率
     */
    attritionRate?: string;
  }[];
  /**
   * 删除的特辅id集合
   */
  deleteIdList: string[];
  /**
   * 核算（用量）表ID
   */
  checkCountId: string;
  /**
   * bom工艺列表
   */
  craftDosageAccountList: {
    /**
     * 工艺需求主键id
     */
    craftDemandId: string;
    /**
     * 物料清单id
     */
    bomMaterialId: string;
    /**
     * 工艺核算用量
     */
    craftDosageAccount: string;
    /**
     * 工艺核算用量单位
     */
    unit: string;
    /**
     * 工艺损耗率（单位%）
     */
    craftWaste: string;
    /**
     * 第三方工艺需求ID
     */
    thirdPartyCraftDemandId: string;
    /**
     * 二次工艺次序编号
     */
    craftsProcessCode?: string;
    /**
     * 二次工艺次序名称
     */
    craftsProcessName?: string;
  }[];
  /**
   * 唛架图{多张以英文逗号分隔}
   */
  markFramePictureList: string[];
}
export interface IUpdateDosageInfoRes {}

export interface IGetSpecialAccessoriesReq {
  /**
   * 商品名
   */
  productName?: string;
  /**
   * 当前查询的页码
   */
  pageNum: number;
  /**
   * 当前查询单页的数据量
   */
  pageSize: number;
}
export interface IGetSpecialAccessoriesRes {
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
  list: {
    /**
     * SpuID
     */
    spuId: string;
    /**
     * Spu编码
     */
    spuCode: string;
    /**
     * 商品名称
     */
    spuName: string;
    /**
     * SKU ID
     */
    skuId: string;
    /**
     * 销售编码(SKU)
     */
    skuCode: string;
    /**
     * 供应商id
     */
    supplierId: string;
    /**
     * 供应商名称
     */
    supplierName: string;
    /**
     * 供应商编码
     */
    supplierCode: string;
    /**
     * 开票状态(合作关系)-对应OPS字典invoice_dict的编码值  ---0923-推款优化v0.1
     */
    invoiceState: string;
    /**
     * 包装数量(辅料)  ---0923-推款优化v0.1
     */
    packNumber: string;
    /**
     * 包装计价单位名称  ---0923-推款优化v0.1
     */
    packUnitName: string;
    /**
     * 包装计价副单位名称  ---0923-推款优化v0.1
     */
    packAssistantUnitName: string;
    /**
     * 辅料最小价格  ---0923-推款优化v0.1
     */
    minPrice: string;
    /**
     * 辅料最小单位  ---0923-推款优化v0.1
     */
    minPriceUnit: string;
    /**
     * 商品货号  ---0923-推款优化v0.1
     */
    commodityNumber: string;
    /**
     * SPU城市名称
     */
    spuCityName: string;
    /**
     * 特殊辅料属性集合(json数据)
     */
    skuAttrs: string;
    /**
     * 销售单位
     */
    saleUnit: string;
    /**
     * Sku图片列表
     */
    pictureList: string[];
    /**
     * 进货价格
     */
    purchasePrice: string;
    /**
     * 销售价格(进货价/（1-加点系数)
     */
    skuPrice: string;
    /**
     * 履约面辅料价格回复时间 ---1018-优化v3.3
     */
    priceReplyTime: string;
    /**
     * 履约面辅料价格失效时间 ---1018-优化v3.3
     */
    priceInvalidTime: string;
    /**
     * 样衣采购周期,单位默认天  -- v3.20.3
     */
    samplePurchasingCycle: string;
    /**
     * 样衣采购周期单位,单位默认天  -- v3.20.3
     */
    samplePurchasingCycleUnit: string;
    /**
     * 大货采购周期,单位默认天  -- v3.20.3
     */
    bulkPurchasingCycle: string;
    /**
     * 大货采购周期单位,单位默认天  -- v3.20.3
     */
    bulkPurchasingCycleUnit: string;
  }[];
}
/**
 * 下载原纸样
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/3157
 */
export interface IPatternClothesDownloadReq {
  /**
   * spu
   */
  styleCode: string;
  /**
   * skc
   */
  designCode: string;
}

export interface IPatternClothesDownloadRes {
  /**
   * 纸样id
   */
  patternId?: string;
  /**
   * 版单id
   */
  clothesId?: string;
  /**
   * 纸样文件url
   */
  patternUrl?: string;
  /**
   * 纸样文件名字
   */
  patternName?: string;
  /**
   * 纸样文件版本
   */
  patternVersion?: string;
  /**
   * 设计款号
   */
  designCode?: string;
}

export interface ICheckCountGetVersionsReq {
  designCode: string;
}
export type ICheckCountGetVersionsRes = ICheckCountGetVersionsResItem[];
export interface ICheckCountGetVersionsResItem {
  /**
   * 核算（用量）表ID
   */
  checkCountId: string;
  /**
   * 最新BOM ID
   */
  bomId?: string;
  /**
   * 纸样版本
   */
  patternVersion?: string;
  /**
   * 纸样师ID
   */
  patternMakerId?: string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 用量师ID
   */
  checkerId: string;
  /**
   * 用量师名称
   */
  checkerName?: string;
  /**
   * 用量核算状态
   */
  state?: string;
  /**
   * 唛架图
   */
  markFramePicture?: string;
  /**
   * 完成时间
   */
  finishTime?: number;
  /**
   * 系统版本
   */
  sysVersion?: string;
  /**
   * 是否最新数据(1-是、0-否)
   */
  isLatest?: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 核算分单状态。（0:未流转 1:内部 2:外部）
   */
  allocateState?: string;
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
   * 接单状态(0:未接单,1:已接单)
   */
  checkCountReceiving?: string;
  /**
   * 款式类型(1:正常款,2:复色款)
   */
  skcType?: string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: string;
  /**
   * 版本号
   */
  versionNum?: string;
  /**
   * 设计组code
   */
  designerGroupCode?: string;
  /**
   * 设计组
   */
  designerGroup?: string;
  /**
   * 设计师id
   */
  designerId?: string;
  /**
   * 设计师code
   */
  designerCode?: string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 物料费用明细
   * 字段属性:bomMaterialId:物料ID，dosageAccount：用量核算
   */
  materialCostInfo?: string;
  /**
   * 工艺费用明细
   * 字段属性：工艺费用，字段属性:craftDosageAccount：工艺用量核算、craftAttritionRate：工艺损耗率、bomMaterialId：物料清单id'
   */
  craftCostInfo?: string;
  /**
   * 分单开始时间
   */
  seperateStartTime?: number;
  /**
   * 分单完成时间
   */
  seperateFinishTime?: number;
  /**
   * 接单开始时间
   */
  checkCountStartTime?: number;
  /**
   * 接单完成时间
   */
  checkCountFinishTime?: number;
  /**
   * 客户图片列表
   */
  customerPicture?: string;
  /**
   * 是否取消 0-否、1-是
   */
  isCancel?: string;
  /**
   * 是否待更新 0-否、1-是
   */
  isUpdate?: string;
  /**
   * 租户id
   */
  tenantId?: string;
  /**
   * 款式来源：1-致景PLM 2-JV PLM 3-JV SDP
   * 参考BizChannelEnum
   */
  bizChannel?: string;
  /**
   * 创建人名字
   */
  creatorName?: string;
  /**
   * 更新人名字
   */
  reviserName?: string;
}
