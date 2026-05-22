<script lang="ts" setup>
import { Upload } from '@element-plus/icons-vue';

import { useUpload } from './hooks/use-upload';
import { useEvents } from './hooks/use-events';
import { useFetchBatch } from './hooks/use-fetch-batch';
import FileItem from './components/file-item.vue';
import { useImportResultDialog } from '@/modules/selection-manage/in-stock-selection/hooks/use-import-result-dialog';
import { IUploaderTask } from './type';
import { IMPORT_RESULT_ENUM } from '@/modules/selection-manage/in-stock-selection/constant';

const {
  uploaderTasks,
  addUploaderTask,
  updateSuccessComponentProps,
  uploadingCount,
  handleUploadRetry,
} = useUpload();

useEvents(addUploaderTask, updateSuccessComponentProps);

const { handleLoopFetchBatch, stopLoop } = useFetchBatch(uploaderTasks);

const { handleOpenDialog: useOpenImportResultDialog } = useImportResultDialog();

const parseMessage = (message: string): string[] => {
  try {
    return JSON.parse(message);
  } catch (error) {
    return [message];
  }
};

const handleViewFailedReason = (task: IUploaderTask) => {
  console.log('task', task);
  useOpenImportResultDialog({
    importType: task.importType!,
    successful: IMPORT_RESULT_ENUM.NO,
    error: parseMessage(task.message || ''),
  });
};
</script>

<template>
  <el-popover
    placement="bottom-start"
    :width="380"
  >
    <template #default>
      <el-scrollbar height="400px">
        <div class="tw-flex tw-flex-col tw-gap-4">
          <file-item
            v-for="task in uploaderTasks"
            :key="task.uploadId || task.batchId"
            :task="task"
            @retry="handleUploadRetry"
            @view-failed-reason="handleViewFailedReason"
          />
        </div>
        <div
          v-if="uploaderTasks.length === 0"
          class="tw-flex tw-flex-center-xy tw-py-50px"
        >
          <empty description="暂无上传中任务" />
        </div>
      </el-scrollbar>
    </template>
    <template #reference>
      <div class="tw-text-16px tw-cursor-pointer">
        <el-badge
          :value="uploadingCount"
        >
          <el-icon>
            <Upload />
          </el-icon>
        </el-badge>
      </div>
    </template>
  </el-popover>
</template>
