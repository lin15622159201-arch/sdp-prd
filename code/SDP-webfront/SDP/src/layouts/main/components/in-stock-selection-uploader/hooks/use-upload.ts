import { computed, ref } from 'vue';
import { IAddUploaderTaskPayload, IUpdateSuccessComponentPropsPayload, IUploaderTask } from '../type';
import useFileUploader from '@/components/uploader/packages/hooks/use-file-uploader';
import { uniqueId } from 'lodash-es';
import { BATCH_STATUS, UPLOAD_STATUS } from '../constant';

export const useUpload = () => {
  const { fileUploader } = useFileUploader();

  const uploaderTasks = ref<IUploaderTask[]>([]);

  const changeUploadStatus = (uploadId: string, status: UPLOAD_STATUS) => {
    const task = uploaderTasks.value.find(item => item.uploadId === uploadId);

    if (task) {
      task.uploadStatus = status;
    }
  };

  const updateBatchId = (uploadId: string, batchId: string) => {
    const task = uploaderTasks.value.find(item => item.uploadId === uploadId);

    if (task) {
      task.batchId = batchId;
    }
  };

  const addUploaderTask = (payload: IAddUploaderTaskPayload) => {
    const { file, onSuccess, onError, title, actionComponent } = payload;

    const task: IUploaderTask = {
      uploadId: uniqueId('uploader'),
      batchId: '',
      file,
      fileName: file.name,
      size: file.size,
      url: '',
      uploadStatus: UPLOAD_STATUS.PENDING,
      batchStatus: BATCH_STATUS.PENDING,
      progress: '0',
      title: title || '',
      actionComponent,
      onSuccess,
    };

    fileUploader.upload([file], {
      onProgress(progress) {
        task.progress = progress.progress;
      },
      async onSuccess(res) {
        if (onSuccess) {
          const result = await onSuccess({
            file,
            fileName: file.name,
            url: res.url,
            taskId: task.uploadId,
          });

          updateBatchId(task.uploadId, result.id);
        }

        delete task.onSuccess;

        changeUploadStatus(task.uploadId, UPLOAD_STATUS.SUCCESS);
      },
      onFail(err) {
        if (onError) {
          onError(err);
        }

        changeUploadStatus(task.uploadId, UPLOAD_STATUS.ERROR);
      }
    });

    uploaderTasks.value.unshift(task);
  };

  const handleUploadRetry = (task: IUploaderTask) => {
    fileUploader.upload([task.file!], {
      onProgress(progress) {
        task.progress = progress.progress;
      },
      async onSuccess(res) {
        if (task.onSuccess) {
          const result = await task.onSuccess({
            file: task.file!,
            fileName: task.fileName,
            url: res.url,
            taskId: task.uploadId,
          });

          updateBatchId(task.uploadId, result.id);
        }

        delete task.onSuccess;

        changeUploadStatus(task.uploadId, UPLOAD_STATUS.SUCCESS);
      },
      onFail(err) {
        changeUploadStatus(task.uploadId, UPLOAD_STATUS.ERROR);
      }
    });
  };

  const updateSuccessComponentProps = (payload: IUpdateSuccessComponentPropsPayload) => {
    const { taskId, props } = payload;
    const task = uploaderTasks.value.find(item => item.uploadId === taskId);

    if (task) {
      task.actionComponentProps = props;
    }
  };

  const uploadingCount = computed(() => {
    return uploaderTasks.value.filter(
      item => item.uploadStatus === UPLOAD_STATUS.PENDING
        || (item.uploadStatus === UPLOAD_STATUS.SUCCESS && (
          item.batchStatus === BATCH_STATUS.PENDING
        || item.batchStatus === BATCH_STATUS.PROCESSING
        ))
    ).length;
  });

  return {
    uploaderTasks,
    addUploaderTask,
    updateSuccessComponentProps,
    uploadingCount,
    handleUploadRetry,
  };
};

export type IUseUpload = ReturnType<typeof useUpload>;
