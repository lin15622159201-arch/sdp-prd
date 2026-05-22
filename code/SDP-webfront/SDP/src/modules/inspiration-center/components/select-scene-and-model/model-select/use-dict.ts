import { DICTIONARY_KEY } from '@/constant/dictionary';
import { useDictionary } from '@/hooks/use-dictionary';
import { computed } from 'vue';

export const useDict = () => {
  const { getDictionaryOptions } = useDictionary();
  const fmModelLabel = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.FM_MODEL_LABEL) || [];
  });

  return {
    fmModelLabel,
  };
};
