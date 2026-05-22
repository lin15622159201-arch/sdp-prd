import { uniqueId } from 'lodash-es';

export const prefix = '__f_uuid_';
export const useGenerateLocalBomMaterialId = () => {
  return uniqueId(prefix);
};

export const PREFIX_DEMAND = '__f_uuid_demand_';
export const useGenerateLocalBomMaterialDemandId = () => {
  return uniqueId(PREFIX_DEMAND);
};
