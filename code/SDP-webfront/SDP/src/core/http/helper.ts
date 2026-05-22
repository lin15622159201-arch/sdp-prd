import { isObject, cloneDeep, debounce } from 'lodash-es';
import { ElLoading } from 'element-plus';
import { isEmpty } from '@toy/utils';

let needLoadingRequestCount = 0;
let loadingInstance: ReturnType<typeof ElLoading['service']> | null = null;

function startLoading(message = '') {
  loadingInstance = ElLoading.service({
    text: message,
  });
}

function endLoading() {
  if (loadingInstance) {
    loadingInstance.close();
  }
  loadingInstance = null;
}

function tryCloseLoading() {
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}

export function showFullScreenLoading(message = ''): void {
  if (needLoadingRequestCount === 0) {
    startLoading(message);
  }
  needLoadingRequestCount += 1;
}

export function hideFullScreenLoading(): void {
  if (needLoadingRequestCount <= 0) {
    return;
  }
  needLoadingRequestCount -= 1;
  if (needLoadingRequestCount === 0) {
    debounce(tryCloseLoading, 300)();
  }
}

export const deepDeleteEmptyValue = (o: any) => {
  if (!isObject(o)) {
    return o;
  }
  const newVal: { [key: string]: any; } = cloneDeep(o);
  Object.keys(newVal).forEach((key) => {
    if (isObject(newVal[key])) {
      newVal[key] = deepDeleteEmptyValue(newVal[key]);
      return;
    }
    if (isEmpty(newVal[key])) {
      delete newVal[key];
    }
  });
  return newVal;
};
