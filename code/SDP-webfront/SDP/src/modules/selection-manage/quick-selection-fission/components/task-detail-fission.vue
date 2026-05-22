<!-- 姿势裂变任务详情 -->
<template>
  <div class="text-left">
    <div class="m-5">任务：{{ product?.taskCode ?? "-" }}</div>
    <div class="m-5">类型：姿势裂变</div>
    <div class="m-5">模型：{{ designTaskData?.styleGenTask?.styleModelName ?? "-" }}</div>
    <div v-if="designTaskData?.sourceBusinessCode && ['prototype_manage', 'spot_style'].includes(designTaskData.taskSource || '')" class="m-5">款式SPU：{{ designTaskData?.sourceBusinessCode }}</div>
  </div>
  <div class="bg-img-box">
    <div class="t-f">背景：</div>
    {{ !designTaskData?.styleGenTask?.modelImgUrl && !designTaskData?.styleGenTask?.bgImgUrl ? "-" : "" }}
    <div class="bg-img-item">
      <el-image
        v-if="designTaskData?.styleGenTask?.modelImgUrl"
        style="width: 70px; height: 80px"
        :src="designTaskData?.styleGenTask?.modelImgUrl"
        :preview-src-list="[designTaskData?.styleGenTask?.modelImgUrl ?? '']"
        show-progress
        :initial-index="0"
        fit="cover"
      />
      <el-image
        v-if="designTaskData?.styleGenTask?.bgImgUrl"
        style="width: 70px; height: 80px"
        :src="designTaskData?.styleGenTask?.bgImgUrl"
        :preview-src-list="[designTaskData?.styleGenTask?.bgImgUrl ?? '']"
        show-progress
        :initial-index="0"
        fit="cover"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref, watch } from 'vue';
import { ByIdRes, IPickingStylePageResListItem } from '../../aigc-selection-list/api/type';
import { byIdApi } from '../../aigc-selection-list/api';

const props = defineProps({
  product: {
    type: Object as PropType<IPickingStylePageResListItem>,
    default: null,
  },
});
const emit = defineEmits<{
  (e: 'setDetails', value: { taskSource?: string; sourceBusinessId?: string; }): void;
}>();
const designTaskData = ref<ByIdRes>({});
const taskId = computed(() => props.product?.designTaskId || '');
// 获取ai任务
const designTask = async () => {
  if (taskId.value) {
    const res = await byIdApi(taskId.value);
    designTaskData.value = res.data;
    emit('setDetails', {
      taskSource: res.data.taskSource,
      sourceBusinessId: res.data.sourceBusinessId,
    });
    // smartDevelopStyleDetailApi(chooseProductList.value[indexChooseProduct.value]?.taskCode).then((r: { data: SmartDevelopStyleDetailRes; }) => {
    //   generateImages.value = r?.data?.generateImages ?? [];
    //   details.value = r.data;
    // });
  } else {
    designTaskData.value = {};
  }
};

watch(
  () => taskId.value,
  () => {
    designTask();
  }
);
</script>

<style lang="scss" scoped>
.text-left {
  display: flex;
  flex-direction: column;
  width: 200px;
}
.m-5 {
  margin: 10px 0;
  color: gray;
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
