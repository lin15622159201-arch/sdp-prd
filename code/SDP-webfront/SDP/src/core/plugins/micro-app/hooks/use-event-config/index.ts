import { HOULIU_BOM_APP } from '../../constant';
import type * as Types from './types';

const HOULIU_BOM_APP_EVENT = Object.freeze({
  /**
   * 获取 好料网 bom信息
   */
  GET_MATERIAL: `${HOULIU_BOM_APP.APP_CODE}__get-material`,
  /**
  * 好料网关闭需求成功回调
  */
  CLOSE_DEMAND_SUCCESS: `${HOULIU_BOM_APP.APP_CODE}__close-demand-success`,
  /**
  * 获取 面料库 查询入参和scrollTop
  */
  GET_FABRIC_LIST_PARAMS: `${HOULIU_BOM_APP.APP_CODE}__get-fabric-list-params`,
  /**
  * 获取 辅料库 查询入参和scrollTop
  */
  GET_ACCESSORY_LIST_PARAMS: `${HOULIU_BOM_APP.APP_CODE}__get-accessory-list-params`,
  /**
  * 获取 帮我找料 查询入参和scrollTop
  */
  GET_DEMAND_LIST_PARAMS: `${HOULIU_BOM_APP.APP_CODE}__get-demand-list-params`,
  /**
  * 获取 新品专区 查询入参和scrollTop
  */
  GET_NEW_LIST_PARAMS: `${HOULIU_BOM_APP.APP_CODE}__get-new-list-params`,
  /**
  * 子应用关闭loading
  */
  CLOSE_LOADING: `${HOULIU_BOM_APP.APP_CODE}__closeLoading`,
});

export function useEventConfig() {
  return HOULIU_BOM_APP_EVENT;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type HOULIU_BOM_APP_EVENT_TYPE = {
  [HOULIU_BOM_APP_EVENT.GET_MATERIAL]: Types.TGetMaterialRes;
  [HOULIU_BOM_APP_EVENT.CLOSE_DEMAND_SUCCESS]: Types.ICloseDemandSuccessRes;
  [HOULIU_BOM_APP_EVENT.GET_FABRIC_LIST_PARAMS]: Types.IFabricListParams;
  [HOULIU_BOM_APP_EVENT.GET_ACCESSORY_LIST_PARAMS]: Types.IAccessoryListParams;
  [HOULIU_BOM_APP_EVENT.GET_DEMAND_LIST_PARAMS]: Types.IDemandListParams;
  [HOULIU_BOM_APP_EVENT.GET_NEW_LIST_PARAMS]: Types.INewListParams;
  [HOULIU_BOM_APP_EVENT.CLOSE_LOADING]: void;
};

export * from './types';
