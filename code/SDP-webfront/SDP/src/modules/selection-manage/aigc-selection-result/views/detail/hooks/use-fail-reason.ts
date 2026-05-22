import { computed } from 'vue';

import { DICTIONARY_KEY } from '@/constant/dictionary';
import { useDictionary } from '@/hooks/use-dictionary';
import { IDictionaryItem } from '@/hooks/use-dictionary/types';

function getLeafNodes(node: IDictionaryItem): IDictionaryItem[] {
  const result: IDictionaryItem[] = [];

  // 如果没有子节点，当前节点就是叶子节点
  if (!node.children || node.children.length === 0) {
    result.push(node);
    return result;
  }

  node.children.forEach((child) => {
    result.push(...getLeafNodes(child));
  });

  return result;
}

export const useFailReason = () => {
  const { getDictionaryOptions } = useDictionary();
  const failReasonOptions = computed(() => {
    const options = getDictionaryOptions(DICTIONARY_KEY.RUNNING_DIAGRAM);

    return getLeafNodes({ children: options } as IDictionaryItem);
  });

  return {
    failReasonOptions,
  };
};
