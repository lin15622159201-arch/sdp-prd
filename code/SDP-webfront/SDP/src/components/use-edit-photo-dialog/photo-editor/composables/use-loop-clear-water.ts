import { ref, watch } from 'vue';

import { watermarkCreate, getPicwishWatermarkDetail } from '../api';
import axios, { CancelTokenSource } from 'axios';
import { IPicwishWatermarkRes, IWatermarkCreateReq } from '../api/type';
import { LOOP_TASK_STATE } from '../constant';
import { loop } from '@/modules/inspiration-center/utils/loop';
import { hideFullScreenLoading, showFullScreenLoading } from '@/core/http/helper';

type Props = {
  handleSuccess: (data: IPicwishWatermarkRes) => void;
  handleError: (taskStatus: LOOP_TASK_STATE) => void;
};

export function useLoopClearWater({ handleSuccess, handleError }: Props) {
  const isLooping = ref(false);

  let source: CancelTokenSource;

  let taskId = '';

  const loopFn = async () => {
    isLooping.value = true;
    try {
      source = axios.CancelToken.source();
      const { data } = await getPicwishWatermarkDetail(taskId, true, source.token);
      const { taskStatus } = data;

      const isContinueLoop = (taskStatus === LOOP_TASK_STATE.GENERATING
        || taskStatus === LOOP_TASK_STATE.QUEUEING);

      if (!isContinueLoop) {
        isLooping.value = false;
        if (taskStatus === LOOP_TASK_STATE.COMPLETED) {
          handleSuccess(data);
        } else {
          handleError(data.taskStatus);
        }
      }

      return isContinueLoop;
    } catch (error) {
      return true;
    }
  };

  const { start, stop } = loop(loopFn, { interval: 2000 });

  const stopLoop = () => {
    isLooping.value = false;
    taskId = '';
    source && source.cancel();
    stop();
  };

  const handleAddTask = async (params: IWatermarkCreateReq) => {
    const { data } = await watermarkCreate(params);

    taskId = data;

    start();
  };

  const startLoop = async (params: IWatermarkCreateReq) => {
    if (isLooping.value) return;
    taskId = '';
    handleAddTask(params);
  };

  watch(isLooping, (newVal) => {
    if (newVal) {
      showFullScreenLoading();
    } else {
      hideFullScreenLoading();
    }
  });

  return {
    isLooping,
    startLoop,
    stopLoop,
  };
}
