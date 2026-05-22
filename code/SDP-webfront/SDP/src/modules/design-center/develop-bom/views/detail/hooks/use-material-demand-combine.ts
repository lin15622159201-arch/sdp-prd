import { cloneDeep } from 'lodash-es';
import { usePrototypeNameSort } from '../../hooks/use-prototype-name-sort';
import { toRaw } from 'vue';
import { DESIGN_MATERIAL_TYPE_ENUM } from '../../../constant';

interface INeedFiles {
  demandType: DESIGN_MATERIAL_TYPE_ENUM;
  prototypeMaterialName: string;
}
export const useMaterialDemandCombine = <T extends INeedFiles>(originMaterialList: T[], originDemandList: any) => {
  const bomOrderMaterialListComplete: Array<T & {
    __f_hasDemand?: boolean;
    __f_demandInfo?: any;
  }> = cloneDeep(toRaw(originMaterialList)).map(v => ({
    ...v,
    __f_hasDemand: false,
    __f_demandInfo: undefined
  }));
  // 把需求列表里面对应的物料取出来放到物料列表;
  originDemandList?.forEach((materialDemand: any) => {
    if (materialDemand.bomOrderMaterial) {
      const material = cloneDeep(materialDemand.bomOrderMaterial) as any;
      material.__f_hasDemand = true;
      material.__f_demandInfo = materialDemand;
      bomOrderMaterialListComplete.push(material);
    }
  });
  return usePrototypeNameSort(bomOrderMaterialListComplete);
};
