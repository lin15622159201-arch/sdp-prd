import { computed, inject } from 'vue';
import { IFileData } from '../types';
import { uploaderKey } from '../utils/token';
import { resizeImgByWidth } from '@/core/utils/helper';

export default function useOssUlrSize() {
  const uploaderRef = inject(uploaderKey)!;
  const uploaderSize = computed(() => {
    return uploaderRef.size;
  });
  const getOssUrlSize = (item: IFileData, isFake?: boolean) => {
    const { url } = item;
    if (isFake === true) {
      return url;
    }
    const sizeNum = {
      small: 148 * 2,
      medium: 360 * 2,
      mini: 95 * 2,
      tiny: 52 * 2,
    };
    return resizeImgByWidth(url, sizeNum[uploaderSize.value]);
  };

  return {
    getOssUrlSize,
  };
}
