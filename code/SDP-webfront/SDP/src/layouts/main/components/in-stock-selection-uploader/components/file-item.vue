<script lang="ts" setup>
import { IUploaderTask } from '../type';
import { UPLOAD_STATUS_MAP, UPLOAD_STATUS, BATCH_STATUS_MAP, BATCH_STATUS } from '../constant';

const emit = defineEmits<{
  (e: 'retry', task: IUploaderTask): void;
  (e: 'view-failed-reason', task: IUploaderTask): void;
}>();

const props = defineProps<{
  task: IUploaderTask;
}>();

const formatSize = (size: number) => {
  return (size / 1024 / 1024).toFixed(2);
};

const handleRetry = () => {
  emit('retry', props.task);
};

const handleViewFailedReason = () => {
  emit('view-failed-reason', props.task);
};
</script>

<template>
  <div class="file-item">
    <div class="info__wrapper">
      <div class="info">
        <span class="label">导入类型：</span>
        <span class="value">{{ task.title }}</span>
      </div>
      <div class="info">
        <span class="label">文件名：</span>
        <span class="value ">{{ task.fileName }}</span>
      </div>
      <div class="tw-flex tw-items-center">
        <div class="info">
          <span class="label">文件大小：</span>
          <span class="value">{{ formatSize(task.size) }}MB</span>
        </div>
        <span>{{ UPLOAD_STATUS_MAP[task.uploadStatus] }}</span>
      </div>
    </div>
    <el-progress
      v-if="task.uploadStatus === UPLOAD_STATUS.PENDING"
      type="circle"
      :percentage="Number(task.progress)"
      :width="30"
      :show-text="false"
    />
    <div v-else-if="task.uploadStatus === UPLOAD_STATUS.ERROR">
      <el-button
        type="danger"
        link
        @click="handleRetry"
      >
        重试
      </el-button>

    </div>
    <div
      class="tw-flex tw-flex-col tw-justify-center"
      v-else-if="task.uploadStatus === UPLOAD_STATUS.SUCCESS"
    >
      <span>{{ BATCH_STATUS_MAP[task.batchStatus] }}</span>
      <el-button
        v-if="task.batchStatus === BATCH_STATUS.FAILED"
        type="primary"
        link
        @click="handleViewFailedReason"
      >
        查看
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.file-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 12px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  gap: 12px;
  .info__wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    .info {
      display: flex;
      align-items: start;
      flex: 1;
      .label {
        width: 78px;
        color: var(--el-color-info);
        text-wrap: nowrap;
        text-align: right;
      }
      .value {
        flex: 1;
        text-wrap: wrap;
        word-break: break-all;
      }
    }
  }
}
</style>
