<!-- 花型上身任务详情 -->
<template>
  <div class="tw-w-200px">
    <div class="info-item">任务：{{ product?.taskCode || "-" }}</div>
    <!-- <div class="info-item">算法品类：{{ taskDetail?.categoryName || "-" }}</div> -->
    <div class="info-item">类型：风格化衍生</div>
    <div class="info-item">风格模型: {{ taskDetail?.styleModelName || "-" }}</div>
  </div>
  <div class="bg-img-box">
    <div class="t-f">设置：</div>
    <div v-if="taskDetail?.bgImgUrl || taskDetail?.modelImgUrl" class="bg-img-item">
      <el-image
        v-if="taskDetail.bgImgUrl"
        class="tw-w-80px tw-h-80px"
        :src="taskDetail.bgImgUrl"
        :preview-src-list="[taskDetail.bgImgUrl || '']"
        show-progress
        fit="cover"
      />
      <el-image
        v-if="taskDetail.modelImgUrl"
        class="tw-w-80px tw-h-80px"
        :src="taskDetail.modelImgUrl"
        :preview-src-list="[taskDetail.modelImgUrl || '']"
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
import { WebStyleGenRes } from '@/modules/stylish-derivation/stylish-derived-tasks/api/types';
import { webStyleGenApi } from '@/modules/stylish-derivation/stylish-derived-tasks/api/index';

const props = defineProps({
  product: {
    type: Object as PropType<IPickingStylePageResListItem>,
    default: null,
  },
});

const taskDetail = ref<WebStyleGenRes>();
const taskId = computed(() => props.product?.designTaskId || '');
const getDetailData = async () => {
  if (taskId.value) {
    const res = await webStyleGenApi(taskId.value);
    taskDetail.value = res.data;
  }
};
watch(
  () => taskId.value,
  () => {
    getDetailData();
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
