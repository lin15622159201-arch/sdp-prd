import { onMounted, onUnmounted, Ref, watch } from 'vue';
import { batchPage } from '../api';

import { IUploaderTask } from '../type';
import { BATCH_STATUS, UPLOAD_STATUS } from '../constant';
import { useAccountStore } from '@/store/account';
import { IBatchPageResListItem } from '../api/type';
import { filters } from '@/core/plugins/filter';
import { IMPORT_TYPE_LIST } from '@/modules/selection-manage/in-stock-selection/constant';
import { ElMessage } from 'element-plus';

export const useFetchBatch = (uploaderTasks: Ref<IUploaderTask[]>) => {
  const accountStore = useAccountStore();

  const handleInitData = async () => {
    const { data } = await batchPage({ pageNum: 1, pageSize: 200, creatorId: accountStore.account?.id });
    uploaderTasks.value = data.list.filter(
      item => item.batchStatus === BATCH_STATUS.PENDING
      || item.batchStatus === BATCH_STATUS.PROCESSING
      || item.batchStatus === BATCH_STATUS.FAILED
      || item.batchStatus === BATCH_STATUS.TIMEOUT_FAILED
    ).map(item => ({
      uploadStatus: UPLOAD_STATUS.SUCCESS,
      batchStatus: item.batchStatus,
      batchId: item.batchId,
      uploadId: item.batchId,
      fileName: item.fileName,
      size: Number(item.fileSize || '0'),
      url: item.ossUrl,
      progress: '100',
      title: filters.getEnumLabel(IMPORT_TYPE_LIST, item.importType),
      importType: item.importType,
      message: item.message,
    } as IUploaderTask));
  };

  const handleFetchBatch = async () => {
    const batchIds = uploaderTasks.value.filter(
      task => (task.batchStatus === BATCH_STATUS.PENDING
      || task.batchStatus === BATCH_STATUS.PROCESSING)
      && task.uploadStatus === UPLOAD_STATUS.SUCCESS
      && task.batchId
    ).map(task => task.batchId);
    const { data } = await batchPage({ batchIds, pageNum: 1, pageSize: 200, creatorId: accountStore.account?.id });

    const batchMap = new Map<string, IBatchPageResListItem>();

    data.list.forEach((item) => {
      batchMap.set(item.batchId, item);
    });

    uploaderTasks.value.forEach((task) => {
      const batch = batchMap.get(task.batchId);

      if (batch) {
        task.batchStatus = batch.batchStatus;
        task.message = batch.message;
        if (batch.batchStatus === BATCH_STATUS.COMPLETED) {
          ElMessage.success('导入成功');
        }
      }
    });
  };

  let timer: ReturnType<typeof setTimeout> | null = null;
  let isCanLoopFlag = false;
  const handleLoopFetchBatch = async () => {
    timer = setTimeout(async () => {
      if (isCanLoopFlag) {
        await handleFetchBatch();
        await handleLoopFetchBatch();
      }
    }, 15000);
  };

  const stopLoop = () => {
    isCanLoopFlag = false;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  const startLoop = () => {
    isCanLoopFlag = true;
    handleLoopFetchBatch();
  };

  onMounted(async () => {
    await handleInitData();
  });

  watch(() => uploaderTasks.value, () => {
    const isHasRunningTasks = uploaderTasks.value.filter(
      task => task.uploadStatus === UPLOAD_STATUS.SUCCESS && (task.batchStatus === BATCH_STATUS.PROCESSING
      || task.batchStatus === BATCH_STATUS.PENDING)
    ).length > 0;
    if (isHasRunningTasks && !timer) {
      startLoop();
    } else if (!isHasRunningTasks) {
      stopLoop();
    }
  }, { deep: true });

  onUnmounted(() => {
    stopLoop();
  });

  return {
    stopLoop,
    handleLoopFetchBatch,
  };
};
