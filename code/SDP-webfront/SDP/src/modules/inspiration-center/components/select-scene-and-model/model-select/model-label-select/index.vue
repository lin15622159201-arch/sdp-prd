<script setup lang="ts">
import { IDictionaryItem } from '@/hooks/use-dictionary/types';
import { CascaderOption, CascaderValue, ElCascader } from 'element-plus';
import { PropType, ref } from 'vue';

const selectedLabels = defineModel<string[][]>({
  required: true,
  default: () => [],
});

defineProps({
  fmModelLabel: {
    type: Array as PropType<IDictionaryItem[]>,
    default: () => [],
  },
});

const CascaderRef = ref<InstanceType<typeof ElCascader>>();

const getCheckedLabels = () => {
  console.log('CascaderRef', CascaderRef.value?.getCheckedNodes(true));
  return CascaderRef.value?.getCheckedNodes(true) || [];
};

const handleLabelsChange = (value: string[][]) => {
  console.log('value', value);
  // 获取最后一次选择的路径
  const lastSelectedPath = value[value.length - 1];
  if (!lastSelectedPath) return;

  // 找出所有选中路径中，与最后选择的路径具有相同父节点的项
  const filteredLabels = value.filter((path) => {
    // 如果路径长度不同，保留
    if (path.length !== lastSelectedPath.length) return true;
    // 如果是同一个路径，保留
    if (path.join(',') === lastSelectedPath.join(',')) return true;
    // 检查除最后一个节点外的路径是否相同（即是否具有相同的父节点）
    const pathParent = path.slice(0, -1).join(',');
    const lastPathParent = lastSelectedPath.slice(0, -1).join(',');
    return pathParent !== lastPathParent;
  });

  // 为了保持当前打开的节点
  selectedLabels.value = filteredLabels.reverse();
  console.log('selectedLabels', selectedLabels.value);
};

defineExpose({
  getCheckedLabels,
});

</script>

<template>
  <el-cascader
    class="tw-w-full"
    popper-class="disableFirstLevel"
    ref="CascaderRef"
    v-model="selectedLabels"
    :options="fmModelLabel as CascaderOption[]"
    separator=":"
    multiple
    filterable
    placeholder="请选择标签"
    :props="{
      multiple: true,
    }"
    @change="(value: CascaderValue | null | undefined) => handleLabelsChange(value as string[][])"
  />
</template>
