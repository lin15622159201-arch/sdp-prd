import mitt, { EVENT_BUS_ENUM } from '@/core/event';
import {
  // postAccessoryDetailsBySkuApi,
  // postFabricfDetailsBySkuApi,
  postMaterialBySkuIdList,
} from '@/api/product';
import {
  IBomGoodMaterialFabricMaterialListItem as IFabricListItem,
  IBomGoodMaterialAccessoriesMaterialListItem as IAccessoryListItem,
} from '@/api/product/types';

import { COMMODITY_TYPE } from '@/core/plugins/micro-app/constant';

// import type {
//   IDetailsSkuResItem as IAccessoryListItem,
//   ISkuListSkuListItem as IFabricListItem,
// } from '@/api/product/types';
import type {
  TGetMaterialRes,
  ICloseDemandSuccessRes,
} from '@/core/plugins/micro-app/hooks/use-event-config';
import { onActivated, onDeactivated, onMounted, onUnmounted, ref } from 'vue';
// import _ from 'lodash-es';

// interface IAccessoryListItemExtend extends IAccessoryListItem {
//   skuId?: string;
//   skuCode?: string;
//   skuAttrs?: string;
//   prices?: any[];
//   packAssistantUnitName?: string;
//   __f_matchSkuItem: Record<string, any>;
// }
// export type {
//   IFabricListItem,
//   IAccessoryListItemExtend,
// };
type IEventData = TGetMaterialRes | ICloseDemandSuccessRes;
interface IOnEmitEvent {
  type: string;
  data: IEventData;
}
interface IOpts {
  onEmit?: (event?: IOnEmitEvent) => void;
}

export default function useHouliuBom(opts?: IOpts) {
  const { HOULIU_BOM_APP } = EVENT_BUS_ENUM;
  const onEmit = opts?.onEmit || (() => {});
  // 辅料列表
  const assistList = ref<IAccessoryListItem[]>([]);
  const assistSearchWithoutResultSkuIdList = ref<string[]>([]);
  // 面料
  const fabricList = ref<IFabricListItem[]>([]);
  const fabricSearchWithoutResultSkuIdList = ref<string[]>([]);

  const listenBomEvent = async (event: TGetMaterialRes) => {
    console.log('添加 BOM event =>>', event);
    const skuIds = event.skuIds || [];
    const spuSkuList = event.spuSkuList || [];
    const { commodityType } = event;

    if (commodityType === COMMODITY_TYPE.ACCESSORY) {
      const { data } = await postMaterialBySkuIdList({
        accessoriesSpuSkuList: spuSkuList,
      });
      // 把没有返回对应物料的skuId存起来
      if (data?.accessoriesMaterialList?.length !== skuIds?.length) {
        const resSkuIdList = data.accessoriesMaterialList.map(v => v.skuId);
        assistSearchWithoutResultSkuIdList.value = skuIds.filter((skuIdItem) => {
          return !resSkuIdList.includes(skuIdItem);
        });
      }
      assistList.value = data?.accessoriesMaterialList || [];
    } else if (commodityType === COMMODITY_TYPE.FABRIC) {
      const { data } = await postMaterialBySkuIdList({
        fabricSpuSkuList: spuSkuList,
      });
      // 把没有返回对应物料的skuId存起来
      if (data?.fabricMaterialList?.length !== skuIds?.length) {
        const resSkuIdList = data.fabricMaterialList.map(v => v.skuId);
        fabricSearchWithoutResultSkuIdList.value = skuIds.filter((skuIdItem) => {
          return !resSkuIdList.includes(skuIdItem);
        });
      }
      fabricList.value = data?.fabricMaterialList || [];
    }
    onEmit();
  };

  const listenCloseDemandSuccess = async (resData: ICloseDemandSuccessRes) => {
    onEmit({
      type: HOULIU_BOM_APP.CLOSE_DEMAND_SUCCESS,
      data: resData,
    });
  };

  onMounted(() => {
    mitt.off(HOULIU_BOM_APP.GET_MATERIAL, listenBomEvent);
    mitt.on(HOULIU_BOM_APP.GET_MATERIAL, listenBomEvent);
    mitt.off(HOULIU_BOM_APP.CLOSE_DEMAND_SUCCESS, listenCloseDemandSuccess);
    mitt.on(HOULIU_BOM_APP.CLOSE_DEMAND_SUCCESS, listenCloseDemandSuccess);
  });

  onActivated(() => {
    mitt.off(HOULIU_BOM_APP.GET_MATERIAL, listenBomEvent);
    mitt.on(HOULIU_BOM_APP.GET_MATERIAL, listenBomEvent);
    mitt.off(HOULIU_BOM_APP.CLOSE_DEMAND_SUCCESS, listenCloseDemandSuccess);
    mitt.on(HOULIU_BOM_APP.CLOSE_DEMAND_SUCCESS, listenCloseDemandSuccess);
  });

  onUnmounted(() => {
    mitt.off(HOULIU_BOM_APP.GET_MATERIAL, listenBomEvent);
    mitt.off(HOULIU_BOM_APP.CLOSE_DEMAND_SUCCESS, listenCloseDemandSuccess);
  });

  onDeactivated(() => {
    mitt.off(HOULIU_BOM_APP.GET_MATERIAL, listenBomEvent);
    mitt.off(HOULIU_BOM_APP.CLOSE_DEMAND_SUCCESS, listenCloseDemandSuccess);
  });

  return {
    listenBomEvent,
    assistList,
    assistSearchWithoutResultSkuIdList,
    fabricList,
    fabricSearchWithoutResultSkuIdList,
  };
}
