import { getConfigByCode } from '../../../api';
import { EXTEND_LABEL } from '../constant';

export const getConfig = async (categoryCode: string) => {
  if (!categoryCode) {
    return [];
  }
  const { data } = await getConfigByCode(categoryCode);
  const { extendLabel } = data;
  return extendLabel.split(',') as EXTEND_LABEL[];
};
