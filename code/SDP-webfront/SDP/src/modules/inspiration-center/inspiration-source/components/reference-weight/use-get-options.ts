import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { computed } from 'vue';

export const useGetOptions = () => {
  const { getDictionaryOptions } = useDictionary();

  const fgRefWeight = computed(() => {
    const options = getDictionaryOptions(DICTIONARY_KEY.FG_REF_WEIGHT);
    console.log('options1122', options);
    return options.map((item) => {
      const { attributes = [] } = item;
      const attr = attributes[0];
      return {
        value: Number(attr.name ?? 0),
        label: item.label,
      };
    });
  });

  return {
    fgRefWeight,
  };
};
