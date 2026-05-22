import { cloneDeep } from 'lodash-es';
import type {
  IBomOrderMaterialItem,
} from '../edit/types';
import { usePrototypeNameSort } from './use-prototype-name-sort';
import { toRaw } from 'vue';

export const useMaterialDemandCombine = (originMaterialList: IBomOrderMaterialItem[], originDemandList: any) => {
  const bomOrderMaterialListComplete: IBomOrderMaterialItem[] = cloneDeep(toRaw(originMaterialList));
  // 把需求列表里面对应的物料取出来放到物料列表;
  originDemandList?.forEach((materialDemand: any) => {
    if (materialDemand.bomOrderMaterial) {
      const material = cloneDeep(materialDemand.bomOrderMaterial) as IBomOrderMaterialItem;
      material.__f_hasDemand = true;
      material.__f_demandInfo = materialDemand;
      bomOrderMaterialListComplete.push(material);
    }
  });
  return usePrototypeNameSort(bomOrderMaterialListComplete);
};
