import type { IConfigItem } from '@toy/business-components';
import { computed } from 'vue';
import type { ISizeTempPageReq } from '../../../api/types';
import { useDictionary } from '@/hooks/use-dictionary';
import { CUSTOM_DICTIONARY_KEY } from '@/constant/dictionary';

export const useSearch = () => {
  const { getDictionaryOptions } = useDictionary();
  const categoryOptions = computed(() => getDictionaryOptions(CUSTOM_DICTIONARY_KEY.TEMU_CATEGORY));
  const categoryTree = computed(() => {
    const buildTree = (list: any[], parentId: string | null = null): any[] => {
      return list
        .filter(item => item.parentId === parentId)
        .map(item => ({
          ...item,
          children: buildTree(list, item.value)
        }))
        .map(item => (item.children.length > 0 ? item : { ...item, children: undefined }));
    };
    const res = buildTree(categoryOptions.value, '0');
    // 从第三级开始展示
    return res[0]?.children?.[0]?.children || [];
  });

  const searchConfig = computed<IConfigItem<ISizeTempPageReq>[]>(() => [
    {
      name: '模板名称',
      valueName: 'templateName',
      component: 'input',
    },
    {
      name: '平台品类',
      valueName: 'catId',
      component: 'cascader',
      props: {
        options: categoryTree.value,
        optionLabel: 'categoryName',
        optionValue: 'categoryId',
        filterable: true,
      }
    }
  ]);

  return {
    searchConfig,
  };
};
