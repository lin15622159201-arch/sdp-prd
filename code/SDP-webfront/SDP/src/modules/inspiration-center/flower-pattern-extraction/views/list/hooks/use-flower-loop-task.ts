import { onUnmounted, ref } from 'vue';
import { FLOWER_PATTERN_DETAIL_INT_TASK_STATUS_ENUM } from '../../../constant';
import { hideFullScreenLoading } from '@/core/http/helper';

type Props = {
  apiFu: (taskId: string) => Promise<any>;
  handleSuccess?: (data: any) => void;
  handleFail?: (data: any) => void;
  handleAbort?: (data: any) => void;
};

export const useFlowerLoopTask = <T>({
  apiFu,
  handleSuccess,
  handleFail,
  handleAbort
}: Props) => {
  /** 是否在轮询中 */
  const isLooping = ref(false);
  let timeoutId: any;

  const clearLoop = () => {
    isLooping.value = false;
    timeoutId && clearTimeout(timeoutId);
    hideFullScreenLoading();
  };

  const handleSuccessTask = (item: T) => {
    clearLoop();
    if (handleSuccess) {
      handleSuccess(item);
    }
  };

  const handleAbortTask = (item: T) => {
    clearLoop();
    if (handleAbort) {
      handleAbort(item);
    }
  };

  const handleFailTask = (item: T) => {
    clearLoop();
    if (handleFail) {
      handleFail(item);
    }
  };

  const handleStartLoopTask = async (taskId: string) => {
    isLooping.value = true;
    try {
      const { data } = await apiFu(taskId);
      switch (data.taskStatus as FLOWER_PATTERN_DETAIL_INT_TASK_STATUS_ENUM) {
        case FLOWER_PATTERN_DETAIL_INT_TASK_STATUS_ENUM.COMPLETED:
          handleSuccessTask(data as T);
          break;
        case FLOWER_PATTERN_DETAIL_INT_TASK_STATUS_ENUM.ABORTED:
          handleAbortTask(data as T);
          break;
        case FLOWER_PATTERN_DETAIL_INT_TASK_STATUS_ENUM.FAILED:
        case FLOWER_PATTERN_DETAIL_INT_TASK_STATUS_ENUM.INVALID:
        case FLOWER_PATTERN_DETAIL_INT_TASK_STATUS_ENUM.TIME_OUT_FAILED:
          handleFailTask(data as T);
          break;
        default:
          break;
      }
    } catch (e) {
      console.error(e);
      handleFailTask(e as T);
      clearLoop();
    } finally {
      isLooping.value && (timeoutId = setTimeout(() => handleStartLoopTask(taskId), 500));
    }
  };

  onUnmounted(() => {
    clearLoop();
  });

  return {
    handleStartLoopTask,
    clearLoop,
    isLooping
  };
};
