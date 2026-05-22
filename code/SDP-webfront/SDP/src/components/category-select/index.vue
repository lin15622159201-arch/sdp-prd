<template>
  <el-select
    class="tw-w-160px tw-mr-4"
    :model-value="categoryName"
    @click="openCategoryDialog(categoryCode || formData?.categoryCode)"
  />
</template>

<script setup lang='ts'>
import { computed, ref, shallowRef, watch } from 'vue';
import { listToTreeById } from '@/core/utils/tree';
import categoryDialog from '../categoryDialog';
import { getCategory } from '@/modules/inspiration-center/inspiration-source/api';
import { ICategoryItem } from '@/modules/inspiration-center/inspiration-source/api/type';

const props = defineProps<{
  // 如果有传入categories则使用传入的，否则请求接口获取
  categories?: ICategoryItem[];
}>();
// 双向绑定支持formData对象形式，也支持categoryCode
const formData = defineModel<{ categoryName: string; categoryCode: string; }>();
const categoryCode = defineModel<string>('code');
const apiCategoryList = shallowRef<ICategoryItem[]>([]);
const categoryList = computed(() => props.categories || apiCategoryList.value);
const categoryTree = computed(() => listToTreeById(categoryList.value, { parentIdKey: 'parentId', idKey: 'id', rootId: '0' }));

const categoryName = ref<string>('');

const emit = defineEmits<{
  (e: 'change', value: { categoryCode: string; categoryName: string; }): void;
}>();

const getCategoryList = async () => {
  if (props.categories) return;
  const { data } = await getCategory({ classCode: 'FM240402539' });
  apiCategoryList.value = data || [];
};
getCategoryList();

const openCategoryDialog = async (code?: string) => {
  const res = await categoryDialog(categoryTree.value, code, '') as ICategoryItem;
  if (formData.value) {
    formData.value.categoryCode = res.code;
    formData.value.categoryName = res.value;
  }
  if (categoryCode.value !== undefined) {
    categoryCode.value = res.code;
  }
  emit('change', { categoryCode: res.code, categoryName: res.value });
};

const getCategoryNameByCode = (code: string) => {
  const category = categoryList.value.find(item => item.code === code);
  return category?.value || '';
};

watch([() => formData.value?.categoryCode, categoryCode, categoryList], () => {
  if (formData.value?.categoryCode) {
    if (!formData.value?.categoryName) {
      formData.value.categoryName = getCategoryNameByCode(formData.value.categoryCode);
    }
    categoryName.value = formData.value.categoryName;
  }
  if (categoryCode.value) {
    categoryName.value = getCategoryNameByCode(categoryCode.value);
  }
});
</script>
