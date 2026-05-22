import { DICTIONARY_KEY } from '@/constant/dictionary';
import { opsDict } from '@/hooks-transfer/dictionary';

const getLabelsByCodes = (codes: string) => {
  return opsDict.mapLabels({
    codes,
    dictCode: DICTIONARY_KEY.PLM_PURCHASE_YLBW,
    cutting: ',',
  });
};

export {
  getLabelsByCodes,
};
