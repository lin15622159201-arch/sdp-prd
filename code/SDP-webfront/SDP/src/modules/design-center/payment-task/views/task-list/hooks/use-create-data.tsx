import { computed, ref } from 'vue';
// import { TYPE_OF_OPENING_LIST } from '../../../constant/index';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY, CUSTOM_DICTIONARY_KEY } from '@/constant/dictionary';


export const useCreateData = () => {
  const { getDictionaryOptions } = useDictionary();
  /** 波段 */
  const plmClothingBand = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PLM_CLOTHING_BAND) || [];
  });
  /** 平台 */
  const stockgoodsType = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.STOCKGOODS_TYPE) || [];
  });
  
  /** 店铺 */
  const shopList = computed(() => {
    return getDictionaryOptions(CUSTOM_DICTIONARY_KEY.SHOP_LIST) || [];
  });

  const TYPE_OF_OPENING_LIST = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PRODUCT_TAG) || [];
  });

  return {
    plmClothingBand,
    shopList,
    TYPE_OF_OPENING_LIST,
    stockgoodsType
  };
};
