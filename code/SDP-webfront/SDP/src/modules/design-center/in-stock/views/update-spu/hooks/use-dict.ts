import { DICTIONARY_KEY } from '@/constant/dictionary';
import { useDictionary } from '@/hooks/use-dictionary';
import { computed, ref, Ref } from 'vue';
import { IFormData } from '../types';
import { useColorOptions } from '@/components/color-cascader/package/use-color-options';
import { IDictionaryItem } from '@/hooks/use-dictionary/types';

interface IProps {
  formData: Ref<Partial<IFormData>>;
}

export const useDict = ({ formData }: IProps) => {
  const { getDictionaryOptions, getDictionaryOptionsSync } = useDictionary();
  /** 标准尺码 true，过滤出已启用的 */
  const PLM_STANDARD_SIZE = computed(() => getDictionaryOptions(DICTIONARY_KEY.PLM_STANDARY_SIZE));
  const PLM_STANDARY_SIZE_OPTIONS = computed(() => {
    if (!formData.value?.sizeStandardCode) return [];
    const row = PLM_STANDARD_SIZE.value
      .find(v => v.value === formData.value?.sizeStandardCode)?.children?.[0];
    if (!row) return [];
    return row.label.split(',').map(v => ({
      label: v,
      value: v
    }));
  });

  const { CLOTHING_COLOR_MAP, CLOTHING_COLOR_LABEL_MAP, getColors } = useColorOptions({});
  /** 品类 */
  const CATEGORY_TREE = ref<IDictionaryItem[]>([]);
  const getCategoryTree = async () => {
    const data = await getDictionaryOptionsSync(DICTIONARY_KEY.PIMS_CATEGORY);
    CATEGORY_TREE.value = data;
  };
  const getClothingTree = async () => {
    await getDictionaryOptionsSync(DICTIONARY_KEY.PLM_CLOTHING_STYLE, undefined, 2);
  };

  return {
    CLOTHING_COLOR_MAP,
    CLOTHING_COLOR_LABEL_MAP,
    PLM_STANDARD_SIZE,
    PLM_STANDARY_SIZE_OPTIONS,
    CATEGORY_TREE,
    getClothingTree,
    getCategoryTree,
    getColors,
    getDictionaryOptionsSync
  };
};
