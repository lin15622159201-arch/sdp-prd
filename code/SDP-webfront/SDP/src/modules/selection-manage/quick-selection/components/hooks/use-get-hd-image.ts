import { ref } from 'vue';

import { ultraHdObtain } from '../lib/api';
import { loop } from '../utils/loop';
import { HD_TASK_MODE, HD_TASK_STATUS } from '../constant';
import axios, { CancelTokenSource } from 'axios';
import { IUltraHdObtainReq, IUltraHdObtainRes } from '../lib/api/type';
import { ElMessage } from 'element-plus';
import FileSaver from 'file-saver';
import { hideFullScreenLoading, showFullScreenLoading } from '@/core/http/helper';

type Props = {
  handleSuccess?: (data: IUltraHdObtainRes) => void;
  handleError?: (taskStatus: HD_TASK_STATUS) => void;
  isFullScreenLoading?: boolean;
  downloadImmediately?: boolean;
  ttl?: number;
};

const handleDownloadImg = (url: string, name: string) => {
  const type = url.split('.').at(-1);
  // 命名规则与photo一致
  FileSaver.saveAs(url, `${name}.${type}`);
  ElMessage.success('下载成功');
};

export type LoopReq = IUltraHdObtainReq & {
  picIndex?: number;
};

export function useLoopGetHDImage({
  handleSuccess,
  handleError,
  downloadImmediately = true,
  isFullScreenLoading = true,
  ttl = 1000 * 60 * 3,
}: Props) {
  const isLooping = ref(false);

  let source: CancelTokenSource;

  const initReq = (): LoopReq => {
    return {
      originTaskId: '',
      taskMode: HD_TASK_MODE.SMART_DESIGN,
      pictureId: '',
      pictureUrl: '',
    };
  };
  let req: LoopReq = initReq();

  let startTime = 0;
  const isOverTime = () => {
    const nt = Date.now();
    if (startTime + ttl < nt) {
      ElMessage.error('任务超时，请重试');
      return true;
    }
    return false;
  };

  const getImgName = () => {
    const { originTaskId, picIndex } = req;
    return `${originTaskId}-${(picIndex || 0) + 1}4K`;
  };

  const loopFn = async () => {
    isLooping.value = true;
    try {
      source = axios.CancelToken.source();
      const { data } = await ultraHdObtain(req, false, source.token);
      const { taskStatus } = data;

      const isContinueLoop = (taskStatus === HD_TASK_STATUS.GENERATING
        || taskStatus === HD_TASK_STATUS.QUEUING);

      if (!isContinueLoop) {
        isLooping.value = false;
        isFullScreenLoading && hideFullScreenLoading();
        if (taskStatus === HD_TASK_STATUS.COMPLETED) {
          downloadImmediately && handleDownloadImg(data.resImg, getImgName());
          handleSuccess && handleSuccess(data);
        } else {
          handleError && handleError(data.taskStatus);
        }
      }

      return isContinueLoop && !isOverTime();
    } catch (error) {
      return true;
    }
  };

  const { start, stop } = loop(loopFn, { interval: 2000 });

  const stopLoop = () => {
    isLooping.value = false;
    isFullScreenLoading && hideFullScreenLoading();
    req = initReq();
    source && source.cancel();
    stop();
  };

  const startLoop = async (params: LoopReq) => {
    if (isLooping.value) return;
    if (isFullScreenLoading) {
      showFullScreenLoading('下载中');
    }
    req = params;
    startTime = Date.now();
    start();
  };

  return {
    isLooping,
    startLoop,
    stopLoop,
  };
}
