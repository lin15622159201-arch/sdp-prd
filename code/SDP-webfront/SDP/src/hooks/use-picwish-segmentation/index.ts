import { ref, onUnmounted, computed } from 'vue';
import {
  segmentationTaskCreate,
  segmentationTaskDetail,
} from './api';
import {
  ISegmentationTaskDetailRes,
  ISegmentationTaskCreateReq,
} from './api/types';
import { TASK_STATE_ENUM, TASK_TYPE_ENUM } from './constant';

interface ICallBackData {
  maskList: string[];
  taskStatus: TASK_STATE_ENUM;
}

interface IProps {
  // 回调函数
  callback: (data: ICallBackData) => void;
  // 循环间隔
  interval?: number;
}
/**
 * 左糖分割
 */
export const usePicwishSegmentation = ({ callback, interval = 2000 }: IProps) => {
  const taskDetail = ref<ISegmentationTaskDetailRes>({
    taskId: '',
    taskStatus: TASK_STATE_ENUM.QUEUING,
    classMask: {
      clothes: '',
    },
    clothesMaskList: [],
  });
  const hasError = ref(false);
  const cacheTaskType = ref<TASK_TYPE_ENUM>(TASK_TYPE_ENUM.DEFAULT);
  let isAbort = false;
  const timer = ref<any>(null);
  const hasLoop = computed(() => {
    return timer.value !== null;
  });
  const clearTimer = () => {
    if (timer.value) {
      clearTimeout(timer.value);
    }
    timer.value = null;
  };
  const createTask = async ({ refImgUrl, taskType }: ISegmentationTaskCreateReq) => {
    clearTimer();
    isAbort = false;
    cacheTaskType.value = taskType;
    try {
      const { data } = await segmentationTaskCreate({
        refImgUrl,
        taskType,
      });
      taskDetail.value.taskId = data;
      getTaskDetail();
    } catch (error) {
      hasError.value = true;
    }
  };
  // 循环获取任务详情
  const getTaskDetail = async () => {
    // onUnmounted 后，任务放回不再处理了
    if (isAbort) return;
    const { data } = await segmentationTaskDetail({
      taskId: taskDetail.value.taskId,
    });
    taskDetail.value = data;
    // 排队中、生成中继续轮训
    if ([TASK_STATE_ENUM.QUEUING, TASK_STATE_ENUM.GENERATING].includes(data.taskStatus)) {
      timoutGetTaskDetail();
    } else {
      clearTimer();
      const res: { maskList: string[]; taskStatus: TASK_STATE_ENUM; } = {
        maskList: [],
        taskStatus: data.taskStatus,
      };
      if (data.taskStatus === TASK_STATE_ENUM.COMPLETED) {
        res.maskList = data.clothesMaskList.map(item => item.path);

        if (cacheTaskType.value === TASK_TYPE_ENUM.DEFAULT && data.classMask?.clothes) {
          res.maskList.unshift(data.classMask.clothes);
        }
        hasError.value = false;
      } else {
        hasError.value = true;
      }
      callback(res);
    }
  };

  const timoutGetTaskDetail = () => {
    timer.value = setTimeout(() => {
      getTaskDetail();
    }, interval);
  };

  const abort = () => {
    isAbort = true;
    clearTimer();
  };

  onUnmounted(() => {
    abort();
    clearTimer();
  });

  return {
    hasLoop,
    createTask,
    abort,
    hasError,
  };
};
