// ⬇️ bom提交V3  --v3.11请求体 接口：https://yapi.tiangong.site/project/1404/interface/api/5658
/**
 * 入参
 */
export interface ISubmitV3Req {
  /**
    * bomId
    */
  bomId: string;
  /**
    * bom版本号
    */
  bomVersionNum: string;
  /**
    * bom暂存次数 --v3.5.1
    *  @NotNull(message = "bom暂存次数不能为空")
    */
  transientCount?: string;
  /**
    * 找料状态: 0,否; 1,是(找料中) --v3.11
    */
  materialSearchState?: string;
  /**
    * bom订单状态
    */
  bomOrderState: string;
  /**
    * 引用设计款号(改款需求)
    */
  quoteDesignCode?: string;
  /**
    * 最新版单id
    */
  latestPrototypeId?: string;
  /**
   * 更新时间
   */
  revisedTime: string;
  /**
    * 添加Bom物料
    */
  addBomMaterials?: ISubmitV3ReqAddBomMaterialsItem[];
  /**
    * 修改Bom物料
    */
  updateBomMaterials?: ISubmitV3ReqUpdateBomMaterialsItem[];
  /**
    * 删除Bom物料
    */
  delBomMaterialIds?: string[];
  /**
    * 添加Bom物料需求  --v3.11
    */
  addBomMaterialDemandList?: ISubmitV3ReqAddBomMaterialDemandListItem[];
  /**
    * 修改Bom物料需求  --v3.11
    */
  updateBomMaterialDemandList?: ISubmitV3ReqUpdateBomMaterialDemandListItem[];
  /**
    * 删除Bom物料需求  --v3.11
    */
  delBomMaterialDemandIds?: string[];
}
export interface ISubmitV3ReqAddBomMaterialsItem {
  /**
    * bom物料ID(复制, 前端处理引用物料使用)
    */
  bomMaterialIdCopy?: string;
  /**
    * 被替换的物料id(更改规格时)，更换规格时需要传入最原先的bomMaterialId --v3.11
    */
  bomMaterialIdChange?: string;
  /**
    * 物料项目 面料A、辅料A ...
    */
  prototypeMaterialName: string;
  /**
    * 需求类型: 1, 面料; 2, 辅料; 3:特殊辅料
    */
  demandType: string;
  /**
    * 商品id
    */
  commodityId: string;
  /**
    * 商品编码
    */
  commodityCode: string;
  /**
    * skuId
    */
  skuId: string;
  /**
    * sku编号
    */
  skuCode: string;
  /**
    * 使用部位,字典code
    */
  partUse: string;
  /**
    * 裁剪方式,字典code
    */
  cuttingMethod: string;
  /**
    * 对色  ---仅辅料有
    */
  colorMatch?: string;
  /**
    * 新增二次工艺信息列表
    */
  addCraftDemandList?: ISubmitV3ReqAddCraftDemandListItem[];
  /**
    * 物料备注
    */
  remark?: string;
  /**
    * 是否无工艺 1-是  0-否
    */
  isNoCraft?: string;
  /**
    * 对色/包扣状态: 0-无; 1-对色; 2-包扣; --v3.11(仅辅料)
    */
  colorMatchMaterialState?: string;
  /**
    * 对色/包扣对应物料名 --v3.11(仅辅料)
    */
  colorMatchMaterialName?: string;
  /**
    * 对色/包扣对应物料id --v3.11(仅辅料)
    */
  colorMatchMaterialId?: string;
  /**
   * JV 面料识别物料id
   */
  identifyMaterialId?: string;
}
export interface ISubmitV3ReqAddCraftDemandListItem {
  /**
    * 材料类型 一级分类 面料 辅料
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
    * 工艺厂名
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
  picture?: string;
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
    * bom需求id --v3.11(前端不用传)
    */
  bomMaterialDemandId?: string;
  /**
    * bom物料id --v3.11(前端不用传)
    */
  bomMaterialId?: string;
  /**
    * 物料快照主键id --v3.11(前端不用传)
    */
  materialSnapshotId?: string;
  /**
    * 履约需求ID(第三方) --v3.11(前端不用传)
    */
  relationDemandId?: string;
  /**
    * 履约需求编码(第三方) --v3.11(前端不用传)
    */
  relationDemandCode?: string;
  /**
    * 暂存工艺id-有暂存的时候才有值  --v3.11(前端不用传)
    */
  craftDemandTransientId?: string;
}
export interface ISubmitV3ReqUpdateBomMaterialsItem {
  /**
    * bom物料Id
    */
  bomMaterialId: string;
  /**
    * 物料项目 面料A、辅料A ...
    */
  prototypeMaterialName: string;
  /**
    * 需求类型: 1, 面料; 2, 辅料; 3:特殊辅料
    */
  demandType: string;
  /**
    * 商品id
    */
  commodityId: string;
  /**
    * 商品编码
    */
  commodityCode: string;
  /**
    * skuId
    */
  skuId: string;
  /**
    * sku编号
    */
  skuCode: string;
  /**
    * 使用部位,字典code
    */
  partUse: string;
  /**
    * 裁剪方式,字典code
    */
  cuttingMethod: string;
  /**
    * 对色  ---仅辅料有(废弃字段)
    */
  colorMatch?: string;
  /**
    * 新增二次工艺信息列表
    */
  addCraftDemandList?: ISubmitV3ReqAddCraftDemandListItem[];
  /**
    * 删除二次工艺ID列表
    */
  delCraftDemandIds?: string[];
  /**
    * 物料备注
    */
  remark?: string;
  /**
    * 是否无工艺 1-是  0-否
    */
  isNoCraft?: string;
  /**
    * 对色/包扣状态: 0-无; 1-对色; 2-包扣; --v3.11(仅辅料)
    */
  colorMatchMaterialState?: string;
  /**
    * 对色/包扣对应物料名 --v3.11(仅辅料)
    */
  colorMatchMaterialName?: string;
  /**
    * 对色/包扣对应物料id --v3.11(仅辅料)
    */
  colorMatchMaterialId?: string;
  /**
   * JV 面料识别物料id
   */
  identifyMaterialId?: string;
}
export interface ISubmitV3ReqAddBomMaterialDemandListItem {
  /**
    * 物料项目名
    */
  prototypeMaterialName?: string;
  /**
    * 需求数量
    */
  demandNum?: string;
  /**
    * 需求数量单位
    */
  demandNumUnit?: string;
  demandNumUnitName?: string;
  /**
    * 物料类型: 1:面料  2:辅料; (默认2)
    */
  materialDemandType?: string;
  /**
    * 需求图片集合
    */
  demandPictureList?: string[];
  /**
    * 对色/包扣状态: 0-无; 1-对色; 2-包扣;
    */
  colorMatchMaterialState?: string;
  /**
    * 对色/包扣对应物料名
    */
  colorMatchMaterialName?: string;
  colorMatchMaterialId?: string;
  /**
    * 需求备注
    */
  demandRemark?: string;
  materialAddReq?: ISubmitV3ReqMaterialAddReq;
}
/**
  * 新增物料-工艺信息封装到该对象下
  */
export interface ISubmitV3ReqMaterialAddReq {
  /**
   * 被替换的物料id(更换物料时必填)
   */
  bomMaterialIdChange?: string;
  /**
    * 物料项目名
    */
  prototypeMaterialName?: string;
  /**
    * 需求类型: 1, 面料; 2, 辅料; 3:特殊辅料
    */
  demandType?: string;
  /**
    * 商品id  (更换物料时必填)
    */
  commodityId?: string;
  /**
    * 商品编码  (更换物料时必填)
    */
  commodityCode?: string;
  /**
    * skuId  (更换物料时必填)
    */
  skuId?: string;
  /**
    * sku编号  (更换物料时必填)
    */
  skuCode?: string;
  /**
    * 使用部位,字典code
    */
  partUse?: string;
  /**
    * 裁剪方式,字典code
    */
  cuttingMethod?: string;
  /**
    * 对色/包扣状态: 0-无; 1-对色; 2-包扣;
    */
  colorMatchMaterialState?: string;
  /**
    * 对色/包扣对应物料名
    */
  colorMatchMaterialName?: string;
  /**
    * 对色/包扣对应物料id --v3.11
    */
  colorMatchMaterialId?: string;
  /**
    * 新增二次工艺信息列表
    */
  addCraftDemandList?: ISubmitV3ReqAddCraftDemandListItem[];
  /**
    * 物料备注
    */
  remark?: string;
}
export interface ISubmitV3ReqUpdateBomMaterialDemandListItem {
  /**
    * bom物料需求id
    */
  bomMaterialDemandId: string;
  /**
    * 物料项目名
    */
  prototypeMaterialName?: string;
  /**
    * 需求数量
    */
  demandNum?: string;
  /**
    * 需求数量单位
    */
  demandNumUnit?: string;
  demandNumUnitName?: string;
  /**
    * /**
    * 需求图片集合
    */
  demandPictureList?: string[];
  /**
    * 对色/包扣状态: 0-无; 1-对色; 2-包扣; (默认0)
    */
  colorMatchMaterialState?: string;
  /**
    * 对色/包扣对应物料名
    */
  colorMatchMaterialName?: string;
  colorMatchMaterialId?: string;
  /**
    * 需求备注
    */
  demandRemark?: string;
  /**
       * 匹配数量
       */
  materialMatchNum?: string;
  /**
    * 更新物料集合
    */
  materialUpdateReqList?: ISubmitV3ReqMaterialUpdateReqListItem[];
  /**
    * 添加物料集合 --更换物料时, 先删除,再提交
    */
  materialAddReqList?: ISubmitV3ReqMaterialAddReqListItem[];
  /**
    * 删除物料id-集合 --更换物料时, 先删除,再提交
    */
  delDemandMaterialIdList?: string[];
}
export interface ISubmitV3ReqMaterialUpdateReqListItem {
  /**
    * bom物料ID
    */
  bomMaterialId?: string;
  /**
    * 物料项目 面料A、辅料A ...
    *  @NotBlank(message = "物料项目不能为空")
    */
  prototypeMaterialName?: string;
  /**
    * 商品id
    *  @NotNull(message = "商品Id不能为空")
    */
  commodityId?: string;
  /**
    * 商品编码
    *  @NotBlank(message = "商品编号不能为空")
    */
  commodityCode?: string;
  /**
    * skuId
    *  @NotNull(message = "skuId不能为空")
    */
  skuId?: string;
  /**
    * sku编号
    *  @NotBlank(message = "sku编号不能为空")
    */
  skuCode?: string;
  /**
    * 使用部位,字典code
    */
  partUse: string;
  /**
    * 裁剪方式,字典code
    */
  cuttingMethod: string;
  /**
    * 对色/包扣状态: 0-无; 1-对色; 2-包扣;
    */
  colorMatchMaterialState?: string;
  /**
    * 对色/包扣对应物料名
    */
  colorMatchMaterialName?: string;
  /**
    * 对色/包扣对应物料id --v3.11
    */
  colorMatchMaterialId?: string;
  /**
    * 新增二次工艺信息列表
    */
  addCraftDemandList?: ISubmitV3ReqAddCraftDemandListItem[];
  /**
    * 删除二次工艺ID列表
    */
  delCraftDemandIds?: string[];
  /**
    * 物料备注
    */
  remark?: string;
}
export interface ISubmitV3ReqMaterialAddReqListItem {
  /**
   * 被替换的物料id(更换物料时必填)
   */
  bomMaterialIdChange?: string;
  /**
    * 物料项目名
    */
  prototypeMaterialName?: string;
  /**
    * 需求类型: 1, 面料; 2, 辅料; 3:特殊辅料
    */
  demandType?: string;
  /**
    * 商品id  (更换物料时必填)
    */
  commodityId?: string;
  /**
    * 商品编码  (更换物料时必填)
    */
  commodityCode?: string;
  /**
    * skuId  (更换物料时必填)
    */
  skuId?: string;
  /**
    * sku编号  (更换物料时必填)
    */
  skuCode?: string;
  /**
    * 使用部位,字典code
    */
  partUse?: string;
  /**
    * 裁剪方式,字典code
    */
  cuttingMethod?: string;
  /**
    * 对色/包扣状态: 0-无; 1-对色; 2-包扣;
    */
  colorMatchMaterialState?: string;
  /**
    * 对色/包扣对应物料名
    */
  colorMatchMaterialName?: string;
  /**
    * 对色/包扣对应物料id --v3.11
    */
  colorMatchMaterialId?: string;
  /**
    * 新增二次工艺信息列表
    */
  addCraftDemandList?: ISubmitV3ReqAddCraftDemandListItem[];
  /**
    * 删除二次工艺信息列表
    */
  delCraftDemandIds?: string[];
  /**
    * 物料备注
    */
  remark?: string;
}
// ⬆️ bom提交V3  --v3.11请求体

// ⬇️ bom提交V3  --v3.11响应体 接口：https://yapi.tiangong.site/project/1404/interface/api/5658
/**
  * 响应数据
  */
export interface ISubmitV3Res {
  bomId: string;
}
// ⬆️ bom提交V3  --v3.11响应体
