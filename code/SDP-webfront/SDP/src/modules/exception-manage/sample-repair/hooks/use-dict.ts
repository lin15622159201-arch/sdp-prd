import { DICTIONARY_KEY } from '@/constant/dictionary';
import { useDictionary } from '@/hooks/use-dictionary';
import { computed } from 'vue';

const useDict = () => {
  const { getDictionaryOptions } = useDictionary();

  /** 返修原因ops */
  const PLM_REPAIR_REASON_OPTIONS = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PLM_REPAIR_REASON) || [];
  });

  return {
    PLM_REPAIR_REASON_OPTIONS,
  };
};

export default useDict;
