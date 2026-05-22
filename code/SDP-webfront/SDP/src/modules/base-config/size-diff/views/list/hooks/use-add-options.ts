import { computed, Reactive, ref } from 'vue';
import { fetchTemuPartList } from '../../../api';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { ITemuPartListItem } from '../../../api/types';

export const useAddOptions = (formData: Reactive<{
  sizeCode: string;
  sizes: string[];
  parts: string[];
}>) => {
  const { getDictionaryOptions } = useDictionary();
  // 尺码参数选项
  const partOptions = ref<ITemuPartListItem[]>([]);
  const standardSizes = computed(() => getDictionaryOptions(DICTIONARY_KEY.PLM_STANDARY_SIZE));

  // 根据尺码组获取对应的尺码选项
  const sizeOptions = computed(() => {
    const selected = standardSizes.value.find(item => item.value === formData.sizeCode)?.children?.[0];
    const list = selected?.label?.split(',') || [];
    return list.map((size) => {
      // 如果在 attributes 中找到对应的尺码名称，对尺码进行映射
      const attr = selected?.attributes?.find(item => item.code === size);
      return attr ? attr.name : size;
    });
  });

  // 选中尺码列表（按尺码选项顺序排序）
  const selectedSizeOptions = computed(() => {
    return sizeOptions.value.filter(item => formData.sizes.includes(item));
  });
  // 选中的部位列表
  const selectedPartOptions = computed(() => {
    return partOptions.value.filter(item => formData.parts.includes(item.id));
  });

  const getPartOptions = async () => {
    const { data } = await fetchTemuPartList();
    partOptions.value = data || [];
  };
  getPartOptions();

  // 尺寸选项是否全选
  const isSizesAllChecked = computed({
    get: () => {
      const allOptions = sizeOptions.value;
      const selected = selectedSizeOptions.value;
      return allOptions.length > 0 && allOptions.length === selected.length;
    },
    set: (checked: boolean) => {
      if (checked) {
        // 全选：将所有选项添加到已选中列表
        formData.sizes = sizeOptions.value.map(item => item);
      } else {
        // 取消全选：清空已选中列表
        formData.sizes = [];
      }
    },
  });

  // 尺寸选项是否半选
  const isSizesIndeterminate = computed(() => {
    const selected = selectedSizeOptions.value;
    return selected.length > 0 && selected.length < sizeOptions.value.length;
  });

  return {
    partOptions,
    sizeOptions,
    selectedSizeOptions,
    selectedPartOptions,
    standardSizes,
    isSizesAllChecked,
    isSizesIndeterminate,
  };
};
