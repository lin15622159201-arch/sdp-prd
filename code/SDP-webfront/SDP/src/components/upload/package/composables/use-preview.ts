import { ref } from 'vue';
import { ImageEl } from '../type';

export const usePreview = () => {
  const imagesEl = ref<ImageEl[]>([]);
  const handlePreview = (i: number) => {
    if (imagesEl.value[i]) {
      // 原生触发点击
      const _$img = imagesEl.value[i]!.$el?.children[0] as HTMLElement;
      _$img?.click?.();
    }
  };
  const setImageRef = (el: ImageEl, i: number) => {
    imagesEl.value[i] = el;
  };
  return {
    handlePreview,
    setImageRef,
  };
};
