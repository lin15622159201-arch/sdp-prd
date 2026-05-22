import { DICTIONARY_KEY } from '@/constant/dictionary';
import { useDictionary } from '@/hooks/use-dictionary';
import { computed } from 'vue';

export const useGetScene = () => {
  const { getDictionaryOptions } = useDictionary();
  const sceneList = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.JV_SCENE);
  });

  return {
    sceneList,
  };
};
