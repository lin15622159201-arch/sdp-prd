import { getConfigByCode } from '../api';


export const getConfig = async (categoryCode: string) => {
  if (!categoryCode) {
    return [];
  }
  const { data } = await getConfigByCode(categoryCode);
  const { extendLabel } = data;
  return extendLabel.split(',');
};
