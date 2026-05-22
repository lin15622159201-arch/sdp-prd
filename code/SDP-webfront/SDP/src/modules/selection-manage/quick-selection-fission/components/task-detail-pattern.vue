<!-- 花型上身任务详情 -->
<template>
  <div class="tw-w-200px">
    <div class="info-item">任务：{{ product?.taskCode || "-" }}</div>
    <div class="info-item">算法品类：{{ taskDetail?.categoryName || "-" }}</div>
    <div class="info-item">类型：花型上身</div>
    <div class="info-item">模型：{{ taskDetail?.modelName || "-" }}</div>
  </div>
  <div class="bg-img-box">
    <div class="t-f">花型图片：</div>
    <div v-if="taskDetail?.patternImgUrl" class="bg-img-item">
      <el-image
        class="tw-w-80px tw-h-80px"
        :src="taskDetail.patternImgUrl"
        :preview-src-list="[taskDetail.patternImgUrl]"
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
import { fetchFloralPatternApplyTaskDetail } from '../api';
import { IFloralPatternApplyTaskDetailRes } from '../api/type';

const props = defineProps({
  product: {
    type: Object as PropType<IPickingStylePageResListItem>,
    default: null,
  },
});

const taskDetail = ref<IFloralPatternApplyTaskDetailRes>();
const taskId = computed(() => props.product?.designTaskId || '');
const getDetailData = async () => {
  if (taskId.value) {
    const res = await fetchFloralPatternApplyTaskDetail(taskId.value);
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
