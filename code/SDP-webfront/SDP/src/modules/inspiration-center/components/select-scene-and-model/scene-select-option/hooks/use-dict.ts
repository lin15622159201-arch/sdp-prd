import { DICTIONARY_KEY } from '@/constant/dictionary';
import { useDictionary } from '@/hooks/use-dictionary';
import { CascaderOption } from 'element-plus';
import { computed } from 'vue';

export const useDict = () => {
  const { getDictionaryOptions } = useDictionary();
  const JV_SCENE = computed(() => {
    const option = getDictionaryOptions(DICTIONARY_KEY.JV_SCENE);
    return option as CascaderOption[];
  });
  const JV_STYLE = computed(() => {
    const option = getDictionaryOptions(DICTIONARY_KEY.JV_STYLE);
    return option as CascaderOption[];
  });

  return {
    JV_SCENE,
    JV_STYLE,
  };
};
