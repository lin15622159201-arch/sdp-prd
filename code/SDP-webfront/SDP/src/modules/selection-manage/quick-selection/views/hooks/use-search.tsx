import { computed } from 'vue';
import { useDictionary } from '@/hooks/use-dictionary';
import { CUSTOM_DICTIONARY_KEY, DICTIONARY_KEY } from '@/constant/dictionary';


export const useSearch = () => {
  const { getDictionaryOptions } = useDictionary();
  
  const SHOP_LIST = computed(() => {
    return getDictionaryOptions(CUSTOM_DICTIONARY_KEY.SHOP_LIST) || [];
  });
  /** 波段 */
  const plmClothingBand = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PLM_CLOTHING_BAND) || [];
  });
  

  return {
    SHOP_LIST,
    plmClothingBand
  };
};
