<!-- 花型上身任务详情 -->
<template>
  <div class="tw-w-200px">
    <div class="info-item">任务：{{ product?.taskCode || "-" }}</div>
    <div class="info-item">类型：虚拟换衣</div>
    <div class="info-item">换衣模型：{{ taskDetail?.modeName || "-" }}</div>
    <div v-if="taskDetail?.sourceBusinessCode && ['prototype_manage', 'spot_style'].includes(taskDetail.taskSource || '')" class="info-item">款式SPU：{{ taskDetail?.sourceBusinessCode }}</div>
  </div>
  <div class="bg-img-box">
    <div class="t-f">模特：</div>
    <div v-if="taskDetail?.modelMaterialUrl" class="bg-img-item">
      <el-image
        class="tw-w-80px tw-h-80px"
        :src="taskDetail.modelMaterialUrl"
        :preview-src-list="[taskDetail.modelMaterialUrl]"
        show-progress
        fit="cover"
      />
    </div>
    <span v-else>-</span>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref, watch } from 'vue';
import { IPickingStylePageResListItem } from '../../aigc-selection-list/api/type';
import { webStyleGenApi } from '../api';
import { WebVirtualTryonRes } from '../api/type';

const props = defineProps({
  product: {
    type: Object as PropType<IPickingStylePageResListItem>,
    default: null,
  },
});
const emit = defineEmits<{
  (e: 'setDetails', value: { taskSource?: string; sourceBusinessId?: string; }): void;
}>();
const taskDetail = ref<WebVirtualTryonRes>();
const taskId = computed(() => props.product?.designTaskId || '');
const getDetailData = async () => {
  if (taskId.value) {
    const res = await webStyleGenApi(taskId.value);
    taskDetail.value = res.data;
    emit('setDetails', {
      taskSource: res.data.taskSource,
      sourceBusinessId: res.data.sourceBusinessId,
    });
  }
};
watch(
  () => taskId.value,
  () => {
    getDetailData();
  },
  {
    immediate: true,
  }
);

defineExpose({
  taskDetail,
});
</script>

<style lang="scss" scoped>
.info-item {
  margin: 10px 0 20px;
  color: gray;
  &:last-child {
    margin-bottom: 0;
  }
}
.bg-img-box {
  display: flex;
  width: 100%;
  margin-top: 30px;
}
.bg-img-item {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.t-f {
  white-space: nowrap;
  padding-left: 10px;
}
</style>
