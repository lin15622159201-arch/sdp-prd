/**
 * el-checkbox 组件的全选通用逻辑
 */
import { computed, Ref } from 'vue';

export const useCheckAll = <T = string>(options: Ref<T[]>, selectedValues: Ref<T[]>) => {
  // 全选状态
  const isAllChecked = computed({
    get: () => {
      const allOptions = options.value;
      const selected = selectedValues.value;
      return allOptions.length > 0 && allOptions.length === selected.length;
    },
    set: (checked: boolean) => {
      if (checked) {
        // 全选：将所有选项添加到已选中列表
        selectedValues.value = [...options.value];
      } else {
        // 取消全选：清空已选中列表
        selectedValues.value = [];
      }
    },
  });

  // 半选状态：部分选中但不是全选
  const isIndeterminate = computed(() => {
    const selected = selectedValues.value;
    return selected.length > 0 && selected.length < options.value.length;
  });

  return {
    isAllChecked,
    isIndeterminate,
  };
};
