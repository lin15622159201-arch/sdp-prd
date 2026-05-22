import type {
  IBomOrderMaterialItem,
} from '../edit/types';

/**
 * 当数据组中的某项bomMaterialId改变，需要将所有对色或包扣了该项物料的物料进行同步
 */
export const useSyncColorMatchMaterialId = (
  oldMaterialId: string,
  newMaterialId: string,
  bomMaterialList: IBomOrderMaterialItem[]
) => {
  bomMaterialList.forEach((v) => {
    if (v.colorMatchMaterialId === oldMaterialId) {
      v.colorMatchMaterialId = newMaterialId;
    }
  });
};
