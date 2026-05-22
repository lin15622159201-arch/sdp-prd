import { computed } from 'vue';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';

export const useDict = () => {
  const { getDictionaryOptions, getDictionaryOptionsSync } = useDictionary();
  // 站点
  const temuSiteList = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.TEMU_SITE) || [];
  });

  // 承诺发货时效
  const temu_timeframeList = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.TEMU_TIME_FRAME) || [];
  });
  return {
    temuSiteList,
    temu_timeframeList,
    getDictionaryOptionsSync,
  };
};
