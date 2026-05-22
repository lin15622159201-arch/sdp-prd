import { YES_NO_ENUM, YES_NO_STRING_ENUM } from '@/constant';
import { DIGITAL_DRAFT_TASK_STATUS_ENUM, EDITION_TYPE_ENUM, EXTERNAL_ROOM_TYPE_ENUM } from '../constant';

// ⬇️ 统计数码描稿任务数量响应体 接口：https://yapi.tiangong.site/project/38/interface/api/3618
export type IDigitalPaintingCountByStateItem = {
  /**
   * 任务状态0待下单1待接单2描稿中3已寄出4已驳回5已完成6已取消
   */
  taskState: string;
  /**
   * 任务状态描述
   */
  taskStateDesc: string;
  /**
   * 数量
   */
  count: string;
};
// ⬆️ 统计数码描稿任务数量响应体
// ⬇️ 查询数码描稿任务列表请求体 接口：https://yapi.tiangong.site/project/38/interface/api/3619
/**
 * 分页对象
 */
export interface IDigitalPaintingQueryByPageReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 任务编码
   */
  taskCode?: string;
  /**
   * 任务状态0待下单1待接单2描稿中3已寄出4已驳回5已完成6已取消
   */
  taskState?: string;
  /**
   * 款式SPU
   */
  styleCode?: string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 设计师ID
   */
  designerId?: string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 创建人ID
   */
  creatorId?: string;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 创建时间开始
   */
  createdTimeStart?: string;
  /**
   * 创建时间结束
   */
  createdTimeEnd?: string;
  /**
   * 加急类型0普通1动销加急2常规加急
   */
  urgentType?: string;
  /**
   * 花型编码
   */
  flowerCode?: string;
  /**
   * 编码状态0待编码(面料SKU字段为空)1已编码(面料SKU字段不为空)
   */
  fabricSkuState?: string;
}
// ⬆️ 查询数码描稿任务列表请求体
// ⬇️ 查询数码描稿任务列表响应体 接口：https://yapi.tiangong.site/project/38/interface/api/3619
export interface IDigitalPaintingQueryByPageRes {
  page: string;
  total: string;
  list: IDigitalPaintingQueryByPageResListItem[];
}
export interface IDigitalPaintingQueryByPageResListItem {
  /**
   * 数码描稿ID
   */
  digitalPaintingId: string;
  /**
   * 任务编码
   */
  taskCode: string;
  /**
   * 任务状态0待下单1待接单2描稿中3已寄出4已驳回5已完成6已取消
   */
  taskState: DIGITAL_DRAFT_TASK_STATUS_ENUM;
  /**
   * 任务状态
   */
  taskStateDesc: string;
  /**
   * 设计款号
   */
  designCode: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode: string;
  /**
   * 花型编码
   */
  flowerCode: string;
  /**
   * 引用花型编码
   */
  refFlowerCode: string;
  /**
   * 描稿版次1头版2复色
   */
  editionType: EDITION_TYPE_ENUM;
  /**
   * 描稿版次
   */
  editionTypeDesc: string;
  /**
   * 花型图片
   */
  flowerPictureList: string[];
  /**
   * 描稿类型字典值
   */
  paintingType: string;
  /**
   * 描稿类型名称
   */
  paintingTypeName: string;
  /**
   * 打版方式1常规打版2动销后打版
   */
  makeType: string;
  /**
   * 打版方式
   */
  makeTypeDesc: string;
  /**
   * 加急类型0普通1动销加急2常规加急
   */
  urgentType: string;
  /**
   * 加急类型
   */
  urgentTypeDesc: string;
  /**
   * 底布PID
   */
  baseClothPid: string;
  /**
   * 底布信息JSON
   */
  baseCloth: IDigitalPaintingSaveReqBaseCloth;
  /**
   * 描稿效果图片
   */
  paintingPictureList: string[];
  /**
   * 花型面料SKU
   */
  fabricSku: string;
  /**
   * 编码状态0待编码(面料SKU字段为空)1已编码(面料SKU字段不为空)
   */
  fabricSkuState: string;
  /**
   * 是否外发(1:是,0:不是)
   */
  isOutsourced: string;
  /**
   * 是否已分单(1.是,0否)
   */
  isAllocated: string;
  /**
   * 是否已接单(1.是,0否)
   */
  digitalPaintingReceiving: string;
  /**
   * 供应商(版房)ID
   */
  roomId: string;
  /**
   * 供应商(版房)名称
   */
  roomName: string;
  /**
   * 描稿费用
   */
  paintingFee: string;
  /**
   * 花型描述
   */
  flowerDesc: string;
  /**
   * 设计师id
   */
  designerId: string;
  /**
   * 设计师名称
   */
  designerName: string;
  /**
   * 下单失败原因
   */
  allocateFailReason: string;
  /**
   * 取消原因
   */
  cancelReason: string;
  /**
   * 审核状态0待审核1审核通过2审核不通过
   */
  auditState: string;
  /**
   * 审核意见
   */
  auditRemark: string;
  /**
   * 重新描稿对应的旧描稿任务编码
   */
  redoParentCode: string;
  /**
   * 分单开始时间
   */
  seperateStartTime: string;
  /**
   * 分单完成时间
   */
  seperateFinishTime: string;
  /**
   * 完成时间
   */
  finishTime: string;
  /**
   * 驳回时间
   */
  rejectTime: string;
  /**
   * 取消时间
   */
  cancelTime: string;
  /**
   * 接单时间
   */
  receivingTime: string;
  /**
   * 审核时间
   */
  auditTime: string;
  /**
   * 寄出时间
   */
  sendTime: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 创建人名称
   */
  creatorName: string;
  /**
   * 修改人名称
   */
  reviserName: string;
  reviserId: string;
  revisedTime: string;
  isDeleted: string;
  creatorId: string;
  createdTime: string;
  /**
   * 租户id
   */
  tenantId: string;
  /**
   * 款式来源：1-致景PLM 2-JV PLM 3-JV SDP
   * 参考BizChannelEnum
   */
  bizChannel: string;
  commodityCode: string;
  /**
   * 备注的图片
   */
  auditPictureList?: string[];
}
// ⬆️ 查询数码描稿任务列表响应体

// ⬇️ 保存数码描稿任务请求体 接口：https://yapi.tiangong.site/project/38/interface/api/3621
export interface IDigitalPaintingSaveReq {
  /**
   * 数码描稿ID
   */
  digitalPaintingId?: string;
  /**
   * 设计款号
   */
  designCode: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode: string;
  /**
   *  引用的花型编号
   * 1、当前SKC的描稿版次=复色，且存在2个及以上的头版花型时，显示「引用花型编号」字段；
   * 2、引用花型编号字段：单选选择器；枚举：该SKC关联SPU的头版花型编号；必填；
   * 3、选择花型编号后，分别加载出该花型编号的「花型参考图、描稿类型、紧急程度、底布信息、供应商、描稿费用等信息；
   *  */
  refFlowerCode?: string;
  /**
   * 花型图片(多张以英文逗号分隔)
   */
  flowerPicture: string;
  /**
   * 描稿类型字典值ID
   */
  paintingType: string;
  /**
   * 描稿类型字典值
   */
  paintingTypeName: string;
  /**
   * 打版方式1常规打版2动销后打版
   */
  makeType: string;
  /**
   * 加急类型0普通1动销加急2常规加急
   */
  urgentType: string;
  /**
   * 底布PID
   */
  commodityCode: string;
  baseCloth?: IDigitalPaintingSaveReqBaseCloth;
  /**
   * 花型面料SKU
   */
  fabricSku?: string;
  /**
   * 供应商(版房)ID
   */
  roomId: string;
  /**
   * 供应商(版房)名称
   */
  roomName?: string;
  /**
   * 描稿费用
   */
  paintingFee: string;
  /**
   * 花型描述
   */
  flowerDesc?: string;
  /**
   * 备注的图片
   */
  remarkPictureList?: string[];
}
/**
 * 底布信息
 */
export interface IDigitalPaintingSaveReqBaseCloth {
  /**
   * 商品ID
   */
  commodityId?: string;
  commodityCode?: string;
  /**
   * 品名
   */
  commodityName?: string;
  /**
   * 货名
   */
  commodityNumber?: string;
  /**
   * 克重
   */
  weightStrFormat?: string;
  /**
   * 成分
   */
  material?: IDigitalPaintingSaveReqMaterialItem[];
}
export interface IDigitalPaintingSaveReqMaterialItem {
  /**
   * 成分名称
   */
  name?: string;
  /**
   * 比例
   */
  percent?: string;
}
// ⬆️ 保存数码描稿任务请求体

export interface IDigitalPaintingGetEditionTypeAndRefPaintingReq {
  /**
   * 款式SPU
   */
  styleCode?: string;
  /**
   *
   */
  designCode?: string;
}

// ⬇️ 根据spu和skc获取描稿版次及参考描稿信息响应体 接口：https://yapi.tiangong.site/project/38/interface/api/3645
export interface IDigitalPaintingGetEditionTypeAndRefPaintingRes {
  /**
   * 版次编码
   */
  editionType: EDITION_TYPE_ENUM;
  /**
   * 版次描述
   */
  editionTypeDesc: string;
  /**
   * 引用描稿信息
   */
  refDigitalPaintingInfo: IDigitalPaintingGetEditionTypeAndRefPaintingResRefDigitalPaintingInfoItem[];
}
export interface IDigitalPaintingGetEditionTypeAndRefPaintingResRefDigitalPaintingInfoItem {
  /**
   * 数码描稿ID
   */
  digitalPaintingId: string;
  /**
   * 任务编码
   */
  taskCode: string;
  /**
   * 任务状态0待下单1待接单2描稿中3已寄出4已驳回5已完成6已取消
   */
  taskState: string;
  /**
   * 任务状态描述
   */
  taskStateDesc: string;
  /**
   * 设计款号
   */
  designCode: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode: string;
  /**
   * 花型编码
   */
  flowerCode: string;
  /**
   * 引用花型编码
   */
  refFlowerCode: string;
  /**
   * 描稿版次1头版2复色
   * 参考：tech.tiangong.sdp.clothes.enums.digitalpainting.EditionTypeEnums
   */
  editionType: EDITION_TYPE_ENUM;
  /**
   * 描稿版次描述
   */
  editionTypeDesc: string;
  /**
   * 花型图片
   */
  flowerPictureList: string[];
  /**
   * 描稿类型字典值
   */
  paintingType: string;
  /**
   * 打版方式1常规打版2动销后打版
   */
  makeType: string;
  /**
   * 打版方式
   */
  makeTypeDesc: string;
  /**
   * 加急类型0普通1动销加急2常规加急
   */
  urgentType: string;
  /**
   * 加急类型
   */
  urgentTypeDesc: string;
  /**
   * 底布PID
   */
  commodityCode: string;
  baseCloth: IDigitalPaintingSaveReqBaseCloth;
  /**
   * 描稿效果图片
   */
  paintingPictureList: string[];
  /**
   * 花型面料SKU
   */
  fabricSku: string;
  /**
   * 编码状态0待编码(面料SKU字段为空)1已编码(面料SKU字段不为空)
   */
  fabricSkuState: string;
  /**
   * 是否外发(1:是,0:不是)
   */
  isOutsourced: string;
  /**
   * 是否已分单(1.是,0否)
   */
  isAllocated: string;
  /**
   * 是否已接单(1.是,0否)
   */
  digitalPaintingReceiving: string;
  /**
   * 供应商(版房)ID
   */
  roomId: string;
  /**
   * 供应商ID
   */
  supplierId: string;
  /**
   * 供应商(版房)名称
   */
  roomName: string;
  /**
   * 描稿费用
   */
  paintingFee: string;
  /**
   * 花型描述
   */
  flowerDesc: string;
  /**
   * 设计师id
   */
  designerId: string;
  /**
   * 设计师名称
   */
  designerName: string;
  /**
   * 下（分）单状态 -1下单失败0待下单1已下单
   * 参考：tech.tiangong.sdp.clothes.enums.digitalpainting.DigitalPaintingAllocateStateEnums
   */
  allocateState: string;
  /**
   * 下单失败原因
   */
  allocateFailReason: string;
  /**
   * 取消原因
   */
  cancelReason: string;
  /**
   * 审核状态0待审核1审核通过2审核不通过
   */
  auditState: string;
  /**
   * 审核意见
   */
  auditRemark: string;
  /**
   * 重新描稿对应的旧描稿任务编码
   */
  redoParentCode: string;
  /**
   * 分单开始时间
   */
  seperateStartTime: string;
  /**
   * 分单完成时间
   */
  seperateFinishTime: string;
  /**
   * 完成时间
   */
  finishTime: string;
  /**
   * 驳回时间
   */
  rejectTime: string;
  /**
   * 取消时间
   */
  cancelTime: string;
  /**
   * 接单时间
   */
  receivingTime: string;
  /**
   * 审核时间
   */
  auditTime: string;
  /**
   * 寄出时间
   */
  sendTime: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 创建人名称
   */
  creatorName: string;
  /**
   * 修改人名称
   */
  reviserName: string;
  reviserId: string;
  revisedTime: string;
  isDeleted: string;
  creatorId: string;
  createdTime: string;
  /**
   * 租户id
   */
  tenantId: string;
  /**
   * 款式来源：1-致景PLM 2-JV PLM 3-JV SDP
   * 参考BizChannelEnum
   */
  bizChannel: string;
}

// ⬇️ 获取skc信息响应体 接口：https://yapi.tiangong.site/project/38/interface/api/3617
export interface IDesignCommonSkcRes {
  /**
   * 版单id
   */
  prototypeId: string;
  /**
   * 设计款号
   */
  designCode: string;
  /**
   * 成衣SPU
   */
  styleCode: string;
  /**
   * 款式类型: 1-正常款; 2-复色款
   */
  skcType: string;
  /**
   * 打版信息状态: 1.待拆版 2.已拆版
   */
  prototypeStatus: string;
  /**
   * 是否取消 0 否 1是
   */
  isCanceled: boolean;
  /**
   * 是否动销: 0-否; 1-是;
   */
  isOnSale: boolean;
}
// ⬆️ 获取skc信息响应体

// ⬇️ 查询数码描稿任务详情信息响应体 接口：https://yapi.tiangong.site/project/38/interface/api/3620
export interface IDigitalPaintingGetByIdRes {
  /**
   * 数码描稿ID
   */
  digitalPaintingId: string;
  /**
   * 任务编码
   */
  taskCode: string;
  /**
   * 任务状态0待下单1待接单2描稿中3已寄出4已驳回5已完成6已取消
   */
  taskState: string;
  /**
   * 任务状态描述
   */
  taskStateDesc: string;
  /**
   * 设计款号
   */
  designCode: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode: string;
  /**
   * 花型编码
   */
  flowerCode: string;
  /**
   * 引用花型编码
   */
  refFlowerCode: string;
  /**
   * 描稿版次1头版2复色
   * 参考：tech.tiangong.sdp.clothes.enums.digitalpainting.EditionTypeEnums
   */
  editionType: EDITION_TYPE_ENUM;
  /**
   * 描稿版次描述
   */
  editionTypeDesc: string;
  /**
   * 花型图片
   */
  flowerPictureList: string[];
  /**
   * 描稿类型字典值
   */
  paintingType: string;
  /**
   * 描稿类型字典名称
   */
  paintingTypeName: string;
  /**
   * 打版方式1常规打版2动销后打版
   */
  makeType: string;
  /**
   * 打版方式
   */
  makeTypeDesc: string;
  /**
   * 加急类型0普通1动销加急2常规加急
   */
  urgentType: string;
  /**
   * 加急类型
   */
  urgentTypeDesc: string;
  /**
   * 底布PID
   */
  commodityCode: string;
  baseCloth: IDigitalPaintingSaveReqBaseCloth;
  /**
   * 描稿效果图片
   */
  paintingPictureList: string[];
  /**
   * 花型面料SKU
   */
  fabricSku: string;
  /**
   * 编码状态0待编码(面料SKU字段为空)1已编码(面料SKU字段不为空)
   */
  fabricSkuState: string;
  /**
   * 是否外发(1:是,0:不是)
   */
  isOutsourced: string;
  /**
   * 是否已分单(1.是,0否)
   */
  isAllocated: string;
  /**
   * 是否已接单(1.是,0否)
   */
  digitalPaintingReceiving: string;
  /**
   * 供应商ID
   */
  supplierId: string;
  /**
   * 供应商(版房)ID
   */
  roomId: string;
  /**
   * 供应商(版房)名称
   */
  roomName: string;
  /**
   * 描稿费用
   */
  paintingFee: string;
  /**
   * 花型描述
   */
  flowerDesc: string;
  /**
   * 设计师id
   */
  designerId: string;
  /**
   * 设计师名称
   */
  designerName: string;
  /**
   * 下（分）单状态 -1下单失败0待下单1已下单
   * 参考：tech.tiangong.sdp.clothes.enums.digitalpainting.DigitalPaintingAllocateStateEnums
   */
  allocateState: string;
  /**
   * 下单失败原因
   */
  allocateFailReason: string;
  /**
   * 取消原因
   */
  cancelReason: string;
  /**
   * 审核状态0待审核1审核通过2审核不通过
   */
  auditState: string;
  /**
   * 审核意见
   */
  auditRemark: string;
  /**
   * 重新描稿对应的旧描稿任务编码
   */
  redoParentCode: string;
  /**
   * 分单开始时间
   */
  seperateStartTime: string;
  /**
   * 分单完成时间
   */
  seperateFinishTime: string;
  /**
   * 完成时间
   */
  finishTime: string;
  /**
   * 驳回时间
   */
  rejectTime: string;
  /**
   * 取消时间
   */
  cancelTime: string;
  /**
   * 接单时间
   */
  receivingTime: string;
  /**
   * 审核时间
   */
  auditTime: string;
  /**
   * 寄出时间
   */
  sendTime: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 创建人名称
   */
  creatorName: string;
  /**
   * 修改人名称
   */
  reviserName: string;
  reviserId: string;
  revisedTime: string;
  isDeleted: string;
  creatorId: string;
  createdTime: string;
  /**
   * 租户id
   */
  tenantId: string;
  /**
   * 款式来源：1-致景PLM 2-JV PLM 3-JV SDP
   * 参考BizChannelEnum
   */
  bizChannel: string;
  /**
   * 备注的图片
   */
  remarkPictureList?: string[];
}
// ⬆️ 查询数码描稿任务详情信息响应体

// ⬇️ 撤回任务请求体 接口：https://yapi.tiangong.site/project/38/interface/api/3626
export interface IDigitalPaintingWithdrawReq {
  /**
   * 数码描稿ID
   */
  digitalPaintingId: string;
}
// ⬆️ 撤回任务请求体

// ⬇️ 取消任务请求体 接口：https://yapi.tiangong.site/project/38/interface/api/3627
export interface IDigitalPaintingCancelReq {
  /**
   * 数码描稿ID
   */
  digitalPaintingId: string;
  /**
   * 取消原因
   */
  cancelReason: string;
}
// ⬆️ 取消任务请求体

// ⬇️ 审核请求体 接口：https://yapi.tiangong.site/project/38/interface/api/3628
export interface IDigitalPaintingAuditReq {
  /**
   * 数码描稿ID
   */
  digitalPaintingId: string;
  /**
   * 审核状态
   */
  auditState: string;
  /**
   * 审核意见
   */
  auditRemark?: string;
  /**
   * 审核意见图片，多个图片用英文逗号连接起来
   */
  auditPicture?: string;
}
// ⬆️ 审核请求体

// ⬇️ 指定花型面料的SKU请求体 接口：https://yapi.tiangong.site/project/38/interface/api/3629
export interface IDigitalPaintingChangeFabricSkuReq {
  /**
   * 数码描稿ID
   */
  digitalPaintingId: string;
  /**
   * 花型面料SKU
   */
  fabricSku: string;
}
// ⬆️ 指定花型面料的SKU请求体

// ⬇️ 复制重做描稿任务请求体 接口：https://yapi.tiangong.site/project/38/interface/api/3625
export interface IDigitalPaintingCopyRedoReq {
  /**
   * 源版数码描稿任务ID
   */
  parentDigitalPaintingId: string;
  /**
   * 引用花型编码
   */
  refFlowerCode?: string;
  /**
   * 花型图片(多张以英文逗号分隔)
   */
  flowerPicture: string;
  /**
   * 描稿类型字典值
   */
  paintingType: string;
  /**
   * 打版方式1常规打版2动销后打版
   */
  makeType: string;
  /**
   * 加急类型0普通1动销加急2常规加急
   */
  urgentType: string;
  /**
   * 底布PID
   */
  commodityCode: string;
  baseCloth?: IDigitalPaintingSaveReqBaseCloth;
  /**
   * 花型面料SKU
   */
  fabricSku?: string;
  /**
   * 供应商(版房)ID
   */
  roomId: string;
  /**
   * 供应商(版房)名称
   */
  roomName?: string;
  /**
   * 描稿费用
   */
  paintingFee: string;
  /**
   * 花型描述
   */
  flowerDesc?: string;
}
// ⬇️ 根据名称模糊查询板房列表请求体 接口：https://yapi.tiangong.site/project/40/interface/api/2260
export interface IListNameReq {
  /**
   * 版房名称
   */
  name: string;
  /**
   * 启用还是禁用 YES|NO
   */
  enable?: YES_NO_STRING_ENUM;
  /**
   * 外发环节类型
   */
  outsourceTypeList?: ('DESIGN' | 'THREE_D' | 'CUT' | 'MAKE')[];
  /**
   * 版房类型
   */
  externalRoomList?: EXTERNAL_ROOM_TYPE_ENUM[];
  /**
     * 是否是印花供应商，固定传“1”
     */
  digitalDraftAble?: YES_NO_ENUM;
}
// ⬆️ 根据名称模糊查询板房列表请求体

// ⬇️ 根据名称模糊查询板房列表响应体 接口：https://yapi.tiangong.site/project/40/interface/api/2260
export type IListNameItem = {
  /**
   * 板房ID
   */
  roomId: string;
  /**
   * 板房编号
   */
  roomCode: string;
  /**
   * 供应商ID---供应商
   */
  supplierId: string;
  /**
   * 板房名称
   */
  roomName: string;
  /**
   * 板房类型 外板房-OUTSIDE_ROOM 内板房-WIHIN_ROOM
   */
  roomType: string;
  /**
   * 经营类型：1-净色 2-花型 3-净色&花型
   */
  operationType: string;
  /**
   * 是否可数码描稿 (0：否 1: 是) -- 面料供应商
   */
  digitalDraftAble: string;
  /**
   * 联系人
   */
  roomContactName: string;
  /**
   * 联系电话
   */
  roomContactPhone: string;
  /**
   * 省
   */
  roomAddressProvince: string;
  /**
   * 市
   */
  roomAddressCity: string;
  /**
   * 区
   */
  roomAddressArea: string;
  /**
   * 详细地址
   */
  roomDetailAddress: string;
  averageDailyOutput: IListNameResAverageDailyOutput;
  personnelAllocation: IListNameResPersonnelAllocation;
  /**
   * 设备情况
   */
  equipmentSituation: string;
  /**
   * 服务类型
   */
  serviceType: string[];
  /**
   * 擅长品类
   */
  goodAtCategory: string[];
  /**
   * 历史客户
   */
  historicalCustomers: string;
  /**
   * 身份证号码
   */
  idCard: string;
  /**
   * 身份证照片地址
   */
  idCardPictureUrl: string[];
  /**
   * 银行卡图片地址
   */
  bankCardPictureUrl: string[];
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 创建人名称
   */
  creatorName: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 更新时间
   */
  revisedTime: string;
  /**
   * 业务归属 “4广州”|“8杭州”
   */
  regionId: string;
  /**
   * 板房类型
   */
  externalRoomEnum:
  | 'COOPERATIVE_ROOM'
  | 'SHARED_ROOM'
  | 'PART_TIME_ROOM'
  | 'SUPPLIER_ROOM';
  /**
   * 启用还是禁用 YES|NO
   */
  enable: 'NO' | 'YES';
  /**
   * 账户类型（公账单/私账）
   */
  accountType: string;
  /**
   * 开户账号(卡号)
   */
  bankCardNumber: string;
  /**
   * 账户名称
   */
  accountName: string;
  /**
   * 开户行及支行
   */
  openingBank: string;
  /**
   * 银行名称
   */
  bankName: string;
  /**
   * 银行所在省
   */
  bankProvince: string;
  /**
   * 银行所在市
   */
  bankCity: string;
  /**
   * 版房业务类型（兼职版房才有值）
   */
  busTypes: string[];
  /**
   * 付款渠道(1-平台支付;2-版房支付
   */
  paymentChannel: string;
  /**
   * 税费补贴率
   */
  taxSubsidyFeeRate: string;
};

/**
 * 日产均量 json
 */
export interface IListNameResAverageDailyOutput {
  /**
   * 整件女装value
   */
  wholeWomenClothing: string;
  /**
   * 整件男装value
   */
  wholeMenClothing: string;
  /**
   * 整件童装value
   */
  wholeChildrenClothing: string;
  /**
   * 车版女装value
   */
  makeWomenClothing: string;
  /**
   * 车版男装value
   */
  makeMenClothing: string;
  /**
   * 车版童装value
   */
  makeChildrenClothing: string;
}
/**
 * 人员配置 json
 */
export interface IListNameResPersonnelAllocation {
  /**
   * 纸样师傅value
   */
  designMaster: string;
  /**
   * 车版师傅value
   */
  makeMaster: string;
  /**
   * 兼职纸样师傅value
   */
  partTimeMaster: string;
  /**
   * 兼职车版师傅value
   */
  partTimeMake: string;
}
// ⬆️ 根据名称模糊查询板房列表响应体
// ⬇️ 通过PID(商品编码)查询在好料网已上架商品详情响应体 接口：https://yapi.tiangong.site/project/38/interface/api/3662
export interface IDigitalPaintingGetCommodityDetailByCodeRes {
  commodityInfoVo: IDigitalPaintingGetCommodityDetailByCodeResCommodityInfoVo;
  /**
   * sku信息
   */
  commoditySkuVos: IDigitalPaintingGetCommodityDetailByCodeResCommoditySkuVosItem[];
  /**
   * 来源类型 "1":百布 "2":"天工" “4”:“中台”
   */
  dataSourceType: string;
}
/**
 * 商品信息
 */
export interface IDigitalPaintingGetCommodityDetailByCodeResCommodityInfoVo {
  /**
   * 商品ID（业务ID）
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
   * 商品别名
   */
  commodityAlias: string;
  /**
   * 商品货号（人工录入）
   */
  commodityNumber: string;
  /**
   * 商品logo，单张图片
   */
  commodityLogo: string;
  /**
   * 实际克重
   */
  actualWeight: string;
  /**
   * 实际克重单位
   */
  actualWeightUnit: string;
  /**
   * 兼容天工、中台格式化后的克重
   */
  weightStrFormat: string;
  /**
   * 布料（成分）
   */
  materials: IDigitalPaintingGetCommodityDetailByCodeResMaterialsItem[];
}
export interface IDigitalPaintingGetCommodityDetailByCodeResMaterialsItem {
  /**
   * 布料名称
   */
  name: string;
  /**
   * 百分比（数字，不带百分号）
   */
  percent: string;
}
export interface IDigitalPaintingGetCommodityDetailByCodeResCommoditySkuVosItem {
  /**
   * sku色号（人工录入）
   */
  colorNumber: string;
  /**
   * 商品货号（人工录入）
   */
  commodityNumber: string;
  /**
   * 图稿名称
   */
  sketchName: string;
  /**
   * sku组合描述
   */
  skuDesc: string;
  /**
   * 商品ID（业务ID）
   */
  commodityId: string;
  /**
   * sku组合 json字符串
   */
  skuCombination: string;
  /**
   * sku色号描述
   */
  colorNumberDesc: string;
  /**
   * SKU_ID（业务ID）
   */
  skuId: string;
  /**
   * sku编码
   */
  skuCode: string;
  /**
   * 是否启用 0-未启用 1-启用
   */
  isEnable: string;
}
// ⬆️ 通过PID(商品编码)查询在好料网已上架商品详情响应体

// ⬇️ 查询供应商的描稿费用请求体 接口：https://yapi.tiangong.site/project/38/interface/api/3750
export interface IDigitalPaintingGetDigitalPaintingFeeReq {
  /**
   * 供应商ID
   */
  supplierId: string;
  /**
   * 描稿版次 1头版2复色
   * 参考 tech.tiangong.sdp.clothes.enums.digitalpainting.EditionTypeEnums
   */
  editionType: EDITION_TYPE_ENUM;
  /**
   * 描稿类型字典ID
   */
  paintingType: string;
  /**
   * 描稿类型字典名称
   */
  paintingTypeName: string;

}
// ⬆️ 查询供应商的描稿费用请求体

// ⬇️ 列表出描稿类型响应体 接口：https://yapi.tiangong.site/project/38/interface/api/3970
export interface IDigitalPaintingListPaintingTypeItem {
  /**
   * 类型ID
   */
  id: string;
  /**
   * 类型名称
   */
  name: string;
}
// ⬆️ 列表出描稿类型响应体
