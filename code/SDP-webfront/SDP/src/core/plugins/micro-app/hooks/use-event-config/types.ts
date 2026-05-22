import type { GET_MATERIAL_EVENT_SCENE, COMMODITY_TYPE } from '../../constant';

/**
 * 获取bom信息
 */
export interface TGetMaterialRes {
  scene: GET_MATERIAL_EVENT_SCENE;
  commodityType: COMMODITY_TYPE;
  skuIds: string[];
  spuSkuList: { spuId: string; skuId: string; }[];
}
export interface ICloseDemandSuccessRes {
  demandId: string;
}

/**
 * 获取 面料库 查询入参和scrollTop
 */
export interface IFabricListParams {
  /**
   * 面料入参参考
   * @see https://yapi.tiangong.site/project/2442/interface/api/189161
   */
  params: Record<string, any>;
  /* 滚动条高度 */
  curScrollTop: string | number;
}

/**
 * 获取 辅料库 查询入参和scrollTop
 */
export interface IAccessoryListParams {
  /**
   * 辅料入参参考
   * @see https://yapi.tiangong.site/project/912/interface/api/186601
   */
  params: Record<string, any>;
  /* 滚动条高度 */
  curScrollTop: string | number;
}

/**
 * 获取 帮我找料 查询入参和scrollTop
 */
export interface IDemandListParams {
  /**
   * 帮我找料入参参考
   * @see https://yapi.ibaibu.com/project/2616/interface/api/223265
   */
  params: Record<string, any>;
  /* 滚动条高度 */
  curScrollTop: string | number;
}

/**
 * 获取 新品专区 查询入参和scrollTop
 */
export interface INewListParams {
  /**
   * 新品专区入参参考
   * @see https://yapi.ibaibu.com/project/2442/interface/api/225435
   */
  params: Record<string, any>;
  /* 滚动条高度 */
  curScrollTop: string | number;
}

/**
 * 3D任务采集需要的参数
 */
export interface IThreeDCollectParams {
  /**
   * skc
   */
  skcCode: string;
  /**
   * 设计师id
   */
  designerId: string;
  /**
   * 设计师名称
   */
  designerName: string;
  /**
   * 平台
   */
  platform: string;
  /**
   * 数据来源
   */
  dataSource: string;
}
