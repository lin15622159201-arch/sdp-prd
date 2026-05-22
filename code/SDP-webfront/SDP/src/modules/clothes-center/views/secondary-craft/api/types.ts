import { YES_NO_ENUM } from '@/constant';
import { CURRENT_NODE_ENUM } from '../constant';
import { TIMECONSUMING_SORT_ENUM } from '@/modules/clothes-center/constant/types';

/**
 * 二次工艺汇总列表
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2400
 */
export interface ISecondCraftListReq {
  /**
   * 是否展示取消订单
   */
  showCancel?: boolean;
  pageNum?: number;
  pageSize?: number;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 技术组别编码
   */
  techniqueGroup?: string;
  /**
   * 工艺类型 一级分类 ---中文
   */
  category1?: string;
  /**
   * 工艺类型 二级分类 ---中文
   */
  category2?: string;
  /**
   * 工艺类型 三级分类 ---中文
   */
  category3?: string;
  /**
   * 当前耗时-开始（精确到小时）
   */
  timeConsumingStart?: string;
  /**
   * 当前耗时-结束（精确到小时）
   */
  timeConsumingEnd?: string;
  /**
   * 当前耗时排序 ascending:升序,descending:降序
   */
  timeConsumingSort?: TIMECONSUMING_SORT_ENUM;
  /**
   * 设计师id【设计师】
   */
  designerIdList: string[];
  /**
   * 设计组编号
   */
  designerGroupCodeList: string[];
  /**
   * 工艺当前环节状态
   */
  state?: CURRENT_NODE_ENUM | '';
  /**
   * 当前状态创建开始时间
   */
  currentStateCreatedTimeStart?: string;
  /**
   * 当前状态创建结束时间
   */
  currentStateCreatedTimeEnd?: string;
  /**
   * 工艺环节,字典code
   */
  craftsProcessCode?: string;
  /**
   * 样衣版本
   */
  clothesVersion?: string;
  /**
   * 承接方式,{CRAFT_GROUP:工艺组,CUSTOMER:客户}
   */
  undertakeType?: string;
  /**
   * 打版类型
   */
  sampleType?: string;
  /**
   * 打版类型集合: 1-大货打版 2-正常打版 3-复色打版
   */
  sampleTypeList: string[];
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: string;
  /**
   * 是否工艺补充(1-已补充、0-待补充)
   */
  isCraftSupplement?: string;
  /**
   * 工艺取消开始时间
   */
  cancelTimeStart?: string;
  /**
   * 工艺取消结束时间
   */
  cancelTimeEnd?: string;
  /**
   * 取消环节
   */
  cancelPreState?: CURRENT_NODE_ENUM | '';
  /**
   * 是否查询我的 true=我的、false/null=全部  ---plm-v.13
   */
  personal?: boolean;
  /**
   * 区域id  ---plm-v.13
   */
  regionId?: string;
  /**
   * 是否套版款: 0 否 1是
   */
  copyReferType?: string;
  /**
   * 是否衍生款: 0 否 1是
   */
  extendReferType?: string;
  /**
   * 是否改款  1:是  0：否   改款0.1
   */
  isChange?: string;
  /**
   * 是否引用
   */
  isReference?: string;
  /**
   * 款式类别：0-平台 1-大客户 2-其他
   */
  styleCategory?: string;
  /**
   * 波段编码集合
   */
  waveBandCodeList: string[];
  techniqueGroupList?: string[];
  cancelTime?: string[];
  // 创建时间
  currentStateCreatedTime?: string[];
  craftTypeList?: string[];
  // 当前耗时
  timeConsumingList?: string[];
}

export interface ISecondCraftListRes {
  page?: number;
  total?: number;
  list: ISecondCraftListResListItem[];
}

export interface ISecondCraftListResListItem {
  /**
   * 二次工艺主键id
   */
  secondCraftId?: string;
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
   * 工艺当前环节状态
   */
  state?: CURRENT_NODE_ENUM | '';
  /**
   * 工艺要求:  100:裁版前工艺 110:裁版后工艺
   */
  craftsRequire?: string;
  /**
   * 工艺环节,字典code
   */
  craftsProcessCode?: string;
  /**
   * 工艺环节,字典值
   */
  craftsProcessName?: string;
  /**
   * 承接方式,{CRAFT_GROUP:工艺组,CUSTOMER:客户}
   */
  undertakeType?: string;
  /**
   * 工艺图片列表
   */
  craftPictureList: string[];
  /**
   * 当前时间
   */
  currentTime?: number;
  /**
   * 二次工艺需求创建时间
   */
  craftCreatedTime?: number;
  /**
   * 版单id
   */
  clothesId?: string;
  /**
   * 打版类型: 1-大货打版 2-正常打版 3-复色打版 4-补做打版
   */
  sampleType?: string;
  /**
   * 版本号
   */
  versionNum?: string;
  /**
   * 设计版单id
   */
  prototypeId?: string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode?: string;
  /**
   * 原始加工单号
   */
  baseProcessCode?: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户图片列表
   */
  customerPictureList: string[];
  /**
   * 设计图片列表
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
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: string;
  /**
   * 异常单号
   */
  anomalyCode?: string;
  /**
   * 异常类型
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
   * 取消环节
   */
  cancelPreState?: CURRENT_NODE_ENUM;
  /**
   * 区域id  ---plm-v.13
   */
  regionId?: string;
  /**
   * 区域名称  ---plm-v.13
   */
  regionName?: string;
  /**
   * 版单是否取消 0-否、1-是  ---plm-v.1.4分支1
   */
  isCancel?: YES_NO_ENUM;
  /**
   * 工艺处理登记人ID
   */
  handleRegistrantId?: string;
  /**
   * 工艺处理登记人名称
   */
  handleRegistrantName?: string;
  /**
   * 工艺处理登记时间
   */
  handleRegistrantTime?: number;
  /**
   * 套版款：1 衍生款：2
   */
  styleReferType?: string;
  /**
   * 套版款/衍生款的设计款号
   */
  styleReferDesignCode?: string;
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
   * 客户图片{多张以英文逗号分隔}
   */
  customerPicture?: string;
  remark?: string;
}

/**
 * 二次工艺状态数量统计
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2402
 */
export interface ISecondCraftStateStatisticsReq {
  /**
   * 是否查询我的 true=我的、false/null=全部  ---plm-v.13
   */
  personal?: boolean;
}

export interface ISecondCraftStateStatisticsRes {
  /**
   * 总数量 只统计补充工艺、待分配、待到料、处理中 状态
   */
  totalQuantity?: string;
  /**
   * 状态统计列表
   */
  stateStatisticsList: ISecondCraftStateStatisticsResStateStatisticsListItem[];
}

export interface ISecondCraftStateStatisticsResStateStatisticsListItem {
  /**
   * 二次工艺状态
   */
  secondCraftDemandState?: CURRENT_NODE_ENUM | '';
  /**
   * 数量
   */
  quantity?: string;
}

/**
 * 补充工艺
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2401
 */
export interface ISecondCraftSupplementReq {
  /**
   * 二次工艺id
   */
  secondCraftId: string;
  /**
   * 工艺环节,字典code
   */
  craftsProcessCode: string;
  /**
   * 工艺环节,字典值
   */
  craftsProcessName: string;
}
