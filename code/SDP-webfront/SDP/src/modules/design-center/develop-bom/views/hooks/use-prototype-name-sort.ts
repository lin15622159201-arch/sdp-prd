import { sortBy } from 'lodash-es';
import { DESIGN_MATERIAL_TYPE_ENUM } from '../../constant';

interface IGetListItem {
  demandType: DESIGN_MATERIAL_TYPE_ENUM;
  prototypeMaterialName: string;
}
export const usePrototypeNameSort = <T>(list: Array<T & IGetListItem>) => {
  list = sortBy(list, (e) => {
    return e.prototypeMaterialName;
  });
  return [
    ...list.filter(v => v.demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC && v.prototypeMaterialName.startsWith('面料')),
    ...list.filter(v => v.demandType === DESIGN_MATERIAL_TYPE_ENUM.FABRIC && v.prototypeMaterialName.startsWith('里料')),
    ...list.filter(v => v.demandType === DESIGN_MATERIAL_TYPE_ENUM.ASSIST),
    ...list.filter(v => v.demandType === DESIGN_MATERIAL_TYPE_ENUM.SPECIAL_ASSIST),
  ];
};
