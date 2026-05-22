<template>
  <div class="tw-h-full tw-w-full tw-flex tw-flex-col tw-gap-4">
    <div class="tw-flex tw-items-center tw-gap-6 panel">
      <el-button
        :icon="ArrowLeftBold"
        size="default"
        text
        @click="goBack()"
      >返回</el-button>
      <div class="tw-text-lg tw-font-bold tw-mr-4">任务编码：{{ detailData?.taskCode || '--' }}</div>
      <span>创建人：{{ detailData?.creatorName || '--' }}</span>
      <span>创建时间：{{ $filters.formatTime(detailData?.createdTime) || '--' }}</span>
      <el-tag v-if="taskStatusData" :type="taskStatusData.style">{{ taskStatusData.label }}</el-tag>
    </div>

    <div class="tw-flex-1 tw-flex tw-gap-4">
      <el-scrollbar class="body-left tw-w-280px panel">
        <BaseInfo :detail-data="detailData" />
      </el-scrollbar>
      <el-scrollbar class="body-right tw-flex-1 panel">
        <GenerateResult :detail-data="detailData" />
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { useRoute } from 'vue-router';
import { fetchReplaceColorTaskDetail } from '../api';
import { useRouterBack } from '@/hooks/use-router-back';
import { IReplaceColorTaskDetailRes } from '../api/type';
import { ArrowLeftBold } from '@element-plus/icons-vue';
import { TASK_STATUS_LIST } from '@/constant/task';
import BaseInfo from './components/base-info.vue';
import GenerateResult from './components/generate-result.vue';

const route = useRoute();
const { handleBack } = useRouterBack();
const goBack = () => {
  handleBack('InspirationCenterClothColorReplacerList');
};
const taskId = route.params.id as string;
const detailData = shallowRef<IReplaceColorTaskDetailRes>();
const taskStatusData = computed(() => TASK_STATUS_LIST.find(item => item.value === detailData.value?.taskStatus));

const getData = async () => {
  const { data } = await fetchReplaceColorTaskDetail(taskId);
  detailData.value = data;
};
getData();
</script>
<style scoped lang="scss">
.panel {
  background-color: #fff;
  border-radius: 4px;
  padding: 12px 16px;
}
</style>
