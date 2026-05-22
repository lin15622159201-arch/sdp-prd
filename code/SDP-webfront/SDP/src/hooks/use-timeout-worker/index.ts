import { onBeforeUnmount } from 'vue';
import Worker from './worker?worker';

export const useTimeoutWorker = () => {
  const timeWorker = new Worker();
  const setWorkerTimeout = (fn: () => void, time: number) => {
    timeWorker.postMessage({ event: 'setTimeout', duration: time }, []);
    let curTimerId = '';
    return new Promise((resolve) => {
      const func = (e: any) => {
        const { event, id } = e.data;
        switch (event) {
          case 'set':
            if (!curTimerId) {
              curTimerId = id;
              resolve(id);
            }
            break;
          case 'callback':
            if (id === curTimerId) {
              fn();
              timeWorker.removeEventListener('message', func);
            }
            break;
          default:
            break;
        }
      };
      timeWorker.addEventListener('message', func);
    });
  };
  const clearWorkerTimeout = (timerId: any) => {
    timeWorker.postMessage({ event: 'clearTimeout', timerId }, []);
  };
  onBeforeUnmount(() => {
    timeWorker.terminate();
  });
  return {
    setWorkerTimeout,
    clearWorkerTimeout,
  };
};
