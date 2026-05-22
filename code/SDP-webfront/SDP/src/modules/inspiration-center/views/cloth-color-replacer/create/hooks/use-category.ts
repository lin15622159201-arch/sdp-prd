import { listToTreeById } from '@/core/utils/tree';
import { getCategory } from '@/modules/inspiration-center/inspiration-source/api';
import { ICategoryItem } from '@/modules/inspiration-center/inspiration-source/api/type';
import { computed, ref } from 'vue';

export const useCategory = () => {
  const categoryList = ref<ICategoryItem[]>([]);
  const categoryTree = computed(() => listToTreeById(categoryList.value, { parentIdKey: 'parentId', idKey: 'id', rootId: '0' }));

  const getCategoryList = async () => {
    const res = await getCategory({ classCode: 'FM240402539' });
    categoryList.value = res.data || [];
  };

  /** 查找二级分类名称 */
  const findSecondLevelCategoryName = (cName?: string, nextCName?: string): string | undefined => {
    if (!cName) return '';
    const category = categoryList.value.find(item => item.value === cName);
    const isTopLevel = category?.parentId === '0' || !category?.parentId;
    if (isTopLevel) {
    // 如果是顶层，把上一级返回
      return nextCName;
    }

    const parentCategory = categoryList.value.find(item => item.id === category.parentId);
    return findSecondLevelCategoryName(parentCategory?.value, cName) as string | undefined;
  };

  return {
    categoryList,
    categoryTree,
    getCategoryList,
    /** 查找二级分类名称 */
    findSecondLevelCategoryName
  };
};
