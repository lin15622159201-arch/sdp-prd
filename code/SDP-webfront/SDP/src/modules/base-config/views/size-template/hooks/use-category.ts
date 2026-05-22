import { computed, ref } from 'vue';
import { computedEager } from '@vueuse/core';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';

function useCategory(isAll: boolean = false) {
  const { getDictionaryOptions } = useDictionary();
  const categoryList = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PIMS_CATEGORY, 3, undefined, isAll) || [];
  });

  const categoryTreeMap = ref<Record<'valueMap' | 'codeMap', Record<string, string[]>>>({
    /**
     * 用于code 匹配 value[]
     */
    valueMap: {},
    /**
     * 用于 code 匹配 label[]
     */
    codeMap: {},
  });

  const categoryTreeList = computed(() => {
    const list: typeof categoryList.value = [];

    categoryList.value.forEach((item1) => {
      if (!item1.children?.length) return;
      const data = { ...item1 };

      const children = data.children
        // 过滤没有三级的数据
        ?.filter(item2 => !!item2.children?.length)
        .map((item2) => {
          item2.children?.forEach((item3) => {
            // 删除三级以下的
            delete item3.children;

            const { value, label } = item3;
            categoryTreeMap.value.valueMap[value!] = [
              item1.value,
              item2.value,
              value,
            ];

            categoryTreeMap.value.codeMap[value!] = [
              item1.label!,
              item2.label!,
              label!,
            ];
          });
          return item2;
        });

      if (children?.length) {
        data.children = children! as any;
        list.push(data);
      }
    });
    console.log('categoryTreeMap=', categoryTreeMap.value);
    console.log('list==', list);
    return list;
  });

  const isDone = computedEager(() => !!categoryTreeList.value.length);

  return {
    categoryTreeMap,
    categoryTreeList,
    isDone,
  };
}

export default useCategory;
